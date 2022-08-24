var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('home.ejs')
   

});
router.post('/', function(req, res){
   res.send("Thank you for your input");
});

//export this router to use in our index.js
module.exports = router;