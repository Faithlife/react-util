const path = require('path');
const nodeExternals = require('webpack-node-externals');

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
