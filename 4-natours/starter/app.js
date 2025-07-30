const express = require('express');
const fs = require('fs');
const app = express();

const port = 3000;

app.use(express.json()); //middleware, que permite que o express entenda o json que vem do cliente, e converte para um objeto javascript

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

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  const newId = tours.length;
  console.log(tours.length);
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.listen(port, () => {
  //initializing the server, listening
  console.log(`Server is running on port ${port}...`);
});
