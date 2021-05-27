const axios = require('axios');
const fs = require('fs');

const image = fs.readFileSync('ID-13300.jpg');
const arrByte= new Uint8Array(image);



const url = 'http://192.168.10.14/FlexiCapture12/Server/API/v1/Json'
const data = {
    "MethodName":"AddNewImage",
    "Params": {
            "sessionId" : 17360,
            "batchId" : 62,
            "file" : {
                "Name" : "ID-13301.jpg",
                "Bytes" : image
            }
    }    
}

axios.post(url, data, {
  headers: { 
    'Authorization' : 'Basic ' + 'ZmlkZWxpdHlob1xhYmJ5eWFwaXVzcjpAYmIxMTVSdg==',
    'Content-Type' : 'application/json' }
})
.then(function (response) {
    console.log(response.data);
})
.catch(function (error) {
    console.log(error.isAxiosError);
    console.log(arrByte);
    console.log(image);
});

