const express = require('express');
const fs = require('fs');
const app = express();

const port = 3000;

// app.get('/', (req, res) => {
//   //req é o que vem do post, get, put delete, url, params, query etc. res é o que é enviado de cá do lado para o cliente ver, como respostas simples, json ou codigos de erros
//   res
//     .status(200)
//     .json({ message: 'Hello form the server side', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

app.get('/api/v1/tours', (req, res) => {
  //(req,res) => é o que vem do cliente, e o que é enviado de volta para o cliente, tipicamente chamamos de route handler
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});
app.listen(port, () => {
  //initializing the server, listening
  console.log(`Server is running on port ${port}...`);
});
