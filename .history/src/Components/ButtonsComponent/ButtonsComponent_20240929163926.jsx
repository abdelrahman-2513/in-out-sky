import { useEffect, useRef, useState } from "react";
import "./ButtonComponents.css";

// Define messages for both English and Arabic
const nfcMsgs = {
  en: {
    "": "Welcome To Sky Culinaire NFC System. Please move your card.",
    success: "Check-In Successful",
    fail: "Check-In Failed",
    "success-out": "Check-Out Successful",
    "fail-out": "Check-Out Failed",
  },
  ar: {
    "": "مرحبًا بكم في نظام سكاي كولينير NFC، يرجى تحريك بطاقتك.",
    success: "تسجيل الدخول ناجح",
    fail: "فشل تسجيل الدخول",
    "success-out": "تسجيل الخروج ناجح",
    "fail-out": "فشل تسجيل الخروج",
  },
};

function ButtonsComponent({ language }) {
  const [nfc, setNfc] = useState("");
  const [checkIn, setCheckIn] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  const [message, setMessage] = useState("");

  const nfcRef = useRef(null);

  useEffect(() => {
    if (language) {
      nfcRef.current.focus();
    }
  }, [language]);
  const handleCheckIn = () => {
    setCheckIn(true);
    setCheckOut(false);
    setMessage("success");

    setNfc("");
    setTimeout(() => {
      setCheckIn(false);
      setMessage("");
      nfcRef.current.focus();
      setCheckOut(false);
    }, 2000);
  };

  const handleCheckOut = () => {
    setCheckOut(true);
    setCheckIn(false);
    nfcRef.current.focus();

    setNfc("");
    setMessage("fail-out");

    setTimeout(() => {
      setCheckIn(false);
      setMessage("");

      setCheckOut(false);
    }, 1000);
  };

  const direction = language === "ar" ? "rtl" : "ltr";

  return (
    <div className="secondary-container" style={{ direction }}>
      <div className="input-field">
        <label htmlFor="nfc-id">
          {language === "en" ? "Employee ID" : "معرف الموظف"}
        </label>
        <input
          ref={nfcRef}
          type="text"
          name="nfc-id"
          id="nfc"
          className="input-text"
          autoFocus={true}
          onChange={(e) => setNfc(e.target.value)}
          value={nfc}
        />
      </div>

      <div className="message">
        <div className="message-content">
          <p className={message?.includes("fail") ? "fail" : "success"}>
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

      <div className="btns">
        <button className="btn" onClick={handleCheckOut}>
          {language === "en" ? "Check Out" : "تسجيل الخروج"}
        </button>
        <button className="btn btn-primary" onClick={handleCheckIn}>
          {language === "en" ? "Check In" : "تسجيل الدخول"}
        </button>
      </div>
    </div>
  );
}

export default ButtonsComponent;
