'use strict';

const express = require('express');
// Load array of notes
const data = require('./db/notes');
const app = express();

// console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

app.use(express.static('public'));

app.get('/api/notes', (req, res) => res.json(data));
app.get('/api/notes/:id', (req, res) => {
  res.json(data.find(note => note.id === Number(req.params.id)));
});

app.listen(8080, function() {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => console.error(err));
