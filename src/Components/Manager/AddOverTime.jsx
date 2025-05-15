import React, { useRef, useState } from "react";
import NumPad from "../NumPad/NumPad";
import { TbGridDots } from "react-icons/tb";
import { addingOverTimeShift, checkManager } from "../../assets/API";
import dayjs from "dayjs";
import "dayjs/locale/ar"; // Arabic locale
import "dayjs/locale/en"; // English locale (default)

const now = dayjs().format("YYYY-MM-DDTHH:mm:ss");

function AddOverTime({
  onClose,
  onSuccess,
  language,
  direction,
  authorizedCode,
}) {
  const [showError, setShowError] = useState(false);
  const [showNumPad, setShowNumPad] = useState(false);
  const [nfc, setNfc] = useState("");
  const nfcRef = useRef(null);

  const handleNumberClick = (number) => {
    setNfc((prevValue) => prevValue + number);
  };

  const handleClear = () => {
    setNfc("");
  };

  const handleDelete = () => {
    setNfc((prevValue) => prevValue.slice(0, -1));
  };

  function authorizeManager() {
    if (!nfc) return;
    addingOverTimeShift(nfc, authorizedCode, now)
      .then((res) => {
        if (res.status === 200) {
          onSuccess();
        } else {
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Network or server error:", error);
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 2000);
      });
  }

  return (
    <div className="dialog-overlay" style={{ direction: direction }}>
      <div className="dialog">
        <div className="dialog-header" style={{ marginBottom: "20px" }}>
          <h3>
            {language === "en" ? "Adding Over Time Shift" : "اضافة وقت اضافي"}
          </h3>
        </div>

        <div className="input-field" style={{ position: "relative" }}>
          <label htmlFor="nfc-id">
            {language === "en" ? "Employee Attendance Code" : "كود حضور الموظف"}
          </label>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              direction: "ltr",
            }}
          >
            <input
              ref={nfcRef}
              type="text"
              name="nfc-id"
              id="nfc"
              autoComplete="off"
              className="input-text"
              onClick={() => setShowNumPad(true)}
              //autoFocus={true}
              onChange={(e) => setNfc(e.target.value)}
              value={nfc}
              style={{ paddingRight: "40px" }} // Add padding to prevent text overlap with icon
            />
            <TbGridDots
              size={24}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            />
          </div>

          <div className="numpad-container">
            <NumPad
              onNumberClick={handleNumberClick}
              onClear={handleClear}
              onDelete={handleDelete}
              hideConfirm
            />
          </div>
        </div>

        {showError && (
          <div className="feedback">
            <p
              style={{
                color: "red",
              }}
            >
              {language === "en" ? "Somthing Went Wrong" : "حدث خطأ"}
            </p>
          </div>
        )}

        <div
          className="dialog-actions confirmation-actions"
          style={{ justifyContent: "space-between", direction: "ltr" }}
        >
          <button className="dialog-btn cancel-btn" onClick={onClose}>
            {language === "en" ? "Cancel" : "الغاء"}
          </button>
          <button
            className={`dialog-btn confirm-btn`}
            onClick={authorizeManager}
          >
            {language === "en" ? "Confirm" : "تاكيد"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddOverTime;
