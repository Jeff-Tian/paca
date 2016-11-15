var fs = require('fs');
var sh = require('shelljs');
var gulp = require('gulp');

function getAppVersion() {
    var configXML = fs.readFileSync('./config.xml').toString();
    var flag = '<widget id="com.ionicframework.paca478197" version="';
    var index = configXML.indexOf(flag);
    var index2 = configXML.indexOf('"', index + flag.length);
    var version = configXML.substring(index + flag.length, index2);

    return version;
}

gulp.task('version', function (done) {
    console.log(getAppVersion());
    done();
});

gulp.task('android-release', function (done) {
    var fileName = 'paca_' + getAppVersion() + '.apk';
    var apkPath = '/Users/tianjie/WebstormProjects/paca/platforms/android/build/outputs/apk/android-release-unsigned.apk';

    sh.rm(fileName);

    sh.exec('ionic build --release android', function () {
        sh.exec('jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore -storepass 1050709 ' + apkPath + ' paca', function () {
            console.log('========= jarsigner done with ======');
            console.log(arguments);
            console.log('====================================');
            sh.exec('zipalign -v 4 ' + apkPath + ' ' + fileName, done);
        });
    });
});

gulp.task('android-resign', function (done) {
    var apkPath = './paca_0.0.3.encrypted.apk';
    var fileName = 'paca_' + getAppVersion() + '_360encrypted.apk';

    sh.exec('jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore -storepass 1050709 ' + apkPath + ' paca', function () {
        console.log('========= jarsigner done with ======');
        console.log(arguments);
        console.log('====================================');
        sh.exec('zipalign -v 4 ' + apkPath + ' ' + fileName, done);
    });
});