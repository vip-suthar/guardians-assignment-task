const Mongoose = require('mongoose');

// User Schema
const UserDataSchema = new Mongoose.Schema({
    basicInfo: {
        type: {
            _id: false,
            name: { type: String, required: true },
            phoneNumber: { type: String, required: true },
        },
        required: true
    },
    medicalInfo: {
        type: {
            _id: false,
            allergies: { type: String, default: "" },
            currMedications: { type: String, default: "" },
            medicalCondtns: { type: String, default: "" }
        },
        required: true
    },
    emergencyContact: {
        type: {
            _id: false,
            name: { type: String, required: true },
            phoneNumber: { type: String, required: true },
            address: { type: String, required: true }
        },
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Mongoose.model('UserData', UserDataSchema);