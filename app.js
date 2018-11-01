
const express = require('express')
const mustacheExpress = require('mustache-express')
var bodyParser = require('body-parser')
var session = require('express-session')
const app = express()

let trips = []

let username = [
  {username : "AmekaBrown", password : "password"}
]

app.use(session({
  secret: 'cat',
  resave: false,
  saveUninitialized: false
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')


function log(req,res,next){
  console.log("middleware is working/logging info is being checked")
  next()
}


let authenticateLogin = function(req,res,next){
  console.log("checking user authentication")
  if(req.session.username){
    next()
  } else {
    res.redirect("/login")
  }
  }


app.all("/admin/*",authenticateLogin, function (req,res,next){
  next()
})




app.use(bodyParser.json())

app.post("/add-trip", function(req, res){
  let tripDestination = req.body.destination
  let departureDate = req.body.departure
  let returnDate = req.body.return
  let tripURL = req.body.tripURL

  console.log(tripDestination)
  trips.push({tripDestination: tripDestination})
  res.redirect("admin/trips")

})

app.get("/add-trip", function(req,res){
  res.json(tripDestination)
})



app.get("/", function (req,res){
  let username = req.session.username
  res.render("index", {username : username})
})


app.post("/login",function (req,res){
  let username = req.body.username
  let password = req.body.password
  if(username == "AmekaBrown" && password == "password"){
    if(req.session) {
      req.session.username = username
      res.redirect("admin/trips")
    }
  }


})



app.get("/admin/trips", function(req,res){
  if (req.session.username){
    res.render("dashboard")
  }


})

 app.get("/login", function (req,res){
   res.render("login")
 })

app.listen(3000,function(){
  console.log("Server is running..")

})
