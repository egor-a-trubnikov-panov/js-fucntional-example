const path = require('path');

module.exports = {
   context: path.resolve(__dirname, './src'),
   entry: {
      app: './languageSelectorImperative.js',
   },
   output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
   },
};
