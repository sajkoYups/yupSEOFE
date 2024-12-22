import React from "react";
import "../styles/Links.css";
import { LinksTable } from "../components/LinksTable";
export const Links = ({ result }) => {
  return (
    <section>
      <h1>Links</h1>
      <LinksTable result={result} />
    </section>
  );
};
