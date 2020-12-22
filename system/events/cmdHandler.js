module.exports = {

    name: "message",
    execute: async (client, msg) => {

        const prefix = client.prefix;

        if (!msg.content.toLowerCase().startsWith(prefix) || msg.author.bot || msg.channel.type == "dm") return;

        const [label, ...args] = msg.content.slice(prefix.length).split(/ +/);

        const command = client.commands.find(cmd => cmd.help.name == label || cmd.help.aliases.includes(label));

        if (command) {
            console.log(msg.author.id + ' executed ' + label)
            return command.execute(client, msg, args);
        }

    }
}