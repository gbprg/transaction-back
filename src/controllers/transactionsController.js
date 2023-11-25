const express = require("express");
const dynamoDB = require("../data/db");

const { v4: uuid } = require("uuid");

const router = express.Router();
router.get("/transactions", async (req, res) => {
  const params = {
    TableName: "transactions",
  };
  try {
    const { Items } = await dynamoDB.scan(params).promise();
    res.json(Items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao buscar transações." });
  }
});

router.post("/transactions", async (req, res) => {
  const { amount, type } = req.body;
  if (!type || !amount) {
    return res
      .status(400)
      .json({ error: "Tipo e valor são campos obrigatórios." });
  }

  const transaction = {
    idempotencyId: uuid(),

    amount: amount,
    type: type,
  };

  const params = {
    TableName: "transactions",
    Item: transaction,
  };
  try {
    await dynamoDB.put(params).promise();
    res
      .status(201)
      .json({ message: "Transação criada com sucesso.", transaction });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao criar transação." });
  }
});
module.exports = router;
