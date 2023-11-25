const AWS = require("aws-sdk");

AWS.config.update({
  region: "sa-east-1",
  accessKeyId: "AKIAUAYVFMZYW42N3KU6",
  secretAccessKey: "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",
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
module.exports = dynamoDB;
