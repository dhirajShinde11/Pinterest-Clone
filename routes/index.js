var express = require('express');
var router = express.Router();
var modeluser = require('./users')
var modelPost = require('./Post');
const passport = require('passport');
const upload = require('./multer')

const localstrategy = require('passport-local')
passport.use(new localstrategy(modeluser.authenticate()))


router.get('/', function(req,res){
  res.render('index')
})
router.get('/feed', function(req,res){
  res.render('feed')

})

router.get('/login', function(req,res){
  res.render('login',{error:req.flash('error')}) 
})

router.get('/register', function(req,res){
  res.render('index')
})
router.get('/profile',isLoggedIn, async function(req,res){
  const user = await modeluser.findOne({
    username:req.session.passport.user
  })
  .populate('posts')
  res.render('profile',{user})
})

router.post('/upload',isLoggedIn,upload.single('file'),async (req,res)=>{
  if(!req.file){
    return res.status(400).send('no file were upload.')
  }
  let user =await  modeluser.findOne({username:req.session.passport.user})   
  const postdata = await modelPost.create({
    image:req.file.filename,
    imgaetext:req.body.filecaption,
    user:user._id
  })
  user.posts.push(postdata._id)
  await user.save()
  res.redirect('/profile')
})

router.post('/register',function(req,res){
 const { username , email } = req.body;
 const userdata = new modeluser({username,email})

   modeluser.register(userdata,req.body.password)
  .then(function(regitereduser){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile')
    })
  })
})
router.post('/login',passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login",
  failureFlash : true
}),function(req,res){
 })
   
 router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next()
  res.redirect('/login')
}
  

  module.exports = router;
