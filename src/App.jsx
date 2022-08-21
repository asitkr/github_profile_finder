import React from "react";
import Logo from "./components/Logo";
import { Routes, Route } from "react-router-dom";
import Users from "./routes/Users";
import UserInfo from "./routes/UserInfo";

function App() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container text-gray-50 py-3">
        <Logo />
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:name" element={<UserInfo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
