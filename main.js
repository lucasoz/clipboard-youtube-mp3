var horizon = require('horizon-youtube-mp3');
var path = require('path');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');
var downloadPath = path.join('descargas');
const fs = require('fs');

var a = [];

LineReaderSync = require("line-reader-sync")
lrs = new LineReaderSync("lista.txt")
while(true){
  var line = lrs.readline()
  if(line === null){
    break;
  }else{
    var res = line.replace("\r", "");
    a.push(res);
  }
}

indice_max = a.length;
ind = 0;
descargar(ind);
function descargar(indice){
    if (indice == indice_max) {
        console.log('Proceso terminado!');
    }else{
        horizon.downloadToLocal(
          a[indice],
          downloadPath,
          null,
          null,
          null,
          onConvertVideoComplete,
          onConvertVideoProgress
        );
    }
}

function onConvertVideoComplete(err, result) {
  console.log(err, result);
  // Will return...
  //null, conversionFileComplete
  ind = ind + 1;
  descargar(ind)
  pass = true
}

function onConvertVideoProgress(percent, timemark, targetSize) {
  console.log('Progress:', percent, 'Timemark:', timemark, 'Target Size:', targetSize);
  // Will return...
  // Progress: 90.45518257038955 Timemark: 00:02:20.04 Target Size: 2189
  // Progress: 93.73001672942894 Timemark: 00:02:25.11 Target Size: 2268
  // Progress: 100.0083970106642 Timemark: 00:02:34.83 Target Size: 2420
}
