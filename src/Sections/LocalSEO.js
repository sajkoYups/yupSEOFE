import React from "react";
import { GoogleBusinessProfileTable } from "../components/GoogleBusinessProfileTable";

export const LocalSEO = ({ results }) => {
  return (
    <section>
      <h1>Local SEO</h1>
      <GoogleBusinessProfileTable results={results} />
    </section>
  );
};
