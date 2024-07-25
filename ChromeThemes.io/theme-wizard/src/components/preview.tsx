import { changeThemes } from "src/changeTheme"; // function to change the dom
import React from 'react';

const Preview = ({ theme, isSelected, onSelect }) => {
  const { id, name, colors } = theme;

  return (
    <li 
      onClick={onSelect}
      className={`plasmo-w-full plasmo-border-b plasmo-border-gray-200 dark:plasmo-border-gray-600 ${
        isSelected ? ' plasmo-bg-blue-200 dark:plasmo-bg-gray-500' : ''
      }`}
    >
      <div className="plasmo-p-2 plasmo-flex plasmo-items-center plasmo-ps-3">
        <label 
          htmlFor={`radio-${id}`} 
          className="plasmo-overflow-hidden plasmo-hyphens-auto plasmo-break-words plasmo-flex-grow plasmo-mr-2"
        >
          {name}
        </label>
        <div className="plasmo-flex plasmo-flex-wrap plasmo-gap-1 plasmo-justify-center">
          {colors.map((color) => (
            <span 
              key={color} 
              style={{ 
                backgroundColor: color, 
                width: '20px', 
                height: '20px', 
                display: 'inline-block', 
                margin: '4px' 
              }} 
              className="plasmo-flex-shrink-0 plasmo-border-2 plasmo-border-gray-500 plasmo-rounded-sm"
            ></span>
          ))}
        </div>
        <input 
          id={`radio-${id}`} 
          type="radio" 
          name="list-radio" 
          className="plasmo-ml-auto plasmo-w-4 plasmo-h-4 plasmo-text-blue-600 plasmo-bg-gray-100 plasmo-border-gray-300 focus:plasmo-ring-blue-500 dark:focus:plasmo-ring-blue-600 dark:plasmo-ring-offset-gray-700 dark:focus:plasmo-ring-offset-gray-700 focus:plasmo-ring-4 dark:plasmo-bg-gray-600 dark:plasmo-border-gray-500"
          checked={isSelected}
          readOnly
        />
      </div>
    </li>
  );
};

export default Preview;
