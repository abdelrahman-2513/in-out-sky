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

  const locale = language === "ar" ? "ar-EG" : "en-US";

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formattedDateTime = new Intl.DateTimeFormat(locale, options).format(
    currentTime
  );

  const direction = language === "ar" ? "rtl" : "ltr";

  return (
    <header className="header" style={{ direction }}>
      {/* Logo Section */}
      <div className="header-img">
        <img src="/images/logo.png" alt="Skyculinaire-logo" className="logo" />
      </div>

      <div className="header-date-time" style={{ direction }}>
        {formattedDateTime}
      </div>

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
    </header>
  );
}

export default Header;