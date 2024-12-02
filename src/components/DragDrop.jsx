import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useRef, useState } from "react";

function DragDrop() {
    const [droppedData, setDroppedData] = useState([]);
    const [response, setResponse] = useState("waiting to upload...");
    const fileInputRef = useRef(null);

    const handleClick = () => {
        // console.log("CLICKED!");
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = (event) => {
        // const files = Array.from(event.target.files).map((file) => file.path || file.name);
        const files = Array.from(event.target.files);    
        console.log("Files selected via click: ", files);
    }

    useEffect(() => {
        const unlisten = listen('tauri://drag-drop', async (e) => {
            const data = e.payload.paths;
            console.log("Dropped Data: ", data);
            setResponse(await invoke("handle_drop_down", { filenames: data }));
            setDroppedData(data);
        });

        return () => {
            // Clean up the listener when the component unmounts
            unlisten.then((fn) => fn());
        }
    }, []);
    
    return (
        <>
            <div className="drag-drop-zone" onClick={handleClick}>
                Drop Files Here!
                <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                multiple
                onChange={handleFileChange}
            />
            </div>
            
            
            <p>{response}</p>
        </>
    )
}

export default DragDrop;