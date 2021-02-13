const http = require('http');
const hostname = require('os').hostname();

const port = 80;

const server = http.createServer((req, res) => {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const output = {
      method: req.method,
      url: req.url,
      time: new Date().toISOString(),
      hostname: hostname,
      headers: req.headers,
      body: data ? JSON.parse(data) : null,
    };
    res.end(JSON.stringify(output));
  });
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
