import React from "react";
import { renderTitleBarChart } from "../components/BarCharts";

export const TitleAnalysis = ({ result }) => {
  return (
    <section>
      <div>{renderTitleBarChart(result)}</div>
    </section>
  );
};
