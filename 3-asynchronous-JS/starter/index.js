const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        return reject('I could not find that file 😢');
      }
      resolve(data.trim());
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file 😢');
      resolve('Success!');
    });
  });
};

// Using async/await to handle asynchronous operations\
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      'https://dog.ceo/api/breed/' + data + '/images/random'
    );
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log(err.message);
    throw err; // Re-throw the error to be caught by the outer catch
  }
  return '2: Ready 🐶';
};

(async () => {
    try {
        console.log('1: Will get dog pics! 🐶');
        const x = await getDogPic();
        console.log(x); // Now x contains the resolved value of the promise
        console.log('3: Done getting dog pics! 🐶')
        } catch (err) {
            console.log('Error máximus🐶'
            );
    }
})();

/*
console.log('1: Will get dog pics! 🐶');
// const x = getDogPic();
// console.log(x); //o x aqui ainda é uma promise, não é o resultado final. tínhamos que ter a função toda rodada para quando ativassemos o x ele aparece-se, como não é o caso ñão aparece
// console.log('3: Done getting dog pics! 🐶');


//Para conseguir o raciocinio pretendido acima temos que tratar a função async como promise
//Vejamos abaixo
getDogPic().then(x => {
    console.log(x);
    console.log('3: Done getting dog pics! 🐶');
}).catch((err) => {
    console.log('Error 🐶');
    console.log(err.message);//Isto nunca apanharia um erro, porque o promise foi bem sucedido. para apanhar tem ser throw dentro da função acima
});

/*
const writeFilePro = (file, data) => {
    return newPromite((resolve,reject) => {
        fs.writeFile(file, data, err =>{
            if (err) reject('Could not write file 😢');
            resolve('Success!');
        }))
}


readFilePro(`${__dirname}/dog.txt`)then(data => {
    console.log(`Breed ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images`)
    .then((res) => {
      if (err) {
        return console.log(err.message);
      }
      console.log(res.body.message[0]);
      console.log(Math.floor(Math.random() * 100));

      fs.writeFile(
        'dog-img.txt',
        res.body.message[Math.floor(Math.random() * 100)],
        (err) => {
          console.log('Random dog image saved to file!');
        }
      );
    })
    .catch((err) => {
      console.log(err.message);
    });
});


*/
