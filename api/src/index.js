const express = require('express');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios');
const { connectDb } = require('./helpers/db');
const { port, host, authApiUrl } = require('./configuration/index');


const postSchema = new mongoose.Schema({
    name: String
});

const Post = mongoose.model('Post', postSchema);

const startServer = () => {
    app.listen(port, () => {
        console.log(`service api was started on port: ${port}`);
        const post = new Post({ name: "Silence 11122" });
        console.log(post);

        post.save(function (err, savedPost) {
            if (err) return console.error(err);
            console.log(savedPost + "+1122++");
        });

        Post.find(function (err, posts) {
            if (err) return console.error(err);
            console.log("posts: ", posts);
        });
    });
};

app.get('/test', (req, res) => {
    res.send('Our API server is working');
});

// test end-point for auth service
app.get('/api/test-api-data', (req, res)=> {
    res.json({
        "test-with-api": true,
        testdata: 123
    })
})

app.get('/test-with-current-user', (req, res) => {
    console.log(`authApiUrl: `, authApiUrl);
    axios.get(authApiUrl + '/currentUser').then(response => {
        res.json({
            "test-with-current-user": true,
            "current-user-from-auth": response.data
        });
    });
});

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);