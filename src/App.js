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

  return (
    <div className="App">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>
            Loading... Please wait while we analyze your SEO data. This
            operation might take more then a minute
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
            {results.seoResults.map((result, index) => {
              const grades = calculateGrade(result);
              return (
                <div key={index}>
                  <h3>{result.url}</h3>
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
                          {result.isCanonicalCorrect ? "Correct" : "Incorrect"})
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {renderChart(result)}
                  <div>
                    <h4>Keyword Analysis:</h4>
                    <ul>
                      {result.keywordAnalysis.map((analysis, i) => (
                        <li key={i}>
                          {analysis.keyword}:{analysis.inTitleCount} in Title,
                          {analysis.inHeadingsCount} in Headings,
                          {analysis.inBodyCount} in Body
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>Broken Links:</h4>
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
              );
            })}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
