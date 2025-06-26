/// <reference types="vitest/config" />
/** @type {import('vite').UserConfig} */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		setupFiles: "./setupTests.js",
		globals: true,
	},
	server: {
		host: true,
	},
});
