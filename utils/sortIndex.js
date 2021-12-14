/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 Taras Mazepa. Contact address: taras@maze.pa .
 */
var myJsonAbc = require("jsonabc");
var firebaseIndex = require("../firestore.indexes.json");
const fs = require("fs");
var sorted = myJsonAbc.sortObj(firebaseIndex);

try {
  fs.writeFileSync("firestore.indexes.json", JSON.stringify(sorted), "utf8");
  console.log("Finished sorting firestore.indexes.json");
} catch (err) {
  console.err(
    "An error has ocurred when saving the firestore.indexes.json.",
    err
  );
}
