var express = require('express');
var router = express.Router();
var MD5 = require('MD5');
var mongoose = require('mongoose');
var slug = require('slug');

mongoose.connect('mongodb://localhost/test');
// mongoose.connect(process.env.MONGO_URL);


var Question = mongoose.model('Question', {
  body: {type: String, required: true, unique: true},
  email: {type: String, required: true},
  gravUrl: {type: String, required: true},
  slug: {type: String, required: true},
  createdAt: {type: Date, default: Date.now }
});

Question.on('index', function(err) {

});

var add500Questions = function() {
  var fakeQuestions = [];
  var fakeQuestion;
  for (var i = 0; i < 500; i++) {
    fakeQuestion = new Question({body: i, email: 'faker@gmail.com'});
    fakeQuestion.save(function(err, savedQuestions) {
      console.log(err, savedQuestions)
    });
  }
}

// add500Questions();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mongo API' });
});

router.get('/questions/:question', function(req, res, next) {
  console.log('params ' + req.params.question);
  var questionSlug = req.params.question;
  Question.findOne({ slug: questionSlug }, function(err, data) {
    res.json(data);
  });
});

router.get('/test', function(req, res, next) {
  res.send('Just testing');
});

router.get('/questions', function(req, res) {
  Question.find({}, function(err, data) {
    res.json(data);
  })
});

router.get('/limitquestions', function(req, res) {
  // var limited;
  Question.find({}).sort({ createdAt: 'desc'}).limit(20).exec(function(err, data) {
    res.json(data);
  });
});

router.post("/questions", function(req, res) {
  var question = new Question(req.body);
  question.slug  = slug(req.body.body);
  question.gravUrl = "http://www.gravatar.com/avatar/" + MD5(req.body.email);
  question.save(function(err, savedQuestion) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Validation Failed" });
    }
    console.log("savedQuestion:", savedQuestion);
    res.json(savedQuestion);
  });
});

router.post('/test', function(req, res, next) {
  var response = req.body;  
  response.serverTime = new Date();  //Add serverTime property to response obj
  res.json(response);
});

// router.get('/users', function(req, res, next) {
//   User.find({}, function(err, data) {
//     console.log(data);
//     res.json(data);
//   });
// });

module.exports = router;