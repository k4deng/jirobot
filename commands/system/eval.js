// The EVAL command will execute **ANY** arbitrary javascript code given to it.
// THIS IS PERMISSION LEVEL 10 FOR A REASON! It's perm level 10 because eval
// can be used to do **anything** on your machine, from stealing information to
// purging the hard drive. DO NOT LET ANYONE ELSE USE THIS


// However it's, like, super ultra useful for troubleshooting and doing stuff
// you don't want to put in a command.
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  const Discord = require("discord.js")

  if (args[0] === "clean") {
    const code = args.slice(1).join(" ");
    try {
      const evaled = eval(code);
      const clean = await client.clean(client, evaled);
      message.channel.send(`\`\`\`js\n${clean}\n\`\`\``, { split: {prepend: "\`\`\`js\n", append: "\n\`\`\`"} });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
    } 
  } else {
    const code = args.join(" ");
    try {
      const evaled = eval(code);
      const clean = await client.clean(client, evaled);
      message.channel.send(`\`\`\`js\n${evaled}\n\`\`\``, { split: {prepend: "\`\`\`js\n", append: "\n\`\`\`"} });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
    }    
  }


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["exec"],
  permLevel: "Bot Owner",
  botPermissions: []
};

exports.help = {
  name: "eval",
  subfolder: "system",
  category: "System",
  description: "Evaluates arbitrary javascript.",
  usage: "eval <...code>"
};
