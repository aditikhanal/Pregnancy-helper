var express = require('express');

var router = express.Router();

var Story = require('../models/Story');

var path = require('path');
// var Search = require('../models/Search');



var multer = require('multer'); 
// import nodemailer (after npm install nodemailer)


var Storage= multer.diskStorage({
  destination:"./public/uploads/",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});

var upload = multer({
  storage:Storage
}).single('file');

 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/home', function(req, res, next) {
  res.render('home');
});



router.get("/register", function(req,res, next)
{
  res.render("Register")
});
router.get("/profile", function(req,res, next)
{
  res.render("profile")
});

router.get("/LogIn", function (req, res, next) {
  res.render("LogIn")
});

// router.get("/viewOne",function(req,res,next)
// {
//   res.render("viewOne")
// })




router.get("/storyview", function (req, res, next) {

  Story.find().exec((err, Sell) => {
   
  
      res.render("Storyview", {Sell})

    
    })
});
// router.get("/booksavailable", function (req, res, next) {
  
  
//   });






router.get("/story", function (req, res, next) {
res.render("Story")
});
router.get("/info", function (req, res, next) {
  res.render("weeklyinfo")
  });





router.post("/story",upload, function (req, res) {

  var imageFile=req.file.filename;
  var story = new Story
    ({
      username:req.body.username,
  
      useremail:req.body.useremail,

      description: req.body.description,
    
     
      imagename :imageFile
    })
  var promise = story.save()
  promise.then((story) => {
    res.redirect('/storyview')
  })
});

// router.get('/viewOnesell/:_id',  multer(multerConfig).single("photo"),  function (req, res, next) {
router.get('/viewOnesell/:_id', function (req, res, next) {
  Story.findById({ _id: req.params._id }).then((Sell) =>//function(err,movie)
  {
    console.log('book selected', Sell);

    res.render('viewOnesell', {Sell});
  })
    .catch((err) => {
      res.render('error');
    })

});
module.exports = router;

