import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Banner from "../components/Homepage/Banner";
import PopularGame from "../components/PopularGame";

const Root = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
        <Banner />
        <PopularGame />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
