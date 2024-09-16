// @ts-check
"use strict";

import { JSDOM } from "jsdom";
import { Readability, isProbablyReaderable } from "@mozilla/readability";
import TurndownService from "turndown";
import DOMPurify from "dompurify";
import { fastify } from "fastify";

export default function (opts = {}) {
  const app = fastify(opts);

  app.get("/", async function handler(request, reply) {
    return {
      message:
        "Welcome! Use the endpoint /<url> to convert the content of the specified URL into markdown format.",
    };
  });

  app.get(
    "/http*",
    {
      onSend: (_request, reply, _payload, done) => {
        reply.header(
          "Content-Security-Policy",
          "default-src 'self'; script-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;",
        );
        done();
      },
    },
    async function handler(request, reply) {
      // @ts-ignore
      const url = `http${request.params["*"]}`;
      app.log.info(`Received URL parameter: ${url}`);

      try {
        const doc = await JSDOM.fromURL(new URL(url).toString(), {
          includeNodeLocations: true,
          pretendToBeVisual: true,
          userAgent: "MyCoolReader/0.1.0",
        });

        // const response = await fetch(url, {
        //   headers: {
        //     'user-agent': 'MyCoolReader/0.1.0',
        //   }
        // })
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        // const text =  await response.text()
        // const doc = new JSDOM(text)
        // const body = doc.window.document.body.innerHTML

        // Check if the document is probably readable
        if (isProbablyReaderable(doc.window.document)) {
          const article = new Readability(doc.window.document, {
            classesToPreserve: ["h1", "h2", "h3", "h4", "h5", "h6"],
          }).parse();
          if (article) {
            app.log.debug(article);
            const window = doc.window;
            const purify = DOMPurify(window);
            const sanitizedContent = purify.sanitize(article.content);

            /** Define TurndownService options here for potential future expansion
            @type {TurndownService.Options}
          */
            const tdOpts = {
              headingStyle: "atx",
              hr: "---",
              bulletListMarker: "-",
              codeBlockStyle: "fenced",
              emDelimiter: "*",
              strongDelimiter: "**",
              linkStyle: "inlined",
              fence: "```",
              linkReferenceStyle: "full",
              preformattedCode: true,
            };
            const td = new TurndownService(tdOpts);
            const markdown = td.turndown(sanitizedContent);
            // return `Title: ${article.title}\n\n${markdown}`;
            return `# ${article.title}\n\n${markdown}`;
          } else {
            return { error: "URL is not readable or readable" };
          }
        } else {
          return { error: "Document is not likely to be readable" };
        }
      } catch (error) {
        console.error(error);
        return {
          error: error.message,
        };
      }
    },
  );

  return app;
}
