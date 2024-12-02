import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { open } from '@tauri-apps/plugin-dialog';
import "./App.css";
import DragDrop from "./components/DragDrop";

function App() {
  const [msg, setMsg] = useState("");

  const handleFileUpload = async () => {
    console.log("File upload clicked...");
    const file = await open({
      multiple: false,
      directory: false,
    });
    console.log(file);
    setMsg(await invoke("handle_drag_drop", { filename: file }));
  }

  return (
    <main className="container">
      <h1>Welcome to Video Compresser!</h1>

      {/* <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}

      {/* <form className="row">
        <button onClick={handleFileUpload}>Upload</button>
      </form> */}
      <DragDrop />
      <p>{msg}</p>
    </main>
  );
}

export default App;
