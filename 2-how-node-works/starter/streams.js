const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    //Solution 1
    //fs.readFile('test-file.txt', (err, data) =>{
    //    res.end(data);
    //})
    //Solution 2 : Streams
    // const readable = fs.createReadStream('testtttt-file.txt');
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // });
    // readable.on('end', () => {
    //     res.end();
    // });
    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('File not found!');
    // });
    //Solution3: Pipe
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
    //readableSource.pipe(WritableDestination);
});

server.listen(8001, '127.0.0.1',() => {
    console.log("Listening...");
});
 