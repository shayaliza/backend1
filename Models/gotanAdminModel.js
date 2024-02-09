const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const GotanAdmin = mongoose.model("gotanAdmin", adminSchema);
module.exports = GotanAdmin;
