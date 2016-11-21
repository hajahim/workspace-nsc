export default {
   server: {
    LOCAL: 'http://localhost:3000',
    browserPort: 3002
  },
  fonts: {
    SRC: './app/fonts/**',
    DEST: './build/fonts/'
  },
  styles: {
    SRC: './app/styles/global.scss',
    ALL: './app/styles/**/*.scss',
    DEST: './build/styles/'
  },
  scripts: {
    BOWER: './bower.json',
    SRC: './app/scripts/app.js',
    ALL: [
      './app/scripts/**/*.js',
      './test/*.js',
      './server.js',
      './gulpfile.babel.js',
      '!node_modules/**'
    ],
    DEST: './build/scripts',
    TEST: './test/*.js'
  },
  icon: {
    ALL: 'images/icons/*.svg',
    TEMPLATE: 'styles/template/icons.css',
    GENERATED_CSS: './autogenerated/icon.css',
    AUTO_GENERATED_CSS: './public/fonts/Icons/autogenerated/icon.css',
    STYLE_BASE: 'styles/base',
    DEST: './build/fonts/icons/'
  },
  images: {
    SRC: './app/images/**/*.{jpg,jpeg,png,svg}',
    DEST: './build/images/'
  },
  pug: {
    ALL: './app/views/**',
    MAIN: [
      './app/views/**/*.pug',
      '!./app/views/**/_*.pug',
      '!./app/views/_*/**/*.pug',
      '!./app/views/**/**/_*/*.pug'
    ],
    DEST: './build/html'
  }
};
