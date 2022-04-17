const Discord = require('discord.js')
const request = require('request')
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
module.exports = {
    name: 'buy',
    async execute(client, message, args, con,log,prefix,NameHub,MadeBy,LOGOHUB) {
        if (args[0]) {
            let truecode = args[0].replace("https://gift.truemoney.com/campaign/?v=", "")
            request("http://127.0.0.1:3000/APItrueWallet?code=" + truecode, function(error, response, body) {
				let datadecode = JSON.parse(body);
                if(response.statusCode == 200 && !error) {
                    if(datadecode.data.voucher.redeemed_amount_baht >= 100.00) {
                        let randomk = (makeid(20))
                        con.query(`INSERT INTO bloxfruit (userkey,resethwid_amount,discord_id,hwid,ip,Blacklisted,Reason,vip,create_at) VALUES ('${randomk}','0','${message.author.id}','Unknown','Unknown','False','Unknown','False', NOW())`, function (err, results, fields) {
                            const moneynoeypai = new Discord.MessageEmbed()
                            .setColor('#00ffff')
                            .setTitle(NameHub) 
                            .setDescription('Stats | 🟢\n```diff\n- Buy Success  ✅\n```')
                            .setTimestamp() 
                            .setFooter(MadeBy, LOGOHUB);
                            message.reply({ embeds: [moneynoeypai] ,  ephemeral: true }).then().catch(err => {});
                        }) 
                    }else{
                        const moneynoeypai = new Discord.MessageEmbed()
                        .setColor('#00ffff')
                        .setTitle(NameHub) 
                        .setDescription('Stats | 🔴\n```diff\n- not enough money  ❌\n```')
                        .setTimestamp() 
                        .setFooter(MadeBy, LOGOHUB);
                        message.reply({ embeds: [moneynoeypai] ,  ephemeral: true }).then().catch(err => {});
                    } 
                }else{
                    const NotUseV = new Discord.MessageEmbed()
                    .setColor('#00ffff')
                    .setTitle(NameHub) 
                    .setDescription('Stats | 🔴\n```diff\n- VOUCHER NOT USED  ❌\n```')
                    .setTimestamp() 
                    .setFooter(MadeBy, LOGOHUB);
                    message.reply({ embeds: [NotUseV] ,  ephemeral: true }).then().catch(err => {});
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
    },
};