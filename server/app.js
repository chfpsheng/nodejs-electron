var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// 导入nodejs-websocket模块
const io = require("nodejs-websocket");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// 执行websocket处理连接方法
io.createServer((connection) => {
  console.log("new connection...");
  //处理客户端发送过来的消息
  connection.on("text", function (data) {
    console.log("接收到的客户端消息:" + data);
    connection.sendText("服务器端返回数据:" + data);

    //监听关闭
    connection.on("close", function (code, reason) {
      console.log("Connection closed");
    });
    //监听异常
    connection.on("error", () => {
      console.log("服务异常关闭...");
    });
  });
}).listen(30002);

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  req.method == "OPTIONS" ? res.send(200) : next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
