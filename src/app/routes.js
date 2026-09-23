const pageModules = import.meta.glob("../pages/*/index.{jsx,tsx}", {
  eager: true,
});

function getTitle(slug) {
  return slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export const pageRoutes = Object.entries(pageModules)
  .filter(([file]) => !file.includes("/main") && !file.includes("/layouts"))
  .map(([file, module]) => {
    const slug = file.split("/").at(-2);

    return {
      path: `/${slug}`,
      title: module.title ?? getTitle(slug),
      Component: module.default,
    };
  });
