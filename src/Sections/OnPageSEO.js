import React from "react";
import { CategoryAndGradeTable } from "../components/CategoryAndGradeTable";
import { renderTitleBarChart } from "../components/BarCharts";
import { renderKeywordBarChart } from "../components/BarCharts";

export const OnPageSEO = ({ result }) => {
  return (
    <section>
      <h1>OnPageSEO</h1>
      <CategoryAndGradeTable result={result} />
      <div style={{ marginBottom: "6rem" }}>{renderTitleBarChart(result)}</div>
      <div>
        <p>Here is your analysis on the keywords:</p>
        {renderKeywordBarChart(result.keywordAnalysis)}
      </div>
    </section>
  );
};
