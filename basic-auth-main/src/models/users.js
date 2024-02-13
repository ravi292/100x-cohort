const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    "username" : {
        type : String,
        required : true,
        unique : true
    },
    "email" : {
        type : String,
        required : true,
        unique : true
    },
    "password" : String,
    "uniqueId" : {
        type : String,
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = {
    User,
}