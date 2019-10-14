const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unicornSchema = new Schema({
  name: { type: String },
  color: { type: String },
  location: { type: String },
  favoriteFood: { type: String }
});

const Unicorn = mongoose.model("Unicorn", unicornSchema);

module.exports = Unicorn;
