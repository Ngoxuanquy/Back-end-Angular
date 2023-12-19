const { CREATED, SuccessResponse } = require("../core/success.response");
const BorrowBooksService = require("../services/borrowBooks.service");

class BookController {
  getAll = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout success",
      metadata: await BorrowBooksService.getAll(req.params),
    }).send(res);
  };

  createBorrowBook = async (req, res, next) => {
    new SuccessResponse({
      message: "Success",
      metadata: await BorrowBooksService.createBorrowBook(req.body),
    }).send(res);
  };

  deleteBook = async (req, res, next) => {
    new SuccessResponse({
      message: "Success",
      metadata: await BorrowBooksService.deleteBook(req.params),
    }).send(res);
  };

  searchNameBook = async (req, res, next) => {
    console.log(req.body);
    new CREATED({
      message: "Register OK",
      metadata: await BorrowBooksService.searchNameBook(req.params),
    }).send(res);

    // return res.status(201).json(await AccessService.signUp(req.body))
  };

  searchTypeBook = async (req, res, next) => {
    console.log(req.body);
    new CREATED({
      message: "Register OK",
      metadata: await BorrowBooksService.searchTypeBook(req.params),
    }).send(res);

    // return res.status(201).json(await AccessService.signUp(req.body))
  };

  searchNameUser = async (req, res, next) => {
    console.log(req.body);
    new CREATED({
      message: "Register OK",
      metadata: await BorrowBooksService.searchNameUser(req.params),
    }).send(res);

    // return res.status(201).json(await AccessService.signUp(req.body))
  };

  updateTraSach = async (req, res, next) => {
    console.log(req.params);
    new SuccessResponse({
      message: "update book success",
      metadata: await BorrowBooksService.updateTraSach(req.body),
    }).send(res);
  };
}

module.exports = new BookController();
