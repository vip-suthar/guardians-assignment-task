const express = require('express');
const router = express.Router();

const User = require('../models/user');
const UserData = require('../models/userData');
const setupDBService = require('../services/dbService');

router.get('/', async (req, res) => {
    try {

        await setupDBService();

        const user = await User.findById(res.locals.user_id, { email: true, userDataRef: true }).populate('userDataRef');

        res.status(200).json({
            basicInfo: {
                ...user.userDataRef.basicInfo._doc,
                email: user.email
            },
            medicalInfo: user.userDataRef.medicalInfo._doc,
            emergencyContact: user.userDataRef.emergencyContact._doc
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

router.post('/', async (req, res) => {
    try {

        const data = req.body;

        if (!data) {
            return res
                .status(400)
                .json({ error: 'Please provide valid user data.' });
        }

        await setupDBService();

        const user = await User.findById(res.locals.user_id, { email: true, userDataRef: true });

        const userData = await UserData.findByIdAndUpdate(user.userDataRef, {
            basicInfo: data.basicInfo,
            medicalInfo: data.medicalInfo,
            emergencyContact: data.emergencyContact
        });

        res.status(200).json({
            basicInfo: {
                ...userData.basicInfo._doc,
                email: user.email
            },
            medicalInfo: userData.medicalInfo._doc,
            emergencyContact: userData.emergencyContact._doc
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

module.exports = router;