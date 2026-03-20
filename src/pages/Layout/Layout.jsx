import React, { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router";
import NavBar from "../../components/Navbar/Navbar";
import { authContext } from "../../Context/AuthContextProvider";

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
