require("colors")

// Iniciar client
const MenuClient = require('./system/modules/MenuClient.js')

const config = require("./system/settings.js")

const client = new MenuClient(config)

client.login()