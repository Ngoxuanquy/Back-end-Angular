const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { createTokenPair, verifyJWT } = require("../auth/authUtils");
const bookModel = require("../models/book.model");
const KeyTokenService = require("./keyToken.service");
const { getInfoData } = require("../utils");
const {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
} = require("../core/error.response");
const { findByEmail } = require("./shop.service");

class BookService {
  static getAll = async ({ page }) => {
    try {
      const pageSize = 20; // Number of items per page
      const skip = (page - 1) * pageSize; // Calculate the number of items to skip

      const allData = await bookModel.find({}).skip(skip).limit(pageSize);
      console.log("All data:", allData);

      return allData;
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
      throw error;
    }
  };

  static deleteBook = async ({ bookId }) => {
    try {
      const allData = await bookModel.deleteOne({
        _id: bookId,
      });
      console.log("All data:", allData);
      return allData;
    } finally {
    }
  };

  static searchNameBook = async ({ textSearch }) => {
    try {
      const regex = new RegExp(textSearch, "i");

      // Sử dụng `find` trực tiếp mà không cần chuyển đổi thành mảng bằng `toArray`
      const results = await bookModel
        .find({ name_book: { $regex: regex } })
        .exec();

      console.log(results);
      return results;
    } catch (error) {
      console.error(error);
    }
  };

  static searchTypeBook = async ({ textSearch }) => {
    try {
      const regex = new RegExp(textSearch, "i");

      // Sử dụng `find` trực tiếp mà không cần chuyển đổi thành mảng bằng `toArray`
      const results = await bookModel.find({ type: { $regex: regex } }).exec();

      console.log(results);
      return results;
    } catch (error) {
      console.error(error);
    }
  };

  static async updateBook({ id, name_book, original_number, type }) {
    const query = { _id: id };
    const updateSet = {
      $set: {
        name_book,
        original_number,
        type,
      },
    };
    const updateCart = await bookModel.updateOne(query, updateSet);

    return updateCart;
  }

  static async updateBookQuantity({ id, quantity }) {
    const query = { _id: id };

    // Tìm thông tin sách
    const existingBook = await bookModel.findOne(query);

    console.log({ existingBook });

    if (!existingBook) {
      // Xử lý trường hợp không tìm thấy sách với id cung cấp
      return { success: false, message: "Book not found." };
    }

    // Cập nhật số lượng
    const updatedQuantity = existingBook.number_of_remaining - quantity;

    console.log({ updatedQuantity });

    // Cập nhật thông tin sách với số lượng mới
    const updateSet = {
      $set: {
        number_of_remaining: Number(updatedQuantity),
      },
    };

    // Thực hiện cập nhật
    const updateCart = await bookModel.updateOne(query, updateSet);

    return updateCart;
  }

  static createBook = async ({
    name_book,
    type,
    number_of_remaining,
    original_number,
  }) => {
    try {
      const newShop = await bookModel.create({
        name_book,
        type,
        number_of_remaining,
        original_number,
      });

      return {
        books: getInfoData([
          "name_book",
          "type",
          "number_of_remaining",
          "original_number",
        ]),
      };
    } catch (error) {
      return {
        code: "xxx",
        msg: error.message,
        status: "error",
      };
    }
  };
}

module.exports = BookService;
