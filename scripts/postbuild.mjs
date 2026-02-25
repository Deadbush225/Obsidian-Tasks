#!/usr/bin/env node
/**
 * Post-build script: copies dist/main.js, dist/styles.css, and manifest.json
 * into a self-contained plugin folder called `obsidian-gantt-plugin/`
 * ready to be dropped into your vault's .obsidian/plugins/ directory.
 */
import { copyFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const outDir = "obsidian-gantt-plugin";
mkdirSync(outDir, { recursive: true });

const files = [
	["dist/main.js", `${outDir}/main.js`],
	["dist/styles.css", `${outDir}/styles.css`],
	["manifest.json", `${outDir}/manifest.json`],
];

for (const [src, dest] of files) {
	if (existsSync(src)) {
		copyFileSync(src, dest);
		console.log(`✓ Copied ${src} → ${dest}`);
	} else {
		console.warn(`⚠ Skipped missing file: ${src}`);
	}
}

console.log(`\n✅ Plugin ready in ./${outDir}/`);
console.log(`   Copy it to: <YourVault>/.obsidian/plugins/obsidian-gantt/`);
