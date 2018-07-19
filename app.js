const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const { getData, saveData, deleteData, updateData, updateStatus, getAll } = require('./module');

app.use(express.static('src'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/todo', (req, res) => {
  console.log('route get all');
  //console.log(getAll());
  res.send(getAll());
});

app.post('/todo', (req, res) => {
  const { value } = req.body;
  const id = saveData(value);
  res.send({id});
});

app.delete('/todo', (req, res) => {
  console.log('Put route works !');
  const { id } = req.body;
  console.log(id);
  deleteData(id);
  res.sendStatus(200);
});

app.put('/todo', (req, res) => {
  console.log(req.body);
  const { done, value , id } = req.body
  updateData(done, value, id);
  res.send({id});
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
