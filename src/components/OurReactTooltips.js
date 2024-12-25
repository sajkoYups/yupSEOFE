import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

export const OurReactTooltips = () => {
  return (
    <div>
      <ReactTooltip
        id="my-tooltip-1"
        place="bottom"
        variant="info"
        content="Enter the website URL you want to audit. Dont't forget to include the https://www. part"
      />
      <ReactTooltip
        id="my-tooltip-2"
        place="bottom"
        variant="info"
        content="Enter the depth of the website you want to audit. The depth is the number of pages that will be crawled. The maximum depth is 5"
      />
      <ReactTooltip
        id="my-tooltip-3"
        place="bottom"
        variant="info"
        content="Enter the name of the company you want to audit. This is used to generate the report title"
      />
      <ReactTooltip
        id="my-tooltip-4"
        place="bottom"
        variant="info"
        content="Enter the location of the company you want to audit. This is used for local SEO analysis"
      />
      <ReactTooltip
        id="my-tooltip-5"
        place="bottom"
        variant="info"
        content="Enter the keywords you want to rank for in the search engines. This is used for keyword analysis"
      />
      <ReactTooltip
        id="my-tooltip-6"
        place="bottom"
        variant="info"
        content="This section shows the grade for each category. The grade is based on the SEO score of the page. The maximum grade is A. If you want to know more about the grade, click on the title to see the feedback."
        style={{ zIndex: 2, maxWidth: "300px" }}
      />
      <ReactTooltip
        id="my-tooltip-7"
        place="bottom"
        variant="info"
        content="This is the schema markup analysis. A schema is a structured data format that allows you to provide more information about a page to search engines. Every page should have a schema. This is very advanced and you should only use it if you know what you are doing."
        style={{ zIndex: 2, maxWidth: "300px" }}
      />
      <ReactTooltip
        id="my-tooltip-8"
        place="bottom"
        variant="info"
        content="This is the title analysis. It shows the grade for the title tag. The grade is based on the SEO score of the page. The maximum grade is A. This is a visual representation of the title tag, meta description, heading structure and links analysis."
        style={{ zIndex: 2, maxWidth: "300px" }}
      />
      <ReactTooltip
        id="my-tooltip-9"
        place="bottom"
        variant="info"
        content="This is the keyword analysis. It shows the grade for the keyword analysis. The grade is based on the SEO score of the page. The maximum grade is A. This is a visual representation of the keyword analysis."
        style={{ zIndex: 2, maxWidth: "300px" }}
      />
      <ReactTooltip
        id="my-tooltip-10"
        place="bottom"
        variant="info"
        // content="This is the performance analysis. It shows advanced metrics such as page speed, time to first byte, time to interactive, total blocking time, cumulative layout shift, first input delay, and more."
        content="This is the performance analysis. It shows advanced metrics such as page speed, http2, and more. If you want to know more about the metrics, click on the title to see the feedback."
        style={{ zIndex: 2, maxWidth: "300px" }}
      />
      <ReactTooltip
        id="my-tooltip-11"
        place="bottom"
        variant="info"
        content="This is the links analysis. It shows the number of internal and external links, broken links, internal section links and internal page links. If you want to know more about the links, click on the title to see the feedback."
        style={{ zIndex: 2, maxWidth: "300px" }}
      />
      <ReactTooltip
        id="my-tooltip-12"
        place="bottom"
        variant="info"
        content="This is the social media analysis. It shows if the page has social media links. It is best practice to have social media links on your page."
        style={{ zIndex: 2, maxWidth: "300px" }}
      />
      <ReactTooltip
        id="my-tooltip-13"
        place="bottom"
        variant="info"
        content="This is the local SEO analysis. This is very important if you are a local business. It shows if we found your Google Business Profile and if there are any errors in your profile."
        style={{ zIndex: 2, maxWidth: "300px" }}
      />
    </div>
  );
};
