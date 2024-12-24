import pdfMake from "pdfmake/build/pdfmake";
import { calculateGrade } from "./gradesHelper";
// No need to set pdfMake.vfs or custom fonts

export const exportToPDF = async (results, url) => {
  if (!results) return;

  const createTable = (headers, body) => ({
    table: {
      headerRows: 1,
      widths: Array(headers.length).fill("*"),
      body: [headers, ...body],
    },
    layout: {
      hLineWidth: () => 1,
      vLineWidth: () => 1,
      hLineColor: () => "#ddd",
      vLineColor: () => "#ddd",
    },
    margin: [0, 5, 0, 15],
  });

  // Create Local SEO table data
  const localSEOTable = results.googleBusinessProfile
    ? [
        ["Metric", "Status"],
        [
          "Google Business Profile",
          results.googleBusinessProfile.exists
            ? "✅ Business has a profile"
            : "❌ No profile found",
        ],
        [
          "Profile URL",
          results.googleBusinessProfile.profileUrl
            ? results.googleBusinessProfile.profileUrl
            : "Not available",
        ],
        [
          "Profile Completeness",
          results.googleBusinessProfile.isComplete
            ? "✅ Complete"
            : `⚠️ Incomplete\n${
                results.googleBusinessProfile.missingElements?.join("\n") || ""
              }`,
        ],
      ]
    : [];

  const docDefinition = {
    content: [
      // Title
      { text: "SEO Audit Report", style: "header" },
      { text: `Generated for: ${url}`, style: "subheader" },
      { text: "\n" },

      // Description section
      { text: "SEO Analysis", style: "sectionHeader" },
      { text: "Grade Descriptions:", style: "subsectionHeader" },
      {
        ul: [
          "A: Excellent - Meets all SEO best practices",
          "B: Good - Minor improvements needed",
          "C: Fair - Needs significant improvements",
          "F: Poor - Does not meet SEO standards",
        ],
      },
      { text: "\n" },
      { text: "SEO Categories Explained:", style: "subsectionHeader" },
      {
        ul: [
          "Title Tags: The HTML element that specifies the title of a web page. It's important for SEO and user experience.",
          "Meta Descriptions: A brief summary of a web page's content. It appears in search results and can influence click-through rates.",
          "Headings: HTML tags (H1, H2, etc.) used to define the headings of a page. They help structure content and are important for SEO.",
          "Page Load Speed: The time it takes for a web page to load. Faster load times improve user experience and SEO rankings.",
          "Duplicate Content: Content that appears on more than one web page. It can confuse search engines and affect SEO.",
          "Images without Alt: Images on a page that lack alternative text. Alt text is important for accessibility and SEO.",
          "Canonical Tag: An HTML element that helps prevent duplicate content issues by specifying the preferred version of a web page.",
        ],
      },
      // { text: "\n", pageBreak: "after" },

      // Local SEO section
      { text: "Local SEO Analysis", style: "sectionHeader" },
      createTable(["Metric", "Status"], localSEOTable.slice(1)),
      // { text: "\n", pageBreak: "after" },

      // Results for each page
      ...results.seoResults.flatMap((result) => [
        {
          text: `Page Analysis: ${result.url}`,
          style: "sectionHeader",
          pageBreak: "before",
        },

        // OnPage SEO Table
        { text: "On-Page SEO Analysis", style: "subsectionHeader" },
        createTable(
          ["Category", "Status"],
          [
            ["Title Tags", `${calculateGrade(result).title}`],
            ["Meta Descriptions", `${calculateGrade(result).metaDescription}`],
            ["Headings", `${calculateGrade(result).headings}`],
            ["Page Load Speed", `${calculateGrade(result).pageLoadSpeed}`],
            ["Internal Page Links", `${result.internalPageLinksCount}`],
            ["Internal Section Links", `${result.internalSectionLinksCount}`],
            [
              "Duplicate Content",
              `${result.isContentDuplicate ? "Yes" : "No"}`,
            ],
            ["Images without Alt", `${result.imagesWithoutAlt}`],
            [
              "Canonical Tag",
              `${result.canonicalLink} (${
                result.isCanonicalCorrect ? "Correct" : "Incorrect"
              })`,
            ],
            ["Lang Attribute", `${result.hasLangAttribute ? "Yes" : "No"}`],
            ["SSL Enabled", `${result.isSSLEnabled ? "Yes" : "No"}`],
            ["Robots.txt", `${result.hasRobotsTxt ? "Yes" : "No"}`],
            ["Google Analytics", `${result.hasGoogleAnalytics ? "Yes" : "No"}`],
            ["Word Count", `${result.wordCount}`],
            ["Word Count Grade", `${result.wordCountGrade}`],
          ]
        ),
        { text: "\n" },

        // Social Links table
        { text: "Social Media Links", style: "subsectionHeader" },
        createTable(
          ["Platform", "Link"],
          Object.entries(result.socialLinks || {}).map(([platform, link]) => [
            platform.charAt(0).toUpperCase() + platform.slice(1),
            link,
          ])
        ),

        // Links Analysis table
        { text: "Links Analysis", style: "subsectionHeader" },
        createTable(
          ["Type", "Count", "Links"],
          [
            [
              "Internal Page Links",
              result.internalPageLinksCount,
              result.internalPageLinks.join("\n"),
            ],
            [
              "Internal Section Links",
              result.internalSectionLinksCount,
              result.internalSectionLinks.join("\n"),
            ],
            [
              "Broken Links",
              result.brokenLinks.length,
              result.brokenLinks.length > 0
                ? result.brokenLinks.join("\n")
                : "No broken links found.",
            ],
          ],
          { text: "\n", pageBreak: "after" }
        ),

        // Performance table
        { text: "Performance Metrics", style: "subsectionHeader" },
        createTable(
          ["Metric", "Status"],
          [
            ["HTTP/2 Support", result.isHttp2Supported ? "Yes" : "No"],
            ...(result.cssNeedsMinification && result.jsNeedsMinification
              ? [
                  [
                    "CSS Needs Minification",
                    result.cssNeedsMinification ? "Yes" : "No",
                  ],
                  [
                    "JS Needs Minification",
                    result.jsNeedsMinification ? "Yes" : "No",
                  ],
                ]
              : []),
            ["Inline Styles Count", result.inlineStylesCount.toString()],
            [
              "Deprecated HTML Tags",
              result.deprecatedTagsFound?.join(", ") || "None",
            ],
            ["Page Load Speed", result.loadTimeFeedback],
          ]
        ),
        { text: "\n" },
      ]),
    ],
    styles: {
      header: {
        fontSize: 24,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 5],
      },
      sectionHeader: {
        fontSize: 18,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      subsectionHeader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5],
      },
    },
    defaultStyle: {
      fontSize: 10,
      lineHeight: 1.2,
    },
  };

  try {
    pdfMake.createPdf(docDefinition).download("seo_audit_report.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Error generating PDF. Please try again.");
  }
};
