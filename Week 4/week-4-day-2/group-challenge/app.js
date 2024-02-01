// Import required modules
const https = require('https');
const fs = require('fs');

// Load the SSL certificate and key 
const options = {
    key: fs.readFileSync('server.key'),     // the server's private key 
    cert: fs.readFileSync('server.cert'),   // the server's SSL certificate 
};

// Create the HTTPS server 
const server = https.createServer(options, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<html><body><h1>Hello World!</h1></body></html>`);
});

// Start the server
const port = 3000;   
const hostname = 'localhost';
server.listen(port, hostname, () => {
    console.log(`Server running on https://${hostname}:${port}/`);
}); 