const express = require("express");
const bodyParser = require("body-parser");

let postsArray = [];
const app = express();


const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin nibh nisl condimentum id venenatis a condimentum vitae. Id interdum velit laoreet id donec. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Pulvinar etiam non quam lacus suspendisse. Neque volutpat ac tincidunt vitae semper quis lectus nulla at. At risus viverra adipiscing at in tellus. Mauris vitae ultricies leo integer. Mauris a diam maecenas sed enim ut sem. Mattis vulputate enim nulla aliquet porttitor lacus. Volutpat ac tincidunt vitae semper. Cursus sit amet dictum sit amet justo. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. A iaculis at erat pellentesque adipiscing.";

const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin nibh nisl condimentum id venenatis a condimentum vitae. Id interdum velit laoreet id donec. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Pulvinar etiam non quam lacus suspendisse. Neque volutpat ac tincidunt vitae semper quis lectus nulla at. At risus viverra adipiscing at in tellus. Mauris vitae ultricies leo integer. Mauris a diam maecenas sed enim ut sem. Mattis vulputate enim nulla aliquet porttitor lacus. Volutpat ac tincidunt vitae semper. Cursus sit amet dictum sit amet justo. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. A iaculis at erat pellentesque adipiscing.";

const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin nibh nisl condimentum id venenatis a condimentum vitae. Id interdum velit laoreet id donec. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Pulvinar etiam non quam lacus suspendisse. Neque volutpat ac tincidunt vitae semper quis lectus nulla at. At risus viverra adipiscing at in tellus. Mauris vitae ultricies leo integer. Mauris a diam maecenas sed enim ut sem. Mattis vulputate enim nulla aliquet porttitor lacus. Volutpat ac tincidunt vitae semper. Cursus sit amet dictum sit amet justo. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. A iaculis at erat pellentesque adipiscing.";


app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render('home', {content: homeStartingContent});
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
    const post = {
        title: req.body.title,
        body: req.body.body
    };
    postsArray.push(post);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
