import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WhatIsThis from "./pages/WhatIsThis";

import pb from "./api/pocketbase";


function App() {
  pb.authStore.clear();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(pb.authStore.isValid);



  console.log(isUserLoggedIn);

  return (
    <>
        <div >
          <Routes >
            <Route path="/" element={<Home isUserLoggedIn = {isUserLoggedIn} />} />
            <Route path="/what-is-this" element={<WhatIsThis />} />
          </Routes>
        </div>
    </>
  );
}
export default App;
