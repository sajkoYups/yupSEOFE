import React from "react";
import { CategoryAndGradeTable } from "../components/CategoryAndGradeTable";

export const OnPageSEO = ({ result, setModalInfo }) => {
  return (
    <section>
      <CategoryAndGradeTable result={result} setModalInfo={setModalInfo} />
    </section>
  );
};
