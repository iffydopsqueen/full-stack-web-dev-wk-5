const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
require("./models/Group.js");

// Configuring the database 
require("dotenv").config();
const mongoose = require("mongoose");

// connecting to the database
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

// Create a server
const server = app.listen(5000, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log("App listening at http://%s:%s", host, port);
});