var getWatchers = require('getWatchers');
var pkg = require('./package.json');

module.exports = function(grunt) {
  "use strict";
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bumpup: {
      options: {
        updateProps: {
          pkg: 'package.json'
        }
      },
      file: 'package.json'
    },
  watch: {
      dependencies: {
        options: {
          debounceDelay: 5000,
          interrupt: true
        },
        files: getWatchers(pkg),
        tasks: ['test']
      },  
      local: {
        options: {
          debounceDelay: 5000,
          interrupt: true
        },
        files: ['*.js','src/**/*.js', 'test/**/*.js'],
        tasks: ['default']
      }
    },
    jshint: {
      options: {
        browser: true,
        node: true
      },
      all: ['index.js', 'test.js', './src/*.js', './test/*.js']
    },
    simplemocha: {
      options: {
        ui: 'bdd',
        reporter: 'min'
      },
      all: { src: ['test.js'] }
    },
    karma: {
      local: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['Safari'] //, 'Firefox', 'Safari', 'Opera'
      }
    },
    shell: {
      makeStage: {
        command: 'rm -rf stage; mkdir stage',
        options:{
          stdout: true,
          stderr: true,
          failOnError: true
        }
      }
      ,
      makeLib: {
        command: 'rm -rf lib; mkdir lib',
        options:{
          stdout: true,
          stderr: true,
          failOnError: true
        }
      },
      browserify:{
        command: 'node ./node_modules/browserify/bin/cmd.js  --debug -o ./stage/test.js -i domain -e ./test.js;',
        options:{
          stdout: true,
          stderr: true,
          failOnError: true
        }
      }
    }
  });


require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

grunt.registerTask('test', ['jshint', 'simplemocha', 'shell:makeStage','shell:browserify', 'karma']);
grunt.registerTask('development', ['bumpup:prerelease']);
grunt.registerTask('production', ['bumpup:patch']);
};