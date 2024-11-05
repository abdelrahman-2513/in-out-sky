import React from "react";
import "./Confirmation.css";
function Confirmation({ selectedTransaction, direction, language }) {
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
  console.log(selectedTransaction);
  return (
    <div className="dialog-overlay" style={{ direction: direction }}>
      <div className="dialog">
        <div className="dialog-header">
          <h3>{confTrns[language][selectedTransaction]}</h3>
        </div>
        <div className="dialog-actions confirmation-actions">
          <button
            className="dialog-btn confirm-btn"
            //onClick={() => setOpenConfirmation(true)}
          >
            {confTrns[language].confirm}
          </button>
          <button
            className="dialog-btn cancel-btn "
            //onClick={() => setOpenConfirmation(true)}
          >
            {confTrns[language].cancel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
