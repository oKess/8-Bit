const Discord = require('discord.js-light');
const x = new Discord.Collection(undefined, undefined);
        
console.log(' ');

const glob = require('glob');

glob(__dirname+'/../commands/*/*.js', function (er, files) {
    
    if(er) {
    console.log(er)
    API.sendConsoleError(er.stack)
    }
    files.forEach(file=>{

        let Command = require(`${file.replace('.js', '')}`)

        let cmd = new Command();
        
        if (!file.includes('!')) x.set(cmd.label, cmd)

        
    })

})

this.commands = x

console.log(`[COMANDOS] Carregados`.green )

module.exports = {

    name: "message",
    execute: async (client, msg) => {

        const prefix = client.prefix;

        if (!msg.content.toLowerCase().startsWith(prefix) || msg.author.bot || msg.channel.type == "dm") return;

        const args = msg.content.slice(prefix.length).split(/ +/);

        const label = args.shift().toLowerCase();

        const command = client.commands.find(cmd => cmd.label == label || cmd.aliases.includes(label));

        if (command) {
            return command.execute(client, msg, args);
        }

    }
}