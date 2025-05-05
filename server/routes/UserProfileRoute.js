const express = require("express");
const {UserProfile} = require('../models/UserProfile');

const router = express.Router();

router.get("/:id", async(req, res) => {
    try{
        const profileInfo = await UserProfile.findOne({userID: req.params.id});
        if(profileInfo){
            res.status(201).json(profileInfo);
        } else {
            res.status(404).json({message: "Profile not found"});
        }
        
    }
    catch (err){
        res.status(500).json({message: err.message});
    }   
});

router.post("/:id", async(req, res) => {
    const profile = new UserProfile({
        userID: req.params.id,
        displayName: req.body.displayName,
        profileImagePath:req.body.profileImagePath,

    })
    
    try{
        const newProfile = await profile.save();

        res.status(201).json(newProfile);
    }
    catch (err){
        res.status(404).json({message: err.message});
    }   
});

module.exports = router;