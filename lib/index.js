const connect = require('./connection');  // ✅ Removed extra /lib
const { log } = require('console');

// Start bot connection
connect()
  .then(() => {
    log("💥 Bot started successfully.");
  })
  .catch((error) => {
    log("❌ Bot failed to start:", error);
    process.exit(1);
  });
