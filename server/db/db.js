const mongoose = require("mongoose");

class MongoSingleton {
  static mongoClient;

  static isInitialized() {
    return this.mongoClient !== undefined;
  }

  static getClient() {
    if (this.isInitialized()) return this.mongoClient;

    // Initialize the connection.
    this.mongoClient = mongoose.connect(process.env.dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return this.mongoClient;
  }
}

MongoSingleton.getClient();
