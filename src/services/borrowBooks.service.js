const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { createTokenPair, verifyJWT } = require("../auth/authUtils");
const borrowBooksModel = require("../models/borrowBooks.model");
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

      const allData = await borrowBooksModel
        .find({})
        .skip(skip)
        .limit(pageSize);
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
      const allData = await borrowBooksModel.deleteOne({
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
      const results = await borrowBooksModel
        .find({ name_book: { $regex: regex } })
        .exec();

      console.log(results);
      return results;
    } catch (error) {
      console.error(error);
    }
  };

  static searchNameUser = async ({ textSearch }) => {
    try {
      const regex = new RegExp(textSearch, "i");

      // Sử dụng `find` trực tiếp mà không cần chuyển đổi thành mảng bằng `toArray`
      const results = await borrowBooksModel
        .find({ use_name: { $regex: regex } })
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
      const results = await borrowBooksModel
        .find({ type: { $regex: regex } })
        .exec();

      console.log(results);
      return results;
    } catch (error) {
      console.error(error);
    }
  };

  static async updateTraSach({ id }) {
    const query = { _id: id };
    const updateSet = {
      $set: {
        payDay: new Date(),
        status: "Đã trả",
      },
    };
    const updateCart = await borrowBooksModel.updateOne(query, updateSet);

    return updateCart;
  }

  static createBorrowBook = async ({
    bookId,
    name_book,
    type,
    use_name,
    paymentDate,
    status,
    payDay,
    phone_number,
  }) => {
    try {
      const newShop = await borrowBooksModel.create({
        bookId,
        name_book,
        type,
        paymentDate,
        use_name,
        status,
        payDay,
        phone_number,
      });

      console.log({
        name_book,
        type,
        use_name,
        paymentDate,
        status,
        payDay,
        phone_number,
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
