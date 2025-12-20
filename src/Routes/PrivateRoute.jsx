import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Provider/AuthProvider'
import { Navigate, useLocation } from 'react-router'
import { signOut } from 'firebase/auth'
import auth from '../Firebase/firebase.config'

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading, userStatus } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (userStatus === "blocked") {
      alert("You're banned");
      signOut(auth);
    }
  }, [userStatus]);

  if (loading || roleLoading) {
    return <p>loadiinggggggggggggggg.............</p>;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }

  if (userStatus === "blocked") {
    return null;
  }

  return children;
};

export default PrivateRoute