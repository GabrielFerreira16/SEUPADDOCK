var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var sobreRouter = require('./routes/sobre');
var equipesRouter = require('./routes/equipes');
var gpRouter = require('./routes/gp');
var formsRouter = require('./routes/forms');
 var submitRouter = require('./routes/submit');

const app = express();

// app.get('/submit', async(req, res) =>{
//   const submit= await CRUD.getSubmit(FormF1);
//   res.render('submit', {submit});
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/sobre', sobreRouter);
app.use('/equipes', equipesRouter);
app.use('/gp', gpRouter);
app.use('/forms', formsRouter);
app.use('/submit', submitRouter)


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
