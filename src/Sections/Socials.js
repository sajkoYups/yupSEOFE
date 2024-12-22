import React from "react";
import { SocialsPreview } from "../components/SocialsPreview";

export const Socials = ({ result }) => {
  return (
    // <section className="socials-section">
    <section>
      <h1>Socials</h1>
      <SocialsPreview result={result} />
    </section>
  );
};
