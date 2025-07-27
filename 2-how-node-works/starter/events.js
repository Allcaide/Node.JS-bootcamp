/*
const EventEmitter = require('events');
const http = require('http');
*/




// Define uma classe chamada Sales que herda de EventEmitter
class Sales extends EventEmitter { //Ver aulas Secção 14 do JS course
    // O constructor é um método especial chamado automaticamente ao criar uma nova instância da classe
    constructor() {
        // super() chama o constructor da classe pai (EventEmitter), permitindo que Sales herde suas funcionalidades
        super();
    }
}



const myEmitter = new Sales();



myEmitter.on('newSale', () =>{

    console.log('There was a new sale!');
});

myEmitter.on('newSale', () => {//São listeners, ouvinte de eventos
    console.log('Customer name: John Doe');
});


myEmitter.on('newSale', stock => { //Assim o stock apanha o valor passado no emit
    console.log(`There are now ${stock} items left in stock.`);
});


myEmitter.emit('newSale', 9);

///////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
    console.log("Request received!");
    console.log(req.url);
    res.end("Request received! 🚀");
});

server.on('request', (req, res) => {
    console.log("Another request received!😊");

});

server.on('close',() => {
    console.log('Server closed!');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for requests...');
});