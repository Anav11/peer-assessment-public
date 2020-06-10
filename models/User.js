const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    polls: [{type: Types.ObjectId, ref: 'Poll'}]
})

module.exports = model('User', schema); 
