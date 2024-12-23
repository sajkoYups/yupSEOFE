import React from "react";
import { PerformanceTable } from "../components/PerformanceTable";

export const Performance = ({ result }) => {
  return (
    <section>
      <PerformanceTable result={result} />
    </section>
  );
};
