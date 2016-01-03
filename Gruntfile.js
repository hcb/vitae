module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        path: {
            dist: 'dist',
            src: 'src'
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>', '<%= sass.files %>]', '**/*.scss'],
            tasks: ['jshint', 'sass', 'build'],
            options: {
                livereload: true,
            }
        },
        sass: {
    		build: {
    			files: {
    				'<%= path.src %>/css/main.css' : '<%= path.src %>/css/main.scss'
    			}
    		}
    	},
        concat: {
            options: {
                separator: ';'
            },
            build: {
                src: ['<%= path.src %>/**/*.js'],
                dest: '<%= path.dist %>/main.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %>|<%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            build: {
                files: {
                    '<%= path.dist %>/js/<%= pkg.name %>.min.js': ['<%= concat.build.dest %>']
                }
            }
        },
        cssmin: {
            build: {
                files: {
                    '<%= path.dist %>/css/main.min.css': [ '<%= path.dist %>/css/main.css' ]
                }
            }
        },
        clean: {
            build: {
                src: [ '<%= path.dist %>/**/*' ]
            }
        },
        copy: {
            build: {
                  cwd: '<%= path.src %>',
                  src: ['**/*', '!**/*.scss'],
                  dest: '<%= path.dist %>',
                  expand: true
            }
        },
        express: {
            all: {
                options: {
                    port: 8000,
                    hostname: "0.0.0.0",
                    bases: '<%= path.src %>'
                }
            }
        },
        open: {
            all: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= express.all.options.port%>/index.html'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('dev', ['jshint', 'sass', 'concat', 'express', 'open', 'watch']);
    grunt.registerTask('build', ['clean', 'sass', 'concat', 'uglify', 'cssmin', 'clean', 'copy', 'watch']);

};
