const fs = require("fs"); //File System

/*
//Blocking synchronous way
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
//console.log(textIn);

const textOut = `This is what we know about the avocado : ${textIn}. \n Created on ${Date.now()} \n`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written successfully!");
*/

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
