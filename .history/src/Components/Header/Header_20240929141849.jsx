import React, { useState, useEffect } from "react";
import "./Header.css";

function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return (
    <div className="header">
      <div className="header-img">
        <img src="/images/logo.png" alt="Skyculinaire-logo" className="logo" />
      </div>

      <div className="header-date">
        {currentTime.toLocaleString()} {/* Displays the date and time */}
      </div>
    </div>
  );
}

export default Header;
