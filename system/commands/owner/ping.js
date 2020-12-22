const BaseCommand = require("../../modules/Command");

class Command extends BaseCommand {
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

module.exports = Command