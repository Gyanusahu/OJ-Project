// cleanup.js

const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

// Paths to clean
const codesDir = path.join(__dirname, "codes");
const outputsDir = path.join(__dirname, "outputs");

// Helper to delete files older than 1 hour
const cleanDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) return;

  const now = Date.now();
  const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);

    try {
      const { mtimeMs } = fs.statSync(filePath); // last modified time

      if (now - mtimeMs > oneHour) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted: ${filePath}`);
      }
    } catch (err) {
      console.error(`⚠️ Failed to delete: ${filePath}`, err.message);
    }
  });
};

// Run every hour at minute 0
cron.schedule("0 * * * *", () => {
  console.log("🧹 Starting cleanup cron job...");
  cleanDirectory(codesDir);
  cleanDirectory(outputsDir);
});

console.log("🕒 Cleanup cron job initialized.");
