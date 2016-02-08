var path = require('path');
var webpack = require('webpack');

module.exports = [
	{
		name: 'build',
		context: __dirname,
		entry: path.resolve(__dirname, './src/ReactResponsiveLink.jsx'),
		output: {
			path: path.join(__dirname, 'lib'),
			filename: 'index.js',
			publicPath: '/lib/',
			library: 'ReactResponsiveLink',
			libraryTarget: 'commonjs2',
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
		plugins: [
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.NoErrorsPlugin(),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production'),
			}),
		],
	},
	{
		name: 'demo',
		entry: {
			app: path.resolve(__dirname, 'demo/App.jsx'),
			vendor: ['react', 'react-dom'],
		},
		output: {
			path: path.join(__dirname, 'demo'),
			filename: 'app.js',
		},
		module: {
			loaders: [
				{ test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
			],
		},
		resolve: {
			extensions: ['', '.js', '.jsx'],
		},
		target: 'web',
		plugins: [
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.NoErrorsPlugin(),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production'),
			}),
			//new webpack.optimize.DedupePlugin(),
			new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js'),
			new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }),
		],
	},
];
