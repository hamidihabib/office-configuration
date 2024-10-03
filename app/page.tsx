"use client";

import React, { useEffect, useState, useCallback } from "react";
import Switch from "./components/Switch";
import { Code } from "@geist-ui/core";

// Define a type for the app state
type AppState = {
  MAK: boolean;
  Word: boolean;
  Excel: boolean;
  PowerPoint: boolean;
  Outlook: boolean;
  OneNote: boolean;
  Access: boolean;
  Project: boolean;
  Visio: boolean;
};

// Initial state
const initialApps: AppState = {
  MAK: true,
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
  const [checked, setChecked] = useState<AppState>(initialApps);
  const [XML, setXML] = useState("");

  // Memoize the XML generation function
  const generateOfficeXML = useCallback(
    ({
      MAK,
      Word,
      Excel,
      PowerPoint,
      Outlook,
      OneNote,
      Access,
      Project,
      Visio,
    }: AppState) =>
      `<Configuration>
 ${
   MAK
     ? `<!-- this configuration is for MAK Activation -->`
     : `<!-- this configuration is for KMS Activation -->`
 }
 <Add OfficeClientEdition="64" Channel="PerpetualVL2024">
   <Product ID="ProPlus2024Volume" PIDKEY="${
     MAK ? "Y63J7-9RNDJ-GD3BV-BDKBP-HH966" : "2TDPW-NDQ7G-FMG99-DXQ7M-TX3T2"
   }">
     <Language ID="en-us" />
     ${Word ? `<!-- <ExcludeApp ID="Word" /> -->` : '<ExcludeApp ID="Word" />'}
     ${
       Excel
         ? `<!-- <ExcludeApp ID="Excel" /> -->`
         : '<ExcludeApp ID="Excel" />'
     }
     ${
       PowerPoint
         ? `<!-- <ExcludeApp ID="PowerPoint" /> -->`
         : '<ExcludeApp ID="PowerPoint" />'
     }
     ${
       Outlook
         ? `<!-- <ExcludeApp ID="Outlook" /> -->`
         : '<ExcludeApp ID="Outlook" />'
     }
     ${
       OneNote
         ? `<!-- <ExcludeApp ID="OneNote" /> -->`
         : '<ExcludeApp ID="OneNote" />'
     }
     ${
       Access
         ? `<!-- <ExcludeApp ID="Access" /> -->`
         : '<ExcludeApp ID="Access" />'
     }
   </Product>
   ${
     Visio
       ? `<Product ID="VisioPro2024Volume" PIDKEY="${
           MAK
             ? "3HYNG-BB9J3-MVPP7-2W3D8-CPVG7"
             : "YW66X-NH62M-G6YFP-B7KCT-WXGKQ"
         }">
     <Language ID="en-us" />
   </Product>`
       : ``
   }
   ${
     Project
       ? `<Product ID="ProjectPro2024Volume" PIDKEY="${
           MAK
             ? "GQRNR-KHGMM-TCMK6-M2R3H-94W9W"
             : "D9GTG-NP7DV-T6JP3-B6B62-JB89R"
         }">
     <Language ID="en-us" />
   </Product>`
       : ``
   }
 </Add>
 <RemoveMSI />
 <Property Name="AUTOACTIVATE" Value="1" />
</Configuration>`,
    []
  );

  // Memoize the click handler to avoid unnecessary re-renders
  const handleClick = useCallback((appName: keyof AppState) => {
    setChecked((prevChecked) => ({
      ...prevChecked,
      [appName]: !prevChecked[appName], // Toggle the value
    }));
  }, []);

  // Update XML whenever the state changes
  useEffect(() => {
    setXML(generateOfficeXML(checked));
  }, [checked, generateOfficeXML]);

  // Function to download the XML
  const handleDownload = () => {
    const blob = new Blob([XML], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Configuration.xml"; // Filename for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Cleanup the link after download
  };

  const appNames = Object.keys(initialApps) as (keyof AppState)[];

  return (
    <div>
      <h1>Home</h1>
      <div>
        {appNames.map((appName) => (
          <Switch
            key={appName}
            onClick={() => handleClick(appName)}
            checked={checked[appName]}
          >
            {appName}
          </Switch>
        ))}
      </div>
      {/* Button to trigger download */}
      <Code block color="red" my={0}>
        {XML}
      </Code>
      <button
        className="bg-blue-500 px-2 py-1 text-white rounded"
        onClick={handleDownload}
      >
        Download XML
      </button>
    </div>
  );
}
