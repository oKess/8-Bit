module.exports = class Evaluate {
	constructor() {
		super('ping', {
			description: 'Executes a code snippet',
			aliases: ['pong'],
		});
	}

	execute(client, msg, args) {
		return msg.channel.send(client.ws.ping);
	}
}