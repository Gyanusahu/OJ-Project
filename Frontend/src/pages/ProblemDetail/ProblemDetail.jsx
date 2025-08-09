import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Headers from '../../components/Headers/Headers';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './ProblemDetail.css';
import ReactMarkdown from 'react-markdown';
import httpAction from '../../utils/httpAction';
import apis from '../../utils/apis';
import Footer from '../../components/Footers/Footer';

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiReview, setAiReview] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [user, setUser] = useState(null);

  // 🔒 Check login
  useEffect(() => {
    const getUser = async () => {
      const data = { url: apis().userProfile };
      const result = await httpAction(data);
      if (result?.status) {
        setUser(result.user);
      } else {
        setUser(null);
      }
    };
    getUser();
  }, []);

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
    if (!user) return navigate("/login");
    try {
      const res = await axios.post("http://localhost:7000/run", {
        code,
        input,
        language: "cpp"
      });
      setOutput(res.data.success ? res.data.output.stdout || res.data.output : res.data.error || "Execution error.");
    } catch (err) {
      setOutput(err.response?.data?.error || "Unknown error occurred.");
    }
  };

  const handleSubmit = async () => {
  if (!user) return navigate("/login");
  if (!problem) return;
  setLoading(true);
  try {
    const allTests = [
      ...(problem.samples || []).map(t => ({ ...t, isHidden: false })),
      ...(problem.hiddenTests || []).map(t => ({ ...t, isHidden: true }))
    ];

    const res = await axios.post("http://localhost:7000/submit", {
      code,
      language: "cpp",
      testCases: allTests,
    });

    let verdictText = "";
    if (res.data.success) {
      if (res.data.verdict === "Accepted") {
        verdictText = "Accepted";
        setOutput("✅ All test cases passed!");
      } else {
        verdictText = "Wrong Answer";
        setOutput(`❌ Failed on ${res.data.isHidden ? 'Hidden' : 'Sample'} Test Case #${res.data.failedTest}\nYour Output:\n${res.data.actualOutput}`);
      }

      // 🔹 Save submission to backend for history
      await axios.post("http://localhost:5050/api/submissions/save", {
        userId: user._id,
        userName: user.name,
        problemId: problem._id,
        problemTitle: problem.title,
        code,
        verdict: verdictText,
        submittedAt: new Date()
      }, { withCredentials: true });

      // Increment submission count
      await axios.post("http://localhost:5050/api/user/increment-submission", {}, { withCredentials: true });

    } else {
      verdictText = "Error";
      setOutput("❌ Submission Error");
    }
  } catch (err) {
    setOutput(err.response?.data?.error || "Unknown error");
  }
  setLoading(false);
};


  const handleAiReview = async () => {
    if (!user) return navigate("/login");
    if (!code || !problem.statement) return alert("Missing code or problem description");
    setReviewLoading(true);
    try {
      const res = await axios.post("http://localhost:7000/ai-review", {
        code,
        problemDescription: problem.statement
      });
      setAiReview(res.data.success ? res.data.aiReview : "❌ AI Review failed.");
    } catch (err) {
      setAiReview(err.response?.data?.error || "Unknown AI review error");
    }
    setReviewLoading(false);
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
          <div className="col-md-6">
            <h5>Code Editor:</h5>
            <Form.Control
              as="textarea"
              rows={18}
              placeholder="# Write your C++ code here"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mb-3 code-editor"
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
      <Footer/>
    </>
  );
};

export default ProblemDetail;
