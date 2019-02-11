const clipboardy = require('clipboardy');
var horizon = require('horizon-youtube-mp3');
var path = require('path');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');
var downloadPath = path.join('descargas2');

//escuchar portapapeles
a = []

var clipboard = "";
function listenClipboard(){
    var new_clip = clipboardy.readSync();
    if (new_clip !== clipboard) {
        clipboard = new_clip
        handleClipboardChange(clipboard);
    }
    setTimeout(listenClipboard, 100);
}

function handleClipboardChange(clipboard){
    var matches = clipboard.match(/https:\/\/(?:www\.)?youtube.*watch\?v=([a-zA-Z0-9\-_]+)/);
    if (matches) {
        a.push(clipboard);
        console.log('Enlace válido');
    } else {
        console.log('enlace inválido');
    }
    console.log(a);
}

ultimo = "";
function listenArray(){
    var new_clip = clipboardy.readSync();
    if (a[0] && a[0] !== ultimo) {
        ultimo = a[0];
        descargar();
    }
    setTimeout(listenArray, 100);
}

function descargar(){
    horizon.downloadToLocal(
      a[0],
      downloadPath,
      null,
      null,
      null,
      onConvertVideoComplete,
      onConvertVideoProgress
    );
}

function onConvertVideoComplete(err, result) {
  console.log(err, result);
  // Will return...
  //null, conversionFileComplete
  a.shift();
  pass = true
}

function onConvertVideoProgress(percent, timemark, targetSize) {
  console.log('Progress:', percent, 'Timemark:', timemark, 'Target Size:', targetSize);
  // Will return...
  // Progress: 90.45518257038955 Timemark: 00:02:20.04 Target Size: 2189
  // Progress: 93.73001672942894 Timemark: 00:02:25.11 Target Size: 2268
  // Progress: 100.0083970106642 Timemark: 00:02:34.83 Target Size: 2420
}

listenArray();
listenClipboard();
