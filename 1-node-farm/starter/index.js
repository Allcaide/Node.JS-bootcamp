const fs = require("fs"); //File System
const http = require("http");
const url = require("url");

const slugify = require('slugify'); //Import slugify for URL-friendly strings

const replaceTemplate = require('../modules/replaceTemplate.js');

/*
//Blocking synchronous way
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
//console.log(textIn);

const textOut = `This is what we know about the avocado : ${textIn}. \n Created on ${Date.now()} \n`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written successfully!");
*/
/*
//Non-blocking asynchronous way
//Unblocking asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("Error reading start.txt:🧨", err);

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your file has been written successfully!");
      });
    });
  });
});
console.log("Reading file..."); //Will appear before the file content due to async nature

//function(err, data1){}
*/
////////////////////
//Tem que ser feito antes do site ir "live" assim é só lido uma vez, e não uma vez cada vez que um user acessa o site

// Função replaceTemplate recebe dois parâmetros: 'temp' (um template de string) e 'product' (um objeto com dados do produto)



const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
//console.log(dataObj);

const slugs = dataObj.map(function (el) {
  return slugify(el.productName, {lower:true});
})

console.log(slugs); //Exibe os slugs gerados para cada produto

console.log(slugify('Fresh Avocados', {lower:true}));

const server = http.createServer((req, res) => {
  //console.log(req.url); //Request object
  //console.log(url.parse(req.url, true)); //URL object
  const { query, pathname } = url.parse(req.url, true);

  //Overview and Product page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    // o map aceita uma callback function, essa callback function recebe como argumento o current element, ou seja o elemento do loop atual e o que quer que retornemos na função vai ser salvo num array
    //console.log(dataObj);
    const cardsHtml = dataObj
      .map(function (el) {
        return replaceTemplate(tempCard, el);
      })
      .join("");
    //console.log(cardsHtml); //Para testes
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output); //Sending HTML as response
    return;

    //Product Page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    //console.log(query, pathname);
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output); //Sending HTML as response

    return;

    //API
  } else if (pathname === "/api") {
    //res.end("API");
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data); //Sending JSON data as response

    //Not Found
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found! 404</h1>");
    return;
  }
});

server.listen(8000, () => {
  console.log("Listening to requests on port 8000");
  if (process.env.CODESPACE_NAME) {
    console.log(
      `Acede ao servidor em: https://${process.env.CODESPACE_NAME}-8000.githubpreview.dev`
    );
  }
});
