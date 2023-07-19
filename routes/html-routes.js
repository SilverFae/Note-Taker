const router = require('express').Router();
const path = require('path');

// serve the index.html file
router.get('/', (req, res) => {
  // path to the index.html file
  const indexPath = path.join(__dirname, '../public/index.html');
  // send the index.html file
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error serving index.html.');
    }
  });
});

// serve the notes.html file
router.get('/notes', (req, res) => {
  // path to the notes.html file
  const notesPath = path.join(__dirname, '../public/notes.html');
  // send the notes.html file
  res.sendFile(notesPath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error serving notes.html.');
    }
  });
});

module.exports = router;
