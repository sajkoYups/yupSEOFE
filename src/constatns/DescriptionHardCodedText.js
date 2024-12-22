import React from "react";

export const DescriptionHardCodedText = () => {
  return (
    <>
      <h1>SEO Analysis:</h1>
      <div className="grade-description">
        <p>
          <strong>Grade Descriptions:</strong>
          <br />
          <br />
          <span className="grade-a">A:</span> Excellent - Meets all SEO best
          practices.
          <br />
          <br />
          <span className="grade-b">B:</span> Good - Minor improvements needed.
          <br />
          <br />
          <span className="grade-c">C:</span> Fair - Needs significant
          improvements.
          <br />
          <br />
          <span className="grade-f">F:</span> Poor - Does not meet SEO
          standards.
        </p>
        <p>
          <strong>SEO Categories Explained:</strong>
          <br />
          <br />
          <strong>Title Tags:</strong> The HTML element that specifies the title
          of a web page. It's important for SEO and user experience.
          <br />
          <br />
          <strong>Meta Descriptions:</strong> A brief summary of a web page's
          content. It appears in search results and can influence click-through
          rates.
          <br />
          <br />
          <strong>Headings:</strong> HTML tags (H1, H2, etc.) used to define the
          headings of a page. They help structure content and are important for
          SEO.
          <br />
          <br />
          <strong>Page Load Speed:</strong> The time it takes for a web page to
          load. Faster load times improve user experience and SEO rankings.
          <br />
          <br />
          <strong>Duplicate Content:</strong> Content that appears on more than
          one web page. It can confuse search engines and affect SEO.
          <br />
          <br />
          <strong>Images without Alt:</strong> Images on a page that lack
          alternative text. Alt text is important for accessibility and SEO.
          <br />
          <br />
          <strong>Canonical Tag:</strong> An HTML element that helps prevent
          duplicate content issues by specifying the preferred version of a web
          page.
        </p>
      </div>
      <div>
        <h4>Keyword Analysis:</h4>
        <p>
          There isn't a strict SEO norm or rule about the exact number of times
          a keyword should appear on a webpage. However, there are some best
          practices and guidelines to consider:
        </p>
        <ul>
          <li>
            <strong>Keyword Density:</strong> This refers to the percentage of
            times a keyword appears on a page compared to the total number of
            words. While there is no ideal percentage, a keyword density of 1-2%
            is often recommended. Overusing keywords (known as "keyword
            stuffing") can lead to penalties from search engines.
          </li>
          <li>
            <strong>Natural Language:</strong> Keywords should be integrated
            naturally into the content. The focus should be on providing
            valuable and relevant information to the reader rather than forcing
            keywords into the text.
          </li>
          <li>
            <strong>Placement:</strong> Keywords should be strategically placed
            in important areas such as:
            <ul>
              <li>Title tags</li>
              <li>Meta descriptions</li>
              <li>Headings (H1, H2, etc.)</li>
              <li>The first 100 words of the content</li>
              <li>Alt text for images</li>
              <li>URL slugs</li>
            </ul>
          </li>
          <li>
            <strong>Semantic Keywords:</strong> Use related terms and synonyms
            to provide context and depth to the content. This helps search
            engines understand the topic better and can improve rankings.
          </li>
          <li>
            <strong>User Experience:</strong> Ultimately, the content should be
            written for users, not search engines. Ensuring a good user
            experience with high-quality, informative content is more important
            than focusing solely on keyword frequency.
          </li>
          <li>
            <strong>Content Length:</strong> Longer content naturally allows for
            more keyword usage without appearing spammy. However, the content
            should be as long as necessary to cover the topic comprehensively.
          </li>
        </ul>
        <p>
          It's important to remember that search engines like Google use complex
          algorithms that consider many factors beyond keyword usage, such as
          page load speed, mobile-friendliness, backlinks, and user engagement
          metrics. Therefore, a holistic approach to SEO is recommended.
        </p>
      </div>
    </>
  );
};
