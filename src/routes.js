const express = require("express");
const {
  createTransaction,
  listTransactions,
} = require("./controllers/transactionsController");

const router = express.Router();

router.post("/transactions", createTransaction);

router.get("/transactions", listTransactions);

module.exports = router;
