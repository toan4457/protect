var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })



// impỏrt lib mongoose
var mongoose=require('mongoose') 

//CONECTING mongoose
mongoose.connect('mongodb://0.0.0.0:27017/account', {
  useNewUrlParser: true, // <-- no longer necessary
  useUnifiedTopology: true // <-- no longer necessary 
}, (err) => {
  if (!err) {
    console.log('connected db.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

// tao bang collection
var lopSchema=new mongoose.Schema({
  username:String,
  email:String,
  password:String

})
//MODEL
let Lop = mongoose.model('Lop', lopSchema);


// tao bang collection cho cource
var sourceSchema=new mongoose.Schema({
  classname:String,
  cource:String,
  member:String

})
//MODEL cho source
let source = mongoose.model('source',sourceSchema);





// duong dan routes


//nhap database

router.get('/list-source', function(req, res) {
  res.render('list');
});


router.post('/list-source', urlencodedParser, function(req, res) {
  source.create({  classname:req.body.classname,source:req.body.source,member:req.body.password},(err,result)=>{
    console.log(req.body)
    res.render('list',{source:data})
  })
});
// dang ki
router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', urlencodedParser, function(req, res) {
  Lop.create({username:req.body.username,email:req.body.email,password:req.body.password},(err,result)=>{
    console.log(req.body)
    res.redirect('login')
  })
});
// dang nhap
router.get('/login', function(req, res) {
  res.render('login');
});
router.post('/login',urlencodedParser, function(req, res) {
  // Lop.findOne({username:req.body.username},(err,result)=>{
  //   console.log('insect succes')
  //   if(result.password==req.body.password){
  //     console.log('login succes')
  //     res.render('index')
  //    }
    // else{
     
    //   res.redirect('login')
    // }
//   })
// });
Lop.findOne({email:req.body.email},function(err,data){
  if(data){
    
    if(data.password==req.body.password){
      //console.log("Done Login");
      req.session.userId = data.unique_id;
      //console.log(req.session.userId);
      res.send({"Success":"Success!"});
      
    }else{
      res.send({"Success":"Wrong password!"});
    }
  }else{
    res.render('index')
  }
});
});


// log out

router.get('/logout', function (req, res, next) {
	console.log("logout")
	
    		return res.redirect('login');
});

// trang chu
router.get('/', function(req, res) {
  res.render('index');
});



module.exports = router;

