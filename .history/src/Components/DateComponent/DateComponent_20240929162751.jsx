import "./DateComponent.css";
function DateComponent({ language }) {
  const local = language === "ar" ? "ar-EG" : "en-US";
  const weekday = new Intl.DateTimeFormat(local, { weekday: "long" }).format(
    Date.now()
  );
  return <div className="date-header">{weekday}</div>;
}

export default DateComponent;
