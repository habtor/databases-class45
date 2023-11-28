const { MongoClient, ServerApiVersion } = require("mongodb");

const { seedDatabase } = require("./seedDatabase.js");

async function createEpisodeExercise(client) {
  /**
   * We forgot to add the last episode of season 9. It has this information:
   *
   * episode: S09E13
   * title: MOUNTAIN HIDE-AWAY
   * elements: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDUOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"]
   */
  const addedEpisode = {
    EPISODE: "S09E13",
    TITLE: "MOUNTAIN HIDE-AWAY",
    APPLE_FRAME: 0,
    AURORA_BOREALIS: 0,
    BARN: 0,
    BEACH: 0,
    BOAT: 0,
    BRIDGE: 0,
    BUILDING: 0,
    BUSHES: 0,
    CABIN: 0,
    CACTUS: 0,
    CIRCLE_FRAME: 0,
    CIRRUS: 1,
    CLIFF: 0,
    CLOUDS: 1,
    CONIFER: 1,
    CUMULUS: 0,
    DECIDUOUS: 1,
    DIANE_ANDRE: 0,
    DOCK: 0,
    DOUBLE_OVAL_FRAME: 0,
    FARM: 0,
    FENCE: 0,
    FIRE: 0,
    FLORIDA_FRAME: 0,
    FLOWERS: 0,
    FOG: 0,
    FRAMED: 0,
    GRASS: 1,
    GUEST: 0,
    HALF_CIRCLE_FRAME: 0,
    HALF_OVAL_FRAME: 0,
    HILLS: 0,
    LAKE: 0,
    LAKES: 0,
    LIGHTHOUSE: 0,
    MILL: 0,
    MOON: 0,
    MOUNTAIN: 1,
    MOUNTAINS: 1,
    NIGHT: 0,
    OCEAN: 0,
    OVAL_FRAME: 0,
    PALM_TREES: 0,
    PATH: 0,
    PERSON: 0,
    PORTRAIT: 0,
    RECTANGLE_3D_FRAME: 0,
    RECTANGULAR_FRAME: 0,
    RIVER: 1,
    ROCKS: 0,
    SEASHELL_FRAME: 0,
    SNOW: 0,
    SNOWY_MOUNTAIN: 1,
    SPLIT_FRAME: 0,
    STEVE_ROSS: 0,
    STRUCTURE: 0,
    SUN: 0,
    TOMB_FRAME: 0,
    TREE: 1,
    TREES: 1,
    TRIPLE_FRAME: 0,
    WATERFALL: 0,
    WAVES: 0,
    WINDMILL: 0,
    WINDOW_FRAME: 0,
    WINTER: 0,
    WOOD_FRAMED: 0,
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

  // Find the title of episode 2 in season 2 [Should be: WINTER SUN]
  const episodeToFind = await collection.findOne({ EPISODE: "S02E02" });
  console.log(`The title of episode 2 in season 2 is ${episodeToFind.TITLE}`);

  // Find the season and episode number of the episode called "BLACK RIVER" [Should be: S02E06]
  const episodeByTitle = await collection.findOne({ TITLE: "BLACK RIVER" });
  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${episodeByTitle.EPISODE}`
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF [Should be: NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL]
  const cliffPaintEpisode = await collection.find({ CLIFF: 1 });
  console.log(
    `The episodes that Bob Ross painted a CLIFF are ${cliffPaintEpisode.TITLE}`
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE [Should be: NIGHT LIGHT]

  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${"TODO: fill in variable here"}`
  );
}

async function updateEpisodeExercises(client) {
  /**
   * There are some problems in the initial data that was filled in.
   * Let's use update functions to update this information.
   *
   * Note: do NOT change the data.json file
   */

  // Episode 13 in season 30 should be called BLUE RIDGE FALLS, yet it is called BLUE RIDGE FALLERS now. Fix that

  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${"TODO: fill in variable here"} episodes`
  );

  // Unfortunately we made a mistake in the arrays and the element type called 'BUSHES' should actually be 'BUSH' as sometimes only one bush was painted.
  // Update all of the documents in the collection that have `BUSHES` in the elements array to now have `BUSH`
  // It should update 120 episodes!

  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${"TODO: fill in variable here"} episodes`
  );
}

async function deleteEpisodeExercise(client) {
  /**
   * It seems an errand episode has gotten into our data.
   * This is episode 14 in season 31. Please remove it and verify that it has been removed!
   */

  console.log(
    `Ran a command to delete episode and it deleted ${"TODO: fill in variable here"} episodes`
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

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/
