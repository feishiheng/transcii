#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

#[tauri::command]
fn on_string_input_changed(s: String) -> Result<String, String> {
    let result = s.chars()
        .map(
            |x| if x.is_ascii() {
                Ok(x)
            } else {
                Err(x)
            }
        ).collect::<Vec<Result<char, char>>>();

    let mut ret = String::from("");
    for r in result {
        match r {
            Ok(c) => ret.push_str(format!{"{}.", c as u32}.as_str()),
            Err(_) => return Err("请输入正确的Ascii类型字符串。".to_string()),
        }
    }

    Ok(ret.trim_end_matches('.').to_string())
}

#[tauri::command]
fn on_ascii_input_changed(s: String) -> Result<String, String> {
    if s.len() == 0 {
        return Ok("".to_string())
    }

    let codes = s.split('.')
        .map(
            |x| match x.parse() {
                Ok(n) => Ok(n),
                Err(_) => Err(x),
            }
        ).collect::<Vec<Result<u32, &str>>>();

    let mut ret = String::from("");
    for code in codes {
        match code {
            Ok(n) => ret.push(char::from_u32(n).unwrap()),
            Err(_) => return Err("请输入正确的Ascii码字符串，以'.'分隔。".to_string()),
        }
    }

    Ok(ret)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![on_string_input_changed, on_ascii_input_changed])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
