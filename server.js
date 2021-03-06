const fs = require('fs');
const net = require('net');
const port = 8124;

var id = 0; //уникальный идентификатор для клиента
var arrQuestion = [];

var ar = [];
var nameDir;

const server = net.createServer((client) => {
  console.log('--------------- Connected client: ' + (++id) + ' ---------------');

  nameDir = 'Config' + id;
  fs.mkdir(nameDir, function (err, data) {

  });

  client.setEncoding('utf8');

  client.on('data', (data) => {
    //console.log(data);
    if(data == 'FILES'){
      client.write('ASK');
    }
    else if(data == 'DEC') {
      client.write('DEC');
    }
    else if(data.indexOf('arr') == 0){
      var dirr = data.substring(3);

      var arr = dirr.split(',');
      console.log(arr);
      for(var c = 2; c < arr.length; c++){
        if(fs.statSync(arr[c]).isDirectory()){
          fs.readdir(arr[c], function (err, file) {
            for(var f in file){
              fs.writeFileSync(nameDir + '/' + file[f]);
          }
        });
      }
    }
    client.write('DEC');
    }
  });


  client.on('end', () => console.log('Client disconnected'));
});

var question = function(ask, answer) {
  this.ask = ask;
  this.answer = answer;
};

function compareRandom(){
  return Math.random() - 0.5;
};

server.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});
