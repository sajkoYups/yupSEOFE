import React from "react";
import { evaluateSchemas } from "../helpers/schemaEvaluationHelper";
import { getGradeClass } from "../helpers/gradesHelper";

export const SchemaPreview = ({ result }) => {
  const evaluation = evaluateSchemas(result.schemas);

  return (
    <div className="schema-preview">
      {evaluation.overallAssessment.schemaCount > 0 && (
        <div
          className={`schema-overview ${
            evaluation.overallAssessment.hasDuplicates ? "warning" : "success"
          }`}
        >
          <p>{evaluation.overallAssessment.message}</p>
          {evaluation.overallAssessment.recommendedTypes.length > 0 && (
            <div className="schema-recommendations">
              <p>Consider adding these recommended schema types:</p>
              <ul>
                {evaluation.overallAssessment.recommendedTypes.map(
                  (type, index) => (
                    <li key={index}>{type}</li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Schema Type</th>
            <th>Grade</th>
            <th>Evaluation</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {evaluation.evaluations.map((evaluation, index) => (
            <tr
              key={index}
              className={evaluation.isDuplicate ? "duplicate-warning" : ""}
            >
              <td>{evaluation.type}</td>
              <td className={getGradeClass(evaluation.grade)}>
                {evaluation.grade}
              </td>
              <td>
                <div className="schema-evaluation">
                  <p>
                    <strong>{evaluation.message}</strong>
                  </p>
                  <ul>
                    {evaluation.suggestions.map((suggestion, i) => (
                      <li key={i}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </td>
              <td>
                <pre className="schema-content">
                  {JSON.stringify(result.schemas[index].content, null, 2)}
                </pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {result.schemas.length === 0 && (
        <p className="no-schema">No schema markup detected on this page</p>
      )}
    </div>
  );
};
