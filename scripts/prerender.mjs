// Post-build step: renders every public route to static HTML (plus markdown copies of
// blog posts and llms.txt files) so crawlers and AI agents can read the site without JS.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const SITE_URL = "https://www.kishanvavdara.ai";

const { render, routes } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");

const escapeAttr = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const setMeta = (html, attr, key, value) => {
  const pattern = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  return html.replace(pattern, `$1${escapeAttr(value)}$2`);
};

const markdownPath = (routePath) => `${routePath}.md`;

for (const route of routes) {
  const url = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  const extraHead = [
    `<link rel="canonical" href="${url}" />`,
    route.markdown
      ? `<link rel="alternate" type="text/markdown" href="${markdownPath(route.path)}" />`
      : "",
  ]
    .filter(Boolean)
    .join("\n    ");

  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(route.title)}</title>`)
    .replace("</head>", `    ${extraHead}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${render(route.path)}</div>`);

  html = setMeta(html, "name", "description", route.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", route.title);
  html = setMeta(html, "property", "og:description", route.description);

  const outFile =
    route.path === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, `${route.path.slice(1)}.html`);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);

  if (route.markdown) {
    fs.writeFileSync(path.join(distDir, `${route.path.slice(1)}.md`), route.markdown);
  }
}

const postRoutes = routes.filter((route) => route.markdown);
const pageRoutes = routes.filter((route) => !route.markdown);
const stripSuffix = (title) => title.replace(/ \| Kishan Vavdara$/, "");

const llms = `# Kishan Vavdara

> ${routes[0].description}

Every page below is served as static HTML, so it can be read without running JavaScript. Blog posts are also available as raw markdown (append \`.md\` to the post URL). The full text of all posts is in ${SITE_URL}/llms-full.txt.

## Pages

${pageRoutes
  .map((route) => `- [${stripSuffix(route.title)}](${SITE_URL}${route.path}): ${route.description}`)
  .join("\n")}

## Blog posts

${postRoutes
  .map(
    (route) =>
      `- [${stripSuffix(route.title)}](${SITE_URL}${route.path}) ([markdown](${SITE_URL}${markdownPath(route.path)})): ${route.description}`,
  )
  .join("\n")}

## Elsewhere

- GitHub: https://github.com/kishan5111
- Kaggle: https://www.kaggle.com/kishanvavdara
- LinkedIn: https://www.linkedin.com/in/kishan-vavdara-55680b190/
`;

const llmsFull = `${llms}\n---\n\n${postRoutes
  .map((route) => `Source: ${SITE_URL}${route.path}\n\n${route.markdown}`)
  .join("\n---\n\n")}`;

fs.writeFileSync(path.join(distDir, "llms.txt"), llms);
fs.writeFileSync(path.join(distDir, "llms-full.txt"), llmsFull);
fs.rmSync(ssrDir, { recursive: true, force: true });

console.log(`Prerendered ${routes.length} routes and ${postRoutes.length} markdown posts.`);
