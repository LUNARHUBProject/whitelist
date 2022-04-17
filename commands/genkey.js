const Discord = require('discord.js')
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
    name: 'genkey',
    async execute(client, message, args, con,log,prefix,NameHub,MadeBy,LOGOHUB) {
        const member = message.mentions.members.first();
        if (!message.member.roles.cache.find(r => r.name === "Whitelist")) {
            const Notrole = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(NameHub) 
            .setDescription("Stats | 🔴\nUser | <@"+ member.user.id +">\n```diff\n- Not Role ❌\n```")
            .setTimestamp() 
            .setFooter(MadeBy, LOGOHUB);
            message.reply({ embeds: [Notrole] ,  ephemeral: true }).then().catch(err => {});
        }else{
            if (args[0]) {
                if (Number(args[0]) > 1) {
                    let randomKey = ""
                    let outputkey = []
                    for (var i = 0; i < args[0]; i++){
                        outputkey.push(`${makeid(20)}`)
                    }
                    let outputconvert = ""
                    outputkey.forEach(Keyrandom => {
                        outputconvert = outputconvert + "- " + Keyrandom.toString()  + "\n"
                        con.query(`INSERT INTO bloxfruit (userkey,resethwid_amount,discord_id,hwid,ip,Blacklisted,Reason,vip,create_at) VALUES ('${Keyrandom}','0','Unknown','Unknown','Unknown','False','Unknown','False', NOW())`, function (err, results, fields) {

                        })
                    })
                    const gensuccess = new Discord.MessageEmbed()
                    .setColor('#00ffff')
                    .setTitle(NameHub) 
                    .setDescription("Stats | 🟢\nCommand | Gen Key\n```diff\n"+ outputconvert +"\n```")
                    .setTimestamp() 
                    .setFooter(MadeBy, LOGOHUB);
                    message.reply({ embeds: [gensuccess] ,  ephemeral: true }).then().catch(err => {});
                }else{
                    let Randomkeyr = `${makeid(20)}`
                    con.query(`INSERT INTO bloxfruit (userkey,resethwid_amount,discord_id,hwid,ip,Blacklisted,Reason,vip,create_at) VALUES ('${Randomkeyr}','0','Unknown','Unknown','Unknown','False','Unknown','False', NOW())`, function (err, results, fields) {
                        const gen1 = new Discord.MessageEmbed()
                        .setColor('#00ffff')
                        .setTitle(NameHub) 
                        .setDescription("Stats | 🟢\nCommand | Gen Key\n```diff\n- "+ Randomkeyr +"\n```")
                        .setTimestamp() 
                        .setFooter(MadeBy, LOGOHUB);
                        message.reply({ embeds: [gen1] ,  ephemeral: true }).then().catch(err => {});
                    })
                }
            }else{
                const errorctr = new Discord.MessageEmbed()
                .setColor('#00ffff')
                .setTitle(NameHub) 
                .setDescription("Stats | 🔴\nCommand | Gen Key\n```diff\n- No Args 1 ❌\n```")
                .setTimestamp() 
                .setFooter(MadeBy, LOGOHUB);
                message.reply({ embeds: [errorctr] ,  ephemeral: true }).then().catch(err => {});
            }
        }
    },
};