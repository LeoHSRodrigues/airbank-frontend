import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    baseUrl: 'http://localhost:3000',
    experimentalSessionAndOrigin: true,
    supportFile: false
  },
});