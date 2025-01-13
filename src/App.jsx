import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import "./App.css";
import DragDrop from "./components/DragDrop";
import Home from "./components/Home";

function App() {
  const [isFile, setIsFile] = useState(null);

  return (
    // <main className="container">
    //   <h1>Welcome to Video Compresser!</h1>
    //   <h2>Choose What You Want to Upload:</h2>
    //   {/* <DragDrop /> */}
    // </main>
    <Home />
  );
}

export default App;
