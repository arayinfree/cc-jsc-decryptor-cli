

var xxtea = require('xxtea-node');
var fs = require("fs");
var path = require("path")
var unzip = require("unzip");

var key = null;
var zip = false;
var version = false;
var src = null;
var dest = null;
var i = 2;
while ( i < process.argv.length) {
    var arg = process.argv[i];

    switch (arg) {
    case '--key' :
    case '-k' :
        key = process.argv[i+1];
        i += 2;
        break;
    case '--zip' :
    case '-z' :
        zip = process.argv[i+1];
        i += 2;
        break;
    case '--version' :
    case '-v' :
        version = process.argv[i+1];
        i += 2;
        break;
    case '--src' :
    case '-s' :
        src = process.argv[i+1];
        i += 2;
        break;
    case '--dest' :
    case '-d' :
        dest = process.argv[i+1];
        i += 2;
        break;
    default :
        i++;
        break;
    }
}

if (!src){
    console.log('--src path missing');
}
if (!dest){
    console.log('--dest toPath missing');
}
if (!key){
    console.log('--key yourKey missing');
}
if (!key || !dest || !src){
    console.log('example zip :  ccdecrypt-win.exe -s projectZip.jsc -d outputFolder -k yourkey -z true');
    console.log('example     :  ccdecrypt-win.exe -s projectZip.jsc -d output.js -k yourkey -z false');
    return;
}

var encrypt_data = fs.readFileSync(src);
if (zip){
    var decrypt_data = xxtea.decrypt(encrypt_data, xxtea.toBytes(key));//
    fs.writeFileSync('temp_archive.zip',decrypt_data);
    fs.createReadStream('temp_archive.zip').pipe(unzip.Extract({ path: dest }));
    // fs.unlink('temp_archive.zip',function(error){
    //     if(error){
    //         console.log(error);
    //         return false;
    //     }
    // })
    
}else{
    var decrypt_data = xxtea.toString(xxtea.decrypt(encrypt_data, xxtea.toBytes(key)));//not zip
    let output = dest;
    if (dest.indexOf('.js') == -1){
        output = dest + '.js'
    }
    fs.writeFileSync( output ,decrypt_data);
}