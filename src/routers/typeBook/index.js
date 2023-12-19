const express = require("express");
const { authentication, authenticationV2 } = require("../../auth/authUtils");
const typeBookController = require("../../controllers/typeBook.controller");
const asyncHandler = require("../../helpers/asyncHandle");

const router = express.Router();

router.use(authenticationV2);

router.get("/getAll/:page", asyncHandler(typeBookController.getAll));
router.get(
  "/searchNameBook/:textSearch",
  asyncHandler(typeBookController.searchNameBook)
);
router.get(
  "/searchTypeBook/:textSearch",
  asyncHandler(typeBookController.searchTypeBook)
);

router.post("/createTypeBook", asyncHandler(typeBookController.createTypeBook));
router.delete(
  "/deleteBook/:bookId",
  asyncHandler(typeBookController.deleteBook)
);

router.post("/updateBook", asyncHandler(typeBookController.updateBook));

router.post(
  "/updateBookQuantity",
  asyncHandler(typeBookController.updateBookQuantity)
);

// authentication

module.exports = router;
