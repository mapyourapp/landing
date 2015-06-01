var pkgjson = require('./package.json');
// require('load-grunt-tasks')(grunt);

var config = {
  pkg: pkgjson,
  app: 'app',
  // dist: 'dist'
}
module.exports = function (grunt) {
  // Configuration
  grunt.initConfig({
    config: config,
    pkg: config.pkg,
    bower: grunt.file.readJSON('.bowerrc'),
    babel: {
      options: {
        sourceMap: false
      },
      dist: {
        expand: true,
        flatten: true,
        cwd: 'app',
        src: ['**/*.jsx', 'policy/**.jsx', 'common/**/**/*.jsx'],
        dest: 'app/dist',
        ext: '.js'
      }
    },
    browserify: {
      dist: {
        files: {
          'app/vendor/module.js': ['app/common/module.js'],
        },
      }
    },
    shell: {
      list: {
        command: "ls"
      }
    },
    karma: {
      options: {
        configFile: 'app/spec/karma-shared.conf.js',
        cwd: 'app',
      },
      build: {
        files: {
          src: [
          '<%= meta.bowerComponents %>',
          '<%= meta.distFiles %>',
            // '<%= meta.other %>',
            '<%= meta.testSupport %>',
            '<%= meta.unitTests %>'
            ]
          }
        },
        unit: {
          singleRun: true,
          browsers: ['PhantomJS_without_security'],
        // files: '<%= karma.build.files %>'
      },
      debug: {
        singleRun: false,
        debug: true,
        browsers: ['Chrome_without_security']
      }
    },
    less: {
      dist: {
        expand: true,
        flatten: true,
        cwd: 'app',
        src: ['stylesheets/less/paysavvy-selectize.less'],
        dest: 'app/stylesheets/',
        ext: '.css'
      }
    },
    removelogging: {
      dist: {
        src: "js/application.js",
        dest: "js/application-clean.js",

        options: {
          // see below for options. this is optional. 
        }
      }
    },
    ngconstant: {
      // Options for all targets
      options: {
        space: '  ',
        wrap: '"use strict";\n {%= __ngModule %}',
        name: 'portside.config',
      },
      // Environment targets
      development: {
        options: {
          dest: 'app/dist/config.js'
        },
        constants: {
          ENV: {
            name: 'development',
            apiEndpoint: 'http://localhost:3000'
          },
          APIURL: 'http://localhost:3000'
        }
      },
      test: {
        options: {
          dest: 'app/dist/config.js'
        },
        constants: {
          ENV: {
            name: 'test',
            apiEndpoint: 'http://localhost:1234'
          },
          APIURL: 'http://localhost:1234'
        }
      },
      staging: {
        options: {
          dest: 'app/dist/config.js'
        },
        constants: {
          ENV: {
            name: 'staging',
            apiEndpoint: 'http://abbott-dev.elasticbeanstalk.com/'
          },
          APIURL: 'http://abbott-dev.elasticbeanstalk.com/',
        }
      },
      production: {
        options: {
          dest: 'app/dist/config.js'
        },
        constants: {
          ENV: {
            name: 'production',
            apiEndpoint: 'http://abbott.services.paysavvy.com'
          },
          APIURL: 'http://abbott.services.paysavvy.com',
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      'less-compile': {
        files: ['app/stylesheets/less/paysavvy-selectize.less'],
        tasks: ['less']
      },
      browserify: {
        files: ['app/common/*.js'],
        tasks: ["browserify"]
      }
    },
  });

grunt.registerTask('default', [
  "babel", 'less', 'ngconstant:development', 'browserify'
  ]);
grunt.registerTask('build', [
  'default','ngconstant:production'
  ]);
grunt.registerTask('staging', [
  'default','ngconstant:staging'
  ]);

grunt.registerTask('startPactServer', [
  'shell:startPactGem']);

grunt.registerTask('pactTest', [
  'ngconstant:test', 'karma:unit', 'ngconstant:development'
  ]);

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-shell');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-ng-constant');
grunt.loadNpmTasks('grunt-babel');
grunt.loadNpmTasks('grunt-karma');
grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks("grunt-remove-logging");

};
