const express = require("express");
const {UserProfile} = require('../models/UserProfile');

const router = express.Router();

router.get("/:id", async(req, res) => {
    try{
        const profileInfo = await UserProfile.findById(req.params.id);

        res.json(profileInfo);
    }
    catch (err){
        res.status(500).json({message: err.message});
    }   
});

router.post("/:id", async(req, res) => {
    const profile = new UserProfile({
        userID: req.params.id,
        displayName: "user",

    })
    
    try{
        const newProfile = await profile.save();

        res.status(201).json(newProfile);
    }
    catch (err){
        res.status(500).json({message: err.message});
    }   
});

module.exports = router;