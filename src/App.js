import React, { useState, useEffect } from "react";
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
import { LocalSEO } from "./Sections/LocalSEO";
import { tagBackgroundColors } from "./constatns/tagBackgroundColors";
import { KeywordAnalysis } from "./Sections/KeywordAnalysis";
import { TitleAnalysis } from "./Sections/TitleAnalysis";
import { API_URL } from "./config";
import { exportToPDF } from "./helpers/exportToPdfHelper";

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
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    if (results?.seoResults?.length > 0) {
      setSelectedUrl(results.seoResults[0].url);
    }
  }, [results]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Ensure the URL starts with 'https://www'
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith("https://www.")) {
      formattedUrl = `https://www.${formattedUrl.replace(
        /^(https?:\/\/)?(www\.)?/,
        ""
      )}`;
    }

    try {
      const response = await axios.post(`${API_URL}/crawl`, {
        url: formattedUrl,
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

  const handleUrlChange = (event) => {
    setSelectedUrl(event.target.value);
  };

  const selectedPageData = selectedUrl
    ? results?.seoResults.find((result) => result.url === selectedUrl)
    : null;

  return (
    <div className="App">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>
            Loading... Please wait while we analyze your SEO data. This
            operation might take more than a minute.
          </p>
        </div>
      )}
      <header className="dashboard-header">
        <h1>YupSEO Auditor</h1>
        {results && (
          <div className="header-controls">
            <div className="url-selector">
              <select value={selectedUrl} onChange={handleUrlChange}>
                {results.seoResults.map((result, index) => (
                  <option key={index} value={result.url}>
                    {result.url}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="export-button"
              onClick={() => exportToPDF(results, url)}
            >
              Export to PDF
            </button>
          </div>
        )}
      </header>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>
            Loading... Please wait while we analyze your SEO data. This
            operation might take more than a minute.
          </p>
        </div>
      )}
      {results && (
        <div className="dashboard">
          <div className="dashboard-grid">
            {/* Left container */}
            <div className="dashboard-left">
              <div className="dashboard-card large-card">
                <h2>On-Page SEO</h2>
                {selectedPageData && <OnPageSEO result={selectedPageData} />}
              </div>
            </div>

            {/* Right container */}
            <div className="dashboard-right">
              <div className="dashboard-card">
                <h2>Title Analysis</h2>
                {selectedPageData && (
                  <TitleAnalysis result={selectedPageData} />
                )}
              </div>

              {/* Keyword Analysis Card */}
              <div className="dashboard-card">
                <h2>Keyword Analysis</h2>
                {selectedPageData && (
                  <KeywordAnalysis result={selectedPageData} />
                )}
              </div>
              <div className="dashboard-card">
                <h2>Performance</h2>
                {selectedPageData && <Performance result={selectedPageData} />}
              </div>

              <div className="dashboard-card">
                <h2>Links</h2>
                {selectedPageData && <Links result={selectedPageData} />}
              </div>

              <div className="dashboard-card">
                <h2>Social Media</h2>
                {selectedPageData && <Socials result={selectedPageData} />}
              </div>

              <div className="dashboard-card">
                <h2>Local SEO</h2>
                {selectedPageData && <LocalSEO results={results} />}
              </div>

              {/* Add other cards as needed */}
            </div>
          </div>
        </div>
      )}

      {/* Keep your existing form for initial URL input */}
      {!results && (
        <div className="initial-form">
          <div className="form-container">
            <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="url-input">Website URL:</label>
                <input
                  id="url-input"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter website URL (https://www.example.com)"
                  required
                />
              </div>

              <div>
                <label htmlFor="depth-input">Crawl Depth:</label>
                <input
                  id="depth-input"
                  type="number"
                  value={maxDepth}
                  onChange={(e) => setMaxDepth(parseInt(e.target.value))}
                  min="1"
                  max="5"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company-name-input">Company Name:</label>
                  <input
                    id="company-name-input"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location-input">Location:</label>
                  <input
                    id="location-input"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location (optional)"
                  />
                </div>
              </div>

              <div>
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
                      <button onClick={() => handleKeywordRemove(index)}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit">Audit</button>
            </form>
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
        </div>
      )}
    </div>
  );
}

export default App;
