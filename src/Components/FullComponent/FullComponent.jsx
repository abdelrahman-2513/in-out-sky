import "./FullComponent.css";
import DateComponent from "../DateComponent/DateComponent";
import Header from "../Header/Header";
import ButtonsComponent from "../ButtonsComponent/ButtonsComponent";
import { useState } from "react";
import WelcomeComponent from "../WelcomeComponent/WelcomeComponent";

function FullComponent() {
  const [language, setLanguage] = useState("en");

  const direction = language === "ar" ? "rtl" : "ltr";
  return (
    <div className="main-container" style={{ direction }}>
      <Header language={language} setLanguage={setLanguage} />
      <DateComponent language={language} />
      {/* <WelcomeComponent language={language} /> */}
      <ButtonsComponent language={language} />
    </div>
  );
}

export default FullComponent;
