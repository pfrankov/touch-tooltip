var banner =
	"   ------------------------------------------------\n"+
	"      💬 TouchTooltip \n"+
	"      Tooltips that works on touch-based devices\n"+
	"   ------------------------------------------------\n"+
	"   Author: Pavel Frankov   twitter: @twenty\n"+
	"   Fork me on Github: https://github.com/pfrankov/touch-tooltip";

console.log(banner);

module.exports = {
	plugins: [
		require("autoprefixer")({
			browsers: ["last 2 versions", "> 1%", "ie >= 7"]
		}),
		require("postcss-csso")({
			comments: false
		}),
		require("postcss-banner")({
			banner: banner
		}),
		require("cssnano")({
			mergeRules: false,
			discardComments: false
		}),
		require("postcss-cssstats")(function (stats) {
			console.log("Size: ", stats.size, ", ", "gzip Size", stats.gzipSize);
		})
	]
};