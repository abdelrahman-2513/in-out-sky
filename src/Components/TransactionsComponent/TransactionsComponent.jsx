import React from "react";

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
      style={{ display: "flex", gap: "60px", padding: "40px" }}
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
      <div className="btns login-btn-container">
        {/* <button className="btn" onClick={handleCheckOut}>
          {language === "en" ? "Check Out" : "تسجيل الخروج"}
        </button>
        <button className="btn btn-primary" onClick={handleCheckIn}>
          {language === "en" ? "Check In" : "تسجيل الدخول"}
        </button> */}
        <button
          className="btn btn-primary"
          onClick={() => setSelectedTransaction("clockIn")}
        >
          {language === "en" ? "Clock In" : "تسجيل حضور"}
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setSelectedTransaction("clockOut")}
        >
          {language === "en" ? "Clock Out" : "تسجيل انصراف"}
        </button>
      </div>
    </div>
  );
}

export default TransactionsComponent;
