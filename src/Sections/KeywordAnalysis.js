import React from "react";
import { renderKeywordBarChart } from "../components/BarCharts";

export const KeywordAnalysis = ({ result }) => {
  return (
    <section>
      <div>{renderKeywordBarChart(result.keywordAnalysis)}</div>
    </section>
  );
};
