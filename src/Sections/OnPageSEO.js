import React from "react";
import { CategoryAndGradeTable } from "../components/CategoryAndGradeTable";
import { renderTitleBarChart } from "../components/BarCharts";

export const OnPageSEO = ({ result }) => {
  return (
    <section>
      <CategoryAndGradeTable result={result} />
    </section>
  );
};
