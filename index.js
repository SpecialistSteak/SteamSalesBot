const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
      Discord.Intents.FLAGS.GUILD_MEMBERS,
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
      Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});
const axios = require("axios");

const CHANNEL_ID = 'YOUR_CHANNEL_ID';
const KEY = "YOUR_BOT_KEY";
const TOKEN = 'YOUR_TOKEN';

client.login(TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.content === '$allfree') {
    console.log("'$allfree' command recognized...")
    const channel = client.channels.cache.get(CHANNEL_ID);

    try {
      console.log("Trying to connect to API...");
      const response = await axios.get(
        "https://api.isthereanydeal.com/v01/deals/list/?key=" + KEY + "&limit=40&country=IN&shops=steam%2Cgog%2Cepicgames&sort=price%3Aasc"
      );      
      const data = response.data;
      
      let count = 0;
      console.log("Looping through data list...")
      for (const game of data.data.list) {
        if (game.price_cut == 100){
          count++;
          channel.send(game.urls.buy);
          console.log("Sending message...")
        }
      }
      console.log("Finished sending links! " + count + " links sent!")
    } catch(error){
      console.error(error);
    }
  }
});

client.on('messageCreate', async (message) => {
  if (message.content === '$gamesales') {
    console.log("'$gamesales' command recognized...")
    const channel = client.channels.cache.get(CHANNEL_ID);

    try {
      console.log("Trying to connect to API...");
      const response = await axios.get(
        "https://api.isthereanydeal.com/v01/deals/list/?key=" + KEY + "&limit=40&country=IN&shops=steam%2Cgog%2Cepicgames&sort=price%3Aasc"
      );      
      const data = response.data;
      
      let count = 0;
      console.log("Looping through data list...")
      for (const game of data.data.list) {
        if (!game.title.toLowerCase().includes("dlc") && 
        !game.title.toLowerCase().includes(" - ") &&
        !game.title.toLowerCase().includes(": ") &&
        !game.title.toLowerCase().includes("marked_for_removal") &&
        !game.title.toLowerCase().includes("soundtrack") &&
        !game.title.toLowerCase().includes("patch") &&
        !game.title.toLowerCase().includes("expansion") && 
        !game.title.toLowerCase().includes("add-on") && 
        !game.title.toLowerCase().includes("patch") && 
        !game.title.toLowerCase().includes("content pack") && 
        !game.title.toLowerCase().includes("upgrade")){
          if (game.price_cut > 50){
            count++;
            channel.send(game.urls.buy);
            console.log("Sending message...")
          }
        }
      }
      console.log("Finished sending links! " + count + " links sent!")
    } catch (error) {
      console.error(error);
    }
  }

  else if(message.content === '$allgamesales'){
    console.log("'$allgamesales' command recognized...")
    const channel = client.channels.cache.get(CHANNEL_ID);

    try {
      console.log("Trying to connect to API...");
      const response = await axios.get(
        "https://api.isthereanydeal.com/v01/deals/list/?key=" + KEY + "&limit=40&country=IN&shops=steam%2Cgog%2Cepicgames&sort=price%3Aasc"
      );      
      const data = response.data;
      
      let count = 0;
      console.log("Looping through data list...")
      for (const game of data.data.list) {
        if (!game.title.toLowerCase().includes("dlc") && 
        !game.title.includes(" - ") &&
        !game.title.includes(": ") &&
        !game.title.toLowerCase().includes("marked_for_removal") &&
        !game.title.toLowerCase().includes("soundtrack") &&
        !game.title.toLowerCase().includes("patch") &&
        !game.title.toLowerCase().includes("expansion") && 
        !game.title.toLowerCase().includes("add-on") && 
        !game.title.toLowerCase().includes("patch") && 
        !game.title.toLowerCase().includes("content pack") && 
        !game.title.toLowerCase().includes("upgrade")){
          if (game.price_cut > 50){
            count++;
            channel.send(game.urls.buy);
            console.log("Sending message...")
          }
        }
      }
      console.log("Finished sending links! " + count + " links sent!")
    } catch (error) {
      console.error(error);
    }
  }
});