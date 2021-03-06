/*global __dirname */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		app: './src/ts/game.ts'
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/
		}]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ]
	},
	externals: {
		phaser: 'Phaser'
	},
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'public')
	},
	devtool: "source-map",
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: './src/*.html',
					to: '[name][ext]'
				},
				{
					from: './src/*.js',
					to: '[name][ext]'
				},
				{
					from: './src/*.css',
					to: '[name][ext]'
				},
				{
					from: './src/*.ico',
					to: '[name][ext]'
				},
				{
					from: './src/assets',
					to: 'assets',
					globOptions: {
						ignore: [ '*.md' ]
					}
				}
			]
		})
	],
	devServer: {
		open: true
	},
	
	experiments: {
		topLevelAwait: true,
	}
};
