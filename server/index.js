const axios = require("axios");

const baseUrl = "http://localhost:3333/api/transactions";

const createTransaction = async (idempotencyId, amount, type) => {
  try {
    const response = await axios.post(baseUrl, { idempotencyId, amount, type });
    console.log("Transação criada:", response.data);
  } catch (error) {
    console.error(
      "Erro ao criar transação:",
      error.response ? error.response.data : error.message
    );
  }
};

const createTestTransactions = async () => {
  for (let i = 0; i < 100; i++) {
    const idempotencyId = `id${i}`;
    const amount = Math.floor(Math.random() * 100) + 1;
    const type = i % 2 === 0 ? "credit" : "debit";

    await createTransaction(idempotencyId, amount, type);
  }
};

createTestTransactions();
