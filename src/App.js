import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import HeadingChart from "./HeadingChart";

function App() {
  const [url, setUrl] = useState("");
  const [maxDepth, setMaxDepth] = useState(2);
  const [keywords, setKeywords] = useState("");
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/crawl", {
        url,
        maxDepth,
        keywords: keywords.split(",").map((kw) => kw.trim()),
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching SEO data:", error);
    }
  };

  const calculateGrade = (result) => {
    const grades = {};

    // Title Tags
    grades.title = result.isTitleUnique ? "A" : "C";

    // Meta Descriptions
    if (result.metaDescriptionStatus === "Valid") {
      grades.metaDescription = "A";
    } else if (result.metaDescriptionStatus === "Missing") {
      grades.metaDescription = "F";
    } else {
      grades.metaDescription = "C";
    }

    // Headings
    grades.headings = result.h1Feedback === "Good" ? "A" : "C";

    // Page Load Speed
    grades.pageLoadSpeed = result.loadTimeFeedback === "Good" ? "A" : "C";

    return grades;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SEO Crawler</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Max Depth"
            value={maxDepth}
            onChange={(e) => setMaxDepth(e.target.value)}
            min="1"
            required
          />
          <input
            type="text"
            placeholder="Enter Keywords (comma-separated)"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <button type="submit">Crawl</button>
        </form>
        {results &&
          results.seoResults.map((result, index) => {
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
                      <td>{grades.title}</td>
                    </tr>
                    <tr>
                      <td>Meta Descriptions</td>
                      <td>{grades.metaDescription}</td>
                    </tr>
                    <tr>
                      <td>Headings</td>
                      <td>{grades.headings}</td>
                    </tr>
                    <tr>
                      <td>Page Load Speed</td>
                      <td>{grades.pageLoadSpeed}</td>
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
                <HeadingChart headings={result.headings} />
              </div>
            );
          })}
      </header>
    </div>
  );
}

export default App;
