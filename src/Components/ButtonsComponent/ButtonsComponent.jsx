import { useEffect, useRef, useState } from "react";
import "./ButtonComponents.css";

const nfcMsgs = {
  "": "Welcome To Sky Culinaire NFC System Please move your card",
  success: "Checked In Successed",
  fail: "Checked In Failed",
  "success-out": "Checked Out Successed",
  "fail-out": "Checked Out Failed",
};
function ButtonsComponent() {
  const [nfc, setNfc] = useState("");
  const [checkIn, setCheckIn] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  const [message, setMessage] = useState("");
  const nfcRef = useRef(null);
  const HandleCheckIn = () => {
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
  const HandleCheckOut = () => {
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
  //   useEffect(() => {
  //     if (nfc && nfc?.length > 10) {
  //     }
  //   }, [checkIn, checkOut]);
  return (
    <div className="secondary-container">
      <div className="input-field">
        <label htmlFor="nfc-id">Employee ID</label>
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
            {nfcMsgs[message]}
          </p>
          <img
            className="gif"
            src="/images/NFC.gif"
            alt="Move-NfcCard"
            srcset=""
          />
        </div>
      </div>
      <div className="btns">
        <button className="btn" onClick={HandleCheckOut}>
          Check Out
        </button>
        <button className="btn btn-primary" onClick={HandleCheckIn}>
          Check In
        </button>
      </div>
    </div>
  );
}

export default ButtonsComponent;
