const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tsSchema = new Schema({
    id : Number,
    text : String,
    url : String
});

const MaModel = mongoose.model('matn' , tsSchema);

module.exports = MaModel;