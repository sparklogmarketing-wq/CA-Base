// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// The public site URL (used for canonical URLs + sitemap). Update on deploy.
const SITE_URL = "https://example.github.io";

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "never",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
