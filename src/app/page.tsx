"use client"
import React,{useState,useEffect} from 'react'

import Todo from '../Componnent/Todo'
import Navbar from '../Componnent/Navbar'
import Footer from '../Componnent/Footer';

function App() {

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

   
  const handleToggle = (e) => {
    if(e.target.checked) {
    setTheme ("dark");
    }
    else
    setTheme("light")
      }
    
    
    
    
      useEffect ( ()=> {
        localStorage. setItem("theme", theme);
        const localTheme = localStorage.getItem ("theme" );
        document.querySelector("html").setAttribute("data-theme", localTheme);
      }, [theme]);
  return (
    <div>
      <Navbar handleToggle={handleToggle}/>
 <Todo/>
      <Footer/>
    </div>
  )
}

export default App