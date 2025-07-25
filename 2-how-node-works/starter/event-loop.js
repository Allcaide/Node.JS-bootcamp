import fs from 'fs';
import crypto from 'crypto';

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 16; // Set thread pool size to 1 for testing


setTimeout(() => console.log('Timer 1 finished'), 0);

setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('text-file.txt', 'utf-8', () => {
    console.log('Console IO finished');
    console.log('-------------------------------------');
    setTimeout(() => console.log('Timer 2 finished'), 0);
    setTimeout(() => console.log('Timer 3 finished'), 3000);

    setImmediate(() => console.log('Immediate 2 finished'));

    process.nextTick(() => console.log('Process next tick finished'));

    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
    console.log('Crypto operation finished');
    
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start ,'Crypto operation finished');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start ,'Crypto operation finished');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start ,'Crypto operation finished');
    });
});
console.log('Hello from the top level code!');
