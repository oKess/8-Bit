const { Client } = require('discord.js-light');
const Discord = require('discord.js-light');
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

        this.validate(options)
        this.loadEvents()

    }

    validate(options) {

        if (!options.token) {
            console.log('Token not found in settings')
            process.exit()
        }

        this.token = options.token
        this.Discord = Discord

    }

    loadEvents() {
        fs.readdir("./system/events/", (err, files) => {
            if (err) return console.error(err);
            files.forEach(file => {
                let eventFunction = require(`../events/${file}`);
                this.on(eventFunction.name, (...args) => eventFunction.execute(client, ...args));
            });
        });
    }

    async login(token = this.token) {
        super.login(token)
        API.client = this
    }

}