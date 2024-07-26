import { applyTheme } from "src/changeTheme"; // function to change the dom
import React from 'react';

const Preview = ({ theme, isSelected, onSelect }) => {
  const { id, name, colors } = theme;

  return (
    <li 
      onClick={onSelect}
      className={`plasmo-w-full plasmo-border-b plasmo-border-gray-200 hover:plasmo-bg-gray-600 dark:plasmo-border-gray-600 ${
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
                margin: '2px' 
              }} 
              className="plasmo-flex-shrink-0 plasmo-border-2 plasmo-border-gray-500 plasmo-rounded-sm"
            ></span>
          ))}
        </div>

      </div>
    </li>
  ); 
};

export default Preview;
