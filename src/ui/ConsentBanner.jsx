import React, { useState, useEffect } from "react";

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem("cookie_consent");
    if (!consentGiven) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (consent) => {
    if (consent) {
      gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
    } else {
      gtag("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });
    }

    localStorage.setItem("cookie_consent", consent ? "granted" : "denied");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={bannerStyle}>
      <p>
        This website uses cookies to measure useful analytics. Do you accept?
      </p>
      <button onClick={() => handleConsent(true)}>Accept</button>
      <button onClick={() => handleConsent(false)}>Decline</button>
    </div>
  );
};

const bannerStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "#000",
  color: "#fff",
  textAlign: "center",
  padding: "10px",
  border: "none",
};

export default CookieConsentBanner;
