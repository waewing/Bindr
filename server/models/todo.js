const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required:true,
    },
    completed:{
        type:Boolean,
        required:true,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true,
    }
});

module.exports = mongoose.model("Todo", TodoSchema);