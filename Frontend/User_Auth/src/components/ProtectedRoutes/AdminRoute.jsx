import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import apis from "../../utils/apis";
import httpAction from "../../utils/httpAction";
import Spinner from "react-bootstrap/Spinner";
import "../../components/Super.css"; // Use same loader styling

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      setLoading(true);
      const result = await httpAction({ url: apis().userProfile });
      setLoading(false);

      if (result?.status && result.user?.isAdmin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminAccess();
  }, []);

  if (loading) {
    return (
      <div className="super-loader">
        <Spinner animation="border" variant="primary" />
        <span className="loading-text">Checking admin access...</span>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AdminRoute;
