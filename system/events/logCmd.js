module.exports = {
   
    name: "logCmd",
    execute: async(client, options) => {

        console.log(options.msg.author.id + ' executou ' + options.prefix + options.cmd);

    }

}