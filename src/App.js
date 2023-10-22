import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import UserContext from "./pages/UserContext";

//PAGES
import Home from "./pages/home";
import Test from "./pages/Test";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AddProduct from "./pages/AddProduct";
import UserProfile from "./pages/UserProfile"

//COMPONENTS
import Footer from "./components/Footer";
import MyOrders from "./components/MyOrders";
import Crousal from "./components/Crousal"
import "../src/App.css";
import UpdatePostSignup from "./components/UpdatePostSignup";

function App() {
  const [user, setUser] = useState("null");
  const [auth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);



  const getUser = async () => {
    try {
      // console.log('GET USER CALLED')
      const url = `https://letava.ai.paklogics.com/app/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      console.log("DAT",data)

      if (!data.user._json !== undefined) {
        console.log("IN LOGIN")
        setUser(data.user);
        setAuth(true);
        setIsLoading(false);
      }
    } catch (err) {
      setAuth(false);
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="h">
          <Router>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <Routes>
                <Route exact path="/" element={<Home />} />
             
                <Route
                  path="/signup"
                  element={!auth ? <Signup /> : <Navigate to="/" />}
                />

                <Route
                  path="/postSignupUpdate"
                  element={<UpdatePostSignup />}
                />

                <Route
                  path="/login"
                  // element={<Login />}
                  element={!auth ? <Login /> : <Navigate to="/" />}
                />

                  <Route
                  path="/profile"
                  element={auth ? <UserProfile /> : <Navigate to="/login" />}
                />

                <Route
                  path="/test1"
                  element={auth ? <Crousal /> : <Navigate to="/login" />}
                />
                
                <Route path="/verifyEmail" element={<Home />} />

                <Route path="forgotPassword" element={<ForgotPassword />} />

                <Route path="resetPassword" element={<ResetPassword />} />
                
                <Route path="test" element={<Test />} />
                
              </Routes>
            )}
          </Router>
        </div>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
