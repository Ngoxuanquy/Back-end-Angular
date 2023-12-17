const { CREATED, SuccessResponse } = require('../core/success.response');
const BookService = require('../services/book.service');

class BookController {
    getAll = async (req, res, next) => {
        new SuccessResponse({
            message: 'Logout success',
            metadata: await BookService.getAll(req.params),
        }).send(res);
    };

    createBook = async (req, res, next) => {
        new SuccessResponse({
            message: 'Success',
            metadata: await BookService.createBook(req.body),
        }).send(res);
    };

    deleteBook = async (req, res, next) => {
        new SuccessResponse({
            message: 'Success',
            metadata: await BookService.deleteBook(req.params),
        }).send(res);
    };

    searchNameBook = async (req, res, next) => {
        console.log(req.body);
        new CREATED({
            message: 'Register OK',
            metadata: await BookService.searchNameBook(req.params),
        }).send(res);

        // return res.status(201).json(await AccessService.signUp(req.body))
    };

    searchTypeBook = async (req, res, next) => {
        console.log(req.body);
        new CREATED({
            message: 'Register OK',
            metadata: await BookService.searchTypeBook(req.params),
        }).send(res);

        // return res.status(201).json(await AccessService.signUp(req.body))
    };
    updateBook = async (req, res, next) => {
        console.log(req.params);
        new SuccessResponse({
            message: 'update book success',
            metadata: await BookService.updateBook(req.body),
        }).send(res);
    };
}

module.exports = new BookController();
