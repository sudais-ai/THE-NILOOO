const { client, config } = require("./lib");

const startBot = async () => {
  try {
    console.log("🚀 Launching THE-LEGENDARY-N1L-BOT...");

    if (config && config.DATABASE && typeof config.DATABASE.sync === 'function') {
      await config.DATABASE.sync();
      console.log("📦 Database synced successfully!");
    } else {
      console.warn("⚠ No DATABASE sync found — skipping DB connection.");
    }

    const Client = new client();
    if (Client.startServer) await Client.startServer();
    if (Client.WriteSession) await Client.WriteSession();
    if (Client.WaConnect) await Client.WaConnect();

    console.log("✅ Bot started successfully!");

  } catch (error) {
    console.error("❌ Bot Startup Error:", error.message || error);
  }
};

startBot();
