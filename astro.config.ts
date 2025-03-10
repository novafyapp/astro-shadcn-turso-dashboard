import cloudflare from "@astrojs/cloudflare";
import db from "@astrojs/db";
import react from "@astrojs/react";
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from "astro/config";
import { siteUrl } from "./dashboard.config";

export default defineConfig({
	site: siteUrl,
	output: "server",
	adapter: cloudflare({
		imageService: "compile",
	}),
	compressHTML: true,
	vite: {
		optimizeDeps: {
			exclude: ["astro:db"],
		},
		plugins: [tailwindcss()],
		resolve: {
			alias:
				process.env.NODE_ENV === 'production'
					? {
						'react-dom/server': 'react-dom/server.edge',
					}
					: undefined,
		},
	},
	integrations: [
		react(),
		db(),
	],
});
