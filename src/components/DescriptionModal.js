import React from "react";

export const DescriptionModal = ({ isOpen, onClose, title, description }) => {
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
        <div className="modal-body">{description}</div>
        <div className="modal-footer">
          <button className="modal-button confirm" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
