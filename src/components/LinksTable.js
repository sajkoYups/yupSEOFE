import React from "react";

export const LinksTable = ({ result }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Count</th>
            <th>Links</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Internal Page Links</td>
            <td>{result.internalPageLinksCount}</td>
            <td>
              <ul>
                {result.internalPageLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <td>Internal Section Links</td>
            <td>{result.internalSectionLinksCount}</td>
            <td>
              <ul>
                {result.internalSectionLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={`${result.url}${link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <td>Broken Links</td>
            <td>{result.brokenLinks.length}</td>
            <td>
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
