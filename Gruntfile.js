module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    properties: grunt.file.readJSON('properties.json'),
    /* clean directories */
    clean: ['<%= properties.dist %>', '<%= properties.root %>/.tmp'],
    /* prepares the configuration to transform specific construction (blocks)
    in the scrutinized file into a single line, targeting an optimized version
    of the files (e.g concatenated, uglifyjs-ed ...) */
    useminPrepare: {
      html: '<%= properties.app %>/index.html',
      options: {
        dest: '<%= properties.dist %>/',
      },
    },
    /* html minification */
    htmlmin: {
      dist: {
        // It´s not work, so I use grunt-html-minify
        //options: {
        //  removeComments: true,
        //  collapseWhitespace: true
        //},
        files: [
          {
            expand: true,
            cwd: '<%= properties.app %>/',
            src: ['*.html'],
            dest: '<%= properties.dist %>/',
          },
        ],
      },
    },
    /* image minification */
    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= properties.app %>/img',
            src: '{,*/}*.{ico,png,jpg,jpeg,gif,webp,svg}',
            dest: '<%= properties.dist %>/img',
          },
        ],
      },
    },
    /* cssmin */
    /* is not necessary to declare */
    /* js file minification */
    uglify: {
      options: {
        preserveComments: false,
      },
    },
    /* create dir fonts */
    // mkdir: {
    //   all: {
    //     options: {
    //       create: ['<%= properties.dist %>/logs', '<%= properties.dist %>/public'],
    //     },
    //   },
    // },
    /* put files not handled in other tasks here */
    copy: {
      dist: {
        files: [
          // {
          //   expand: true,
          //   dot: true,
          //   cwd: '<%= properties.app %>/lib',
          //   dest: '<%= properties.dist %>/lib',
          //   src: ['**'],
          // },
          {
            expand: true,
            dot: true,
            cwd: '<%= properties.app %>/img',
            dest: '<%= properties.dist %>/img',
            src: ['*.xml', '*.json'],
          },
        ],
      },
    },
    /* cache busting */
    rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8,
      },
      files: {
        src: [
          '<%= properties.dist %>/js/{,*/}*.js',
          '<%= properties.dist %>/css/{,*/}*.css', // ,
          // '<%= properties.dist %>/app/img/{,*/}*.{ico,png,jpg,jpeg,gif,webp,svg}'
        ],
      },
    },
    /* replace links to minificated files */
    usemin: {
      html: ['<%= properties.dist %>/index.html'],
      options: {
        dirs: ['<%= properties.dist %>/'],
      },
    },
    /* html minification */
    html_minify: {
      options: {},
      all: {
        files: [
          {
            expand: true,
            cwd: '<%= properties.dist %>/',
            src: ['*.html'],
            dest: '<%= properties.dist %>/',
            ext: '.html',
          },
        ],
      },
    },
    /* commit on gh-pages github */
    'gh-pages': {
      options: {
        base: 'app/',
        message: 'auto-generated commit',
      },
      src: ['**/*'],
    },
  });
  // Loading dependencies
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) {
      grunt.loadNpmTasks(key);
    }
  }
  // tasks
  grunt.registerTask('build', [
    'clean',
    'useminPrepare',
    'htmlmin',
    'imagemin',
    'concat',
    'cssmin',
    'uglify',
    // 'mkdir',
    'copy',
    'rev',
    'usemin',
    'html_minify',
  ]);
  grunt.registerTask('release', ['build', 'gh-pages']);
  grunt.registerTask('default', ['build']);
};
