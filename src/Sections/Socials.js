import React from "react";
import { SocialsPreview } from "../components/SocialsPreview";

export const Socials = ({ result }) => {
  return (
    // <section className="socials-section">
    <section>
      <SocialsPreview result={result} />
    </section>
  );
};