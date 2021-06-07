const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: { 
        type : String , 
        unique : true, 
        required : true, 
        dropDups: true },
    todos: [{
        id: { 
            type : String , 
            unique : true, 
            required : true, 
            dropDups: true 
        },
        todo: String
    }]
})

module.exports = mongoose.model('User', UserSchema);