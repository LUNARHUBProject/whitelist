const Discord = require('discord.js')
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
    name: 'addwhitelist',
    async execute(client, message, args, con,log,prefix,NameHub,MadeBy,LOGOHUB) {
        const member = message.mentions.members.first();
        if (!message.member.roles.cache.find(r => r.name === "Whitelist")) {
            const Notrole = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(LunarHub) 
            .setDescription("Stats | 🔴\nUser | <@"+ member.user.id +">\n```diff\n- Not Role ❌\n```")
            .setTimestamp() 
            .setFooter(MadeBy,LOGOHUB);
            message.reply({ embeds: [Notrole] ,  ephemeral: true }).then().catch(err => {});
        }else{
            if (member) {
                con.query(`SELECT userkey,hwid,Blacklisted,vip,discord_id,Reason FROM bloxfruit WHERE discord_id = '${member.user.id}'`, function(err, result, fields) {
                    if (result.length){
                        const errorGw = new Discord.MessageEmbed()
                        .setColor('#00ffff')
                        .setTitle(LunarHub) 
                        .setDescription("Stats | 🟢\nUser | <@"+ member.user.id +">\n```diff\n- Got Whitelist ✅\n```")
                        .setTimestamp() 
                        .setFooter(MadeBy, LOGOHUB);
                        message.reply({ embeds: [errorGw] ,  ephemeral: true }).then().catch(err => {});
                    
                }else{
                    con.query(`INSERT INTO bloxfruit (userkey,resethwid_amount,discord_id,hwid,ip,Blacklisted,Reason,vip,create_at) VALUES ('${makeid(20)}','0','${member.user.id}','Unknown','Unknown','False','Unknown','False', NOW())`, function (err, results, fields) {
                        const Addwhs = new Discord.MessageEmbed()
                        .setColor('#00ffff')
                        .setTitle(LunarHub) 
                        .setDescription("Stats | 🟢\nUser | <@"+ member.user.id +">\n```diff\n- Add Whitelist Success ✅\n```")
                        .setTimestamp() 
                        .setFooter(MadeBy, LOGOHUB);
                        message.reply({ embeds: [Addwhs] ,  ephemeral: true }).then().catch(err => {});
                    })
                }
                })
            }else{
                const helpaddwh = new Discord.MessageEmbed()
                .setColor('#00ffff')
                .setTitle(LunarHub) 
                .setDescription('Stats | 🔴\n```diff\n- Not Found User  ❌\n```')
                .setTimestamp() 
                .setFooter(MadeBy, LOGOHUB);
                message.reply({ embeds: [helpaddwh] ,  ephemeral: true }).then().catch(err => {});
            }
    }
    },
};
