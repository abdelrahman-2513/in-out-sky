import React, { useState, useEffect } from "react";
import "./Header.css";

function Header({ language, setLanguage }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  // Define locale based on selected language
  const locale = language === "ar" ? "ar-EG" : "en-US";

  // Define options for date and time formatting
  const options = {
    weekday: "long", // e.g., "Sunday"
    year: "numeric",
    month: "long", // e.g., "September"
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: language === "en" ? true : false, // 12-hour for English, 24-hour for Arabic
  };

  // Format the current time based on locale and options
  const formattedDateTime = new Intl.DateTimeFormat(locale, options).format(
    currentTime
  );

  // Set text direction based on language
  const direction = language === "ar" ? "rtl" : "ltr";

  return (
    <header className="header" style={{ direction }}>
      {/* Logo Section */}
      <div className="header-img">
        <img src="/images/logo.png" alt="Skyculinaire-logo" className="logo" />
      </div>

      {/* Date and Time Display */}
      <div className="header-date-time">{formattedDateTime}</div>

      {/* Language Selector */}
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
