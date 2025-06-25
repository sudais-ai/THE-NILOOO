/**
 * ✅ WhatsApp Bot Starter | Powered by 𝚴𝚯𝚻 𝐔𝚪 𝚴𝚰𝐋 👑
 * Entry Point for Bot Startup
 */

const { client, config } = require("./lib");

const start = async () => {
  try {
    // Connect to database
    await config.DATABASE.sync();

    // Initialize and start bot
    const Client = new client();
    Client.log("🚀 Starting THE-LEGENDARY-N1L-BOT...");
    await Client.startServer();
    await Client.WriteSession();
    await Client.WaConnect();
  } catch (error) {
    console.error("❌ Error starting bot:", error);
  }
};

start();
