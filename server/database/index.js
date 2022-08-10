//Connect to Mongo database
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// connect to cloud database atlas
const uri = process.env.MONGODB_CONNECT_STRING;

mongoose
  .connect(uri, {
    autoIndex: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(
    () => {
      /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
      console.log("🔗 Connected to PowerDing database. 👍");
    },
    (err) => {
      /** handle initial connection error */
      console.log("⚠️ error connecting to PowerDing database: ");
      console.log(err);
    }
  );

module.exports = mongoose.connection;
