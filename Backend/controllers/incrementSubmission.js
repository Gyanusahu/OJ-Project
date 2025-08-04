// controllers/incrementSubmission.js
const User = require('../models/User');

const incrementSubmission = async (req, res, next) => {
  const email = req.email; // req.email must come from your auth middleware
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $inc: { submission: 1 } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, submission: user.submission });
  } catch (err) {
    next(err);
  }
};

module.exports = incrementSubmission;
