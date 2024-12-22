import React from "react";

export const PerformanceTable = ({ result }) => {
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
          <tr>
            <td>HTTP/2 Support</td>
            <td>{result.isHttp2Supported ? "Yes" : "No"}</td>
          </tr>
          {result.cssNeedsMinification && result.jsNeedsMinification && (
            <>
              <tr>
                <td>CSS Needs Minification</td>
                <td>{result.cssNeedsMinification ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>JS Needs Minification</td>
                <td>{result.jsNeedsMinification ? "Yes" : "No"}</td>
              </tr>
            </>
          )}
          <tr>
            <td>Inline Styles Count</td>
            <td>{result.inlineStylesCount}</td>
          </tr>
          <tr>
            <td>Deprecated HTML Tags</td>
            <td>{result.deprecatedTagsFound?.join(", ") || "None"}</td>
          </tr>
          <tr>
            <td>Page Load Speed</td>
            <td>{result.loadTimeFeedback}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
