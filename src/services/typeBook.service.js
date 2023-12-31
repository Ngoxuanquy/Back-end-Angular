const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { createTokenPair, verifyJWT } = require("../auth/authUtils");
const type_BookModel = require("../models/typeBook.model");
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

      const allData = await type_BookModel.find({}).skip(skip).limit(pageSize);
      console.log("All data:", allData);

      return allData;
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
      throw error;
    }
  };

  static deleteTypeBook = async ({ typeId }) => {
    try {
      const allData = await type_BookModel.deleteOne({
        _id: typeId,
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
      const results = await type_BookModel
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
      const results = await type_BookModel
        .find({ type: { $regex: regex } })
        .exec();

      console.log(results);
      return results;
    } catch (error) {
      console.error(error);
    }
  };

  static async updateBook({ id, name_book, number_of_remaining, type }) {
    const query = { _id: id };
    const updateSet = {
      $set: {
        name_book,
        number_of_remaining,
        type,
      },
    };
    const updateCart = await type_BookModel.updateOne(query, updateSet);

    return updateCart;
  }

  static async updateBookQuantity({ id, quantity }) {
    const query = { _id: id };

    // Tìm thông tin sách
    const existingBook = await type_BookModel.findOne(query);

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
    const updateCart = await type_BookModel.updateOne(query, updateSet);

    return updateCart;
  }

  static createTypeBook = async ({ name_type }) => {
    try {
      const newShop = await type_BookModel.create({
        type_Book: name_type,
      });

      return {
        books: newShop,
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
