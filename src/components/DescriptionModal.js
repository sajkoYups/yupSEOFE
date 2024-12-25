import React from "react";

export const DescriptionModal = ({
  isOpen,
  onClose,
  title,
  description,
  improvements,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="description-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <div className="modal-body">
          <p>{description}</p>
          {improvements && improvements.length > 0 && (
            <>
              <h3>How to improve:</h3>
              <ul className="improvements-list">
                {improvements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="modal-footer">
          <button className="modal-button confirm" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
