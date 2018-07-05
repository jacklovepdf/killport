/**
 * @file 杀掉占用指定端口的进程
 * @author jacklovepdf
 */
var isWin = process.platform === 'win32';

module.exports = function (port, filter) {
    return new Promise((resolve, reject) => {
        if(typeof port === "number"){
            var strLine, strLineLen,
                cmd = isWin ? `netstat -ano | findstr ${port}` : `lsof -i :${port}`;
            var exec = require('child_process').exec;

            exec(cmd, function(err, stdout) {
                if(err){
                    resolve({error:err});
                }
                strLine = stdout.split('\n');
                strLineLen = strLine.length;
                if(strLineLen > 1){
                    strLine.forEach(function(line, index){
                        var p = line.trim().split(/\s+/);
                        var address = isWin ? p[4] : p[1];

                        if(address != undefined && address != "PID" && p[0].indexOf(filter) === -1){
                            exec('kill -9'+ address, () => {
                                if(index === strLineLen-1){
                                    resolve();
                                }
                            });
                        }else {
                            if(index === strLineLen-1){
                                resolve();
                            }
                        }
                    });
                }else {
                    reject({error:"no specified port"});
                }
            });
        }else {
            reject({error:"args error"});
        }
    })
};