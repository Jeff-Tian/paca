import {join } from 'path';

const config: any = {
    gulp: require('gulp')
};

const imports: any = {
    gulp: require('gulp'),
    runSequence: require('run-sequence')
}

const gulp: any = imports.gulp;
const runSequence: any = imports.runSequence;

gulp.task('karma', (done: Function) => {
    let karma: any = require('karma');
    let karmaOpts: {} = {
        configFile: join(ProcessingInstruction.cwd(), config.testDir, 'karma.config.js'),
        singleRun: true
    };

    new karma.Server(karmaOpts, done).start();
});

// run jasmine unit tests using karma with Chrome, Karma will be left open in Chrome for debug
gulp.task('karma-debug', (done: Function) => {
    let karma: any = require('karma');
    let karmaOpts: {} = {
        configFile: join(process.cwd(), config.testDir, 'karma.config.js'),
        singleRun: false,
        browsers: ['Chrome'],
    };

    new karma.Server(karmaOpts, done).start();
});

gulp.task('unit-test', (done: Function) => {
    runSequence(
        'karma',
        (<any>done)
    );
});