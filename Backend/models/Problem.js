const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  tags: [String],
  statement: { type: String, required: true },
  inputFormat: String,
  outputFormat: String,
  constraints: String,
  samples: [
    {
      input: String,
      output: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Problem', problemSchema);