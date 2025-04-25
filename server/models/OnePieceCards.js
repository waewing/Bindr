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
const db = mongoose.connection.useDb("One_Piece_TCG");

const OP01 = db.model("OP01", OPSchema, 'OP01');
const OP02 = db.model("OP02", OPSchema, 'OP02');
const OP03 = db.model("OP03", OPSchema, 'OP03');
const OP04 = db.model("OP04", OPSchema, 'OP04');
const OP05 = db.model("OP05", OPSchema, 'OP05');
const OP06 = db.model("OP06", OPSchema, 'OP06');
const OP07 = db.model("OP07", OPSchema, 'OP07');
const OP08 = db.model("OP08", OPSchema, 'OP08');
const OP09 = db.model("OP09", OPSchema, 'OP09');
const OP10 = db.model("OP10", OPSchema, 'OP10');
const OP11 = db.model("OP11", OPSchema, 'OP11');

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
