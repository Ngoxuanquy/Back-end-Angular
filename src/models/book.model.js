const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model

const DOCUMENT_NAME = 'Book';
const COLLECTION_NAME = 'Books';

var bookSchema = new mongoose.Schema(
    {
        name_book: {
            type: String,
            trim: true,
            maxLength: 150,
        },
        type: {
            type: String,
            unique: true,
        },
        number_of_remaining: {
            type: Number,
            required: true,
        },
        original_number: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, bookSchema);
