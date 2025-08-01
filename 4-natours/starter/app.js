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

app.get('/api/v1/tours/:id', (req, res) => {


  console.log(req.params);
  const id = req.params.id * 1; //Converting to number
  console.log(id);
  //// ...PARA A FUNÇÃO ABAIXO

  // A função find recebe uma callback function como argumento.
  // Uma callback function é uma função passada como parâmetro para outra função, que será chamada (executada) dentro da função principal.
  // Neste caso, para cada elemento do array tours, a função find executa a callback function: el => el.id === req.params
  // - 'el' representa o elemento atual do array tours em cada iteração.
  // - 'el.id' é o id do elemento atual.
  // - 'req.params' deveria ser 'req.params.id' para comparar corretamente o id do tour com o parâmetro da requisição.
  // A função find retorna o primeiro elemento para o qual a callback retorna true.
  // Exemplo passo a passo:
  //   1ª iteração: el = tours[0], verifica se tours[0].id === req.params
  //   2ª iteração: el = tours[1], verifica se tours[1].id === req.params
  //   ...até encontrar um elemento que satisfaça a condição.
  // O resultado é atribuído à variável 'tours', mas isso pode causar confusão, pois tours era um array e agora será um único objeto ou undefined.
  // Recomenda-se usar outro nome, como 'tour'.

  // Correção sugerida:
  // const tour = tours.find(el => el.id === req.params.id);

  // ...existing
  const tour = tours.find((el) => el.id === id);
  console.log(tour);
  if (!tour) {
    return res.status(404).json({
      status: '404',
      message: 'Invalid Id',
    });
  }
  //(req,res) => é o que vem do cliente, e o que é enviado de volta para o cliente, tipicamente chamamos de route handler
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    data: {
      tours: tour,
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
app.patch("/api/v1/tours/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(404).json({
      status: '404',
      message: 'Invalid Id',
    });
  }
  const id = req.params.id * 1; //Converting to number
  //recolher o input vindo do client
  console.log(req.body);
  //encontrar o tour que tem o id igual ao id do parametro
  const tour = tours.find((el) => el.id === id);
  console.log(tour);
  //substituir apenas a tour selecionada
  if (!tour) {
    return res.status(404).json({
      status: '404',
      message: 'Invalid Id',
    });
  }
  //atualizar o tour
  // Esta linha copia todas as propriedades do objeto req.body para o objeto tour existente,
  // sobrescrevendo (atualizando) quaisquer propriedades de tour que também existam em req.body.
  // O método Object.assign modifica o objeto tour original, não cria um novo objeto.
  // Exemplo: se req.body = { name: "Novo Nome" }, então tour.name será atualizado para "Novo Nome".
  const updatedTour = Object.assign(tour, req.body); //
  console.log(updatedTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: updatedTour,
        },
      });
    }
  );
});

app.delete("/api/v1/tours/:id", (req,res) => {

  const id = req.params.id * 1; //Converting to number
  //Identificar o objeto com o id que é para eliminar
  // Supondo que 'tours' é um array de objetos, cada um com uma propriedade 'id'.
  // Exemplo: [{id: 1, nome: 'Tour A'}, {id: 2, nome: 'Tour B'}, ...]

  // O método findIndex procura o índice do primeiro elemento que satisfaz a condição dada.
  // 'el' representa cada elemento do array durante a iteração.
  // 'el => el.id === id' é uma arrow function que retorna true se o id do elemento for igual ao id procurado.
  const index = tours.findIndex((el) => el.id === id);
  console.log(index);
  // O método splice remove elementos do array.
  // O primeiro argumento é o índice inicial para remoção (aqui, o índice encontrado).
  // O segundo argumento é o número de elementos a remover (aqui, 1 elemento).
  tours.splice(index, 1);
  tours.forEach((tour, idx) => {
    tour.id = idx;
  });
  if (index === -1){
    return res.status(404).json({
      status: '404',
      message: 'Invalid Id',
    });
  }
  //Eliminar o objeto com o ID e orientar a ordem dos outros
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(204).json({
        status: 'success',
        data: null,
        message : "Apagado com sucesso",
      });
    }
  );
});


app.listen(port, () => {
  //initializing the server, listening
  console.log(`Server is running on port ${port}...`);
});
