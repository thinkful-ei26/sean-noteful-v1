'use strict';

const express = require('express');
// Load array of notes
const data = require('./db/notes');
const app = express();
const {PORT} = require('./config');
const {requestLogger} = require('./middleware/logger.js');

// console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

app.use(express.static('public'));

app.use(requestLogger);

app.get('/api/notes', (req, res) => {
  let notesList = [...data];
  if (req.query.searchTerm) {
    notesList = notesList.filter(note => note.title.includes(req.query.searchTerm));
  }
  res.json(notesList);
});
app.get('/api/notes/:id', (req, res) => res.json(data.find(note => note.id === Number(req.params.id))));

app.use((req, res) => {
  let err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({message: 'Not Found'});
});
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({message: err.message, error: err});
});

app.listen(PORT, function() {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => console.error(err));
