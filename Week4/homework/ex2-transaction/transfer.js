const { MongoClient } = require("mongodb");
require("dotenv").config();

async function transferMoney(fromAccount, toAccount, amount, remark) {
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const database = client.db("bank");
    const accountsCollection = database.collection("accounts");

    // Start a MongoDB session for transaction
    const session = client.startSession();
    session.startTransaction();

    // Update 'from' account balance and add change
    await accountsCollection.updateOne(
      { account_number: fromAccount },
      {
        $inc: { balance: -amount },
        $push: {
          account_changes: {
            $each: [
              {
                change_number: 2,
                amount: -amount,
                changed_date: new Date(),
                remark: `Transferred ${amount} to account ${toAccount}: ${remark}`,
              },
            ],
          },
        },
      },
      { session }
    );

    // Update 'to' account balance and add change
    await accountsCollection.updateOne(
      { account_number: toAccount },
      {
        $inc: { balance: amount },
        $push: {
          account_changes: {
            $each: [
              {
                change_number: 2,
                amount,
                changed_date: new Date(),
                remark: `Received ${amount} from account ${fromAccount}: ${remark}`,
              },
            ],
          },
        },
      },
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    console.log("Transaction committed");
    session.endSession();
  } catch (error) {
    console.error("Error during transfer:", error);
    await session.abortTransaction();
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

module.exports = transferMoney;
