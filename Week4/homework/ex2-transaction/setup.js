const { MongoClient } = require("mongodb");
require("dotenv").config();

async function createAccounts() {
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    
    const database = client.db("bank");
    const accountsCollection = database.collection("accounts");

    // delete acounts first
    await accountsCollection.deleteMany({});

    const accounts = [
      {
        account_number: 101,
        balance: 4000,
        account_changes: [
          {
            change_number: 1,
            amount: 1000,
            changed_date: new Date(),
            remark: "Deposit",
          },
        ],
      },
      {
        account_number: 102,
        balance: 5000,
        account_changes: [
          {
            change_number: 1,
            amount: 1000,
            changed_date: new Date(),
            remark: "Withdraw",
          },
        ],
      },
      {
        account_number: 103,
        balance: 2500,
        account_changes: [
          {
            change_number: 1,
            amount: 120,
            changed_date: new Date(),
            remark: "Deposit",
          },
        ],
      },
    ];

    // insert accounts details
    await accountsCollection.insertMany(accounts);
    console.log("Sample accounts inserted");
  } catch (error) {
    console.error("Error during setup:", error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

module.exports = createAccounts;
