module.exports = class Utils {
    
    codeBlock(lang, code) { 
        return (`\`\`\`${lang}\n${String(code).slice(0, 1000) + (code.length >= 1000 ? '...' : '')}\n\`\`\``).replace(this.client.token, '*') 
    }

    constructor(client = {}) {
        this.client = client

    }
}