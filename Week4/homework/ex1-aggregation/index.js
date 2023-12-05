const { MongoClient } = require("mongodb");
require("dotenv").config();

const totalPopulationOfCountryPerYear = async (client, countryName) => {
  const db = client.db("week4");
  const collection = db.collection("people");

  const query = [
    { $match: { Country: countryName } },
    {
      $group: {
        _id: "$Year",
        totalPopulation: { $sum: { $add: ["$M", "$F"] } },
      },
    },
  ];

  const result = await collection.aggregate(query).toArray();
  console.log(result);
};

const continentsPopulation = async (client, givenYear, givenAge) => {
  const db = client.db("week4");
  const collection = db.collection("people");

  const continents = [
    "AFRICA",
    "ASIA",
    "EUROPE",
    "LATIN AMERICA AND THE CARIBBEAN",
    "NORTHERN AMERICA",
    "OCEANIA",
  ];

  const query = [
    {
      $match: {
        Age: givenAge,
        Country: { $in: continents },
        Year: givenYear,
      },
    },
    {
      $project: {
        Country: 1,
        Year: 1,
        Age: 1,
        M: 1,
        F: 1,
        totalPopulation: { $add: ["$M", "$F"] },
      },
    },
  ];

  const result = await collection.aggregate(query).toArray();

  console.log(result);
};

async function main() {
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    await totalPopulationOfCountryPerYear(client, "Netherlands");
    await continentsPopulation(client, 2020, "20-24");
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();
