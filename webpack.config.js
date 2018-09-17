const path = require('path');
const nodeExternals = require('webpack-node-externals');
require('es7-object-polyfill'); // jenkins needs this, it runs Node 6

module.exports = {
	entry: {
		main: './src/index.js',
	},
	devtool: 'sourcemap',
	output: {
		filename: '[name].js',
		path: path.resolve('./dist'),
		libraryTarget: 'commonjs-module',
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: [/node_modules/],
			},
		],
	},
};
