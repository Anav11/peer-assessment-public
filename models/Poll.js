const {Schema, model, Types} = require('mongoose');
const shortid = require('shortid');

const schema = new Schema({
    _id: { type: String, 'default': shortid.generate, required: true },
    projectAuthors: [{ type: String, required: true }],
    assessments: [{ type: Types.ObjectId, ref: 'Assessment' }],
    cards: [{ type:Object }],
    date: { type: Date, default: Date.now },
    owner: { type: Types.ObjectId, required: true, ref: 'User' }
})

module.exports = model('Poll', schema); 
