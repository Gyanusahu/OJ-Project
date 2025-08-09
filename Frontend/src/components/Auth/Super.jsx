import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import apis from "../../utils/apis";
import httpAction from "../../utils/httpAction";
import Spinner from "react-bootstrap/Spinner";
import "./Super.css"; // 💡 Create this file for custom loader styling

const Super = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const getUserAccess = async () => {
      const data = { url: apis().getAccess };
      setLoading(true);
      const result = await httpAction(data);
      setLoading(false);
      if (result?.status) setIsAuth(true);
      else setIsAuth(false);
    };
    getUserAccess();
  }, []);

  if (loading) {
    return (
      <div className="super-loader">
        <Spinner animation="border" role="status" variant="primary" />
        <span className="loading-text">Verifying access...</span>
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default Super;
