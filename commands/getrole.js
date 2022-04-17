const Discord = require('discord.js')

const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
    name: 'getrole',
    async execute(client, message, args, con,log,prefix,NameHub,MadeBy,LOGOHUB) {
        con.query(`SELECT discord_id , Blacklisted FROM bloxfruit WHERE discord_id = '${message.author.id}'`, function (err, res) {
            if (res.length) {
                message.member.roles.add(message.guild.roles.cache.find(role => role.name === 'Buyer')).then().catch(err => {});
                const redeemsuccess = new Discord.MessageEmbed()
                .setColor('#00ffff')
                .setTitle(NameHub) 
                .setDescription("Stats | 🟢\n```diff\n- Give Role Success ✅\n```")
                .setTimestamp() 
                .setFooter(MadeBy, LOGOHUB);
                message.reply({ embeds: [redeemsuccess] ,  ephemeral: true }).then().catch(err => {});
            } else {
                const Embed = new Discord.MessageEmbed()
                    .setColor('#00ffff')
                    .setDescription('**Bot Whitelist**')
                    .addField('Success', '```\n 🔴 | You Are Not Whitelister ❌\n```', true)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTimestamp()
                message.channel.send({ embeds: [Embed] })
            }
        })
    },
};