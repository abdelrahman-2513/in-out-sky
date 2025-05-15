// Numpad.js
import React from "react";
import "./NumPad.css";

const NumPad = ({
  onNumberClick,
  onClear,
  onDelete,
  onConfirm,
  hideConfirm,
}) => {
  return (
    <div className="numpad">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
        <button
          key={number}
          className="button"
          onClick={() => onNumberClick(number)}
        >
          {number}
        </button>
      ))}
      <button className="button" onClick={onClear}>
        C
      </button>
      <button className="button" onClick={onDelete}>
        ←
      </button>
      {!hideConfirm && (
        <button className="button ok-button" onClick={onConfirm}>
          Ok
        </button>
      )}
    </div>
  );
};

export default NumPad;
