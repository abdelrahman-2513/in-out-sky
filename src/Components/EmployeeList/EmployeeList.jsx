import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { getInEmployees, getOutEmployees } from "../../assets/API";
import "./EmployeeList.css";
function EmployeeList({
  department,
  setEmployee,
  language,
  reset,
  transaction,
  onBack,
}) {
  const [employees, setEmployees] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const employeesTrans = {
    en: {
      "": "Please Select Your Name",
      empty: "No Employees Found",
    },
    ar: {
      "": "يرجى أختيار اسمك",
      empty: "لم يتم العثور على موظفين",
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
    console.log("tst", data);
    setIsLoading(true);
    if (transaction === "clockIn") {
      getInEmployees(data)
        .then((res) => {
          console.log(res);

          setEmployees(res);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      getOutEmployees(data)
        .then((res) => {
          console.log(res);

          setEmployees(res);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [department]);

  function handleEmployeeSelection(emp) {
    setEmployee(emp);
  }
  return (
    <div
      className="secondary-container"
      style={{ display: "flex", gap: "20px" }}
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
        // <div className="employees-table">
        //   <div className="employee-header">
        //     {language === "en" ? "Employee Name" : "اسم الموظف"}
        //   </div>
        //   {employees.map((emp) => (
        //     <div
        //       className="employee-row"
        //       onClick={() => handleEmployeeSelection(emp)}
        //       key={emp}
        //     >
        //       {emp.personalName}
        //     </div>
        //   ))}
        // </div>
        <div
          className="content-btns-container"
          style={{ direction: language === "ar" ? "rtl" : "ltr" }}
        >
          {employees?.map((employee) => (
            <button
              className="list-btn"
              //id="language-select"
              key={employee.personalId}
              onClick={() => handleEmployeeSelection(employee)}
              style={{ textAlign: language === "ar" ? "right" : "left" }}
            >
              {language === "en"
                ? employee.personalName
                : employee.personalNameAr || employee.personalName}
            </button>
          ))}
        </div>
      ) : (
        <p style={{ marginTop: "20px" }}>{employeesTrans[language]["empty"]}</p>
      )}
      <div className="btns login-btn-container">
        <button className="btn btn-primary back-btn" onClick={reset}>
          {language === "en" ? "Home Page" : "الصفحة الرئيسية"}
        </button>
        <button className="btn btn-primary back-btn" onClick={onBack}>
          {language === "en" ? "Back" : "رجوع"}
        </button>
      </div>
    </div>
  );
}

export default EmployeeList;
