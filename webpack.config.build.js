var path = require('path');
var webpack = require('webpack');

var babelConfig = {
	presets: ['es2015', 'stage-0', 'react'],
};

module.exports = {
	context: __dirname,
	entry: path.resolve(__dirname, './src/ReactResponsiveLink.jsx'),
	output: {
		path: path.join(__dirname, 'lib'),
		filename: 'ReactResponsiveLink.js',
		publicPath: '/lib/',
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, loader: 'babel', include: path.join(__dirname, 'src') },
		],
	},
	externals: {
		react: 'react',
		'react-dom': 'react-dom',
	},
	target: 'web',
	debug: true,
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		//new webpack.optimize.DedupePlugin(),
		//new webpack.optimize.UglifyJsPlugin(),
	],
};
