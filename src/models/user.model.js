const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    tg_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, default: '' },
    username: { type: String, default: '' },
    age: { type: String, default: 0 },
    experience: { type: String, default: '' },
    workTime: { type: String, default: '' },
    arbitrageExperience: { type: String, default: '' },
    location: { type: String, default: '' },
})

const User = mongoose.model('User', userSchema);
module.exports = User;