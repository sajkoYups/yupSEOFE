import React from "react";
import { PerformanceTable } from "../components/PerformanceTable";

export const Performance = ({ result }) => {
  return (
    <section>
      <h1>Performance</h1>
      <PerformanceTable result={result} />
    </section>
  );
};
