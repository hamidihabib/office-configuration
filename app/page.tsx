"use client";

import React, { useEffect, useState, useCallback } from "react";
import Switch from "./components/Switch";
import { Code } from "@geist-ui/core";
import { languages } from "./components/languages";

// Define a type for the app state
type AppState = {
  MAK: boolean;
  KMS: boolean;
  Word: boolean;
  Excel: boolean;
  PowerPoint: boolean;
  Outlook: boolean;
  OneNote: boolean;
  Access: boolean;
  Project: boolean;
  Visio: boolean;
};

// Initial app states
const initialApps: AppState = {
  MAK: true,
  KMS: false,
  Word: true,
  Excel: true,
  PowerPoint: true,
  Outlook: true,
  OneNote: true,
  Access: true,
  Project: true,
  Visio: true,
};

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en-us");
  const [checked, setChecked] = useState<AppState>(initialApps);
  const [XML, setXML] = useState("");

  // Memoize XML generation based on selected apps and language
  const generateOfficeXML = useCallback(
    (
      {
        MAK,
        Word,
        Excel,
        PowerPoint,
        Outlook,
        OneNote,
        Access,
        Project,
        Visio,
      }: AppState,
      language: string
    ) =>
      `<Configuration>
  ${
    MAK
      ? `<!-- configuration for MAK Activation -->`
      : `<!-- configuration for KMS Activation -->`
  }
  <Add OfficeClientEdition="64" Channel="PerpetualVL2024">
    <Product ID="ProPlus2024Volume" PIDKEY="${
      MAK ? "Y63J7-9RNDJ-GD3BV-BDKBP-HH966" : "2TDPW-NDQ7G-FMG99-DXQ7M-TX3T2"
    }">
      <Language ID="${language}" />${
        Word ? `` : '\n      <ExcludeApp ID="Word" />'
      }${Excel ? `` : '\n      <ExcludeApp ID="Excel" />'}${
        PowerPoint ? `` : '\n      <ExcludeApp ID="PowerPoint" />'
      }${Outlook ? `` : '\n      <ExcludeApp ID="Outlook" />'}${
        OneNote ? `` : '\n      <ExcludeApp ID="OneNote" />'
      }${Access ? `` : '\n      <ExcludeApp ID="Access" />'}
    </Product>${
      Visio
        ? `<Product ID="VisioPro2024Volume" PIDKEY="${
            MAK
              ? "3HYNG-BB9J3-MVPP7-2W3D8-CPVG7"
              : "YW66X-NH62M-G6YFP-B7KCT-WXGKQ"
          }">
      <Language ID="${language}" />
    </Product>`
        : ``
    }${
        Project
          ? `\n      <Product ID="ProjectPro2024Volume" PIDKEY="${
              MAK
                ? "GQRNR-KHGMM-TCMK6-M2R3H-94W9W"
                : "D9GTG-NP7DV-T6JP3-B6B62-JB89R"
            }">
      <Language ID="${language}" />
    </Product>`
          : ``
      }
  </Add>
  <RemoveMSI />
  <Property Name="AUTOACTIVATE" Value="1" />
</Configuration>`,
    []
  );

  // Handle app switch toggle
  const handleClick = useCallback((appName: keyof AppState) => {
    setChecked((prevChecked) => {
      if (appName === "MAK" && !prevChecked.MAK) {
        return { ...prevChecked, MAK: true, KMS: false };
      }
      if (appName === "KMS" && !prevChecked.KMS) {
        return { ...prevChecked, KMS: true, MAK: false };
      }
      return {
        ...prevChecked,
        [appName]: !prevChecked[appName], // Toggle the value
      };
    });
  }, []);

  // Update XML whenever the state changes
  useEffect(() => {
    setXML(generateOfficeXML(checked, selectedLanguage));
  }, [checked, selectedLanguage, generateOfficeXML]);

  // Function to download the generated XML
  const handleDownload = () => {
    const blob = new Blob([XML], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Configuration.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Cleanup the link after download
  };

  const appNames = Object.keys(initialApps) as (keyof AppState)[];

  // Language dropdown component
  const LanguageDropdown: React.FC = () => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedLanguage(event.target.value); // Update language selection
    };

    return (
      <div>
        <label className="font-semibold" htmlFor="language-select">
          Choose a language:
        </label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={handleChange}
          className="font-semibold text-gray-500 italic ring-1 ring-blue-500 rounded"
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
        <br />
        {/* Display the selected language */}
        {selectedLanguage && (
          <label className="font-semibold">
            Selected Language:{" "}
            <i className="text-gray-500">{selectedLanguage}</i>
          </label>
        )}
      </div>
    );
  };

  return (
    <div className="flex-col items-center">
      <div className="flex flex-wrap ml-5 mt-5">
        <div>
          <LanguageDropdown />
          <div className="">
            <h2 className="font-semibold text-lg">Select activation type</h2>
            {appNames.map((appName) => (
              <Switch
                radius={appName == "KMS" || appName == "MAK" ? true : false}
                key={appName}
                onClick={() => handleClick(appName)}
                checked={checked[appName]}
              >
                {appName}
              </Switch>
            ))}
          </div>
        </div>
        <div className="mt-3">
          {/* Display generated XML */}
          <Code
            className="border rounded overflow-auto shadow-sm"
            block
            color="red"
            my={0}
          >
            {XML}
          </Code>
          {/* Button to trigger XML download */}
          <div>
            <button
              className="bg-blue-500 px-2 py-0.5 font-bold text-white rounded"
              onClick={handleDownload}
            >
              Download XML
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
