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
    const data = await readFileAsync("db/db.json", "utf8");
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

    let newNote = req.body;
    let presentId = noteData.length;

    newNote.id = presentId + 1;

    noteData.push(newNote);
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
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting note.");
  }
});

module.exports = router;
