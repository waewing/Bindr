const mongoose = require("mongoose");

const OPSchema = new mongoose.Schema({
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

});

const OP01 = mongoose.model("OP01", OPSchema, 'OP01');
const OP02 = mongoose.model("OP02", OPSchema, 'OP02');
const OP03 = mongoose.model("OP03", OPSchema, 'OP03');
const OP04 = mongoose.model("OP04", OPSchema, 'OP04');
const OP05 = mongoose.model("OP05", OPSchema, 'OP05');
const OP06 = mongoose.model("OP06", OPSchema, 'OP06');
const OP07 = mongoose.model("OP07", OPSchema, 'OP07');
const OP08 = mongoose.model("OP08", OPSchema, 'OP08');
const OP09 = mongoose.model("OP09", OPSchema, 'OP09');
const OP10 = mongoose.model("OP10", OPSchema, 'OP10');
const OP11 = mongoose.model("OP11", OPSchema, 'OP11');

module.exports = {
    OP01,
    OP02,
    OP03,
    OP04,
    OP05,
    OP06,
    OP07,
    OP08,
    OP09,
    OP10,
    OP11
};
