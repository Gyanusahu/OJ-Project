const User = require('../models/User');

const updateAdminStatus = async (req, res) => {
  const { userId, isAdmin } = req.body;

  if (!userId || typeof isAdmin !== "boolean") {
    return res.status(400).json({ status: false, message: "Missing or invalid data" });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { isAdmin }, { new: true });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    return res.status(200).json({
      status: true,
      message: `User is now ${user.isAdmin ? "an Admin" : "a Normal User"}`,
      user,
    });
  } catch (err) {
    console.error("Error updating admin status:", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email isAdmin submission createdAt");
    return res.status(200).json({ status: true, users });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Failed to fetch users" });
  }
};

module.exports = {
  updateAdminStatus,
  getAllUsers,
};
