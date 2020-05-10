const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password:{
        type: String,
        required: true,
    },
    accountType:{
        type: String,
        required: true,
        default: "Learner"
    },
    email:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("user", userSchema);