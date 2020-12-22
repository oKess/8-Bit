const Discord = require('discord.js-light');
const Client = Discord.Client
const fs = require('fs');

module.exports = class MenuClient extends Client {

    constructor(options = {}) {
        super({
            cacheGuilds: true,
            cacheChannels: false,
            cacheOverwrites: false,
            cacheRoles: false,
            cacheEmojis: false,
            cachePresences: false,
        
            disableMentions: 'everyone', 

            ws: { 
                    properties: { $browser: 'Discord Android' }, 
                    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'] 
                },

            disabledEvents: ['CHANNEL_CREATE', 'CHANNEL_UPDATE', 'CHANNEL_DELETE', 'CHANNEL_PINS_UPDATE', 'GUILD_ROLE_CREATE', 'GUILD_ROLE_DELETE', 'GUILD_ROLE_UPDATE', 'MESSAGE_UPDATE', 'MESSAGE_REACTION_REMOVE_ALL', 'MESSAGE_REACTION_REMOVE_EMOJI', 'MESSAGE_REACTION_REMOVE']
        })
        console.log(' ');
        this.validate(options)
        this.loadCommands()
        this.loadEvents()

    }

    validate(options) {

        if (!options.token) {
            console.log('Token not found in settings')
            process.exit()
        }
        if (!options.prefix) {
            console.log('Prefix not found in settings')
            process.exit()
        }

        this.token = options.token
        this.prefix = options.prefix

    }

    loadEvents() {
        fs.readdir("./system/events/", (err, files) => {
            if (err) return console.error(err);
            files.forEach(file => {
                let eventFunction = require(`../events/${file}`);
                this.on(eventFunction.name, (...args) => eventFunction.execute(this, ...args));
            });
        });
        console.log(`[EVENTOS] Carregados`.green )
    }

    loadCommands() {
        const x = new Discord.Collection(undefined, undefined);
        
        const glob = require('glob');

        glob(__dirname+'/../commands/*/*.js', function (er, files) {
            
            if(er) {
            console.log(er)
            }
            files.forEach(file=>{

                let Command = require(`${file.replace('.js', '')}`)

                let cmd = new Command(this);
                
                if (!file.includes('!')) x.set(cmd.name, cmd)

                
            })

        })
        this.commands = x
        console.log(`[COMANDOS] Carregados`.green )
    }

    async login(token = this.token) {
        super.login(token)
    }

}