// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Components/Admin";
import Experiment from "./Components/Experiment";
import Header from "./Components/UI/Header";
import "./index.css";
import MainPage from "./Components/MainPage";
import Sessions from "./Components/Sessions";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/runs" element={<Sessions />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/admin/new" element={<Experiment />} />
          <Route path="/inditas" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
