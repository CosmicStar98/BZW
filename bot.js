const Discord = require('discord.js');
    
    const { Client, Intents } = require('discord.js');
    
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
        
client.on('ready', () => {
  console.log(`Discord bot connected!`);
  client.user.setPresence({
    status: 'idle',
    game: {
       name: 'CosmicWORLD',
        type: 'LISTENING',
        url: 'https://www.bwnzi-world.ga'
    }
})
});
client.login("OTgyNzA1NTU1MTU4MjM3MjE1.GGm4e8.cyVhcjxIyzFb9N3Z_xvlaqmGcOpqloYiKbQijo")
