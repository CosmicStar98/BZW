 /*!
  * Application : bonziworld
  * Version     : v3.4.61_7700a6b_2021-11-03T17:30:42+00:00
  * Built       : 2021-11-03
  * Environment : production
!*/


var admin = false
    var adElement = "#ap_iframe";
    function updateAds() {
        var height = $(window).height() - $(adElement).height(),
            hideAd = height <= 250;
        hideAd && (height = $(window).height()), $(adElement)[hideAd ? "hide" : "show"](), $("#content").height(height);
    }
    $(function () {
        $(window).on("load", updateAds), $(window).resize(updateAds), $("body").on("DOMNodeInserted", adElement, updateAds), $("body").on("DOMNodeRemoved", adElement, updateAds);
    });
    ("use strict");
    var _createClass = (function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                (descriptor.enumerable = descriptor.enumerable || !1), (descriptor.configurable = !0), "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor;
        };
    })();
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    var Bonzi = (function () {
            function Bonzi(id, userPublic) {
                var _this2 = this;
                _classCallCheck(this, Bonzi),
                    (this.userPublic = userPublic || { name: "BonziBUDDY", status: "Hello WORLD!", color: "purple", speed: 175, pitch: 50, voice: "en-us" }),
                    (this.userPublic = userPublic || { name: "BonziBOT | b!help", status: "| Prefix: <b>b!</b> |", color: "god", speed: 175, pitch: 50, voice: "en-us" }),
                    (this.color = this.userPublic.color),
                    this.colorPrev,
                    (this.data = window.BonziData),
                    (this.drag = !1),
                    (this.dragged = !1),
                    (this.eventQueue = []),
                    (this.eventRun = !0),
                    (this.event = null),
                    (this.willCancel = !1),
                    (this.run = !0),
                    (this.mute = !1),
                    (this.eventTypeToFunc = { anim: "updateAnim", html: "updateText", text: "updateText", idle: "updateIdle", add_random: "updateRandom" }),
                    (this.id = void 0 === id ? s4() + s4() : id),
                    (this.rng = new Math.seedrandom(this.seed || this.id || Math.random())),
                    (this.selContainer = "#content"),
                    (this.$container = $(this.selContainer)),
                   /* this.$container.append(
                        "\n\t\t\t<div id='bonzi_" +
                            this.id +
                            "' class='bonzi'>\n\t\t\t\t<div class='bonzi_name'></div>\n\t\t\t\t\t<div class='bonzi_placeholder'></div>\n\t\t\t\t<div style='display:none' class='bubble'>\n\t\t\t\t\t<p class='bubble-content'></p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t"
                    ), */
                    this.$container.append(
                        "\n\t\t\t<div id='bonzi_" +
                            this.id +
                            "' class='bonzi'>\n\t\t\t\t<div class='bonzi_status' style='display:none'></div>\n\t\t\t\t<div class='bonzi_name'></div>\n\t\t\t\t\t<div class='bonzi_placeholder'></div>\n\t\t\t\t<div style='display:none' class='bubble'>\n\t\t\t\t\t<p class='bubble-content'></p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t"
                    ),
                    (this.selElement = "#bonzi_" + this.id),
                    (this.selDialog = this.selElement + " > .bubble"),
                    (this.selDialogCont = this.selElement + " > .bubble > p"),
                    (this.selNametag = this.selElement + " > .bonzi_name"),
                    (this.selStatus = this.selElement + " > .bonzi_status"),
                    (this.selCanvas = this.selElement + " > .bonzi_placeholder"),
                    $(this.selCanvas).width(this.data.size.x).height(this.data.size.y),
                    (this.$element = $(this.selElement)),
                    (this.$canvas = $(this.selCanvas)),
                    (this.$dialog = $(this.selDialog)),
                    (this.$dialogCont = $(this.selDialogCont)),
                    (this.$nametag = $(this.selNametag)),
                    (this.$bonzistatus = $(this.selStatus)),
                    this.updateName(),
                    this.updateStatus(this.userPublic.status),
                    $.data(this.$element[0], "parent", this),
                    this.updateSprite(!0),
                    (this.generate_event = function (a, b, c) {
                      var d = this;
                      var _this = this;
                        a[b](function (e) {
                            _this[c](e);
                        });
                    }),
                    this.generate_event(this.$canvas, "mousedown", "mousedown"),
                    this.generate_event($(window), "mousemove", "mousemove"),
                    this.generate_event($(window), "mouseup", "mouseup");
                var coords = this.maxCoords();
                (this.x = coords.x * this.rng()),
                    (this.y = coords.y * this.rng()),
                    this.move(),
                    $.contextMenu({
                        selector: this.selCanvas,
                        build: function ($trigger, e) {
                            return {
                                items: {
                                    cancel: {
                                        name: "Cancel",
                                        callback: function () {
                                            _this2.cancel();
                                        },
                                    },
                                    mute: {
                                        name: function () {
                                            return _this2.mute ? "Unmute" : "Mute";
                                        },
                                        callback: function () {
                                            _this2.cancel(), (_this2.mute = !_this2.mute);
                                        },
                                    },
                                    asshole: {
                                        name: "Call an Asshole",
                                        callback: function () {
                                            socket.emit("command", { list: ["asshole", _this2.userPublic.name] });
                                        },
                                    },
                                    owo: {
                                        name: "Notice Bulge",
                                        callback: function () {
                                            socket.emit("command", { list: ["owo", _this2.userPublic.name] });
                                        },
                                    }, 
                                    uwu: {
                                        name: "Notice Bulge 2",
                                        callback: function () {
                                            socket.emit("command", { list: ["uwu", _this2.userPublic.name] });
                                        },
                                    }, 
                                /*    modtools: {
                                        name: function () {
                                            return admin ? "Moderation Tools" : "";
                                        },
                                        disabled: function () {
                                            return !admin;
                                        },
                                        items: {
                                            kick: {
                                                name: function () {
                                                    return admin ? "Kick" : "";
                                                },
                                                callback: function () {
                                                    socket.emit("command", { list: ["kick", this.id] });
                                                },
                                            },
                                            ban: {
                                                name: function () {
                                                    return admin ? "Ban" : "";
                                                },
                                                callback: function () {
                                                    socket.emit("command", { list: ["ban", this.id] });
                                                },
                                            },
                                        },
                                    }, */
                               },
                            };
                        },
                        animation: { duration: 175, show: "fadeIn", hide: "fadeOut" },
                    }),
                    (this.needsUpdate = !1),
                    this.runSingleEvent([{ type: "anim", anim: "surf_intro", ticks: 30 }]);
            }
            return (
                _createClass(Bonzi, [
                    {
                        key: "eventMake",
                        value: function (list) {
                            return {
                                list: list,
                                index: 0,
                                timer: 0,
                                cur: function () {
                                    return this.list[this.index];
                                },
                            };
                        },
                    },
                    {
                        key: "mousedown",
                        value: function (e) {
                            1 == e.which && ((this.drag = !0), (this.dragged = !1), (this.drag_start = { x: e.pageX - this.x, y: e.pageY - this.y }));
                        },
                    },
                    {
                        key: "mousemove",
                        value: function (e) {
                            this.drag && (this.move(e.pageX - this.drag_start.x, e.pageY - this.drag_start.y), (this.dragged = !0));
                        },
                    },
                    {
                        key: "move",
                        value: function (x, y) {
                            0 !== arguments.length && ((this.x = x), (this.y = y));
                            var max = this.maxCoords();
                            (this.x = Math.min(Math.max(0, this.x), max.x)),
                                (this.y = Math.min(Math.max(0, this.y), max.y)),
                                this.$element.css({ marginLeft: this.x, marginTop: this.y }),
                                (this.sprite.x = this.x),
                                (this.sprite.y = this.y),
                                (BonziHandler.needsUpdate = !0),
                                this.updateDialog();
                        },
                    },
                    {
                        key: "mouseup",
                        value: function (e) {
                            !this.dragged && this.drag && this.cancel(), (this.drag = !1), (this.dragged = !1);
                        },
                    },
                    {
                        key: "runSingleEvent",
                        value: function (list) {
                            this.mute || this.eventQueue.push(this.eventMake(list));
                        },
                    },
                    {
                        key: "clearDialog",
                        value: function () {
                            this.$dialogCont.html(""), this.$dialog.hide();
                        },
                    },
                    {
                        key: "cancel",
                        value: function () {
                            this.clearDialog(), this.stopSpeaking(), (this.eventQueue = [this.eventMake([{ type: "idle" }])]);
                        },
                    },
                    {
                        key: "retry",
                        value: function () {
                            this.clearDialog(), (this.event.timer = 0);
                        },
                    },
                    {
                        key: "stopSpeaking",
                        value: function () {
                            this.goingToSpeak = !1;
                            try {
                                this.voiceSource.stop();
                            } catch (e) {}
                        },
                    },
                    {
                        key: "cancelQueue",
                        value: function () {
                            this.willCancel = !0;
                        },
                    },
                    {
                        key: "updateAnim",
                        value: function () {
                            0 === this.event.timer && this.sprite.gotoAndPlay(this.event.cur().anim), this.event.timer++, (BonziHandler.needsUpdate = !0), this.event.timer >= this.event.cur().ticks && this.eventNext();
                        },
                    },
                    {
                        key: "updateText",
                        value: function () {
                            0 === this.event.timer && (this.$dialog.css("display", "block"), (this.event.timer = 1), this.talk(this.event.cur().text, this.event.cur().say, !0)), "none" == this.$dialog.css("display") && this.eventNext();
                        },
                    },
                    {
                        key: "updateIdle",
                        value: function () {
                            var goNext = "idle" == this.sprite.currentAnimation && 0 === this.event.timer;
                            (goNext = goNext || -1 != this.data.pass_idle.indexOf(this.sprite.currentAnimation))
                                ? this.eventNext()
                                : (0 === this.event.timer && ((this.tmp_idle_start = this.data.to_idle[this.sprite.currentAnimation]), this.sprite.gotoAndPlay(this.tmp_idle_start), (this.event.timer = 1)),
                                  this.tmp_idle_start != this.sprite.currentAnimation && "idle" == this.sprite.currentAnimation && this.eventNext(),
                                  (BonziHandler.needsUpdate = !0));
                        },
                    },
                    {
                        key: "updateRandom",
                        value: function () {
                            var add = this.event.cur().add,
                                index = Math.floor(add.length * this.rng()),
                                e = this.eventMake(add[index]);
                            this.eventNext(), this.eventQueue.unshift(e);
                        },
                    },
                    {
                        key: "update",
                        value: function () {
                            if (this.run) {
                                if (
                                    (0 !== this.eventQueue.length && this.eventQueue[0].index >= this.eventQueue[0].list.length && this.eventQueue.splice(0, 1),
                                    (this.event = this.eventQueue[0]),
                                    0 !== this.eventQueue.length && this.eventRun)
                                ) {
                                    var eventType = this.event.cur().type;
                                    try {
                                        this[this.eventTypeToFunc[eventType]]();
                                    } catch (e) {
                                        this.event.index++;
                                    }
                                }
                                this.willCancel && (this.cancel(), (this.willCancel = !1)), this.needsUpdate && (this.stage.update(), (this.needsUpdate = !1));
                            }
                        },
                    },
                    {
                        key: "eventNext",
                        value: function () {
                            (this.event.timer = 0), (this.event.index += 1);
                        },
                    },
                    {
                        key: "talk",
                        value: function (text, say, allowHtml) {
                            var _this3 = this;
                            (allowHtml = allowHtml || !1),
                                (text = replaceAll((text = replaceAll(text, "{NAME}", this.userPublic.name)), "{COLOR}", this.color)),
                                (say = void 0 !== say ? replaceAll((say = replaceAll(say, "{NAME}", this.userPublic.name)), "{COLOR}", this.color) : text.replace("&gt;", ""));
                            var greentext = "&gt;" == (text = linkify(text)).substring(0, 4) || ">" == text[0];
                            this.$dialogCont[allowHtml ? "html" : "text"](text)[greentext ? "addClass" : "removeClass"]("bubble_greentext").removeClass("bubble_autowidth").css("display", "block"),
                              this.$dialog.removeClass('bubble_autowidth');
                                this.stopSpeaking(),
                                (this.goingToSpeak = !0),
                                  
                                  // speak.js voices
                               speak.play(
                                    say,
                                    { pitch: this.userPublic.pitch, speed: this.userPublic.speed },
                                    function () {
                                        _this3.clearDialog();
                                    },
                                    function (source) {
                                        _this3.goingToSpeak || source.stop(), (_this3.voiceSource = source);
                                    },
                                );
                            },
                    },
                    {
                        key: "joke",
                        value: function () {
                            this.runSingleEvent(this.data.event_list_joke);
                        },
                    },
                    {
                        key: "fact",
                        value: function () {
                            this.runSingleEvent(this.data.event_list_fact);
                        },
                    },
                    {
                        key: "exit",
                        value: function (callback) {
                            this.runSingleEvent([{ type: "anim", anim: "surf_away", ticks: 30 }]), setTimeout(callback, 2e3);
                        },
                    },
                    {
                        key: "deconstruct",
                        value: function () {
                            this.stopSpeaking(), BonziHandler.stage.removeChild(this.sprite), (this.run = !1), this.$element.remove();
                        },
                    },
                    {
                        key: "updateName",
                        value: function () {
                            this.$nametag.text(this.userPublic.name);
                        },
                    },
                    {
                    key: "updateStatus",
                    value: function (a) {
$(function() {
$('.bonzi_status').each(function() {
       if ($(this).html()=="") {
             $(this).hide();
       }
    }); 
});
$(function() {
$('.bonzi_status').each(function() {
       if ($(this).html()=="undefined") {
             $(this).hide();
       }
    }); 
});

$('.bonzi_status:empty').css("display", "none"); 
                      
                        "" !== a ? (this.$bonzistatus.css("display", "block"), this.$bonzistatus.html(a)) : (this.$bonzistatus.css("display", "none"), this.$bonzistatus.html(""));
                    },
                },
                {
                    key: "image",
                    value: function (a) {
                        if (!this.mute) {
                            var b = "embed";
                           // this.$dialog.addClass('bubble_autowidth');
                            this.$dialogCont.html("<img width='170' src='" + a + "'></img>"), this.$dialog.show();
                        }
                    },
                },
                {
                    key: "video",
                    value: function (a) {
                        if (!this.mute) {
                            var b = "embed";
                            this.$dialog.addClass('bubble_autowidth');
                            this.$dialogCont.html(" <video height='270' controls id='bonziworld-video'><source src='" + a + "' type='video/mp4' loop>Your browser does not support the video tag.</video> "), this.$dialog.show();
                        }
                    },
                },
                {
                    key: "audio",
                    value: function (a) {
                        if (!this.mute) {
                            var b = "embed";
                            this.$dialog.addClass('bubble_autowidth');
                            this.$dialogCont.html(" <audio loop controls id='bonziworld-audio'><source src='" + a + "' type='audio/mp3' loop>"), this.$dialog.show();
                        }
                    },
                },
                {
                    // Bonzi.world code. Credit is given
                    key: 'youtube',
                    value: function youtube(vid) {
                      var self = this;
                      if (!this.mute) {
                        var ytSize = {
                          w: 480,
                          h: 270
                        };
                        var thisDialogId = s4();
                        var vcid = `bz-${self.id}-yt-v`;
                        self.$dialog.addClass('bubble_autowidth');
                        self.$dialogCont.html(`<div id="${vcid}"></div>`);
                        self.player = new YT.Player(vcid, {
                          height: ytSize.h,
                          width: ytSize.w,
                          videoId: vid,
                          host: `${window.location.protocol}//www.youtube.com`,
                          playerVars: {
                            autoplay: 0,
                            modestbranding: 1,
                            controls: 2
                          },
                          events: {
                            onReady: function (event) {
                              self.openDialogId = String(thisDialogId);
                              self.$dialog.show(200);
                            },
                            onStateChange: function (event) {
                              // -1 - unstarted
                              // 0 - ended
                              // 1 - playing
                              // 2 - paused
                              // 3 - buffering
                              // 5 - video cued
                              switch (event.data) {
                                case 0:
                                  // Ended
                                  self.clearDialog(thisDialogId, false);
                                  break;
                              }
                            }
                          }
                        });
                      }
                    }
                },
                    /*    key: "youtube",
                        value: function (vid) {
                            if (!this.mute) {
                                this.$dialogCont.html(
                                    '\n\t\t\t\t\t<iframe type="text/html" width="173" height="173" \n\t\t\t\t\tsrc="https://www.youtube.com/embed/' +
                                        vid +
                                        '?autoplay=1" \n\t\t\t\t\tstyle="width:173px;height:173px"\n\t\t\t\t\tframeborder="0"\n\t\t\t\t\tallowfullscreen="allowfullscreen"\n\t\t\t\t\tmozallowfullscreen="mozallowfullscreen"\n\t\t\t\t\tmsallowfullscreen="msallowfullscreen"\n\t\t\t\t\toallowfullscreen="oallowfullscreen"\n\t\t\t\t\twebkitallowfullscreen="webkitallowfullscreen"\n\t\t\t\t\t></iframe>\n\t\t\t\t'
                                ),
                                    this.$dialog.show();
                            }
                        },
                    }, */
                    {
                        key: "backflip",
                        value: function (swag) {
                            var event = [{ type: "anim", anim: "backflip", ticks: 15 }];
                            swag && (event.push({ type: "anim", anim: "cool_fwd", ticks: 30 }), event.push({ type: "idle" })), this.runSingleEvent(event);
                        },
                    },
                    {
                    key: "sad",
                    value: function () {
                        var a = [{ type: "anim", anim: "sad_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "think",
                    value: function () {
                        var a = [{ type: "anim", anim: "think_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "clap",
                    value: function () {
                        var a = [{ type: "anim", anim: "clap_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {  
                    key: "swag",
                    value: function () {
                        var a = [{ type: "anim", anim: "cool_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "praise",
                    value: function () {
                        var a = [{ type: "anim", anim: "praise_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "shrug",
                    value: function () {
                        var a = [{ type: "anim", anim: "shrug_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "earth",
                    value: function () {
                        var a = [{ type: "anim", anim: "earth_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "grin",
                    value: function () {
                        var a = [{ type: "anim", anim: "grin_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                        key: "updateDialog",
                        value: function () {
                            var max = this.maxCoords();
                            this.data.size.x + this.$dialog.width() > max.x
                                ? this.y < this.$container.height() / 2 - this.data.size.x / 2
                                    ? this.$dialog.removeClass("bubble-top").removeClass("bubble-left").removeClass("bubble-right").addClass("bubble-bottom")
                                    : this.$dialog.removeClass("bubble-bottom").removeClass("bubble-left").removeClass("bubble-right").addClass("bubble-top")
                                : this.x < this.$container.width() / 2 - this.data.size.x / 2
                                ? this.$dialog.removeClass("bubble-left").removeClass("bubble-top").removeClass("bubble-bottom").addClass("bubble-right")
                                : this.$dialog.removeClass("bubble-right").removeClass("bubble-top").removeClass("bubble-bottom").addClass("bubble-left");
                        },
                    },
                    {
                        key: "maxCoords",
                        value: function () {
                            return { x: this.$container.width() - this.data.size.x, y: this.$container.height() - this.data.size.y - $("#chat_bar").height() };
                        },
                    },
                    {
                        key: "asshole",
                        value: function (target) {
                            this.runSingleEvent([
                                { type: "text", text: "Hey, " + target + "!" },
                                { type: "text", text: "You're a fucking asshole!", say: "your a fucking asshole!" },
                                { type: "anim", anim: "grin_fwd", ticks: 15 },
                                { type: "idle" },
                            ]);
                        },
                    },
                    {
                        key: "owo",
                        value: function (target) {
                            this.runSingleEvent([
                                { type: "text", text: "*notices " + target + "'s BonziBulge???*", say: "notices " + target + "s bonzibulge" },
                                { type: "text", text: "owo, wat dis?", say: "oh woah, what diss?" },
                            ]);
                        },
                    },
                {
                    key: "uwu",
                    value: function (a) {
                        this.runSingleEvent([
                            { type: "text", text: "*notices " + a + "'s BonziBulge???*", say: "notices " + a + "s bonzibulge" },
                            { type: "text", text: "uwu, wat dis? uwu", say: "uwu? what diss?" },
                        ]);
                    },
                },
                    {
                        key: "updateSprite",
                        value: function (hide) {
                            var stage = BonziHandler.stage;
                            this.cancel(),
                                stage.removeChild(this.sprite),
                                this.colorPrev != this.color && (delete this.sprite, (this.sprite = new createjs.Sprite(BonziHandler.spriteSheets[this.color], hide ? "gone" : "idle"))),
                                stage.addChild(this.sprite),
                                this.move();
                        },
                    },
                ]),
                Bonzi
            );
        })(),
        BonziData = {
            size: { x: 200, y: 160 },
            sprite: {
               /* peedy: {        
                frames: { width: 160, height: 128 },
                animations: {
                    idle: 0,
                    surf_across_fwd: [1, 8, "surf_across_still", 0.7],
                    wave: [250, 261, "idle", 0.6],
                    sad_fwd: [237, 241, "sad_still", 0.8],
                    sad_still: 241,
                    think_fwd: [242, 247, "think_still", 0.8],
                    think_still: 247,
                    confused_still: 137,
                    surf_across_still: 8,
                    surf_across_back: { frames: range(8, 12), next: "idle", speed: 0.7 },
                    sad_back: { frames: range(239, 237), next: "idle", speed: 0.8 },
                    confused_fwd: [127, 137, "confused_still", 0.7],
                    think_back: { frames: range(247, 242), next: "idle", speed: 0.8 },
                    confused_back: { frames: range(137, 127), next: "idle", speed: 0.7 },
                    clap_fwd: { frames: [14, 15, 16, 17, 17, 17, 17, 18, 19, 20, 21, 22], next: "clap_still", speed: 0.5 },
                    clap_still: 22, 
                    clap_back: { frames: range(22, 14), next: "idle", speed: 0.6 },
                    surf_intro: { frames: range(45, 23), next: "idle", speed: 0.6 },
                    surf_away: [23, 45, "gone", 1],
                    gone: 39,
                    shrug_fwd: [288, 306, "shrug_still", 0.5],
                    nod: [40, 44, "idle", 0.5],
                    shrug_still: 306,
                    shrug_back: { frames: range(306, 318), next: "idle", speed: 0.5 },
                    earth_fwd: [51, 57, "earth_still", 0.8],
                    earth_still: [58, 80, "earth_still", 0.8],
                    earth_back: [81, 86, "idle", 0.8],
                    look_down_fwd: [87, 90, "look_down_still", 1],
                    look_down_still: 91,
                    look_down_back: { frames: range(90, 87), next: "idle", speed: 1 },
                    lean_left_fwd: [94, 97, "lean_left_still", 1],
                    lean_left_still: 98,
                    lean_left_back: { frames: range(97, 94), next: "idle", speed: 1 },
                    beat_fwd: [101, 103, "beat_still", 0.6],
                    banana_fwd: [344, 354, "idle", 0.6],
                    surprised_fwd: [356, 360, "surprised_still", 0.8],
                    laugh_fwd: [361, 364, "laugh_still", 0.8],
                    write_fwd: [365, 377, "write_still", 0.8],
                    write_once_fwd: [365, 400, "write_once_still", 0.8],
                    write_infinite_fwd: [365, 396, "write_infinite", 0.8],
                    write_infinite: [381, 396, "write_infinite", 0.8],
                    write_still: 377,
                    write_once_still: 401,
                    write_back: { frames: range(378, 366), next: "idle", speed: 0.8 },
                    laugh_back: { frames: range(364, 361), next: "idle", speed: 0.8 },
                    surprised_back: { frames: range(360, 356), next: "idle", speed: 0.8 },
                    laugh_still: [363, 364, "laugh_still", 0.6],
                    surprised_still: 360,
                    banana_fwd: [344, 354, "banana_back", 0.6],
                    banana_back: [350, 344, "idle", 0.6],
                    beat_still: [104, 107, "beat_still", 0.6],
                    beat_back: { frames: range(103, 101), next: "idle", speed: 1 },
                    cool_fwd: [333, 348, "cool_still", 0.5],
                    cool_still: 348,
                    cool_back: { frames: range(348, 333), next: "idle", speed: 0.5 },
                    cool_right_fwd: [348, 352, "cool_right_still", 1],
                    cool_right_still: 352,
                    cool_right_back: { frames: range(352, 348), next: "idle", speed: 1 },
                    cool_left_fwd: [131, 133, "cool_left_still", 1],
                    cool_left_still: 134,
                    cool_left_back: { frames: range(133, 131), next: "cool_still", speed: 1 },
                    cool_adjust: { frames: [124, 123, 122, 121, 120, 135, 136, 135, 120, 121, 122, 123, 124], next: "cool_still", speed: 1 },
                    present_fwd: [137, 141, "present_still", 1],
                    present_still: 142,
                    present_back: { frames: range(141, 137), next: "idle", speed: 1 },
                    look_left_fwd: [143, 145, "look_left_still", 1],
                    look_left_still: 146,
                    look_left_back: { frames: range(145, 143), next: "idle", speed: 1 },
                    look_right_fwd: [149, 151, "look_right_still", 1],
                    look_right_still: 152,
                    look_right_back: { frames: range(151, 149), next: "idle", speed: 1 },
                    lean_right_fwd: { frames: range(158, 156), next: "lean_right_still", speed: 1 },
                    lean_right_still: 155,
                    lean_right_back: [156, 158, "idle", 1],
                    praise_fwd: [159, 163, "praise_still", 1],
                    praise_still: 164,
                    praise_back: { frames: range(163, 159), next: "idle", speed: 1 },
                    greet_fwd: [225, 232, "greet_still", 1],
                    greet_still: 232,
                    greet_back: { frames: range(232, 225), next: "idle", speed: 1 },
                    grin_fwd: [182, 189, "grin_still", 0.6],
                    grin_still: 184,
                    grin_back: { frames: range(184, 182), next: "idle", speed: 0.6 },
                    backflip: [323, 332, "idle", 0.6],
                }
            },
            merlin: {        
                frames: { width: 130, height: 128 },
                animations: {
                    idle: 0,
                    surf_across_fwd: [1, 16, "surf_across_still", 0.7],
                    wave: [250, 261, "idle", 0.6],
                    sad_fwd: [237, 241, "sad_still", 0.8],
                    sad_still: 241,
                    think_fwd: [55, 59, "think_still", 0.8],
                    think_still: 59,
                    confused_still: 137,
                    surf_across_still: 16,
                    surf_across_back: { frames: range(16, 1), next: "idle", speed: 0.7 },
                    sad_back: { frames: range(239, 237), next: "idle", speed: 0.8 },
                    confused_fwd: [127, 137, "confused_still", 0.7],
                    think_back: { frames: range(247, 242), next: "idle", speed: 0.8 },
                    confused_back: { frames: range(137, 127), next: "idle", speed: 0.7 },
                    clap_fwd: { frames: [20, 21, 22, 23, 24, 25, 26, 27, 27, 27, 27, 27, 27, 28, 29, 30], next: "clap_still", speed: 0.6 },
                    clap_still: 30, 
                    clap_back: { frames: range(31, 35), next: "idle", speed: 0.6 },
                    surf_intro: { frames: range(50, 40), next: "idle", speed: 0.6 },
                    surf_away: [40, 50, "gone", 0.6],
                    gone: 50,
                    shrug_fwd: [288, 306, "shrug_still", 0.5],
                    nod: [51, 54, "idle", 0.5],
                    shrug_still: 306,
                    shrug_back: { frames: range(306, 318), next: "idle", speed: 0.5 },
                    earth_fwd: [51, 57, "earth_still", 0.8],
                    earth_still: [58, 80, "earth_still", 0.8],
                    earth_back: [81, 86, "idle", 0.8],
                    look_down_fwd: [87, 90, "look_down_still", 1],
                    look_down_still: 91,
                    look_down_back: { frames: range(90, 87), next: "idle", speed: 1 },
                    lean_left_fwd: [94, 97, "lean_left_still", 1],
                    lean_left_still: 98,
                    lean_left_back: { frames: range(97, 94), next: "idle", speed: 1 },
                    beat_fwd: [101, 103, "beat_still", 0.6],
                    banana_fwd: [344, 354, "idle", 0.6],
                    surprised_fwd: [356, 360, "surprised_still", 0.8],
                    laugh_fwd: [361, 364, "laugh_still", 0.8],
                    write_fwd: [365, 377, "write_still", 0.8],
                    write_once_fwd: [365, 400, "write_once_still", 0.8],
                    write_infinite_fwd: [365, 396, "write_infinite", 0.8],
                    write_infinite: [381, 396, "write_infinite", 0.8],
                    write_still: 377,
                    write_once_still: 401,
                    write_back: { frames: range(378, 366), next: "idle", speed: 0.8 },
                    laugh_back: { frames: range(364, 361), next: "idle", speed: 0.8 },
                    surprised_back: { frames: range(360, 356), next: "idle", speed: 0.8 },
                    laugh_still: [363, 364, "laugh_still", 0.6],
                    surprised_still: 360,
                    banana_fwd: [344, 354, "banana_back", 0.6],
                    banana_back: [350, 344, "idle", 0.6],
                    beat_still: [104, 107, "beat_still", 0.6],
                    beat_back: { frames: range(103, 101), next: "idle", speed: 1 },
                    cool_fwd: [333, 348, "cool_still", 0.5],
                    cool_still: 348,
                    cool_back: { frames: range(348, 333), next: "idle", speed: 0.5 },
                    cool_right_fwd: [348, 352, "cool_right_still", 1],
                    cool_right_still: 352,
                    cool_right_back: { frames: range(352, 348), next: "idle", speed: 1 },
                    cool_left_fwd: [131, 133, "cool_left_still", 1],
                    cool_left_still: 134,
                    cool_left_back: { frames: range(133, 131), next: "cool_still", speed: 1 },
                    cool_adjust: { frames: [124, 123, 122, 121, 120, 135, 136, 135, 120, 121, 122, 123, 124], next: "cool_still", speed: 1 },
                    present_fwd: [137, 141, "present_still", 1],
                    present_still: 142,
                    present_back: { frames: range(141, 137), next: "idle", speed: 1 },
                    look_left_fwd: [143, 145, "look_left_still", 1],
                    look_left_still: 146,
                    look_left_back: { frames: range(145, 143), next: "idle", speed: 1 },
                    look_right_fwd: [149, 151, "look_right_still", 1],
                    look_right_still: 152,
                    look_right_back: { frames: range(151, 149), next: "idle", speed: 1 },
                    lean_right_fwd: { frames: range(158, 156), next: "lean_right_still", speed: 1 },
                    lean_right_still: 155,
                    lean_right_back: [156, 158, "idle", 1],
                    praise_fwd: [159, 163, "praise_still", 1],
                    praise_still: 164,
                    praise_back: { frames: range(163, 159), next: "idle", speed: 1 },
                    greet_fwd: [225, 232, "greet_still", 1],
                    greet_still: 232,
                    greet_back: { frames: range(232, 225), next: "idle", speed: 1 },
                    grin_fwd: [182, 189, "grin_still", 0.6],
                    grin_still: 184,
                    grin_back: { frames: range(184, 182), next: "idle", speed: 0.6 },
                    backflip: [323, 332, "idle", 0.6],
                }
            },
              clippy: {        
                frames: { width: 124, height: 93 },
                animations: {
                    idle: 0,
                    surf_across_fwd: [1, 16, "surf_across_still", 0.7],
                    wave: [250, 261, "idle", 0.6],
                    sad_fwd: [237, 241, "sad_still", 0.8],
                    sad_still: 241,
                    think_fwd: [55, 59, "think_still", 0.8],
                    think_still: 59,
                    confused_still: 137,
                    surf_across_still: 16,
                    surf_across_back: { frames: range(16, 1), next: "idle", speed: 0.7 },
                    sad_back: { frames: range(239, 237), next: "idle", speed: 0.8 },
                    confused_fwd: [127, 137, "confused_still", 0.7],
                    think_back: { frames: range(247, 242), next: "idle", speed: 0.8 },
                    confused_back: { frames: range(137, 127), next: "idle", speed: 0.7 },
                    clap_fwd: { frames: range(30, 51), next: "idle", speed: 0.5 },
                    clap_still: 30, 
                    clap_back: { frames: range(31, 35), next: "idle", speed: 0.6 },
                    surf_intro: { frames: range(53, 51), next: "idle", speed: 0.6 },
                    surf_away: [52, 54, "gone", 0.6],
                    gone: 54,
                    shrug_fwd: [288, 306, "shrug_still", 0.5],
                    nod: [51, 54, "idle", 0.5],
                    shrug_still: 306,
                    shrug_back: { frames: range(306, 318), next: "idle", speed: 0.5 },
                    earth_fwd: [51, 57, "earth_still", 0.8],
                    earth_still: [58, 80, "earth_still", 0.8],
                    earth_back: [81, 86, "idle", 0.8],
                    look_down_fwd: [87, 90, "look_down_still", 1],
                    look_down_still: 91,
                    look_down_back: { frames: range(90, 87), next: "idle", speed: 1 },
                    lean_left_fwd: [94, 97, "lean_left_still", 1],
                    lean_left_still: 98,
                    lean_left_back: { frames: range(97, 94), next: "idle", speed: 1 },
                    beat_fwd: [101, 103, "beat_still", 0.6],
                    banana_fwd: [344, 354, "idle", 0.6],
                    surprised_fwd: [356, 360, "surprised_still", 0.8],
                    laugh_fwd: [361, 364, "laugh_still", 0.8],
                    write_fwd: [365, 377, "write_still", 0.8],
                    write_once_fwd: [365, 400, "write_once_still", 0.8],
                    write_infinite_fwd: [365, 396, "write_infinite", 0.8],
                    write_infinite: [381, 396, "write_infinite", 0.8],
                    write_still: 377,
                    write_once_still: 401,
                    write_back: { frames: range(378, 366), next: "idle", speed: 0.8 },
                    laugh_back: { frames: range(364, 361), next: "idle", speed: 0.8 },
                    surprised_back: { frames: range(360, 356), next: "idle", speed: 0.8 },
                    laugh_still: [363, 364, "laugh_still", 0.6],
                    surprised_still: 360,
                    banana_fwd: [344, 354, "banana_back", 0.6],
                    banana_back: [350, 344, "idle", 0.6],
                    beat_still: [104, 107, "beat_still", 0.6],
                    beat_back: { frames: range(103, 101), next: "idle", speed: 1 },
                    cool_fwd: [333, 348, "cool_still", 0.5],
                    cool_still: 348,
                    cool_back: { frames: range(348, 333), next: "idle", speed: 0.5 },
                    cool_right_fwd: [348, 352, "cool_right_still", 1],
                    cool_right_still: 352,
                    cool_right_back: { frames: range(352, 348), next: "idle", speed: 1 },
                    cool_left_fwd: [131, 133, "cool_left_still", 1],
                    cool_left_still: 134,
                    cool_left_back: { frames: range(133, 131), next: "cool_still", speed: 1 },
                    cool_adjust: { frames: [124, 123, 122, 121, 120, 135, 136, 135, 120, 121, 122, 123, 124], next: "cool_still", speed: 1 },
                    present_fwd: [137, 141, "present_still", 1],
                    present_still: 142,
                    present_back: { frames: range(141, 137), next: "idle", speed: 1 },
                    look_left_fwd: [143, 145, "look_left_still", 1],
                    look_left_still: 146,
                    look_left_back: { frames: range(145, 143), next: "idle", speed: 1 },
                    look_right_fwd: [149, 151, "look_right_still", 1],
                    look_right_still: 152,
                    look_right_back: { frames: range(151, 149), next: "idle", speed: 1 },
                    lean_right_fwd: { frames: range(158, 156), next: "lean_right_still", speed: 1 },
                    lean_right_still: 155,
                    lean_right_back: [156, 158, "idle", 1],
                    praise_fwd: [159, 163, "praise_still", 1],
                    praise_still: 164,
                    praise_back: { frames: range(163, 159), next: "idle", speed: 1 },
                    greet_fwd: [225, 232, "greet_still", 1],
                    greet_still: 232,
                    greet_back: { frames: range(232, 225), next: "idle", speed: 1 },
                    grin_fwd: [182, 189, "grin_still", 0.6],
                    grin_still: 184,
                    grin_back: { frames: range(184, 182), next: "idle", speed: 0.6 },
                    backflip: [323, 332, "idle", 0.6],
                }
            },
            f1: {        
                frames: { width: 124, height: 93 },
                animations: {
                    idle: 0,
                    surf_across_fwd: [1, 16, "surf_across_still", 0.7],
                    wave: [250, 261, "idle", 0.6],
                    sad_fwd: [237, 241, "sad_still", 0.8],
                    sad_still: 241,
                    think_fwd: [55, 59, "think_still", 0.8],
                    think_still: 59,
                    confused_still: 137,
                    surf_across_still: 16,
                    surf_across_back: { frames: range(16, 1), next: "idle", speed: 0.7 },
                    sad_back: { frames: range(239, 237), next: "idle", speed: 0.8 },
                    confused_fwd: [127, 137, "confused_still", 0.7],
                    think_back: { frames: range(247, 242), next: "idle", speed: 0.8 },
                    confused_back: { frames: range(137, 127), next: "idle", speed: 0.7 },
                    clap_fwd: { frames: [17, 18, 19, 20, 21, 22, 23, 24, 25, 25, 25, 25, 25, 25], next: "clap_back", speed: 0.6 },
                    clap_still: 30, 
                    clap_back: { frames: [25, 26, 27], next: "idle", speed: 0.4 },
                    surf_intro: { frames: range(622, 588), next: "idle", speed: 0.6 },
                    surf_away: [588, 622, "gone", 0.6],
                    gone: 622,
                    shrug_fwd: [288, 306, "shrug_still", 0.5],
                    nod: [51, 54, "idle", 0.5],
                    shrug_still: 306,
                    shrug_back: { frames: range(306, 318), next: "idle", speed: 0.5 },
                    earth_fwd: [51, 57, "earth_still", 0.8],
                    earth_still: [58, 80, "earth_still", 0.8],
                    earth_back: [81, 86, "idle", 0.8],
                    look_down_fwd: [87, 90, "look_down_still", 1],
                    look_down_still: 91,
                    look_down_back: { frames: range(90, 87), next: "idle", speed: 1 },
                    lean_left_fwd: [94, 97, "lean_left_still", 1],
                    lean_left_still: 98,
                    lean_left_back: { frames: range(97, 94), next: "idle", speed: 1 },
                    beat_fwd: [101, 103, "beat_still", 0.6],
                    banana_fwd: [344, 354, "idle", 0.6],
                    surprised_fwd: [356, 360, "surprised_still", 0.8],
                    laugh_fwd: [361, 364, "laugh_still", 0.8],
                    write_fwd: [365, 377, "write_still", 0.8],
                    write_once_fwd: [365, 400, "write_once_still", 0.8],
                    write_infinite_fwd: [365, 396, "write_infinite", 0.8],
                    write_infinite: [381, 396, "write_infinite", 0.8],
                    write_still: 377,
                    write_once_still: 401,
                    write_back: { frames: range(378, 366), next: "idle", speed: 0.8 },
                    laugh_back: { frames: range(364, 361), next: "idle", speed: 0.8 },
                    surprised_back: { frames: range(360, 356), next: "idle", speed: 0.8 },
                    laugh_still: [363, 364, "laugh_still", 0.6],
                    surprised_still: 360,
                    banana_fwd: [344, 354, "banana_back", 0.6],
                    banana_back: [350, 344, "idle", 0.6],
                    beat_still: [104, 107, "beat_still", 0.6],
                    beat_back: { frames: range(103, 101), next: "idle", speed: 1 },
                    cool_fwd: [333, 348, "cool_still", 0.5],
                    cool_still: 348,
                    cool_back: { frames: range(348, 333), next: "idle", speed: 0.5 },
                    cool_right_fwd: [348, 352, "cool_right_still", 1],
                    cool_right_still: 352,
                    cool_right_back: { frames: range(352, 348), next: "idle", speed: 1 },
                    cool_left_fwd: [131, 133, "cool_left_still", 1],
                    cool_left_still: 134,
                    cool_left_back: { frames: range(133, 131), next: "cool_still", speed: 1 },
                    cool_adjust: { frames: [124, 123, 122, 121, 120, 135, 136, 135, 120, 121, 122, 123, 124], next: "cool_still", speed: 1 },
                    present_fwd: [137, 141, "present_still", 1],
                    present_still: 142,
                    present_back: { frames: range(141, 137), next: "idle", speed: 1 },
                    look_left_fwd: [143, 145, "look_left_still", 1],
                    look_left_still: 146,
                    look_left_back: { frames: range(145, 143), next: "idle", speed: 1 },
                    look_right_fwd: [149, 151, "look_right_still", 1],
                    look_right_still: 152,
                    look_right_back: { frames: range(151, 149), next: "idle", speed: 1 },
                    lean_right_fwd: { frames: range(158, 156), next: "lean_right_still", speed: 1 },
                    lean_right_still: 155,
                    lean_right_back: [156, 158, "idle", 1],
                    praise_fwd: [159, 163, "praise_still", 1],
                    praise_still: 164,
                    praise_back: { frames: range(163, 159), next: "idle", speed: 1 },
                    greet_fwd: [225, 232, "greet_still", 1],
                    greet_still: 232,
                    greet_back: { frames: range(232, 225), next: "idle", speed: 1 },
                    grin_fwd: [182, 189, "grin_still", 0.6],
                    grin_still: 184,
                    grin_back: { frames: range(184, 182), next: "idle", speed: 0.6 },
                    backflip: [323, 332, "idle", 0.6],
                }
            }, */
                frames: { width: 200, height: 160 },
                animations: {
                    idle: 0,
                    sad_fwd: [237, 241, "sad_still", 0.8],
                    sad_still: 241,
                    think_fwd: [242, 247, "think_still", 0.8],
                    think_still: 247,
                    confused_still: 137,
                    sad_back: { frames: range(239, 237), next: "idle", speed: 0.8 },
                    confused_fwd: [127, 137, "confused_still", 0.7],
                    think_back: { frames: range(247, 242), next: "idle", speed: 0.8 },
                    confused_back: { frames: range(137, 127), next: "idle", speed: 0.7 },
                    surf_across_fwd: [1, 8, "surf_across_still", 1],
                    surf_across_still: 9,
                    surf_across_back: { frames: range(8, 1), next: "idle", speed: 1 },
                    clap_fwd: [10, 12, "clap_still", 1],
                    clap_still: [13, 15, "clap_still", 1],
                    clap_back: { frames: range(12, 10), next: "idle", speed: 1 },
                    surf_intro: [277, 302, "idle", 1],
                    surf_away: [16, 38, "gone", 1],
                    gone: 39,
                    shrug_fwd: [40, 50, "shrug_still", 1],
                    shrug_still: 50,
                    shrug_back: { frames: range(50, 40), next: "idle", speed: 1 },
                    earth_fwd: [51, 57, "earth_still", 1],
                    earth_still: [58, 80, "earth_still", 1],
                    earth_back: [81, 86, "idle", 1],
                    look_down_fwd: [87, 90, "look_down_still", 1],
                    look_down_still: 91,
                    look_down_back: { frames: range(90, 87), next: "idle", speed: 1 },
                    lean_left_fwd: [94, 97, "lean_left_still", 1],
                    lean_left_still: 98,
                    lean_left_back: { frames: range(97, 94), next: "idle", speed: 1 },
                    beat_fwd: [101, 103, "beat_still", 1],
                    beat_still: [104, 107, "beat_still", 1],
                    beat_back: { frames: range(103, 101), next: "idle", speed: 1 },
                    cool_fwd: [108, 124, "cool_still", 1],
                    cool_still: 125,
                    cool_back: { frames: range(124, 108), next: "idle", speed: 1 },
                    cool_right_fwd: [126, 128, "cool_right_still", 1],
                    cool_right_still: 129,
                    cool_right_back: { frames: range(128, 126), next: "idle", speed: 1 },
                    cool_left_fwd: [131, 133, "cool_left_still", 1],
                    cool_left_still: 134,
                    cool_left_back: { frames: range(133, 131), next: "cool_still", speed: 1 },
                    cool_adjust: { frames: [124, 123, 122, 121, 120, 135, 136, 135, 120, 121, 122, 123, 124], next: "cool_still", speed: 1 },
                    present_fwd: [137, 141, "present_still", 1],
                    present_still: 142,
                    present_back: { frames: range(141, 137), next: "idle", speed: 1 },
                    look_left_fwd: [143, 145, "look_left_still", 1],
                    look_left_still: 146,
                    look_left_back: { frames: range(145, 143), next: "idle", speed: 1 },
                    look_right_fwd: [149, 151, "look_right_still", 1],
                    look_right_still: 152,
                    look_right_back: { frames: range(151, 149), next: "idle", speed: 1 },
                    lean_right_fwd: { frames: range(158, 156), next: "lean_right_still", speed: 1 },
                    lean_right_still: 155,
                    lean_right_back: [156, 158, "idle", 1],
                    praise_fwd: [159, 163, "praise_still", 1],
                    praise_still: 164,
                    praise_back: { frames: range(163, 159), next: "idle", speed: 1 },
                    grin_fwd: [182, 189, "grin_still", 1],
                    grin_still: 184,
                    grin_back: { frames: range(184, 182), next: "idle", speed: 1 },
                    backflip: [331, 343, "idle", 1],
                },
            },
            to_idle: {
                sad_still: "sad_back",
                think_still: "think_back",
                think_fwd: "think_back",
                confused_still: "confused_back",
                confused_fwd: "confused_back",
                surf_across_fwd: "surf_across_back",
                surf_across_still: "surf_across_back",
                clap_fwd: "clap_back",
                clap_still: "clap_back",
                shrug_fwd: "shrug_back",
                shrug_still: "shrug_back",
                earth_fwd: "earth_back",
                earth_still: "earth_back",
                look_down_fwd: "look_down_back",
                look_down_still: "look_down_back",
                lean_left_fwd: "lean_left_back",
                lean_left_still: "lean_left_back",
                beat_fwd: "beat_back",
                beat_still: "beat_back",
                cool_fwd: "cool_back",
                cool_still: "cool_back",
                cool_adjust: "cool_back",
                cool_left_fwd: "cool_left_back",
                cool_left_still: "cool_left_back",
                present_fwd: "present_back",
                present_still: "present_back",
                look_left_fwd: "look_left_back",
                look_left_still: "look_left_back",
                look_right_fwd: "look_right_back",
                look_right_still: "look_right_back",
                lean_right_fwd: "lean_right_back",
                lean_right_still: "lean_right_back",
                praise_fwd: "praise_back",
                praise_still: "praise_back",
                grin_fwd: "grin_back",
                grin_still: "grin_back",
                backflip: "idle",
                idle: "idle",
            },
            pass_idle: ["gone"],
            event_list_joke_open: [
                [
                    { type: "text", text: "Yeah, of course {NAME} wants me to tell a joke." },
                    { type: "anim", anim: "praise_fwd", ticks: 15 },
                    { type: "text", text: '"Haha, look at the stupid {COLOR} monkey telling jokes!" Fuck you. It isn\'t funny.', say: "Hah hah! Look at the stupid {COLOR} monkey telling jokes! Fuck you. It isn't funny." },
                    { type: "anim", anim: "praise_back", ticks: 15 },
                    { type: "text", text: "But I'll do it anyway. Because you want me to. I hope you're happy." },
                ],
                [{ type: "text", text: "{NAME} used /joke. Whoop-dee-fucking doo." }],
                [{ type: "text", text: "HEY YOU IDIOTS ITS TIME FOR A JOKE" }],
                [
                    { type: "text", text: "Wanna hear a joke?" },
                    { type: "text", text: "No?" },
                    { type: "text", text: "Mute me then. That's your fucking problem." },
                ],
                [{ type: "text", text: "Senpai {NAME} wants me to tell a joke." }],
                [{ type: "text", text: "Time for whatever horrible fucking jokes the creator of this site wrote." }],
            ],
            event_list_joke_mid: [
                [
                    { type: "text", text: "What is easy to get into, but hard to get out of?" },
                    { type: "text", text: "Child support!" },
                ],
                [
                    { type: "text", text: "Why do they call HTML HyperText?" },
                    { type: "text", text: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" },
                    { type: "anim", anim: "shrug_back", ticks: 15 },
                    { type: "text", text: "Sorry. I just had an epiphany of my own sad, sad existence." },
                ],
                [
                    {
                        type: "text",
                        text: 'Two sausages are in a pan. One looks at the other and says "Boy it\'s hot in here!" and the other sausage says "Unbelievable! It\'s a talking sausage!"',
                        say: "Two sausages are in a pan. One looks at the other and says, Boy it's hot in here! and the other sausage says, Unbelievable! It's a talking sausage!",
                    },
                    { type: "anim", anim: "shrug_back", ticks: 15 },
                    { type: "text", text: "What were you expecting? A dick joke? You're a sick fuck." },
                ],
                [
                    { type: "text", text: "What is in the middle of Paris?" },
                    { type: "text", text: "A giant inflatable buttplug." },
                ],
                [
                    { type: "text", text: "What goes in pink and comes out blue?" },
                    { type: "text", text: "Sonic's asshole." },
                ],
                [
                    { type: "text", text: "What type of water won't freeze?" },
                    { type: "text", text: "Your mother's." },
                ],
                [
                    { type: "text", text: "Who earns a living by driving his customers away?" },
                    { type: "text", text: "Nintendo!" },
                ],
                [
                    { type: "text", text: "What did the digital clock say to the grandfather clock?" },
                    { type: "text", text: "Suck my clock." },
                ],
                [
                    { type: "text", text: "What do you call a man who shaves 10 times a day?" },
                    { type: "text", text: "A woman." },
                ],
                [
                    { type: "text", text: "How do you get water in watermelons?" },
                    { type: "text", text: "Cum in them." },
                ],
                [
                    { type: "text", text: "Why do we call money bread?" },
                    { type: "text", text: "Because we KNEAD it. Haha please send money to my PayPal at nigerianprince99@bonzi.com" },
                ],
                [
                    { type: "text", text: "What is a cow that eats grass?" },
                    { type: "text", text: "ASS" },
                    { type: "text", text: "I'm a comedic genius, I know." },
                ],
            ],
            event_list_joke_end: [
                [
                    { type: "text", text: "You know {NAME}, a good friend laughs at your jokes even when they're not so funny." },
                    { type: "text", text: "And you fucking suck. Thanks." },
                ],
                [{ type: "text", text: "Where do I come up with these? My ass?" }],
                [
                    { type: "text", text: "Do I amuse you, {NAME}? Am I funny? Do I make you laugh?" },
                    { type: "text", text: "pls respond", say: "please respond" },
                ],
                [{ type: "text", text: "Maybe I'll keep my day job, {NAME}. Patreon didn't accept me." }],
                [
                    { type: "text", text: "Laughter is the best medicine!" },
                    { type: "text", text: "Apart from meth." },
                ],
                [
                    { type: "text", text: "Don't judge me on my sense of humor alone." },
                    { type: "text", text: "Help! I'm being oppressed!" },
                ],
            ],
            event_list_fact_open: [[{ type: "html", text: "Hey kids, it's time for a Fun Fact&reg;!", say: "Hey kids, it's time for a Fun Fact!" }]],
            event_list_fact_mid: [
                [
                    { type: "anim", anim: "earth_fwd", ticks: 15 },
                    { type: "text", text: "Did you know that Uranus is 31,518 miles (50,724 km) in diameter?", say: "Did you know that Yer Anus is 31 thousand 500 and 18 miles in diameter?" },
                    { type: "anim", anim: "earth_back", ticks: 15 },
                    { type: "anim", anim: "grin_fwd", ticks: 15 },
                ],
                [
                    { type: "text", text: "Fun Fact: The skript kiddie of this site didn't bother checking if the text that goes into the dialog box is HTML code." },
                    { type: "html", text: "<img src='/img/misc/topjej.png'></img>", say: "toppest jej" },
                ],
            ],
            event_list_fact_end: [[{ type: "text", text: "o gee whilickers wasn't that sure interesting huh" }]],
        };
    function range(begin, end) {
        for (var array = [], i = begin; i <= end; i++) array.push(i);
        for (i = begin; i >= end; i--) array.push(i);
        return array;
    }
    function replaceAll(t, s, r) {
        return t.replace(new RegExp(s, "g"), r);
    }
    function s4() {
        return Math.floor(65536 * (1 + Math.random()))
            .toString(16)
            .substring(1);
    }
    function youtubeParser(url) {
        var match = url.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
        return !(!match || 11 != match[7].length) && match[7];
    }
    function rtimeOut(callback, delay) {
        var stop,
            dateNow = Date.now,
            requestAnimation = window.requestAnimationFrame,
            start = dateNow(),
            timeoutFunc = function () {
                dateNow() - start < delay ? stop || requestAnimation(timeoutFunc) : callback();
            };
        return (
            requestAnimation(timeoutFunc),
            {
                clear: function () {
                    stop = 1;
                },
            }
        );
    }
    function rInterval(callback, delay) {
        var stop,
            dateNow = Date.now,
            requestAnimation = window.requestAnimationFrame,
            start = dateNow(),
            intervalFunc = function () {
                dateNow() - start < delay || ((start += delay), callback()), stop || requestAnimation(intervalFunc);
            };
        return (
            requestAnimation(intervalFunc),
            {
                clear: function () {
                    stop = 1;
                },
            }
        );
    }
    function linkify(text) {
        return text.replace(/(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/gi, "<a href='$1' target='_blank'>$1</a>");
    }
    function codepen(text) {
        return text.replace(/https:\/\/codepen\.io\/([^<]+)\/pen\/([^<]+)/g, "<iframe height='300' style='width: 26%;' scrolling='no' src='https://codepen.io/$1/embed/$2?default-tab=&editable=true&theme-id=dark' frameborder='no' loading='lazy' allowtransparency='true' allowfullscreen='false'></iframe>");
    }
    function soptify_track(text) {
        return text.replace(/https:\/\/open\.spotify\.com\/track\/([^<]+)/g, '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/$1?utm_source=generator&theme=0" width="67%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>');
    }
  
    (BonziData.event_list_joke = [
        { type: "add_random", pool: "event_list_joke_open", add: BonziData.event_list_joke_open },
        { type: "anim", anim: "shrug_fwd", ticks: 15 },
        { type: "add_random", pool: "event_list_joke_mid", add: BonziData.event_list_joke_mid },
        { type: "idle" },
        { type: "add_random", pool: "event_list_joke_end", add: BonziData.event_list_joke_end },
        { type: "idle" },
    ]),
        (BonziData.event_list_fact = [
            { type: "add_random", pool: "event_list_fact_open", add: BonziData.event_list_fact_open },
            { type: "add_random", pool: "event_list_fact_mid", add: BonziData.event_list_fact_mid },
            { type: "idle" },
            { type: "add_random", pool: "event_list_fact_end", add: BonziData.event_list_fact_end },
            { type: "idle" },
        ]),
        (BonziData.event_list_triggered = [
            { type: "anim", anim: "cool_fwd", ticks: 30 },
            {
                type: "text",
                text: "I sexually identify as BonziBUDDY. Ever since I was a young gorilla I dreamed of invading desktops dropping hot sticky tootorals on disgusting PC users.",
                say: "I sexually identify as BonziBUDDY. Ever since I was a young gorilla I dreamed of invading desktops dropping hot sticky tootorals on disgusting PC users.",
            },
            {
                type: "text",
                text: "People say to me that a person being a BonziBUDDY is impossible and that I???m a fucking virus but I don???t care, I???m beautiful.",
                say: "People say to me that a person being a BonziBUDDY is impossible and that I'm a fucking virus but I dont care, I'm beautiful.",
            },
            {
                type: "text",
                text: "I???m having an IT intern install Internet Explorer 6, aquarium screensavers and PC Doctor 2016 on my body. From now on I want you guys to call me ???Joel??? and respect my right to meme from above and meme needlessly.",
                say: "I'm having an IT intern install Internet Explorer 6, aquarium screensavers and PC Doctor 2016 on my body. From now on I want you guys to call me Joel and respect my right to meme from above and meme needlessly.",
            },
            {
                type: "text",
                text: "If you can???t accept me you???re a gorillaphobe and need to check your file permissions. Thank you for being so understanding.",
                say: "If you cant accept me your a gorillaphobe and need to check your file permissions. Thank you for being so understanding.",
            },
            { type: "idle" },
        ]),
        (BonziData.event_list_linux = [
            { type: "text", text: "I'd just like to interject for a moment. What you???re referring to as Linux, is in fact, BONZI/Linux, or as I???ve recently taken to calling it, BONZI plus Linux." },
            {
                type: "text",
                text:
                    "Linux is not an operating system unto itself, but rather another free component of a fully functioning BONZI system made useful by the BONZI corelibs, shell utilities and vital system components comprising a full OS as defined by M.A.L.W.A.R.E.",
            },
            {
                type: "text",
                text:
                    "Many computer users run a modified version of the BONZI system every day, without realizing it. Through a peculiar turn of events, the version of BONZI which is widely used today is often called ???Linux???, and many of its users are not aware that it is basically the BONZI system, developed by the BONZI Project.",
            },
            {
                type: "text",
                text:
                    "There really is a Linux, and these people are using it, but it is just a part of the system they use. Linux is the kernel: the program in the system that allocates the machine???s memes to the other programs that you run. ",
            },
            { type: "text", text: "The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system, such as systemd." },
            {
                type: "text",
                text:
                    "Linux is normally used in combination with the BONZI operating system: the whole system is basically BONZI with Linux added, or BONZI/Linux. All the so-called ???Linux??? distributions are really distributions of BONZI/Linux.",
            },
        ]),
        (BonziData.event_list_pawn = [
            {
                type: "text",
                text:
                    "Hi, my name is BonziBUDDY, and this is my website. I meme here with my old harambe, and my son, Clippy. Everything in here has an ad and a fact. One thing I've learned after 17 years - you never know what is gonna give you some malware.",
            },
        ]),
        (BonziData.event_list_bees = [
            { type: "text", text: "According to all known laws" },
            { type: "text", text: "of aviation," },
            { type: "text", text: "there is no way a bee" },
            { type: "text", text: "should be able to fly." },
            { type: "text", text: "Its wings are too small to get" },
            { type: "text", text: "its fat little body off the ground." },
            { type: "text", text: "The bee, of course, flies anyway" },
            { type: "text", text: "because bees don't care" },
            { type: "text", text: "what humans think is impossible." },
            { type: "text", text: "Yellow, black. Yellow, black." },
            { type: "text", text: "Yellow, black. Yellow, black." },
            { type: "text", text: "Ooh, black and yellow!" },
            { type: "text", text: "Let's shake it up a little." },
            { type: "text", text: "Barry! Breakfast is ready!" },
            { type: "text", text: "Coming!" },
            { type: "text", text: "Hang on a second." },
            { type: "text", text: "Hello?" },
            { type: "text", text: "Barry?" },
            { type: "text", text: "Adam?" },
            { type: "text", text: "Can you believe this is happening?" },
            { type: "text", text: "I can't. I'll pick you up." },
            { type: "text", text: "Looking sharp." },
            { type: "text", text: "Use the stairs. Your father" },
            { type: "text", text: "paid good money for those." },
            { type: "text", text: "Sorry. I'm excited." },
            { type: "text", text: "Here's the graduate." },
            { type: "text", text: "We're very proud of you, son." },
            { type: "text", text: "A perfect report card, all B's." },
            { type: "text", text: "Very proud." },
            { type: "text", text: "Ma! I got a thing going here." },
            { type: "text", text: "You got lint on your fuzz." },
            { type: "text", text: "Ow! That's me!" },
            { type: "text", text: "Wave to us! We'll be in row 118,000." },
            { type: "text", text: "Bye!" },
            { type: "text", text: "Barry, I told you," },
            { type: "text", text: "stop flying in the house!" },
            { type: "text", text: "Hey, Adam." },
            { type: "text", text: "Hey, Barry." },
            { type: "text", text: "Is that fuzz gel?" },
            { type: "text", text: "A little. Special day, graduation." },
            { type: "text", text: "Never thought I'd make it." },
            { type: "text", text: "Three days grade school," },
            { type: "text", text: "three days high school." },
            { type: "text", text: "Those were awkward." },
            { type: "text", text: "Three days college. I'm glad I took" },
            { type: "text", text: "a day and hitchhiked around the hive." },
            { type: "text", text: "You did come back different." },
            { type: "text", text: "Hi, Barry." },
            { type: "text", text: "Artie, growing a mustache? Looks good." },
            { type: "text", text: "Hear about Frankie?" },
            { type: "text", text: "Yeah." },
            { type: "text", text: "You going to the funeral?" },
            { type: "text", text: "No, I'm not going." },
            { type: "text", text: "Everybody knows," },
            { type: "text", text: "sting someone, you die." },
            { type: "text", text: "Don't waste it on a squirrel." },
            { type: "text", text: "Such a hothead." },
            { type: "text", text: "I guess he could have" },
            { type: "text", text: "just gotten out of the way." },
            { type: "text", text: "I love this incorporating" },
            { type: "text", text: "an amusement park into our day." },
            { type: "text", text: "That's why we don't need vacations." },
            { type: "text", text: "Boy, quite a bit of pomp..." },
            { type: "text", text: "under the circumstances." },
            { type: "text", text: "Well, Adam, today we are men." },
            { type: "text", text: "We are!" },
            { type: "text", text: "Bee-men." },
            { type: "text", text: "Amen!" },
            { type: "text", text: "Hallelujah!" },
            { type: "text", text: "Students, faculty, distinguished bees," },
            { type: "text", text: "please welcome Dean Buzzwell." },
            { type: "text", text: "Welcome, New Hive City" },
            { type: "text", text: "graduating class of..." },
            { type: "text", text: "...9:15." },
            { type: "text", text: "That concludes our ceremonies." },
            { type: "text", text: "And begins your career" },
            { type: "text", text: "at Honex Industries!" },
            { type: "text", text: "Will we pick ourjob today?" },
            { type: "text", text: "I heard it's just orientation." },
            { type: "text", text: "Heads up! Here we go." },
            { type: "text", text: "Keep your hands and antennas" },
            { type: "text", text: "inside the tram at all times." },
            { type: "text", text: "Wonder what it'll be like?" },
            { type: "text", text: "A little scary." },
            { type: "text", text: "Welcome to Honex," },
            { type: "text", text: "a division of Honesco" },
            { type: "text", text: "and a part of the Hexagon Group." },
            { type: "text", text: "This is it!" },
            { type: "text", text: "Wow." },
            { type: "text", text: "Wow." },
            { type: "text", text: "We know that you, as a bee," },
            { type: "text", text: "have worked your whole life" },
            { type: "text", text: "to get to the point where you" },
            { type: "text", text: "can work for your whole life." },
            { type: "text", text: "Honey begins when our valiant Pollen" },
            { type: "text", text: "Jocks bring the nectar to the hive." },
            { type: "text", text: "Our top-secret formula" },
            { type: "text", text: "is automatically color-corrected," },
            { type: "text", text: "scent-adjusted and bubble-contoured" },
            { type: "text", text: "into this soothing sweet syrup" },
            { type: "text", text: "with its distinctive" },
            { type: "text", text: "golden glow you know as..." },
            { type: "text", text: "Honey!" },
            { type: "text", text: "That girl was hot." },
            { type: "text", text: "She's my cousin!" },
            { type: "text", text: "She is?" },
            { type: "text", text: "Yes, we're all cousins." },
            { type: "text", text: "Right. You're right." },
            { type: "text", text: "At Honex, we constantly strive" },
            { type: "text", text: "to improve every aspect" },
            { type: "text", text: "of bee existence." },
            { type: "text", text: "These bees are stress-testing" },
            { type: "text", text: "a new helmet technology." },
            { type: "text", text: "What do you think he makes?" },
            { type: "text", text: "Not enough." },
            { type: "text", text: "Here we have our latest advancement," },
            { type: "text", text: "the Krelman." },
            { type: "text", text: "What does that do?" },
            { type: "text", text: "Catches that little strand of honey" },
            { type: "text", text: "that hangs after you pour it." },
            { type: "text", text: "Saves us millions." },
            { type: "text", text: "Can anyone work on the Krelman?" },
            { type: "text", text: "Of course. Most bee jobs are" },
            { type: "text", text: "small ones. But bees know" },
            { type: "text", text: "that every small job," },
            { type: "text", text: "if it's done well, means a lot." },
            { type: "text", text: "But choose carefully" },
            { type: "text", text: "because you'll stay in the job" },
            { type: "text", text: "you pick for the rest of your life." },
            { type: "text", text: "The same job the rest of your life?" },
            { type: "text", text: "I didn't know that." },
            { type: "text", text: "What's the difference?" },
            { type: "text", text: "You'll be happy to know that bees," },
            { type: "text", text: "as a species, haven't had one day off" },
            { type: "text", text: "in 27 million years." },
            { type: "text", text: "So you'll just work us to death?" },
            { type: "text", text: "We'll sure try." },
            { type: "text", text: "Wow! That blew my mind!" },
            { type: "text", text: "What's the difference?" },
            { type: "text", text: "How can you say that?" },
            { type: "text", text: "One job forever?" },
            { type: "text", text: "That's an insane choice to have to make." },
            { type: "text", text: "I'm relieved. Now we only have" },
            { type: "text", text: "to make one decision in life." },
            { type: "text", text: "But, Adam, how could they" },
            { type: "text", text: "never have told us that?" },
            { type: "text", text: "Why would you question anything?" },
            { type: "text", text: "We're bees." },
            { type: "text", text: "We're the most perfectly" },
            { type: "text", text: "functioning society on Earth." },
            { type: "text", text: "You ever think maybe things" },
            { type: "text", text: "work a little too well here?" },
            { type: "text", text: "Like what? Give me one example." },
            { type: "text", text: "I don't know. But you know" },
            { type: "text", text: "what I'm talking about." },
            { type: "text", text: "Please clear the gate." },
            { type: "text", text: "Royal Nectar Force on approach." },
            { type: "text", text: "Wait a second. Check it out." },
            { type: "text", text: "Hey, those are Pollen Jocks!" },
            { type: "text", text: "Wow." },
            { type: "text", text: "I've never seen them this close." },
            { type: "text", text: "They know what it's like" },
            { type: "text", text: "outside the hive." },
            { type: "text", text: "Yeah, but some don't come back." },
            { type: "text", text: "Hey, Jocks!" },
            { type: "text", text: "Hi, Jocks!" },
            { type: "text", text: "You guys did great!" },
            { type: "text", text: "You're monsters!" },
            { type: "text", text: "You're sky freaks! I love it! I love it!" },
            { type: "text", text: "I wonder where they were." },
            { type: "text", text: "I don't know." },
            { type: "text", text: "Their day's not planned." },
            { type: "text", text: "Outside the hive, flying who knows" },
            { type: "text", text: "where, doing who knows what." },
            { type: "text", text: "You can'tjust decide to be a Pollen" },
            { type: "text", text: "Jock. You have to be bred for that." },
            { type: "text", text: "Right." },
            { type: "text", text: "Look. That's more pollen" },
            { type: "text", text: "than you and I will see in a lifetime." },
            { type: "text", text: "It's just a status symbol." },
            { type: "text", text: "Bees make too much of it." },
            { type: "text", text: "Perhaps. Unless you're wearing it" },
            { type: "text", text: "and the ladies see you wearing it." },
            { type: "text", text: "Those ladies?" },
            { type: "text", text: "Aren't they our cousins too?" },
            { type: "text", text: "Distant. Distant." },
            { type: "text", text: "Look at these two." },
            { type: "text", text: "Couple of Hive Harrys." },
            { type: "text", text: "Let's have fun with them." },
            { type: "text", text: "It must be dangerous" },
            { type: "text", text: "being a Pollen Jock." },
            { type: "text", text: "Yeah. Once a bear pinned me" },
            { type: "text", text: "against a mushroom!" },
            { type: "text", text: "He had a paw on my throat," },
            { type: "text", text: "and with the other, he was slapping me!" },
            { type: "text", text: "Oh, my!" },
            { type: "text", text: "I never thought I'd knock him out." },
            { type: "text", text: "What were you doing during this?" },
            { type: "text", text: "Trying to alert the authorities." },
            { type: "text", text: "I can autograph that." },
            { type: "text", text: "A little gusty out there today," },
            { type: "text", text: "wasn't it, comrades?" },
            { type: "text", text: "Yeah. Gusty." },
            { type: "text", text: "We're hitting a sunflower patch" },
            { type: "text", text: "six miles from here tomorrow." },
            { type: "text", text: "Six miles, huh?" },
            { type: "text", text: "Barry!" },
            { type: "text", text: "A puddle jump for us," },
            { type: "text", text: "but maybe you're not up for it." },
            { type: "text", text: "Maybe I am." },
            { type: "text", text: "You are not!" },
            { type: "text", text: "We're going 0900 at J-Gate." },
            { type: "text", text: "What do you think, buzzy-boy?" },
            { type: "text", text: "Are you bee enough?" },
            { type: "text", text: "I might be. It all depends" },
            { type: "text", text: "on what 0900 means." },
            { type: "text", text: "Hey, Honex!" },
            { type: "text", text: "Dad, you surprised me." },
            { type: "text", text: "You decide what you're interested in?" },
            { type: "text", text: "Well, there's a lot of choices." },
            { type: "text", text: "But you only get one." },
            { type: "text", text: "Do you ever get bored" },
            { type: "text", text: "doing the same job every day?" },
            { type: "text", text: "Son, let me tell you about stirring." },
            { type: "text", text: "You grab that stick, and you just" },
            { type: "text", text: "move it around, and you stir it around." },
            { type: "text", text: "You get yourself into a rhythm." },
            { type: "text", text: "It's a beautiful thing." },
            { type: "text", text: "You know, Dad," },
            { type: "text", text: "the more I think about it," },
            { type: "text", text: "maybe the honey field" },
            { type: "text", text: "just isn't right for me." },
            { type: "text", text: "You were thinking of what," },
            { type: "text", text: "making balloon animals?" },
            { type: "text", text: "That's a bad job" },
            { type: "text", text: "for a guy with a stinger." },
            { type: "text", text: "Janet, your son's not sure" },
            { type: "text", text: "he wants to go into honey!" },
            { type: "text", text: "Barry, you are so funny sometimes." },
            { type: "text", text: "I'm not trying to be funny." },
            { type: "text", text: "You're not funny! You're going" },
            { type: "text", text: "into honey. Our son, the stirrer!" },
            { type: "text", text: "You're gonna be a stirrer?" },
            { type: "text", text: "No one's listening to me!" },
            { type: "text", text: "Wait till you see the sticks I have." },
            { type: "text", text: "I could say anything right now." },
            { type: "text", text: "I'm gonna get an ant tattoo!" },
            { type: "text", text: "Let's open some honey and celebrate!" },
            { type: "text", text: "Maybe I'll pierce my thorax." },
            { type: "text", text: "Shave my antennae." },
            { type: "text", text: "Shack up with a grasshopper. Get" },
            { type: "text", text: "a gold tooth and call everybody dawg!" },
            { type: "text", text: "I'm so proud." },
            { type: "text", text: "We're starting work today!" },
            { type: "text", text: "Today's the day." },
            { type: "text", text: "Come on! All the good jobs" },
            { type: "text", text: "will be gone." },
            { type: "text", text: "Yeah, right." },
            { type: "text", text: "Pollen counting, stunt bee, pouring," },
            { type: "text", text: "stirrer, front desk, hair removal..." },
            { type: "text", text: "Is it still available?" },
            { type: "text", text: "Hang on. Two left!" },
            { type: "text", text: "One of them's yours! Congratulations!" },
            { type: "text", text: "Step to the side." },
            { type: "text", text: "What'd you get?" },
            { type: "text", text: "Picking crud out. Stellar!" },
            { type: "text", text: "Wow!" },
            { type: "text", text: "Couple of newbies?" },
            { type: "text", text: "Yes, sir! Our first day! We are ready!" },
            { type: "text", text: "Make your choice." },
            { type: "text", text: "You want to go first?" },
            { type: "text", text: "No, you go." },
            { type: "text", text: "Oh, my. What's available?" },
            { type: "text", text: "Restroom attendant's open," },
            { type: "text", text: "not for the reason you think." },
            { type: "text", text: "Any chance of getting the Krelman?" },
            { type: "text", text: "Sure, you're on." },
            { type: "text", text: "I'm sorry, the Krelman just closed out." },
            { type: "text", text: "Wax monkey's always open." },
            { type: "text", text: "The Krelman opened up again." },
            { type: "text", text: "What happened?" },
            { type: "text", text: "A bee died. Makes an opening. See?" },
            { type: "text", text: "He's dead. Another dead one." },
            { type: "text", text: "Deady. Deadified. Two more dead." },
            { type: "text", text: "Dead from the neck up." },
            { type: "text", text: "Dead from the neck down. That's life!" },
            { type: "text", text: "Oh, this is so hard!" },
            { type: "text", text: "Heating, cooling," },
            { type: "text", text: "stunt bee, pourer, stirrer," },
            { type: "text", text: "humming, inspector number seven," },
            { type: "text", text: "lint coordinator, stripe supervisor," },
            { type: "text", text: "mite wrangler. Barry, what" },
            { type: "text", text: "do you think I should... Barry?" },
            { type: "text", text: "Barry!" },
            { type: "text", text: "All right, we've got the sunflower patch" },
            { type: "text", text: "in quadrant nine..." },
            { type: "text", text: "What happened to you?" },
            { type: "text", text: "Where are you?" },
            { type: "text", text: "I'm going out." },
            { type: "text", text: "Out? Out where?" },
            { type: "text", text: "Out there." },
            { type: "text", text: "Oh, no!" },
            { type: "text", text: "I have to, before I go" },
            { type: "text", text: "to work for the rest of my life." },
            { type: "text", text: "You're gonna die! You're crazy! Hello?" },
            { type: "text", text: "Another call coming in." },
            { type: "text", text: "If anyone's feeling brave," },
            { type: "text", text: "there's a Korean deli on 83rd" },
            { type: "text", text: "that gets their roses today." },
            { type: "text", text: "Hey, guys." },
            { type: "text", text: "Look at that." },
            { type: "text", text: "Isn't that the kid we saw yesterday?" },
            { type: "text", text: "Hold it, son, flight deck's restricted." },
            { type: "text", text: "It's OK, Lou. We're gonna take him up." },
            { type: "text", text: "Really? Feeling lucky, are you?" },
            { type: "text", text: "Sign here, here. Just initial that." },
            { type: "text", text: "Thank you." },
            { type: "text", text: "OK." },
            { type: "text", text: "You got a rain advisory today," },
            { type: "text", text: "and as you all know," },
            { type: "text", text: "bees cannot fly in rain." },
            { type: "text", text: "So be careful. As always," },
            { type: "text", text: "watch your brooms," },
            { type: "text", text: "hockey sticks, dogs," },
            { type: "text", text: "birds, bears and bats." },
            { type: "text", text: "Also, I got a couple of reports" },
            { type: "text", text: "of root beer being poured on us." },
            { type: "text", text: "Murphy's in a home because of it," },
            { type: "text", text: "babbling like a cicada!" },
            { type: "text", text: "That's awful." },
            { type: "text", text: "And a reminder for you rookies," },
            { type: "text", text: "bee law number one," },
            { type: "text", text: "absolutely no talking to humans!" },
            { type: "text", text: "All right, launch positions!" },
            { type: "text", text: "Buzz, buzz, buzz, buzz! Buzz, buzz," },
            { type: "text", text: "buzz, buzz! Buzz, buzz, buzz, buzz!" },
            { type: "text", text: "Black and yellow!" },
            { type: "text", text: "Hello!" },
            { type: "text", text: "You ready for this, hot shot?" },
            { type: "text", text: "Yeah. Yeah, bring it on." },
            { type: "text", text: "Wind, check." },
            { type: "text", text: "Antennae, check." },
            { type: "text", text: "Nectar pack, check." },
            { type: "text", text: "Wings, check." },
            { type: "text", text: "Stinger, check." },
            { type: "text", text: "Scared out of my shorts, check." },
            { type: "text", text: "OK, ladies," },
            { type: "text", text: "let's move it out!" },
            { type: "text", text: "Pound those petunias," },
            { type: "text", text: "you striped stem-suckers!" },
            { type: "text", text: "All of you, drain those flowers!" },
            { type: "text", text: "Wow! I'm out!" },
            { type: "text", text: "I can't believe I'm out!" },
            { type: "text", text: "So blue." },
            { type: "text", text: "I feel so fast and free!" },
            { type: "text", text: "Box kite!" },
            { type: "text", text: "Wow!" },
            { type: "text", text: "Flowers!" },
            { type: "text", text: "This is Blue Leader." },
            { type: "text", text: "We have roses visual." },
            { type: "text", text: "Bring it around 30 degrees and hold." },
            { type: "text", text: "Roses!" },
            { type: "text", text: "30 degrees, roger. Bringing it around." },
            { type: "text", text: "Stand to the side, kid." },
            { type: "text", text: "It's got a bit of a kick." },
            { type: "text", text: "That is one nectar collector!" },
            { type: "text", text: "Ever see pollination up close?" },
            { type: "text", text: "No, sir." },
            { type: "text", text: "I pick up some pollen here, sprinkle it" },
            { type: "text", text: "over here. Maybe a dash over there," },
            { type: "text", text: "a pinch on that one." },
            { type: "text", text: "See that? It's a little bit of magic." },
            { type: "text", text: "That's amazing. Why do we do that?" },
            { type: "text", text: "That's pollen power. More pollen, more" },
            { type: "text", text: "flowers, more nectar, more honey for us." },
            { type: "text", text: "Cool." },
            { type: "text", text: "I'm picking up a lot of bright yellow." },
            { type: "text", text: "Could be daisies. Don't we need those?" },
            { type: "text", text: "Copy that visual." },
            { type: "text", text: "Wait. One of these flowers" },
            { type: "text", text: "seems to be on the move." },
            { type: "text", text: "Say again? You're reporting" },
            { type: "text", text: "a moving flower?" },
            { type: "text", text: "Affirmative." },
            { type: "text", text: "That was on the line!" },
            { type: "text", text: "This is the coolest. What is it?" },
            { type: "text", text: "I don't know, but I'm loving this color." },
            { type: "text", text: "It smells good." },
            { type: "text", text: "Not like a flower, but I like it." },
            { type: "text", text: "Yeah, fuzzy." },
            { type: "text", text: "Chemical-y." },
            { type: "text", text: "Careful, guys. It's a little grabby." },
            { type: "text", text: "My sweet lord of bees!" },
            { type: "text", text: "Candy-brain, get off there!" },
            { type: "text", text: "Problem!" },
            { type: "text", text: "Guys!" },
            { type: "text", text: "This could be bad." },
            { type: "text", text: "Affirmative." },
            { type: "text", text: "Very close." },
            { type: "text", text: "Gonna hurt." },
            { type: "text", text: "Mama's little boy." },
            { type: "text", text: "You are way out of position, rookie!" },
            { type: "text", text: "Coming in at you like a missile!" },
            { type: "text", text: "Help me!" },
            { type: "text", text: "I don't think these are flowers." },
            { type: "text", text: "Should we tell him?" },
            { type: "text", text: "I think he knows." },
            { type: "text", text: "What is this?!" },
            { type: "text", text: "Match point!" },
            { type: "text", text: "You can start packing up, honey," },
            { type: "text", text: "because you're about to eat it!" },
            { type: "text", text: "Yowser!" },
            { type: "text", text: "Gross." },
            { type: "text", text: "There's a bee in the car!" },
            { type: "text", text: "Do something!" },
            { type: "text", text: "I'm driving!" },
            { type: "text", text: "Hi, bee." },
            { type: "text", text: "He's back here!" },
            { type: "text", text: "He's going to sting me!" },
            { type: "text", text: "Nobody move. If you don't move," },
            { type: "text", text: "he won't sting you. Freeze!" },
            { type: "text", text: "He blinked!" },
            { type: "text", text: "Spray him, Granny!" },
            { type: "text", text: "What are you doing?!" },
            { type: "text", text: "Wow... the tension level" },
            { type: "text", text: "out here is unbelievable." },
            { type: "text", text: "I gotta get home." },
            { type: "text", text: "Can't fly in rain." },
            { type: "text", text: "Can't fly in rain." },
            { type: "text", text: "Can't fly in rain." },
            { type: "text", text: "Mayday! Mayday! Bee going down!" },
            { type: "text", text: "Ken, could you close" },
            { type: "text", text: "the window please?" },
            { type: "text", text: "Ken, could you close" },
            { type: "text", text: "the window please?" },
            { type: "text", text: "Check out my new resume." },
            { type: "text", text: "I made it into a fold-out brochure." },
            { type: "text", text: "You see? Folds out." },
            { type: "text", text: "Oh, no. More humans. I don't need this." },
            { type: "text", text: "What was that?" },
            { type: "text", text: "Maybe this time. This time. This time." },
            { type: "text", text: "This time! This time! This..." },
            { type: "text", text: "Drapes!" },
            { type: "text", text: "That is diabolical." },
            { type: "text", text: "It's fantastic. It's got all my special" },
            { type: "text", text: "skills, even my top-ten favorite movies." },
            { type: "text", text: "What's number one? Star Wars?" },
            { type: "text", text: "Nah, I don't go for that..." },
            { type: "text", text: "...kind of stuff." },
            { type: "text", text: "No wonder we shouldn't talk to them." },
            { type: "text", text: "They're out of their minds." },
            { type: "text", text: "When I leave a job interview, they're" },
            { type: "text", text: "flabbergasted, can't believe what I say." },
            { type: "text", text: "There's the sun. Maybe that's a way out." },
            { type: "text", text: "I don't remember the sun" },
            { type: "text", text: "having a big 75 on it." },
            { type: "text", text: "I predicted global warming." },
            { type: "text", text: "I could feel it getting hotter." },
            { type: "text", text: "At first I thought it was just me." },
            { type: "text", text: "Wait! Stop! Bee!" },
            { type: "text", text: "Stand back. These are winter boots." },
            { type: "text", text: "Wait!" },
            { type: "text", text: "Don't kill him!" },
            { type: "text", text: "You know I'm allergic to them!" },
            { type: "text", text: "This thing could kill me!" },
            { type: "text", text: "Why does his life have" },
            { type: "text", text: "less value than yours?" },
            { type: "text", text: "Why does his life have any less value" },
            { type: "text", text: "than mine? Is that your statement?" },
            { type: "text", text: "I'm just saying all life has value. You" },
            { type: "text", text: "don't know what he's capable of feeling." },
            { type: "text", text: "My brochure!" },
            { type: "text", text: "There you go, little guy." },
            { type: "text", text: "I'm not scared of him." },
            { type: "text", text: "It's an allergic thing." },
            { type: "text", text: "Put that on your resume brochure." },
            { type: "text", text: "My whole face could puff up." },
            { type: "text", text: "Make it one of your special skills." },
            { type: "text", text: "Knocking someone out" },
            { type: "text", text: "is also a special skill." },
            { type: "text", text: "Right. Bye, Vanessa. Thanks." },
            { type: "text", text: "Vanessa, next week? Yogurt night?" },
            { type: "text", text: "Sure, Ken. You know, whatever." },
            { type: "text", text: "You could put carob chips on there." },
            { type: "text", text: "Bye." },
            { type: "text", text: "Supposed to be less calories." },
            { type: "text", text: "Bye." },
            { type: "text", text: "I gotta say something." },
            { type: "text", text: "She saved my life." },
            { type: "text", text: "I gotta say something." },
            { type: "text", text: "All right, here it goes." },
            { type: "text", text: "Nah." },
            { type: "text", text: "What would I say?" },
            { type: "text", text: "I could really get in trouble." },
            { type: "text", text: "It's a bee law." },
            { type: "text", text: "You're not supposed to talk to a human." },
            { type: "text", text: "I can't believe I'm doing this." },
            { type: "text", text: "I've got to." },
            { type: "text", text: "Oh, I can't do it. Come on!" },
            { type: "text", text: "No. Yes. No." },
            { type: "text", text: "Do it. I can't." },
            { type: "text", text: "How should I start it?" },
            { type: "text", text: "You like jazz? No, that's no good." },
            { type: "text", text: "Here she comes! Speak, you fool!" },
            { type: "text", text: "Hi!" },
            { type: "text", text: "I'm sorry." },
            { type: "text", text: "You're talking." },
            { type: "text", text: "Yes, I know." },
            { type: "text", text: "You're talking!" },
            { type: "text", text: "I'm so sorry." },
            { type: "text", text: "No, it's OK. It's fine." },
            { type: "text", text: "I know I'm dreaming." },
            { type: "text", text: "But I don't recall going to bed." },
            { type: "text", text: "Well, I'm sure this" },
            { type: "text", text: "is very disconcerting." },
            { type: "text", text: "This is a bit of a surprise to me." },
            { type: "text", text: "I mean, you're a bee!" },
            { type: "text", text: "I am. And I'm not supposed" },
            { type: "text", text: "to be doing this," },
            { type: "text", text: "but they were all trying to kill me." },
            { type: "text", text: "And if it wasn't for you..." },
            { type: "text", text: "I had to thank you." },
            { type: "text", text: "It's just how I was raised." },
            { type: "text", text: "That was a little weird." },
            { type: "text", text: "I'm talking with a bee." },
            { type: "text", text: "Yeah." },
            { type: "text", text: "I'm talking to a bee." },
            { type: "text", text: "And the bee is talking to me!" },
            { type: "text", text: "I just want to say I'm grateful." },
            { type: "text", text: "I'll leave now." },
            { type: "text", text: "Wait! How did you learn to do that?" },
            { type: "text", text: "What?" },
            { type: "text", text: "The talking thing." },
            { type: "text", text: "Same way you did, I guess." },
            { type: "text", text: "Mama, Dada, honey. You pick it up." },
            { type: "text", text: "That's very funny." },
            { type: "text", text: "Yeah." },
            { type: "text", text: "Bees are funny. If we didn't laugh," },
            { type: "text", text: "we'd cry with what we have to deal with." },
            { type: "text", text: "Anyway..." },
            { type: "text", text: "Can I..." },
            { type: "text", text: "...get you something?" },
            { type: "text", text: "Like what?" },
            { type: "text", text: "I don't know. I mean..." },
            { type: "text", text: "I don't know. Coffee?" },
            { type: "text", text: "I don't want to put you out." },
            { type: "text", text: "It's no trouble. It takes two minutes." },
            { type: "text", text: "It's just coffee." },
            { type: "text", text: "I hate to impose." },
            { type: "text", text: "Don't be ridiculous!" },
            { type: "text", text: "Actually, I would love a cup." },
            { type: "text", text: "Hey, you want rum cake?" },
            { type: "text", text: "I shouldn't." },
            { type: "text", text: "Have some." },
            { type: "text", text: "No, I can't." },
            { type: "text", text: "Come on!" },
            { type: "text", text: "I'm trying to lose a couple micrograms." },
            { type: "text", text: "Where?" },
            { type: "text", text: "These stripes don't help." },
            { type: "text", text: "You look great!" },
            { type: "text", text: "I don't know if you know" },
            { type: "text", text: "anything about fashion." },
            { type: "text", text: "Are you all right?" },
            { type: "text", text: "No." },
            { type: "text", text: "He's making the tie in the cab" },
            { type: "text", text: "as they're flying up Madison." },
            { type: "text", text: "He finally gets there." },
            { type: "text", text: "He runs up the steps into the church." },
            { type: "text", text: "The wedding is on." },
            { type: "text", text: "And he says, Watermelon?" },
            { type: "text", text: "I thought you said Guatemalan." },
            { type: "text", text: "Why would I marry a watermelon?" },
            { type: "text", text: "Is that a bee joke?" },
            { type: "text", text: "That's the kind of stuff we do." },
            { type: "text", text: "Yeah, different." },
            { type: "text", text: "So, what are you gonna do, Barry?" },
            { type: "text", text: "About work? I don't know." },
            { type: "text", text: "I want to do my part for the hive," },
            { type: "text", text: "but I can't do it the way they want." },
            { type: "text", text: "I know how you feel." },
            { type: "text", text: "You do?" },
            { type: "text", text: "Sure." },
            { type: "text", text: "My parents wanted me to be a lawyer or" },
            { type: "text", text: "a doctor, but I wanted to be a florist." },
            { type: "text", text: "Really?" },
            { type: "text", text: "My only interest is flowers." },
            { type: "text", text: "Our new queen was just elected" },
            { type: "text", text: "with that same campaign slogan." },
            { type: "text", text: "Anyway, if you look..." },
            { type: "text", text: "There's my hive right there. See it?" },
            { type: "text", text: "You're in Sheep Meadow!" },
            { type: "text", text: "Yes! I'm right off the Turtle Pond!" },
            { type: "text", text: "No way! I know that area." },
            { type: "text", text: "I lost a toe ring there once." },
            { type: "text", text: "Why do girls put rings on their toes?" },
            { type: "text", text: "Why not?" },
            { type: "text", text: "It's like putting a hat on your knee." },
            { type: "text", text: "Maybe I'll try that." },
            { type: "text", text: "You all right, ma'am?" },
            { type: "text", text: "Oh, yeah. Fine." },
            { type: "text", text: "Just having two cups of coffee!" },
            { type: "text", text: "Anyway, this has been great." },
            { type: "text", text: "Thanks for the coffee." },
            { type: "text", text: "Yeah, it's no trouble." },
            { type: "text", text: "Sorry I couldn't finish it. If I did," },
            { type: "text", text: "I'd be up the rest of my life." },
            { type: "text", text: "Are you...?" },
            { type: "text", text: "Can I take a piece of this with me?" },
            { type: "text", text: "Sure! Here, have a crumb." },
            { type: "text", text: "Thanks!" },
            { type: "text", text: "Yeah." },
            { type: "text", text: "All right. Well, then..." },
            { type: "text", text: "I guess I'll see you around." },
            { type: "text", text: "Or not." },
            { type: "text", text: "OK, Barry." },
            { type: "text", text: "And thank you" },
            { type: "text", text: "so much again... for before." },
            { type: "text", text: "Oh, that? That was nothing." },
            { type: "text", text: "Well, not nothing, but... Anyway..." },
            { type: "text", text: "This can't possibly work." },
            { type: "text", text: "He's all set to go." },
            { type: "text", text: "We may as well try it." },
            { type: "text", text: "OK, Dave, pull the chute." },
            { type: "text", text: "Sounds amazing." },
            { type: "text", text: "It was amazing!" },
            { type: "text", text: "It was the scariest," },
            { type: "text", text: "happiest moment of my life." },
            { type: "text", text: "Humans! I can't believe" },
            { type: "text", text: "you were with humans!" },
            { type: "text", text: "Giant, scary humans!" },
            { type: "text", text: "What were they like?" },
            { type: "text", text: "Huge and crazy. They talk crazy." },
            { type: "text", text: "They eat crazy giant things." },
            { type: "text", text: "They drive crazy." },
            { type: "text", text: "Do they try and kill you, like on TV?" },
            { type: "text", text: "Some of them. But some of them don't." },
            { type: "text", text: "How'd you get back?" },
            { type: "text", text: "Poodle." },
            { type: "text", text: "You did it, and I'm glad. You saw" },
            { type: "text", text: "whatever you wanted to see." },
            { type: "text", text: "You had your experience. Now you" },
            { type: "text", text: "can pick out yourjob and be normal." },
            { type: "text", text: "Well..." },
            { type: "text", text: "Well?" },
            { type: "text", text: "Well, I met someone." },
            { type: "text", text: "You did? Was she Bee-ish?" },
            { type: "text", text: "A wasp?! Your parents will kill you!" },
            { type: "text", text: "No, no, no, not a wasp." },
            { type: "text", text: "Spider?" },
            { type: "text", text: "I'm not attracted to spiders." },
            { type: "text", text: "I know it's the hottest thing," },
            { type: "text", text: "with the eight legs and all." },
            { type: "text", text: "I can't get by that face." },
            { type: "text", text: "So who is she?" },
            { type: "text", text: "She's... human." },
            { type: "text", text: "No, no. That's a bee law." },
            { type: "text", text: "You wouldn't break a bee law." },
            { type: "text", text: "Her name's Vanessa." },
            { type: "text", text: "Oh, boy." },
            { type: "text", text: "She's so nice. And she's a florist!" },
            { type: "text", text: "Oh, no! You're dating a human florist!" },
            { type: "text", text: "We're not dating." },
            { type: "text", text: "You're flying outside the hive, talking" },
            { type: "text", text: "to humans that attack our homes" },
            { type: "text", text: "with power washers and M-80s!" },
            { type: "text", text: "One-eighth a stick of dynamite!" },
            { type: "text", text: "She saved my life!" },
            { type: "text", text: "And she understands me." },
            { type: "text", text: "This is over!" },
            { type: "text", text: "Eat this." },
            { type: "text", text: "This is not over! What was that?" },
            { type: "text", text: "They call it a crumb." },
            { type: "text", text: "It was so stingin' stripey!" },
            { type: "text", text: "And that's not what they eat." },
            { type: "text", text: "That's what falls off what they eat!" },
            { type: "text", text: "You know what a Cinnabon is?" },
            { type: "text", text: "No." },
            { type: "text", text: "It's bread and cinnamon and frosting." },
            { type: "text", text: "They heat it up..." },
            { type: "text", text: "Sit down!" },
            { type: "text", text: "...really hot!" },
            { type: "text", text: "Listen to me!" },
            { type: "text", text: "We are not them! We're us." },
            { type: "text", text: "There's us and there's them!" },
            { type: "text", text: "Yes, but who can deny" },
            { type: "text", text: "the heart that is yearning?" },
            { type: "text", text: "There's no yearning." },
            { type: "text", text: "Stop yearning. Listen to me!" },
            { type: "text", text: "You have got to start thinking bee," },
            { type: "text", text: "my friend. Thinking bee!" },
            { type: "text", text: "Thinking bee." },
            { type: "text", text: "Thinking bee." },
            { type: "text", text: "Thinking bee! Thinking bee!" },
            { type: "text", text: "Thinking bee! Thinking bee!" },
            { type: "text", text: "There he is. He's in the pool." },
            { type: "text", text: "You know what your problem is, Barry?" },
            { type: "text", text: "I gotta start thinking bee?" },
            { type: "text", text: "How much longer will this go on?" },
            { type: "text", text: "It's been three days!" },
            { type: "text", text: "Why aren't you working?" },
            { type: "text", text: "I've got a lot of big life decisions" },
            { type: "text", text: "to think about." },
            { type: "text", text: "What life? You have no life!" },
            { type: "text", text: "You have no job. You're barely a bee!" },
            { type: "text", text: "Would it kill you" },
            { type: "text", text: "to make a little honey?" },
            { type: "text", text: "Barry, come out." },
            { type: "text", text: "Your father's talking to you." },
            { type: "text", text: "Martin, would you talk to him?" },
            { type: "text", text: "Barry, I'm talking to you!" },
            { type: "text", text: "You coming?" },
            { type: "text", text: "Got everything?" },
            { type: "text", text: "All set!" },
            { type: "text", text: "Go ahead. I'll catch up." },
            { type: "text", text: "Don't be too long." },
            { type: "text", text: "Watch this!" },
            { type: "text", text: "Vanessa!" },
            { type: "text", text: "We're still here." },
            { type: "text", text: "I told you not to yell at him." },
            { type: "text", text: "He doesn't respond to yelling!" },
            { type: "text", text: "Then why yell at me?" },
            { type: "text", text: "Because you don't listen!" },
            { type: "text", text: "I'm not listening to this." },
            { type: "text", text: "Sorry, I've gotta go." },
            { type: "text", text: "Where are you going?" },
            { type: "text", text: "I'm meeting a friend." },
            { type: "text", text: "A girl? Is this why you can't decide?" },
            { type: "text", text: "Bye." },
            { type: "text", text: "I just hope she's Bee-ish." },
            { type: "text", text: "They have a huge parade" },
            { type: "text", text: "of flowers every year in Pasadena?" },
            { type: "text", text: "To be in the Tournament of Roses," },
            { type: "text", text: "that's every florist's dream!" },
            { type: "text", text: "Up on a float, surrounded" },
            { type: "text", text: "by flowers, crowds cheering." },
            { type: "text", text: "A tournament. Do the roses" },
            { type: "text", text: "compete in athletic events?" },
            { type: "text", text: "No. All right, I've got one." },
            { type: "text", text: "How come you don't fly everywhere?" },
            { type: "text", text: "It's exhausting. Why don't you" },
            { type: "text", text: "run everywhere? It's faster." },
            { type: "text", text: "Yeah, OK, I see, I see." },
            { type: "text", text: "All right, your turn." },
            { type: "text", text: "TiVo. You can just freeze live TV?" },
            { type: "text", text: "That's insane!" },
            { type: "text", text: "You don't have that?" },
            { type: "text", text: "We have Hivo, but it's a disease." },
            { type: "text", text: "It's a horrible, horrible disease." },
            { type: "text", text: "Oh, my." },
            { type: "text", text: "Dumb bees!" },
            { type: "text", text: "You must want to sting all those jerks." },
            { type: "text", text: "We try not to sting." },
            { type: "text", text: "It's usually fatal for us." },
            { type: "text", text: "So you have to watch your temper." },
            { type: "text", text: "Very carefully." },
            { type: "text", text: "You kick a wall, take a walk," },
            { type: "text", text: "write an angry letter and throw it out." },
            { type: "text", text: "Work through it like any emotion:" },
            { type: "text", text: "Anger, jealousy, lust." },
            { type: "text", text: "Oh, my goodness! Are you OK?" },
            { type: "text", text: "Yeah." },
            { type: "text", text: "What is wrong with you?!" },
            { type: "text", text: "It's a bug." },
            { type: "text", text: "He's not bothering anybody." },
            { type: "text", text: "Get out of here, you creep!" },
            { type: "text", text: "What was that? A Pic 'N' Save circular?" },
            { type: "text", text: "Yeah, it was. How did you know?" },
            { type: "text", text: "It felt like about 10 pages." },
            { type: "text", text: "Seventy-five is pretty much our limit." },
            { type: "text", text: "You've really got that" },
            { type: "text", text: "down to a science." },
            { type: "text", text: "I lost a cousin to Italian Vogue." },
            { type: "text", text: "I'll bet." },
            { type: "text", text: "What in the name" },
            { type: "text", text: "of Mighty Hercules is this?" },
            { type: "text", text: "How did this get here?" },
            { type: "text", text: "Cute Bee, Golden Blossom," },
            { type: "text", text: "Ray Liotta Private Select?" },
            { type: "text", text: "Is he that actor?" },
            { type: "text", text: "I never heard of him." },
            { type: "text", text: "Why is this here?" },
            { type: "text", text: "For people. We eat it." },
            { type: "text", text: "You don't have" },
            { type: "text", text: "enough food of your own?" },
            { type: "text", text: "Well, yes." },
            { type: "text", text: "How do you get it?" },
            { type: "text", text: "Bees make it." },
            { type: "text", text: "I know who makes it!" },
            { type: "text", text: "And it's hard to make it!" },
            { type: "text", text: "There's heating, cooling, stirring." },
            { type: "text", text: "You need a whole Krelman thing!" },
            { type: "text", text: "It's organic." },
            { type: "text", text: "It's our-ganic!" },
            { type: "text", text: "It's just honey, Barry." },
            { type: "text", text: "Just what?!" },
            { type: "text", text: "Bees don't know about this!" },
            { type: "text", text: "This is stealing! A lot of stealing!" },
            { type: "text", text: "You've taken our homes, schools," },
            { type: "text", text: "hospitals! This is all we have!" },
            { type: "text", text: "And it's on sale?!" },
            { type: "text", text: "I'm getting to the bottom of this." },
            { type: "text", text: "I'm getting to the bottom" },
            { type: "text", text: "of all of this!" },
            { type: "text", text: "Hey, Hector." },
            { type: "text", text: "You almost done?" },
            { type: "text", text: "Almost." },
            { type: "text", text: "He is here. I sense it." },
            { type: "text", text: "Well, I guess I'll go home now" },
            { type: "text", text: "and just leave this nice honey out," },
            { type: "text", text: "with no one around." },
            { type: "text", text: "You're busted, box boy!" },
            { type: "text", text: "I knew I heard something." },
            { type: "text", text: "So you can talk!" },
            { type: "text", text: "I can talk." },
            { type: "text", text: "And now you'll start talking!" },
            { type: "text", text: "Where you getting the sweet stuff?" },
            { type: "text", text: "Who's your supplier?" },
            { type: "text", text: "I don't understand." },
            { type: "text", text: "I thought we were friends." },
            { type: "text", text: "The last thing we want" },
            { type: "text", text: "to do is upset bees!" },
            { type: "text", text: "You're too late! It's ours now!" },
            { type: "text", text: "You, sir, have crossed" },
            { type: "text", text: "the wrong sword!" },
            { type: "text", text: "You, sir, will be lunch" },
            { type: "text", text: "for my iguana, Ignacio!" },
            { type: "text", text: "Where is the honey coming from?" },
            { type: "text", text: "Tell me where!" },
            { type: "text", text: "Honey Farms! It comes from Honey Farms!" },
            { type: "text", text: "Crazy person!" },
            { type: "text", text: "What horrible thing has happened here?" },
            { type: "text", text: "These faces, they never knew" },
            { type: "text", text: "what hit them. And now" },
            { type: "text", text: "they're on the road to nowhere!" },
            { type: "text", text: "Just keep still." },
            { type: "text", text: "What? You're not dead?" },
            { type: "text", text: "Do I look dead? They will wipe anything" },
            { type: "text", text: "that moves. Where you headed?" },
            { type: "text", text: "To Honey Farms." },
            { type: "text", text: "I am onto something huge here." },
            { type: "text", text: "I'm going to Alaska. Moose blood," },
            { type: "text", text: "crazy stuff. Blows your head off!" },
            { type: "text", text: "I'm going to Tacoma." },
            { type: "text", text: "And you?" },
            { type: "text", text: "He really is dead." },
            { type: "text", text: "All right." },
            { type: "text", text: "Uh-oh!" },
            { type: "text", text: "What is that?!" },
            { type: "text", text: "Oh, no!" },
            { type: "text", text: "A wiper! Triple blade!" },
            { type: "text", text: "Triple blade?" },
            { type: "text", text: "Jump on! It's your only chance, bee!" },
            { type: "text", text: "Why does everything have" },
            { type: "text", text: "to be so doggone clean?!" },
            { type: "text", text: "How much do you people need to see?!" },
            { type: "text", text: "Open your eyes!" },
            { type: "text", text: "Stick your head out the window!" },
            { type: "text", text: "From NPR News in Washington," },
            { type: "text", text: "I'm Carl Kasell." },
            { type: "text", text: "But don't kill no more bugs!" },
            { type: "text", text: "Bee!" },
            { type: "text", text: "Moose blood guy!!" },
            { type: "text", text: "You hear something?" },
            { type: "text", text: "Like what?" },
            { type: "text", text: "Like tiny screaming." },
            { type: "text", text: "Turn off the radio." },
            { type: "text", text: "Whassup, bee boy?" },
            { type: "text", text: "Hey, Blood." },
            { type: "text", text: "Just a row of honey jars," },
            { type: "text", text: "as far as the eye could see." },
            { type: "text", text: "Wow!" },
            { type: "text", text: "I assume wherever this truck goes" },
            { type: "text", text: "is where they're getting it." },
            { type: "text", text: "I mean, that honey's ours." },
            { type: "text", text: "Bees hang tight." },
            { type: "text", text: "We're all jammed in." },
            { type: "text", text: "It's a close community." },
            { type: "text", text: "Not us, man. We on our own." },
            { type: "text", text: "Every mosquito on his own." },
            { type: "text", text: "What if you get in trouble?" },
            { type: "text", text: "You a mosquito, you in trouble." },
            { type: "text", text: "Nobody likes us. They just smack." },
            { type: "text", text: "See a mosquito, smack, smack!" },
            { type: "text", text: "At least you're out in the world." },
            { type: "text", text: "You must meet girls." },
            { type: "text", text: "Mosquito girls try to trade up," },
            { type: "text", text: "get with a moth, dragonfly." },
            { type: "text", text: "Mosquito girl don't want no mosquito." },
            { type: "text", text: "You got to be kidding me!" },
            { type: "text", text: "Mooseblood's about to leave" },
            { type: "text", text: "the building! So long, bee!" },
            { type: "text", text: "Hey, guys!" },
            { type: "text", text: "Mooseblood!" },
            { type: "text", text: "I knew I'd catch y'all down here." },
            { type: "text", text: "Did you bring your crazy straw?" },
            { type: "text", text: "We throw it in jars, slap a label on it," },
            { type: "text", text: "and it's pretty much pure profit." },
            { type: "text", text: "What is this place?" },
            { type: "text", text: "A bee's got a brain" },
            { type: "text", text: "the size of a pinhead." },
            { type: "text", text: "They are pinheads!" },
            { type: "text", text: "Pinhead." },
            { type: "text", text: "Check out the new smoker." },
            { type: "text", text: "Oh, sweet. That's the one you want." },
            { type: "text", text: "The Thomas 3000!" },
            { type: "text", text: "Smoker?" },
            { type: "text", text: "Ninety puffs a minute, semi-automatic." },
            { type: "text", text: "Twice the nicotine, all the tar." },
            { type: "text", text: "A couple breaths of this" },
            { type: "text", text: "knocks them right out." },
            { type: "text", text: "They make the honey," },
            { type: "text", text: "and we make the money." },
            { type: "text", text: "They make the honey," },
            { type: "text", text: "and we make the money?" },
            { type: "text", text: "Oh, my!" },
            { type: "text", text: "What's going on? Are you OK?" },
            { type: "text", text: "Yeah. It doesn't last too long." },
            { type: "text", text: "Do you know you're" },
            { type: "text", text: "in a fake hive with fake walls?" },
            { type: "text", text: "Our queen was moved here." },
            { type: "text", text: "We had no choice." },
            { type: "text", text: "This is your queen?" },
            { type: "text", text: "That's a man in women's clothes!" },
            { type: "text", text: "That's a drag queen!" },
            { type: "text", text: "What is this?" },
            { type: "text", text: "Oh, no!" },
            { type: "text", text: "There's hundreds of them!" },
            { type: "text", text: "Bee honey." },
            { type: "text", text: "Our honey is being brazenly stolen" },
            { type: "text", text: "on a massive scale!" },
            { type: "text", text: "This is worse than anything bears" },
            { type: "text", text: "have done! I intend to do something." },
            { type: "text", text: "Oh, Barry, stop." },
            { type: "text", text: "Who told you humans are taking" },
            { type: "text", text: "our honey? That's a rumor." },
            { type: "text", text: "Do these look like rumors?" },
            { type: "text", text: "That's a conspiracy theory." },
            { type: "text", text: "These are obviously doctored photos." },
            { type: "text", text: "How did you get mixed up in this?" },
            { type: "text", text: "He's been talking to humans." },
            { type: "text", text: "What?" },
            { type: "text", text: "Talking to humans?!" },
            { type: "text", text: "He has a human girlfriend." },
            { type: "text", text: "And they make out!" },
            { type: "text", text: "Make out? Barry!" },
            { type: "text", text: "We do not." },
            { type: "text", text: "You wish you could." },
            { type: "text", text: "Whose side are you on?" },
            { type: "text", text: "The bees!" },
            { type: "text", text: "I dated a cricket once in San Antonio." },
            { type: "text", text: "Those crazy legs kept me up all night." },
            { type: "text", text: "Barry, this is what you want" },
            { type: "text", text: "to do with your life?" },
            { type: "text", text: "I want to do it for all our lives." },
            { type: "text", text: "Nobody works harder than bees!" },
            { type: "text", text: "Dad, I remember you" },
            { type: "text", text: "coming home so overworked" },
            { type: "text", text: "your hands were still stirring." },
            { type: "text", text: "You couldn't stop." },
            { type: "text", text: "I remember that." },
            { type: "text", text: "What right do they have to our honey?" },
            { type: "text", text: "We live on two cups a year. They put it" },
            { type: "text", text: "in lip balm for no reason whatsoever!" },
            { type: "text", text: "Even if it's true, what can one bee do?" },
            { type: "text", text: "Sting them where it really hurts." },
            { type: "text", text: "In the face! The eye!" },
            { type: "text", text: "That would hurt." },
            { type: "text", text: "No." },
            { type: "text", text: "Up the nose? That's a killer." },
            { type: "text", text: "There's only one place you can sting" },
            { type: "text", text: "the humans, one place where it matters." },
            { type: "text", text: "Hive at Five, the hive's only" },
            { type: "text", text: "full-hour action news source." },
            { type: "text", text: "No more bee beards!" },
            { type: "text", text: "With Bob Bumble at the anchor desk." },
            { type: "text", text: "Weather with Storm Stinger." },
            { type: "text", text: "Sports with Buzz Larvi." },
            { type: "text", text: "And Jeanette Chung." },
            { type: "text", text: "Good evening. I'm Bob Bumble." },
            { type: "text", text: "And I'm Jeanette Chung." },
            { type: "text", text: "A tri-county bee, Barry Benson," },
            { type: "text", text: "intends to sue the human race" },
            { type: "text", text: "for stealing our honey," },
            { type: "text", text: "packaging it and profiting" },
            { type: "text", text: "from it illegally!" },
            { type: "text", text: "Tomorrow night on Bee Larry King," },
            { type: "text", text: "we'll have three former queens here in" },
            { type: "text", text: "our studio, discussing their new book," },
            { type: "text", text: "Classy Ladies," },
            { type: "text", text: "out this week on Hexagon." },
            { type: "text", text: "Tonight we're talking to Barry Benson." },
            { type: "text", text: "Did you ever think, I'm a kid" },
            { type: "text", text: "from the hive. I can't do this?" },
            { type: "text", text: "Bees have never been afraid" },
            { type: "text", text: "to change the world." },
            { type: "text", text: "What about Bee Columbus?" },
            { type: "text", text: "Bee Gandhi? Bejesus?" },
            { type: "text", text: "Where I'm from, we'd never sue humans." },
            { type: "text", text: "We were thinking" },
            { type: "text", text: "of stickball or candy stores." },
            { type: "text", text: "How old are you?" },
            { type: "text", text: "The bee community" },
            { type: "text", text: "is supporting you in this case," },
            { type: "text", text: "which will be the trial" },
            { type: "text", text: "of the bee century." },
            { type: "text", text: "You know, they have a Larry King" },
            { type: "text", text: "in the human world too." },
            { type: "text", text: "It's a common name. Next week..." },
            { type: "text", text: "He looks like you and has a show" },
            { type: "text", text: "and suspenders and colored dots..." },
            { type: "text", text: "Next week..." },
            { type: "text", text: "Glasses, quotes on the bottom from the" },
            { type: "text", text: "guest even though you just heard 'em." },
            { type: "text", text: "Bear Week next week!" },
            { type: "text", text: "They're scary, hairy and here live." },
            { type: "text", text: "Always leans forward, pointy shoulders," },
            { type: "text", text: "squinty eyes, very Jewish." },
            { type: "text", text: "In tennis, you attack" },
            { type: "text", text: "at the point of weakness!" },
            { type: "text", text: "It was my grandmother, Ken. She's 81." },
            { type: "text", text: "Honey, her backhand's a joke!" },
            { type: "text", text: "I'm not gonna take advantage of that?" },
            { type: "text", text: "Quiet, please." },
            { type: "text", text: "Actual work going on here." },
            { type: "text", text: "Is that that same bee?" },
            { type: "text", text: "Yes, it is!" },
            { type: "text", text: "I'm helping him sue the human race." },
            { type: "text", text: "Hello." },
            { type: "text", text: "Hello, bee." },
            { type: "text", text: "This is Ken." },
            { type: "text", text: "Yeah, I remember you. Timberland, size" },
            { type: "text", text: "ten and a half. Vibram sole, I believe." },
            { type: "text", text: "Why does he talk again?" },
            { type: "text", text: "Listen, you better go" },
            { type: "text", text: "'cause we're really busy working." },
            { type: "text", text: "But it's our yogurt night!" },
            { type: "text", text: "Bye-bye." },
            { type: "text", text: "Why is yogurt night so difficult?!" },
            { type: "text", text: "You poor thing." },
            { type: "text", text: "You two have been at this for hours!" },
            { type: "text", text: "Yes, and Adam here" },
            { type: "text", text: "has been a huge help." },
            { type: "text", text: "Frosting..." },
            { type: "text", text: "How many sugars?" },
            { type: "text", text: "Just one. I try not" },
            { type: "text", text: "to use the competition." },
            { type: "text", text: "So why are you helping me?" },
            { type: "text", text: "Bees have good qualities." },
            { type: "text", text: "And it takes my mind off the shop." },
            { type: "text", text: "Instead of flowers, people" },
            { type: "text", text: "are giving balloon bouquets now." },
            { type: "text", text: "Those are great, if you're three." },
            { type: "text", text: "And artificial flowers." },
            { type: "text", text: "Oh, those just get me psychotic!" },
            { type: "text", text: "Yeah, me too." },
            { type: "text", text: "Bent stingers, pointless pollination." },
            { type: "text", text: "Bees must hate those fake things!" },
            { type: "text", text: "Nothing worse" },
            { type: "text", text: "than a daffodil that's had work done." },
            { type: "text", text: "Maybe this could make up" },
            { type: "text", text: "for it a little bit." },
            { type: "text", text: "This lawsuit's a pretty big deal." },
            { type: "text", text: "I guess." },
            { type: "text", text: "You sure you want to go through with it?" },
            { type: "text", text: "Am I sure? When I'm done with" },
            { type: "text", text: "the humans, they won't be able" },
            { type: "text", text: "to say, Honey, I'm home," },
            { type: "text", text: "without paying a royalty!" },
            { type: "text", text: "It's an incredible scene" },
            { type: "text", text: "here in downtown Manhattan," },
            { type: "text", text: "where the world anxiously waits," },
            { type: "text", text: "because for the first time in history," },
            { type: "text", text: "we will hear for ourselves" },
            { type: "text", text: "if a honeybee can actually speak." },
            { type: "text", text: "What have we gotten into here, Barry?" },
            { type: "text", text: "It's pretty big, isn't it?" },
            { type: "text", text: "I can't believe how many humans" },
            { type: "text", text: "don't work during the day." },
            { type: "text", text: "You think billion-dollar multinational" },
            { type: "text", text: "food companies have good lawyers?" },
            { type: "text", text: "Everybody needs to stay" },
            { type: "text", text: "behind the barricade." },
            { type: "text", text: "What's the matter?" },
            { type: "text", text: "I don't know, I just got a chill." },
            { type: "text", text: "Well, if it isn't the bee team." },
            { type: "text", text: "You boys work on this?" },
            { type: "text", text: "All rise! The Honorable" },
            { type: "text", text: "Judge Bumbleton presiding." },
            { type: "text", text: "All right. Case number 4475," },
            { type: "text", text: "Superior Court of New York," },
            { type: "text", text: "Barry Bee Benson v. the Honey Industry" },
            { type: "text", text: "is now in session." },
            { type: "text", text: "Mr. Montgomery, you're representing" },
            { type: "text", text: "the five food companies collectively?" },
            { type: "text", text: "A privilege." },
            { type: "text", text: "Mr. Benson... you're representing" },
            { type: "text", text: "all the bees of the world?" },
            { type: "text", text: "I'm kidding. Yes, Your Honor," },
            { type: "text", text: "we're ready to proceed." },
            { type: "text", text: "Mr. Montgomery," },
            { type: "text", text: "your opening statement, please." },
            { type: "text", text: "Ladies and gentlemen of the jury," },
            { type: "text", text: "my grandmother was a simple woman." },
            { type: "text", text: "Born on a farm, she believed" },
            { type: "text", text: "it was man's divine right" },
            { type: "text", text: "to benefit from the bounty" },
            { type: "text", text: "of nature God put before us." },
            { type: "text", text: "If we lived in the topsy-turvy world" },
            { type: "text", text: "Mr. Benson imagines," },
            { type: "text", text: "just think of what would it mean." },
            { type: "text", text: "I would have to negotiate" },
            { type: "text", text: "with the silkworm" },
            { type: "text", text: "for the elastic in my britches!" },
            { type: "text", text: "Talking bee!" },
            { type: "text", text: "How do we know this isn't some sort of" },
            { type: "text", text: "holographic motion-picture-capture" },
            { type: "text", text: "Hollywood wizardry?" },
            { type: "text", text: "They could be using laser beams!" },
            { type: "text", text: "Robotics! Ventriloquism!" },
            { type: "text", text: "Cloning! For all we know," },
            { type: "text", text: "he could be on steroids!" },
            { type: "text", text: "Mr. Benson?" },
            { type: "text", text: "Ladies and gentlemen," },
            { type: "text", text: "there's no trickery here." },
            { type: "text", text: "I'm just an ordinary bee." },
            { type: "text", text: "Honey's pretty important to me." },
            { type: "text", text: "It's important to all bees." },
            { type: "text", text: "We invented it!" },
            { type: "text", text: "We make it. And we protect it" },
            { type: "text", text: "with our lives." },
            { type: "text", text: "Unfortunately, there are" },
            { type: "text", text: "some people in this room" },
            { type: "text", text: "who think they can take it from us" },
            { type: "text", text: "'cause we're the little guys!" },
            { type: "text", text: "I'm hoping that, after this is all over," },
            { type: "text", text: "you'll see how, by taking our honey," },
            { type: "text", text: "you not only take everything we have" },
            { type: "text", text: "but everything we are!" },
            { type: "text", text: "I wish he'd dress like that" },
            { type: "text", text: "all the time. So nice!" },
            { type: "text", text: "Call your first witness." },
            { type: "text", text: "So, Mr. Klauss Vanderhayden" },
            { type: "text", text: "of Honey Farms, big company you have." },
            { type: "text", text: "I suppose so." },
            { type: "text", text: "I see you also own" },
            { type: "text", text: "Honeyburton and Honron!" },
            { type: "text", text: "Yes, they provide beekeepers" },
            { type: "text", text: "for our farms." },
            { type: "text", text: "Beekeeper. I find that" },
            { type: "text", text: "to be a very disturbing term." },
            { type: "text", text: "I don't imagine you employ" },
            { type: "text", text: "any bee-free-ers, do you?" },
            { type: "text", text: "No." },
            { type: "text", text: "I couldn't hear you." },
            { type: "text", text: "No." },
            { type: "text", text: "No." },
            { type: "text", text: "Because you don't free bees." },
            { type: "text", text: "You keep bees. Not only that," },
            { type: "text", text: "it seems you thought a bear would be" },
            { type: "text", text: "an appropriate image for a jar of honey." },
            { type: "text", text: "They're very lovable creatures." },
            { type: "text", text: "Yogi Bear, Fozzie Bear, Build-A-Bear." },
            { type: "text", text: "You mean like this?" },
            { type: "text", text: "Bears kill bees!" },
            { type: "text", text: "How'd you like his head crashing" },
            { type: "text", text: "through your living room?!" },
            { type: "text", text: "Biting into your couch!" },
            { type: "text", text: "Spitting out your throw pillows!" },
            { type: "text", text: "OK, that's enough. Take him away." },
            { type: "text", text: "So, Mr. Sting, thank you for being here." },
            { type: "text", text: "Your name intrigues me." },
            { type: "text", text: "Where have I heard it before?" },
            { type: "text", text: "I was with a band called The Police." },
            { type: "text", text: "But you've never been" },
            { type: "text", text: "a police officer, have you?" },
            { type: "text", text: "No, I haven't." },
            { type: "text", text: "No, you haven't. And so here" },
            { type: "text", text: "we have yet another example" },
            { type: "text", text: "of bee culture casually" },
            { type: "text", text: "stolen by a human" },
            { type: "text", text: "for nothing more than" },
            { type: "text", text: "a prance-about stage name." },
            { type: "text", text: "Oh, please." },
            { type: "text", text: "Have you ever been stung, Mr. Sting?" },
            { type: "text", text: "Because I'm feeling" },
            { type: "text", text: "a little stung, Sting." },
            { type: "text", text: "Or should I say... Mr. Gordon M. Sumner!" },
            { type: "text", text: "That's not his real name?! You idiots!" },
            { type: "text", text: "Mr. Liotta, first," },
            { type: "text", text: "belated congratulations on" },
            { type: "text", text: "your Emmy win for a guest spot" },
            { type: "text", text: "on ER in 2005." },
            { type: "text", text: "Thank you. Thank you." },
            { type: "text", text: "I see from your resume" },
            { type: "text", text: "that you're devilishly handsome" },
            { type: "text", text: "with a churning inner turmoil" },
            { type: "text", text: "that's ready to blow." },
            { type: "text", text: "I enjoy what I do. Is that a crime?" },
            { type: "text", text: "Not yet it isn't. But is this" },
            { type: "text", text: "what it's come to for you?" },
            { type: "text", text: "Exploiting tiny, helpless bees" },
            { type: "text", text: "so you don't" },
            { type: "text", text: "have to rehearse" },
            { type: "text", text: "your part and learn your lines, sir?" },
            { type: "text", text: "Watch it, Benson!" },
            { type: "text", text: "I could blow right now!" },
            { type: "text", text: "This isn't a goodfella." },
            { type: "text", text: "This is a badfella!" },
            { type: "text", text: "Why doesn't someone just step on" },
            { type: "text", text: "this creep, and we can all go home?!" },
            { type: "text", text: "Order in this court!" },
            { type: "text", text: "You're all thinking it!" },
            { type: "text", text: "Order! Order, I say!" },
            { type: "text", text: "Say it!" },
            { type: "text", text: "Mr. Liotta, please sit down!" },
            { type: "text", text: "I think it was awfully nice" },
            { type: "text", text: "of that bear to pitch in like that." },
            { type: "text", text: "I think the jury's on our side." },
            { type: "text", text: "Are we doing everything right, legally?" },
            { type: "text", text: "I'm a florist." },
            { type: "text", text: "Right. Well, here's to a great team." },
            { type: "text", text: "To a great team!" },
            { type: "text", text: "Well, hello." },
            { type: "text", text: "Ken!" },
            { type: "text", text: "Hello." },
            { type: "text", text: "I didn't think you were coming." },
            { type: "text", text: "No, I was just late." },
            { type: "text", text: "I tried to call, but... the battery." },
            { type: "text", text: "I didn't want all this to go to waste," },
            { type: "text", text: "so I called Barry. Luckily, he was free." },
            { type: "text", text: "Oh, that was lucky." },
            { type: "text", text: "There's a little left." },
            { type: "text", text: "I could heat it up." },
            { type: "text", text: "Yeah, heat it up, sure, whatever." },
            { type: "text", text: "So I hear you're quite a tennis player." },
            { type: "text", text: "I'm not much for the game myself." },
            { type: "text", text: "The ball's a little grabby." },
            { type: "text", text: "That's where I usually sit." },
            { type: "text", text: "Right... there." },
            { type: "text", text: "Ken, Barry was looking at your resume," },
            { type: "text", text: "and he agreed with me that eating with" },
            { type: "text", text: "chopsticks isn't really a special skill." },
            { type: "text", text: "You think I don't see what you're doing?" },
            { type: "text", text: "I know how hard it is to find" },
            { type: "text", text: "the rightjob. We have that in common." },
            { type: "text", text: "Do we?" },
            { type: "text", text: "Bees have 100 percent employment," },
            { type: "text", text: "but we do jobs like taking the crud out." },
            { type: "text", text: "That's just what" },
            { type: "text", text: "I was thinking about doing." },
            { type: "text", text: "Ken, I let Barry borrow your razor" },
            { type: "text", text: "for his fuzz. I hope that was all right." },
            { type: "text", text: "I'm going to drain the old stinger." },
            { type: "text", text: "Yeah, you do that." },
            { type: "text", text: "Look at that." },
            { type: "text", text: "You know, I've just about had it" },
            { type: "text", text: "with your little mind games." },
            { type: "text", text: "What's that?" },
            { type: "text", text: "Italian Vogue." },
            { type: "text", text: "Mamma mia, that's a lot of pages." },
            { type: "text", text: "A lot of ads." },
            { type: "text", text: "Remember what Van said, why is" },
            { type: "text", text: "your life more valuable than mine?" },
            { type: "text", text: "Funny, I just can't seem to recall that!" },
            { type: "text", text: "I think something stinks in here!" },
            { type: "text", text: "I love the smell of flowers." },
            { type: "text", text: "How do you like the smell of flames?!" },
            { type: "text", text: "Not as much." },
            { type: "text", text: "Water bug! Not taking sides!" },
            { type: "text", text: "Ken, I'm wearing a Chapstick hat!" },
            { type: "text", text: "This is pathetic!" },
            { type: "text", text: "I've got issues!" },
            { type: "text", text: "Well, well, well, a royal flush!" },
            { type: "text", text: "You're bluffing." },
            { type: "text", text: "Am I?" },
            { type: "text", text: "Surf's up, dude!" },
            { type: "text", text: "Poo water!" },
            { type: "text", text: "That bowl is gnarly." },
            { type: "text", text: "Except for those dirty yellow rings!" },
            { type: "text", text: "Kenneth! What are you doing?!" },
            { type: "text", text: "You know, I don't even like honey!" },
            { type: "text", text: "I don't eat it!" },
            { type: "text", text: "We need to talk!" },
            { type: "text", text: "He's just a little bee!" },
            { type: "text", text: "And he happens to be" },
            { type: "text", text: "the nicest bee I've met in a long time!" },
            { type: "text", text: "Long time? What are you talking about?!" },
            { type: "text", text: "Are there other bugs in your life?" },
            { type: "text", text: "No, but there are other things bugging" },
            { type: "text", text: "me in life. And you're one of them!" },
            { type: "text", text: "Fine! Talking bees, no yogurt night..." },
            { type: "text", text: "My nerves are fried from riding" },
            { type: "text", text: "on this emotional roller coaster!" },
            { type: "text", text: "Goodbye, Ken." },
            { type: "text", text: "And for your information," },
            { type: "text", text: "I prefer sugar-free, artificial" },
            { type: "text", text: "sweeteners made by man!" },
            { type: "text", text: "I'm sorry about all that." },
            { type: "text", text: "I know it's got" },
            { type: "text", text: "an aftertaste! I like it!" },
            { type: "text", text: "I always felt there was some kind" },
            { type: "text", text: "of barrier between Ken and me." },
            { type: "text", text: "I couldn't overcome it." },
            { type: "text", text: "Oh, well." },
            { type: "text", text: "Are you OK for the trial?" },
            { type: "text", text: "I believe Mr. Montgomery" },
            { type: "text", text: "is about out of ideas." },
            { type: "text", text: "We would like to call" },
            { type: "text", text: "Mr. Barry Benson Bee to the stand." },
            { type: "text", text: "Good idea! You can really see why he's" },
            { type: "text", text: "considered one of the best lawyers..." },
            { type: "text", text: "Yeah." },
            { type: "text", text: "Layton, you've" },
            { type: "text", text: "gotta weave some magic" },
            { type: "text", text: "with this jury," },
            { type: "text", text: "or it's gonna be all over." },
            { type: "text", text: "Don't worry. The only thing I have" },
            { type: "text", text: "to do to turn this jury around" },
            { type: "text", text: "is to remind them" },
            { type: "text", text: "of what they don't like about bees." },
            { type: "text", text: "You got the tweezers?" },
            { type: "text", text: "Are you allergic?" },
            { type: "text", text: "Only to losing, son. Only to losing." },
            { type: "text", text: "Mr. Benson Bee, I'll ask you" },
            { type: "text", text: "what I think we'd all like to know." },
            { type: "text", text: "What exactly is your relationship" },
            { type: "text", text: "to that woman?" },
            { type: "text", text: "We're friends." },
            { type: "text", text: "Good friends?" },
            { type: "text", text: "Yes." },
            { type: "text", text: "How good? Do you live together?" },
            { type: "text", text: "Wait a minute..." },
            { type: "text", text: "Are you her little..." },
            { type: "text", text: "...bedbug?" },
            { type: "text", text: "I've seen a bee documentary or two." },
            { type: "text", text: "From what I understand," },
            { type: "text", text: "doesn't your queen give birth" },
            { type: "text", text: "to all the bee children?" },
            { type: "text", text: "Yeah, but..." },
            { type: "text", text: "So those aren't your real parents!" },
            { type: "text", text: "Oh, Barry..." },
            { type: "text", text: "Yes, they are!" },
            { type: "text", text: "Hold me back!" },
            { type: "text", text: "You're an illegitimate bee," },
            { type: "text", text: "aren't you, Benson?" },
            { type: "text", text: "He's denouncing bees!" },
            { type: "text", text: "Don't y'all date your cousins?" },
            { type: "text", text: "Objection!" },
            { type: "text", text: "I'm going to pincushion this guy!" },
            { type: "text", text: "Adam, don't! It's what he wants!" },
            { type: "text", text: "Oh, I'm hit!!" },
            { type: "text", text: "Oh, lordy, I am hit!" },
            { type: "text", text: "Order! Order!" },
            { type: "text", text: "The venom! The venom" },
            { type: "text", text: "is coursing through my veins!" },
            { type: "text", text: "I have been felled" },
            { type: "text", text: "by a winged beast of destruction!" },
            { type: "text", text: "You see? You can't treat them" },
            { type: "text", text: "like equals! They're striped savages!" },
            { type: "text", text: "Stinging's the only thing" },
            { type: "text", text: "they know! It's their way!" },
            { type: "text", text: "Adam, stay with me." },
            { type: "text", text: "I can't feel my legs." },
            { type: "text", text: "What angel of mercy" },
            { type: "text", text: "will come forward to suck the poison" },
            { type: "text", text: "from my heaving buttocks?" },
            { type: "text", text: "I will have order in this court. Order!" },
            { type: "text", text: "Order, please!" },
            { type: "text", text: "The case of the honeybees" },
            { type: "text", text: "versus the human race" },
            { type: "text", text: "took a pointed turn against the bees" },
            { type: "text", text: "yesterday when one of their legal" },
            { type: "text", text: "team stung Layton T. Montgomery." },
            { type: "text", text: "Hey, buddy." },
            { type: "text", text: "Hey." },
            { type: "text", text: "Is there much pain?" },
            { type: "text", text: "Yeah." },
            { type: "text", text: "I..." },
            { type: "text", text: "I blew the whole case, didn't I?" },
            { type: "text", text: "It doesn't matter. What matters is" },
            { type: "text", text: "you're alive. You could have died." },
            { type: "text", text: "I'd be better off dead. Look at me." },
            { type: "text", text: "They got it from the cafeteria" },
            { type: "text", text: "downstairs, in a tuna sandwich." },
            { type: "text", text: "Look, there's" },
            { type: "text", text: "a little celery still on it." },
            { type: "text", text: "What was it like to sting someone?" },
            { type: "text", text: "I can't explain it. It was all..." },
            { type: "text", text: "All adrenaline and then..." },
            { type: "text", text: "and then ecstasy!" },
            { type: "text", text: "All right." },
            { type: "text", text: "You think it was all a trap?" },
            { type: "text", text: "Of course. I'm sorry." },
            { type: "text", text: "I flew us right into this." },
            { type: "text", text: "What were we thinking? Look at us. We're" },
            { type: "text", text: "just a couple of bugs in this world." },
            { type: "text", text: "What will the humans do to us" },
            { type: "text", text: "if they win?" },
            { type: "text", text: "I don't know." },
            { type: "text", text: "I hear they put the roaches in motels." },
            { type: "text", text: "That doesn't sound so bad." },
            { type: "text", text: "Adam, they check in," },
            { type: "text", text: "but they don't check out!" },
            { type: "text", text: "Oh, my." },
            { type: "text", text: "Could you get a nurse" },
            { type: "text", text: "to close that window?" },
            { type: "text", text: "Why?" },
            { type: "text", text: "The smoke." },
            { type: "text", text: "Bees don't smoke." },
            { type: "text", text: "Right. Bees don't smoke." },
            { type: "text", text: "Bees don't smoke!" },
            { type: "text", text: "But some bees are smoking." },
            { type: "text", text: "That's it! That's our case!" },
            { type: "text", text: "It is? It's not over?" },
            { type: "text", text: "Get dressed. I've gotta go somewhere." },
            { type: "text", text: "Get back to the court and stall." },
            { type: "text", text: "Stall any way you can." },
            { type: "text", text: "And assuming you've done step correctly, you're ready for the tub." },
            { type: "text", text: "Mr. Flayman." },
            { type: "text", text: "Yes? Yes, Your Honor!" },
            { type: "text", text: "Where is the rest of your team?" },
            { type: "text", text: "Well, Your Honor, it's interesting." },
            { type: "text", text: "Bees are trained to fly haphazardly," },
            { type: "text", text: "and as a result," },
            { type: "text", text: "we don't make very good time." },
            { type: "text", text: "I actually heard a funny story about..." },
            { type: "text", text: "Your Honor," },
            { type: "text", text: "haven't these ridiculous bugs" },
            { type: "text", text: "taken up enough" },
            { type: "text", text: "of this court's valuable time?" },
            { type: "text", text: "How much longer will we allow" },
            { type: "text", text: "these absurd shenanigans to go on?" },
            { type: "text", text: "They have presented no compelling" },
            { type: "text", text: "evidence to support their charges" },
            { type: "text", text: "against my clients," },
            { type: "text", text: "who run legitimate businesses." },
            { type: "text", text: "I move for a complete dismissal" },
            { type: "text", text: "of this entire case!" },
            { type: "text", text: "Mr. Flayman, I'm afraid I'm going" },
            { type: "text", text: "to have to consider" },
            { type: "text", text: "Mr. Montgomery's motion." },
            { type: "text", text: "But you can't! We have a terrific case." },
            { type: "text", text: "Where is your proof?" },
            { type: "text", text: "Where is the evidence?" },
            { type: "text", text: "Show me the smoking gun!" },
            { type: "text", text: "Hold it, Your Honor!" },
            { type: "text", text: "You want a smoking gun?" },
            { type: "text", text: "Here is your smoking gun." },
            { type: "text", text: "What is that?" },
            { type: "text", text: "It's a bee smoker!" },
            { type: "text", text: "What, this?" },
            { type: "text", text: "This harmless little contraption?" },
            { type: "text", text: "This couldn't hurt a fly," },
            { type: "text", text: "let alone a bee." },
            { type: "text", text: "Look at what has happened" },
            { type: "text", text: "to bees who have never been asked," },
            { type: "text", text: "Smoking or non?" },
            { type: "text", text: "Is this what nature intended for us?" },
            { type: "text", text: "To be forcibly addicted" },
            { type: "text", text: "to smoke machines" },
            { type: "text", text: "and man-made wooden slat work camps?" },
            { type: "text", text: "Living out our lives as honey slaves" },
            { type: "text", text: "to the white man?" },
            { type: "text", text: "What are we gonna do?" },
            { type: "text", text: "He's playing the species card." },
            { type: "text", text: "Ladies and gentlemen, please," },
            { type: "text", text: "free these bees!" },
            { type: "text", text: "Free the bees! Free the bees!" },
            { type: "text", text: "Free the bees!" },
            { type: "text", text: "Free the bees! Free the bees!" },
            { type: "text", text: "The court finds in favor of the bees!" },
            { type: "text", text: "Vanessa, we won!" },
            { type: "text", text: "I knew you could do it! High-five!" },
            { type: "text", text: "Sorry." },
            { type: "text", text: "I'm OK! You know what this means?" },
            { type: "text", text: "All the honey" },
            { type: "text", text: "will finally belong to the bees." },
            { type: "text", text: "Now we won't have" },
            { type: "text", text: "to work so hard all the time." },
            { type: "text", text: "This is an unholy perversion" },
            { type: "text", text: "of the balance of nature, Benson." },
            { type: "text", text: "You'll regret this." },
            { type: "text", text: "Barry, how much honey is out there?" },
            { type: "text", text: "All right. One at a time." },
            { type: "text", text: "Barry, who are you wearing?" },
            { type: "text", text: "My sweater is Ralph Lauren," },
            { type: "text", text: "and I have no pants." },
            { type: "text", text: "What if Montgomery's right?" },
            { type: "text", text: "What do you mean?" },
            { type: "text", text: "We've been living the bee way" },
            { type: "text", text: "a long time, 27 million years." },
            { type: "text", text: "Congratulations on your victory." },
            { type: "text", text: "What will you demand as a settlement?" },
            { type: "text", text: "First, we'll demand a complete shutdown" },
            { type: "text", text: "of all bee work camps." },
            { type: "text", text: "Then we want back the honey" },
            { type: "text", text: "that was ours to begin with," },
            { type: "text", text: "every last drop." },
            { type: "text", text: "We demand an end to the glorification" },
            { type: "text", text: "of the bear as anything more" },
            { type: "text", text: "than a filthy, smelly," },
            { type: "text", text: "bad-breath stink machine." },
            { type: "text", text: "We're all aware" },
            { type: "text", text: "of what they do in the woods." },
            { type: "text", text: "Wait for my signal." },
            { type: "text", text: "Take him out." },
            { type: "text", text: "He'll have nauseous" },
            { type: "text", text: "for a few hours, then he'll be fine." },
            { type: "text", text: "And we will no longer tolerate" },
            { type: "text", text: "bee-negative nicknames..." },
            { type: "text", text: "But it's just a prance-about stage name!" },
            { type: "text", text: "...unnecessary inclusion of honey" },
            { type: "text", text: "in bogus health products" },
            { type: "text", text: "and la-dee-da human" },
            { type: "text", text: "tea-time snack garnishments." },
            { type: "text", text: "Can't breathe." },
            { type: "text", text: "Bring it in, boys!" },
            { type: "text", text: "Hold it right there! Good." },
            { type: "text", text: "Tap it." },
            { type: "text", text: "Mr. Buzzwell, we just passed three cups," },
            { type: "text", text: "and there's gallons more coming!" },
            { type: "text", text: "I think we need to shut down!" },
            { type: "text", text: "Shut down? We've never shut down." },
            { type: "text", text: "Shut down honey production!" },
            { type: "text", text: "Stop making honey!" },
            { type: "text", text: "Turn your key, sir!" },
            { type: "text", text: "What do we do now?" },
            { type: "text", text: "Cannonball!" },
            { type: "text", text: "We're shutting honey production!" },
            { type: "text", text: "Mission abort." },
            { type: "text", text: "Aborting pollination and nectar detail." },
            { type: "text", text: "Returning to base." },
            { type: "text", text: "Adam, you wouldn't believe" },
            { type: "text", text: "how much honey was out there." },
            { type: "text", text: "Oh, yeah?" },
            { type: "text", text: "What's going on? Where is everybody?" },
            { type: "text", text: "Are they out celebrating?" },
            { type: "text", text: "They're home." },
            { type: "text", text: "They don't know what to do." },
            { type: "text", text: "Laying out, sleeping in." },
            { type: "text", text: "I heard your Uncle Carl was on his way" },
            { type: "text", text: "to San Antonio with a cricket." },
            { type: "text", text: "At least we got our honey back." },
            { type: "text", text: "Sometimes I think, so what if humans" },
            { type: "text", text: "liked our honey? Who wouldn't?" },
            { type: "text", text: "It's the greatest thing in the world!" },
            { type: "text", text: "I was excited to be part of making it." },
            { type: "text", text: "This was my new desk. This was my" },
            { type: "text", text: "new job. I wanted to do it really well." },
            { type: "text", text: "And now..." },
            { type: "text", text: "Now I can't." },
            { type: "text", text: "I don't understand" },
            { type: "text", text: "why they're not happy." },
            { type: "text", text: "I thought their lives would be better!" },
            { type: "text", text: "They're doing nothing. It's amazing." },
            { type: "text", text: "Honey really changes people." },
            { type: "text", text: "You don't have any idea" },
            { type: "text", text: "what's going on, do you?" },
            { type: "text", text: "What did you want to show me?" },
            { type: "text", text: "This." },
            { type: "text", text: "What happened here?" },
            { type: "text", text: "That is not the half of it." },
            { type: "text", text: "Oh, no. Oh, my." },
            { type: "text", text: "They're all wilting." },
            { type: "text", text: "Doesn't look very good, does it?" },
            { type: "text", text: "No." },
            { type: "text", text: "And whose fault do you think that is?" },
            { type: "text", text: "You know, I'm gonna guess bees." },
            { type: "text", text: "Bees?" },
            { type: "text", text: "Specifically, me." },
            { type: "text", text: "I didn't think bees not needing to make" },
            { type: "text", text: "honey would affect all these things." },
            { type: "text", text: "It's notjust flowers." },
            { type: "text", text: "Fruits, vegetables, they all need bees." },
            { type: "text", text: "That's our whole SAT test right there." },
            { type: "text", text: "Take away produce, that affects" },
            { type: "text", text: "the entire animal kingdom." },
            { type: "text", text: "And then, of course..." },
            { type: "text", text: "The human species?" },
            { type: "text", text: "So if there's no more pollination," },
            { type: "text", text: "it could all just go south here," },
            { type: "text", text: "couldn't it?" },
            { type: "text", text: "I know this is also partly my fault." },
            { type: "text", text: "How about a suicide pact?" },
            { type: "text", text: "How do we do it?" },
            { type: "text", text: "I'll sting you, you step on me." },
            { type: "text", text: "Thatjust kills you twice." },
            { type: "text", text: "Right, right." },
            { type: "text", text: "Listen, Barry..." },
            { type: "text", text: "sorry, but I gotta get going." },
            { type: "text", text: "I had to open my mouth and talk." },
            { type: "text", text: "Vanessa?" },
            { type: "text", text: "Vanessa? Why are you leaving?" },
            { type: "text", text: "Where are you going?" },
            { type: "text", text: "To the final Tournament of Roses parade" },
            { type: "text", text: "in Pasadena." },
            { type: "text", text: "They've moved it to this weekend" },
            { type: "text", text: "because all the flowers are dying." },
            { type: "text", text: "It's the last chance" },
            { type: "text", text: "I'll ever have to see it." },
            { type: "text", text: "Vanessa, I just wanna say I'm sorry." },
            { type: "text", text: "I never meant it to turn out like this." },
            { type: "text", text: "I know. Me neither." },
            { type: "text", text: "Tournament of Roses." },
            { type: "text", text: "Roses can't do sports." },
            { type: "text", text: "Wait a minute. Roses. Roses?" },
            { type: "text", text: "Roses!" },
            { type: "text", text: "Vanessa!" },
            { type: "text", text: "Roses?!" },
            { type: "text", text: "Barry?" },
            { type: "text", text: "Roses are flowers!" },
            { type: "text", text: "Yes, they are." },
            { type: "text", text: "Flowers, bees, pollen!" },
            { type: "text", text: "I know." },
            { type: "text", text: "That's why this is the last parade." },
            { type: "text", text: "Maybe not." },
            { type: "text", text: "Could you ask him to slow down?" },
            { type: "text", text: "Could you slow down?" },
            { type: "text", text: "Barry!" },
            { type: "text", text: "OK, I made a huge mistake." },
            { type: "text", text: "This is a total disaster, all my fault." },
            { type: "text", text: "Yes, it kind of is." },
            { type: "text", text: "I've ruined the planet." },
            { type: "text", text: "I wanted to help you" },
            { type: "text", text: "with the flower shop." },
            { type: "text", text: "I've made it worse." },
            { type: "text", text: "Actually, it's completely closed down." },
            { type: "text", text: "I thought maybe you were remodeling." },
            { type: "text", text: "But I have another idea, and it's" },
            { type: "text", text: "greater than my previous ideas combined." },
            { type: "text", text: "I don't want to hear it!" },
            { type: "text", text: "All right, they have the roses," },
            { type: "text", text: "the roses have the pollen." },
            { type: "text", text: "I know every bee, plant" },
            { type: "text", text: "and flower bud in this park." },
            { type: "text", text: "All we gotta do is get what they've got" },
            { type: "text", text: "back here with what we've got." },
            { type: "text", text: "Bees." },
            { type: "text", text: "Park." },
            { type: "text", text: "Pollen!" },
            { type: "text", text: "Flowers." },
            { type: "text", text: "Repollination!" },
            { type: "text", text: "Across the nation!" },
            { type: "text", text: "Tournament of Roses," },
            { type: "text", text: "Pasadena, California." },
            { type: "text", text: "They've got nothing" },
            { type: "text", text: "but flowers, floats and cotton candy." },
            { type: "text", text: "Security will be tight." },
            { type: "text", text: "I have an idea." },
            { type: "text", text: "Vanessa Bloome, FTD." },
            { type: "text", text: "Official floral business. It's real." },
            { type: "text", text: "Sorry, ma'am. Nice brooch." },
            { type: "text", text: "Thank you. It was a gift." },
            { type: "text", text: "Once inside," },
            { type: "text", text: "we just pick the right float." },
            { type: "text", text: "How about The Princess and the Pea?" },
            { type: "text", text: "I could be the princess," },
            { type: "text", text: "and you could be the pea!" },
            { type: "text", text: "Yes, I got it." },
            { type: "text", text: "Where should I sit?" },
            { type: "text", text: "What are you?" },
            { type: "text", text: "I believe I'm the pea." },
            { type: "text", text: "The pea?" },
            { type: "text", text: "It goes under the mattresses." },
            { type: "text", text: "Not in this fairy tale, sweetheart." },
            { type: "text", text: "I'm getting the marshal." },
            { type: "text", text: "You do that!" },
            { type: "text", text: "This whole parade is a fiasco!" },
            { type: "text", text: "Let's see what this baby'll do." },
            { type: "text", text: "Hey, what are you doing?!" },
            { type: "text", text: "Then all we do" },
            { type: "text", text: "is blend in with traffic..." },
            { type: "text", text: "...without arousing suspicion." },
            { type: "text", text: "Once at the airport," },
            { type: "text", text: "there's no stopping us." },
            { type: "text", text: "Stop! Security." },
            { type: "text", text: "You and your insect pack your float?" },
            { type: "text", text: "Yes." },
            { type: "text", text: "Has it been" },
            { type: "text", text: "in your possession the entire time?" },
            { type: "text", text: "Would you remove your shoes?" },
            { type: "text", text: "Remove your stinger." },
            { type: "text", text: "It's part of me." },
            { type: "text", text: "I know. Just having some fun." },
            { type: "text", text: "Enjoy your flight." },
            { type: "text", text: "Then if we're lucky, we'll have" },
            { type: "text", text: "just enough pollen to do the job." },
            { type: "text", text: "Can you believe how lucky we are? We" },
            { type: "text", text: "have just enough pollen to do the job!" },
            { type: "text", text: "I think this is gonna work." },
            { type: "text", text: "It's got to work." },
            { type: "text", text: "Attention, passengers," },
            { type: "text", text: "this is Captain Scott." },
            { type: "text", text: "We have a bit of bad weather" },
            { type: "text", text: "in New York." },
            { type: "text", text: "It looks like we'll experience" },
            { type: "text", text: "a couple hours delay." },
            { type: "text", text: "Barry, these are cut flowers" },
            { type: "text", text: "with no water. They'll never make it." },
            { type: "text", text: "I gotta get up there" },
            { type: "text", text: "and talk to them." },
            { type: "text", text: "Be careful." },
            { type: "text", text: "Can I get help" },
            { type: "text", text: "with the Sky Mall magazine?" },
            { type: "text", text: "I'd like to order the talking" },
            { type: "text", text: "inflatable nose and ear hair trimmer." },
            { type: "text", text: "Captain, I'm in a real situation." },
            { type: "text", text: "What'd you say, Hal?" },
            { type: "text", text: "Nothing." },
            { type: "text", text: "Bee!" },
            { type: "text", text: "Don't freak out! My entire species..." },
            { type: "text", text: "What are you doing?" },
            { type: "text", text: "Wait a minute! I'm an attorney!" },
            { type: "text", text: "Who's an attorney?" },
            { type: "text", text: "Don't move." },
            { type: "text", text: "Oh, Barry." },
            { type: "text", text: "Good afternoon, passengers." },
            { type: "text", text: "This is your captain." },
            { type: "text", text: "Would a Miss Vanessa Bloome in 24B" },
            { type: "text", text: "please report to the cockpit?" },
            { type: "text", text: "And please hurry!" },
            { type: "text", text: "What happened here?" },
            { type: "text", text: "There was a DustBuster," },
            { type: "text", text: "a toupee, a life raft exploded." },
            { type: "text", text: "One's bald, one's in a boat," },
            { type: "text", text: "they're both unconscious!" },
            { type: "text", text: "Is that another bee joke?" },
            { type: "text", text: "No!" },
            { type: "text", text: "No one's flying the plane!" },
            { type: "text", text: "This is JFK control tower, Flight 356." },
            { type: "text", text: "What's your status?" },
            { type: "text", text: "This is Vanessa Bloome." },
            { type: "text", text: "I'm a florist from New York." },
            { type: "text", text: "Where's the pilot?" },
            { type: "text", text: "He's unconscious," },
            { type: "text", text: "and so is the copilot." },
            { type: "text", text: "Not good. Does anyone onboard" },
            { type: "text", text: "have flight experience?" },
            { type: "text", text: "As a matter of fact, there is." },
            { type: "text", text: "Who's that?" },
            { type: "text", text: "Barry Benson." },
            { type: "text", text: "From the honey trial?! Oh, great." },
            { type: "text", text: "Vanessa, this is nothing more" },
            { type: "text", text: "than a big metal bee." },
            { type: "text", text: "It's got giant wings, huge engines." },
            { type: "text", text: "I can't fly a plane." },
            { type: "text", text: "Why not? Isn't John Travolta a pilot?" },
            { type: "text", text: "Yes." },
            { type: "text", text: "How hard could it be?" },
            { type: "text", text: "Wait, Barry!" },
            { type: "text", text: "We're headed into some lightning." },
            { type: "text", text: "This is Bob Bumble. We have some" },
            { type: "text", text: "late-breaking news from JFK Airport," },
            { type: "text", text: "where a suspenseful scene" },
            { type: "text", text: "is developing." },
            { type: "text", text: "Barry Benson," },
            { type: "text", text: "fresh from his legal victory..." },
            { type: "text", text: "That's Barry!" },
            { type: "text", text: "...is attempting to land a plane," },
            { type: "text", text: "loaded with people, flowers" },
            { type: "text", text: "and an incapacitated flight crew." },
            { type: "text", text: "Flowers?!" },
            { type: "text", text: "We have a storm in the area" },
            { type: "text", text: "and two individuals at the controls" },
            { type: "text", text: "with absolutely no flight experience." },
            { type: "text", text: "Just a minute." },
            { type: "text", text: "There's a bee on that plane." },
            { type: "text", text: "I'm quite familiar with Mr. Benson" },
            { type: "text", text: "and his no-account compadres." },
            { type: "text", text: "They've done enough damage." },
            { type: "text", text: "But isn't he your only hope?" },
            { type: "text", text: "Technically, a bee" },
            { type: "text", text: "shouldn't be able to fly at all." },
            { type: "text", text: "Their wings are too small..." },
            { type: "text", text: "Haven't we heard this a million times?" },
            { type: "text", text: "The surface area of the wings" },
            { type: "text", text: "and body mass make no sense." },
            { type: "text", text: "Get this on the air!" },
            { type: "text", text: "Got it." },
            { type: "text", text: "Stand by." },
            { type: "text", text: "We're going live." },
            { type: "text", text: "The way we work may be a mystery to you." },
            { type: "text", text: "Making honey takes a lot of bees" },
            { type: "text", text: "doing a lot of small jobs." },
            { type: "text", text: "But let me tell you about a small job." },
            { type: "text", text: "If you do it well," },
            { type: "text", text: "it makes a big difference." },
            { type: "text", text: "More than we realized." },
            { type: "text", text: "To us, to everyone." },
            { type: "text", text: "That's why I want to get bees" },
            { type: "text", text: "back to working together." },
            { type: "text", text: "That's the bee way!" },
            { type: "text", text: "We're not made of Jell-O." },
            { type: "text", text: "We get behind a fellow." },
            { type: "text", text: "Black and yellow!" },
            { type: "text", text: "Hello!" },
            { type: "text", text: "Left, right, down, hover." },
            { type: "text", text: "Hover?" },
            { type: "text", text: "Forget hover." },
            { type: "text", text: "This isn't so hard." },
            { type: "text", text: "Beep-beep! Beep-beep!" },
            { type: "text", text: "Barry, what happened?!" },
            { type: "text", text: "Wait, I think we were" },
            { type: "text", text: "on autopilot the whole time." },
            { type: "text", text: "That may have been helping me." },
            { type: "text", text: "And now we're not!" },
            { type: "text", text: "So it turns out I cannot fly a plane." },
            { type: "text", text: "All of you, let's get" },
            { type: "text", text: "behind this fellow! Move it out!" },
            { type: "text", text: "Move out!" },
            { type: "text", text: "Our only chance is if I do what I'd do," },
            { type: "text", text: "you copy me with the wings of the plane!" },
            { type: "text", text: "Don't have to yell." },
            { type: "text", text: "I'm not yelling!" },
            { type: "text", text: "We're in a lot of trouble." },
            { type: "text", text: "It's very hard to concentrate" },
            { type: "text", text: "with that panicky tone in your voice!" },
            { type: "text", text: "It's not a tone. I'm panicking!" },
            { type: "text", text: "I can't do this!" },
            { type: "text", text: "Vanessa, pull yourself together." },
            { type: "text", text: "You have to snap out of it!" },
            { type: "text", text: "You snap out of it." },
            { type: "text", text: "You snap out of it." },
            { type: "text", text: "You snap out of it!" },
            { type: "text", text: "You snap out of it!" },
            { type: "text", text: "You snap out of it!" },
            { type: "text", text: "You snap out of it!" },
            { type: "text", text: "You snap out of it!" },
            { type: "text", text: "You snap out of it!" },
            { type: "text", text: "Hold it!" },
            { type: "text", text: "Why? Come on, it's my turn." },
            { type: "text", text: "How is the plane flying?" },
            { type: "text", text: "I don't know." },
            { type: "text", text: "Hello?" },
            { type: "text", text: "Benson, got any flowers" },
            { type: "text", text: "for a happy occasion in there?" },
            { type: "text", text: "The Pollen Jocks!" },
            { type: "text", text: "They do get behind a fellow." },
            { type: "text", text: "Black and yellow." },
            { type: "text", text: "Hello." },
            { type: "text", text: "All right, let's drop this tin can" },
            { type: "text", text: "on the blacktop." },
            { type: "text", text: "Where? I can't see anything. Can you?" },
            { type: "text", text: "No, nothing. It's all cloudy." },
            { type: "text", text: "Come on. You got to think bee, Barry." },
            { type: "text", text: "Thinking bee." },
            { type: "text", text: "Thinking bee." },
            { type: "text", text: "Thinking bee!" },
            { type: "text", text: "Thinking bee! Thinking bee!" },
            { type: "text", text: "Wait a minute." },
            { type: "text", text: "I think I'm feeling something." },
            { type: "text", text: "What?" },
            { type: "text", text: "I don't know. It's strong, pulling me." },
            { type: "text", text: "Like a 27-million-year-old instinct." },
            { type: "text", text: "Bring the nose down." },
            { type: "text", text: "Thinking bee!" },
            { type: "text", text: "Thinking bee! Thinking bee!" },
            { type: "text", text: "What in the world is on the tarmac?" },
            { type: "text", text: "Get some lights on that!" },
            { type: "text", text: "Thinking bee!" },
            { type: "text", text: "Thinking bee! Thinking bee!" },
            { type: "text", text: "Vanessa, aim for the flower." },
            { type: "text", text: "OK." },
            { type: "text", text: "Cut the engines. We're going in" },
            { type: "text", text: "on bee power. Ready, boys?" },
            { type: "text", text: "Affirmative!" },
            { type: "text", text: "Good. Good. Easy, now. That's it." },
            { type: "text", text: "Land on that flower!" },
            { type: "text", text: "Ready? Full reverse!" },
            { type: "text", text: "Spin it around!" },
            { type: "text", text: "Not that flower! The other one!" },
            { type: "text", text: "Which one?" },
            { type: "text", text: "That flower." },
            { type: "text", text: "I'm aiming at the flower!" },
            { type: "text", text: "That's a fat guy in a flowered shirt." },
            { type: "text", text: "I mean the giant pulsating flower" },
            { type: "text", text: "made of millions of bees!" },
            { type: "text", text: "Pull forward. Nose down. Tail up." },
            { type: "text", text: "Rotate around it." },
            { type: "text", text: "This is insane, Barry!" },
            { type: "text", text: "This's the only way I know how to fly." },
            { type: "text", text: "Am I koo-koo-kachoo, or is this plane" },
            { type: "text", text: "flying in an insect-like pattern?" },
            { type: "text", text: "Get your nose in there. Don't be afraid." },
            { type: "text", text: "Smell it. Full reverse!" },
            { type: "text", text: "Just drop it. Be a part of it." },
            { type: "text", text: "Aim for the center!" },
            { type: "text", text: "Now drop it in! Drop it in, woman!" },
            { type: "text", text: "Come on, already." },
            { type: "text", text: "Barry, we did it!" },
            { type: "text", text: "You taught me how to fly!" },
            { type: "text", text: "Yes. No high-five!" },
            { type: "text", text: "Right." },
            { type: "text", text: "Barry, it worked!" },
            { type: "text", text: "Did you see the giant flower?" },
            { type: "text", text: "What giant flower? Where? Of course" },
            { type: "text", text: "I saw the flower! That was genius!" },
            { type: "text", text: "Thank you." },
            { type: "text", text: "But we're not done yet." },
            { type: "text", text: "Listen, everyone!" },
            { type: "text", text: "This runway is covered" },
            { type: "text", text: "with the last pollen" },
            { type: "text", text: "from the last flowers" },
            { type: "text", text: "available anywhere on Earth." },
            { type: "text", text: "That means this is our last chance." },
            { type: "text", text: "We're the only ones who make honey," },
            { type: "text", text: "pollinate flowers and dress like this." },
            { type: "text", text: "If we're gonna survive as a species," },
            { type: "text", text: "this is our moment! What do you say?" },
            { type: "text", text: "Are we going to be bees, orjust" },
            { type: "text", text: "Museum of Natural History keychains?" },
            { type: "text", text: "We're bees!" },
            { type: "text", text: "Keychain!" },
            { type: "text", text: "Then follow me! Except Keychain." },
            { type: "text", text: "Hold on, Barry. Here." },
            { type: "text", text: "You've earned this." },
            { type: "text", text: "Yeah!" },
            { type: "text", text: "I'm a Pollen Jock! And it's a perfect" },
            { type: "text", text: "fit. All I gotta do are the sleeves." },
            { type: "text", text: "Oh, yeah." },
            { type: "text", text: "That's our Barry." },
            { type: "text", text: "Mom! The bees are back!" },
            { type: "text", text: "If anybody needs" },
            { type: "text", text: "to make a call, now's the time." },
            { type: "text", text: "I got a feeling we'll be" },
            { type: "text", text: "working late tonight!" },
            { type: "text", text: "Here's your change. Have a great" },
            { type: "text", text: "afternoon! Can I help who's next?" },
            { type: "text", text: "Would you like some honey with that?" },
            { type: "text", text: "It is bee-approved. Don't forget these." },
            { type: "text", text: "Milk, cream, cheese, it's all me." },
            { type: "text", text: "And I don't see a nickel!" },
            { type: "text", text: "Sometimes I just feel" },
            { type: "text", text: "like a piece of meat!" },
            { type: "text", text: "I had no idea." },
            { type: "text", text: "Barry, I'm sorry." },
            { type: "text", text: "Have you got a moment?" },
            { type: "text", text: "Would you excuse me?" },
            { type: "text", text: "My mosquito associate will help you." },
            { type: "text", text: "Sorry I'm late." },
            { type: "text", text: "He's a lawyer too?" },
            { type: "text", text: "I was already a blood-sucking parasite." },
            { type: "text", text: "All I needed was a briefcase." },
            { type: "text", text: "Have a great afternoon!" },
            { type: "text", text: "Barry, I just got this huge tulip order," },
            { type: "text", text: "and I can't get them anywhere." },
            { type: "text", text: "No problem, Vannie." },
            { type: "text", text: "Just leave it to me." },
            { type: "text", text: "You're a lifesaver, Barry." },
            { type: "text", text: "Can I help who's next?" },
            { type: "text", text: "All right, scramble, jocks!" },
            { type: "text", text: "It's time to fly." },
            { type: "text", text: "Thank you, Barry!" },
            { type: "text", text: "That bee is living my life!" },
            { type: "text", text: "Let it go, Kenny." },
            { type: "text", text: "When will this nightmare end?!" },
            { type: "text", text: "Let it all go." },
            { type: "text", text: "Beautiful day to fly." },
            { type: "text", text: "Sure is." },
            { type: "text", text: "Between you and me," },
            { type: "text", text: "I was dying to get out of that office." },
            { type: "text", text: "You have got" },
            { type: "text", text: "to start thinking bee, my friend." },
            { type: "text", text: "Thinking bee!" },
            { type: "text", text: "Me?" },
            { type: "text", text: "Hold it. Let's just stop" },
            { type: "text", text: "for a second. Hold it." },
            { type: "text", text: "I'm sorry. I'm sorry, everyone." },
            { type: "text", text: "Can we stop here?" },
            { type: "text", text: "I'm not making a major life decision" },
            { type: "text", text: "during a production number!" },
            { type: "text", text: "All right. Take ten, everybody." },
            { type: "text", text: "Wrap it up, guys." },
            { type: "text", text: "I had virtually no rehearsal for that." },
            { type: "text", text: "You are in a coma. This is our only way to communicate. Please wake up." },
        ]),
        /*$(document).ready(function () {
            window.BonziHandler = new (function () {
                return (
                    (this.framerate = 1 / 15),
                    (this.spriteSheets = {}),
                    (this.prepSprites = function () {
                        for (var spriteColors = ["black", "blue", "brown", "green", "purple", "red", "yellow", "white", "grey", "dark_purple", "god", "cyan", "pink", "clippy", "peedy", "merlin", "f1", "pope"], i = 0; i < spriteColors.length; i++) {
                            var color = spriteColors[i],
                                spriteData = { images: ["/img/bonzi/" + color + ".png"], frames: BonziData.sprite.frames, animations: BonziData.sprite.animations };
                            this.spriteSheets[color] = new createjs.SpriteSheet(spriteData);
                        } */
        $(document).ready(function () {
            window.BonziHandler = new (function () {
                return (
                    (this.framerate = 1 / 15),
                    (this.spriteSheets = {}),
                    (this.prepSprites = function () {
                        for (var spriteColors = ["black", "blue", "brown", "green", "purple", "red", "orange", "yellow", "white", "ghost", "grey", "dark_purple","dark_red", "lime", "magenta", "lemon", "god", "cyan", "pink",/* "clippy", "peedy", "merlin", "f1", */ "pope"], i = 0; i < spriteColors.length; i++) {
                            var color = spriteColors[i],
                        spriteData = { images: ["./img/bonzi/" + color + ".png"], frames: BonziData.sprite.frames, animations: BonziData.sprite.animations 
                        }; 
                        this.spriteSheets[color] = new createjs.SpriteSheet(spriteData);
                        }
                    }),

                    this.prepSprites(),
                    (this.$canvas = $("#bonzi_canvas")),
                    (this.stage = new createjs.StageGL(this.$canvas[0], { transparent: !0 })),
                    (this.stage.tickOnUpdate = !1),
                    (this.resizeCanvas = function () {
                        var width = this.$canvas.width(),
                            height = this.$canvas.height();
                        this.$canvas.attr({ width: this.$canvas.width(), height: this.$canvas.height() }), this.stage.updateViewport(width, height), (this.needsUpdate = !0);
                        for (var i = 0; i < usersAmt; i++) {
                            var key = usersKeys[i];
                            bonzis[key].move();
                        }
                    }),
                    this.resizeCanvas(),
                    (this.resize = function () {
                        setTimeout(this.resizeCanvas.bind(this), 1);
                    }),
                    (this.needsUpdate = !0),
                    (this.intervalHelper = setInterval(
                        function () {
                            this.needsUpdate = !0;
                        }.bind(this),
                        1e3
                    )),
                    (this.intervalTick = setInterval(
                        function () {
                            for (var i = 0; i < usersAmt; i++) {
                                var key = usersKeys[i];
                                bonzis[key].update();
                            }
                            this.stage.tick();
                        }.bind(this),
                        1e3 * this.framerate
                    )),
                    (this.intervalMain = setInterval(
                        function () {
                            this.needsUpdate && (this.stage.update(), (this.needsUpdate = !1));
                        }.bind(this),
                        1e3 / 60
                    )),
                    $(window).resize(this.resize.bind(this)),
                    (this.bonzisCheck = function () {
                        for (var i = 0; i < usersAmt; i++) {
                            var key = usersKeys[i];
                            if (key in bonzis) {
                                var b = bonzis[key];
                                (b.userPublic = usersPublic[key]), b.updateName(), b.updateStatus(b.userPublic.status);
                                var newColor = usersPublic[key].color;
                                b.color != newColor && ((b.color = newColor), b.updateSprite());
                            } else bonzis[key] = new Bonzi(key, usersPublic[key]);
                        }
                    }),
                    $("#btn_tile").click(function () {
                        for (var winWidth = $(window).width(), winHeight = $(window).height(), minY = 0, addY = 80, x = 0, y = 0, i = 0; i < usersAmt; i++) {
                            var key = usersKeys[i];
                            bonzis[key].move(x, y), (x += 200) + 100 > winWidth && ((x = 0), (y += 160) + 160 > winHeight && ((minY += addY), (addY /= 2), (y = minY)));
                        }
                    }),
                    this
                );
            })();
        }),
        Array.prototype.equals,
        (Array.prototype.equals = function (array) {
            if (!array) return !1;
            if (this.length != array.length) return !1;
            for (var i = 0, l = this.length; i < l; i++)
                if (this[i] instanceof Array && array[i] instanceof Array) {
                    if (!this[i].equals(array[i])) return !1;
                } else if (this[i] != array[i]) return !1;
            return !0;
        }),
        Object.defineProperty(Array.prototype, "equals", { enumerable: !1 });
    var undefined,
        loadQueue = new createjs.LoadQueue(),
        loadDone = [],
        loadNeeded = ["bonziBlack", "bonziBlue", "bonziBrown", "bonziGreen", "bonziPurple", "bonziRed", "bonziOrange", "bonziYellow", "bonziWhite", "bonziGrey", "bonziGhost", "bonziDark_Purple", "bonziDark_Red", "bonziLime", "bonziMagenta", "bonziLemon", "bonziGod", "bonziCyan", "bonziPink",/* "Clippy", "Peedy", "Merlin", "F1", */ "topjej"];
    function loadBonzis(callback) {
        loadQueue.loadManifest([
            { id: "bonziBlack", src: "/img/bonzi/black.png" },
            { id: "bonziBlue", src: "/img/bonzi/blue.png" },
            { id: "bonziBrown", src: "/img/bonzi/brown.png" },
            { id: "bonziGreen", src: "/img/bonzi/green.png" },
            { id: "bonziPurple", src: "/img/bonzi/purple.png" },
            { id: "bonziRed", src: "/img/bonzi/red.png" },
            { id: "bonziOrange", src: "/img/bonzi/orange.png" },
            { id: "bonziYellow", src: "/img/bonzi/yellow.png" },
            { id: "bonziWhite", src: "/img/bonzi/white.png" },
            { id: "bonziGrey", src: "/img/bonzi/grey.png" },
            { id: "bonziGhost", src: "/img/bonzi/ghost.png" },
            { id: "bonziDark_Purple", src: "/img/bonzi/dark_purple.png" },
            { id: "bonziDark_Red", src: "/img/bonzi/dark_red.png" },
            { id: "bonziLime", src: "/img/bonzi/lime.png" },
            { id: "bonziMagenta", src: "/img/bonzi/magenta.png" },
            { id: "bonziLemon", src: "/img/bonzi/lemon.png" },
            { id: "bonziGod", src: "/img/bonzi/god.png" },
            { id: "bonziCyan", src: "/img/bonzi/cyan.png" },
            { id: "bonziPink", src: "/img/bonzi/pink.png" },
           // { id: "Clippy", src: "/img/bonzi/clippy.png" },
           // { id: "Peedy", src: "/img/bonzi/peedy.png" },
           // { id: "Merlin", src: "/img/bonzi/merlin.png" },
          //  { id: "F1", src: "/img/bonzi/f1.png" },
            { id: "topjej", src: "/img/misc/topjej.png" },
        ]),
            loadQueue.on(
                "fileload",
                function (e) {
                    loadDone.push(e.item.id);
                },
                this
            ),
            callback && loadQueue.on("complete", callback, this);
    }
    $(window).on("load", function () {
        $("#login_card").show(), $("#login_load").hide(), $('.bonzi_status').hide(), loadBonzis();
    }),
        (window.adsShown = !1);
    var hostname = window.location.protocol + "//" + window.location.hostname;
    window.location.host.indexOf(":") > 8 && (hostname += ":" + window.location.port);
    var socket = io(hostname, { query: { channel: "bonziuniverse-classic", lang: (window.navigator && window.navigator.language && window.navigator.language.slice(0, 2)) || "en", z: window.zedd, s: window.esss } }),
        usersPublic = {},
        bonzis = {},
        debug = !0;
    function loadTest() {
        $("#login_card").hide(),
            $("#login_error").hide(),
            $("#login_load").show(),
            (window.loadTestInterval = rInterval(function () {
                try {
                    if (!loadDone.equals(loadNeeded)) throw "Not done loading.";
                    login(), loadTestInterval.clear();
                } catch (e) {}
            }, 100));
    }
    function login() {
          var sfx = new Audio("../../sfx/logon.wav");
        sfx.play();
        socket.emit("login", { name: $("#login_name").val(), room: $("#login_room").val() }), setup();
    }
    function errorFatal() {
        var sfx = new Audio("../../sfx/error.mp3");
        sfx.play();
        ("none" != $("#page_ban").css("display") && "none" != $("#page_kick").css("display")) || $("#page_error").show();
    }
    function showAds() {
        window.adsShown = !0;
    }
    function setup() {
        window.adsShown || ((window.adsShown = !0), showAds()),
            $("#chat_send").click(sendInput),
            $("#chat_message").keypress(function (e) {
                13 == e.which && sendInput();
            }),
            socket.on("room", function (data) {
            var sfx = new Audio("../../sfx/startup.mp3");
            sfx.play();
                $("#room_owner")[data.isOwner ? "show" : "hide"](), $("#room_public")[data.isPublic ? "show" : "hide"](), $("#room_private")[data.isPublic ? "hide" : "show"](), $(".room_id").text(data.room);
            }),
            socket.on("updateAll", function (data) {
                $("#page_login").hide(), (usersPublic = data.usersPublic), usersUpdate(), BonziHandler.bonzisCheck();
            }),
            socket.on("update", function (data) {
                (window.usersPublic[data.guid] = data.userPublic), usersUpdate(), BonziHandler.bonzisCheck();
            }),
            socket.on("talk", function (data) {
                var b = bonzis[data.guid];
                b.last = data.text
                b.cancel(), b.runSingleEvent([{ type: "text", text: data.text }]);
            }),
            socket.on("joke", function (data) {
                var b = bonzis[data.guid];
                (b.rng = new Math.seedrandom(data.rng)), b.cancel(), b.joke();
            }),
            socket.on("youtube", function (data) {
                var b = bonzis[data.guid];
                b.cancel(), b.youtube(data.vid);
            }),
socket.on("alert", function(a) {
        bonziAlert(a)
    }),
            socket.on("fact", function (data) {
                var b = bonzis[data.guid];
                (b.rng = new Math.seedrandom(data.rng)), b.cancel(), b.fact();
            }),
            socket.on("think", function (a) {
            var b = bonzis[a.guid];
            b.think();
        }),
        socket.on("sad", function (a) {
            var b = bonzis[a.guid];
            b.sad();
        }),
            socket.on("backflip", function (data) {
                var b = bonzis[data.guid];
                b.cancel(), b.backflip(data.swag);
            }),
        socket.on("clap", function (a) {
            var b = bonzis[a.guid];
            b.clap();
            setTimeout(function () {
                    var sfx = new Audio("../../sfx/clap.mp3");
                    sfx.play();
            }, 600);
        }),
        socket.on("swag", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.swag();
        }),
        socket.on("praise", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.praise();
        }),
        socket.on("shrug", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.shrug();
        }),
        socket.on("earth", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.earth();
        }),
        socket.on("grin", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.grin();
        }),          
            socket.on("asshole", function (data) {
                var b = bonzis[data.guid];
                b.cancel(), b.asshole(data.target);
            }),
            socket.on("owo", function (data) {
                var b = bonzis[data.guid];
                b.cancel(), b.owo(data.target);
            }),
          socket.on("uwu", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.uwu(a.target);
        }),
            socket.on("triggered", function (data) {
                var b = bonzis[data.guid];
                b.cancel(), b.runSingleEvent(b.data.event_list_triggered);
            }),
            socket.on("linux", function (data) {
                var b = bonzis[data.guid];
                b.cancel(), b.runSingleEvent(b.data.event_list_linux);
            }),
            socket.on("pawn", function (data) {
                var b = bonzis[data.guid];
                b.cancel(), b.runSingleEvent(b.data.event_list_pawn);
            }),
            socket.on("bees", function (data) {
                var b = bonzis[data.guid];
                b.cancel(), b.runSingleEvent(b.data.event_list_bees);
            }),
        socket.on("image", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.image(a.vid);
        }),
        socket.on("video", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.video(a.vid);
        }),
        socket.on("audio", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.audio(a.vid);
        }),
            socket.on("vaporwave", function (data) {
                $("body").addClass("vaporwave");
            }),
            socket.on("unvaporwave", function (data) {
                $("body").removeClass("vaporwave");
            }),
            socket.on("leave", function (data) {
                var b = bonzis[data.guid];
                void 0 !== b &&
                    b.exit(
                        function (data) {
                            this.deconstruct(), delete bonzis[data.guid], delete usersPublic[data.guid], usersUpdate();
                        }.bind(b, data)
                    );
            }),
            socket.on("reconnect", function () {
                window.banned || window.kicked || $("#page_error").hide(), usersUpdate(), BonziHandler.bonzisCheck();
            });
    }
    socket.on("user", function (data) {
        window.user = data;
    }),
        $(function () {
            $("body").on("click", "#page_sidebar_close", function () {
                $("#page_sidebar").slideUp("slow", function () {
                    $("#page_sidebar").empty();
                });
            }),
                $("#login_go").click(loadTest),
                $("#login_room").val(window.location.hash.slice(1)),
                $("#login_name, #login_room").keypress(function (e) {
                    13 == e.which && login();
                }),
                socket.on("ban", function (data) {
                    (window.banned = !0), (window.banData = data), (soundfx = new Audio("../../sfx/ban.wav")), soundfx.play(), $("#page_ban").show(), $("#ban_reason").html(data.reason), $("#ban_end").html(new Date(data.end).toString());
                }),
                socket.on("kick", function (data) {
                    (window.kicked = !0), (window.kickData = data), (soundfx = new Audio("../../sfx/kick.wav")), soundfx.play(), $("#page_kick").show(), $("#kick_reason").html(data.reason);
                }),
                socket.on("loginFail", function (data) {
                    $("#login_card").show(),
                        $("#login_load").hide(),
                        $("#login_error")
                            .show()
                            .text("Error: " + { nameLength: "Name too long.", full: "Room is full.", nameMal: "Nice try. Why would anyone join a room named that anyway?" }[data.reason] + " (" + data.reason + ")");
                }),
                socket.on("disconnect", function (data) {
                    errorFatal();
                });
        });
    var usersAmt = 0,
        usersKeys = [];
    function usersUpdate() {
        (usersKeys = Object.keys(usersPublic)), (usersAmt = usersKeys.length);
    }
          (function (factory) {
            "function" == typeof define && define.amd ? define(["jquery"], factory) : "object" == typeof exports ? factory(require("jquery")) : factory(jQuery);
        })(function ($) {
            var $window = $(window),
                $document = $(document);
            function Completer(element, options) {
                (this.$element = $(element)), (this.options = $.extend({}, Completer.DEFAULTS, $.isPlainObject(options) && options)), (this.onEnter = options.onEnter || function () {}), this.init();
            }
            function espace(s) {
                return s.replace(/([\.\$\^\{\[\(\|\)\*\+\?\\])/g, "\\$1");
            }
            (Completer.prototype = {
                constructor: Completer,
                init: function () {
                    var s,
                        options = this.options,
                        data = options.source;
                    (this.onEnter = this.onEnter || options.onEnter || function () {}),
                        data.length > 0 &&
                            ((this.data = data),
                            (this.regexp = "string" == typeof (s = options.separator) && "" !== s ? ((s = espace(s)), new RegExp(s + "+[^" + s + "]*$", "i")) : null),
                            (this.$completer = $(options.template)),
                            this.$completer.hide().appendTo("body"),
                            this.place(),
                            this.$element.attr("autocomplete", "off").on({ focus: $.proxy(this.enable, this), blur: $.proxy(this.disable, this) }),
                            this.$element.is(":focus") && this.enable());
                },
                enable: function () {
                    this.active ||
                        ((this.active = !0),
                        this.$element.on({ keydown: $.proxy(this.keydown, this), keyup: $.proxy(this.keyup, this) }),
                        this.$completer.on({ mousedown: $.proxy(this.mousedown, this), mouseover: $.proxy(this.mouseover, this) }));
                },
                disable: function () {
                    this.active && ((this.active = !1), this.$element.off({ keydown: this.keydown, keyup: this.keyup }), this.$completer.off({ mousedown: this.mousedown, mouseover: this.mouseover }));
                },
                attach: function (val) {
                    var reg,
                        item,
                        options = this.options,
                        separator = options.separator,
                        regexp = this.regexp,
                        part = regexp ? val.match(regexp) : null,
                        matched = [],
                        all = [],
                        that = this;
                    part && ((part = part[0]), (val = val.replace(regexp, "")), (reg = new RegExp("^" + espace(part), "i"))),
                        $.each(this.data, function (i, n) {
                            console.dir(n), (n = separator + n.prefix), (item = that.template(val + n)), reg && reg.test(n) ? matched.push(item) : all.push(item);
                        }),
                        (matched = matched.length ? matched.sort() : all),
                        "top" === options.position && (matched = matched.reverse()),
                        this.fill(matched.join(""));
                },
                suggest: function (val) {
                    var reg = new RegExp(espace(val), "i"),
                        that = this,
                        matched = [];
                    $.each(this.data, function (i, n) {
                        reg.test(n.prefix) && matched.push(n);
                    }),
                        matched.sort(function (a, b) {
                            return a.prefix.indexOf(val) - b.prefix.indexOf(val);
                        }),
                        $.each(matched, function (i, n) {
                            matched[i] = that.template(`<span class="command">${n.command}</span><span class="sep"> - </span><span class="description">${n.description || "No description"}</span>`, n.prefix || null);
                        }),
                        this.fill(matched.join(""));
                },
                template: function (text, prefix) {
                    var tag = this.options.itemTag,
                        xtra = "";
                    return prefix && (xtra = ` prefix="${prefix}"`), "<" + tag + xtra + ">" + text + "</" + tag + ">";
                },
                fill: function (html) {
                    var filter;
                    this.$completer.empty(),
                        html ? ((filter = "top" === this.options.position ? ":last" : ":first"), this.$completer.html(html), this.$completer.children(filter).addClass(this.options.selectedClass), this.show()) : this.hide();
                },
                complete: function () {
                    var options = this.options,
                        val = options.filter(this.$element.val()).toString();
                    "" !== val ? (options.suggest ? this.suggest(val) : this.attach(val)) : this.hide();
                },
                keydown: function (e) {
                    13 === (e.keyCode || e.which || e.charCode) && (e.stopPropagation(), e.preventDefault(), "function" == typeof this.onEnter && this.onEnter());
                },
                keyup: function (e) {
                    var keyCode = e.keyCode || e.which || e.charCode;
                    13 === keyCode || 38 === keyCode || 40 === keyCode ? this.toggle(keyCode) : this.complete();
                },
                mouseover: function (e) {
                    var options = this.options,
                        selectedClass = options.selectedClass,
                        $target = $(e.target);
                    $target.is(options.itemTag) && $target.addClass(selectedClass).siblings().removeClass(selectedClass);
                },
                mousedown: function (e) {
                    e.stopPropagation(), e.preventDefault();
                    var et = $(e.target),
                        val = et.attr("prefix");
                    (val && 0 !== val.length) || (val = et.parent().attr("prefix")), this.setValue(val || et.text());
                },
                setValue: function (val) {
                    this.$element.val(val), this.options.complete(), this.hide();
                },
                toggle: function (keyCode) {
                    var selectedClass = this.options.selectedClass,
                        $selected = this.$completer.find("." + selectedClass);
                    switch (keyCode) {
                        case 40:
                            $selected.removeClass(selectedClass), ($selected = $selected.next());
                            break;
                        case 38:
                            $selected.removeClass(selectedClass), ($selected = $selected.prev());
                            break;
                        case 13:
                            var val = $selected.attr("prefix");
                            (val && 0 !== val.length) || (val = $selected.parent().attr("prefix")), this.setValue(val || $selected.text());
                    }
                    0 === $selected.length && ($selected = this.$completer.children(40 === keyCode ? ":first" : ":last")), $selected.addClass(selectedClass);
                },
                place: function () {
                    var $element = this.$element,
                        offset = $element.offset(),
                        left = offset.left,
                        top = offset.top,
                        height = $element.outerHeight(),
                        width = $element.outerWidth(),
                        styles = { minWidth: width, zIndex: this.options.zIndex };
                    switch (this.options.position) {
                        case "right":
                            (styles.left = left + width), (styles.top = top);
                            break;
                        case "left":
                            (styles.right = $window.innerWidth() - left), (styles.top = top);
                            break;
                        case "top":
                            (styles.left = left), (styles.bottom = $window.innerHeight() - top);
                            break;
                        default:
                            (styles.left = left), (styles.top = top + height);
                    }
                    this.$completer.css(styles);
                },
                show: function () {
                    this.$completer.show(), $window.on("resize", $.proxy(this.place, this)), $document.on("mousedown", $.proxy(this.hide, this));
                },
                hide: function () {
                    this.$completer.hide(), $window.off("resize", this.place), $document.off("mousedown", this.hide);
                },
                destroy: function () {
                    var $this = this.$element;
                    this.hide(), this.disable(), $this.off({ focus: this.enable, blur: this.disable }), $this.removeData("completer");
                },
            }),
                (Completer.DEFAULTS = {
                    itemTag: "li",
                    position: "bottom",
                    source: [],
                    selectedClass: "completer-selected",
                    separator: "",
                    suggest: !1,
                    template: '<ul class="completer-container"></ul>',
                    zIndex: 1,
                    complete: $.noop,
                    filter: function (val) {
                        return val;
                    },
                }),
                (Completer.setDefaults = function (options) {
                    $.extend(Completer.DEFAULTS, options);
                }),
                (Completer.other = $.fn.completer),
                ($.fn.completer = function (option) {
                    var result,
                        args = [].slice.call(arguments, 1);
                    return (
                        this.each(function () {
                            var options,
                                fn,
                                $this = $(this),
                                data = $this.data("completer");
                            if (!data) {
                                if (/destroy/.test(option)) return;
                                (options = $.extend({}, $this.data(), $.isPlainObject(option) && option)), $this.data("completer", (data = new Completer(this, options)));
                            }
                            "string" == typeof option && $.isFunction((fn = data[option])) && (result = fn.apply(data, args));
                        }),
                        void 0 !== result ? result : this
                    );
                }),
                ($.fn.completer.Constructor = Completer),
                ($.fn.completer.setDefaults = Completer.setDefaults),
                ($.fn.completer.noConflict = function () {
                    return ($.fn.completer = Completer.other), this;
                }),
                $(function () {
                    $('[data-toggle="completer"]').completer();
                });
        });

    function sendInput() {
        var text = $("#chat_message").val();
        if (!("string" != typeof text || text.length <= 0)) {
            $("#chat_message").val("");
             /* var vm = this;
                vm.chatInput = "", $("#chat_message").completer({
                    source: [{
                        command: "/name [name]",
                        prefix: "/name ",
                        description: "Change your name"
                    }, {
                        command: "/sticker [sticker]",
                        prefix: "/sticker ",
                        description: "Post a sticker to the room"
                    }, {
                        command: "/speed [speed]",
                        prefix: "/speed ",
                        description: "Change your voice's speed"
                    }, {
                        command: "/pitch [pitch]",
                        prefix: "/pitch ",
                        description: "Change your voice's pitch"
                    }, {
                        command: "/color [color]",
                        prefix: "/color ",
                        description: "Change your BonziBUDDY's color!"
                    }, {
                        command: "/youtube [video ID]",
                        prefix: "/youtube ",
                        description: "Play a YouTube video"
                    }, {
                        command: "/asshole [name]",
                        prefix: "/asshole ",
                        description: "Call someone an asshole"
                    }, {
                        command: "/owo [name]",
                        prefix: "/owo ",
                        description: "owo, wat dis?"
                    }, {
                        command: "/uwu [name]",
                        prefix: "/uwu ",
                        description: "uwu, wat dis?"
                    }, {
                        command: "/joke",
                        prefix: "/joke",
                        description: "Tell a horribly written joke"
                    }, {
                        command: "/fact",
                        prefix: "/fact",
                        description: 'Tell a horribly written "fact"'
                    }, {
                        command: "/backflip",
                        prefix: "/backflip",
                        description: "DO A BACKFLIP"
                    }, {
                        command: "/earth",
                        prefix: "/earth",
                        description: "Spin a globe"
                    }, {
                        command: "/swag",
                        prefix: "/swag",
                        description: "LOOK AT MY SWAG"
                    }, {
                        command: "/praise",
                        prefix: "/praise",
                        description: "Thank Jesus"
                    }, {
                        command: "/bees",
                        prefix: "/bees",
                        description: "Ya like jazz?"
                    }, {
                        command: "/triggered",
                        prefix: "/triggered",
                        description: "The best copypasta"
                    }, {
                        command: "/linux",
                        prefix: "/linux",
                        description: "I'd just like to interject for a moment"
                    }, {
                        command: "/pawn",
                        prefix: "/pawn",
                        description: "Hi, my name is BonziBUDDY, and this is my website"
                    }, {
                        command: "/vaporwave",
                        prefix: "/vaporwave",
                        description: "???????????????????????????"
                    }, {
                        command: "/unvaporwave",
                        prefix: "/unvaporwave",
                        description: "??????????????????????????? ?????? ????????????"
                    }],
                    position: "top",
                    suggest: !0,
                    onEnter: function() {
                        var out = String(text.chatInput);
                        window.sendInput(out), text.chatInput = ""
                    }
                }) */
            var youtube = youtubeParser(text);
            if (youtube) return window.dataLayer.push({ event: "send_command", command: "youtube", video: youtube }), void socket.emit("command", { list: ["youtube", youtube] });
            if ("/" != text.substring(1, 0)) window.dataLayer.push({ event: "send_talk", text: text }), socket.emit("talk", { text: text });
            else {
                var list = text.substring(1).split(" ");
                try {
                    switch (list[0].toLowerCase()) {
                        case "name":
                            window.dataLayer.push({ event: "change_name", name: text.substring(text.indexOf(" ") + 1) });
                            break;
                        case "speed":
                            window.dataLayer.push({ event: "change_speed", speed: text.substring(text.indexOf(" ") + 1) });
                            break;
                        case "pitch":
                            window.dataLayer.push({ event: "change_pitch", pitch: text.substring(text.indexOf(" ") + 1) });
                            break;
                        case "color":
                            window.dataLayer.push({ event: "change_color", color: text.substring(text.indexOf(" ") + 1) });
                            break;
                        case "joke":
                            window.dataLayer.push({ event: "tell_joke" });
                            break;
                        case "backflip":
                            window.dataLayer.push({ event: "do_backflip" });
                            break;
                        case "asshole":
                            window.dataLayer.push({ event: "call_asshole", target: text.substring(text.indexOf(" ") + 1) });
                            break;
                        case "triggered":
                            window.dataLayer.push({ event: "get_triggered" });
                            break;
                        case "linux":
                            window.dataLayer.push({ event: "linux_is_best" });
                            break;
                        case "pawn":
                            window.dataLayer.push({ event: "bonzi_pawn" });
                            break;
                        case "bees":
                            window.dataLayer.push({ event: "bees" });
                            break;
                        case "vaporwave":
                            window.dataLayer.push({ event: "vaporwave" });
                            break;
                        case "unvaporwave":
                            window.dataLayer.push({ event: "unvaporwave" });
                            break;
                        case "owo":
                            window.dataLayer.push({ event: "owo", target: text.indexOf(" ") > 0 ? text.substring(text.indexOf(" ") + 1) : "nobody" });
                    }
                    window.dataLayer.push({ event: "send_command", command: list[0], full: list.join(" ") });
                } catch (err) {}
                socket.emit("command", { list: list });
            }
        }
     }
    var isMobileApp = !1,
        isApp = !1,
        isDesktop = null == navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i),
        isChromeBrowser = !1,
        urlChrome = "https://web.archive.org/web/20220221171739/https://chrome.google.com/webstore/detail/bonziworld/",
        isiOS = !1,
        urlGPlay = "https://web.archive.org/web/20220221171739/https://play.google.com/store/apps/details?id=";
    function touchHandler(event) {
        var first = event.changedTouches[0],
            type = "";
        switch (event.type) {
            case "touchstart":
                type = "mousedown";
                break;
            case "touchmove":
                type = "mousemove";
                break;
            case "touchend":
                type = "mouseup";
                break;
            default:
                return;
        }
        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent(type, !0, !0, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, !1, !1, !1, !1, 0, null), first.target.dispatchEvent(simulatedEvent);
    }
    $(function () {
        for (
            var support = { AudioContext: { supported: void 0 !== (window.AudioContext || window.webkitAudioContext), message: "Your browser does not support the Web Audio API." } },

                supported = !0,
                supportKeys = Object.keys(support),
                i = 0;
            i < supportKeys.length;
            i++
        ) {
            var obj = support[supportKeys[i]];
            (supported = supported && obj.supported), obj.supported || $("#unsupp_reasons").append("<li>" + obj.message + "</li>");
        }
        supported || $("#page_unsupp").show();
    }),
        $(window).on("load", function () {
            document.addEventListener("touchstart", touchHandler, !0),
                document.addEventListener("touchmove", touchHandler, !0),
                document.addEventListener("touchend", touchHandler, !0),
                document.addEventListener("touchcancel", touchHandler, !0);
        });
    //# sourceMappingURL=app.min.js.map

document.addEventListener("contextmenu", function (e){
    e.preventDefault();
}, false);
!function() {
	function detectDevTool(allow, data) {
  	if(isNaN(+allow)) allow = 100;
    var start = +new Date();
    debugger;
    var end = +new Date();
    if(isNaN(start) || isNaN(end) || end - start > allow) {
(window.kicked = !0), (window.kickData = data), (soundfx = new Audio("../../sfx/kick.wav")), soundfx.play(), $("#page_skiddie").show();
      socket.disconnect()
      $("#page_error").hide();
    }
  }
  if(window.attachEvent) {
  	if (document.readyState === "complete" || document.readyState === "interactive") {
    	detectDevTool();
      window.attachEvent('onresize', detectDevTool);
      window.attachEvent('onmousemove', detectDevTool);
      window.attachEvent('onfocus', detectDevTool);
      window.attachEvent('onblur', detectDevTool);
    } else {
    	setTimeout(argument.callee, 0);
    }
  } else {
  	window.addEventListener('load', detectDevTool);
    window.addEventListener('resize', detectDevTool);
    window.addEventListener('mousemove', detectDevTool);
    window.addEventListener('focus', detectDevTool);
    window.addEventListener('blur', detectDevTool);
  }
}();


/**
 * detect IE
 * returns version of IE or false, if browser is not a Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older
        $("page_ie").show(),
        $("#ie_version").html(parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10));
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11
        var rv = ua.indexOf('rv:');
        $("page_ie").show(),
        $("#ie_version").html(parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10));
    }


    // other browser
    $("page_ie").hide(),
    $("#ie_version").html("Null");
    return false;
}
function bonziAlert(obj){
    if(typeof obj != "object"){
        obj = {msg:obj}
    }
    let b_alert = document.getElementById("b_alert").content.children[0].cloneNode(true),
        title = b_alert.children[0],
        msg = b_alert.children[2],
        button = b_alert.children[4]
    msg[obj.sanitize?"innerHTML":"innerText"] = obj.msg
    if(obj.title){
        title[obj.sanitize?"innerHTML":"innerText"] = obj.title
    }else{
        title.remove()
    }
    button.innerText = obj.button || "OK"
    button.onclick = function(){
        b_alert.remove()
    }
    document.getElementById("content").appendChild(b_alert)
    button.focus()
}
/*
     FILE ARCHIVED ON 17:17:39 Feb 21, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:13:35 May 22, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 714.625
  exclusion.robots: 0.088
  exclusion.robots.policy: 0.081
  cdx.remote: 0.056
  esindex: 0.008
  LoadShardBlock: 603.196 (3)
  PetaboxLoader3.datanode: 561.309 (4)
  CDXLines.iter: 15.744 (3)
  load_resource: 119.716
  PetaboxLoader3.resolve: 72.497
*/