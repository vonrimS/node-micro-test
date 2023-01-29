const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { connectDb } = require('./helpers/db');
const { port, host } = require('./configuration/index');


const postSchema = new mongoose.Schema({
    name: String
})

const Post = mongoose.model('Post', postSchema)

const startServer = () => {
    app.listen(port, () => {
        console.log(`service api was started on port: ${port}`);
        const post = new Post ({name: "Silence 11122"})
        console.log(post)

        post.save(function (err, savedPost){
            if (err) return console.error(err);
            console.log(savedPost + "+1122++")
        })

        Post.find(function (err, posts) {
            if(err) return console.error(err);
            console.log("posts: ", posts)
        })
    });
};

app.get('/test', (req, res) => {
    res.send('Our API server is working');
});

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);