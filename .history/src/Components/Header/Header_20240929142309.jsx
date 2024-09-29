import React, { useState, useEffect } from "react";
import "./Header.css";

function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    currentTime
  );
  return (
    <div className="header">
      <div className="header-img">
        <img src="/images/logo.png" alt="Skyculinaire-logo" className="logo" />
      </div>

      <div className="header-date">
        {weekday},{currentTime.toLocaleString()}
      </div>
    </div>
  );
}

export default Header;
