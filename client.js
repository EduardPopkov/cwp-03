const dotenv = require('dotenv').load();
const fs = require('fs');
const net = require('net');
const exec = require('child_process');
const clientFiles = require('./client-files.js');
const port = 8124;

clientFiles(process.argv[2]);

var arrDir = [];

const client = new net.Socket();
client.setEncoding('utf8');

client.connect(port, function () {
  console.log('Connected');
  sendFILES(client);
});

/////////////////////////////////////////////////////

client.on('data', function (data) {
  if(data == 'ASK'){
    directories();
  }
  else if(data == 'DEC'){
    client.destroy();
  }
});
/////////////////////////////////////////////////////
var directories = function () {
  var dirs = process.env.Folders.split(',');
  console.log(dirs);

  generateCommandString(dirs);
};
/////////////////////////////////////////////////////
function generateCommandString(arrDir) {
  max = arrDir.length;

  var randForArrDir = max * Math.random();
  randForArrDir = Math.floor(randForArrDir);

  console.log('rand: ' + randForArrDir);
  if(randForArrDir == 0){
    client.write('DEC');
  }
  else{
    for (var i = 2; i < randForArrDir + 2; i++) {
      process.argv[i] = arrDir[i - 2];
    }

    client.write('arr' + process.argv);
  }
};
/////////////////////////////////////////////////////
function sendFILES(client) {
  console.log('func: sendFILES');
  client.write('FILES');
};
/////////////////////////////////////////////////////
client.on('close', function () {
  console.log('Connection closed');
});
