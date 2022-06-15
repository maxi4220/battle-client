/*global __dirname */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
	entry: "./src/game.ts",
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				include: [
					path.resolve(__dirname, "src")
				]
			}
		]
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "public")
	},
	mode: "development"
}
