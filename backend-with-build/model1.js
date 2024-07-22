const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orSchema = new Schema({
    flname: { type: String, required: true },
    phone: { type: String, required: true },
    title: { type: String, required: true },
    service: { type: String, required: true },
    explain: { type: String, required: true },
    email: { type: String, required: true }
} , {timestamps : true});

const OrModel = mongoose.model("orders" , orSchema);

module.exports = OrModel;