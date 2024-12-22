export const calculateGrade = (result) => {
  const grades = {};

  grades.title = result.isTitleUnique ? "A" : "C";
  grades.metaDescription =
    result.metaDescriptionStatus === "Valid"
      ? "A"
      : result.metaDescriptionStatus === "Missing"
      ? "F"
      : "C";
  grades.headings = result.h1Feedback === "Good" ? "A" : "C";
  grades.pageLoadSpeed = result.loadTimeFeedback === "Good" ? "A" : "C";
  grades.internalLinks = result.internalPageLinksCount > 0 ? "A" : "C";

  return grades;
};

export const getGradeClass = (grade) => {
  switch (grade) {
    case "A":
      return "grade-a";
    case "B":
      return "grade-b";
    case "C":
    case "F":
      return "grade-c";
    default:
      return "";
  }
};
