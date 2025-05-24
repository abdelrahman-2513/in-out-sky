import React, { useEffect, useRef, useState } from "react";
import LogGrid from "../LogGrid/LogGrid";
import { getEmployeesInList, getEmployeesOutList } from "../../assets/API";
import "../Header/Header.css";
import dayjs from "dayjs";
import ManagerAuth from "../Manager/ManagerAuth";
import AddOverTime from "../Manager/AddOverTime";

function TransactionsComponent({
  language,
  message = "",
  setSelectedTransaction,
  depsTrns,
  direction,
  setLanguage,
}) {
  const [employeesInList, setEmployeesInList] = useState([]);
  const [employeesOutList, setEmployeesOutList] = useState([]);
  const [selectedLogTable, setSelectedLogTable] = useState("clockIn");
  const [openLogTable, setOpenLogTable] = useState(false);
  const [managerView, setManagerView] = useState(false);
  const [openManagerAuth, setOpenManagerAuth] = useState(false);
  const [authorizedCode, setAuthorizedCode] = useState(null);
  const [openAddOverTime, setOpenAddOverTime] = useState(false);

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
      "": "مرحبًا بكم في نظام تسجيل الحضور الخاص بسكاي كولينير",
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

  //Idle manager view

  const timeoutRef = useRef(null);

  const handleInactivity = () => {
    console.log("User has been inactive for 30 seconds");
    // 🔥 Your action here (e.g., logout, warning modal, etc.)
    setLanguage("en");
    setManagerView(false);
    setOpenAddOverTime(false);
  };

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleInactivity, 30000); // 30,000 sec
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Initialize timer on mount
    resetTimer();

    return () => {
      // Clean up
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="secondary-container"
      style={{
        display: "flex",
        maxWidth: "100%",
        height: "70vh",
        width: "100%",
        gap: "10px",
      }}
    >
      <div className="message">
        <div className="message-content">
          <p style={{ textAlign: "center" }}>
            {transactions[language][message]}
          </p>
        </div>
      </div>
      <div className="main-grid">
        {managerView && (
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <div
              className="logs-side"
              style={{ height: "100%", width: "100%" }}
            >
              <div className="status-btns language-tabs " id="table-btns">
                <div
                  onClick={() => handleTableSelection("clockIn")}
                  className={` ${
                    selectedLogTable === "clockIn" ? "active" : ""
                  }`}
                  style={{
                    direction: language === "en" ? "ltr" : "rtl",
                    padding: "5px 10px",
                  }}
                >
                  {transactions[language].checkedIn}
                </div>
                <div
                  onClick={() => handleTableSelection("clockOut")}
                  className={` ${
                    selectedLogTable === "clockOut" ? "active" : ""
                  }`}
                  style={{
                    direction: language === "en" ? "ltr" : "rtl",
                    padding: "5px 10px",
                  }}
                >
                  {transactions[language].checkedOut}
                </div>
              </div>
              <LogGrid
                depsTrns={depsTrns}
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
            <button
              className="btn btn-primary trns-btn overtime-btn"
              onClick={() => setOpenAddOverTime(true)}
            >
              {language === "en" ? "Add Over Time" : "اضافة وقت اضافي"}
            </button>
          </div>
        )}
        {/* <div className="divider"></div> */}

        {!managerView && (
          <div className="btns login-btn-container " style={{ gap: "10px" }}>
            <button
              className="btn btn-primary trns-btn"
              onClick={() => setSelectedTransaction("clockIn")}
              style={{ backgroundColor: "#7CB342" }}
            >
              {language === "en" ? "Clock In" : "تسجيل حضور"}
            </button>
            <button
              className="btn btn-primary trns-btn"
              onClick={() => setSelectedTransaction("clockOut")}
              style={{ backgroundColor: "#D84315" }}
            >
              {language === "en" ? "Clock Out" : "تسجيل انصراف"}
            </button>
          </div>
        )}
        <div>
          <button
            className="btn btn-primary trns-btn manager-view-btn"
            onClick={() => {
              managerView ? setManagerView(false) : setOpenManagerAuth(true);
            }}
            style={{
              backgroundColor: "#546E7A",
            }}
          >
            {language === "en"
              ? managerView
                ? "Main Screen"
                : "Manager View"
              : managerView
              ? "الشاشة الرئيسية"
              : "عرض المدير"}{" "}
          </button>
        </div>
      </div>
      {openManagerAuth && (
        <ManagerAuth
          onClose={() => setOpenManagerAuth(false)}
          language={language}
          onSuccess={() => {
            setManagerView(true);
            setOpenManagerAuth(false);
          }}
          setAuthorizedCode={setAuthorizedCode}
          direction
        />
      )}
      {openAddOverTime && (
        <AddOverTime
          onClose={() => setOpenAddOverTime(false)}
          onSuccess={() => setOpenAddOverTime(false)}
          language={language}
          direction
          authorizedCode={authorizedCode}
        />
      )}
    </div>
  );
}

export default TransactionsComponent;
