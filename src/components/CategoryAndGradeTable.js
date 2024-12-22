import React from "react";
import { getGradeClass, calculateGrade } from "../helpers/gradesHelper";

export const CategoryAndGradeTable = ({ result }) => {
  const grades = calculateGrade(result);
  return (
    <table style={{ marginBottom: "6rem" }}>
      <thead>
        <tr>
          <th>Category</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Title Tags</td>
          <td className={getGradeClass(grades.title)}>{grades.title}</td>
        </tr>
        <tr>
          <td>Meta Descriptions</td>
          <td className={getGradeClass(grades.metaDescription)}>
            {grades.metaDescription}
          </td>
        </tr>
        <tr>
          <td>Headings</td>
          <td className={getGradeClass(grades.headings)}>{grades.headings}</td>
        </tr>
        <tr>
          <td>Page Load Speed</td>
          <td className={getGradeClass(grades.pageLoadSpeed)}>
            {grades.pageLoadSpeed}
          </td>
        </tr>
        <tr>
          <td>Internal Page Links</td>
          <td>{result.internalPageLinksCount}</td>
        </tr>
        <tr>
          <td>Internal Section Links</td>
          <td>{result.internalSectionLinksCount}</td>
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
        <tr>
          <td>Lang Attribute</td>
          <td>{result.hasLangAttribute ? "Yes" : "No"}</td>
        </tr>
        <tr>
          <td>SSL Enabled</td>
          <td>{result.isSSLEnabled ? "Yes" : "No"}</td>
        </tr>
        <tr>
          <td>Robots.txt</td>
          <td>{result.hasRobotsTxt ? "Yes" : "No"}</td>
        </tr>
        <tr>
          <td>Google Analytics</td>
          <td>{result.hasGoogleAnalytics ? "Yes" : "No"}</td>
        </tr>
        <tr>
          <td>Word Count</td>
          <td>{result.wordCount}</td>
        </tr>
        <tr>
          <td>Word count grade</td>
          <td>{result.wordCountGrade}</td>
        </tr>
      </tbody>
    </table>
  );
};
