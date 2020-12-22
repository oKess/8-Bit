const BaseCommand = require("../../modules/Command");
const { inspect } = require('util');

class Command extends BaseCommand {
	constructor(client) {
		super(client, {
			name: 'eval',
			aliases: ['evaluate'],
			description: 'Executa o código especificado'
		});
	}

	execute(client, msg, args) {
		let code = args.join(' ').replace(/^```(js|javascript ? \n )?|```$/gi, '');

		try {
			code = inspect(eval(code), {
				depht: 0
			});
		} catch (error) {
			code = error.message;
		}

		const text = client.utils.codeBlock('js', code);

		return msg.channel.send(text);
	}
}

module.exports = Command