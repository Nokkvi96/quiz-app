module.exports = {
  convertColors: {
    currentColor: true,
  },
  js2svg: {
    indent: 2, // string with spaces or number of spaces. 4 by default
    pretty: true, // boolean, false by default
  },
  icon: true,
  plugins: [
    // set of built-in plugins enabled by default
    "preset-default",
    // enable built-in plugins by name
    "prefixIds",
  ],
};
