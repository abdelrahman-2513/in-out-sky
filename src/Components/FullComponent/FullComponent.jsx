import "./FullComponent.css";
import DateComponent from "../DateComponent/DateComponent";
import Header from "../Header/Header";
import ButtonsComponent from "../ButtonsComponent/ButtonsComponent";
import { useState } from "react";
import WelcomeComponent from "../WelcomeComponent/WelcomeComponent";
import TransactionsComponent from "../TransactionsComponent/TransactionsComponent";
import DepartmentComponent from "../DepartmentComponent/DepartmentComponent";
import EmployeeList from "../EmployeeList/EmployeeList";

function FullComponent() {
  const [language, setLanguage] = useState("en");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [deparment, setDepartment] = useState(null);
  const [employee, setEmployee] = useState(null);

  function reset() {
    setEmployee(null);
    setDepartment(null);
    setSelectedTransaction(null);
  }
  const direction = language === "ar" ? "rtl" : "ltr";
  return (
    <div className="main-container" style={{ direction }}>
      <Header reset={reset} language={language} setLanguage={setLanguage} />
      <DateComponent language={language} />
      {/* <WelcomeComponent language={language} /> */}
      {employee ? (
        <ButtonsComponent
          selectedTransaction={selectedTransaction}
          employee={employee}
          language={language}
          reset={reset}
        />
      ) : deparment ? (
        <EmployeeList
          setEmployee={setEmployee}
          language={language}
          department={deparment}
          reset={reset}
        />
      ) : !selectedTransaction ? (
        <TransactionsComponent
          setSelectedTransaction={setSelectedTransaction}
          language={language}
        />
      ) : (
        <DepartmentComponent
          language={language}
          setDeratment={setDepartment}
          reset={reset}
        />
      )}
    </div>
  );
}

export default FullComponent;
