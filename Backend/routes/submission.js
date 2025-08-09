const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');

// Save a new submission
router.post('/save', async (req, res) => {
  try {
    const { userId, username, problemId, problemTitle, verdict, code, language = 'cpp' } = req.body;
    const newSubmission = new Submission({
      user: userId,
      username,
      problem: problemId,
      problemTitle,
      verdict,
      code,
      language
    });
    await newSubmission.save();
    res.status(201).json({ message: 'Submission saved successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

// Get paginated submissions of a specific user
router.get('/my-submissions', async (req, res) => {
  try {
    const { userId, page = 1, limit = 10 } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const total = await Submission.countDocuments({ user: userId });

    const submissions = await Submission.find({ user: userId })
      .sort({ submittedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({ submissions, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

module.exports = router;
