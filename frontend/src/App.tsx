// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Components/Admin";
import Experiment from "./Components/Experiment";
import Header from "./Components/UI/Header";
import "./index.css";
import MainPage from "./Components/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/lefutott" element={<Admin />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/admin/szerkesztes" element={<Experiment />} />
        <Route path="/inditas" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
