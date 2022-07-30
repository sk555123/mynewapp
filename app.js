var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const res = require('express/lib/response');
const Blog = require('./models/blog');

var app = express();

const dbURI = 'mongodb+srv://thenewadmin:Node555102030@MYAPP.niq2m.mongodb.net/node-data?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((resualt) => console.log('connected to db'))
  .catch((err) => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.use('/', indexRouter);
app.get('', (req,res) => {
  res.redirect('/home')
})


app.get('/home', (req,res) => {
  res.sendFile(__dirname + '/views/home.html')
})




app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
app.get('/products', (req,res) => {
  //res.sendFile(__dirname + '/views/products.html')
  Blog.find({}, function(err, blogs) {
    res.render('products.ejs', {
      bloglist: blogs
    })
  })
})



app.get('/api', (req,res) => {
  res.sendFile(__dirname + '/views/api.html')
})


app.get('/all-products', (req,res) =>{
  Blog.find()
    .then((result) => {
      res.send(result); 
    })
    .catch((err) => {
      console.log(err);
    }); 
})

app.get('/add-product/:id/:desc/:price', (req,res) => {
  const { id } = req.params;
  const { desc } = req.params;
  const { price } = req.params;
  const blog = new Blog({
    product_name: id,
    desc: desc,
    price:price
 })
 blog.save()
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.log(err);
  });
});

app.delete('/delete-product/:id', (req,res) => {
  const { id } = req.params;
  Blog.remove( {
    "_id": ObjectId(id)});
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
