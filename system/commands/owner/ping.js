const Command = require("../../modules/Command");

class Local extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			aliases: ['pong'],
			description: 'Verifica a latência do bot'
		});
	}

	execute(client, msg) {
		return msg.channel.send(client.ws.ping);
	}
}

module.exports = Local