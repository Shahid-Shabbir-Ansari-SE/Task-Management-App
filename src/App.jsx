import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Home from "./pages/home";
import Roadmap from "./pages/roadmap";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="w-full m-0 p-0">
          <div className="flex">
            <div className="w-[255px] h-screen">
            <Sidebar />
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
