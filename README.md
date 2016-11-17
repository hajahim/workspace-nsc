# Sky Starter Kit

[![build status](http://git.proximity.fr/proximity-mauritius/sky-starter-kit/badges/develop/build.svg)](http://git.proximity.fr/proximity-mauritius/sky-starter-kit/commits/develop)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg)](https://github.com/RichardLitt/standard-readme)

> This project provides a starter-kit for every possible Front-End project using Gulp and Express.js.

* Express.js provide a strong structure for routing
* Gulp 4 (actually in alpha) is used as task manager
* Pug compilation to HTML
* PostCSS is used to compile the CSS (PreCSS, CSSNano and CSSNext are ready)
* Automatic Linter for PostCSS, JavaScript and Pug
* JavaScript Unit testing with Mocha with few examples

## Features



## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

To get you started you can simply clone the angular-seed repository and install the dependencies:

* git clone --depth 1 http://git.proximity.fr/proximity-mauritius/sky-starter-kit (--depth 1 removes all but one .git commit history)

### Update your Gulp globally

```
npm uninstall -g gulp
```

```
npm install -g gulp-cli
```

### Running the Application with Docker

1. Install Docker Toolbox ([http://docker.com/toolbox](http://docker.com/toolbox))
2. Start the Docker QuickStart Terminal
3. Navigate to this application's root folder in the terminal window
4. Run docker-compose build to build the images
5. Run docker-compose up to run the containers
6. Navigate to http://192.168.99.100:3000 in a browser

## Usage

### Tasks

#### Task Listing

* `gulp help`

    Displays all of the available gulp tasks.

#### Code Analysis

* `gulp vet`

    Performs static code analysis on all javascript files. Runs jshint and jscs.

#### Testing

* `gulp test`

    Runs all unit tests using karma runner, mocha, chai and sinon with phantomjs. Depends on vet task, for code analysis.

#### Cleaning Up

* `gulp clean`

    Remove all files from the build and temp folders

* `gulp clean-images`

    Remove all images from the build folder

* `gulp clean-code`

    Remove all javascript and html from the build folder

* `gulp clean-fonts`

    Remove all fonts from the build folder

* `gulp clean-styles`

    Remove all styles from the build folder

#### Fonts and Images

* `gulp fontsTask`

    Copy all fonts from source to the build folder

* `gulp imagesTask`

    Copy all images from source to the build folder

#### Styles

* `gulp stylesTask`

    Compile with PostCSS files to CSS, add vendor prefixes, and copy to the build folder

#### Serving Development Code

* `gulp serve-dev`

    Serves the development code and launches it in a browser. The goal of building for development is to do it as fast as possible, to keep development moving efficiently.

#### Building Production Code

* `gulp build`

    Copies all fonts, copies images and runs `gulp optimize` to build the production code to the build folder.

#### Serving Production Code

* `gulp serve-build`

    Serve the optimized code from the build folder and launch it in a browser.

## Contribute

See [the contribute file](contribute.md)!

PRs accepted.

Small note: If editing the Readme, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

### Git branching model

This repo branching model is inspired by Git Flow. Currently we have these types of branches:

* master - Latest release, stable
* develop - Main development, unstable
* release/ - Release archive
* feature/ - Specific features development
* example/ - Helpful examples
* hotfix/ - Emergency fixes for latest release

Read the Git [Flow reference](http://nvie.com/posts/a-successful-git-branching-model/). This repo uses [Semantic Versioning](http://semver.org/).

## License

[MIT © David Dias.](../LICENSE)
