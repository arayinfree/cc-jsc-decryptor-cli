

var xxtea = require('xxtea-node');
var fs = require("fs");
var path = require("path")

var key = null;
var zip = false;
var version = false;
var src = null;
var dest = null;
var i = 2;
while (i < process.argv.length) {
    var arg = process.argv[i];

    switch (arg) {
        case '--key':
        case '-k':
            key = process.argv[i + 1];
            i += 2;
            break;
        case '--zip':
        case '-z':
            zip = process.argv[i + 1];
            i += 2;
            break;
        case '--version':
        case '-v':
            version = process.argv[i + 1];
            i += 2;
            break;
        case '--src':
        case '-s':
            src = process.argv[i + 1];
            i += 2;
            break;
        case '--dest':
        case '-d':
            dest = process.argv[i + 1];
            i += 2;
            break;
        default:
            i++;
            break;
    }
}

console.log('arayinfree: start encrypt ~');

if (!src) {
    console.log('--src path missing');
}
if (!dest) {
    console.log('--dest toPath missing');
}
if (!key) {
    console.log('--key yourKey missing');
}
if (!key || !dest || !src) {
    console.log('example     :  ccdecrypt-win.exe -s projectZip.jsc -d output.js -k yourkey');
    console.log('example     :  ccdecrypt-win.exe -s projectZip.js -d output.js -k yourkey');
    return;
}
console.log('src:' + src);
console.log('dest:' + dest);
console.log('key:' + key);

let output = dest;
if (dest.indexOf('.js') == -1) {
    output = dest + '.js'
}

var encrypt_data = fs.readFileSync(src);
if (zip) {
    var decrypt_data = xxtea.decrypt(encrypt_data, xxtea.toBytes(key));//
    const { deflate, unzip } = require('zlib');
    unzip(decrypt_data, (err, buffer) => {
      if (err) {
        console.error('An error occurred:', err);
        process.exitCode = 1;
      }
      fs.writeFileSync( output, buffer);
    });
} else {
    var decrypt_data = xxtea.toString(xxtea.decrypt(encrypt_data, xxtea.toBytes(key)));//not zip
    fs.writeFileSync(output, decrypt_data);
}

console.log('arayinfree: finish encrypt ~');
