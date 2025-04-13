const mongoose = require("mongoose");

const KaijuSchema = new mongoose.Schema({
  picture: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  threatForHumanity: {
    type: String,
    required: true,
  },
  threatForEarth: {
    type: String,
    required: true,
  },
  powers: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
});

const KaijuModel = mongoose.model("kaijus", KaijuSchema);
module.exports = KaijuModel;