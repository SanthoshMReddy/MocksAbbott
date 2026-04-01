module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Cache-busting: expose build timestamp as global data
  eleventyConfig.addGlobalData("cacheBust", Date.now());

  // Filter: split string by delimiter
  eleventyConfig.addFilter("split", function(str, delimiter) {
    return str ? str.split(delimiter) : [];
  });

  // Filter: convert hex to RGB values for rgba() usage
  eleventyConfig.addFilter("hexToRgb", function(hex) {
    if (!hex) return "0,0,0";
    hex = hex.replace("#", "");
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return r + "," + g + "," + b;
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
