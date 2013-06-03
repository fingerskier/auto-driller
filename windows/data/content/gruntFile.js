'use strict';
var path = require('path')
,   grunt = require('grunt');

module.exports = function(grunt) {
  return grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jade: {
      product: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          "index.html": ["jade/index.jade"]
        }
      }
    },
    stylus: {
      product: {
        files: {
          'css/main.css': 'stylus/*.styl'
        }
      }
    },
    concat: {
      options: {
        separator: ";"
      },
      product: {
        src: ['js/angular.js', 'js/bootstrap.js', 'js/application.js', 'js/controllers/main.js', 'js/directives/autoScroll.js', 'js/directives/fadeAfter.js', 'js/filters/interpolate.js', 'js/services/socket.js'],
        dest: 'js/script.js'
      }
    },
    uglify: {
      product: {
        files: {
          'js/script.js': 'js/script.js'
        }
      }
    },
    watch: {
      gruntfile: {
        files: 'gruntFile.js',
        tasks: ['jshint:gruntfile'],
      },
      jade: {
        files: ["jade/*.jade"],
        tasks: ["jade"]
      },
      scripts: {
        files: ['**/*.js'],
        tasks: ["jshint"]
      },
      stylus: {
        files: ["stylus/*.styl"],
        tasks: ["stylus"]
      }
    }
  });
};

grunt.loadNpmTasks("grunt-contrib-jade");
grunt.loadNpmTasks("grunt-contrib-stylus");
grunt.loadNpmTasks("grunt-contrib-concat");
grunt.loadNpmTasks("grunt-contrib-uglify");
grunt.loadNpmTasks("grunt-contrib-watch");
grunt.loadNpmTasks("grunt-contrib-jshint");

grunt.registerTask("default", ["jade", "stylus"]);
grunt.registerTask("product", ["stylus", "jade", "concat", "uglify"]);