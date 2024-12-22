import React, { useState, useEffect } from 'react';

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem('cookie_consent');
    if (!consentGiven) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (consent) => {
    if (consent) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'consent_update',
        analytics_storage: 'granted',
        ad_storage: 'granted'
      });
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'consent_update',
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }

    localStorage.setItem('cookie_consent', consent ? 'granted' : 'denied');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={bannerStyle}>
      <p>This website uses cookies to measure useful analytics. Do you accept?</p>
      <button onClick={() => handleConsent(true)}>Accept</button>
      <button onClick={() => handleConsent(false)}>Decline</button>
    </div>
  );
};

const bannerStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#000',
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
  border: 'none',
};

export default CookieConsentBanner;
