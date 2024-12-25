import React from "react";
import { getGradeClass, calculateGrade } from "../helpers/gradesHelper";
import { SEO_DESCRIPTIONS } from "../constatns/OnPageSeoTableConstants";

export const CategoryAndGradeTable = ({ result, setModalInfo }) => {
  const grades = calculateGrade(result);

  const handleRowClick = (category) => {
    setModalInfo({
      isOpen: true,
      title: SEO_DESCRIPTIONS[category].title,
      description: SEO_DESCRIPTIONS[category].description,
      improvements: SEO_DESCRIPTIONS[category].improvements,
    });
  };

  return (
    <>
      <table style={{ marginBottom: "6rem" }}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Title Tags")}
          >
            <td>Title Tags</td>
            <td className={getGradeClass(grades.title)}>{grades.title}</td>
          </tr>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Meta Descriptions")}
          >
            <td>Meta Descriptions</td>
            <td className={getGradeClass(grades.metaDescription)}>
              {grades.metaDescription}
            </td>
          </tr>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Headings")}
          >
            <td>Headings</td>
            <td className={getGradeClass(grades.headings)}>
              {grades.headings}
            </td>
          </tr>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Page Load Speed")}
          >
            <td>Page Load Speed</td>
            <td className={getGradeClass(grades.pageLoadSpeed)}>
              {grades.pageLoadSpeed}
            </td>
          </tr>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Internal Page Links")}
          >
            <td>Internal Page Links</td>
            <td>{result.internalPageLinksCount}</td>
          </tr>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Internal Section Links")}
          >
            <td>Internal Section Links</td>
            <td>{result.internalSectionLinksCount}</td>
          </tr>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Duplicate Content")}
          >
            <td>Duplicate Content</td>
            <td>{result.isContentDuplicate ? "Yes" : "No"}</td>
          </tr>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Images without Alt")}
          >
            <td>Images without Alt</td>
            <td>{result.imagesWithoutAlt}</td>
          </tr>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Canonical Tag")}
          >
            <td>Canonical Tag</td>
            <td>
              {result.canonicalLink} (
              {result.isCanonicalCorrect ? "Correct" : "Incorrect"})
            </td>
          </tr>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Lang Attribute")}
          >
            <td>Lang Attribute</td>
            <td>{result.hasLangAttribute ? "Yes" : "No"}</td>
          </tr>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("SSL Enabled")}
          >
            <td>SSL Enabled</td>
            <td>{result.isSSLEnabled ? "Yes" : "No"}</td>
          </tr>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Robots.txt")}
          >
            <td>Robots.txt</td>
            <td>{result.hasRobotsTxt ? "Yes" : "No"}</td>
          </tr>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Google Analytics")}
          >
            <td>Google Analytics</td>
            <td>{result.hasGoogleAnalytics ? "Yes" : "No"}</td>
          </tr>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Word Count")}
          >
            <td>Word Count</td>
            <td>{result.wordCount}</td>
          </tr>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Word Count Grade")}
          >
            <td>Word Count Grade</td>
            <td>{result.wordCountGrade}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
