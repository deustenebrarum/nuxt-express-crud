const express = require('express');
const app = express();
const dbConfig = require('./dbconfig.js');
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

//Routes
require('./routes/post.routes.js')(app);

app.get('/', (req, res) => {
    res.json({"message": "test"});
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});