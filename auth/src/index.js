const express = require('express');
const app = express();
const { connectDb } = require('./helpers/db');
const { port, host } = require('./configuration/index');


const startServer = () => {
    app.listen(port, () => {
        console.log(`service AUTH was started on port: ${port}`);
    });
};

app.get('/test', (req, res) => {
    res.send('Our AUTH server is working');
});

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);