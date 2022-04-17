const Discord = require('discord.js')

const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
    name: 'redeem',
    async execute(client, message, args, con,log,prefix,NameHub,MadeBy,LOGOHUB) {
        if (args[0]) {
            con.query(`SELECT userkey,hwid,Blacklisted,vip,discord_id,Reason FROM bloxfruit WHERE discord_id = '${message.author.id}'`, function(err, result, fields) {
                if (!result.length){
                    con.query(`SELECT discord_id FROM bloxfruit WHERE userkey = '${args[0]}'`, function (err, res) {
                        if (res.length) {
                            if (res[0].discord_id === "Unknown") {
                                con.query(`UPDATE bloxfruit SET discord_id = '${message.author.id}' WHERE userkey = '${args[0]}'`, function (err, res) {
                                    const redeemsuccess = new Discord.MessageEmbed()
                                    .setColor('#00ffff')
                                    .setTitle(NameHub) 
                                    .setDescription("Stats | 🟢\nCommand | Gen Key\n```diff\n- Redeem Success ✅\n```")
                                    .setTimestamp() 
                                    .setFooter(MadeBy, LOGOHUB);
                                    message.reply({ embeds: [redeemsuccess] ,  ephemeral: true }).then().catch(err => {});
                                })
                            }else{
                                const keyuse = new Discord.MessageEmbed()
                                .setColor('#00ffff')
                                .setTitle(NameHub) 
                                .setDescription("Stats | 🔴\nCommand | Gen Key\n```diff\n- Key used ❌\n```")
                                .setTimestamp() 
                                .setFooter(MadeBy, LOGOHUB);
                                message.reply({ embeds: [keyuse] ,  ephemeral: true }).then().catch(err => {});
                            }
                        }else{
                            const KeyNotFound = new Discord.MessageEmbed()
                            .setColor('#00ffff')
                            .setTitle(NameHub) 
                            .setDescription("Stats | 🔴\nCommand | Gen Key\n```diff\n- Key Not Found ❌\n```")
                            .setTimestamp() 
                            .setFooter(MadeBy, LOGOHUB);
                            message.reply({ embeds: [KeyNotFound] ,  ephemeral: true }).then().catch(err => {});
                        }
                    })
                }else{
                    const GotWhitelisted = new Discord.MessageEmbed()
                    .setColor('#00ffff')
                    .setTitle(NameHub) 
                    .setDescription("Stats | 🟢\nCommand | Gen Key\n```diff\n- You Are Got Whitelist ✅\n```")
                    .setTimestamp() 
                    .setFooter(MadeBy, LOGOHUB);
                    message.reply({ embeds: [GotWhitelisted] ,  ephemeral: true }).then().catch(err => {});
                }
            })
            }else{
            const errornokey = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(NameHub) 
            .setDescription("Stats | 🔴\nCommand | Gen Key\n```diff\n- No Args 1 Key ❌\n```")
            .setTimestamp() 
            .setFooter(MadeBy, LOGOHUB);
            message.reply({ embeds: [errornokey] ,  ephemeral: true }).then().catch(err => {});
        }
    },
};