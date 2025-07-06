module.exports = {
  // Database connection string
  db: process.env.MONGODB_URI || process.env.DB_CONNECTION || "mongodb://localhost:27017/shopping_list",
};
