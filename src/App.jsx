import { useState } from "react";
import "./App.css";

import FullComponent from "./Components/FullComponent/FullComponent";
import LocationChecker from "./Components/LocationComponent/LocationComponent";

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [isWithinRadius, setIsWithinRadius] = useState(false);

  return (
    <div>
      <FullComponent
        userLocation={userLocation}
        setUserLocation={setUserLocation}
        isWithinRadius={isWithinRadius}
        setIsWithinRadius={setIsWithinRadius}
      />
    </div>
  );
}

export default App;
