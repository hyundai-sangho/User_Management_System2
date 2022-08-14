const express = require("express");
const expHbs = require("express-handlebars");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./server/routes/user");
const appRoot = require("app-root-path");
const pool = require(appRoot + "/dbConnection");

const app = express();
const port = process.env.PORT || 5000;

// 미들웨어를 구문 분석합니다
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// 미들웨어를 사용하여 로그를 출력합니다
app.use(morgan("tiny"));

// Static Files
app.use(express.static("public"));

// Template Engine
app.engine("hbs", expHbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

// Connect to DB
pool.getConnection((에러, 연결) => {
  if (에러) throw 에러;
  console.log(`Connected as ID ${연결.threadId}`);
});

app.use("/", routes);

app.listen(port, () => console.log(`서버 작동 중 포트: ${port}`));
