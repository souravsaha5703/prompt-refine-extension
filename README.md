# PromptRefine – Chrome Extension

**PromptRefine** helps you instantly refine and enhance your prompts across **ChatGPT, Claude, Gemini, and Perplexity**.  
It adds a simple button next to the chat input box to suggest smarter prompt variations.

---

## 🚀 Features
- Works on **ChatGPT, Claude, Gemini, and Perplexity**
- One-click **prompt refinement suggestions**
- Lightweight and privacy-friendly
- No unnecessary background scripts

---

## 🛠 Installation (Local Setup)

Since this extension is not yet on the Chrome Web Store, you can install it manually:

1. **Clone or download** this repository:
   ```bash
   git clone https://github.com/souravsaha5703/prompt-refine-extension.git
   ```
   Or click **Download ZIP** and extract it.

2. Inside the repository, go to the **frontend** folder only:
   ```bash
   cd promptrefine-extension/prompt-enhancer-frontend
   ```
   If you downloaded the ZIP, just open the prompt-enhancer-frontend folder.You don’t need the backend for local usage.

3. Open **Google Chrome** and go to:
   ```
   chrome://extensions/
   ```

4. In the top-right, enable **Developer mode**.

5. Click **Load unpacked** and select the project folder (the one containing `manifest.json`).

6. The extension should now appear in your extensions list.  
   Pin it to your toolbar for quick access.

---

## 📂 Project Structure
```
/extension
├── manifest.json
├── content/
│   ├── content.js
│   └── content.css
└── assets/
    ├── extension-icon.png
    ├── extension-icon16.png
    ├── extension-icon48.png
    └── extension-icon128.png
```

---

## 🔒 Privacy
- The extension **only activates** on supported sites (ChatGPT, Claude, Gemini, Perplexity).
- User text is only sent to the backend **when you click the refine button**.
- No browsing history, keystrokes, or personal information are collected.

---

## 🤝 Contributing
Feel free to fork this repo and submit pull requests with improvements.

---
