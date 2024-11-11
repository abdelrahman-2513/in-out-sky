import React from "react";
import LogGrid from "../LogGrid/LogGrid";

function TransactionsComponent({
  language,
  message = "",
  setSelectedTransaction,
}) {
  const transactions = {
    en: {
      "": "Welcome To Sky Culinaire Check-In System",
      200: "Check-In Successful",
      400: "Check-In Failed",
      "200-out": "Check-Out Successful",
      "400-out": "Check-Out Failed",
    },
    ar: {
      "": "مرحبا بك في نظام تسجيل الدخول",
      200: "تسجيل الدخول ناجح",
      400: "فشل تسجيل الدخول",
    },
  };
  console.log(language);
  return (
    <div
      className="secondary-container"
      style={{
        display: "flex",
        maxWidth: "100%",
        width: "100%",
        gap: "10px",
        padding: "40px",
      }}
    >
      <div className="message">
        <div className="message-content">
          <p style={{ textAlign: "center" }}>
            {transactions[language][message]}
          </p>
          {/* <img
              className="gif"
              src="/images/NFC.gif"
              alt={language === "en" ? "Move NFC Card" : "حرك بطاقة NFC"}
              srcSet=""
            /> */}
        </div>
      </div>
      <div className="main-grid">
        <div
          className="btns login-btn-container half-screen"
          style={{ gap: "10px" }}
        >
          {/* <button className="btn" onClick={handleCheckOut}>
          {language === "en" ? "Check Out" : "تسجيل الخروج"}
        </button>
        <button className="btn btn-primary" onClick={handleCheckIn}>
          {language === "en" ? "Check In" : "تسجيل الدخول"}
        </button> */}
          <button
            className="btn btn-primary trns-btn"
            onClick={() => setSelectedTransaction("clockIn")}
          >
            {language === "en" ? "Clock In" : "تسجيل حضور"}
          </button>
          <button
            className="btn btn-primary trns-btn"
            onClick={() => setSelectedTransaction("clockOut")}
          >
            {language === "en" ? "Clock Out" : "تسجيل انصراف"}
          </button>
        </div>
        <LogGrid language={language} />
      </div>
    </div>
  );
}

export default TransactionsComponent;
