import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Headers from '../../components/Headers/Headers';

const PreviousSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get('https://backend.coderush.space/api/user/profile', { withCredentials: true });
      setUser(res.data.user);
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  const fetchSubmissions = async () => {
    if (!user) return;
    try {
      const res = await axios.get('https://backend.coderush.space/api/submissions/my-submissions', {
        params: { userId: user._id, page, limit }
      });
      setSubmissions(res.data.submissions);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) fetchSubmissions();
  }, [user, page]);

  const totalPages = Math.ceil(total / limit);

  const getVerdictStyle = (verdict) => {
    switch (verdict) {
      case 'Accepted':
        return { color: 'green', fontWeight: 'bold' };
      case 'Wrong Answer':
        return { color: 'red', fontWeight: 'bold' };
      case 'Compilation Error':
        return { color: 'orange', fontWeight: 'bold' };
      case 'Runtime Error':
        return { color: 'purple', fontWeight: 'bold' };
      case 'TLE':
        return { color: 'blue', fontWeight: 'bold' };
      default:
        return {};
    }
  };

  return (
    <>
      {/* <Headers /> */}
      <div className="container mt-4">
        <h3 className="mb-4">My Submissions</h3>

        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              {/* <th>User Name</th> */}
              <th>Problem Title</th>
              <th>Verdict</th>
              <th>Language</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, idx) => (
              <tr key={sub._id}>
                <td>{(page - 1) * limit + idx + 1}</td>
                {/* <td>{sub.username}</td> */}
                <td>{sub.problemTitle}</td>
                <td style={getVerdictStyle(sub.verdict)}>{sub.verdict}</td>
                <td>{sub.language}</td>
                <td>{new Date(sub.submittedAt).toLocaleString()}</td>
              </tr>
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

export default PreviousSubmissions;
