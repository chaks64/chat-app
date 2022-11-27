const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        reqired: true,
      },
    },

    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      reqired: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", messageSchema);
