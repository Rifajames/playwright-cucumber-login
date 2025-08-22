module.exports = {
    default: {
      require: [
        "./steps/*.js",
        "./support/hooks.js",
        "./support/world.js"
      ],
      format: [
        "json:./reports/cucumber_report.json",
        "html:./reports/cucumber_report.html"
      ]
    }
  };  