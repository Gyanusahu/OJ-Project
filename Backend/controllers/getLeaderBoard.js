const User = require('../models/User');

const getLeaderboard = async (req, res, next) => {
  try {
    const users = await User.find({}, 'name email submission') // only necessary fields
      .sort({ submission: -1 }); // sort by submission count descending

    res.status(200).json({
      status: true,
      message: "Leaderboard fetched successfully",
      leaderboard: users
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getLeaderboard;
