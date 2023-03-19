import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import WhatIsThis from "./pages/WhatIsThis";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import pb from "./api/pocketbase";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(pb.authStore.isValid);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);

    if (isSidebarOpen) {
      setIsActive(!isActive);
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="">
          {isUserLoggedIn && (
            <>
              {isSidebarOpen ? (
                <>
                  <Sidebar />
                  <button
                    className="z-50 btn absolute top-0 left-60 ml-4 hover:text-accent-focus text-lg text-red-500 border-none bg-transparent"
                    onClick={toggleSidebar}
                  >
                    <AiOutlineClose size={30} />
                  </button>
                </>
              ) : (
                <button
                  className="mt-3 ml-4 text-2xl hover:text-accent-focus"
                  onClick={toggleSidebar}
                >
                <FaBars />
                </button>
              )}
            </>
          )}
        </div>
        <div className={`w-screen h-screen ${isSidebarOpen ? 'blur-xl' : ''}`}>
          <Routes >
            <Route path="/" element={<Home isUserLoggedIn = {isUserLoggedIn} />} />
            <Route path="/what-is-this" element={<WhatIsThis />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
