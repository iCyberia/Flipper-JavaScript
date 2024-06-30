let storage = require("storage");
let dialog = require("dialog");
let textbox = require("textbox");

// Function to convert array buffer to string
function arraybuf_to_string(arraybuf) {
    let string = "";
    let data_view = Uint8Array(arraybuf);
    for (let i = 0; i < data_view.length; i++) {
        string += chr(data_view[i]);
    }
    return string;
}

// Display a dialog to pick a file
let file_path = dialog.pickFile("/ext", "*");
if (file_path === undefined) {
    print("No file selected");
} else {
    // Check if the file exists
    if (!storage.exists(file_path)) {
        print("File does not exist:", file_path);
    } else {
        // Read the file content
        let file_content = storage.read(file_path);

        // Convert the content to string
        let file_text = arraybuf_to_string(file_content);

        // Show the content in a textbox
        textbox.setConfig("end", "text");
        textbox.clearText();
        textbox.addText(file_text);
        textbox.show();

        // Wait until the user presses the back button to exit
        while (textbox.isOpen()) {
            delay(100);
        }
        textbox.close();
    }
}

print("Script finished.");
