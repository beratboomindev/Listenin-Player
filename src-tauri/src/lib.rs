use tauri::{WebviewUrl, WebviewWindowBuilder};

/// Version reported to the shell so the UI never hardcodes it.
#[tauri::command]
fn version() -> &'static str {
    env!("CARGO_PKG_VERSION")
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![version])
        .setup(|app| {
            // Rust owns window creation on purpose: Phase 4 runs the yt-dlp pre-flight
            // check here, before the main window is ever built. Nothing above this line
            // may mount UI.
            WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
                .title("Listenin'")
                .inner_size(1100.0, 720.0)
                .min_inner_size(880.0, 560.0)
                .build()?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("failed to run Listenin'");
}
