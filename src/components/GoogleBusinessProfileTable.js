import React from "react";

export const GoogleBusinessProfileTable = ({ results }) => {
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
              <tr>
                <td>Google Business Profile</td>
                <td>
                  {results.googleBusinessProfile.exists
                    ? "✅ Business has a profile"
                    : "❌ No profile found"}
                </td>
              </tr>
              {results.googleBusinessProfile.exists && (
                <>
                  <tr>
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
                  <tr>
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
