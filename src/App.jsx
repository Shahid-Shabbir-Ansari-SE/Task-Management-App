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
        <div className="w-full m-0 p-0 dark:bg-black dark:">
          <div className="flex">
            <div className="w-[255px] h-screen">
              <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            </div>
            <div className="w-[calc(100vw-255px)] h-screen">
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
