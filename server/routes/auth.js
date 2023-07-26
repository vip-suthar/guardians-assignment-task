const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const { jwtConfig } = require('../config');
const sendMail = require('../utils/sendMail');
const { signupEmail, resetEmail, confirmResetPasswordEmail } = require('../utils/mailTemplates');

const User = require('../models/user');
const UserData = require('../models/userData');
const setupDBService = require('../services/dbService');

router.post('/login', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'You must enter an email address.' });
    }

    if (!password) {
      return res.status(400).json({ error: 'You must enter a password.' });
    }

    await setupDBService();

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ error: 'No user found for this email address.' });
    }

    let hash = crypto.createHash('sha256')
      .update(password + user.salt)
      .digest('hex');

    let isMatch = bcrypt.compare(hash, user.hash);

    if (!isMatch) {
      return res.status(400).json({
        error: 'Incorrect Credentials'
      });
    }

    const payload = {
      "_id": user._id,
      "email": user.email,
      "expires_in": jwtConfig.DEFAULT_TOKEN_LIFE
    }

    let tokenLife = jwtConfig.DEFAULT_TOKEN_LIFE;
    if(!!rememberMe) tokenLife = tokenLife*5;
    const token = jwt.sign(payload, jwtConfig.SECRET, { expiresIn: tokenLife });

    if (!token) {
      throw new Error();
    }

    const userData = await UserData.findById(user.userDataRef);

    res.status(200).json({
      token: token,
      userData: {
        basicInfo: {
          ...userData.basicInfo._doc,
          email: user.email
        },
        medicalInfo: userData.medicalInfo._doc,
        emergencyContact: userData.emergencyContact._doc
      }
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, data } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ error: 'You must enter an email address.' });
    }

    if (!password) {
      return res.status(400).json({ error: 'You must enter a password.' });
    }

    if (!data) {
      return res
        .status(400)
        .json({ error: 'Please provide valid user data.' });
    }

    await setupDBService();

    let existingUser = await User.exists({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'That email address is already in use.' });
    }

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      salt,
      hash
    });

    const userData = new UserData({
      basicInfo: data.basicInfo,
      medicalInfo: data.medicalInfo,
      emergencyContact: data.emergencyContact
    })

    user.userDataRef = userData._id;
    await user.save();
    await userData.save();
    sendMail(email, signupEmail(userData.basicInfo.name));

    const payload = {
      "_id": user._id,
      "email": user.email,
      "expires_in": jwtConfig.DEFAULT_TOKEN_LIFE
    }

    const token = jwt.sign(payload, jwtConfig.SECRET, { expiresIn: jwtConfig.DEFAULT_TOKEN_LIFE });

    if (!token) {
      throw new Error();
    }

    res.status(200).json({
      token: token,
      userData: {
        basicInfo: {
          ...userData.basicInfo._doc,
          email: user.email
        },
        medicalInfo: userData.medicalInfo._doc,
        emergencyContact: userData.emergencyContact._doc
      }
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.post('/forgot', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ error: 'You must enter an email address.' });
    }

    await setupDBService();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .send({ error: 'No user found for this email address.' });
    }

    const buffer = crypto.randomBytes(48);
    const resetToken = buffer.toString('hex');

    existingUser.resetPasswordToken = resetToken;
    existingUser.resetPasswordExpires = Date.now() + (1 * 60 * 60 * 1000); // 1 hour

    existingUser.save();

    sendMail(
      existingUser.email,
      resetEmail(req.headers.host, resetToken)
    )

    res.status(200).json({
      message: 'Please check your email for the link to reset your password.'
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.post('/reset', async (req, res) => {
  try {
    const { password, token } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'You must enter a password.' });
    }

    await setupDBService();

    const resetUser = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!resetUser) {
      return res.status(400).json({
        error:
          'Your token has expired. Please attempt to reset your password again.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    resetUser.hash = hash;
    resetUser.resetPasswordToken = null;
    resetUser.resetPasswordExpires = null;

    resetUser.save();

    sendMail(
      resetUser.email,
      confirmResetPasswordEmail()
    );

    res.status(200).json({
      message: 'Password changed successfully. Please login with your new password.'
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = router;