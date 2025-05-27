import React, { useRef, useState } from "react";
import NumPad from "../NumPad/NumPad";
import { TbGridDots } from "react-icons/tb";
import { checkManager } from "../../assets/API";

function parseHashedAttendance(input) {
  const today = new Date();

  // Extract the code length by comparing repeated segments
  const totalLength = input.length;

  // Try all possible code lengths (1 to 5 is safe assumption)
  for (let len = 1; len <= 5; len++) {
    if (totalLength !== len * 3 + 6) continue;

    const code1 = input.slice(0, len);
    const day = parseInt(input.slice(len, len + 2), 10);

    const code2 = input.slice(len + 2, len * 2 + 2);
    const month = parseInt(input.slice(len * 2 + 2, len * 2 + 4), 10);

    const code3 = input.slice(len * 2 + 4, len * 3 + 4);
    const year = 2000 + parseInt(input.slice(len * 3 + 4), 10);

    if (code1 === code2 && code2 === code3) {
      const isToday =
        today.getDate() === day &&
        today.getMonth() + 1 === month &&
        today.getFullYear() === year;

      if (isToday) return code1;
    }
  }

  return null;
}

function ManagerAuth({
  onClose,
  onSuccess,
  language,
  direction,
  setAuthorizedCode,
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
    // const decodedNfc = parseHashedAttendance(String(nfc));
    checkManager(nfc)
      .then((res) => {
        if (res.status === 200) {
          setAuthorizedCode && setAuthorizedCode(nfc);
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
            {language === "en" ? "Manager Authorization" : "تصريح المدير"}
          </h3>
        </div>

        <div className="input-field" style={{ position: "relative" }}>
          <label htmlFor="nfc-id">
            {language === "en" ? "Attendance Code" : "رقم الحضور"}
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
              {language === "en" ? "Invalid Code" : "رقم الحضور غير صحيح"}
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

export default ManagerAuth;
