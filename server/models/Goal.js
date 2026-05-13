const mongoose = require(
  "mongoose"
);

const goalSchema =
  new mongoose.Schema({

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    saved: {
      type: Number,
      required: true,
    },

    target: {
      type: Number,
      required: true,
    },

  });

module.exports =
  mongoose.model(
    "Goal",
    goalSchema
  );