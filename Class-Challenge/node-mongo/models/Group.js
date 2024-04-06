const mongoose = require("mongoose");

// Define the regex patterns for validation
const groupNamePattern = /^[a-z0-9!@#$%^&?*+_.-]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GroupSchema = new mongoose.Schema({
    groupname: {
        type: String,
        lowercase: true, 
        required: [true, "Group name is required"], 
        match: [groupNamePattern, "Invalid groupname format"] // Validate against the regex pattern above
    },
    email: {
        type: String,
        lowercase: true, 
        required: [true, "Email is required"], 
        match: [emailPattern, "Invalid email format"] // Validate against the regex pattern above
    },
    mobile: Number,
    profile: String,
    avatarimage: String,
});

module.exports = mongoose.model("Group", GroupSchema);