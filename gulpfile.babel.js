import gulp from 'gulp';
import config from './gulpfile.config.js';

// @group POSTCSS MODULES
import postcss from 'gulp-postcss';
import reporter from 'postcss-reporter';
import stylelint from 'stylelint';
import immutable from 'immutable-css';

// @group GULP MODULES
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import nodemon from 'gulp-nodemon';
import eslint from 'gulp-eslint';
import babel from "gulp-babel";
import cache from 'gulp-cached';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import mocha from 'gulp-mocha';
import shell from 'gulp-shell';
import pug from 'gulp-pug';
import gulppuglint from 'gulp-pug-lint';
import changed from 'gulp-changed';

// @group UTILITY
import browserSync from 'browser-sync';
const reload = browserSync.reload;
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import del from 'del';
import transform from 'vinyl-transform';
import babelify from 'babelify';

// Monitoring configuration
import firebase from 'firebase-tools';
import packageJson from './package.json';
import moment from 'moment';
import jsonfile from 'jsonfile';
import puglint from 'pug-lint';
import childProcess from 'child_process';
import os from 'os';

// [1] Autoprefixer is already injected into CssNext
// [2] TODO : Find another way do disable if we use a CSS framework

// ########################################

const gs = gulp.series;
const gp = gulp.parallel;

const project = {
  app: require('./bower.json').appPath || 'app',
  dist: 'build',
  tmp: '.tmp'
};

// ########################################

export function lintPugTask (done) {
  return gulp.src(config.pug.MAIN)
    .pipe(plumber((error) => {
      console.log(error);
      this.emit('end');
    }))
    .pipe(gulppuglint())
    .pipe(reload({ stream: true }))
    .on('end', () => {
      done();
    });
}

export function htmlTask (done) {
  return gulp.src(config.pug.MAIN)
    .pipe(plumber((error) => {
      console.log(error);
      this.emit('end');
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(config.pug.DEST))
    .on('end', () => {
      done();
    });
}

// ########################################

export function lintStylesTask (done) {
  return gulp.src(config.styles.ALL)
    .pipe(plumber((error) => {
      console.log(error);
      this.emit('end');
    }))
    .pipe(cache('css'))
    .pipe(postcss([
      stylelint(),
      reporter({
        clearMessages: true
      })
    ]))
    .on('end', () => {
      done();
    });
}

export function stylesTask (done) {
  const processors = [
    require('lost'),
    require('postcss-normalize'), // [2]
    require('cssnano')({
      autoprefixer: false, // [1]
      discardComments: { removeAll: true }
    }),
    require('postcss-cssnext')({
      browsers: ['> 5%', 'ie >= 10', 'Firefox < 20', 'ios 6', 'android 4']
    })
  ];
  return gulp.src(config.styles.SRC)
    .pipe(plumber((error) => {
      console.log(error);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(processors))
      .pipe(rename({
        suffix: '.min'
      }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.styles.DEST))
    .pipe(reload({ stream: true }))
    .on('end', () => {
      done();
    });
}

// ########################################

export function imagesTask () {
  return gulp.src(config.images.SRC, { since: gulp.lastRun(imagesTask) })
    .pipe(plumber((error) => {
      console.log(error);
      this.emit('end');
    }))
    .pipe(changed(config.images.DEST))
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      optimizationLevel: 5
    }))
    .pipe(gulp.dest(config.images.DEST))
    .pipe(reload({ stream: true }));
}

export function svgsprite () {

}
// ########################################


export function javaScriptTask() {

  watchify.args.debug = true;

  var bundler;

  const getBundler = () => {
    if (!bundler) {
      bundler = watchify(browserify(config.scripts.SRC, watchify.args));
    }
    return bundler;
  };

  const rebundle = () => {
    return getBundler()
      .transform(babelify)
      .bundle()
      .on('error', function(err) { console.log('Error: ' + err.message); })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({
          suffix: '.min'
        }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.scripts.DEST))
      .pipe(reload({ stream: true }));
  }

  getBundler().on('update', rebundle);

  return rebundle();
}

/** ESlint */
export function lintJavaScript (done) {
  return gulp.src(config.scripts.ALL)
    .pipe(plumber((error) => {
      console.log(error);
      this.emit('end');
    }))
    .pipe(cache('scripts'))
    .pipe(eslint({
      useEslintrc: true,
      configFile: './.eslintrc'
    }))
    .pipe(eslint.formatEach())
    .on('end', () => {
      done();
    });
}

export function testTask (done) {
  return gulp.src(config.scripts.TEST, {
    read: false
  })
  .pipe(mocha()).on('error', done)
  .on('end', () => {
    done();
  });
}

// ########################################

export function copyFonts () {
  return gulp.src(config.fonts.SRC)
    .pipe(changed(config.fonts.DEST))
    .pipe(gulp.dest(config.fonts.DEST));
}

export function cleanBuild () {
  return del([
    './build'
  ]);
}

// ########################################

export function serverTask (cb) {
	let started = false;

  return nodemon({
    script: './server.js',
    ext: 'js',
    watch: [
      'gulpfile.babel.js',
      'server.js'
    ],
    ignore: [
      './node_modules/',
      './bower_components',
      './build/**/*'
    ],
    env: {
      'NODE_ENV': 'development',
      'DEBUG': 'appname:*'
    }
  })
  .on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  })
  .on('crash', () => {
    // console.log('nodemon.crash');
  })
  .on('restart', () => {
    // console.log('nodemon.restart');
  })
  .once('quit', () => {
    // handle ctrl+c without a big weep
    process.exit();
  });
}

// ########################################

export function browserTask () {
  browserSync.init(null, {
    proxy: config.server.LOCAL,
    port: config.server.browserPort,
    open: true,
    logFileChanges: true,
    logConnections: false,
    injectChanges: true,
    timestamps: false,
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: false
    }
  });
}

// ########################################

export function monitoring (callback) {
  // Empty jsonfile

  let nbrErrorJade;
  let nbrErrorJS;
  let nbrErrorCSS;
  let nbrWarningJS;

  const idComputer = os.hostname();
  const nameProject = packageJson.name;
  const firebaseToken = '1/NEpgg17d3mIGjrlH2iruYX8t2Jkm5qH0hN-eg8DbWWM';
  const firebaseData = './firebase-data.json';

  const currentTime = moment().format();

  // Ask prompt if idComputer is different and ask if good projectName

  stylelint.lint({
    files: config.styles.SRC,
  })
  .then((data) => {
    const dataOutput = data.output;
    const dataFormat = dataOutput.match(/\{[^]*\}/gm);
    const errorCSS = JSON.parse(dataFormat);

    nbrErrorCSS = errorCSS.warnings.length;
  })
  .then(() => {
    // In progress
    const CLIpug = require('pug-lint');

    const cli = new CLIpug({
      _basePath: '.'
    });
  })
  .then(() => {
    const CLIEngine = require('eslint').CLIEngine;
    const cli = new CLIEngine({
      useEslintrc: true,
      configFile: './.eslintrc',
    });
    const report = cli.executeOnFiles(config.scripts.ALL);

    nbrErrorJS = report.errorCount;
    nbrWarningJS = report.warningCount;
  })
  .then(() => {
    const nbrErrorJade = 'undefined';

    const obj = {
      'computerId': idComputer,
      'nbrErrors': {
        'errorCss': nbrErrorCSS,
        'errorJade': nbrErrorJade,
        'warningJs': nbrWarningJS,
        'errorJs': nbrErrorJS
      },
      'currentTime': currentTime
    };

    jsonfile.writeFile(firebaseData, obj, { spaces: 2 }, (err) => {
      // console.error(err)
    });
  })
  .then(() => {
    // firebase login
    childProcess.exec('firebase database:push /' + nameProject + ' firebase-data.json', (error, stdout, stderr) => {
      // console.log(stdout);
    });
  })
  .catch((err) => {
    console.error(err.stack);
  });
}

// ########################################

export function watchTask (done) {
  gulp.watch(config.fonts.ALL, gp(copyFonts));
  gulp.watch(config.styles.ALL, gp(css));
  gulp.watch(config.scripts.ALL, gp(lintJavaScript, testTask));
  gulp.watch(config.pug.ALL, gp(lintPugTask));
  gulp.watch(config.images.SRC, gp(imagesTask));
  done();
}

// ########################################

// Clearing the whole CSS and JS files
cache.caches = {};

const lint = gs(lintStylesTask, lintJavaScript);
export { lint };

const css = gs(lintStylesTask, stylesTask);
export { css };

const js = gs(lintJavaScript, javaScriptTask);
export { js };

// Global tasks
const serve = gs(gp(browserTask, serverTask, htmlTask, css, js, monitoring, watchTask), (done) => {
  done()
});
export { serve };

const build = gs(gp(cleanBuild, copyFonts, imagesTask, htmlTask, css, js, testTask, (done) => {
  done();
}));
export { build }

const check = gs(gp(lintPugTask, js, testTask, (done) => {
  done();
}));
export { check }

export default build;
