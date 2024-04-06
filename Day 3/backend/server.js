const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// SSL modules
const https = require("https");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());
require("./app/models/book.model.js");

// Configuring the database 
require("dotenv").config();

// Connecting to the database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection
.on("open", () => {
    console.log("Mongoose connection open");
})
.on("error", (err) => {
    console.log(`Connection error: ${err.message}`);
});

require("./app/routes/book.router.js")(app);

// To generate the self-signed certificate & private key 
// openssl req -x509 -newkey rsa:2048 -keyout server.key -out server.cert -nodes

// Load SSL certificate and private key 
const credentials = {
    key: fs.readFileSync('./https/server.key'),
    cert: fs.readFileSync('./https/server.cert'),
};
  
// Create the HTTPS server 
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(5000, function() {
    const host = httpsServer.address().address;
    const port = httpsServer.address().port;

    console.log("App listening at https://%s:%s", host, port);
});