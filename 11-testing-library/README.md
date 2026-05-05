# Testing Simple Todos

## Re-create

Make a copy of `03-simple-todos`. Setup React Router and a `/todos` route. Install the following packages:

```bash
npm install -D vitest jest-environment-jsdom jsdom @testing-library/dom @testing-library/jest-dom @testing-library/react
```

Create (if it doesn't already exist 😅) `src/tests/setup.ts` and paste the following:

```ts
import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
	// Unmount any React components after each test
	cleanup();
});
```

Edit `vite.config.ts` and replace it with:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/tests/setup.ts",
	},
});
```

Edit `package.json` and add the following under `script`:

```json
    "test": "vitest"
```

Install user-event library:

```bash
npm install --save-dev @testing-library/user-event
```
