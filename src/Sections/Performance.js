import React from "react";
import { PerformanceTable } from "../components/PerformanceTable";

export const Performance = ({ result, setModalInfo }) => {
  return (
    <section>
      <PerformanceTable result={result} setModalInfo={setModalInfo} />
    </section>
  );
};
