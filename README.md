# Smart Repair Report Generator

🛠️ **Browser-based tool for automating service reports and defect lists for electronic devices.**

This application helps service engineers convert raw repair notes (lists of replaced components) into standardized, professional technical reports. It automatically recognizes components, extracts IMEI numbers, applies business logic (e.g., distinguishing between "replacement" and "modification"), and generates ready-to-copy text for acts and CRM systems.

## ✨ Features

- **Smart Parsing**: Recognizes components by Part Number (e.g., `STM32L151`, `SIM7600`, `AP3012`).
- **IMEI Extraction**: Automatically detects and formats IMEI numbers for modem replacements.
- **Customizable Logic**: 
  - Distinguishes between "Component Replacement" and "Circuit Modification" (e.g., varistor installation).
  - Sorts actions by priority (Modems > MCU > Power > Interfaces).
- **Editable Knowledge Base**: Built-in UI to add new components or edit report phrases without changing code.
- **Local Storage**: Saves your custom database changes in the browser.
- **Privacy First**: Runs entirely in the browser (Client-Side). No data is sent to any server.

## 🚀 How to Use

1. **Open** `index.html` in any modern web browser.
2. **Paste** your raw repair notes into the input field.
   > Example: `замена Модуль SIM7600E-H imei:868140072235570, Микроконтроллер STM32L151, Варистор B72207, обновлена прошивка`
3. **Click** "Сформировать отчет".
4. **Copy** the result from the "Отчет о выполненной работе" or "Требуется замена" section.

### Managing the Database

- Click **"⚙️ Управление базой знаний"** to expand settings.
- **Add New Component**: Enter Part Number, select category, and define phrases.
- **Edit Existing**: Find the component in the table, change the phrase (e.g., change "доработка" to "ремонт"), and click **"💾 Сохранить изменения"**.

## 📂 Project Structure

- `index.html`: Main application structure.
- `style.css`: Stylesheet.
- `data.js`: Default knowledge base (components, patterns, priorities).
- `parser.js`: Logic for text analysis and entity extraction.
- `generator.js`: Logic for assembling the final report strings.
- `app.js`: UI interaction, event handling, and LocalStorage management.

## 🛠️ Tech Stack

- Vanilla JavaScript (ES6+)
- HTML5 / CSS3
- No external dependencies or frameworks.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Created for internal service automation needs.*