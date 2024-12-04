import "./FullComponent.css";
import DateComponent from "../DateComponent/DateComponent";
import Header from "../Header/Header";
import ButtonsComponent from "../ButtonsComponent/ButtonsComponent";
import { useState } from "react";
import WelcomeComponent from "../WelcomeComponent/WelcomeComponent";
import TransactionsComponent from "../TransactionsComponent/TransactionsComponent";
import DepartmentComponent from "../DepartmentComponent/DepartmentComponent";
import EmployeeList from "../EmployeeList/EmployeeList";
import LocationChecker from "../LocationComponent/LocationComponent";

function FullComponent({
  userLocation,
  setUserLocation,
  isWithinRadius,
  setIsWithinRadius,
}) {
  const [language, setLanguage] = useState("en");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [deparment, setDepartment] = useState(null);
  const [employee, setEmployee] = useState(null);
  console.log(userLocation, isWithinRadius);

  const depsTrns = {
    en: {
      Abc: "Abc",
      "Kitchen Management": "Kitchen Management",
      "Office Boys ": "Office Boys ",
      "Kitchen Steward": "Kitchen Steward",
      Driver: "Driver",
      "Catering Team": "Catering Team",
      Maintenance: "Maintenance",
      Sales: "Sales",
      Consultations: "Consultations",
      "Head Office Management": "Head Office Management",
      Owners999: "Owners999",
      Finance: "Finance",
      Marketing: "Marketing",
      Store: "Store",
      Purchasing: "Purchasing",
      "Private jet": "Private jet",
      Development: "Development",
      Abdo: "Abdo",
      Teaching: "Teaching",
      test66: "test66",
      123: "123",
      "Any Name": "Any Name",
      1234: "1234",
      "New Department": "New Department",
      Sameh: "Sameh",
      Same: "Same",
      string: "string",
      MrSameh: "MrSameh",
      "Office Boys1": "Office Boys1",
      ahmed: "ahmed",
      NewDEP: "NewDEP",
    },
    ar: {
      Abc: "ابك",
      "Kitchen Management": "إدارة المطابخ",
      "Office Boys ": "عاملون بالمكاتب",
      "Kitchen Steward": "إشراف المطبخ",
      Driver: "سائق",
      "Catering Team": "فريق التموين",
      Maintenance: "الصيانة",
      Sales: "المبيعات",
      Consultations: "الاستشارات",
      "Head Office Management": "إدارة المكتب الرئيسي",
      Owners999: "المالكون999",
      Finance: "المالية",
      Marketing: "التسويق",
      Store: "المخزن",
      Purchasing: "المشتريات",
      "Private jet": "طائرة خاصة",
      Development: "التطوير",
      Abdo: "عبدو",
      Teaching: "التعليم",
      test66: "اختبار66",
      123: "١٢٣",
      "Any Name": "أي اسم",
      1234: "١٢٣٤",
      "New Department": "قسم جديد",
      Sameh: "سامح",
      Same: "نفس",
      string: "نص",
      MrSameh: "السيد سامح",
      "Office Boys1": "عاملون بالمكاتب١",
      ahmed: "أحمد",
      NewDEP: "قسم جديد",
    },
  };

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
      {userLocation && isWithinRadius ? (
        employee ? (
          <ButtonsComponent
            selectedTransaction={selectedTransaction}
            employee={employee}
            language={language}
            reset={reset}
            depsTrns={depsTrns}
          />
        ) : deparment ? (
          <EmployeeList
            setEmployee={setEmployee}
            language={language}
            department={deparment}
            reset={reset}
            transaction={selectedTransaction}
          />
        ) : !selectedTransaction ? (
          <TransactionsComponent
            setSelectedTransaction={setSelectedTransaction}
            language={language}
            depsTrns={depsTrns}
          />
        ) : (
          <DepartmentComponent
            language={language}
            setDeratment={setDepartment}
            reset={reset}
            depsTrns={depsTrns}
          />
        )
      ) : (
        <LocationChecker
          setUserLocation={setUserLocation}
          language={language}
          userLocation={userLocation}
          setIsWithinRadius={setIsWithinRadius}
          isWithinRadius={isWithinRadius}
        />
      )}
    </div>
  );
}

export default FullComponent;
