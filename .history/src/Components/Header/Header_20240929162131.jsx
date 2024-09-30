import React, { useState, useEffect } from "react";
import "./Header.css";

function Header({ language, setLanguage }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };
  const locale = language === "ar" ? "ar-SA" : "en-US";
  return (
    <div className="header">
      <div className="header-img">
        <img src="/images/logo.png" alt="Skyculinaire-logo" className="logo" />
      </div>

      <div className="header-date">{currentTime.toLocaleString()}</div>
      <div className="language-selector">
        <label htmlFor="language-select">
          {language === "en" ? "Language:" : "اللغة:"}
        </label>
        <select
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </div>
    </div>
  );
}

export default Header;
