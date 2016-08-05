
module.exports = {
	entry: "./src/slaer",
	output: {
		library: "slaer",
		libraryTarget: "umd",
		path: "./dist",
		filename: "slaer.js"
	},
	devtool: "source-map"
};
