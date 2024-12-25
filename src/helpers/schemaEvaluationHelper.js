const RECOMMENDED_SCHEMAS = {
  Organization: {
    required: ["@type", "name", "url"],
    recommended: [
      "logo",
      "description",
      "sameAs",
      "address",
      "telephone",
      "email",
    ],
  },
  LocalBusiness: {
    required: ["@type", "name", "address"],
    recommended: ["openingHours", "telephone", "priceRange", "geo"],
  },
  WebSite: {
    required: ["@type", "name", "url"],
    recommended: ["description", "publisher", "potentialAction"],
  },
  Product: {
    required: ["@type", "name", "description"],
    recommended: ["image", "brand", "offers", "review", "aggregateRating"],
  },
  Article: {
    required: ["@type", "headline", "author"],
    recommended: ["datePublished", "dateModified", "image", "publisher"],
  },
};

export const evaluateSchemas = (schemas) => {
  // Check for duplicate schema types
  const schemaTypes = schemas.map((s) => s.type);
  const duplicateTypes = schemaTypes.filter(
    (type, index) => schemaTypes.indexOf(type) !== index
  );

  // Evaluate each schema individually
  const evaluations = schemas.map((schema) => {
    const type = schema.type;
    const content = schema.content;

    if (!RECOMMENDED_SCHEMAS[type]) {
      return {
        type,
        grade: "C",
        message: "Schema type not in recommended list",
        suggestions: ["Consider using more specific schema types"],
        isDuplicate: duplicateTypes.includes(type),
      };
    }

    const { required, recommended } = RECOMMENDED_SCHEMAS[type];

    const missingRequired = required.filter((field) => !content[field]);
    const missingRecommended = recommended.filter((field) => !content[field]);

    const requiredScore =
      (required.length - missingRequired.length) / required.length;
    const recommendedScore =
      (recommended.length - missingRecommended.length) / recommended.length;

    const totalScore = requiredScore * 0.7 + recommendedScore * 0.3;

    let grade, message, suggestions;

    // If this is a duplicate schema type, lower the grade
    if (duplicateTypes.includes(type)) {
      grade = "C";
      message = "Duplicate schema type detected";
      suggestions = [
        "Combine duplicate schemas of the same type",
        "Ensure each schema type appears only once unless specifically needed",
        "Consider using more specific schema types instead of duplicates",
      ];
    } else if (totalScore >= 0.9) {
      grade = "A";
      message = "Excellent schema implementation";
      suggestions = missingRecommended.length
        ? [`Consider adding: ${missingRecommended.join(", ")}`]
        : ["Schema is well implemented"];
    } else if (totalScore >= 0.7) {
      grade = "B";
      message = "Good schema implementation, but room for improvement";
      suggestions = [
        ...missingRequired.map((field) => `Add required field: ${field}`),
        ...missingRecommended.map((field) => `Consider adding: ${field}`),
      ];
    } else if (totalScore >= 0.5) {
      grade = "C";
      message = "Basic schema implementation needs improvement";
      suggestions = [
        "Add missing required fields",
        "Include recommended properties",
        "Consider using more specific schema types",
      ];
    } else {
      grade = "F";
      message = "Insufficient schema implementation";
      suggestions = [
        "Implement all required fields",
        "Add recommended properties",
        "Review schema.org guidelines",
      ];
    }

    return {
      type,
      grade,
      message,
      suggestions,
      score: totalScore * 100,
      isDuplicate: duplicateTypes.includes(type),
    };
  });

  // Overall schema implementation assessment
  const overallAssessment = {
    hasDuplicates: duplicateTypes.length > 0,
    duplicateTypes,
    schemaCount: schemas.length,
    recommendedTypes: Object.keys(RECOMMENDED_SCHEMAS).filter(
      (type) => !schemaTypes.includes(type)
    ),
    message:
      duplicateTypes.length > 0
        ? `Warning: Duplicate schema types found (${duplicateTypes.join(", ")})`
        : "Good: No duplicate schema types detected",
  };

  return {
    evaluations,
    overallAssessment,
  };
};
