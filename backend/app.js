var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var MongoConnection = require("./src/database/mongodb/MongoConnection");

var indexRouter = require("./src/routes/index");
var userRouter = require("./src/routes/user");
var authRouter = require("./src/routes/auth");
var alternativeRouter = require("./src/routes/questions/alternative");
var questionRouter = require("./src/routes/questions/question");
var questionAlternativeRouter = require("./src/routes/questions/questionAlternative");
var quizRouter = require("./src/routes/quiz");
var submissionRouter = require("./src/routes/submission");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// DB connection
process.env.NODE_ENV !== "test" && MongoConnection.connect();

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/alternative", alternativeRouter);
app.use("/question", questionRouter);
app.use("/question-alternative", questionAlternativeRouter);
app.use("/quiz", quizRouter);
app.use("/submission", submissionRouter);

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
