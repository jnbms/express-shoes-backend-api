var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileupload = require('express-fileupload');
var cors = require('cors');
var routes = require('./routes/index');
// var mysql = require('mysql2');
var app = express();
app.use(fileupload({
  // useTempFiles: true,
  // tempFileDir: ''
}));
app.use(cors())
var nunjucks = require('nunjucks');

// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());


// Template engine
app.set('view engine', 'html');
nunjucks.configure('template', {
  express: app,
  watch: true
})

// app.post('/single/upload', upload.single('file'), (res, req) => {
//   const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file
//   const { name } = req.body;

//   console.log("body 데이터 : ", name);
//   console.log("폼에 정의된 필드명 : ", fieldname);
//   console.log("사용자가 업로드한 파일 명 : ", originalname);
//   console.log("파일의 엔코딩 타입 : ", encoding);
//   console.log("파일의 Mime 타입 : ", mimetype);
//   console.log("파일이 저장된 폴더 : ", destination);
//   console.log("destinatin에 저장된 파일 명 : ", filename);
//   console.log("업로드된 파일의 전체 경로 ", path);
//   console.log("파일의 바이트(byte 사이즈)", size);

//   res.json({ok: true, data: "Single Upload Ok"})
// })

// DATABASE SETUP
// const con = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'root',
//   port: 3306,
//   database: 'database1',
// })

// con.connect(function(err) {
//   if(err) throw err;
//   console.log('connected');
// })

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 외부 파일 로드하기
app.use(express.static(path.join(__dirname, 'public')));
app.use('/template',express.static(path.join(__dirname, 'template')));


app.use('/', routes);

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
