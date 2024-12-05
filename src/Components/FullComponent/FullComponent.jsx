import "./FullComponent.css";
import DateComponent from "../DateComponent/DateComponent";
import Header from "../Header/Header";
import ButtonsComponent from "../ButtonsComponent/ButtonsComponent";
import { useEffect, useState } from "react";
import WelcomeComponent from "../WelcomeComponent/WelcomeComponent";
import TransactionsComponent from "../TransactionsComponent/TransactionsComponent";
import DepartmentComponent from "../DepartmentComponent/DepartmentComponent";
import EmployeeList from "../EmployeeList/EmployeeList";
import LocationChecker from "../LocationComponent/LocationComponent";
import { getJobsList } from "../../assets/API";

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

  const jobsTrns = {
    en: {
      ddddddda: "ddddddda",
      "Accounting Manager": "Accounting Manager",
      Accountant: "Accountant",
      "Sou Chef": "Sou Chef",
      "Chef Gard manager": "Chef Gard manager",
      "Chef Hot 6666": "Chef Hot 6666",
      "Chef Bakery": "Chef Bakery",
      "Office Boy": "Office Boy",
      "Chef Steward": "Chef Steward",
      Steward: "Steward",
      Driver: "Driver",
      Catering: "Catering",
      Sales: "Sales",
      Purchasing: "Purchasing",
      "Commis Chef": "Commis Chef",
      "Chef Pastry": "Chef Pastry",
      "Executive Chef": "Executive Chef",
      Beverage: "Beverage",
      Maintenance: "Maintenance",
      Licensing: "Licensing",
      Consultant: "Consultant",
      "Main Store keeper": "Main Store keeper",
      Trainer: "Trainer",
      "Oriental Chef": "Oriental Chef",
      "Any Name": "Any Name",
      Chef: "Chef",
      Owner: "Owner",
      "General Manager": "General Manager",
      "Graphics designer": "Graphics designer",
      "Digital Marketing": "Digital Marketing",
      "Quality Controle": "Quality Controle",
      Programmer: "Programmer",
      "Sales Manager": "Sales Manager",
      "Kitchen Store keeper": "Kitchen Store keeper",
      "Purchasing Manager": "Purchasing Manager",
      "executive flight manager1": "executive flight manager1",
      Dentist: "Dentist",
      Doctor: "Doctor",
      Teacher: "Teacher",
      "Any thing": "Any thing",
      "New Job": "New Job",
      abc: "abc",
      dddddddaaaa: "dddddddaaaa",

      NewJob: "NewJob",
    },
    ar: {
      ddddddda: "ddddddda",
      "Accounting Manager": "مدير الحسابات",
      Accountant: "محاسب",
      "Sou Chef": "شيف سوس",
      "Chef Gard manager": "مدير حديقة الطباخ",
      "Chef Hot 6666": "شيف هوت 6666",
      "Chef Bakery": "شيف مخبز",
      "Office Boy": "فتى المكتب",
      "Chef Steward": "شيف ستيوارد",
      Steward: "ستيوارد",
      Driver: "سائق",
      Catering: "تموين",
      Sales: "مبيعات",
      Purchasing: "شراء",
      "Commis Chef": "شيف كوميس",
      "Chef Pastry": "شيف معجنات",
      "Executive Chef": "شيف تنفيذي",
      Beverage: "مشروبات",
      Maintenance: "صيانة",
      Licensing: "ترخيص",
      Consultant: "استشاري",
      "Main Store keeper": "أمين المخزن الرئيسي",
      Trainer: "مدرب",
      "Oriental Chef": "شيف شرقي",
      "Any Name": "أي اسم",
      Chef: "شيف",
      Owner: "مالك",
      "General Manager": "مدير عام",
      "Graphics designer": "مصمم جرافيك",
      "Digital Marketing": "التسويق الرقمي",
      "Quality Controle": "مراقبة الجودة",
      Programmer: "مطور برمجيات",
      "Sales Manager": "مدير المبيعات",
      "Kitchen Store keeper": "أمين مخزن المطبخ",
      "Purchasing Manager": "مدير المشتريات",
      "executive flight manager1": "مدير الرحلات التنفيذي 1",
      Dentist: "طبيب أسنان",
      Doctor: "طبيب",
      Teacher: "مدرس",
      "Any thing": "أي شيء",
      "New Job": "وظيفة جديدة",
      abc: "أبجد",
      dddddddaaaa: "dddddddaaaa",
      NewJob: "وظيفة جديدة",
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
            jobsTrns={jobsTrns}
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
