// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Components/Screens/Admin";
import Experiment from "./Components/Screens/Experiment";
import Header from "./Components/UI/Header";
import "./index.css";
import MainPage from "./Components/Screens/MainPage";
import Sessions from "./Components/Screens/Sessions";
import StartExperiment from "./Components/Screens/StartExperiment";
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
          <Route path="/start/:param" element={<StartExperiment />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
