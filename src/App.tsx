import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WhatIsThis from "./pages/WhatIsThis";

function App() {
  //pb.authStore.clear();
  //const [isUserLoggedIn, setIsUserLoggedIn] = useState(pb.authStore.isValid);

  return (
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/what-is-this" element={<WhatIsThis />} />
        </Routes>
      </div>
  );
}
export default App;
