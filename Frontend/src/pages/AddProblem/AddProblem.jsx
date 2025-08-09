// ✅ AddProblem.jsx
import React, { useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Headers from '../../components/Headers/Headers';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from '../../components/Footers/Footer';

const LOCAL_STORAGE_KEY = "add-problem-draft";

const AddProblem = () => {
  const [problem, setProblem] = useState({
    title: '',
    difficulty: 'Easy',
    tags: '',
    statement: '',
    inputFormat: '',
    outputFormat: '',
    constraints: '',
    sampleInput: '',
    sampleOutput: '',
    hiddenTests: [
      { input: '', output: '' },
      { input: '', output: '' }
    ]
  });

  useEffect(() => {
    const savedDraft = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedDraft) {
      setProblem(JSON.parse(savedDraft));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(problem));
  }, [problem]);

  const handleChange = (e) => {
    setProblem({ ...problem, [e.target.name]: e.target.value });
  };

  const handleHiddenTestChange = (index, field, value) => {
    const updated = [...problem.hiddenTests];
    updated[index][field] = value;
    setProblem({ ...problem, hiddenTests: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = problem.tags.split(',').map(tag => tag.trim());

    const payload = {
      title: problem.title,
      difficulty: problem.difficulty,
      tags: tagsArray,
      statement: problem.statement,
      inputFormat: problem.inputFormat,
      outputFormat: problem.outputFormat,
      constraints: problem.constraints,
      samples: [
        {
          input: problem.sampleInput,
          output: problem.sampleOutput
        }
      ],
      hiddenTests: problem.hiddenTests
    };

    try {
      const res = await fetch("https://backend.coderush.space/api/problems/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      alert(data.message || "Problem added successfully");
      setProblem({
        title: '',
        difficulty: 'Easy',
        tags: '',
        statement: '',
        inputFormat: '',
        outputFormat: '',
        constraints: '',
        sampleInput: '',
        sampleOutput: '',
        hiddenTests: [
          { input: '', output: '' },
          { input: '', output: '' }
        ]
      });
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error("Error submitting problem:", error);
    }
  };

  return (
    <>
      <Headers />
      <div className='container'>
        <h2 className='text-center mt-4'>Add Problem</h2>
        <Card className='shadow mt-3 p-4'>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={problem.title} onChange={handleChange} required />
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Difficulty</Form.Label>
                <Form.Select name="difficulty" value={problem.difficulty} onChange={handleChange}>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Tags (comma-separated)</Form.Label>
              <Form.Control type="text" name="tags" value={problem.tags} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Statement</Form.Label>
              <Form.Control as="textarea" rows={3} name="statement" value={problem.statement} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Input Format</Form.Label>
              <Form.Control as="textarea" rows={2} name="inputFormat" value={problem.inputFormat} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Output Format</Form.Label>
              <Form.Control as="textarea" rows={2} name="outputFormat" value={problem.outputFormat} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Constraints</Form.Label>
              <Form.Control as="textarea" rows={2} name="constraints" value={problem.constraints} onChange={handleChange} />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Sample Input</Form.Label>
                <Form.Control as="textarea" rows={2} name="sampleInput" value={problem.sampleInput} onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Sample Output</Form.Label>
                <Form.Control as="textarea" rows={2} name="sampleOutput" value={problem.sampleOutput} onChange={handleChange} />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Hidden Test Cases</Form.Label>
              {problem.hiddenTests.map((test, idx) => (
                <div key={idx}>
                  <Form.Label>Input #{idx + 1}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={test.input}
                    onChange={(e) => handleHiddenTestChange(idx, 'input', e.target.value)}
                  />
                  <Form.Label>Output #{idx + 1}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={test.output}
                    onChange={(e) => handleHiddenTestChange(idx, 'output', e.target.value)}
                  />
                </div>
              ))}
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">Submit Problem</Button>
            </div>
          </Form>
        </Card>
      </div>
      <Footer/>
    </>
  );
};

export default AddProblem;
