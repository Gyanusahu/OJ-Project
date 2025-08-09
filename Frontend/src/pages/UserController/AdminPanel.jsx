import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Headers from '../../components/Headers/Headers';
import Footer from '../../components/Footers/Footer';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5050/api/user/users', {
        withCredentials: true,
      });

      if (res.data.status) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
    setLoading(false);
  };

  const toggleAdmin = async (userId, isAdmin) => {
    try {
      const newRole = !isAdmin;
      await axios.post(
        'http://localhost:5050/api/user/users/admin',
        {
          userId,
          isAdmin: newRole,
        },
        {
          withCredentials: true,
        }
      );
      // Refresh users list after update
      fetchUsers();
    } catch (error) {
      console.error('Error updating admin status:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Headers />
      <div className="container mt-5">
        <h3>User Role Management</h3>

        {/* Search Input */}
        <div className="mb-3">
  <input
    type="text"
    className="form-control form-control-sm w-50"
    placeholder="Search by email..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>


        {/* Loader or Table */}
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Submissions</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) =>
                  user.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.submission}</td>
                    <td>{user.isAdmin ? 'Admin' : 'Normal User'}</td>
                    <td>
                      <Button
                        onClick={() => toggleAdmin(user._id, user.isAdmin)}
                        variant={user.isAdmin ? 'danger' : 'success'}
                      >
                        {user.isAdmin ? 'Revoke Admin' : 'Make Admin'}
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default AdminPanel;
