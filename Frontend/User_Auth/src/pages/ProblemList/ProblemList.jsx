import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import ProblemRow from '../../components/ProblemRow'; // adjust path if needed

import './ProblemList.css'; // optional for styles
import Headers from '../../components/Headers/Headers';

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const fetchProblems = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/problems', {
        params: { title, tag, difficulty, page, limit }
      });
      setProblems(res.data.problems);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [title, tag, difficulty, page]);

  const handleReset = () => {
    setTitle('');
    setTag('');
    setDifficulty('All');
    setPage(1);
  };

  const totalPages = Math.ceil(total / limit);

  return (
  <>
  <Headers/>
    <div className="container mt-4">
      <h3 className="mb-4">Problem List</h3>

      {/* Filters */}
      <Row className="mb-3">
        <Col><Form.Control placeholder="Search by title" value={title} onChange={(e) => setTitle(e.target.value)} /></Col>
        <Col><Form.Control placeholder="Search by tag" value={tag} onChange={(e) => setTag(e.target.value)} /></Col>
        <Col>
          <Form.Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option>All</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </Form.Select>
        </Col>
        <Col md="auto">
          <Button variant="primary" onClick={fetchProblems}>Search</Button>
        </Col>
        <Col md="auto">
          <Button variant="secondary" onClick={handleReset}>Reset</Button>
        </Col>
      </Row>

      <p>Solved: 0 / {total}</p>

      {/* Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Tags</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((prob, idx) => (
            <ProblemRow
              key={prob._id}
              problem={prob}
              index={idx}
              currentPage={page}
              limit={limit}
            />
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1} />
        {[...Array(totalPages).keys()]
          .slice(Math.max(0, page - 3), page + 2)
          .map(i => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === page}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === totalPages} />
      </Pagination>
    </div>
    </>
  );
};

export default ProblemList;
