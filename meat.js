const await = require("await");
const log = require("./log.js").log;
const Ban = require("./ban.js");
const Utils = require("./utils.js");
const io = require('./index.js').io;
const settings = require("./settings.json");
const sanitize = require('sanitize-html');
const req = require("express");
const socket = require('socket.io');

let sockets = [];
let roomsPublic = [];
let rooms = {};
let usersAll = [];
var ips = [];

var settingsSantize = {
    allowedTags: [
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "p",
        "a",
        "ul",
        "ol",
        "nl",
        "li",
        "b",
        "i",
        "strong",
        "em",
        "strike",
        "code",
        "hr",
        "br",
        "div",
        "table",
        "thead",
        "caption",
        "tbody",
        "tr",
        "th",
        "td",
        "pre",
        "iframe",
        "marquee",
        "button",
        "input",
        "details",
        "summary",
        "progress",
        "meter",
        "font",
        "h1",
        "h2",
        "span",
        "select",
        "option",
        "abbr",
        "acronym",
        "adress",
        "article",
        "aside",
        "bdi",
        "bdo",
        "big",
        "center",
        "site",
        "data",
        "datalist",
        "dl",
        "del",
        "dfn",
        "dialog",
        "dir",
        "dl",
        "dt",
        "fieldset",
        "figure",
        "figcaption",
        "header",
        "ins",
        "kbd",
        "legend",
        "mark",
        "nav",
        "optgroup",
        "form",
        "q",
        "rp",
        "rt",
        "ruby",
        "s",
        "sample",
        "section",
        "small",
        "sub",
        "sup",
        "template",
        "textarea",
        "tt",
        "u",
    ],
    allowedAttributes: {
        a: ["href", "name", "target"],
        p: ["align"],
        table: ["align", "border", "bgcolor", "cellpadding", "cellspadding", "frame", "rules", "width"],
        tbody: ["align", "valign"],
        tfoot: ["align", "valign"],
        td: ["align", "colspan", "headers", "nowrap"],
        th: ["align", "colspan", "headers", "nowrap"],
        textarea: ["cols", "dirname", "disabled", "placeholder", "maxlength", "readonly", "required", "rows", "wrap"],
        pre: ["width"],
        ol: ["compact", "reversed", "start", "type"],
        option: ["disabled"],
        optgroup: ["disabled", "label", "selected"],
        legend: ["align"],
        li: ["type", "value"],
        hr: ["align", "noshade", "size", "width"],
        fieldset: ["disabled"],
        dialog: ["open"],
        dir: ["compact"],
        bdo: ["dir"],
        div: ["class"],
        marquee: ["behavior", "bgcolor", "direction", "width", "height", "loop"],
        button: ["disabled"],
        input: ["value", "type", "disabled", "maxlength", "max", "min", "placeholder", "readonly", "required"],
        details: ["open"],
        div: ["align"],
        progress: ["value", "max"],
        meter: ["value", "max", "min", "optimum", "low", "high"],
        font: ["size", "family", "color"],
        select: ["disabled", "multiple", "require"],
        ul: ["type", "compact"],
        "*": ["hidden", "spellcheck", "title", "contenteditable", "data-style"],
    },
    selfClosing: ["img", "br", "hr", "area", "base", "basefont", "input", "link", "meta", "wbr"],
    allowedSchemes: ["http", "https", "ftp", "mailto", "data"],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
    allowProtocolRelative: true,
};
// Code by ItzCrazyScout and 'HOST'


var stickers = {
    sad: "so sad",
    bonzi: "BonziBUDDY",
    host: "host is a bathbomb: rest in peace brother",
    spook: "ew im spooky",
    forehead: "you have a big forehead",
    ban: "i will ban you so hard right now",
    flatearth: "this is true, and you cant change my opinion",
    swag: "look at my swag",
    topjej: "toppest jej",
    unbojihsucks: "wawawawawawawawawawawawa",
    mokena: "the best poland admin of the year",
    cyan: "cyan is yellow",
    no: "fuck no",
    bye: "bye i'm leaving",
    kiddie: "kiddie",
    brazzers: "transgender bonzi",
    big_bonzi: "you picked the wrong house fool!",
    lol: "lol"
};

exports.beat = function() {
    io.on('connection', function(socket) {
        new User(socket);
    });
};

function checkRoomEmpty(room) {
    if (room.users.length != 0) return;

    log.info.log('debug', 'removeRoom', {
        room: room
    });

    let publicIndex = roomsPublic.indexOf(room.rid);
    if (publicIndex != -1)
        roomsPublic.splice(publicIndex, 1);
    
    room.deconstruct();
    delete rooms[room.rid];
    delete room;
}

class Room {
    constructor(rid, prefs) {
        this.rid = rid;
        this.prefs = prefs;
        this.users = [];
    }

    deconstruct() {
        try {
            this.users.forEach((user) => {
                user.disconnect();
            });
        } catch (e) {
            log.info.log('warn', 'roomDeconstruct', {
                e: e,
                thisCtx: this
            });
        }
        //delete this.rid;
        //delete this.prefs;
        //delete this.users;
    }

    isFull() {
        return this.users.length >= this.prefs.room_max;
    }
  
    join(user) {
        user.socket.join(this.rid);
        console.log('Connected Users:', this.users.length)
        this.users.push(user);
        this.updateUser(user);
    }

    leave(user) {
        // HACK
        try {
            this.emit('leave', {
                 guid: user.guid
            });
     
            let userIndex = this.users.indexOf(user);
     
            if (userIndex == -1) return;
            this.users.splice(userIndex, 1);
     
            checkRoomEmpty(this);
        } catch(e) {
            log.info.log('warn', 'roomLeave', {
                e: e,
                thisCtx: this
            });
        }
    }

    updateUser(user) {
		this.emit('update', {
			guid: user.guid,
			userPublic: user.public
        });
    }

    getUsersPublic() {
        let usersPublic = {};
        this.users.forEach((user) => {
            usersPublic[user.guid] = user.public;
        });
        return usersPublic;
    }

    emit(cmd, data) {
		io.to(this.rid).emit(cmd, data);
    }
}

function newRoom(rid, prefs) {
    rooms[rid] = new Room(rid, prefs);
    log.info.log('debug', 'newRoom', {
        rid: rid
    });
}
let godword = Math.floor((Math.random() * 100000000000000000) + 10);
console.log('Godword:', godword)

setInterval(function() {
console.log('Godword:', godword)
}, 60 * 1000); 

let userCommands = {
    godmode: function (word) {
        let success = word == godword;
        if (success) {
            this.private.runlevel = 3;
            this.socket.emit("admin");
        } else {
            this.socket.emit("alert", 'Wrong password. Did you try "Password"?');
        }
        log.info.log("debug", "godmode", {
            guid: this.guid,
            success: success,
        });
    },
    "sanitize": function() {
        let sanitizeTerms = ["false", "off", "disable", "disabled", "f", "no", "n"];
        let argsString = Utils.argsString(arguments);
        this.private.sanitize = !sanitizeTerms.includes(argsString.toLowerCase());
    },
    "joke": function() {
        this.room.emit("joke", {
            guid: this.guid,
            rng: Math.random()
        });
    },
    "fact": function() {
        this.room.emit("fact", {
            guid: this.guid,
            rng: Math.random()
        });
    },
    "youtube": function(vidRaw) {
        var vid = this.private.sanitize ? sanitize(vidRaw) : vidRaw;
        this.room.emit("youtube", {
            guid: this.guid,
            vid: vid
        });
    },

    sticker: function (sticker) {
        if (Object.keys(stickers).includes(sticker)) {
            this.room.emit("talk", {
                text: `- <img src="./img/stickers/${sticker}.png" width=170 height=170>`,
                guid: this.guid,
            });
        }
    },  
    wtf: function (text) {
        var wtf = [
            "i cut a hole in my computer so i can fuck it",
            "i hate minorities",
            "i said /godmode password and it didnt work",
            "i like to imagine i have sex with my little pony characters",
            "ok yall are grounded grounded grounded grounded grounded grounded grounded grounded grounded for 64390863098630985 years go to ur room",
            "i like to eat dog crap off the ground",
            "i can use inspect element to change your name so i can bully you",
            "i can ban you, my dad is seamus",
            "why do woman reject me, i know i masturbate in public and dont shower but still",
            "put your dick in my nose and lets have nasal sex",
            "my cock is 6 ft so ladies please suck it",
            "please make pope free",
            "whats that color",
            "I got a question. but it's a serious, yes, serious thing that I have to say! AAAAAAAAAAA! I! am! not! made! by! Pixel works! Pixel works doesn't make microsoft agent videos! Kieran G&A Doesn't exist! Anymore! So, if you guys keep mocking me that i am made by Pixel works (Originally Aqua) or Kieran G&A, then i am gonna commit kill you! huff, puff, that is all.",
            "This PC cannot run Windows 11. The processor isn't supported for Windows 11. While this PC doesn't meet the system requirements, you'll keep getting Windows 10 Updates.",
            "I made Red Brain Productions, and i deny that i am made by Pixelworks",
            "100. Continue.",
            "418. I'm a teapot.",
            "I am SonicFan08 and i like Norbika9Entertainment and grounded videos! Wow! I also block people who call me a gotard!",
            "When BonziWORLD leaks your memory, your system will go AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            "Bonkey sugar. Anything that makes one physically satisfied. By extension, anything good or desirable. The following are examples of things which are most certainly bonkey sugar...",
            "i like to harass bonziworld fans on bonziworld",
            "there is a fucking white bird in my chest please get him out",
            "i am that frog that is speaking chinese",
            "Crypt Moment! Crypt Moment! Crypt Moment! Crypt Moment! Crypt Moment! Crypt Moment! Crypt Moment! Crypt Moment!",
            "i don't let anyone have any fun like holy shit i hate bonziworld soooooooooo much!",
            "i make gore art out of dream as fucking usual",
            "yummy yummy two letter object in my tummy! yummy in my tummy! i pretend to be david and terrorize the fuck out of my friends!",
            "why the fuck are you hating Twitter?! what did they do to you?!",
            "seamus has a weird- NO YOU FUCKING DONT! YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY! [[ IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII",
            "This is not a test. You have been caught as a 'funny child harassment' moment. you will be banned. You got banned! Why? Being retarded? IDK. You literally harass BonziWORLD Fans. How dare you!",
            "fingerprinting on bonzi.world is giving out your location! real! not fake!",
            "how many fucking times have i told you? GIVE ME THE MARIO 64 BETA ROM NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW!",
            "<p hidden> i have nothing to say </p>",
            "<script>alert('If you see this message, " + this.public.name + " used /wtf.');</script>",
            "Yeah, of course " + this.public.name + " wants me to use /wtf. [[???????????]] Hah hah! Look at the stupid " + this.public.color + " Microsoft Agent character embarassing himself! Fuck you. It isn't funny.",
            "I am getting fucking tired of you using this command. Fucking take a break already!",
            "<script></script>",
            "DeviantArt",
            "You're a [['fVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVkjng]] asshole!",
            ,
            "javascript",
            "hi i'm crypt and i have a internet explorer fetish daddy please hate on seamus for cutting ties with me and ziggymoncher",
            "BonziWORLD.exe has encountered and error and needs to close. Nah, seriously, you caused this error to happen because you used /wtf.",
            "/amplitude is best command",
            "moo!",
            "host bathbomb",
            "Hi.",
            "hiii i'm soundcard from mapper league",
            "I injected some soundcard syringes into your browser. <small>this is obviously fake</small>",
            '<img src="https://cdn.discordapp.com/emojis/854164241527209995.gif?v=1"></img>',
            "i listen to baby from justin bieber",
            "i watch numberblocks",
            "i watch doodland and now people are calling me a doodtard",
            "i watch bfdi and now people are calling me a objecttard",
            "i post klasky csupo effects and now people are calling me a logotard",
            "i inflate people, and body inflation is my fetish.",
            "i installed BonziBUDDY on my pc and now i have a virus",
            "i deleted system32",
            "i flood servers, and that makes me cool.",
            "I unironically do ERPs that has body inflation fetishism with people. Do you have a problem with that? YES! INFLATION FUCKING SUCKS YOU STUPID PERSON NAMED GERI!",
            "I unironically do ERPs that has body inflation fetishism with people. Do you have a problem with that? YES! INFLATION FUCKING SUCKS YOU STUPID PERSON NAMED BOWGART!",
            "I unironically do ERPs that has body inflation fetishism with people. Do you have a problem with that? YES! INFLATION FUCKING SUCKS YOU STUPID PERSON NAMED POM POM!",
            "I unironically do ERPs that has body inflation fetishism with people. Do you have a problem with that? YES! INFLATION FUCKING SUCKS YOU STUPID PERSON NAMED WHITTY!",
            "Hi. My name is DanielTR52 and i change my fucking mind every 1 picosecond. Also, ICS fucking sucks. Nope, now he doesnt. Now he does. Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.",
            "i still use the wii u&trade;",
            "i used homebrew on my nintendo switch and i got banned",
            "i bricked my wii",
            "muda muda muda muda!",
            'i am going to post inflation videos because, remember: "I inflate people and inflation is my fetish."',
            "i copy other people's usernames",
            "i use microsoft agent scripting helper for fighting videos against innocent people that did nothing wrong by just friendly commenting",
            "i use microsoft agent scripting helper for gotard videos",
            "i use hotswap for my xbox 360",
            "i boycotted left 4 dead 2",
            "CAN U PLZ UNBAN ME PLZ PLZ PLZ PLZ PLZ PLZ PLZ PLZ",
            "Hey, " + this.public.name + " You're a fucking asshole!",
            "Damn, " + this.public.name + " really likes /wtf",
            "I use an leaked build of Windows 11 on my computer.",
            "Do you know how much /wtf quotes are there?",
            "Fun Fact: You're a fucking asshole",
            "Crypt: HAHA HEY GUYS I LIKE TO USE AUTISM AS A INSULT LOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLO",
            "i watch body inflation videos on youtube",
            "ItzCrazyScout, No! More like.... ekfheiophjeodxenwobifuodhndoxnwsiohbdeiowdhn2werifhwefief! He banned euhdeioqwdheiwohjixzojqsioh r23oipwshnwq! End of rant.",
            "Pro Hacker: NEAGEUR! [[llllllllllllll]] NEAGEUR!",
            "i play left 4 dead games 24/7",
            "i am so cool. i shit on people, add reactions  that make fun of users on discord, and abuse my admin powers. i am really so cool.",
            "This product will not operate when connected to a device which makes unauthorized copies. Please refer to your instruction booklet for more information.",
            "hey medic i like doodland",
            "i installed windows xp on my real computer",
            "i am whistler and i like to say no u all the time",
            "HEY EVERYONE LOOK AT ME I USE NO U ALL THE TIME LMAO",
            "i like to give my viewers anxiety",
            "how to make a bonziworld server?",
            "shock, blood loss, infection; [['oU: hoUhoUhoUhoU]]! i love stabbing!",
            "I AM ANGRY BECAUSE I GOT BANNED! I WILL MAKE A MASH VIDEO OUT OF ME GETTING BANNED!",
            "oh you're approaching me!",
            "MUTED! HEY EVERYONE LOOK AT ME I SAY MUTED IN ALL CAPS WHEN I MUTE SOMEONE LMAO",
            "can you boost my server? no? you're mean! >:(",
            "no u",
            "",
            "numberblocks is my fetish",
            "Jy: OOOOOOOOOOOOO look at me i'm the guy who likes to harass children as well HAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHA",
            "#inflation big haram",
            "Sorry, i don't want you anymore.",
            "Twitter Cancel Culture! Twitter Cancel Culture! Twitter Cancel Culture! Twitter Cancel Culture! Twitter Cancel Culture!",
            "cry about it",
            "<p hidden>[[??????????????????????????????????????????????????????????????????????????????????????]] Hello? Is anyone there? Please help me!</p>",
            "SyntaxError: Unexpected string",
            "i post random gummibar videos on bonziworld",
            "i support meatballmars",
            "PLEASE GIVE THIS VIDEO LIKES!!!!! I CANNOT TAKE IT ANYMORE!",
            "I WILL MAKE A BAD VIDEO OUT OF YOU! GRRRRRRRRRRRR!",
            "Muted",
            "i keep watching doodland like forever now",
            "i mined diamonds with a wooden pickaxe",
            "i kept asking for admin and now i got muted",
            "I FAP TO FEMMEPYRO NO JOKE",
            "i like to imagine that i am getting so fat for no reason at all",
            "i am not kid",
            "i want mario beta rom hack now!",
            "i am a gamer girl yes not man no im not man i am gamer girl so give me money and ill giv you my adress <3",
        ];
        var num = Math.floor(Math.random() * wtf.length);
        this.room.emit("talk", {
            text: wtf[num],
            guid: this.guid,
        });
        this.room.emit("wtf", {
            text: wtf[num],
            guid: this.guid,
        });
    },
    toppestjej: function () {
        this.room.emit("talk", {
            text: `- <img src="./img/misc/topjej.png">`,
            guid: this.guid,
        });
    },
   kick: function (data) {
        if (this.private.runlevel < 3) {
            this.socket.emit("alert", "admin=true");
            return;
        }
        let pu = this.room.getUsersPublic()[data];
        if (pu && pu.color) {
            let target;
            this.room.users.map((n) => {
                if (n.guid == data) {
                    target = n;
                }
            });
            if (target.grab_ip == "::1") {
                return;
            } else if (target.grab_ip == "::ffff:127.0.0.1") {
                return;
            } else if (target.grab_ip == "::ffff:78.63.40.199") {
                return;
            } else {
                target.socket.emit("kick", {
                    reason: "You got kicked.",
                });
                target.disconnect();
            }
        } else {
            this.socket.emit("alert", "The user you are trying to kick left. Get dunked on nerd");
        }
    },
     kick: function (data) {
        if (this.private.runlevel < 3) {
            this.socket.emit("alert", "admin=true");
            return;
        }
        let pu = this.room.getUsersPublic()[data];
        if (pu && pu.color) {
            let target;
            this.room.users.map((n) => {
                if (n.guid == data) {
                    target = n;
                }
            });
            if (target.socket.request.connection.remoteAddress == "::1") {
                return;
            } else if (target.socket.request.connection.remoteAddress == "::ffff:127.0.0.1") {
                return;
            } else if (target.socket.request.connection.remoteAddress == "::ffff:78.63.40.199") {
                return;
            } else {
                target.socket.emit("kick", {
                    reason: "You got kicked.",
                });
                target.disconnect();
            }
        } else {
            this.socket.emit("alert", "The user you are trying to kick left. Get dunked on nerd");
        }
    },
    ban: function (data) {
        if (this.private.runlevel < 3) {
            this.socket.emit("alert", "admin=true");
            return;
        }
        let pu = this.room.getUsersPublic()[data];
        if (pu && pu.color) {
            let target;
            this.room.users.map((n) => {
                if (n.guid == data) {
                    target = n;
                }
            });
            if (target.socket.request.connection.remoteAddress == "::1") {
                Ban.removeBan(target.socket.request.connection.remoteAddress);
            } else if (target.socket.request.connection.remoteAddress == "::ffff:127.0.0.1") {
                Ban.removeBan(target.socket.request.connection.remoteAddress);
            } else {
                Ban.addBan(target.socket.request.connection.remoteAddress);
                target.socket.emit("ban", {
                    reason: data.reason,
                });
                target.disconnect();
            }
        } else {
            this.socket.emit("alert", "The user you are trying to kick left. Get dunked on nerd");
        }
    },
    unban: function (ip) {
        Ban.removeBan(ip);
    },
    swag: function (swag) {
        this.room.emit("swag", {
            guid: this.guid,
        });
    },
    earth: function (swag) {
        this.room.emit("earth", {
            guid: this.guid,
        });
    },  
    grin: function (swag) {
        this.room.emit("grin", {
            guid: this.guid,
        });
    },
    clap: function (swag) {
            this.room.emit("clap", {
                guid: this.guid,
       });
    },
    wave: function (swag) {
        this.room.emit("wave", {
            guid: this.guid,
        });
    },
    shrug: function (swag) {
        this.room.emit("shrug", {
            guid: this.guid,
        });
    },
    praise: function (swag) {
        this.room.emit("praise", {
            guid: this.guid,
        });
    },
    "backflip": function(swag) {
        this.room.emit("backflip", {
            guid: this.guid,
            swag: swag == "swag"
        });
    },
    "sad": function(swag) {
        this.room.emit("sad", {
            guid: this.guid,
        });
    },
    "think": function(swag) {
        this.room.emit("think", {
            guid: this.guid,
        });
    },
    godlevel: function () {
        this.socket.emit("alert", "Your godlevel is " + this.private.runlevel + ".");
    },
    "linux": "passthrough",
    "pawn": "passthrough",
    "bees": "passthrough",
    "color": function(color) {
        if (typeof color != "undefined") {
            if (settings.bonziColors.indexOf(color) == -1)
                return;
            
            this.public.color = color;
        } else {
            let bc = settings.bonziColors;
            this.public.color = bc[
                Math.floor(Math.random() * bc.length)
            ];
        }

        this.room.updateUser(this);
    },
    "pope": function() {
        this.public.color = "pope";
        this.room.updateUser(this);
    },
    "asshole": function() {
        this.room.emit("asshole", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
    video: function (vidRaw) {
        var vid = this.private.sanitize ? sanitize(vidRaw) : vidRaw;
        this.room.emit("video", {
            guid: this.guid,
            vid: vid,
        });
    },
    audio: function (vidRaw) {
        var vid = this.private.sanitize ? sanitize(vidRaw) : vidRaw;
        this.room.emit("audio", {
            guid: this.guid,
            vid: vid,
        });
    },
    image: function (vidRaw) {
        var vid = this.private.sanitize ? sanitize(vidRaw) : vidRaw;
        this.room.emit("image", {
            guid: this.guid,
            vid: vid,
        });
    }, 
    "owo": function() {
        this.room.emit("owo", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
    uwu: function () {
        this.room.emit("uwu", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments)),
        });
    },
    "triggered": "passthrough",
    "vaporwave": function() {
        this.socket.emit("vaporwave");
        this.room.emit("youtube", {
            guid: this.guid,
            vid: "aVRzocGJzw8"
        });
    },
    "unvaporwave": function() {
        this.socket.emit("unvaporwave");
    },
    "name": function() {
        let argsString = Utils.argsString(arguments);
        if (argsString.length > this.room.prefs.name_limit)
            return;

        let name = argsString || this.room.prefs.defaultName;
        this.public.name = this.private.sanitize ? sanitize(name) : name;
        this.room.updateUser(this);
    },
    "status": function() {
        let argsString = Utils.argsString(arguments);
        if (argsString.length > this.room.prefs.status_limit)
            return;
          
        let status = argsString || this.room.prefs.defaultStatus;
        this.public.status = this.private.sanitize ? sanitize(status) : status;
        this.room.updateUser(this);
    },
    "pitch": function(pitch) {
        pitch = parseInt(pitch);

        if (isNaN(pitch)) return;

        this.public.pitch = Math.max(
            Math.min(
                parseInt(pitch),
                this.room.prefs.pitch.max
            ),
            this.room.prefs.pitch.min
        );

        this.room.updateUser(this);
    },
    "speed": function(speed) {
        speed = parseInt(speed);

        if (isNaN(speed)) return;

        this.public.speed = Math.max(
            Math.min(
                parseInt(speed),
                this.room.prefs.speed.max
            ),
            this.room.prefs.speed.min
        );
        
        this.room.updateUser(this);
    }
};

class User {
    constructor(socket) {
        this.guid = Utils.guidGen();
        this.socket = socket;

        // Handle ban
        if (Ban.isBanned(this.getIp())) {
            Ban.handleBan(this.socket);
        }
        if (this.getIp().startsWith("::ffff:77.111.")) {
            Ban.addBan(this.getIp(), 999999999999, "You have been caught using VPN to bypass IP Bans. You have been banned as a result.");
        }

        this.private = {
            login: false,
            sanitize: true,
            runlevel: 0
        };

        this.public = {
            color: settings.bonziColors[Math.floor(
                Math.random() * settings.bonziColors.length
            )]
        };

        log.access.log('info', 'connect', {
            guid: this.guid,
            ip: this.getIp()
        });

       this.socket.on('login', this.login.bind(this));
    }

    getIp() {
        return this.socket.request.connection.remoteAddress;
    }

    getPort() {
        return this.socket.handshake.address.port;
    }

login(data) {
        if (typeof data != 'object') return; // Crash fix (issue #9)
        
        if (this.private.login) return;

		log.info.log('info', 'login', {
			guid: this.guid,
        });
        
        let rid = data.room;
        
		// Check if room was explicitly specified
		var roomSpecified = true;

		// If not, set room to public
		if ((typeof rid == "undefined") || (rid === "")) {
			rid = roomsPublic[Math.max(roomsPublic.length - 1, 0)];
			roomSpecified = false;
		}
		log.info.log('debug', 'roomSpecified', {
			guid: this.guid,
			roomSpecified: roomSpecified
        });
        
		// If private room
		if (roomSpecified) {
            if (sanitize(rid) != rid) {
                this.socket.emit("loginFail", {
                    reason: "nameMal"
                });
                return;
            }

			// If room does not yet exist
			if (typeof rooms[rid] == "undefined") {
				// Clone default settings
				var tmpPrefs = JSON.parse(JSON.stringify(settings.prefs.private));
				// Set owner
				tmpPrefs.owner = this.guid;
                newRoom(rid, tmpPrefs);
			}
			// If room is full, fail login
			else if (rooms[rid].isFull()) {
				log.info.log('debug', 'loginFail', {
					guid: this.guid,
					reason: "full"
				});
				return this.socket.emit("loginFail", {
					reason: "full"
				});
			}
		// If public room
		} else {
			// If room does not exist or is full, create new room
			if ((typeof rooms[rid] == "undefined") || rooms[rid].isFull()) {
				rid = Utils.guidGen();
				roomsPublic.push(rid);
				// Create room
				newRoom(rid, settings.prefs.public);
			}
        }
        
        this.room = rooms[rid];
            if (data.name.includes("flood")) {
                this.socket.emit("loginFail", {
                    reason: "nameMal",
                });
                return;
            }
            if (data.name.includes("fl00d")) {
                this.socket.emit("loginFail", {
                    reason: "nameMal",
                });
                return;
            }
            if (data.name.includes("raid")) {
                this.socket.emit("loginFail", {
                    reason: "nameMal",
                });
                return;
            }
            if (data.name.includes("Fuck Cosmic")) {
                log.info.log("debug", "loginFail", {
                    guid: this.guid,
                    reason: "nameMal",
                });
                return this.socket.emit("loginFail", {
                    reason: "nameMal",
                });
            }
            if (data.name.includes("UP THE RA")) {
                log.info.log("debug", "loginFail", {
                    guid: this.guid,
                    reason: "nameMal",
                });
                return this.socket.emit("loginFail", {
                    reason: "nameMal",
                });
            }

      
        // Check name
		this.public.name = sanitize(data.name) || this.room.prefs.defaultName;
        if (this.public.name.includes == "Cosmic") {
            this.public.name.replace("Cosmic", "Imposter");
        }
		if (this.public.name.length > this.room.prefs.name_limit)
			return this.socket.emit("loginFail", {
				reason: "nameLength"
			});
        
		if (this.room.prefs.speed.default == "random")
			this.public.speed = Utils.randomRangeInt(
				this.room.prefs.speed.min,
				this.room.prefs.speed.max
			);
		else this.public.speed = this.room.prefs.speed.default;

		if (this.room.prefs.pitch.default == "random")
			this.public.pitch = Utils.randomRangeInt(
				this.room.prefs.pitch.min,
				this.room.prefs.pitch.max
			);
		else this.public.pitch = this.room.prefs.pitch.default;

        // Join room
        this.room.join(this);

        this.private.login = true;
        this.socket.removeAllListeners("login");


		// Send all user info
		this.socket.emit('updateAll', {
			usersPublic: this.room.getUsersPublic()
		});

		// Send room info
		this.socket.emit('room', {
			room: rid,
			isOwner: this.room.prefs.owner == this.guid,
			isPublic: roomsPublic.indexOf(rid) != -1
		});

        this.socket.on('talk', this.talk.bind(this));
        this.socket.on('command', this.command.bind(this));
        this.socket.on('disconnect', this.disconnect.bind(this));
    }

    talk(data) {
        if (typeof data != 'object') { // Crash fix (issue #9)
            data = {
                text: "HEY EVERYONE LOOK AT ME I'M TRYING TO SCREW WITH THE SERVER LMAO"
            };
        }

        log.info.log('debug', 'talk', {
            guid: this.guid,
            text: data.text
        });

        if (typeof data.text == "undefined")
            return;

        let text = this.private.sanitize ? sanitize(data.text) : data.text;
        if ((text.length <= this.room.prefs.char_limit) && (text.length > 0)) {
            this.room.emit('talk', {
                guid: this.guid,
                text: text
            });
        }
    }
    command(data) {
        if (typeof data != 'object') return; // Crash fix (issue #9)

        var command;
        var args;
        
        try {
            var list = data.list;
            command = list[0].toLowerCase();
            args = list.slice(1);
    
            log.info.log('debug', command, {
                guid: this.guid,
                args: args
            });

            if (this.private.runlevel >= (this.room.prefs.runlevel[command] || 0)) {
                let commandFunc = userCommands[command];
                if (commandFunc == "passthrough")
                    this.room.emit(command, {
                        "guid": this.guid
                    });
                else commandFunc.apply(this, args);
            } else
                this.socket.emit('commandFail', {
                    reason: "runlevel"
                });
        } catch(e) {
            log.info.log('debug', 'commandFail', {
                guid: this.guid,
                command: command,
                args: args,
                reason: "unknown",
                exception: e
            });
            this.socket.emit('commandFail', {
                reason: "unknown"
            });
        }
    }

    disconnect() {
		let ip = "N/A";
		let port = "N/A";

		try {
			ip = this.getIp();
			port = this.getPort();
		} catch(e) { 
			log.info.log('warn', "exception", {
				guid: this.guid,
				exception: e
			});
		}

		log.access.log('info', 'disconnect', {
			guid: this.guid,
			ip: ip,
			port: port
		});
         
        this.socket.broadcast.emit('leave', {
            guid: this.guid
        });
        
        this.socket.removeAllListeners('talk');
        this.socket.removeAllListeners('command');
        this.socket.removeAllListeners('disconnect');

        this.room.leave(this);
    }
}