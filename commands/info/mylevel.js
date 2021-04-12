exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  message.reply(`Your permission level is: ${level} - ${friendly}`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
  botPermissions: []
};

exports.help = {
  name: "mylevel",
  subfolder: "info",
  category: "Info",
  description: "Tells you your permission level for the current message location.",
  usage: "mylevel"
};
