var express = require('express');
var app = express();
var routers = require("./Routers")
var bodyParser = require('body-parser')
const axios = require('axios');
var ejs = require('ejs')
const mongoose = require('mongoose')
var Player = require('./views/schema');
var cookieParser = require('cookie-parser');

app.set("view engine", "ejs")

app.use(cookieParser())

app.use(bodyParser.urlencoded({
    extended: false
 }));

app.use(bodyParser.json());
mongoose.connect("mongodb+srv://vu_anhle:ArnoDurian2604@chess.kd9oi.mongodb.net/Chess?retryWrites=true&w=majority")

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.get("/", function(req,res) {
    console.log("connected")
    console.log(res.cookie)
    res.render("elements.ejs")
})


app.get("/chess", function(req,res){
    res.render("home.ejs")
})

app.get("/search", function(req,res){
    res.render("fetching.ejs")
})

app.post("/fetching", function(req,res){
    console.log(req.body)

    try{
        Player.find({ Last_Name: req.body.Last_Name }, function (err, response) {
            if (err) {
              console.log(err);
              // Handle the error, e.g., send an error response
              res.status(500).send('An error occurred');
            } else {
              if (response.length > 0) {
                const player = {
                  Title: response[0].Title,
                  Elo: response[0].Elo,
                  Country: response[0].Country,
                  First_Name: response[0].First_Name,
                  Last_Name: response[0].Last_Name,
                };
                res.render('display', { player });
              } else {
                // Handle the case where no matching record was found
                console.log("Player not found")
                res.redirect("/")

              }
            }
          });
    } catch{

    }
})

app.post("/submission", function(req,res){
    console.log(req.body.Title)
    console.log(req.body.Elo)
    console.log(req.body.Country)
    console.log(req.body.First_Name)
    console.log(req.body.Last_Name)
    var player = new Player({
        Title: req.body.Title,
        Elo: req.body.Elo,
        Country: req.body.Country,
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name
    })
    try{
    player.save(function(err, Player){
        if(err) {
            console.log(err);
            res.send(player);
        }
        else
            res.redirect("/");
     });
    } catch{
        console.log("Couldn't save to database");
    }
    
})


app.listen(80);