//첫번째 문단은 cmd에서 install을 사용하여 설치 npm install ~
const express = require('express');
const path = require('path')
const app = express();
const passport = require('passport');

const mongoose = require('mongoose')
require('dotenv').config()
const session = require("express-session");

const MongoStore = require('connect-mongo');
const authRouter = require('./routes/auth');

mongoose.connect(process.env.MONGODB_URI, { //비밀번호가 유출되면 위험하므로 환경 세팅 파일을 따로 만들어 둔다.
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });





app.set('views',path.resolve(__dirname + '/views') )
app.set('view engine', 'ejs')







// express session 연결
app.use(session({
    saveUninitialized:true,
    resave:true,
    secret:'secretsessionkey',
    store:MongoStore.create({
        mongoUrl: process.env.MONGODB_URI, // MongoDB 연결 URL
      })
  }));
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('public'))
app.use(passport.initialize());
app.use(passport.session());
app.use('/', authRouter)




app.get("/",(req, res) => {
    console.log(req.user);
    if (!req.user) return res.redirect("/login");
    res.render("main", { user: req.user });
});


app.get("/login", (req, res) => {
    res.render("login");
});

app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
    })
);
let PORT = 8080;
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});










