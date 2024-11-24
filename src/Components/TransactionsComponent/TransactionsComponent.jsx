import React, { useEffect, useState } from "react";
import LogGrid from "../LogGrid/LogGrid";
import { getEmployeesInList, getEmployeesOutList } from "../../assets/API";
import "../Header/Header.css";
import dayjs from "dayjs";

function TransactionsComponent({
  language,
  message = "",
  setSelectedTransaction,
}) {
  const [employeesInList, setEmployeesInList] = useState([]);
  const [employeesOutList, setEmployeesOutList] = useState([]);
  const [selectedLogTable, setSelectedLogTable] = useState("clockIn");
  const [openLogTable, setOpenLogTable] = useState(false);

  const transactions = {
    en: {
      "": "Welcome To Sky Culinaire Check-In System",
      200: "Check-In Successful",
      400: "Check-In Failed",
      "200-out": "Check-Out Successful",
      "400-out": "Check-Out Failed",
      logsTitle: "Please Select Employee Status",
      checkedIn: "Who is Clocked In",
      checkedOut: "Who is Clocked Out",
      logTableTitleIn: "Clocked In Employees",
      logTableTitleOut: "Clocked Out Employees",
    },
    ar: {
      "": "مرحبًا بكم في نظام تسجيل الحضور الخاص بـ Sky Culinaire",
      200: "تسجيل الدخول ناجح",
      400: "فشل تسجيل الدخول",
      "200-out": "تسجيل الخروج ناجح",
      "400-out": "فشل تسجيل الخروج",
      logsTitle: "يرجى اختيار حالة الموظف",
      checkedIn: "مُسجل حضور",
      checkedOut: "مُسجل انصراف",
      logTableTitleIn: "الموظفين المسجلين حضور",
      logTableTitleOut: "الموظفين المسجلين انصراف",
    },
  };

  useEffect(() => {
    getEmployeesInList({ date: dayjs(new Date()).format("YYYY-MM-DD") })
      .then((res) => {
        setEmployeesInList(res);
        console.log("in emp", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getEmployeesOutList({ date: dayjs(new Date()).format("YYYY-MM-DD") })
      .then((res) => {
        setEmployeesOutList(res);
        console.log("out emp", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleTableSelection(status) {
    setSelectedLogTable(status);
    setOpenLogTable(true);
  }
  return (
    <div
      className="secondary-container"
      style={{
        display: "flex",
        maxWidth: "100%",
        width: "100%",
        gap: "10px",
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
        <div className="logs-side ">
          {/* <p className="status-title">{transactions[language].logsTitle}</p> */}
          <div className="status-btns language-tabs">
            <div
              // onClick={() => handleTableSelection("clockIn")}
              onClick={() => handleTableSelection("clockIn")}
              className={` ${selectedLogTable === "clockIn" ? "active" : ""}`}
              style={{
                direction: language === "en" ? "ltr" : "rtl",
                padding: "5px 10px",
              }}
            >
              {transactions[language].checkedIn}
            </div>
            <div
              // onClick={() => handleTableSelection("clockOut")}
              onClick={() => handleTableSelection("clockOut")}
              className={` ${selectedLogTable === "clockOut" ? "active" : ""}`}
              style={{
                direction: language === "en" ? "ltr" : "rtl",
                padding: "5px 10px",

                //width: "100px",
              }}
            >
              {transactions[language].checkedOut}
            </div>
          </div>
          <LogGrid
            data={
              selectedLogTable === "clockIn"
                ? employeesInList
                : employeesOutList
            }
            title={
              selectedLogTable === "clockIn"
                ? transactions[language].logTableTitleIn
                : transactions[language].logTableTitleOut
            }
            language={language}
            onClose={() => setOpenLogTable(false)}
          />
        </div>
        <div className="divider"></div>

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
      </div>
      {/* {openLogTable && (
        <LogGrid
          data={
            selectedLogTable === "clockIn" ? employeesInList : employeesOutList
          }
          title={
            selectedLogTable === "clockIn"
              ? transactions[language].logTableTitleIn
              : transactions[language].logTableTitleOut
          }
          language={language}
          onClose={() => setOpenLogTable(false)}
        />
      )} */}
    </div>
  );
}

export default TransactionsComponent;
