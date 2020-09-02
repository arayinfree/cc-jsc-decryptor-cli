
Cocos Creator 打包后生成 jsc 文件. 集成 Bugly 收集线上的 Javascript 运行错误.

使用该工具把 jsc 文件还原为 js 文件 . 这样就可以愉快的定位报错了. 


## 测试用例
project0.jsc 使用 c47d061a-f9a1-48 加密. 
projectZip.jsc 使用 c47d061a-f9a1-48 加密并启用zip压缩

## 使用

### Git Bash
带zip 解密
```
./ccdecrypt-win.exe -s projectZip.jsc -d out -k c47d061a-f9a1-48 -z true
```

不带zip解密
```
./ccdecrypt-win.exe -s project0.jsc -d out.js -k c47d061a-f9a1-48 -z false
```

### CMD
带zip 解密
```
ccdecrypt-win.exe -s projectZip.jsc -d out -k c47d061a-f9a1-48 -z true
```

不带zip解密
```
ccdecrypt-win.exe -s project0.jsc -d out.js -k c47d061a-f9a1-48 -z false
```


## 依赖

```
npm install xxtea-node

```

## 代码

```
var encrypt_data = fs.readFileSync(src);
if (zip){
    var decrypt_data = xxtea.decrypt(encrypt_data, xxtea.toBytes(key));//
    fs.writeFileSync('temp_archive.zip',decrypt_data);
    fs.createReadStream('temp_archive.zip').pipe(unzip.Extract({ path: dest }));
}else{
    var decrypt_data = xxtea.toString(xxtea.decrypt(encrypt_data, xxtea.toBytes(key)));//not zip
    let output = dest;
    if (dest.indexOf('.js') == -1){
        output = dest + '.js'
    }
    fs.writeFileSync( output ,decrypt_data);
}

```