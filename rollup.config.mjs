import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" assert { type: "json", };

export default [
	{
		input: "src/main.ts",
		plugins: [
			typescript(),
			terser(),
		],
		output: [
			{ file: pkg.main, format: "cjs", sourcemap: true, },
			{ file: pkg.module, format: "es", sourcemap: true, },
		],
	},
];
