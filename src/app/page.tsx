"use client";
import React, { useState, useEffect } from "react";

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
    <div
 
       
   
    >
      <Navbar handleToggle={handleToggle} />
      <AddFile />
      <Footer />
    </div>
  );
}

export default App;
