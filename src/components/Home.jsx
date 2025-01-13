import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BackButton from "./BackButton";
import DragDrop from "./DragDrop";

function Home() {
    const [isFile, setIsFile] = useState(null);
    const navigate = useNavigate();

    return (
        <>
            <main className="container">
                <h1 className="heading">Welcome to Video Compressor!</h1>
                <h2 className="subheading">What would you like to upload?</h2>
                <div className="button-container">
                    <button className="upload-button" onClick={() => navigate("/file")}>
                        Upload Files
                    </button>
                    <button className="upload-button" onClick={() => navigate("/folder")}>
                        Upload Folder
                    </button>
                </div>
            </main>
        </>
    );
}

export default Home;
