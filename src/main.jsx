import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import Home from "./components/Home";
import DragDrop from "./components/DragDrop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<Home />} />
          <Route path="/file" element={<DragDrop type="file" />} />
          <Route path="/folder" element={<DragDrop type="folder" />} />
      </Routes>    
    </BrowserRouter>
  </React.StrictMode>,
);
