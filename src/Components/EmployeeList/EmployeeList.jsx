import React, { useEffect, useState } from "react";
import { getEmployees } from "../../assets/API";
import dayjs from "dayjs";
import "./EmployeeList.css";
function EmployeeList({ department, setEmployee, language }) {
  const [employees, setEmployees] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const employeesTrans = {
    en: {
      "": "Please Select Your Name",
    },
    ar: {
      "": "يرجى أختيار اسمك",
    },
  };
  function handleDepSelection(e) {
    console.log(e.target.value);
    setEmployeeSelected(e.target.value);
  }

  useEffect(() => {
    const data = {
      date: dayjs(new Date()).format("YYYY-MM-DD"),
      departmentId: department?.id,
    };
    setIsLoading(true);
    getEmployees(data)
      .then((res) => {
        console.log(res);

        setEmployees(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [department]);

  function handleEmployeeSelection(emp) {
    setEmployee(emp);
  }
  return (
    <div
      className="secondary-container"
      style={{ display: "flex", gap: "60px", padding: "40px" }}
    >
      <div className="message">
        <div className="message-content">
          <p style={{ textAlign: "center" }}>{employeesTrans[language][""]}</p>
          {/* <img
            className="gif"
            src="/images/NFC.gif"
            alt={language === "en" ? "Move NFC Card" : "حرك بطاقة NFC"}
            srcSet=""
          /> */}
        </div>
      </div>

      {isLoading ? (
        <span className="loader"></span>
      ) : employees && employees.length > 0 ? (
        <div className="employees-table">
          <div className="employee-header">
            {language === "en" ? "Employee Name" : "اسم الموظف"}
          </div>
          {employees.map((emp) => (
            <div
              className="employee-row"
              onClick={() => handleEmployeeSelection(emp)}
              key={emp}
            >
              {emp.personalName}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default EmployeeList;
