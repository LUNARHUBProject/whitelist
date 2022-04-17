const Discord = require('discord.js')

const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
    name: 'removekey',
    async execute(client, message, args, con,log,prefix,NameHub,MadeBy,LOGOHUB) {
		        if (!message.member.roles.cache.find(r => r.name === "Whitelist")) {
            const Notrole = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(NameHub) 
            .setDescription("Stats | 🔴\nUser | <@"+ member.user.id +">\n```diff\n- Not Role ❌\n```")
            .setTimestamp() 
            .setFooter(MadeBy,LOGOHUB);
            message.reply({ embeds: [Notrole] ,  ephemeral: true }).then().catch(err => {});
        }else{
        if (args[0]){
            con.query(`SELECT userkey,hwid,Blacklisted,vip,discord_id,Reason FROM bloxfruit WHERE userkey = '${args[0]}'`, function(err, result, fields) {
                if (result.length) {
                    con.query(`DELETE FROM bloxfruit WHERE userkey = '${args[0]}'`, function (err, result) {
						const PASS = new Discord.MessageEmbed()
						.setColor('#00ffff')
						.setTitle(NameHub) 
						.setDescription('Stats | 🔴\n```diff\n- remove Success \n key ${args}\n```')
						.setTimestamp() 
						.setFooter(MadeBy, LOGOHUB);
						message.reply({ embeds: [PASS] ,  ephemeral: true }).then().catch(err => {});
                    })
                }else{
                    const NotKey = new Discord.MessageEmbed()
                    .setColor('#00ffff')
                    .setTitle(NameHub) 
                    .setDescription('Stats | 🔴\n```diff\n- Not Not Key  ❌\n```')
                    .setTimestamp() 
                    .setFooter(MadeBy, LOGOHUB);
                    message.reply({ embeds: [NotKey] ,  ephemeral: true }).then().catch(err => {});
                }
            })
        }else{
            const NotFoundArgs1 = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(NameHub) 
            .setDescription('Stats | 🔴\n```diff\n- Not Found Args 1  ❌\n```')
            .setTimestamp() 
            .setFooter(MadeBy, LOGOHUB);
            message.reply({ embeds: [NotFoundArgs1] ,  ephemeral: true }).then().catch(err => {});
        }
		}
    },
};