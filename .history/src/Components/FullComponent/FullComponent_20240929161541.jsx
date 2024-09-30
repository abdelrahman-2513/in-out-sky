import "./FullComponent.css";
import DateComponent from "../DateComponent/DateComponent";
import Header from "../Header/Header";
import ButtonsComponent from "../ButtonsComponent/ButtonsComponent";

function FullComponent() {
  // State to manage the current language ('en' or 'ar')
  const [language, setLanguage] = useState("en");

  const direction = language === "ar" ? "rtl" : "ltr";
  return (
    <div className="main-container" style={{ direction }}>
      <Header />
      <DateComponent />
      <ButtonsComponent />
    </div>
  );
}

export default FullComponent;
