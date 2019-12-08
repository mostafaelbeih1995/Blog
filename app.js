const express = require("express");
const bodyParser = require("body-parser");
const lodash = require('lodash');
const mongoose = require("mongoose");
const Post = require("./models/post");


let postsArray = [];
const app = express();


const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin nibh nisl condimentum id venenatis a condimentum vitae. Id interdum velit laoreet id donec. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Pulvinar etiam non quam lacus suspendisse. Neque volutpat ac tincidunt vitae semper quis lectus nulla at. At risus viverra adipiscing at in tellus. Mauris vitae ultricies leo integer. Mauris a diam maecenas sed enim ut sem. Mattis vulputate enim nulla aliquet porttitor lacus. Volutpat ac tincidunt vitae semper. Cursus sit amet dictum sit amet justo. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. A iaculis at erat pellentesque adipiscing.";

const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin nibh nisl condimentum id venenatis a condimentum vitae. Id interdum velit laoreet id donec. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Pulvinar etiam non quam lacus suspendisse. Neque volutpat ac tincidunt vitae semper quis lectus nulla at. At risus viverra adipiscing at in tellus. Mauris vitae ultricies leo integer. Mauris a diam maecenas sed enim ut sem. Mattis vulputate enim nulla aliquet porttitor lacus. Volutpat ac tincidunt vitae semper. Cursus sit amet dictum sit amet justo. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. A iaculis at erat pellentesque adipiscing.";

const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin nibh nisl condimentum id venenatis a condimentum vitae. Id interdum velit laoreet id donec. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Pulvinar etiam non quam lacus suspendisse. Neque volutpat ac tincidunt vitae semper quis lectus nulla at. At risus viverra adipiscing at in tellus. Mauris vitae ultricies leo integer. Mauris a diam maecenas sed enim ut sem. Mattis vulputate enim nulla aliquet porttitor lacus. Volutpat ac tincidunt vitae semper. Cursus sit amet dictum sit amet justo. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. A iaculis at erat pellentesque adipiscing.";


app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res) => {
    // Post.find().then(posts => {
    //     postsArray = posts;
    //     console.log(postsArray)
    // });
    Post.find((err, posts) => {
        if (err) {
            console.log("Error retreiving from database");
        }
        else {
            postsArray = posts;
            console.log(postsArray);
        }
    }).then(() => {
        res.render('home', {
            content: homeStartingContent,
            posts: postsArray
        }); 
    })
    
});

app.get("/about", (req, res) => {
    res.render('about', {aboutContent: aboutContent});
});
 
app.get("/contact", (req, res) => {
    res.render('contact', {contactContent: contactContent});
});

app.get("/compose", (req, res) => {
    res.render('compose');
});

app.post("/compose", (req, res) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body
    });
    // postsArray.push(post);
    //add post to database
    post.save().then(() => {
        res.redirect("/");
    });
});

app.listen(3000, () => { 
    console.log("Listening on port 3000");
});

app.get("/posts/:postName", (req, res) => {
    const requestedTitle = lodash.lowerCase(req.params.postName);
    postsArray.forEach(post => {
        const existingTitle = lodash.lowerCase(post.title);
        if (existingTitle === requestedTitle) {
            res.render("singlePost", { post:post});
        }
    });
});

mongoose.connect('mongodb+srv://mostafaelbeih:Kendrick_lamar_222@cluster0-erbgg.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connected Database Successfully");
    })
    .catch(() => {
        console.log("Connection failed");
    })
    ;

//Database Part

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'BlogDatabase';

// // Create a new MongoClient
// const client = new MongoClient(url, { useUnifiedTopology: true});

// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   client.close();
// });