const http = require('http');

const agent = new http.Agent({
  keepAliveTimeout: 60000,
  maxSockets: 1,
  maxFreeSockets: 1
});



const server = http.createServer((req, res) => {
  
  
  
  
  /* Habilita o CORS 
   O CORS é um mecanismo de segurança usado pelos navegadores
  para limitar as requisições que um script em uma página pode 
  fazer a um servidor diferente do que a página foi carregada.
  Neste caso, estamos permitindo que qualquer origem possa acessar 
  nosso servidor.*/
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');

  /* Em seguida, estamos verificando se a requisição é uma requisição
  do tipo OPTIONS. O método OPTIONS é utilizado para verificar quais 
  são os métodos HTTP suportados pelo servidor, quais são os cabeçalhos 
  que podem ser enviados na requisição e se a origem da requisição é
  permitida pelo servidor. Se a requisição  for do tipo OPTIONS,
  estamos apenas retornando uma resposta vazia com status 200.*/
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  
  /* Logo após, estamos verificando se a requisição é do tipo GET
  para a rota /pega. Se for, estamos retornando uma resposta com 
  um array [1,2,3,4,5]. */
      if(req.url === '/pega'){
        
          if(req.method === 'GET'){
              let body = [1,2,3,4,5]
              
                res.end(JSON.stringify(body));
              
              
              }
       
      
      
      }
    
    
  /*Por fim, estamos lidando com a requisição para a rota /hello. 
  Se for uma requisição POST, estamos capturando o corpo da requisição
  utilizando o método ondo objeto req, concatenando os pedaços e envolvendo
  em um objeto JSON. Em seguida, estamos retornando uma resposta com o nome recebido na requisição. */
  if (req.url === '/hello') {
    if (req.method === 'POST') {
      let body = [];
      req.on('data', chunk => {
        body = body + chunk.toString();
      });
      req.on('end', () => {
        const name = JSON.parse(body).name;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(name));
      });
    } 
  } 
   
}, );

/* Por fim, estamos iniciando o servidor na porta 3030 e 
exibindo uma mensagem no console quando o servidor está 
rodando.*/


server.on('connection', (socket) => {
  console.log(`Nova conexão estabelecida com o socket ${socket.remoteAddress}:${socket.remotePort}`);
});

server.on('request', (req, res) => {
  console.log(`Nova requisição recebida para a URL: ${req.url}`);
});


server.listen('3030', () => {
  console.log('Servidor rodando na porta 3030');
});
