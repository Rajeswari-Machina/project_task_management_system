const app = require('./app')
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 5000

server.listen(PORT,()=>{
  console.log(`server listening on port ${PORT}`);
})