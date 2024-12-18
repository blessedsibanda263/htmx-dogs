import { html } from "hono/html";

interface IPageProps {
  title?: string;
  description?: string;
  children?: any;
}

const Head = (title: string = "htmx Dogs CRUD") => html`
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css"
    />
    <link rel="stylesheet" href="/css/styles.css" />
    <script src="https://unpkg.com/htmx.org@2.0.0"></script>
    <title>${title}</title>
  </head>
`;

export const Layout = (props: IPageProps) => html`
  <html lang="en">
    ${Head(props?.title)}
    <body>
      <section class="section">${props && props.children}</section>
    </body>
  </html>
`;
