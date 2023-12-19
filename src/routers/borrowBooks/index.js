const express = require("express");
const { authentication, authenticationV2 } = require("../../auth/authUtils");
const borrowBooksController = require("../../controllers/borrowBooks.controller");
const asyncHandler = require("../../helpers/asyncHandle");

const router = express.Router();

router.use(authenticationV2);

router.get("/getAll/:page", asyncHandler(borrowBooksController.getAll));
router.get(
  "/searchNameBook/:textSearch",
  asyncHandler(borrowBooksController.searchNameBook)
);
router.get(
  "/searchTypeBook/:textSearch",
  asyncHandler(borrowBooksController.searchTypeBook)
);

router.get(
  "/searchNameUser/:textSearch",
  asyncHandler(borrowBooksController.searchNameUser)
);

router.post(
  "/createBorrowBook",
  asyncHandler(borrowBooksController.createBorrowBook)
);
router.delete(
  "/deleteBook/:bookId",
  asyncHandler(borrowBooksController.deleteBook)
);

router.post(
  "/updateTraSach",
  asyncHandler(borrowBooksController.updateTraSach)
);

// authentication

module.exports = router;
