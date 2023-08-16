import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar, PriveteRoute } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Expore,
  FrogotPassword,
  Offers,
  Profile,
  SignIn,
  SignUp,
  Category,
  CreateListing,
  Contact,
  Listing,
  EditListing,
} from "./pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Expore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryname" element={<Category />} />
          <Route
            path="/category/:categoryname/:listingid"
            element={<Listing />}
          />
          <Route path="/profile" element={<PriveteRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/contact/:landlordId" element={<Contact />} />
          <Route path="/forgot-password" element={<FrogotPassword />} />
          <Route path="/edit-listing/:listingId" element={<EditListing />} />
          <Route path="/create-listing" element={<CreateListing />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
