import React from "react";
import { LOCAL_SEO_DESCRIPTIONS } from "../constants/LocalSeoTableConstants";

export const GoogleBusinessProfileTable = ({ results, setModalInfo }) => {
  const handleRowClick = (category) => {
    if (LOCAL_SEO_DESCRIPTIONS[category]) {
      setModalInfo({
        isOpen: true,
        title: LOCAL_SEO_DESCRIPTIONS[category].title,
        description: LOCAL_SEO_DESCRIPTIONS[category].description,
        improvements: LOCAL_SEO_DESCRIPTIONS[category].improvements,
      });
    }
  };

  return (
    <>
      {results.googleBusinessProfile && (
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
                onClick={() =>
                  handleRowClick(
                    results.googleBusinessProfile.exists
                      ? "Google Business Profile"
                      : "No Google Business Profile"
                  )
                }
              >
                <td>Google Business Profile</td>
                <td>
                  {results.googleBusinessProfile.exists
                    ? "✅ Business has a profile"
                    : "❌ No profile found"}
                </td>
              </tr>
              {results.googleBusinessProfile.exists && (
                <>
                  <tr
                    className="clickable-row"
                    onClick={() => handleRowClick("Profile URL")}
                  >
                    <td>Profile URL</td>
                    <td>
                      {results.googleBusinessProfile.profileUrl ? (
                        <a
                          href={results.googleBusinessProfile.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gbp-link"
                        >
                          View Profile →
                        </a>
                      ) : (
                        "Not available"
                      )}
                    </td>
                  </tr>
                  <tr
                    className="clickable-row"
                    onClick={() => handleRowClick("Profile Completeness")}
                  >
                    <td>Profile Completeness</td>
                    <td>
                      {results.googleBusinessProfile.isComplete ? (
                        "✅ Complete"
                      ) : (
                        <>
                          ⚠️ Incomplete
                          <ul>
                            {results.googleBusinessProfile.missingElements.map(
                              (element, index) => (
                                <li key={index}>{element}</li>
                              )
                            )}
                          </ul>
                        </>
                      )}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
