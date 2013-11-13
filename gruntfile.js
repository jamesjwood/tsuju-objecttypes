var getWatchers = require('getWatchers');
var pkg = require('./package.json');

module.exports = function(grunt) {
  "use strict";
  // Project configuration.
  grunt.initConfig({
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
        reporter: 'tap'
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
    },
    bump: {
        options: {},
        files: [ 'package.json']
    }
  });


require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

grunt.registerTask('test', ['jshint', 'simplemocha', 'shell:makeStage','shell:browserify', 'karma']);
grunt.registerTask('default', ['test', 'bump']);
};