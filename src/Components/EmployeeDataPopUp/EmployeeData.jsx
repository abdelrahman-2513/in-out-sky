import React, { useState } from "react";
import "./EmployeeData.css";
import { IoIosCloseCircle } from "react-icons/io";

function EmployeeData({
  title,
  Employee,
  message,
  onClose,
  open,
  language,
  direction,
  setNfc,
  reset,
}) {
  const [state, setState] = useState(null);
  const [msg, setMsg] = useState("");
  const trns = {
    en: {
      name: "Name",
      department: "Department",
      jop: "Jop",
      ok: "Ok",
      checkIn: "Check In",
      checkOut: "Check Out",
      "in-200": "Check In Successful",
      "in-400": "Check In Failed",
      "out-200": "Check Out Successful",
      "out-400": "Check Out Failed",
    },
    ar: {
      name: "الاسم",
      department: "القسم",
      jop: "الوظيفة",
      ok: "حسنا",
      checkIn: "تسجيل حضور",
      checkOut: "تسجيل انصراف",
      "in-200": "تسجيل الحضور ناجح",
      "in-400": "فشل تسجيل الحضور",
      "out-200": "تسجيل الانصراف ناجح",
      "out-400": "فشل تسجيل الانصراف",
    },
  };

  function handleCheckIn() {
    setState(200);
    setMsg(trns[language][`in-200`]);
    setTimeout(() => {
      onClose();
    }, 2000);
    reset();
  }

  function handleCheckOut() {
    setState(200);
    setMsg(trns[language]["out-200"]);
    setTimeout(() => {
      onClose();
    }, 2000);
    reset();
  }

  return (
    <div className="dialog-overlay" style={{ direction: direction }}>
      <div className="dialog">
        <div className="dialog-header">
          <h2>{title}</h2>
          <IoIosCloseCircle
            size={25}
            className="close-button"
            onClick={onClose}
          />
        </div>
        <div className="dialog-content">
          <div className="dialog-row">
            <p> {trns[language].name} :</p>
            <p>{Employee?.name}</p>
          </div>
          <div className="dialog-row">
            <p>{trns[language].department} :</p>
            <p>{Employee?.department}</p>
          </div>
          <div className="dialog-row">
            <p>{trns[language].jop} :</p>
            <p>{Employee?.jop}</p>
          </div>
        </div>
        {/* <div className="dialog-actions">
          <button className="btn " onClick={onClose}>
            Close
          </button>
        </div> */}
        <div className="feedback">
          {msg && (
            <p
              style={{
                color: state === 200 ? "green" : "red",
              }}
            >
              {msg}
            </p>
          )}
        </div>

        <div className="dialog-actions">
          <button className="dialog-btn " onClick={handleCheckOut}>
            {trns[language].checkOut}
          </button>
          <button className="dialog-btn" onClick={handleCheckIn}>
            {trns[language].checkIn}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeData;
