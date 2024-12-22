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
import { calculateGrade } from "./helpers/gradesHelper";
import pdfMake from "pdfmake/build/pdfmake";

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

    console.log("1. Starting PDF export");

    // Initialize PDFMake with fonts
    // pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const createTable = (headers, body) => ({
      table: {
        headerRows: 1,
        widths: Array(headers.length).fill("*"),
        body: [headers, ...body],
      },
      layout: {
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => "#ddd",
        vLineColor: () => "#ddd",
      },
      margin: [0, 5, 0, 15],
    });

    // Create Local SEO table data
    const localSEOTable = results.googleBusinessProfile
      ? [
          ["Metric", "Status"],
          [
            "Google Business Profile",
            results.googleBusinessProfile.exists
              ? "✅ Business has a profile"
              : "❌ No profile found",
          ],
          [
            "Profile URL",
            results.googleBusinessProfile.profileUrl
              ? results.googleBusinessProfile.profileUrl
              : "Not available",
          ],
          [
            "Profile Completeness",
            results.googleBusinessProfile.isComplete
              ? "✅ Complete"
              : `⚠️ Incomplete\n${
                  results.googleBusinessProfile.missingElements?.join("\n") ||
                  ""
                }`,
          ],
        ]
      : [];

    const docDefinition = {
      content: [
        // Title
        { text: "SEO Audit Report", style: "header" },
        { text: `Generated for: ${url}`, style: "subheader" },
        { text: "\n" },

        // Description section
        { text: "SEO Analysis", style: "sectionHeader" },
        { text: "Grade Descriptions:", style: "subsectionHeader" },
        {
          ul: [
            "A: Excellent - Meets all SEO best practices",
            "B: Good - Minor improvements needed",
            "C: Fair - Needs significant improvements",
            "F: Poor - Does not meet SEO standards",
          ],
        },
        { text: "\n" },
        { text: "SEO Categories Explained:", style: "subsectionHeader" },
        {
          ul: [
            "Title Tags: The HTML element that specifies the title of a web page. It's important for SEO and user experience.",
            "Meta Descriptions: A brief summary of a web page's content. It appears in search results and can influence click-through rates.",
            "Headings: HTML tags (H1, H2, etc.) used to define the headings of a page. They help structure content and are important for SEO.",
            "Page Load Speed: The time it takes for a web page to load. Faster load times improve user experience and SEO rankings.",
            "Duplicate Content: Content that appears on more than one web page. It can confuse search engines and affect SEO.",
            "Images without Alt: Images on a page that lack alternative text. Alt text is important for accessibility and SEO.",
            "Canonical Tag: An HTML element that helps prevent duplicate content issues by specifying the preferred version of a web page.",
          ],
        },
        // { text: "\n", pageBreak: "after" },

        // Local SEO section
        { text: "Local SEO Analysis", style: "sectionHeader" },
        createTable(["Metric", "Status"], localSEOTable.slice(1)),
        // { text: "\n", pageBreak: "after" },

        // Results for each page
        ...results.seoResults.flatMap((result) => [
          {
            text: `Page Analysis: ${result.url}`,
            style: "sectionHeader",
            pageBreak: "before",
          },

          // OnPage SEO Table
          { text: "On-Page SEO Analysis", style: "subsectionHeader" },
          createTable(
            ["Category", "Status"],
            [
              ["Title Tags", `${calculateGrade(result).title}`],
              [
                "Meta Descriptions",
                `${calculateGrade(result).metaDescription}`,
              ],
              ["Headings", `${calculateGrade(result).headings}`],
              ["Page Load Speed", `${calculateGrade(result).pageLoadSpeed}`],
              ["Internal Page Links", `${result.internalPageLinksCount}`],
              ["Internal Section Links", `${result.internalSectionLinksCount}`],
              [
                "Duplicate Content",
                `${result.isContentDuplicate ? "Yes" : "No"}`,
              ],
              ["Images without Alt", `${result.imagesWithoutAlt}`],
              [
                "Canonical Tag",
                `${result.canonicalLink} (${
                  result.isCanonicalCorrect ? "Correct" : "Incorrect"
                })`,
              ],
              ["Lang Attribute", `${result.hasLangAttribute ? "Yes" : "No"}`],
              ["SSL Enabled", `${result.isSSLEnabled ? "Yes" : "No"}`],
              ["Robots.txt", `${result.hasRobotsTxt ? "Yes" : "No"}`],
              [
                "Google Analytics",
                `${result.hasGoogleAnalytics ? "Yes" : "No"}`,
              ],
              ["Word Count", `${result.wordCount}`],
              ["Word Count Grade", `${result.wordCountGrade}`],
            ]
          ),
          { text: "\n" },

          // Social Links table
          { text: "Social Media Links", style: "subsectionHeader" },
          createTable(
            ["Platform", "Link"],
            Object.entries(result.socialLinks || {}).map(([platform, link]) => [
              platform.charAt(0).toUpperCase() + platform.slice(1),
              link,
            ])
          ),

          // Links Analysis table
          { text: "Links Analysis", style: "subsectionHeader" },
          createTable(
            ["Type", "Count", "Links"],
            [
              [
                "Internal Page Links",
                result.internalPageLinksCount,
                result.internalPageLinks.join("\n"),
              ],
              [
                "Internal Section Links",
                result.internalSectionLinksCount,
                result.internalSectionLinks.join("\n"),
              ],
              [
                "Broken Links",
                result.brokenLinks.length,
                result.brokenLinks.length > 0
                  ? result.brokenLinks.join("\n")
                  : "No broken links found.",
              ],
            ],
            { text: "\n", pageBreak: "after" }
          ),

          // Performance table
          { text: "Performance Metrics", style: "subsectionHeader" },
          createTable(
            ["Metric", "Status"],
            [
              ["HTTP/2 Support", result.isHttp2Supported ? "Yes" : "No"],
              ...(result.cssNeedsMinification && result.jsNeedsMinification
                ? [
                    [
                      "CSS Needs Minification",
                      result.cssNeedsMinification ? "Yes" : "No",
                    ],
                    [
                      "JS Needs Minification",
                      result.jsNeedsMinification ? "Yes" : "No",
                    ],
                  ]
                : []),
              ["Inline Styles Count", result.inlineStylesCount.toString()],
              [
                "Deprecated HTML Tags",
                result.deprecatedTagsFound?.join(", ") || "None",
              ],
              ["Page Load Speed", result.loadTimeFeedback],
            ]
          ),
          { text: "\n" },
        ]),
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 5],
        },
        sectionHeader: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        subsectionHeader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
      },
      defaultStyle: {
        fontSize: 10,
        lineHeight: 1.2,
      },
    };

    try {
      console.log("2. Generating PDF...");
      pdfMake.createPdf(docDefinition).download("seo_audit_report.pdf");
      console.log("3. PDF generated successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };
  console.log("results", results);
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
