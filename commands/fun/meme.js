exports.run = async (client, message, args, level) => {
  const https = require('https');
  const Discord = require('discord.js');
  const url = 'https://www.reddit.com/r/cleanmemes/hot/.json?limit=100';
  //const url = 'https://www.reddit.com/r/memes/random/.json'

  https.get(url, (result) => {
  var body = '';
  result.on('data', (chunk) => {
    body += chunk;
  });

  result.on('end', () => {
    var response = JSON.parse(body);
    var index = response.data.children[Math.floor(Math.random() * 98) + 2].data;

    if (index.post_hint == 'image') {
      let image = index.preview.images[0].source.url.replace('&amp;', '&');
      let title = index.title;
      let link = 'https://reddit.com' + index.permalink;
      let memeUpvotes = index.ups;
      let memeNumComments = index.num_comments;
      let subRedditName = index.subreddit_name_prefixed;

      if (index.post_hint !== 'image') {
          const textembed = new Discord.RichEmbed()
              .setTitle(subRedditName)
              .setColor(9384170)
              .setDescription(`[${title}](${link})\n\n${text}`)
              .setURL(`https://reddit.com/${subRedditName}`);

          message.channel.send(textembed);
      }
      const imageembed = new Discord.MessageEmbed()
          .setTitle(subRedditName)
          .setImage(image)
          .setColor(9384170)
          .setDescription(`[${title}](${link})`)
          .setURL(`https://reddit.com/${subRedditName}`)
          .setFooter(`👍 ${memeUpvotes} | 💬 ${memeNumComments}`);
      message.channel.send(imageembed);
    }

    if (index.post_hint !== 'image') {
      let title = index.title;
      let link = 'https://reddit.com' + index.permalink;
      let memeUpvotes = index.ups;
      let memeNumComments = index.num_comments;
      let subRedditName = index.subreddit_name_prefixed;

      var text = index.selftext;
      const textembed = new Discord.MessageEmbed()
          .setTitle(subRedditName)
          .setColor(9384170)
          .setDescription(`[${title}](${link})\n\n${text}`)
          .setURL(`https://reddit.com/${subRedditName}`)
          .setFooter(`👍 ${memeUpvotes} | 💬 ${memeNumComments}`);

      message.channel.send(textembed);
    }

    }).on('error', function(e) {
        console.log('Got an error: ', e);
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  botPermissions: []
};

exports.help = {
  name: "meme",
  subfolder: "fun",
  category: "Fun",
  description: "Responds with a ramdom meme from the r/cleanmemes subreddit. (Picks from top 100)",
  usage: "meme"
};
