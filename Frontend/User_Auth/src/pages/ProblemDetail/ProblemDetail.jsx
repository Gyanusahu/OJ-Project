import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Headers from '../../components/Headers/Headers';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

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
        <div className="d-flex justify-content-between align-items-center">
          <h2>{problem.title}</h2>
          <Badge bg={
            problem.difficulty === "Easy" ? "success" :
            problem.difficulty === "Medium" ? "warning" : "danger"
          }>
            {problem.difficulty}
          </Badge>
        </div>

        <p><strong>Description:</strong><br />{problem.statement}</p>
        <p><strong>Input Format:</strong><br />{problem.inputFormat}</p>
        <p><strong>Output Format:</strong><br />{problem.outputFormat}</p>
        <p><strong>Constraints:</strong><br />{problem.constraints}</p>
        <p><strong>Tags:</strong> {problem.tags.map((tag, i) => (
          <Badge key={i} bg="secondary" className="me-1">{tag}</Badge>
        ))}</p>

        {problem.samples.map((sample, idx) => (
          <div key={idx} className="mb-3">
            <p><strong>Sample Input:</strong></p>
            <Form.Control as="textarea" value={sample.input} rows={2} readOnly />
            <p className="mt-2"><strong>Sample Output:</strong></p>
            <Form.Control as="textarea" value={sample.output} rows={2} readOnly />
          </div>
        ))}

        <div className="mt-4">
          <h5>Code Editor:</h5>
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="# Write your C++ code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="mt-3 d-flex gap-2">
          <Form.Control
            as="textarea"
            placeholder="Enter custom input..."
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ flex: 1 }}
          />
          <Form.Control
            as="textarea"
            placeholder="Output..."
            rows={3}
            value={loading ? 'Running...' : output}
            readOnly
            style={{ flex: 1, backgroundColor: '#f8f9fa' }}
          />
        </div>

        <div className="mt-3 d-flex gap-3">
          <Button variant="primary" onClick={handleRun} disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Running...
              </>
            ) : (
              'Run'
            )}
          </Button>
         <Button variant="success" onClick={handleSubmit} disabled={loading}>
  {loading ? (
    <>
      <Spinner animation="border" size="sm" /> Submitting...
    </>
  ) : (
    'Submit'
  )}
</Button>

          <Button variant="info" disabled>AI Review</Button>
        </div>
      </div>
    </>
  );
};

export default ProblemDetail;
