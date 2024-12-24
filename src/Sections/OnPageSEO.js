import React from "react";
import { CategoryAndGradeTable } from "../components/CategoryAndGradeTable";

export const OnPageSEO = ({ result }) => {
  return (
    <section>
      <CategoryAndGradeTable result={result} />
    </section>
  );
};
