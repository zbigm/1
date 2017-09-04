var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// require('./mong')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

// route
// app.use('/news', require('./route/news'))
// app.use('/Member', require('./route/member'))
app.use('/', require('./route/index'))
app.use('/Account', require('./route/account'))


// app.use('/', require('./routes/index'))
// app.use('/upload', require('./routes/upload'))
// app.use('/gen', require('./routes/gen'))
// app.use('/imgd', require('./routes/imgd'))
// app.use('/colord', require('./routes/colord'))
// app.use('/opus', require('./routes/imgAnalyze'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('something error')
    console.error('something error', err)
    // res.render('error');
});

module.exports = app;