module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'kyryrlopysanka@gmail.com',
                token: '3a1d0f09-f3d0-41bd-9a01-ec26e65d7bbb',
                branch: 'default',
                //server: 'season'
            },
            dist: {
                src: ['dist/*.js']
            }
        }
    });
}