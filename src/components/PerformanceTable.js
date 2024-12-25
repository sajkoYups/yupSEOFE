import React from "react";
import { PERFORMANCE_DESCRIPTIONS } from "../constants/PerformanceTableConstants";

export const PerformanceTable = ({ result, setModalInfo }) => {
  const handleRowClick = (category) => {
    if (PERFORMANCE_DESCRIPTIONS[category]) {
      setModalInfo({
        isOpen: true,
        title: PERFORMANCE_DESCRIPTIONS[category].title,
        description: PERFORMANCE_DESCRIPTIONS[category].description,
      });
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("HTTP/2 Support")}
          >
            <td>HTTP/2 Support</td>
            <td>{result.isHttp2Supported ? "Yes" : "No"}</td>
          </tr>
          {result.cssNeedsMinification && result.jsNeedsMinification && (
            <>
              <tr
                className="clickable-row"
                onClick={() => handleRowClick("CSS Minification")}
              >
                <td>CSS Needs Minification</td>
                <td>{result.cssNeedsMinification ? "Yes" : "No"}</td>
              </tr>
              <tr
                className="clickable-row"
                onClick={() => handleRowClick("JS Minification")}
              >
                <td>JS Needs Minification</td>
                <td>{result.jsNeedsMinification ? "Yes" : "No"}</td>
              </tr>
            </>
          )}
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Inline Styles")}
          >
            <td>Inline Styles Count</td>
            <td>{result.inlineStylesCount}</td>
          </tr>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Deprecated HTML")}
          >
            <td>Deprecated HTML Tags</td>
            <td>{result.deprecatedTagsFound?.join(", ") || "None"}</td>
          </tr>
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Page Load Speed")}
          >
            <td>Page Load Speed</td>
            <td>{result.loadTimeFeedback}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
