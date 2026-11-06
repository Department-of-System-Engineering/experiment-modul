// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Components/Admin";
import Header from "./Components/UI/Header";
import "src/index.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/lefutott" element={<Admin />} />
        <Route path="/" element={<Admin />} />
        <Route path="/szerkesztes" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
