import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { OnPageSEO } from "./Sections/OnPageSEO";
import { Socials } from "./Sections/Socials";
import { Links } from "./Sections/Links";
import { Performance } from "./Sections/Performance";
import { DescriptionHardCodedText } from "./constatns/DescriptionHardCodedText";
import { LocalSEO } from "./Sections/LocalSEO";
import { tagBackgroundColors } from "./constatns/tagBackgroundColors";
// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [url, setUrl] = useState("");
  const [maxDepth, setMaxDepth] = useState(2);
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [location, setLocation] = useState("");
  const [results, setResults] = useState(null);
  const [availableColors, setAvailableColors] = useState([
    ...tagBackgroundColors,
  ]);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingSubmitEvent, setPendingSubmitEvent] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/crawl", {
        url,
        maxDepth,
        keywords: keywords.map((k) => k.text),
        location,
      });
      setResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching SEO data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeywordInput = (e) => {
    setKeywordInput(e.target.value);
  };

  const handleKeywordAdd = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (keywordInput.trim()) {
        // If there is input, add the keyword
        if (keywords.length < 20) {
          const randomIndex = Math.floor(
            Math.random() * availableColors.length
          );
          const randomColor = availableColors[randomIndex];
          setKeywords([
            ...keywords,
            { text: keywordInput.trim(), color: randomColor },
          ]);
          setKeywordInput("");
          setAvailableColors(
            availableColors.filter((_, i) => i !== randomIndex)
          );
        }
      } else {
        setShowConfirmModal(true);
        setPendingSubmitEvent(e);
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
    setPendingSubmitEvent(e);
  };

  const handleConfirmAudit = () => {
    if (pendingSubmitEvent) {
      handleSubmit(pendingSubmitEvent);
    }
    setShowConfirmModal(false);
    setPendingSubmitEvent(null);
  };

  const handleKeywordRemove = (index) => {
    const removedKeyword = keywords[index];
    setKeywords(keywords.filter((_, i) => i !== index));
    setAvailableColors([...availableColors, removedKeyword.color]);
  };

  const exportToPDF = async () => {
    if (!results) return;

    try {
      const response = await axios.post(
        "http://localhost:5001/pdf/export",
        {
          seoResults: results.seoResults,
        },
        {
          responseType: "blob", // Important for handling binary data
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "seo_audit_report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting to PDF:", error);
    }
  };

  return (
    <div className="App">
      {results && <button onClick={exportToPDF}>Export to PDF</button>}
      <div id="pdf-content" style={{ padding: "20px" }}>
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>
              Loading... Please wait while we analyze your SEO data. This
              operation might take more than a minute.
            </p>
          </div>
        )}
        <header className="App-header">
          <h1>YupSEO Auditor</h1>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="url-input">Website URL:</label>
            <input
              id="url-input"
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <label htmlFor="location-input">Business Location:</label>
            <input
              id="location-input"
              type="text"
              placeholder="Enter business location (optional)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <label htmlFor="depth-input">Crawl Depth:</label>
            <input
              id="depth-input"
              type="number"
              placeholder="Max Depth"
              value={maxDepth}
              onChange={(e) => setMaxDepth(e.target.value)}
              min="1"
              required
            />
            <label htmlFor="keywords-input">Keywords:</label>
            <input
              id="keywords-input"
              type="text"
              placeholder="Enter Keywords and press Enter"
              value={keywordInput}
              onChange={handleKeywordInput}
              onKeyDown={handleKeywordAdd}
            />
            <div className="keyword-tags">
              {keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="keyword-tag"
                  style={{ backgroundColor: keyword.color }}
                >
                  <span>{keyword.text}</span>
                  <button onClick={() => handleKeywordRemove(index)}>x</button>
                </div>
              ))}
            </div>
            <button type="submit">Audit</button>
          </form>
          {results && (
            <>
              <DescriptionHardCodedText />
              <LocalSEO results={results} />
              {results.seoResults.map((result, index) => {
                return (
                  <div key={index}>
                    <h1>Page: {result.url}</h1>
                    <OnPageSEO result={result} />
                    <Socials result={result} />
                    <Links result={result} />
                    <Performance result={result} />
                  </div>
                );
              })}
              <footer style={{ marginTop: "20px", textAlign: "center" }}>
                <p>Generated by YupSEO Auditor</p>
              </footer>
            </>
          )}
        </header>
      </div>
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Start Website Audit</h2>
            <p>
              You are about to perform a comprehensive SEO audit on this
              website. This process may take several minutes.
            </p>
            <div className="modal-actions">
              <button
                className="modal-button cancel"
                onClick={() => {
                  setShowConfirmModal(false);
                  setPendingSubmitEvent(null);
                }}
              >
                Cancel
              </button>
              <button
                className="modal-button confirm"
                onClick={handleConfirmAudit}
              >
                Start Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
