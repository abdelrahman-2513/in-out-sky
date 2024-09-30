import "./FullComponent.css";
import DateComponent from "../DateComponent/DateComponent";
import Header from "../Header/Header";
import ButtonsComponent from "../ButtonsComponent/ButtonsComponent";

function FullComponent() {
  // State to manage the current language ('en' or 'ar')
  const [language, setLanguage] = useState("en");
  return (
    <div className="main-container">
      <Header />
      <DateComponent />
      <ButtonsComponent />
    </div>
  );
}

export default FullComponent;
