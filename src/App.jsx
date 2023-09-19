import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/sidebar";
import Home from "./pages/home";
import Roadmap from "./pages/roadmap";

function App() {
  const [darkMode, setDarkMode] = useState(()=>{
    const storedTheme = localStorage.getItem("colorTheme");
    return storedTheme === 'dark'
  });
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("colorTheme", darkMode ? "light" : "dark");
  }

  return (
    <BrowserRouter>
      <div className={darkMode ? "dark" : ""}>
        <div className="w-full dark:bg-[#222327] font-Poppins">
          <div className="lg:flex md:flex sm:grid">
            <div className="lg:w-[255px] lg:h-screen lg:shadow-none md:w-[255px] md:shadow-none w-full sticky top-0 bg-white shadow-md dark:bg-[#1C1D22] dark:shadow-sm dark:shadow-gray-500">
              <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            </div>
            <div className="lg:w-[calc(100vw-255px)] md:w-[calc(100vw-255px)] sm:w-full h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/roadmap" element={<Roadmap />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
