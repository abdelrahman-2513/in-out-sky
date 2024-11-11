import React, { useState, useEffect } from "react";
import "./EmployeeData.css";
import { IoIosCloseCircle } from "react-icons/io";
import { checkIn, checkOut } from "../../assets/API";
import dayjs from "dayjs";
import Confirmation from "../Confirmation/Confirmation";

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
}) {
  const [state, setState] = useState(null);
  const [msg, setMsg] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [actionClicked, setActionClicked] = useState(false);
  const [timeRemains, setTimeRemains] = useState(20000);
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
      checkedInBefore: "Checked In Before",
      checkedOutBefore: "Checked Out Before",
      title: `Are you sure you want to ${
        selectedTransaction === "clockIn" ? "clock in" : "clock out"
      } on ${dayjs(new Date()).format("dddd D/MMMM/YYYY")}, at ${dayjs(
        new Date()
      ).format("HH:mm ")}?`,
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
      checkedInBefore: "تم تسجيل الحضور من قبل",
      checkedOutBefore: "تم تسجيل الانصراف من قبل",
      title: `هل أنت متأكد أنك تريد ${
        selectedTransaction === "clockIn" ? "تسجيل الحضور" : "تسجيل الانصراف"
      } في ${dayjs(new Date()).format("dddd D/MMMM/YYYY")} في  ${dayjs(
        new Date()
      ).format("HH:mm ")}؟`,
    },
  };

  const handleCheckIn = () => {
    checkIn({
      vCardNumber: nfc,
      //date: dayjs(new Date()).format("YYYY-MM-DD"),
      attDateTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      attDate: dayjs(new Date()).format("YYYY-MM-DD"),
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
    checkOut({
      vCardNumber: nfc,
      //date: dayjs(new Date()).format("YYYY-MM-DD"),
      attDateTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      attDate: dayjs(new Date()).format("YYYY-MM-DD"),
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
          <h4>{trns[language].title}</h4>
          <IoIosCloseCircle
            size={30}
            className="close-button"
            onClick={onClose}
          />
        </div>
        <div className="dialog-content">
          <div className="dialog-row">
            <p> {trns[language].name} </p>
            <p>: {Employee?.personalName}</p>
          </div>
          <div className="dialog-row">
            <p>{trns[language].department} </p>
            <p>: {Employee?.deparmentName}</p>
          </div>
          <div className="dialog-row">
            <p>{trns[language].job} </p>
            <p>: {Employee?.jopName}</p>
          </div>
          <div className="dialog-row">
            <p>{trns[language].date} </p>
            <p>: {dayjs(new Date()).format("dddd D/MMMM/YYYY")}</p>
          </div>
          <div className="dialog-row">
            <p>{trns[language].time} </p>
            <p>: {dayjs(new Date()).format("HH:mm ")}</p>
          </div>
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
          style={{ justifyContent: "space-between" }}
        >
          <button
            className="dialog-btn confirm-btn"
            id={actionClicked ? "disabled" : ""}
            onClick={() => {
              if (actionClicked) return;
              setActionClicked(true);
              setTimeRemains(5000);
              onConfirm();
            }}
          >
            {language === "en" ? "Yes" : "نعم"}
          </button>
          <button className="dialog-btn cancel-btn" onClick={onClose}>
            {language === "en" ? "No" : "لا"}
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
