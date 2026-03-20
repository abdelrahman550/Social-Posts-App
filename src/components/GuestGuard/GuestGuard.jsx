import React, { useContext } from "react";
import { authContext } from "../../Context/AuthContextProvider";
import { Navigate, Outlet } from "react-router";

export default function GuestGuard() {
  // Token Authentication Hook
  const { token } = useContext(authContext);

  if (token) {
    return <Navigate to={"/feed"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
