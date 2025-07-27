// console.log(arguments);
// console.log(require('module').wrapper);

const C = require('./test-module-1.js');
const calc1 = new C();
console.log(calc1.add(2,5));

// const calc2 = require('./test-module-2.js');
// console.log(calc2.add(2,5));


const {add, multiply, divide} = require('./test-module-2.js');
console.log(add(2,5));

//caching

require('./test-module3.js')();

require('./test-module3.js')();

require('./test-module3.js')();
