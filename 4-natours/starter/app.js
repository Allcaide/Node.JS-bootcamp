const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  //req é o que vem do post, get, put delete, url, params, query etc. res é o que é enviado de cá do lado para o cliente ver, como respostas simples, json ou codigos de erros
  res
    .status(200)
    .json({ message: 'Hello form the server side', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
});

app.listen(port, () => {
  //initializing the server, listening
  console.log(`Server is running on port ${port}...`);
});
