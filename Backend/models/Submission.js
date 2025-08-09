const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String },
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  problemTitle: { type: String },
  verdict: { type: String, enum: ['Accepted', 'Wrong Answer', 'Compilation Error', 'Runtime Error', 'TLE'] },
  language: { type: String, default: 'cpp' },
  code: { type: String },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
