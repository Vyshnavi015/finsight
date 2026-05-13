const mongoose = require("mongoose");

const transactionSchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      default: "manual",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

  });

const Transaction =
  mongoose.model(
    "Transaction",
    transactionSchema
  );

module.exports = Transaction;