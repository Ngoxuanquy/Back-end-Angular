const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model

const DOCUMENT_NAME = "borrowBook";
const COLLECTION_NAME = "borrowBooks";

var bookSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
    },
    name_book: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    type: {
      type: String,
      // unique: true,
    },
    use_name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    borrowed_Day: {
      type: Date,
      default: new Date(),
    },
    status: {
      type: String,
      enum: ["Đang mượn", "Đã trả"],
      default: "Đang mượn",
    },
    payDay: {
      type: Date,
      //   required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, bookSchema);
