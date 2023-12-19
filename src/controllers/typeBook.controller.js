const { CREATED, SuccessResponse } = require("../core/success.response");
const TypeBookService = require("../services/typeBook.service");

class BookController {
  getAll = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout success",
      metadata: await TypeBookService.getAll(req.params),
    }).send(res);
  };

  createTypeBook = async (req, res, next) => {
    new SuccessResponse({
      message: "Success",
      metadata: await TypeBookService.createTypeBook(req.body),
    }).send(res);
  };

  deleteTypeBook = async (req, res, next) => {
    new SuccessResponse({
      message: "Success",
      metadata: await TypeBookService.deleteTypeBook(req.params),
    }).send(res);
  };

  searchNameBook = async (req, res, next) => {
    console.log(req.body);
    new CREATED({
      message: "Register OK",
      metadata: await BookService.searchNameBook(req.params),
    }).send(res);

    // return res.status(201).json(await AccessService.signUp(req.body))
  };

  searchTypeBook = async (req, res, next) => {
    console.log(req.body);
    new CREATED({
      message: "Register OK",
      metadata: await BookService.searchTypeBook(req.params),
    }).send(res);

    // return res.status(201).json(await AccessService.signUp(req.body))
  };
  updateBook = async (req, res, next) => {
    console.log(req.params);
    new SuccessResponse({
      message: "update book success",
      metadata: await BookService.updateBook(req.body),
    }).send(res);
  };

  updateBookQuantity = async (req, res, next) => {
    console.log(req.params);
    new SuccessResponse({
      message: "update book success",
      metadata: await BookService.updateBookQuantity(req.body),
    }).send(res);
  };
}

module.exports = new BookController();
