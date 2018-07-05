/**
 * @file 杀掉占用指定端口的进程
 * @author jacklovepdf
 */
var isWin = process.platform === 'win32';
var execa = require('execa')

module.exports = function (port, filter) {
    return new Promise((resolve, reject) => {
        if(typeof port === "number"){
            var strLine, strLineLen, count=0, killCount=0,
                cmd = isWin ? `netstat -ano | findstr ${port}` : `lsof -i :${port}`;

            execa(cmd).then((result) => {
                var stdout = result.stdout;
                strLine = stdout.split('\n');
                strLineLen = strLine.length;

                if(strLineLen > 1){
                    strLine.forEach(function(line, index){
                        var p = line.trim().split(/\s+/);
                        var address = isWin ? p[4] : p[1];
                        var isFilterCommand = p[0].indexOf(filter) === -1;

                        if(address != undefined && address != "PID" && isFilterCommand){
                            execa('kill -9'+ address).then(() => {
                                count++;
                                if(count === strLineLen){
                                    killCount ? reject() : resolve()
                                }
                            }).catch((err) => {
                                count++;
                                killCount++;
                                if(count === strLineLen){
                                    killCount ? reject() : resolve()
                                }
                            })
                        }else {
                            count++;
                            if(count === strLineLen){
                                killCount ? reject() : resolve()
                            }
                        }
                    })
                }else {
                    resolve()
                }
            }).catch(() => {
                resolve()
            })
        }else {
            reject({error:"args error"});
        }
    })
};