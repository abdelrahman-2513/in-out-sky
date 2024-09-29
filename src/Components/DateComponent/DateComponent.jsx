import "./DateComponent.css";
function DateComponent() {
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    Date.now()
  );
  return <div className="date-header">{weekday}</div>;
}

export default DateComponent;
