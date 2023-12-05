const createAccounts = require("./setup");
const transferMoney = require("./transfer");

createAccounts()
  .then(() => {
    return transferMoney(101, 102, 1000, "transfer");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
