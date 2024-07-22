const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opSchema = new Schema({
    flname : { type : String , required : true },
    email : { type : String , required : true },
    opinion : { type : String , required : true }
});

const OpModel = mongoose.model('opinions' , opSchema);

module.exports = OpModel;