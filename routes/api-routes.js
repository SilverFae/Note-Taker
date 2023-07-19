const express = require('express');
const util = require('util');
const fs = require('fs');

const router = express.Router();
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

//middleware to parse our incoming JSON data
router.use(express.json());

//get all notes
router.get("/notes", async (req, res) => {
  try {
    // reading the file and storing the data in a variable
    const data = await readFileAsync("db/db.json", "utf8");
    // parsing the data to an array
    const noteData = JSON.parse(data);
    res.json(noteData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error reading notes.");
  }
});

//creates a note
router.post("/notes", async (req, res) => {
  try {
    const data = await readFileAsync("db/db.json", "utf8");
    let noteData = JSON.parse(data);

    // adding the new note to the array
    let newNote = req.body;
    // setting the id of the new note to be one more than the id of the last note
    let presentId = noteData.length;
    // setting the id of the new note
    newNote.id = presentId + 1;

    // pushing the new note to the array
    noteData.push(newNote);
    // converting the array back to JSON
    noteData = JSON.stringify(noteData);

    //writing the updated data to file
    await writeFileAsync("db/db.json", noteData);
    console.log("Note added");
    //responding with the new added note
    res.json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding note.");
  }
});

//deletes a note
router.delete("/notes/:id", async (req, res) => {
  const usId = parseInt(req.params.id);
  try {
    const data = await readFileAsync("db/db.json", "utf8");
    let noteData = JSON.parse(data);
    // looping through the array to find the note with the id
    for (let i = 0; i < noteData.length; i++) {
      if (usId === noteData[i].id) {
        //remove the note that matches the id
        noteData.splice(i, 1);
        break;
      }
    }
    //converting note into an array back to JSON
    noteData = JSON.stringify(noteData);

    //writing updated data to the file
    await writeFileAsync("db/db.json", noteData);
    console.log("Note deleted");
    // status 204 means that a request has succeeded, but client does not need to go to a different page
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting note.");
  }
});

module.exports = router;
