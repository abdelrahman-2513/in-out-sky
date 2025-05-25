import dayjs from "dayjs";
import "dayjs/locale/ar"; // Arabic locale
import "dayjs/locale/en"; // English locale (default)
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { checkIn, checkOut, getLogOutData } from "../../assets/API";
import Confirmation from "../Confirmation/Confirmation";
import "./EmployeeData.css";
import ManagerAuth from "../Manager/ManagerAuth";

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

function getTimeUntil(targetTimeStr) {
  if (!targetTimeStr) return;
  const now = new Date();

  // Extract hours, minutes, seconds from the input
  const [hours, minutes, seconds] = targetTimeStr.split(":");

  // Create a Date object for today with the target time
  const target = new Date();
  target.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds), 0);

  // If current time is after or equal to the target time
  if (now >= target) {
    return null; // or return "Time has passed"
  }

  const diffMs = target - now;
  const diffMins = Math.floor(diffMs / 60000);
  const h = Math.floor(diffMins / 60);
  const m = diffMins % 60;
  console.log(
    "from early func",
    `${h.toString().padStart(2, "0")}H${m.toString().padStart(2, "0")}M`
  );

  return `${h.toString().padStart(2, "0")}H${m.toString().padStart(2, "0")}M`;
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
  const [openManagerPerm, setOpenManagerPerm] = useState(false);
  const [earlyLeavingWarning, setEarlyLeavingWarning] = useState(null);
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
      attDateTime: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      attExpectedID: selectedShift?.attExpectedID,
    });
    checkIn({
      vCardNumber: nfc,
      attDateTime: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
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
      attDateTime: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
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

  function delayMessage() {
    if (
      !selectedShift ||
      !selectedShift?.shiftTime ||
      selectedTransaction !== "clockIn"
    )
      return;

    const targetTimeStr = selectedShift?.shiftTime;
    const [h, m, s] = targetTimeStr.split(":").map(Number);
    const now = new Date();
    const target = new Date();
    target.setHours(h, m, s || 0, 0);

    if (now <= target) return ""; // No delay

    const diffMs = now - target;
    const totalSeconds = Math.floor(diffMs / 1000);

    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    const delayTime = `${hours}H:${minutes}M`;
    const message =
      language === "en"
        ? ` You are late by ${delayTime}.`
        : ` لقد تأخرت لمدة ${delayTime}`;

    return message;
  }

  function handleCloseManagerAuth() {
    setOpenManagerPerm(false);
    onClose();
  }

  function handleManagerAuthOpen() {
    setOpenManagerPerm(true);
    setTimeRemains(30000);
  }

  function handleSuccessManagerAuth() {
    setOpenManagerPerm(false);
    setActionClicked(true);
    setTimeRemains(5000);
    onConfirm();
  }

  async function getLogOut() {
    // if (selectedTransaction !== "clockOut") return;
    const message = await getLogOutData(nfc);
    const outTime = message?._shiftarray?.shiftOUtTime;
    console.log("outTime", message);
    setEarlyLeavingWarning(getTimeUntil(outTime));
  }

  useEffect(() => {
    console.log("Employee from popup", Employee);
    getLogOut();
  }, [selectedTransaction, Employee]);

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
                    <p style={{ width: "fit-content" }}>
                      {shift?.shiftName} ({shift?.shiftLable})
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="feedback">
          {selectedShift && (
            <p
              style={{
                color: "red",
              }}
            >
              {delayMessage()}
            </p>
          )}
        </div>
        <div className="feedback">
          {earlyLeavingWarning && (
            <p
              style={{
                color: "red",
              }}
            >
              You can log out after {earlyLeavingWarning}
            </p>
          )}
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

        <div
          className="dialog-actions"
          style={{ justifyContent: "space-between", direction: "ltr" }}
        >
          <button className="dialog-btn cancel-btn" onClick={onClose}>
            {language === "en" ? "No" : "لا"}
          </button>
          <button
            disabled={selectedTransaction === "clockOut" && earlyLeavingWarning}
            className={`dialog-btn confirm-btn ${
              actionClicked ||
              (selectedTransaction === "clockIn" && !selectedShift)
                ? "disabled-btn"
                : ""
            } ${
              selectedTransaction === "clockOut" && earlyLeavingWarning
                ? "disabled-btn"
                : ""
            }`}
            onClick={() => {
              if (delayMessage()) return handleManagerAuthOpen();
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
      {openManagerPerm && (
        <ManagerAuth
          onClose={handleCloseManagerAuth}
          onSuccess={handleSuccessManagerAuth}
          language={language}
          direction={direction}
        />
      )}
    </div>
  );
}

export default EmployeeData;
