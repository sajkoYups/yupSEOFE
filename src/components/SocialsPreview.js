import React from "react";

export const SocialsPreview = ({ result }) => {
  return (
    <>
      {Object.keys(result.socialLinks).length > 0 ? (
        <table className="socials-table">
          <thead>
            <tr>
              <th>Platform</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(result.socialLinks).map(([platform, link]) => (
              <tr key={platform}>
                <td>{platform.charAt(0).toUpperCase() + platform.slice(1)}</td>
                <td>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No social media links found.</p>
      )}
    </>
  );
};
