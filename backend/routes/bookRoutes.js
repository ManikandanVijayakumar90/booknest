const express = require("express");

const { searchBooks, getBookById } = require("../controllers/bookController");

const router = express.Router();

router.get("/search", searchBooks);
router.get("/:id", getBookById);

module.exports = router;
