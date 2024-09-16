# Reader

todo.
convert url content into markdown

need to fix:

- readability.js use title as heading1 :/

## Run

1. Install the dependencies:
    ```sh
    pnpm install
    ```

2. Run the application:
    ```sh
    pnpm start
    ```

3. Open your browser and navigate to:
    ```sh
    http://localhost:3000/<http-url-to-read>
    ```

## Example:

Request:

```
https://reader-sandy-phi.vercel.app/https:/github.com/katonsa/katon.dev
```

Response:

```plaintext
# GitHub - katonsa/katon.dev

## Portfolio Starter Kit

[](#portfolio-starter-kit)

This portfolio is built with **Next.js** and a library called [Nextra](https://nextra.vercel.app/). It allows you to write Markdown and focus on the *content* of your portfolio. This starter includes:

-   Automatically configured to handle Markdown/MDX
-   Generates an RSS feed based on your posts
-   A beautiful theme included out of the box
-   Easily categorize posts with tags
-   Fast, optimized web font loading

[https://demo.vercel.blog](https://demo.vercel.blog/)

## Configuration

[](#configuration)

1.  Update your name in `theme.config.js` or change the footer.
2.  Update your name and site URL for the RSS feed in `scripts/gen-rss.js`.
3.  Update the meta tags in `pages/_document.tsx`.
4.  Update the posts inside `pages/posts/*.md` with your own content.

## Deploy your own

[](#deploy-your-own)

Deploy the example using [Vercel](https://vercel.com/?utm_source=github&utm_medium=readme&utm_campaign=next-example) or preview live with [StackBlitz](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/blog)

[![Deploy with Vercel](https://camo.githubusercontent.com/20bea215d35a4e28f2c92ea5b657d006b087687486858a40de2922a4636301ab/68747470733a2f2f76657263656c2e636f6d2f627574746f6e)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/blog&project-name=portfolio&repository-name=portfolio)

## How to use

[](#how-to-use)

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io/) to bootstrap the example:

npx create-next-app --example blog my-blog
# or
yarn create next-app --example blog my-blog
# or
pnpm create next-app --example blog my-blog

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).
```
