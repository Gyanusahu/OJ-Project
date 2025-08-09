import React, { useEffect, useState } from "react";
import useGeneral from '../../hooks/useGeneral';
import httpAction from '../../utils/httpAction';
import apis from '../../utils/apis';
import 'bootstrap/dist/css/bootstrap.min.css';
import Headers from "../../components/Headers/Headers";
import Footer from "../../components/Footers/Footer";
import PreviousSubmissions from "../Submission/MySubmissions";

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const data = {
        url: apis().userProfile,
      };
      const result = await httpAction(data);
      if (result?.status) {
        setUser(result.user);
      }
    };
    getUser();
  }, []);

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <>
    <Headers/>
    <div className="container mt-5">
      <h2 className="mb-4 text-center">👤 User Dashboard</h2>
        {user.isAdmin && (
    <div className="text-end mb-3">
      <a href="/usercontroller" className="btn btn-outline-primary">
        ⚙️ User Controller
      </a>
    </div>
  )}
      <div className="row g-4">
        {/* Profile Info Card */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">🧾 Profile Information</h5>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>User Type:</strong> 
                <span className={`ms-2 badge ${user.isAdmin ? 'bg-danger' : 'bg-secondary'}`}>
                  {user.isAdmin ? 'Admin' : 'Normal User'}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Submission Info Card */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title">📈 Total Submissions</h5>
              <h2 className="text-primary display-4">{user.submission}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PreviousSubmissions />
    {/* <Footer/> */}
    </>
  );
};

export default UserDashboard;
