import React from "react";
import { GoogleBusinessProfileTable } from "../components/GoogleBusinessProfileTable";

export const LocalSEO = ({ results, setModalInfo }) => {
  return (
    <section>
      <GoogleBusinessProfileTable
        results={results}
        setModalInfo={setModalInfo}
      />
    </section>
  );
};
