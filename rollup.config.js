import babel from 'rollup-plugin-babel';

export default {
  moduleName: 'tsp',
  entry: 'src/js/main.js',
  format: 'umd',
  plugins: [ babel() ],
  dest: 'build/js/bundle.js'
};
