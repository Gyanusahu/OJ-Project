const User = require('../models/User');

const getUser = async (req, res, next) => {
    const email = req.email;
    try {
        const findedUser = await User.findOne({ email: email });
        if (!findedUser) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

res.status(200).json({
    message: 'success',
    status: true,
    user: {
        _id: findedUser._id,
        name: findedUser.name,
        email: findedUser.email,
        submission: findedUser.submission,
        isAdmin: findedUser.isAdmin  
    }
});

    } catch (error) {
        next(error);
    }
};

module.exports = getUser;
