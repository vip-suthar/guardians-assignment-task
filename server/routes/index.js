const router = require('express').Router();

const authRoute = require('./auth');
const userRoute = require('./user');
const hospitalsRoute = require('./hospitals');

const authMiddleware = require('../middlewares/auth');

router.use("/auth", authRoute);
router.use("/user", authMiddleware, userRoute);
router.use("/hospitals", authMiddleware, hospitalsRoute);
router.use("*", (req, res) => res.status(404).json('No API route found'));

module.exports = router;