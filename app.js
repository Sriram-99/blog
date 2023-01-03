//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://sriramdivvi:test123@cluster0.5bkvx7k.mongodb.net/blogdb");
const postSchema=new mongoose.Schema({
  title:String,
  content:String
});

const Post=mongoose.model("Post",postSchema);


const homeStartingContent = "hello every one this is sriram this is my blog page . Here are some instructions on how to use this page first to add  new blog click on new blog";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";






app.get("/", function(req, res){
  
  Post.find((err,findlist)=>{
    res.render("home", {
      startingContent: homeStartingContent,
      posts: findlist
      });
  })
  
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const title=_.lowerCase(req.body.postTitle);
  const content=req.body.postBody;
  const post= new Post({
    title:title,
    content:content
  });
  post.save();
  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  Post.findOne({title:requestedTitle},(err,founded)=>{
    if(err){
      console.log("there is error in get posts/:postname");
    }
    else{
      res.render("post",{title:founded.title,content:founded.content});
    }
  })

app.get("/delete/:vvi",(req,res)=>{
  const todelete=req.params.vvi;
  Post.findOneAndDelete({title:todelete},(err,findlist)=>{
    if(!err){
      console.log("deleted succesfully");
      res.redirect("/")
    }
  })
})

  

});

let port=process.env.PORT;
if(port==null || port==""){
  port=3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});