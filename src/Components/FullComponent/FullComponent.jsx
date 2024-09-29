import "./FullComponent.css";
import DateComponent from "../DateComponent/DateComponent";
import Header from "../Header/Header";
import ButtonsComponent from "../ButtonsComponent/ButtonsComponent";

function FullComponent() {
  return (
    <div className="main-container">
      <Header />
      <DateComponent />
      <ButtonsComponent />
    </div>
  );
}

export default FullComponent;
