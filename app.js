var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var produtosRouter = require('./routes/produtos');
var carrinhoRouter = require('./routes/carrinho.js');
var loginRouter = require('./routes/login');
var cadastroRouter = require('./routes/cadastro');
var sobreNosRouter = require('./routes/sobreNos');
const adminRouter = require('./routes/admin');
require('./db');


var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/produtos', produtosRouter); 
app.use('/carrinho', carrinhoRouter); 
app.use('/cadastro', cadastroRouter);
app.use('/login', loginRouter);
app.use('/sobreNos', sobreNosRouter);
app.use('/admin', adminRouter);


app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

 
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
