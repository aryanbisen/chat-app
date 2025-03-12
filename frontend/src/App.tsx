import { useContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loginpage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/Navbar";
import Profil from "./components/Profil";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignUpPage";
import { Store } from "./Store";
import FriendRequests from "./components/FriendRequests";

function App() {
  const {
    state: { userInfo },
    dispatch,
  } = useContext(Store);
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Profil />
{userInfo?(
  <div>userinfo os here</div>
) : (<div>userinfo is not here</div>)}
          <Routes>
            <Route path="/login" element={<Loginpage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/home" element={<HomePage />}>
              <Route path="friend-requests" element={<FriendRequests />}></Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
