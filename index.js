const express = require('express');
const mongoose = require("mongoose");
const bp = require('body-parser');
const app = express();
const port = process.env.PORT || 3000

// DB import
const Blog = require("./models/blog");

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
// static floders
app.use(express.static(__dirname + '/public'));
// set the view engine to ejs
app.set('view engine', 'ejs');

//mongoDB connection string
const connectionString =
  "mongodb+srv://Ali-Nadeem:Ali123456@cluster0.rdulf.mongodb.net/Project?retryWrites=true&w=majority";

// index page
app.get('/', async (req, res) => {
  //const { id } = req.params;
  try {
    const blog = await Blog.find().sort({date : -1}).limit(6);
    //console.log(blog);
    res.render("index", { Data: blog });
  } catch (error) {
    res.send(error.message);
  }
  //res.render('index');
});

// All blog Page
app.get('/blog',async function (req, res) {
  try {
    const blog = await Blog.find().sort({date : -1});
    //console.log(blog);
    res.render("blog", { Data: blog });
  } catch (error) {
    res.send(error.message);
  }
  //res.render('blog');
});

// Create Blog Page
app.get('/Create-Blog', function (req, res) {
  res.render('Create-Blog');
});

// add data in db 
app.post('/Create-Blog', async function (req, res) {
  //console.log(req.body);
  const {author, title, description,detail,url} = req.body;
  const blog = new Blog({
     author,
     title,
     description,
     detail,
     url
    });
  try {
    await blog.save();
    res.redirect('/blog');
  } catch (error) {
    res.send(error.message);
  }
 // res.redirect('blog');
});

// data detail
app.get("/detail-blog/:id", async (req,res)=>{
  //console.log(req.params.id);
  try {
    const result = await Blog.findById(req.params.id);
    //console.log(result);
    res.render("detail", { result });
  } catch (error) {
    res.send(error.message);
  }
});

// edit blog page
app.get('/edit/:id',async function (req, res) {
  try {
    const result = await Blog.findById(req.params.id);
    //console.log(blog);
    res.render("edit.ejs", { result });
  } catch (error) {
    res.send(error.message);
  }
  // res.render('edit');
});

// edit blog description in post
app.post('/edit/:id', async function (req, res) {
  try {
  await Blog.findByIdAndUpdate(req.params.id ,{ description: req.body.description });
  } catch (error) {
    res.send(error.message);
  }
  res.redirect("/blog");
});

// delete blog post
app.get('/delete/:id', async function (req, res) {
  try {
  await Blog.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.send(error.message);
  }
  res.redirect("/blog");
});

// Server is listening 
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})


mongoose
  .connect(connectionString)
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((error) => {
    console.log(error.message);
  });