import React from "react";
import { GoogleBusinessProfileTable } from "../components/GoogleBusinessProfileTable";

export const LocalSEO = ({ results }) => {
  return (
    <section>
      <GoogleBusinessProfileTable results={results} />
    </section>
  );
};
