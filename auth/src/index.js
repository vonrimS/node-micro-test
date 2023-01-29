const express = require('express');
const app = express();
const axios = require('axios')
const { connectDb } = require('./helpers/db');
const { port, host, apiUrl } = require('./configuration/index');


const startServer = () => {
    app.listen(port, () => {
        console.log(`service AUTH was started on port: ${port}`);
    });
};

app.get('/test', (req, res) => {
    res.send('Our AUTH server is working');
});

// communication test to fetch data from api service
app.get('/test-with-api-data', (req, res) => {
    axios.get(apiUrl + '/test-api-data').then(response=>{
        res.json({
            "done": true,
            "response": response.data,
            "testdata": response.data.testdata
        })
    })
})

// test request between services
app.get('/api/currentUser', (req,res)=> {
    res.json({
        id: '1234',
        email: 'foo@gmail.com'
    })
})

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);