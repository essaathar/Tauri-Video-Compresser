// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from backend!", name)
}

use ffmpeg_sidecar::command::FfmpegCommand;
use anyhow::Result;
use std::fs; // Import the fs module
use dirs;

#[tauri::command]
fn handle_filename(filename: String) -> Result<String, String> {
    // Print the filename to the terminal
    println!("Received filename: {}", filename);
    // Get the path to the user's desktop
    let desktop_path = dirs::desktop_dir().ok_or_else(|| "Could not find desktop directory".to_string())?;

    // Create the "output" directory on the desktop
    let output_dir = desktop_path.join("output");
    fs::create_dir_all(&output_dir).map_err(|e| e.to_string())?;

    // Construct the output file path
    let output_file_path = output_dir.join("compressed_video.mp4");

    let _cmd = FfmpegCommand::new()
                    .arg("-i")
                    .arg(&filename)
                    .arg(output_file_path.to_str().unwrap())
                    .spawn()
                    .map_err(|e| e.to_string())?;
    
    let response = format!("Filename '{}' processed successfully!", filename);
    Ok(response)
}

#[tauri::command]
fn handle_drop_down(filenames: Vec<String>) -> Result<String, String> {
    //println!("Recieved filenames: {:?}", filenames);
    // Get the path to the user's desktop
    let desktop_path = dirs::desktop_dir().ok_or_else(|| "Could not find desktop directory".to_string())?;

    // Create the "output" directory on the desktop
    let output_dir = desktop_path.join("video-compresser-output");
    fs::create_dir_all(&output_dir).map_err(|e| e.to_string())?;

    for path in &filenames {
        println!("Processing {}", path);
        // Extract the filename
        if let Some(filename) = path.split('\\').last() {
            // Remove the last 4 characters if the filename is long enough
            let filename_without_ext = if filename.len() > 4 {
                &filename[..filename.len() - 4]
            } else {
                filename
            };

            println!("Trimmed Filename: {}", filename_without_ext);

            // Construct the output file path
            let output_filename = format!("compressed-{}.mp4", filename_without_ext);
            let output_file_path = output_dir.join(output_filename);

            let _cmd = FfmpegCommand::new()
                            .arg("-i")
                            .arg(&path)
                            .arg(output_file_path.to_str().unwrap())
                            .spawn()
                            .map_err(|e| e.to_string())?;
        } else {
            println!("Error: Could not split path {}", path);
        }
    }
    Ok(format!("Processed {} filenames!", filenames.len()))
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    ffmpeg_sidecar::download::auto_download().unwrap();
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, handle_filename, handle_drop_down])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
