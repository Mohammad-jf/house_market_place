import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import {
  Expore,
  FrogotPassword,
  Offers,
  Profile,
  SignIn,
  SignUp,
} from "./pages";
import { Navbar } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Expore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<FrogotPassword />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
