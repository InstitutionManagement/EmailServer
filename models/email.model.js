const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let email = new Schema({
    sender_id:{
        type: Schema.Types.ObjectId,
        required: true,
        unique: false
    },
    from:{
        type: String,
        required: true,
        unique: false
    },
    to:{
        type: String,
        required: true,
        unique: false
    },
    subject:{
        type: String,
        required: true,
        unique: false
    },
    text:{
        type: String,
        required: true,
        unique: false
    },
    attachment:[{
        type: String,
        required: true,
        unique: false
    }],
    date:{
        type: Date,
        default: Date()
    }
});

module.exports = mongoose.model('Email', email);