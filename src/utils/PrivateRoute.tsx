import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import Loading from "../components/Loading";
import { selectAuth } from "../features/authSlice";

const PrivateRoute = ({ children }: { children: any }) => {
  const { user, isLoading } = useAppSelector(selectAuth);

  const { pathname } = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !user.email) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
