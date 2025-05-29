const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
    userID: {
        type: String,
        required:true,
    },
    displayName:{
        type:String,
        required:true,
    },
    profileImagePath:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    collections:{
        type:Object,
        required:false,
    }
});

const db = mongoose.connection.useDb('User_Profiles');
const UserProfile = db.model("profile", UserProfileSchema);

module.exports = {
    UserProfile
};
