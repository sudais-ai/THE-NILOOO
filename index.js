/**
 * ✅ WhatsApp Bot Starter | Powered by 𝚴𝚯𝚻 𝐔𝚪 𝚴𝚰𝐋 👑
 * Entry Point for Bot Startup
 */

const { client, config } = require("./lib");

const startBot = async () => {
  try {
    // Connect to database
    if (config && config.DATABASE) {
      await config.DATABASE.sync();
    } else {
      throw new Error("❌ DATABASE config not found.");
    }

    // Initialize and start the bot
    const Client = new client(); // Ensure 'client' is a class, not a function
    Client.log("🚀 Launching THE-LEGENDARY-N1L-BOT...");

    if (Client.startServer) await Client.startServer();
    if (Client.WriteSession) await Client.WriteSession();
    if (Client.WaConnect) await Client.WaConnect();

  } catch (error) {
    console.error("❌ Bot Startup Error:", error.message || error);
  }
};

startBot();
