import React from "react";

function WelcomeComponent({ language, message, nfcMsgs }) {
  return (
    <div className="message">
      <div className="message-content">
        <p className={message?.includes("400") ? "fail" : "success"}>
          {nfcMsgs[language][message]}
        </p>
        <img
          className="gif"
          src="/images/NFC.gif"
          alt={language === "en" ? "Move NFC Card" : "حرك بطاقة NFC"}
          srcSet=""
        />
      </div>
    </div>
  );
}

export default WelcomeComponent;
