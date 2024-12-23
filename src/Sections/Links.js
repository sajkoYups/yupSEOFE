import React from "react";
import "../styles/Links.css";
import { LinksTable } from "../components/LinksTable";
export const Links = ({ result }) => {
  return (
    <section>
      <LinksTable result={result} />
    </section>
  );
};
