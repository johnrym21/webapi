const fs = require('fs');

var data = fs.readFileSync('my-image.png');
console.log('sync readFile');
console.log(data);
console.log('break');
var arrByte= new Uint8Array(data);
console.log(arrByte);