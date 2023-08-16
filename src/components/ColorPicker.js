import React from 'react';

const ColorPicker = ({ colors, selectedColor, onSelectColor }) => {
  return (
    <div className="color-picker">
      {colors.map((color) => (
        <div
          key={color}
          className={`color-option ${selectedColor === color ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => onSelectColor(color)}
        ></div>
      ))}
    </div>
  );
};

export default ColorPicker;
