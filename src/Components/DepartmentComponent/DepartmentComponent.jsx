import React, { useEffect, useState } from "react";
import { getDepartments } from "../../assets/API";
import "./DepartmentComponent.css";
function DepartmentComponent({ language, setDeratment, reset }) {
  const [depatrments, setDepatrments] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const depatrmentsTrans = {
    en: {
      "": "Please Select Your Department",
    },
    ar: {
      "": "يرجى أختيار القسم",
    },
  };
  function handleDepSelection(e) {
    const value = e.target.value.split(",");
    const selectedDep = {
      id: value[0],
      name: value[1],
    };
    setDeratment(selectedDep);
    console.log(selectedDep);
  }

  useEffect(() => {
    setIsLoading(true);
    getDepartments()
      .then((res) => {
        console.log(res);
        setDepatrments(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const options = ["Development", "Sales", "Marketing", "HR", "Finance"];
  return (
    <div
      className="secondary-container"
      style={{
        display: "flex",
        gap: "20px",
        padding: "40px",
        position: "relative",
      }}
    >
      <div className="message">
        <div className="message-content">
          <p style={{ textAlign: "center" }}>
            {depatrmentsTrans[language][""]}
          </p>
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
      ) : depatrments && depatrments.length > 0 ? (
        <div className="language-selector">
          <select onChange={handleDepSelection}>
            <option id="language-select">
              {language === "en"
                ? "Please select a department"
                : "يرجى أختيار القسم"}
            </option>
            {depatrments?.map((department, index) => (
              <option
                id="language-select"
                key={department.departmentId}
                // onClick={() => setDeratment(option)}
                value={[department.departmentId, department.departmentName]}
              >
                {department.departmentName}
              </option>
            ))}
          </select>
        </div>
      ) : (
        ""
      )}
      <div className="btns login-btn-container">
        {/* <button className="btn" onClick={handleCheckOut}>
          {language === "en" ? "Check Out" : "تسجيل الخروج"}
        </button>
        <button className="btn btn-primary" onClick={handleCheckIn}>
          {language === "en" ? "Check In" : "تسجيل الدخول"}
        </button> */}

        <button className="btn btn-primary back-btn" onClick={reset}>
          {language === "en" ? "Home Page" : "الصفحة الرئيسية"}
        </button>
      </div>
    </div>
  );
}

export default DepartmentComponent;
