const Discord = require('discord.js')
var cooldown = new Set()
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
    name: 'resethwid',
    async execute(client, message, args, con,log,prefix,NameHub,MadeBy,LOGOHUB) {
        con.query(`SELECT userkey,hwid,Blacklisted,vip,discord_id,Reason FROM bloxfruit WHERE discord_id = '${message.author.id}'`, function(err, result, fields) {
            if (result.length){
                if (cooldown.has(message.author.id)){
                    message.reply('Cooldown, try again in 6 hours.')
                }else{
                    con.query(`UPDATE bloxfruit SET hwid = 'Unknown' WHERE discord_id = '${message.author.id}'`, function (err, res) {
                        const resethwid = new Discord.MessageEmbed()
                        .setColor('#00ffff')
                        .setTitle(NameHub) 
                        .setDescription("Stats | 🟢\nUser | <@"+ message.author.id +">\n```diff\n- resethwid Success ✅\n```")
                        .setTimestamp() 
                        .setFooter(MadeBy, LOGOHUB);
                        message.reply({ embeds: [resethwid] ,  ephemeral: true }).then().catch(err => {});
                    })
                    cooldown.add(message.author.id);
                    setTimeout(() => {
                        cooldown.delete(message.author.id)
                    }, 21600000);
                }
            }else{
                const Notwhitelist = new Discord.MessageEmbed()
                .setColor('#00ffff')
                .setTitle(NameHub) 
                .setDescription("Stats | 🔴\nUser | <@"+ member.user.id +">\n```diff\n- Not Whitelist ❌\n```")
                .setTimestamp() 
                .setFooter(MadeBy, LOGOHUB);
                message.reply({ embeds: [Notwhitelist] ,  ephemeral: true }).then().catch(err => {});
            }
        })      
    },
};