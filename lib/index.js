const connect = require('./connection');
const { log } = require('console');

// ✅ Bot class banana zaroori hai taake use constructor ke through run kiya jaa sake
class LegendaryBot {
  async startServer() {
    log("🟢 Server started.");
  }

  async WriteSession() {
    log("📝 Session written.");
  }

  async WaConnect() {
    await connect();
    log("🤖 WhatsApp connected.");
  }
}

// ✅ Agar database config chahiye ho to yeh export kar sakte ho
const config = {
  DATABASE: {
    sync: async () => {
      log("🔗 Database sync simulated.");
    }
  }
};

// ✅ Yehi export karo taake main `index.js` mein use ho sake
module.exports = {
  client: LegendaryBot,
  config
};
