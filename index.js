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

    const ClientInstance = new client(); // 🔁 Fixed class naming (capitalized 'ClientInstance')
    if (ClientInstance.startServer) await ClientInstance.startServer();
    if (ClientInstance.WriteSession) await ClientInstance.WriteSession();
    if (ClientInstance.WaConnect) await ClientInstance.WaConnect();

    console.log("✅ Bot started successfully!");

  } catch (error) {
    console.error("❌ Bot Startup Error:", error.message || error);
  }
};

startBot();
