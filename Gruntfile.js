module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			options: {
				alias: [
					'public/js/src/libs/jquery/jquery-2.0.3.min.js:jQuery',
					'public/js/src/libs/underscore/underscore-1.5.2.js:underscore',
					'public/js/src/libs/backbone/backbone-1.0.0.js:backbone'
					//Put alias here for modules

				],
				shim: {
					jquery: {
						path: 'public/js/src/libs/jquery/jquery-2.0.3.min.js',
						exports: '$'
					},
					backbone: {
						path: 'public/js/src/libs/backbone/backbone-1.0.0.js',
						exports: 'Backbone',
						depends: {
							jquery: 'jquery'
						}
					}
				}
			},
			vendor: {
				src: 'public/js/src/libs/**/*.js',
				dest: 'public/js/build/libs.js'
			},
			dev: {
				src: ['public/js/src/**/*.js', '!public/js/src/libs/**/*.js'],
				dest: 'public/js/build/client.js'
			},
			test: {
				src: 'test/spec/**/*.js',
				dest: 'public/js/build/test.js'
			},
			all: {
				src: 'public/js/src/**/*.js',
				dest: 'public/js/build/main.js'
			}
		},
		uglify: {
			prod: {
				src: ['public/js/build/*.js', '!public/js/build/main.min.js', '!public/js/build/test.js'],
				dest: 'public/js/build/main.min.js'
			}
		},
		concat: {
			dev: {
				src: ['public/js/build/libs.js', 'public/js/build/client.js'],
				dest: 'public/js/build/main.js'
			}
		},
		env: {
			dev: {
				NODE_ENV: 'DEVELOPMENT'
			},
			prod: {
				NODE_ENV: 'PRODUCTION'
			}
		},
		watch: {
			js: {
				files: ['public/js/src/**/*.js'],
				tasks: ['browserify:dev', 'concat:dev']
			},
			test: {
				files: ['public/js/src/**/*.js', 'test/spec/**/*.js'],
				tasks: ['browserify:dev', 'concat:dev', 'browserify:test', 'jasmine']
			}
		},
		nodemon: {
			dev: {
				options: {
					file: 'app.js',
					watchExtensions: ['js', 'json'],
					ignoredFiles: ['node_modules/**', 'public/**']
				}
			}
		},
		concurrent: {
			dev: {
				tasks: ['env:dev', 'watch:js', 'watch:css', 'nodemon'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		jasmine: {
			browser: {
				src: 'public/js/build/main.js',
				options: {
					specs: 'public/js/build/test.js',
					vendor: ['node_modules/sinon/pkg/sinon.js', 'node_modules/chai/chai.js', 'public/js/build/libs.js'],
					outfile: 'test/_SpecRunner.html'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('test', ['watch:test']);
	grunt.registerTask('start', ['concurrent']);
	grunt.registerTask('deploy', ['env:prod', 'browserify:all', 'uglify', 'sass:prod']);
};