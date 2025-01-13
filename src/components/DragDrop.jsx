import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { open } from "@tauri-apps/plugin-dialog";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import fileUploadIcon from "../assets/file-upload.png";
import folderUploadIcon from "../assets/folder-upload.png";
import BackButton from "./BackButton";

function DragDrop({ type }) {
    const [droppedData, setDroppedData] = useState([]);
    const [response, setResponse] = useState("Waiting to upload...");
    const navigate = useNavigate();

    const handleClick = async () => {
        const data = await open({
            multiple: true,
            directory: type === "file" ? false : true,
        });

        setResponse(type === "file" ? await invoke("handle_files", { filenames: data }) : await invoke("handle_folder", { data: data[0] }));
        console.log("Clicked data: ", data);
    };

    const handleFileChange = (event) => {
        // const files = Array.from(event.target.files).map((file) => file.path || file.name);
        const files = Array.from(event.target.files).map((file) =>
            file.path || file.name
        );
        console.log("Files selected via click: ", files);
    };

    useEffect(() => {
        const unlisten = listen("tauri://drag-drop", async (e) => {
            const data = e.payload.paths;
            console.log("Dropped Data: ", data);
            
            // call the rust backend function based on the "type" prop.
            // if folder is dropped, then pass the folder path as a string to the backend api.
            setResponse(type === "file" ? await invoke("handle_files", { filenames: data }) : await invoke("handle_folder", { inputFolderPath: data[0] }));
            // setDroppedData(data);
        });

        return () => {
            // Clean up the listener when the component unmounts
            unlisten.then((fn) => fn());
        };
    }, []);

    return (
        <>
            <BackButton onClick={() => navigate(-1)} />
            <div className="drag-drop-zone"
                onClick={handleClick}
            >
                <img
                    src={type === "file" ? fileUploadIcon : folderUploadIcon}
                    alt="Upload Icon"
                    style={{
                        width: "130px", // Significantly large for visibility
                        height: "auto", // Maintains aspect ratio
                        marginBottom: "20px",
                    }}
                />
                <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "grey" }}>
                    {type === "file" ? "Drop files here or click to upload" : "Drop folder here or click to upload"}
                </span>
            </div>

            <p>{response}</p>
        </>
    );
}

export default DragDrop;

