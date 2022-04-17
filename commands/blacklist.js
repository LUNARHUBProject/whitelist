const Discord = require('discord.js')

const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
    name: 'blacklist',
    async execute(client, message, args, con,log,prefix,NameHub,MadeBy,LOGOHUB) {
        const member = message.mentions.members.first();
		        if (!message.member.roles.cache.find(r => r.name === "Whitelist")) {
            const Notrole = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(NameHub) 
            .setDescription("Stats | 🔴\nUser | <@"+ member.user.id +">\n```diff\n- Not Role ❌\n```")
            .setTimestamp() 
            .setFooter(MadeBy,LOGOHUB);
            message.reply({ embeds: [Notrole] ,  ephemeral: true }).then().catch(err => {});
        }else{
        if (member){
            con.query(`SELECT discord_id , Blacklisted FROM bloxfruit WHERE discord_id = '${member.user.id}'`, function (err, res) {
                if (res.length){
                    con.query(`UPDATE bloxfruit SET Blacklisted = 'True' WHERE discord_id = '${member.user.id}'`, function (err, res) {
                        const redeemsuccess = new Discord.MessageEmbed()
                        .setColor('#00ffff')
                        .setTitle(NameHub) 
                        .setDescription("Stats | 🟢\n```diff\n- Blacklist Success ✅\n```")
                        .setTimestamp() 
                        .setFooter(MadeBy, LOGOHUB);
                        message.reply({ embeds: [redeemsuccess] ,  ephemeral: true }).then().catch(err => {});
                    })
                }else{
                    const Embed = new Discord.MessageEmbed()
                    .setColor('#00ffff')
                    .setDescription('**Bot Whitelist**')
                    .addField('Success', '```\n 🔴 | You Are Not Whitelister ❌\n```', true)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTimestamp()
                    message.channel.send({ embeds: [Embed] })
                }
            })
        }else{
            const helpaddwh = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(NameHub) 
            .setDescription('Stats | 🔴\n```diff\n- Not Found User  ❌\n```')
            .setTimestamp() 
            .setFooter(MadeBy, LOGOHUB);
            message.reply({ embeds: [helpaddwh] ,  ephemeral: true }).then().catch(err => {});
        }
		}
    },
};