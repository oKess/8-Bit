const Command = require('../../inherits/Command');
const { inspect } = require('util');

module.exports = class Evaluate extends Command {
	constructor() {
		super('eval', {
			description: 'Executes a code snippet',
			aliases: ['evaluate'],
			usage: '<prefix>eval <code>',
			requirements: {
				userIDs: ['468240598483206154']
			},
			hidden: true
		});
	}

	run(msg, args) {
		let code = args.join(' ').replace(/^```(js|javascript ? \n )?|```$/gi, '');

		try {
			code = inspect(eval(code), {
				depht: 0
			});
		} catch (error) {
			code = error.message;
		}
		const text = msg._client.codeblock(code.slice(0, 1019).replace(msg._client.token, '{TOKEN}'), 'js');

		return msg.quote(text);
	}
}