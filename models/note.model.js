const mongoose = require("mongoose");

const schema = mongoose.Schema;

const noteSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },

    data: {
      type: String,
      trim: true,
    },
    user: {
      name: { type: String },
      img: { type: String },
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: { type: Array },
    type: {
      type: String,
      required: true,
      enum: ["todo", "progress", "completed"],
    },
  },

  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
