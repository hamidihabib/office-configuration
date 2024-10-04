
# Office 2024 LTSC Configuration XML Generator

This project is a web-based tool built using **Next.js** to generate configuration XML files for **Microsoft Office 2024 LTSC**. It allows users to customize Office product activation settings, select included/excluded apps, choose between MAK/KMS activation, and specify language preferences. The tool also supports downloading and copying the generated XML file.

## Features

- **Activation Switch**: Toggle between MAK (Multiple Activation Key) and KMS (Key Management Service) activation.
- **App Inclusion/Exclusion**: Select which Office applications (Word, Excel, PowerPoint, etc.) should be included or excluded from the configuration.
- **Language Selection**: Choose from various supported languages for Office installation.
- **Dynamic XML Generation**: The XML configuration is generated based on user inputs and is updated in real-time.
- **Download XML**: Download the generated configuration file directly.
- **Copy to Clipboard**: Copy the XML to your clipboard with a single click.

## Technologies Used

- **Next.js**: A React framework for building server-rendered web applications.
- **React**: For managing the frontend components and state.
- **TypeScript**: To provide static type-checking and enhance code quality.
- **Geist UI**: Used for UI components such as buttons, labels, and switches.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/hamidihabib/office-configuration.git
   cd office-configuration
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open the application in your browser:**

   Navigate to [http://localhost:3000](http://localhost:3000) to use the tool.

## Usage

1. **Select Activation Type**: Use the switches to choose between MAK or KMS activation. Only one can be active at a time.
2. **Choose Applications**: Toggle the switches for each Office app (e.g., Word, Excel, Outlook) to either include or exclude them from the configuration.
3. **Select Language**: Use the dropdown to choose the desired language for Office installation.
4. **Generate XML**: The configuration XML is generated in real-time based on your selections.
5. **Download or Copy XML**: You can either download the XML file or copy it to the clipboard for use in your deployment.

## Components

### 1. **Switch Component**

The `Switch` component is used for toggling between different configuration options, such as selecting between MAK/KMS or choosing which Office apps to include/exclude.

- **Props:**
  - `checked`: Determines if the switch is on or off.
  - `onClick`: Callback function to handle switch toggling.
  - `radius`: Optional prop to adjust the size of the switch.

### 2. **Language Dropdown**

The `LanguageDropdown` component allows users to choose the language for the Office installation.

- **Props:**
  - `selectedLanguage`: The currently selected language.
  - `onChange`: Handles the language change event.

### 3. **XML Generation Logic**

The XML for configuring Office is generated dynamically based on the selected activation method, included/excluded apps, and language. This XML can be downloaded or copied for use in Office deployment.

## Copy to Clipboard Functionality

To copy the generated XML to the clipboard, the app uses the **Clipboard API**. It also includes a function to compare the clipboard content with the generated XML.

Example usage:

```typescript
const handleCopy = () => {
  navigator.clipboard.writeText(XML).then(
    () => setCopySuccess(true),
    () => setCopySuccess(false)
  );
};
```

## Future Improvements

- Add support for more configuration options (e.g., Office edition, installation paths).
- Implement validation for user inputs to ensure correct XML format.
- Add support for dark mode.

## Contributing

Feel free to fork this repository and submit pull requests. Any contributions, bug reports, or suggestions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
