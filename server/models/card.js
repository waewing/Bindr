const mongoose = require("mongoose");

const OP10Schema = new mongoose.Schema({
    set: {
        type: String,
        required:true,
    },
    code:{
        type: String,
        required:true,
    },
    name:{
        type: String,
        required:true,
    },
    img_src:{
        type: String,
        required: true,
    },
    img:{
        type: String,
        requried: true,
    },
    effect:{
        type: String,
        required: true,
    }

},{
    collection: 'OP10'
});

module.exports = mongoose.model("OP10", OP10Schema);
