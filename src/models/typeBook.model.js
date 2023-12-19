const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model

const DOCUMENT_NAME = "typeBook";
const COLLECTION_NAME = "typeBooks";

var bookSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    type_Book: {
      type: String,
      unique: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, bookSchema);
