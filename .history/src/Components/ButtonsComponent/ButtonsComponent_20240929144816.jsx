import { useState } from "react";
import "./ButtonComponents.css";
function ButtonsComponent() {
  const [nfc, setNfc] = useState("");
  const [checkIn, setCheckIn] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  const HandleCheckIn = () => {
    setCheckIn(true);
    setCheckOut(false);
    setTimeout(() => {
      setCheckIn(false);
      setCheckOut(false);
    }, 1000);
  };
  const HandleCheckOut = () => {
    setCheckOut(true);
    setCheckIn(false);
    setTimeout(() => {
      setCheckIn(false);
      setCheckOut(false);
    }, 1000);
  };
  const handleChangeNfC = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="secondary-container">
      <div className="input-field">
        <label htmlFor="nfc-id">Employee ID</label>
        <input
          type="text"
          name="nfc-id"
          id="nfc"
          className="input-text"
          autoFocus={true}
          onChange={handleChangeNfC}
          value={nfc}
        />
      </div>
      <div className="message"></div>
      <div className="btns">
        <button className="btn btn-primary" onClick={HandleCheckIn}>
          Check In
        </button>
        <button className="btn" onClick={HandleCheckOut}>
          Check Out
        </button>
      </div>
    </div>
  );
}

export default ButtonsComponent;
