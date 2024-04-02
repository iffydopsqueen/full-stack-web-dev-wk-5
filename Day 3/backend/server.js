const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
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

// Create the web server
const server = app.listen(5000, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log("App listening at http://%s:%s", host, port);
});