"use client";
import React, { useCallback, useEffect, useState } from "react";
import Switch from "./components/Switch";
import { languages } from "./components/languages";
import Icon from "./components/Icon";
import GithubIcon from "./components/github";

// Define the type for app state
type AppState = {
  Word: boolean;
  Excel: boolean;
  PowerPoint: boolean;
  Outlook: boolean;
  OneNote: boolean;
  Access: boolean;
  Skype: boolean;
  Project: boolean;
  Visio: boolean;
};

// Initial app states, with all apps enabled by default
const initialApps: AppState = {
  Word: true,
  Excel: true,
  PowerPoint: true,
  Outlook: true,
  OneNote: true,
  Access: true,
  Skype: true,
  Project: true,
  Visio: true,
};

export default function Home() {
  const [arch64, setArch64] = useState(true); // State for 64-bit architecture selection
  const [checked, setChecked] = useState<AppState>(initialApps); // State for app toggle status
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en-us"); // Selected language state
  const [copySuccess, setCopySuccess] = useState<boolean>(false); // State to show copy success
  const [MAK, setMAK] = useState(true); // State for activation type (MAK or KMS)
  const [XML, setXML] = useState(""); // Generated XML configuration

  // Copy XML to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(XML).then(
      () => setCopySuccess(true),
      () => setCopySuccess(false)
    );
  };

  // Toggle between 64-bit and 32-bit architectures
  const switchArch = () => setArch64(!arch64);
  // Toggle app inclusion/exclusion
  const handleClick = useCallback((appName: keyof AppState) => {
    setChecked((prevChecked) => ({
      ...prevChecked,
      [appName]: !prevChecked[appName],
    }));
  }, []);

  // Array of app names for iteration
  const appNames = Object.keys(initialApps) as (keyof AppState)[];

  // Generate the XML configuration based on current selections
  const generateOfficeXML = useCallback(
    (
      {
        Word,
        Excel,
        PowerPoint,
        Outlook,
        OneNote,
        Access,
        Skype,
        Project,
        Visio,
      }: AppState,
      language: string,
      arch64: boolean,
      MAK: boolean
    ) =>
      `<Configuration>
  <Add OfficeClientEdition="${arch64 ? `64` : `32`}" Channel="PerpetualVL2024">
    <Product ID="ProPlus2024Volume" PIDKEY="${
      MAK ? "Y63J7-9RNDJ-GD3BV-BDKBP-HH966" : "2TDPW-NDQ7G-FMG99-DXQ7M-TX3T2"
    }">
      <Language ID="${language}" />${
        Word ? `` : '\n      <ExcludeApp ID="Word" />'
      }${Excel ? `` : '\n      <ExcludeApp ID="Excel" />'}${
        PowerPoint ? `` : '\n      <ExcludeApp ID="PowerPoint" />'
      }${Outlook ? `` : '\n      <ExcludeApp ID="Outlook" />'}${
        OneNote ? `` : '\n      <ExcludeApp ID="OneNote" />'
      }${Access ? `` : '\n      <ExcludeApp ID="Access" />'}${
        Skype ? `` : '\n      <ExcludeApp ID="Lync" />'
      }
    </Product>${
      Visio
        ? `\n    <Product ID="VisioPro2024Volume" PIDKEY="${
            MAK
              ? "3HYNG-BB9J3-MVPP7-2W3D8-CPVG7"
              : "YW66X-NH62M-G6YFP-B7KCT-WXGKQ"
          }">
      <Language ID="${language}" />
    </Product>`
        : ``
    }${
        Project
          ? `\n    <Product ID="ProjectPro2024Volume" PIDKEY="${
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
    [MAK, arch64]
  );

  // Download XML file
  const handleDownload = () => {
    const blob = new Blob([XML], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Configuration.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Update XML and handle copy success indicator reset
  useEffect(() => {
    let timer: NodeJS.Timeout;
    setXML(generateOfficeXML(checked, selectedLanguage, arch64, MAK));
    if (copySuccess) {
      timer = setTimeout(() => {
        setCopySuccess(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [checked, selectedLanguage, copySuccess, generateOfficeXML]);

  // Language selection dropdown component
  const LanguageDropdown: React.FC = () => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedLanguage(event.target.value);
    };

    return (
      <div className="mb-5">
        {/* <p>Choose a language:</p> */}
        <select
          className="border rounded-sm"
          id="language-select"
          value={selectedLanguage}
          onChange={handleChange}
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
        <br />
        {selectedLanguage && <p>Selected Language: {selectedLanguage}</p>}
      </div>
    );
  };

  return (
    <div className="flex flex-wrap p-5 gap-5">
      <div>
        {/* Language selection section */}
        <div>
          <h2>Language</h2>
          <hr className="my-2 border-gray-500" />
          <LanguageDropdown />
        </div>
        {/* Activation type selection */}
        <div>
          <h2>Activation</h2>
          <hr className="my-2 border-gray-500" />
          <p
            className="flex gap-2"
            title={`Multiple Activation Key (MAK) activates systems on a one-time\nbasis, using Microsoft hosted activation services.\nKey Management Service (KMS) allows organizations to activate,\nsystems within their own network.`}
          >
            type of activation{" "}
            <Icon
              name="info"
              onClick={() =>
                alert(
                  `Multiple Activation Key (MAK) activates systems on a one-time\nbasis, using Microsoft hosted activation services.\nKey Management Service (KMS) allows organizations to activate,\nsystems within their own network.`
                )
              }
            />
          </p>
          <div className="flex gap-2 items-center">
            <Switch onClick={() => setMAK(!MAK)} checked={MAK} radio />
            <p>MAK</p>
          </div>
          <div className="flex gap-2 items-center">
            <Switch onClick={() => setMAK(!MAK)} checked={!MAK} radio />
            <p>KMS</p>
          </div>
        </div>
        {/* Architecture selection */}
        <div>
          <h2>Architecture</h2>
          <hr className="my-2 border-gray-500" />
          <p>Which architecture do you want to deploy?</p>
          <div className="flex items-center gap-2">
            <Switch radio onClick={switchArch} checked={arch64} />
            <p>64</p>
          </div>
          <div className="flex items-center gap-2">
            <Switch radio onClick={switchArch} checked={!arch64} />
            <p>32</p>
          </div>
        </div>
        {/* App inclusion/exclusion toggles */}
        <div>
          <h2>Apps</h2>
          <hr className="my-2 border-gray-500" />
          <p className="w-80">
            Turn apps on or off to include or exclude them from being deployed
          </p>
          <div>
            {appNames.map((appName) => (
              <div key={appName} className="flex gap-2">
                <h4 className="w-24">{appName}</h4>
                <Switch
                  onClick={() => handleClick(appName)}
                  checked={checked[appName]}
                />
                <p>{checked[appName] ? "On" : "Off"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-3.5 mt-5">
        {/* XML code display and action buttons */}
        <div className="rounded ring-1 ring-gray-300 ring-inset relative">
          <button className="bg-gray-50 text-gary-900 rounded-br rounded-tl ring-inset px-2 py-1 mb-2 ring-1 ring-gray-300 cursor-default">
            Configuration.xml
          </button>
          <pre className="mx-4 pb-3">{XML}</pre>
          <button
            onClick={handleCopy}
            className="flex ring-1 ring-gray-500 rounded px-1 py-1 absolute bottom-0 right-0"
          >
            <Icon name={copySuccess ? "check" : "copy"} />
          </button>
        </div>
        <div className="flex gap-1 ring-inset mt-1 justify-between">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={handleDownload}
          >
            Download XML
          </button>
          <a
            href="https://github.com/hamidihabib/office-configuration"
            target="_blank"
          >
            <p className="underline hover:text-blue-700 flex gap-1">
              https://github.com/hamidihabib/office-configuration
              <GithubIcon />
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
