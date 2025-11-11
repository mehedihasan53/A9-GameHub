import React from "react";
import PopularGame from "../components/PopularGame";
import Newsletter from "../components/Newsletter";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Home = () => {
  useDocumentTitle("GameHub - Discover Amazing Games");
  return (
    <div>
      <PopularGame />
      <Newsletter />
    </div>
  );
};

export default Home;
