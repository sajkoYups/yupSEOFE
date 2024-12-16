import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const lightColors = [
  "#FF6347",
  "#FF4500",
  "#FF69B4",
  "#00BFFF",
  "#008080",
  "#3CB371",
  "#4682B4",
  "#FF8C00",
  "#FF1493",
  "#7B68EE",
  "#DDA0DD",
  "#C71585",
  "#EE82EE",
  "#D2691E",
  "#FA8072",
  "#F08080",
  "#90EE90",
  "#48D1CC",
  "#B0E0E6",
  "#6495ED",
];

function App() {
  const [url, setUrl] = useState("");
  const [maxDepth, setMaxDepth] = useState(2);
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [results, setResults] = useState(null);
  const [availableColors, setAvailableColors] = useState([...lightColors]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/api/crawl", {
        url,
        maxDepth,
        keywords: keywords.map((k) => k.text), // Send only the text of the keywords
      });
      setResults(response.data);
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
      e.preventDefault(); // Prevent form submission

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
        // If input is empty, show confirmation dialog
        if (
          window.confirm(
            "You are about to perform an audit on a website. Click OK if you want to continue."
          )
        ) {
          handleSubmit(e); // Call handleSubmit to proceed with the form submission
        }
      }
    }
  };

  const handleKeywordRemove = (index) => {
    const removedKeyword = keywords[index];
    setKeywords(keywords.filter((_, i) => i !== index));
    setAvailableColors([...availableColors, removedKeyword.color]);
  };

  const calculateGrade = (result) => {
    const grades = {};

    grades.title = result.isTitleUnique ? "A" : "C";
    grades.metaDescription =
      result.metaDescriptionStatus === "Valid"
        ? "A"
        : result.metaDescriptionStatus === "Missing"
        ? "F"
        : "C";
    grades.headings = result.h1Feedback === "Good" ? "A" : "C";
    grades.pageLoadSpeed = result.loadTimeFeedback === "Good" ? "A" : "C";

    return grades;
  };

  const getGradeClass = (grade) => {
    switch (grade) {
      case "A":
        return "grade-a";
      case "B":
        return "grade-b";
      case "C":
      case "F":
        return "grade-c";
      default:
        return "";
    }
  };

  const renderChart = (result) => {
    const data = {
      labels: ["Title", "Meta Description", "Headings", "Page Load Speed"],
      datasets: [
        {
          label: "SEO Grades",
          data: [
            result.isTitleUnique ? 3 : 1,
            result.metaDescriptionStatus === "Valid"
              ? 3
              : result.metaDescriptionStatus === "Missing"
              ? 0
              : 1,
            result.h1Feedback === "Good" ? 3 : 1,
            result.loadTimeFeedback === "Good" ? 3 : 1,
          ],
          backgroundColor: [
            result.isTitleUnique ? "#d4edda" : "#f8d7da",
            result.metaDescriptionStatus === "Valid"
              ? "#d4edda"
              : result.metaDescriptionStatus === "Missing"
              ? "#f8d7da"
              : "#fff3cd",
            result.h1Feedback === "Good" ? "#d4edda" : "#f8d7da",
            result.loadTimeFeedback === "Good" ? "#d4edda" : "#f8d7da",
          ],
        },
      ],
    };

    return <Bar data={data} />;
  };

  const renderKeywordChart = (keywordAnalysis) => {
    const data = {
      labels: keywordAnalysis.map((analysis) => analysis.keyword),
      datasets: [
        {
          label: "In Title",
          data: keywordAnalysis.map((analysis) => analysis.inTitleCount),
          backgroundColor: "#FFB6C1",
        },
        {
          label: "In Headings",
          data: keywordAnalysis.map((analysis) => analysis.inHeadingsCount),
          backgroundColor: "#ADD8E6",
        },
        {
          label: "In Body",
          data: keywordAnalysis.map((analysis) => analysis.inBodyCount),
          backgroundColor: "#98FB98",
        },
      ],
    };

    return <Bar data={data} />;
  };

  const exportToPDF = () => {
    const input = document.getElementById("pdf-content");
    const pageHeight = 297; // A4 page height in mm

    html2canvas(input, { scale: 2, useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190; // Adjusted width for padding
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("download.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
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
          <form onSubmit={handleSubmit}>
            <label htmlFor="url-input">Website URL:</label>
            <input
              id="url-input"
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
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
              <h1>SEO Analysis:</h1>
              <div className="grade-description">
                <p>
                  <strong>Grade Descriptions:</strong>
                  <br />
                  <br />
                  <span className="grade-a">A:</span> Excellent - Meets all SEO
                  best practices.
                  <br />
                  <br />
                  <span className="grade-b">B:</span> Good - Minor improvements
                  needed.
                  <br />
                  <br />
                  <span className="grade-c">C:</span> Fair - Needs significant
                  improvements.
                  <br />
                  <br />
                  <span className="grade-f">F:</span> Poor - Does not meet SEO
                  standards.
                </p>
                <p>
                  <strong>SEO Categories Explained:</strong>
                  <br />
                  <br />
                  <strong>Title Tags:</strong> The HTML element that specifies
                  the title of a web page. It's important for SEO and user
                  experience.
                  <br />
                  <br />
                  <strong>Meta Descriptions:</strong> A brief summary of a web
                  page's content. It appears in search results and can influence
                  click-through rates.
                  <br />
                  <br />
                  <strong>Headings:</strong> HTML tags (H1, H2, etc.) used to
                  define the headings of a page. They help structure content and
                  are important for SEO.
                  <br />
                  <br />
                  <strong>Page Load Speed:</strong> The time it takes for a web
                  page to load. Faster load times improve user experience and
                  SEO rankings.
                  <br />
                  <br />
                  <strong>Duplicate Content:</strong> Content that appears on
                  more than one web page. It can confuse search engines and
                  affect SEO.
                  <br />
                  <br />
                  <strong>Images without Alt:</strong> Images on a page that
                  lack alternative text. Alt text is important for accessibility
                  and SEO.
                  <br />
                  <br />
                  <strong>Canonical Tag:</strong> An HTML element that helps
                  prevent duplicate content issues by specifying the preferred
                  version of a web page.
                </p>
              </div>
              {results.seoResults.map((result, index) => {
                const grades = calculateGrade(result);
                return (
                  <div key={index}>
                    <h3>Page: {result.url}</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th>Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Title Tags</td>
                          <td className={getGradeClass(grades.title)}>
                            {grades.title}
                          </td>
                        </tr>
                        <tr>
                          <td>Meta Descriptions</td>
                          <td className={getGradeClass(grades.metaDescription)}>
                            {grades.metaDescription}
                          </td>
                        </tr>
                        <tr>
                          <td>Headings</td>
                          <td className={getGradeClass(grades.headings)}>
                            {grades.headings}
                          </td>
                        </tr>
                        <tr>
                          <td>Page Load Speed</td>
                          <td className={getGradeClass(grades.pageLoadSpeed)}>
                            {grades.pageLoadSpeed}
                          </td>
                        </tr>
                        <tr>
                          <td>Duplicate Content</td>
                          <td>{result.isContentDuplicate ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                          <td>Images without Alt</td>
                          <td>{result.imagesWithoutAlt}</td>
                        </tr>
                        <tr>
                          <td>Canonical Tag</td>
                          <td>
                            {result.canonicalLink} (
                            {result.isCanonicalCorrect
                              ? "Correct"
                              : "Incorrect"}
                            )
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {renderChart(result)}
                    <div>
                      <h4>Keyword Analysis:</h4>
                      <p>
                        There isn't a strict SEO norm or rule about the exact
                        number of times a keyword should appear on a webpage.
                        However, there are some best practices and guidelines to
                        consider:
                      </p>
                      <ul>
                        <li>
                          <strong>Keyword Density:</strong> This refers to the
                          percentage of times a keyword appears on a page
                          compared to the total number of words. While there is
                          no ideal percentage, a keyword density of 1-2% is
                          often recommended. Overusing keywords (known as
                          "keyword stuffing") can lead to penalties from search
                          engines.
                        </li>
                        <li>
                          <strong>Natural Language:</strong> Keywords should be
                          integrated naturally into the content. The focus
                          should be on providing valuable and relevant
                          information to the reader rather than forcing keywords
                          into the text.
                        </li>
                        <li>
                          <strong>Placement:</strong> Keywords should be
                          strategically placed in important areas such as:
                          <ul>
                            <li>Title tags</li>
                            <li>Meta descriptions</li>
                            <li>Headings (H1, H2, etc.)</li>
                            <li>The first 100 words of the content</li>
                            <li>Alt text for images</li>
                            <li>URL slugs</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Semantic Keywords:</strong> Use related terms
                          and synonyms to provide context and depth to the
                          content. This helps search engines understand the
                          topic better and can improve rankings.
                        </li>
                        <li>
                          <strong>User Experience:</strong> Ultimately, the
                          content should be written for users, not search
                          engines. Ensuring a good user experience with
                          high-quality, informative content is more important
                          than focusing solely on keyword frequency.
                        </li>
                        <li>
                          <strong>Content Length:</strong> Longer content
                          naturally allows for more keyword usage without
                          appearing spammy. However, the content should be as
                          long as necessary to cover the topic comprehensively.
                        </li>
                      </ul>
                      <p>
                        It's important to remember that search engines like
                        Google use complex algorithms that consider many factors
                        beyond keyword usage, such as page load speed,
                        mobile-friendliness, backlinks, and user engagement
                        metrics. Therefore, a holistic approach to SEO is
                        recommended.
                      </p>
                      <p>Here is your analysis on the keywords:</p>
                      {renderKeywordChart(result.keywordAnalysis)}
                    </div>
                    <div>
                      <h4>Broken Links:</h4>
                      <div
                        className={
                          result.brokenLinks.length > 0
                            ? "broken-links-bad"
                            : "broken-links-good"
                        }
                      >
                        {result.brokenLinks.length > 0 ? (
                          <ul>
                            {result.brokenLinks.map((link, i) => (
                              <li key={i}>{link}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No broken links found.</p>
                        )}
                      </div>
                    </div>
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
    </div>
  );
}

export default App;
