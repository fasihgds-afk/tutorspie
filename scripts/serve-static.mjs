import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root=resolve('out');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.ico':'image/x-icon','.txt':'text/plain'};
createServer(async(req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let filename=resolve(root,'.'+pathname);
    if(filename!==root&&!filename.startsWith(root+sep)){res.writeHead(403);res.end();return;}
    if((await stat(filename)).isDirectory())filename=resolve(filename,'index.html');
    const data=await readFile(filename);
    res.writeHead(200,{'Content-Type':mime[extname(filename)]||'application/octet-stream'});res.end(data);
  }catch {res.writeHead(404,{'Content-Type':'text/html'});res.end(await readFile(resolve(root,'404.html')).catch(()=>Buffer.from('Page not found')));}
}).listen(5173,'127.0.0.1',()=>console.log('Tutorspie preview: http://127.0.0.1:5173/'));
