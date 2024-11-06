import { useEffect, useRef, useState } from "react";
import "./ButtonComponents.css";
import { takeAction, login } from "../../assets/API";
import dayjs from "dayjs";
import NumPad from "../NumPad/NumPad";
import { PiNumpadBold } from "react-icons/pi";
import EmployeeData from "../EmployeeDataPopUp/EmployeeData";

const nfcMsgs = {
  en: {
    "": "Welcome To Sky Culinaire Check-In System. Please Enter your Attendance Code.",
    200: "Check-In Successful",
    400: "Check-In Failed",
    "200-out": "Check-Out Successful",
    "400-out": "Check-Out Failed",
    "200-login": "Login Successful",
    "400-login": "Please Enter Your Attendance Code ",
  },
  ar: {
    "": "مرحبًا بكم في نظام تسجيل الوصول الخاص بـ Sky Culinaire. يرجى إدخال رقم الحضور الخاص بك.",
    200: "تسجيل الدخول ناجح",
    400: "فشل تسجيل الدخول",
    "200-out": "تسجيل الخروج ناجح",
    "400-out": "فشل تسجيل الخروج",
    "200-login": "تسجيل الدخول ناجح",
    "400-login": "يرجى إدخال رقم الحضور الخاص بك",
  },
};

function ButtonsComponent({ language, employee, selectedTransaction, reset }) {
  const [nfc, setNfc] = useState("");
  const [checkIn, setCheckIn] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  const [message, setMessage] = useState("");
  const [showNumPad, setShowNumPad] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [employeeData, setEmployeeData] = useState(null); // State to control the dialog visibility
  const nfcRef = useRef(null);

  useEffect(() => {
    console.log("selected emp", employee);
    console.log(selectedTransaction);
    if (language) {
      nfcRef.current.focus();
    }
  }, [language, employee]);
  const handleCheckIn = () => {
    takeAction({
      cardId: nfc,
      date: dayjs(new Date()).format("YYYY-MM-DD"),
      dateTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      kind: "I",
    })
      .then((res) => {
        setMessage("200");

        setNfc("");
        setTimeout(() => {
          setCheckIn(false);
          setMessage("");
          nfcRef.current.focus();
          setCheckOut(false);
        }, 2000);
      })
      .catch((err) => {
        setMessage("400");
        setNfc("");
        setTimeout(() => {
          setMessage("");
          nfcRef.current.focus();
          setCheckOut(false);
        }, 2000);
      });
  };

  const handleCheckOut = () => {
    takeAction({
      cardId: nfc,
      date: dayjs(new Date()).format("YYYY-MM-DD"),
      dataTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      kind: "I",
    })
      .then((res) => {
        console.log(res);
        setMessage("200-out");

        setNfc("");
        setTimeout(() => {
          setCheckIn(false);
          setMessage("");
          nfcRef.current.focus();
          setCheckOut(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setMessage("400-out");
        setNfc("");
        setTimeout(() => {
          setMessage("");
          nfcRef.current.focus();
          setCheckOut(false);
        }, 2000);
      });
  };
  function handleLogin() {
    if (nfc === employee?.personalAttCode) {
      login({ id: nfc }).then((res) => {
        console.log(res);
        setMessage("200-login");
        setEmployeeData(res);
        setOpenDialog(true);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      });
    } else {
      setMessage("400-login");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  }
  const direction = language === "ar" ? "rtl" : "ltr";

  const handleNumberClick = (number) => {
    setNfc((prevValue) => prevValue + number);
  };

  const handleClear = () => {
    setNfc("");
  };

  const handleDelete = () => {
    setNfc((prevValue) => prevValue.slice(0, -1));
  };

  const handleLoginClick = () => {
    if (nfc === "71") {
      const emp = {
        name: "Ziad Ahmed",
        department: "Development",
        job: "Programmer",
      };
      //setEmployee(emp);
      setOpenDialog(true);
    } else {
      setMessage("400-login");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }

    // Open the popup when the button is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  };
  function resetAll() {
    reset();
    setNfc("");
    setShowNumPad(false);
    setTimeout(() => {
      //setEmployee(null);
    }, 2000);
  }

  return (
    <div className="secondary-container" style={{ direction }}>
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
          <PiNumpadBold
            size={30}
            onClick={() => setShowNumPad(!showNumPad)}
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
          {showNumPad ? (
            <NumPad
              onNumberClick={handleNumberClick}
              onClear={handleClear}
              onDelete={handleDelete}
            />
          ) : (
            <div style={{ margin: "65px 0" }}>
              <img
                className="gif"
                src="/images/NFC.gif"
                alt={language === "en" ? "Move NFC Card" : "حرك بطاقة NFC"}
                srcSet=""
              />
            </div>
          )}
        </div>
      </div>

      <div className="message">
        <div className="message-content">
          <p
            className={message?.includes("400") ? "fail" : "success"}
            style={{ textAlign: "center" }}
          >
            {message && nfcMsgs[language][message]}
          </p>
        </div>
      </div>

      <div className="btns login-btn-container">
        {/* <button className="btn" onClick={handleCheckOut}>
          {language === "en" ? "Check Out" : "تسجيل الخروج"}
        </button>
        <button className="btn btn-primary" onClick={handleCheckIn}>
          {language === "en" ? "Check In" : "تسجيل الدخول"}
        </button> */}
        <button className="btn btn-primary" onClick={handleLogin}>
          {language === "en" ? "Login" : "تسجيل الدخول"}
        </button>
        <button className="btn btn-primary back-btn" onClick={reset}>
          {language === "en" ? "Home Page" : "الصفحة الرئيسية"}
        </button>
      </div>

      {openDialog && (
        <EmployeeData
          onClose={() => setOpenDialog(false)}
          title={language === "en" ? "Login Status" : "حالة تسجيل الدخول"}
          message={nfcMsgs[language][message] || ""}
          language={language}
          direction={direction}
          Employee={employeeData}
          selectedTransaction={selectedTransaction}
          reset={resetAll}
          nfc={nfc}
        />
      )}
    </div>
  );
}

export default ButtonsComponent;
