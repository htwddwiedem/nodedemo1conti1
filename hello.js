// Minimaler Server ohne Abhängigkeiten (nur Node.js-Bordmittel)
const http = require('node:http');
http.createServer((req, res) => {
  res.end(`Hallo aus Node ${process.version}, URL: ${req.url}\n`);
}).listen(3000, '0.0.0.0', () => console.log('läuft auf :3000'));
