# Group Challenge 

Create a method that creates a HTTPS server with nodeJS. When the server runs, it outputs a simple "Hello World" message.

## Steps:

To build an HTTPS server with `nodeJS`, we need an SSL certificate. 

Let's go ahead and create a self-signed certificate (SSL) on our computer. 

### 1. Generate Self-signed Certificate 

First, we have to generate our self-signed certificate and we will be doing this in our terminal using the command below:

```bash 
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

Running this command will present you with some prompt to fill out. Just press "Enter" to use the default except for the `Common Name` and `Email Address` options. 

`Common Name` could be **localhost** and the `Email Address` should be your real email ID. 

Here's a breakdown of what the above command you ran means: 

- `openssl`: This is the command-line tool for using OpenSSL, an open-source cryptography toolkit that implements the Secure Sockets Layer (SSL) and Transport Layer Security (TLS) protocols.

- `req`: This subcommand of OpenSSL is used for creating and processing certificate signing requests (CSRs) and generating self-signed certificates.

- `-nodes`: This option specifies that the private key should not be encrypted with a passphrase. 
    - The private key will be generated without a passphrase, meaning it will be in plain text. 

    - This is useful for automation or environments where manual passphrase entry is not feasible.

- `-new`: This option specifies that a new CSR (Certificate Signing Request) should be generated.

- `-x509`: This option specifies that a self-signed certificate should be generated rather than a CSR. 
    - The `-x509` option indicates that OpenSSL should generate a self-signed certificate instead of a certificate request.

- `-keyout server.key`: This option specifies the file name where the generated private key should be saved. In this case, it's `server.key`. 
    - This name could be any name of your choice but I suggest you use something related to the use of the `key`. 

    - Whatever the name is, it should have a `.key` extension.  

- `-out server.cert`: This option specifies the file name where the generated self-signed certificate should be saved. In this case, it's `server.cert`. 
    - Again, this name could be any name of your choice but I suggest you use something related to the use of the certificate. 
    
    - Whatever the name is, it should have a `.cert` extension.

After running the command, two files should be generated for you:

- `server.key`: The private key of the SSL certificate

- `server.cert`: The self-signed SSL certificate file

### 2. Create a Web Service

Now, let's create our web service for our Express project. Do that by creating the `app.js` file. 

```bash 
touch app.js
```

We would need to initialize our project using `npm`. 

```bash
npm init
```

The above command will generate `package.json` and `package-lock.json` files. So go ahead and either answer the prompt or leave the defaults. 

To bypass the prompt options and use the defaults, run this command:

```bash
npm init -y
```

### 3. Install Express 

As per requirement, let's go ahead and install `express` for our project.

```bash
npm install express 
```

### 4. Configure `app.js`

In this file, we will add an HTTPS server using the `createServer()` function. Then, pass the key and certificate files of the SSL certificate as an object, `options` in the `createServer()` function. 

```js
// Content of "app.js"
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
```

### 5. Test App

Let's run the command below to start up our application: 

```bash
node app.js 

# OR 

npm start  # if you added a "start" script to your "package.json" file 
```

Open your browser and test the URL for your application:

`https://localhost:3000/`

**Note:** Make sure the URL you are using is **"https"** not **"http"**. I ran into an hour of troubleshooting only to find out that my URL was not `https`. Don't make that mistake. 