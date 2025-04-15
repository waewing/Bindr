const express = require("express");
const {OP01, OP02, OP03, OP04, OP05, OP06, OP07, OP08, OP09, OP10, OP11} = require('../models/card');

const router = express.Router();

router.get("/", async(req, res) => {
    try{
        const set1 = await OP01.find();
        const set2 = await OP02.find();
        const set3 = await OP03.find();
        const set4 = await OP04.find();
        const set5 = await OP05.find();
        const set6 = await OP06.find();
        const set7 = await OP07.find();
        const set8 = await OP08.find();
        const set9 = await OP09.find();
        const set10 = await OP10.find();
        const set11 = await OP11.find();

        cards = [set1, set2, set3, set4, set5, set6, set7, set8, set9, set10, set11]
        res.json(cards);
    }
    catch (err){
        res.status(500).json({message: err.message});
    }   
});

module.exports = router;