import { useState, useEffect } from "react";
import { seoFacts } from "../constatns/seoFacts";

export const Spinner = () => {
  const [fact, setFact] = useState("");

  useEffect(() => {
    // Initial random fact
    const getRandomFact = () => {
      const randomIndex = Math.floor(Math.random() * seoFacts.length);
      setFact(seoFacts[randomIndex]);
    };

    // Set initial fact
    getRandomFact();

    // Set up interval to change fact every 10 seconds
    const intervalId = setInterval(() => {
      getRandomFact();
    }, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <div className="loading-content">
        <p className="loading-message">
          Loading... Please wait while we analyze your SEO data. This operation
          might take more than a minute.
        </p>
        <p className="seo-fact">
          <strong>Did you know? </strong>
          {fact}
        </p>
      </div>
    </div>
  );
};
