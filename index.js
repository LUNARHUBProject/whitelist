const { Client, Intents } = require('discord.js');
const Discord = require('discord.js');
const intents = new Discord.Intents(52767)
const client = new Discord.Client({ intents });
const mysql = require("mysql");
const fs = require('fs')
const colors = require("colors");
client.commands = new Discord.Collection();
const config = require('./config.json')
const {token,prefix,NameHub,phone,MadeBy,LOGOHUB} = require('./config.json')
const { MessageEmbed } = require('discord.js');
const express = require('express');
const axios = require("axios");
const path = require('path');
const { exit } = require("process");
const app = express();
app.use(express.json());

function payloaddata(code){
    return {
		'accept': 'application/json',
		'accept-encoding': 'gzip, deflate, br',
		'accept-language': 'en-US,en;q=0.9',
		'content-length': '59',
		'content-type': 'application/json',
		'origin': 'https://gift.truemoney.com',
		'referer': 'https://gift.truemoney.com/campaign/?v='+code,
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-origin',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.66',
    };
}

app.get('/APItrueWallet', (req, res) => {

		var giftcode = req.query.code;
		var	phonenumber = phone;
		redeempayment(giftcode,phonenumber)
		async function redeempayment(code,phonenumber){
			var payloadheaders = payloaddata(code);
			var payload = {mobile: phonenumber , voucher_hash: code};
		    await axios({
			    method: 'post',
			    url: 'https://gift.truemoney.com/campaign/vouchers/'+code+'/redeem',
			    headers: payloadheaders,
			    data: payload
			}).then(function (response) {
			    res.status(200).send(response.data)	 
			}).catch(function (error) {
				res.status(400).send(error.response.data);
			});
		}

})

client.commands = new Discord.Collection();
function log(text, color) {
    if (typeof(color) == "undefined") { console.log(text) }
    if (typeof(color) != "undefined") { console.log(colors[color](text)) }
}

function handleConnection() {
    con = mysql.createConnection(config.sql);
 
    con.connect(function(err) {
        if (err) {
            log("[ERROR] An error has occurred while connection: " + err, "red");
            log("[INFO] Attempting to establish connection with SQL database.", "yellow");
            setTimeout(handleConnection, 2000);
        } else {
            log("[SUCCESS] SQL database connection established successfully.", "green");
        }
    });
 
    con.on("error", function(err) {
        console.log("Error: " + err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            handleConnection();
        } else {
            throw err;
        }
    });
}

con = mysql.createConnection(config.sql);

con.connect(function(err) {
    if (err) {
        log("[ERROR] An error has occurred while connection: " + err, "red");
        log("[INFO] Attempting to establish connection with SQL database.", "yellow");
        setTimeout(handleConnection, 2000);
    } else {
        log("[SUCCESS] SQL database connection established successfully.", "green");
    }
});

con.on("error", function(err) {
    console.log("Error: " + err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        handleConnection();
    } else {
        throw err;
    }
});
client.on('ready', () => {
  log(`BOT ON | ${client.user.tag}`,'green');
});
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('messageCreate', async message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const cmd = args.shift().toLowerCase();

    try {
        await client.commands.get(cmd).execute(client, message, args,con,log,prefix,NameHub,MadeBy,LOGOHUB);
    } catch (error) {
    const nocommand = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Bot Whitelist')
	.setDescription('Stats | 🔴\n```\nCommand is Not Found\n```')
	.setTimestamp()
	.setFooter('Bot Whitelist', LOGOHUB);
        await message.reply({ embeds: [nocommand] ,  ephemeral: true }).then().catch(err => {});
    }
});
const port = 3000;
app.listen(port, () => log(`API ON : ${port} `,'green'));
client.login(token);