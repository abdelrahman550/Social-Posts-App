import React, { useContext } from "react";
import { Outlet } from "react-router";
import { authContext } from "../../Context/AuthContextProvider";
import NavBar from './../../components/Navbar/NavBar';

export default function Layout() {
  // Token Authentication Hook

  const { token } = useContext(authContext);

  return (
    <>
      {token && <NavBar />}
      <Outlet />
    </>
  );
}
