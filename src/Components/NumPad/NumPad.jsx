// Numpad.js
import React from "react";
import "./NumPad.css";

const NumPad = ({ onNumberClick, onClear, onDelete, onConfirm }) => {
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
      <button className="button ok-button" onClick={onConfirm}>
        Ok
      </button>
    </div>
  );
};

// const styles = {
//   numpad: {
//     display: "grid",
//     gridTemplateColumns: "repeat(3, 60px)",
//     gap: "4px",
//     marginTop: "10px",
//   },

//   button: {
//     width: "60px",
//     height: "60px",
//     fontSize: "1.5rem",
//     cursor: "pointer",
//     color: "#202124", // Dark gray color often used in Google UIs
//     backgroundColor: "#f1f3f4", // Light gray background
//     border: "none",
//     borderRadius: "8px",
//     boxShadow:
//       "0 1px 3px rgba(60, 64, 67, 0.3), 0 4px 8px rgba(60, 64, 67, 0.15)", // Subtle shadow for depth
//     transition: "background-color 0.2s ease",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// };

export default NumPad;
