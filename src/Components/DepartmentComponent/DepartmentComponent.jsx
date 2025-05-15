import React, { useEffect, useState } from "react";
import { getDepartments } from "../../assets/API";

function DepartmentComponent({
  language,
  setDeratment,
  reset,
  depsTrns,
  onBack,
}) {
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

        position: "relative",
        maxWidth: "100%",
      }}
    >
      <div className="message">
        <div className="message-content">
          <p style={{ textAlign: "center" }}>
            {depatrmentsTrans[language][""]}
          </p>
        </div>
      </div>

      {isLoading ? (
        <span className="loader"></span>
      ) : depatrments && depatrments.length > 0 ? (
        <div
          className="content-btns-container"
          style={{ direction: language === "ar" ? "rtl" : "ltr" }}
        >
          {depatrments?.map((department) => (
            <button
              className="list-btn"
              //id="language-select"
              key={department.departmentId}
              onClick={(e) => handleDepSelection(e)}
              value={[department.departmentId, department.departmentName]}
              style={{ direction: language === "ar" ? "rtl" : "ltr" }}
            >
              {depsTrns[language][department.departmentName] ||
                department.departmentName}
            </button>
          ))}
        </div>
      ) : (
        ""
      )}
      <div className="btns login-btn-container">
        <button className="btn btn-primary back-btn" onClick={reset}>
          {language === "en" ? "Go Back Home" : "العودة للصفحة الرئيسية"}
        </button>
        <button className="btn btn-primary back-btn" onClick={onBack}>
          {language === "en" ? "Back" : "رجوع"}
        </button>
      </div>
    </div>
  );
}

export default DepartmentComponent;
