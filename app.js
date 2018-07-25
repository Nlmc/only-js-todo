const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const {
  saveData,
  deleteData,
  updateData,
  getAll,
} = require('./module');

app.use(express.static('src'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/todo', (req, res) => {
  res.send(getAll());
});

app.post('/todo', (req, res) => {
  const { value } = req.body;
  const id = saveData(value);
  res.send({ id });
});

app.delete('/todo', (req, res) => {
  const { id } = req.body;
  deleteData(id);
  res.sendStatus(200);
});

app.put('/todo', (req, res) => {
  const { done, value, id } = req.body;
  updateData(done, value, id);
  res.send({ id });
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
