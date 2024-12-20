"use client";
import React, { useState, useEffect, Fragment } from "react";

import Navbar from "@/commponent/Navbar/Navbar";
import Footer from "@/commponent/Footer/Footer";
import AddFile from "@/commponent/AddFile/AddFile";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else setTheme("light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  return (
    <Fragment>
      <Navbar handleToggle={handleToggle} />
      <AddFile />
      <Footer />
    </Fragment>
  );
}

export default App;
