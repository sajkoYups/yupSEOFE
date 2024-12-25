import React from "react";
import "../styles/Links.css";
import { LinksTable } from "../components/LinksTable";

export const Links = ({ result, setModalInfo }) => {
  return (
    <section>
      <LinksTable result={result} setModalInfo={setModalInfo} />
    </section>
  );
};
