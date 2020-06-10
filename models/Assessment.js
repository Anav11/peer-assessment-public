const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    expert: { type: String, required: true },
    projectAuthor: { type: String },
    marks: [{ type:Object }],
    owner: { type: String, required: true, ref: 'Poll' }
})

module.exports = model('Assessment', schema); 
