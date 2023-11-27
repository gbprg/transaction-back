const express = require("express");
const { dynamoDB, sqs } = require("../data/db");

const { v4: uuid } = require("uuid");

const router = express.Router();

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

  const sqsParams = {
    QueueUrl:
      "https://sqs.sa-east-1.amazonaws.com/276532913777/myTransaction-queue",
    MessageBody: JSON.stringify(transaction),
  };

  const dynamoDBParams = {
    TableName: "transactions",
    Item: transaction,
  };

  try {
    // Enviar para SQS
    await sqs.sendMessage(sqsParams).promise();

    // Inserir no DynamoDB
    await dynamoDB.put(dynamoDBParams).promise();

    res
      .status(201)
      .json({ message: "Transação criada com sucesso.", transaction });
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    res.status(500).json({ error: "Erro ao criar transação." });
  }
});

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

module.exports = router;
