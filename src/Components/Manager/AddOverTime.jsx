import dayjs from "dayjs";
import "dayjs/locale/ar"; // Arabic locale
import "dayjs/locale/en"; // English locale (default)
import { DatePicker } from "antd";

import { useEffect, useRef, useState } from "react";
import {
  addingOverTimeShift,
  getEmployeesOverTime,
  getInEmployees,
  overTimeDepartments,
} from "../../assets/API";

const now = dayjs().format("YYYY-MM-DDTHH:mm:ss");

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const disabledDate = (current) => {
  // Can not select days before today (today is selectable)
  return current && current < dayjs().startOf("day");
};

const disabledDateTime = (current) => {
  const now = dayjs();
  const minTime = now.add(30, "minute");
  const isToday = current && current.isSame(now, "day");

  if (!isToday) {
    // For future dates, all times are available
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    };
  }

  // For today, disable times that are less than 30 minutes from now
  const currentHour = minTime.hour();
  const currentMinute = minTime.minute();

  return {
    disabledHours: () => range(0, currentHour),
    disabledMinutes: (selectedHour) => {
      if (selectedHour === currentHour) {
        return range(0, currentMinute);
      }
      return [];
    },
    disabledSeconds: () => [],
  };
};

function convertToISOFormat(input) {
  // Split date and time
  const [datePart, timePart] = input.split(" "); // "24-05-2025", "20:30"
  const [day, month, year] = datePart.split("-");

  // Rearrange to YYYY-MM-DD and combine
  const isoString = `${year}-${month}-${day}T${timePart}`;
  return isoString;
}

function AddOverTime({
  onClose,
  onSuccess,
  language,
  direction,
  authorizedCode,
}) {
  const [showError, setShowError] = useState(false);
  const [showNumPad, setShowNumPad] = useState(false);
  const [nfc, setNfc] = useState("");
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  const nfcRef = useRef(null);

  async function fetchDeps() {
    const res = await overTimeDepartments();
    setDepartments(res.data);
  }
  async function fetchEmps() {
    const res = await getEmployeesOverTime(selectedDepartment);
    console.log("data", res);
    setEmployees(res);
  }

  const handleNumberClick = (number) => {
    setNfc((prevValue) => prevValue + number);
  };

  const handleClear = () => {
    setNfc("");
  };

  const handleDelete = () => {
    setNfc((prevValue) => prevValue.slice(0, -1));
  };

  useEffect(() => {
    fetchDeps();
  }, []);

  useEffect(() => {
    console.log("from use eff", selectedDepartment);
    if (selectedDepartment) {
      fetchEmps();
    }
  }, [selectedDepartment]);

  function authorizeManager() {
    if (!selectedEmp || !convertToISOFormat(selectedDate)) return;
    addingOverTimeShift(
      selectedEmp,
      authorizedCode,
      now,
      convertToISOFormat(selectedDate)
    )
      .then((res) => {
        if (res.status === 200) {
          onSuccess();
        } else {
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Network or server error:", error);
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 2000);
      });
  }

  useEffect(() => {
    if (selectedEmp && selectedDate) {
      setConfirmDisabled(false);
    }
  }, [selectedEmp, selectedDate]);

  return (
    <div className="dialog-overlay" style={{ direction: direction }}>
      <div className="dialog">
        <div className="dialog-header" style={{ marginBottom: "20px" }}>
          <h3>
            {language === "en" ? "Adding Over Time Shift" : "اضافة وقت اضافي"}
          </h3>
        </div>

        <div className="input-field" style={{ position: "relative" }}>
          {/* <label htmlFor="nfc-id">
            {language === "en" ? "Employee Attendance Code" : "كود حضور الموظف"}
          </label> */}
          {/* <div
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
            <TbGridDots
              size={24}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            />
          </div> */}

          {/* <div className="numpad-container">
            <NumPad
              onNumberClick={handleNumberClick}
              onClear={handleClear}
              onDelete={handleDelete}
              hideConfirm
            />
          </div> */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <select
              className="input-text"
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="" disabled selected>
                {language === "en" ? "Select Department" : "اختر القسم"}
              </option>
              {departments?.map((dep) => (
                <option key={dep.departmentId} value={dep.departmentId}>
                  {dep.departmentName}
                </option>
              ))}
            </select>

            <select
              className="input-text"
              onChange={(e) => setSelectedEmp(e.target.value)}
            >
              <option value="" disabled selected>
                {language === "en" ? "Select Employee" : "اختر الموظف"}
              </option>
              {employees?.map((emp) => (
                <option key={emp.personalId} value={emp.personalId}>
                  {emp.personalName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label
          htmlFor=""
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            display: "block",
          }}
        >
          {language === "en" ? "Working Untill" : "العمل حتى"}
        </label>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {/* <input type="date" className="input-text" id="date" />
          <input type="time" className="input-text" id="time" /> */}
          <DatePicker
            className="input-text"
            format="DD-MM-YYYY HH:mm"
            disabledDate={disabledDate}
            disabledTime={disabledDateTime}
            onChange={(date, dateString) => setSelectedDate(dateString)}
            showTime={{ defaultValue: dayjs("00:00:00", "HH:mm") }}
          />
        </div>

        {showError && (
          <div className="feedback">
            <p
              style={{
                color: "red",
              }}
            >
              {language === "en" ? "Somthing Went Wrong" : "حدث خطأ"}
            </p>
          </div>
        )}

        <div
          className="dialog-actions confirmation-actions"
          style={{ justifyContent: "space-between", direction: "ltr" }}
        >
          <button className="dialog-btn cancel-btn" onClick={onClose}>
            {language === "en" ? "Cancel" : "الغاء"}
          </button>
          <button
            disabled={confirmDisabled}
            className={`dialog-btn confirm-btn ${
              confirmDisabled ? "disabled" : ""
            }`}
            onClick={authorizeManager}
          >
            {language === "en" ? "Confirm" : "تاكيد"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddOverTime;
