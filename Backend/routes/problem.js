const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

// ➕ Add new problem
router.post('/add', async (req, res) => {
  try {
    const problem = new Problem(req.body);
    await problem.save();
    res.status(201).json({ message: 'Problem saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📋 Get all problems with filter & pagination
router.get('/', async (req, res) => {
  try {
    const { title = '', tag = '', difficulty = '', page = 1, limit = 10 } = req.query;
    const query = {};

    if (title) query.title = { $regex: title, $options: 'i' };
    if (tag) query.tags = { $in: [tag] };
    if (difficulty && difficulty !== 'All') query.difficulty = difficulty;

    const total = await Problem.countDocuments(query);
    const problems = await Problem.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ problems, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔍 Get single problem by ID
router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ error: "Problem not found" });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
