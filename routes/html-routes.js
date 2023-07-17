const router = require('express').Router();
const path = require('path');

// serve the index.html file
router.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '../public/index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error serving index.html.');
    }
  });
});

// serve the notes.html file
router.get('/notes', (req, res) => {
  const notesPath = path.join(__dirname, '../public/notes.html');
  res.sendFile(notesPath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error serving notes.html.');
    }
  });
});

module.exports = router;
