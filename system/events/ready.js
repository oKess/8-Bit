module.exports = {
   
    name: "ready",
    execute: async(client) => {

        console.log(`\n         Bot iniciado.\n`.green);
        client.user.setActivity(`Prefixo ${client.prefix}`);

    }

}