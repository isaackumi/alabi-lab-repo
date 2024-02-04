const mongoose = require("mongoose");
const validator = require("validator");

const ipSchema = mongoose.Schema({
  originalIP: {
    type: String,
    required: [true, "original IP is required"],
    trim: true,
    unique: true
  },
  slug: String,
  reversedIP: {
    type: String,
    required: [true, "Reversed IP is required"],
    trim: true,
    unique: true

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// set index on title field
ipSchema.index({
  originalIP: "text",
});


module.exports = mongoose.model("ipSchema", ipSchema);
