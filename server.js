// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require('fs')

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.static("public"))
app.use(express.static("db"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
