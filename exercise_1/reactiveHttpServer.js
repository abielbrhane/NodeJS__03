const Rx=require('rxjs/Rx');
const subject = new Rx.Subject();
const url=require('url');
const {fork} = require('child_process');
const http=require('http');


function processFile(webObject)
{
    var res=webObject.res;
    var query=url.parse(webObject.req.url,true);
    console.log(query);
    var path=query.path.toString();
    console.log(path);
    const childProcess = fork('childProsessor.js');
    childProcess.send(path);
    childProcess.on('message',data=>
    {
            res.end(data);
                
    });
    
}

subject.subscribe(processFile);

http.createServer((req,res)=>{
    console.log(req.url);
    subject.next({"req":req,"res":res});
}).listen(3000);