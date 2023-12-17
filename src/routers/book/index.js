const express = require('express');
const { authentication, authenticationV2 } = require('../../auth/authUtils');
const bookController = require('../../controllers/book.controller');
const asyncHandler = require('../../helpers/asyncHandle');

const router = express.Router();

router.use(authenticationV2);

router.get('/getAll/:page', asyncHandler(bookController.getAll));
router.get(
    '/searchNameBook/:textSearch',
    asyncHandler(bookController.searchNameBook),
);
router.get(
    '/searchTypeBook/:textSearch',
    asyncHandler(bookController.searchTypeBook),
);

router.post('/createBook', asyncHandler(bookController.createBook));
router.delete('/deleteBook/:bookId', asyncHandler(bookController.deleteBook));

router.post('/updateBook', asyncHandler(bookController.updateBook));

// authentication

module.exports = router;
