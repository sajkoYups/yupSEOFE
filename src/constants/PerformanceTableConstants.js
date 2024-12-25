export const PERFORMANCE_DESCRIPTIONS = {
  "HTTP/2 Support": {
    title: "HTTP/2 Protocol Support",
    description:
      "HTTP/2 is a major revision of the HTTP network protocol that improves website performance.",
    improvements: [
      "Enable HTTP/2 on your server",
      "Update server software to latest version",
      "Use a CDN that supports HTTP/2",
      "Implement SSL/TLS (required for HTTP/2)",
      "Optimize server configuration",
    ],
  },
  "CSS Minification": {
    title: "CSS Minification Analysis",
    description:
      "Minification removes unnecessary characters from CSS files to reduce file size and improve load times.",
    improvements: [
      "Use a CSS minification tool",
      "Remove unused CSS",
      "Combine multiple CSS files",
      "Enable GZIP compression",
      "Implement CSS caching",
    ],
  },
  "JS Minification": {
    title: "JavaScript Minification Analysis",
    description:
      "JavaScript minification reduces code size by removing unnecessary characters without changing functionality.",
    improvements: [
      "Use a JavaScript minifier",
      "Remove unused code",
      "Combine JavaScript files",
      "Use modern compression methods",
      "Implement code splitting",
    ],
  },
  "Inline Styles": {
    title: "Inline Styles Analysis",
    description:
      "Inline styles are CSS properties written directly in HTML elements. Too many can impact maintenance and page load.",
    improvements: [
      "Move inline styles to external stylesheets",
      "Use CSS classes instead of inline styles",
      "Implement critical CSS properly",
      "Follow CSS best practices",
      "Use style components or CSS modules",
    ],
  },
  "Deprecated HTML": {
    title: "Deprecated HTML Tags Analysis",
    description:
      "Deprecated HTML tags are old elements that are no longer recommended for use in modern web development.",
    improvements: [
      "Replace deprecated tags with modern alternatives",
      "Update HTML to latest standards",
      "Use semantic HTML elements",
      "Validate HTML code regularly",
      "Follow W3C recommendations",
    ],
  },
  "Page Load Speed": {
    title: "Page Load Speed Analysis",
    description:
      "The time it takes for your page to fully load. Crucial for user experience and SEO performance.",
    improvements: [
      "Optimize images and media",
      "Implement lazy loading",
      "Use browser caching",
      "Minimize server response time",
      "Reduce third-party scripts",
    ],
  },
};
