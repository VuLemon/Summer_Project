const { default: mongoose, Schema } = require("mongoose");

const playerSchema = new mongoose.Schema({
    Title: String,
    Elo: Number,
    Country: String,
    First_Name: String,
    Last_Name: String,
})

const Player = mongoose.model("Player", playerSchema, "Players")
module.exports = Player