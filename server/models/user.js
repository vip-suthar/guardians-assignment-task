const Mongoose = require('mongoose');

// User Schema
const UserSchema = new Mongoose.Schema({
    email: { type: String, required: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    userDataRef: { type: Mongoose.Types.ObjectId, required: true, ref: 'UserData' },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Mongoose.model('User', UserSchema);