import React, { useEffect, useState } from "react";
import FullComponent from "../FullComponent/FullComponent";

const trns = {
  en: {
    locationError: "Please Allow the location permission.",
    locationAway:
      " You are not allowed to clock in/out right now, Please try again within the permitted area.",
    caution:
      "Note that you won't be able to clock in/out if you denied the location permission.",
  },
  ar: {
    locationError: "يرجى السماح بالموقع.",
    locationAway:
      "ليس لديك الصلاحيةلتسجيل دخول/خروج حاليا، يرجى المحاولة في المنطقة المسموح بها.",
    caution:
      "ملاحظة: لن تتمكن من تسجيل دخول/خروج إذا قمت بإلغاء السماح بالموقع.",
  },
};

const LocationChecker = ({
  setUserLocation,
  userLocation,
  language,
  setIsWithinRadius,
  isWithinRadius,
}) => {
  const [errorMessage, setErrorMessage] = useState(
    trns[language].locationError
  );

  const targetLocation = { latitude: 30.0975342, longitude: 31.357011 };
  // Haversine formula to calculate distance in km
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const checkLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;

          setUserLocation({ latitude: userLat, longitude: userLon });

          const distance = calculateDistance(
            userLat,
            userLon,
            targetLocation.latitude,
            targetLocation.longitude
          );

          console.log({
            distanceInKm: distance,
            isWithinRadius: distance <= 1,
            userLat,
            userLon,
            targetLat: targetLocation.latitude,
            targetLon: targetLocation.longitude,
          });
          //0.05
          setIsWithinRadius(Boolean(distance <= 1)); // Set radius condition
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setErrorMessage(
                "Location access denied. Please enable location permissions in your browser settings."
              );
              break;
            case error.POSITION_UNAVAILABLE:
              setErrorMessage(
                "Location information is unavailable. Try again later."
              );
              break;
            case error.TIMEOUT:
              setErrorMessage("Location request timed out. Please try again.");
              break;
            default:
              setErrorMessage("An unknown error occurred. Please try again.");
          }
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {
    checkLocation();
  }, []);

  return (
    <>
      {!userLocation && (
        <>
          <div
            className="secondary-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
              width: "650px",
            }}
          >
            <div className="message">
              {language === "en"
                ? "Location not allowed"
                : "الموقع غير مسموح به"}
            </div>
            {errorMessage && (
              <p
                style={{
                  textAlign: "center",
                  textWrap: "balance",
                  maxWidth: "450px",
                }}
              >
                {errorMessage}
              </p>
            )}
            <button className="btn" onClick={checkLocation}>
              {language === "en" ? "Try again" : "حاول مرة اخرى"}
            </button>
          </div>
          <div
            className="secondary-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
              width: "650px",
            }}
          >
            {trns[language].caution}
          </div>
        </>
      )}
      {userLocation && !isWithinRadius && (
        <div
          className="secondary-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          <div className="message">
            {language === "en" ? "Away from location" : "خارج الموقع المسموح"}
          </div>
          {errorMessage && (
            <p
              style={{
                textAlign: "center",
                textWrap: "balance",
                maxWidth: "450px",
              }}
            >
              {trns[language].locationAway}
            </p>
          )}
          <button className="btn" onClick={checkLocation}>
            Try Again
          </button>
        </div>
      )}
    </>
  );
};

export default LocationChecker;
