import dayjs from "dayjs";
import "dayjs/locale/ar"; // Arabic locale
import "dayjs/locale/en"; // English locale (default)
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { checkIn, checkOut } from "../../assets/API";
import Confirmation from "../Confirmation/Confirmation";
import "./EmployeeData.css";

function formatDate(date, language) {
  // Set the locale based on the provided language
  dayjs.locale(language);

  // Format the date
  return dayjs(date).format("dddd D, MMMM YYYY");
}
function formatTime(time, language) {
  // Set the locale based on the provided language
  dayjs.locale(language);

  // Format the date
  return dayjs(time).format("H:mm:ss");
}

function getDateTime() {
  const arabicDate = formatDate(new Date(), "ar");
  const arabicTime = formatTime(new Date(), "ar");
  const englishDate = formatDate(new Date(), "en");
  const englishTime = formatTime(new Date(), "en");
  return { arabicDate, arabicTime, englishDate, englishTime };
}

function EmployeeData({
  title,
  Employee,
  message,
  onClose,
  open,
  language,
  direction,
  setNfc,
  reset,
  nfc,
  selectedTransaction,
  depsTrns,
  jobsTrns,
}) {
  const [dateTime, setDateTime] = useState();
  const [state, setState] = useState(null);
  const [msg, setMsg] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [actionClicked, setActionClicked] = useState(false);
  const [timeRemains, setTimeRemains] = useState(30000);
  const [selectedShift, setSelectedShift] = useState(null);
  useEffect(() => {
    const { arabicDate, arabicTime, englishDate, englishTime } = getDateTime();
    setDateTime({ arabicDate, arabicTime, englishDate, englishTime });
  }, []);
  const trns = {
    en: {
      name: "Name",
      department: "Department",
      job: "Job",
      ok: "Ok",
      checkIn: "Clock In",
      checkOut: "Clock Out",
      "in-200": "Check In Successful",
      "in-400": "Check In Failed",
      "out-200": "Check Out Successful",
      "out-400": "Check Out Failed",
      date: "Date",
      time: "Time",
      shift: "Shift",
      checkedInBefore: "Checked In Before",
      checkedOutBefore: "Checked Out Before",
      titleFirstLine: `Are You Sure You Want To ${
        selectedTransaction === "clockIn" ? "Clock In" : "Clock Out"
      }  On`,
      titleSecondLine: `${dateTime?.englishDate}
      `,
      titleThirdLine: "At",
      titleForthLine: `${dateTime?.englishTime} `,
    },
    ar: {
      name: "الاسم",
      department: "القسم",
      job: "الوظيفة",
      ok: "حسنا",
      checkIn: "تسجيل حضور",
      checkOut: "تسجيل انصراف",
      "in-200": "تسجيل الحضور ناجح",
      "in-400": "فشل تسجيل الحضور",
      "out-200": "تسجيل الانصراف ناجح",
      "out-400": "فشل تسجيل الانصراف",
      date: "التاريخ",
      time: "الوقت",
      shift: "الفترة",
      checkedInBefore: "تم تسجيل الحضور من قبل",
      checkedOutBefore: "تم تسجيل الانصراف من قبل",
      titleFirstLine: `هل أنت متأكد أنك تريد ${
        selectedTransaction === "clockIn" ? "تسجيل الحضور" : "تسجيل الانصراف"
      } في`,
      titleSecondLine: `${dateTime?.arabicDate}
      `,
      titleThirdLine: "في",
      titleForthLine: `${dateTime?.arabicTime} `,
    },
  };

  const handleCheckIn = () => {
    console.log("from check in data", {
      vCardNumber: nfc,
      //date: dayjs(new Date()).format("YYYY-MM-DD"),
      attDateTime: dayjs(new Date()).format("HH:mm"),
      //attDate: dayjs(new Date()).format("YYYY-MM-DD"),
      attExpectedID: selectedShift?.attExpectedID,
    });
    checkIn({
      vCardNumber: nfc,
      //date: dayjs(new Date()).format("YYYY-MM-DD"),
      attDateTime: dayjs(new Date()).format("HH:mm"),
      //attDate: dayjs(new Date()).format("YYYY-MM-DD"),
      attExpectedID: selectedShift?.attExpectedID,
    })
      .then((res) => {
        setMsg(trns[language][`in-200`]);
        setState(200);

        setTimeout(() => {
          setState(null);
          setMsg("");
          onClose();
          reset();
        }, 5000);
      })
      .catch((err) => {
        if (err.response.data.includes("User Loged In Befor")) {
          setMsg(trns[language][`checkedInBefore`]);
          setState(400);
        } else {
          setMsg(trns[language][`in-400`]);
          setState(400);
        }

        setTimeout(() => {
          setState(null);
          setMsg("");
        }, 5000);
      });
  };

  const handleCheckOut = () => {
    console.log("clock out  emp", Employee);
    checkOut({
      vCardNumber: nfc,
      //date: dayjs(new Date()).format("YYYY-MM-DD"),
      attDateTime: dayjs(new Date()).format("HH:mm"),
      attExpectedID: Employee?.openShifID,
      //attDate: dayjs(new Date()).format("YYYY-MM-DD"),
    })
      .then((res) => {
        setMsg(trns[language][`out-200`]);
        setState(200);
        setTimeout(() => {
          setState(null);
          setMsg("");

          onClose();
          reset();
        }, 5000);
      })
      .catch((err) => {
        if (err.response.data.includes("User Loged Out Befor")) {
          setMsg(trns[language][`checkedOutBefore`]);
          setState(400);
        } else {
          setMsg(trns[language][`out-400`]);
          setState(400);
        }
        setTimeout(() => {
          setState(null);
          setMsg("");
        }, 5000);
      });
  };

  // function handleCheckIn() {
  //   setState(200);
  //   setMsg(trns[language][`in-200`]);
  //   setTimeout(() => {
  //     onClose();
  //   }, 2000);
  //   reset();
  // }

  // function handleCheckOut() {
  //   setState(200);
  //   setMsg(trns[language]["out-200"]);
  //   setTimeout(() => {
  //     onClose();
  //   }, 2000);
  //   reset();
  // }

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      reset();
    }, timeRemains);

    // Clear timeout if timeRemains changes or component unmounts
    return () => clearTimeout(timer);
  }, [timeRemains, reset]);
  function onConfirm() {
    if (selectedTransaction === "clockIn") {
      handleCheckIn();
    } else {
      handleCheckOut();
    }
  }

  return (
    <div className="dialog-overlay" style={{ direction: direction }}>
      <div className="dialog">
        <div className="dialog-header">
          <div className="titles">
            <h4>{trns[language].titleFirstLine}</h4>
            <h4 className="hightlight">{trns[language].titleSecondLine}</h4>
            <h4>{trns[language].titleThirdLine}</h4>
            <h4 className="hightlight">{trns[language].titleForthLine}</h4>
          </div>

          <IoClose size={30} className="close-button" onClick={onClose} />
        </div>
        <div className="dialog-content">
          <div className="dialog-row">
            <p> {trns[language].name} </p>
            <p>
              :{" "}
              {language === "en"
                ? Employee?.personalName
                : Employee?.personalName || Employee?.personalName}
            </p>
          </div>
          <div className="dialog-row">
            <p>{trns[language].department} </p>
            <p>
              :{" "}
              {depsTrns[language][Employee?.deparmentName] ||
                Employee?.deparmentName}
            </p>
          </div>
          <div className="dialog-row">
            <p>{trns[language].job} </p>
            <p>
              : {jobsTrns[language][Employee?.jopName] || Employee?.jopName}
            </p>
          </div>
          <div className="dialog-row">
            <p>{trns[language].date} </p>
            <p>: {formatDate(new Date(), language)}</p>
          </div>
          <div className="dialog-row">
            <p>{trns[language].time} </p>
            <p>: {trns[language].titleForthLine}</p>
          </div>

          {selectedTransaction === "clockIn" && (
            <div className="dialog-row">
              <p>{trns[language].shift} </p>
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <span>:</span>
                {Employee?._shiftarray?.map((shift) => (
                  <div
                    key={shift?.shiftID}
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                    onClick={() => setSelectedShift(shift)}
                  >
                    <input
                      type="radio"
                      checked={shift?.shiftID === selectedShift?.shiftID} // Fixed comparison
                      style={{ width: "15px", height: "15px" }}
                      readOnly // Prevents React warnings about uncontrolled inputs
                    />
                    <p>{shift?.shiftName}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* <div className="dialog-actions">
          <button className="btn " onClick={onClose}>
            Close
          </button>
        </div> */}

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

        <div
          className="dialog-actions"
          style={{ justifyContent: "space-between", direction: "ltr" }}
        >
          <button className="dialog-btn cancel-btn" onClick={onClose}>
            {language === "en" ? "No" : "لا"}
          </button>
          <button
            className={`dialog-btn confirm-btn ${
              actionClicked ||
              (selectedTransaction === "clockIn" && !selectedShift)
                ? "disabled-btn"
                : ""
            }`}
            // id={
            //   actionClicked ||
            //   (selectedTransaction === "clockIn" && !selectedShift)
            //     ? "disabled"
            //     : ""
            // }
            onClick={() => {
              if (actionClicked) return;
              setActionClicked(true);
              setTimeRemains(5000);
              onConfirm();
            }}
          >
            {language === "en" ? "Yes" : "نعم"}
          </button>
        </div>
      </div>

      {openConfirmation && (
        <Confirmation
          direction={direction}
          open={openConfirmation}
          setOpen={setOpenConfirmation}
          selectedTransaction={selectedTransaction}
          language={language}
          onConfirm={
            selectedTransaction === "clockIn" ? handleCheckIn : handleCheckOut
          }
          msg={msg}
          state={state}
          reset={reset}
        />
      )}
    </div>
  );
}

export default EmployeeData;
