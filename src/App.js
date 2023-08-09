import {Routes,Route } from "react-router-dom";
import { Expore,FrogotPassword,Offers,Profile,SignIn,SignUp } from "./pages";
import {Navbar} from './components'

function App() {
  return (
    <>
      <Routes>
         <Route path="/" element={<Expore/>}/>
         <Route path="/offers" element={<Offers/>}/>
         <Route path="/profile" element={<SignIn/>}/>
         <Route path="/sign-in" element={<SignIn/>}/>
         <Route path="/sign-up" element={<SignUp/>}/>
         <Route path="/forgot-password" element={<FrogotPassword/>}/>
      </Routes>

      {/* navbar */}
      <Navbar/>
 
    </>
  );
}

export default App;
