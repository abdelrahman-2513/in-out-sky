import React, { useEffect, useState } from "react";

import "./Confirmation.css";
function Confirmation({
  selectedTransaction,
  direction,
  language,
  setOpen,
  msg,
  state,
  onConfirm,
  reset,
}) {
  const [timeRemains, setTimeRemains] = useState(20000);
  const [actionClicked, setActionClicked] = useState(false);
  const confTrns = {
    en: {
      clockIn: "Are you sure you want to clock in ?",
      clockOut: "Are you sure you want to clock out ?",
      confirm: "Confirm",
      cancel: "Cancel",
    },
    ar: {
      clockIn: "هل انت متاكد من تسجيل الدخول؟",
      clockOut: "هل انت متاكد من تسجيل الخروج؟",
      confirm: "تاكيد",
      cancel: "الغاء",
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      reset();
    }, timeRemains);

    // Clear timeout if timeRemains changes or component unmounts
    return () => clearTimeout(timer);
  }, [timeRemains, setOpen, reset]);

  console.log(selectedTransaction);
  return (
    <div className="dialog-overlay" style={{ direction: direction }}>
      <div className="dialog">
        <div className="dialog-header">
          <h3>{confTrns[language][selectedTransaction]}</h3>
        </div>
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
        <div className="dialog-actions confirmation-actions">
          <button
            className={`dialog-btn confirm-btn `}
            id={actionClicked ? "disabled" : ""}
            onClick={() => {
              if (actionClicked) return;
              setActionClicked(true);
              setTimeRemains(5000);
              onConfirm();
            }}
          >
            {confTrns[language].confirm}
          </button>
          <button
            className="dialog-btn cancel-btn "
            onClick={() => setOpen(false)}
          >
            {confTrns[language].cancel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
