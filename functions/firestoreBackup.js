/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 Taras Mazepa. Contact address: taras@maze.pa .
 */
const functions = require("firebase-functions");
const firestore = require("@google-cloud/firestore");
const client = new firestore.v1.FirestoreAdminClient();
const config = functions.config();

const backupData = async () => {
  try {
    if (!config?.backup?.bucket) {
      throw new Error(
        "Please put bucket name in enviroment-config.json and .runtimeconfig.json and run npm run init [your instance name]"
      );
    }
    const bucket = `gs://${config.backup.bucket}`;
    const projectId = await client.getProjectId();
    const databaseName = client.databasePath(projectId, "(default)");

    let response = await client.exportDocuments({
      name: databaseName,
      outputUriPrefix: bucket,
      collectionIds: [],
    });

    if (response) {
      console.log("Backup Operation succesfully executed");
    }
  } catch (err) {
    console.log(err, "Data backup failed");
  }
};

exports.scheduledFirestoreExport = functions.pubsub
  .schedule("every 24 hours")
  .onRun(() => {
    backupData();
  });

exports.backupData = backupData;
