import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Headers from '../../components/Headers/Headers';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './ProblemDetail.css';
import ReactMarkdown from 'react-markdown';

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiReview, setAiReview] = useState('');
const [reviewLoading, setReviewLoading] = useState(false);

const handleAiReview = async () => {
  if (!code || !problem.statement) return alert("Missing code or problem description");

  setReviewLoading(true);
  try {
    const res = await axios.post("http://localhost:7000/ai-review", {
      code,
      problemDescription: problem.statement
    });

    if (res.data.success) {
      setAiReview(res.data.aiReview);  // Adjust to match backend return
    } else {
      setAiReview("❌ AI Review failed.");
    }
  } catch (err) {
    setAiReview(err.response?.data?.error || "Unknown AI review error");
  }
  setReviewLoading(false);
};

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/problems/${id}`);
        setProblem(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProblem();
  }, [id]);

  const handleRun = async () => {
  try {
    const res = await axios.post("http://localhost:7000/run", {
      code,
      input,
      language: "cpp"
    });

    if (res.data.success) {
      setOutput(res.data.output.stdout || res.data.output);
    } else {
      setOutput(res.data.error || "Execution error.");
    }
  } catch (err) {
    console.error("Run error:", err); 
    setOutput(err.response?.data?.error || "Unknown error occurred.");
  }
};

const handleSubmit = async () => {
  if (!problem.samples.length) return alert("No test cases found!");

  const test = problem.samples[0]; // use first test case
  setLoading(true);

  try {
    const res = await axios.post("http://localhost:7000/submit", {
      code,
      input: test.input,
      expectedOutput: test.output,
      language: "cpp"
    });

    if (res.data.success) {
      setOutput(res.data.verdict === "Accepted" ? "✅ Accepted" : `❌ Failed\nYour Output:\n${res.data.actualOutput}`);
    } else {
      setOutput("❌ Submission Error");
    }
  } catch (err) {
    setOutput(err.response?.data?.error || "Unknown error");
  }

  setLoading(false);
};

  if (!problem) return <p className="text-center mt-5">Loading...</p>;

  return (
  <>
    <Headers />
    <div className="container mt-4">
      <div className="row">
        {/* Left Panel */}
        <div className="col-md-6">
          <div className="mb-3">
            <h3>{problem.title}</h3>
            <Badge bg={
              problem.difficulty === "Easy" ? "success" :
              problem.difficulty === "Medium" ? "warning" : "danger"
            }>
              {problem.difficulty}
            </Badge>
          </div>

          <p><strong>Description:</strong> {problem.statement}</p>
          <p><strong>Input Format:</strong><br />{problem.inputFormat}</p>
          <p><strong>Output Format:</strong><br />{problem.outputFormat}</p>
          {problem.constraints && (
            <p><strong>Constraints:</strong><br />{problem.constraints}</p>
          )}
          <p><strong>Tags:</strong> {problem.tags.map((tag, i) => (
            <Badge key={i} bg="secondary" className="me-1">{tag}</Badge>
          ))}</p>

          {/* Samples */}
          {problem.samples.map((sample, idx) => (
            <div key={idx}>
              <p><strong>Sample Input:</strong></p>
              <Form.Control as="textarea" rows={2} value={sample.input} readOnly className="mb-2" />
              <p><strong>Sample Output:</strong></p>
              <Form.Control as="textarea" rows={2} value={sample.output} readOnly className="mb-3" />
            </div>
          ))}
        </div>

        {/* Right Panel */}
        {/* Right Panel */}
<div className="col-md-6">
  <h5>Code Editor:</h5>
  <Form.Control
    as="textarea"
    rows={18}
    placeholder="# Write your C++ code here"
    value={code}
    onChange={(e) => setCode(e.target.value)}
    className="mb-3"
    style={{ backgroundColor: "#1e1e1e", color: "white", fontFamily: "monospace" }}
  />

  <div className="d-flex gap-2 mb-3">
    <Form.Control
      as="textarea"
      placeholder="Custom Input"
      rows={3}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      style={{ resize: 'none' }}
    />
    <Form.Control
      as="textarea"
      placeholder="Output"
      rows={3}
      value={loading ? 'Running...' : output}
      readOnly
      style={{ backgroundColor: '#f1f1f1', resize: 'none' }}
    />
  </div>

  <div className="d-flex gap-3 mb-3">
    <Button variant="primary" onClick={handleRun} disabled={loading}>
      {loading ? <Spinner animation="border" size="sm" /> : 'Run'}
    </Button>
    <Button variant="success" onClick={handleSubmit} disabled={loading}>
      {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
    </Button>
    <Button variant="info" onClick={handleAiReview} disabled={reviewLoading}>
      {reviewLoading ? <Spinner animation="border" size="sm" /> : 'AI Review'}
    </Button>
  </div>

{aiReview && aiReview.trim() !== '' && (
 <div className="mt-3">
  <h6>AI Review:</h6>
  
    <div
      className="markdown-box"
      style={{
        backgroundColor: '#f8f9fa',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        maxHeight: '300px',
        overflowY: 'auto',
        fontSize: '0.95rem',
        whiteSpace: 'pre-wrap',
        lineHeight: '1.5',
      }}
    >
      <ReactMarkdown>{aiReview}</ReactMarkdown>
    </div>
</div>
)}
</div>

      </div>
    </div>
  </>
);

}
export default ProblemDetail;
