const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const res = require("express/lib/response");

const app = express();

app.set('view engine' , 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

//connect mongodb
mongoose.connect("mongodb://localhost:27017/wikipedia", {useNewUrlParser: true});

//Schema and model for Database
const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);


//Get
app.get("/articles", function(req,res){
    Article.find(function(err,foundArticles){
        if(!err){
            res.send(foundArticles);
        }
        else{
            res.send(err);
        }
        
    });
});

//POST
app.post("/articles", function(req,res){
    // console.log(req.body.title);
    // console.log(req.body.content);

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err){
        if(!err){
            res.send("Document added successfully");
        }
        else{
            res.send(err);
        }
    });
});

//delete
app.delete("/articles" , function(req , res){
    Article.deleteMany(function(err){
        if(!err)
        {
            res.send("Articles deleted successfully");
        }
        else{
            res.send(err);
        }
    });
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});