const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const { seedDatabase } = require("./seedDatabase.js");

async function createEpisodeExercise(client) {
 
  const addedEpisode = {
    EPISODE: "S09E13",
    TITLE: "MOUNTAIN HIDE-AWAY",
    ELEMENTS: [
      "CIRRUS",
      "CLOUDS",
      "CONIFER",
      "DECIDUOUS",
      "GRASS",
      "MOUNTAIN",
      "MOUNTAINS",
      "RIVER",
      "SNOWY_MOUNTAIN",
      "TREE",
      "TREES",
    ],
  };

  const result = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .insertOne(addedEpisode);

  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`
  );
}

async function findEpisodesExercises(client) {
  const database = client.db("databaseWeek3");
  const collection = database.collection("bob_ross_episodes");

  const episodeToFind = await collection.findOne({ episode: "S02E02" });
  console.log(`The title of episode 2 in season 2 is ${episodeToFind.title}`);

  const episodeByTitle = await collection.findOne({ title: "BLACK RIVER" });
  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${episodeByTitle.episode}`
  );

  const episodesWithCliff = await collection
    .find({ elements: "CLIFF" })
    .toArray();

  const cliffEpisodes = episodesWithCliff.map((episode) => episode.title);
  console.log(
    `The episodes that Bob Ross painted a CLIFF are ${cliffEpisodes}`
  );

  const episodesWithCliffAndLighthouse = await collection
    .find({
      elements: { $all: ["CLIFF", "LIGHTHOUSE"] },
    })
    .toArray();

  const cliffAndLighthouseEpisode = episodesWithCliffAndLighthouse.map(
    (episode) => episode.title
  );

  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffAndLighthouseEpisode}`
  );
}

async function updateEpisodeExercises(client) {
  const database = client.db("databaseWeek3");
  const collection = database.collection("bob_ross_episodes");

  const updateOne = await collection.updateOne(
    { episode: "S30E13" },
    { $set: { title: "BLUE RIDGE FALLS" } }
  );

  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${updateOne.modifiedCount} episodes`
  );

  const updateMany = await collection.updateMany(
    { elements: "BUSHES" },
    { $set: { "elements.$": "BUSH" } }
  );

  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${updateMany.modifiedCount} episodes`
  );
}

async function deleteEpisodeExercise(client) {
  const database = client.db("databaseWeek3");
  const collection = database.collection("bob_ross_episodes");

  const result = await collection.deleteOne({ episode: "S31E14" });
  console.log(
    `Ran a command to delete episode and it deleted ${result.deletedCount} episodes`
  );
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();

