const Discord = require('discord.js')
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
    name: 'g',
    async execute(client, message, args, con,log,prefix,NameHub,MadeBy,LOGOHUB) {
        const NotWhitelist = new Discord.MessageEmbed()
        .setColor('#00ffff')
        .setTitle(NameHub)
        .setDescription('Stats | 🔴\n```diff\n- Not Whitelist  ❌\n```')
        .setTimestamp()
        .setFooter(MadeBy, LOGOHUB);
		const SelectScript = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Select Game')
					.addOptions([
						{
							label: 'BloxFruit',
                            emoji: '✅',
							description: '',
							value: 'Bloxfruitscript',
						},
					]),
			);
    const getscriptembed = new Discord.MessageEmbed()
	.setColor('#00ffff')
	.setTitle(NameHub)
	.setDescription('Stats | 🟢\n```diff\n- Select Script ✅\n```')
	.setTimestamp()
	.setFooter(MadeBy, LOGOHUB);
    let msg = await message.reply({ embeds: [getscriptembed] ,components: [SelectScript],  ephemeral: true })
    const filter = (select) => select.user.id === message.author.id;
    const collector = msg.createMessageComponentCollector({ filter : filter , componentType: 'SELECT_MENU'})
    collector.on('collect', async select => {
        if (!select.isSelectMenu()) return;
        if (select.values[0] === 'Bloxfruitscript') {
            con.query(`SELECT userkey,hwid,Blacklisted,vip,discord_id,Reason FROM bloxfruit WHERE discord_id = '${message.author.id}'`, function(err, result, fields) {
                if (result.length) {
                    const BFEMBED = new Discord.MessageEmbed()
                    .setColor('#00ffff')
                    .setTitle(NameHub)
                    .setDescription('Stats | 🟢\nGame |  Blox Fruit\n```diff\n- Check you dm  ✅\n```')
                    .setTimestamp()
                    .setFooter(MadeBy, LOGOHUB);
                    select.update({ embeds: [BFEMBED] ,components: [],  ephemeral: true })
                    const DMBFEMBED = new Discord.MessageEmbed()
                    .setColor('#00ffff')
                    .setTitle(NameHub)
                    .setDescription("Stats | 🟢\nGame |  Blox Fruit\n```lua\ngetgenv().key = '"+ result[0].userkey +"'\ngetgenv().id = '"+ result[0].discord_id +"'\nloadstring(game:HttpGet('https://raw.githubusercontent.com/Wizsen1604/SWIS_HUB/main/Protected.lua'))()\n```")
                    .setTimestamp()
                    .setFooter(MadeBy, LOGOHUB);
                    message.author.send({ embeds: [DMBFEMBED]}).then().catch(err => {});
                }else{
                    select.update({ embeds: [NotWhitelist] ,components: [],  ephemeral: true })
                }
            });
        } else if (select.values[0] === 'KingLegacy') {
            con.query(`SELECT userkey,hwid,Blacklisted,vip,discord_id,Reason FROM bloxfruit WHERE discord_id = '${message.author.id}'`, function(err, result, fields) {
                if (result.length) {
                    const KLEMBED = new Discord.MessageEmbed()
                    .setColor('#00ffff')
                    .setTitle(NameHub)
                    .setDescription('Stats | 🟢\nGame |  King Legacy\n```diff\n- Check you dm  ✅\n```')
                    .setTimestamp()
                    .setFooter(MadeBy, LOGOHUB);
                    select.update({ embeds: [KLEMBED] ,components: [],  ephemeral: true })
                    const DMKLEMBED = new Discord.MessageEmbed()
                    .setColor('#00ffff')
                    .setTitle(NameHub)
                    .setDescription("Stats | 🟢\nGame |  King Legacy\n```lua\ngetgenv().key = '"+ result[0].userkey +"'\ngetgenv().id = '"+ result[0].discord_id +"'\nloadstring(game:HttpGet('link'))()\n```")
                    .setTimestamp()
                    .setFooter(MadeBy, LOGOHUB);
                    message.author.send({ embeds: [DMKLEMBED]}).then().catch(err => {});
                }else{
                    select.update({ embeds: [NotWhitelist] ,components: [],  ephemeral: true })
                }
            });
        }
    });
    },
};