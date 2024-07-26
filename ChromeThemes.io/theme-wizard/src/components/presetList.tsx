import React, { useState } from "react";
import Preview from "../components/preview";
import { applyTheme } from "../changeTheme"; 
import { presetData } from "~presets";

const PresetList = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number, colors: string[]) => {
    setSelectedId(id);
    applyTheme(colors);
  };

  return (
    <ul
      style={{ width: "80%", overflow: "hidden" }}
      className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-900 plasmo-bg-white plasmo-border-2 plasmo-border-gray-200 plasmo-rounded-lg dark:plasmo-bg-gray-700 dark:plasmo-border-gray-600 dark:plasmo-text-white"
    >
      {presetData.map((preset) => (
        <Preview
          key={preset.id}
          theme={preset}
          isSelected={preset.id === selectedId}
          onSelect={() => handleSelect(preset.id, preset.colors)}
        />
      ))}
    </ul>
  );
};

export default PresetList;
