import React from "react";
import { LINKS_DESCRIPTIONS } from "../constants/LinksTableConstants";

export const LinksTable = ({ result, setModalInfo }) => {
  const handleRowClick = (category) => {
    if (LINKS_DESCRIPTIONS[category]) {
      setModalInfo({
        isOpen: true,
        title: LINKS_DESCRIPTIONS[category].title,
        description: LINKS_DESCRIPTIONS[category].description,
      });
    }
  };

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
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Internal Page Links")}
          >
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
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Internal Section Links")}
          >
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
          <tr
            className="clickable-row"
            onClick={() => handleRowClick("Broken Links")}
          >
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
