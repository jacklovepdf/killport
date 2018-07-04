/**
 * @file 杀掉占用指定端口的进程
 * @author jacklovepdf
 */
const isWin = process.platform === 'win32';

function killport(compile, port) {
    let strLine, strLineLen,
        cmd = isWin ? `netstat -ano | findstr ${port}` : `lsof -i :${port}`;
    let exec = require('child_process').exec;

    exec(cmd, function(err, stdout) {
        if(err){
            compile();
        }
        strLine = stdout.split('\n');
        strLineLen = strLine.length;
        if(strLineLen){
            strLine.forEach(function(line, index){
                var p=line.trim().split(/\s+/);
                var address=isWin ? p[4] : p[1];
                if(index === 0 || p[0].indexOf('Electron') !== -1){
                    return ;
                }
                if(address != undefined && address != "PID"){
                    exec('kill '+ address, () => {
                        if(index === strLineLen-1){
                            compile();
                        }
                    });
                }else {
                    if(index === strLineLen-1){
                        compile();
                    }
                }
            });
        }else {
            console.log("no port process");
            compile();
        }
    });

}

module.exports = function (port, filter) {
    killport(port, filter);
};