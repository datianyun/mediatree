const fs = require('fs-extra')
const debug = require('debug')('app:bin:compile')
const webpackCompiler = require('../build/webpack-compiler')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')
const upload = require('tcms-file-upload');
const paths = config.utils_paths
const fileSystem = require('fs')
const compile = () => {
  debug('Starting compiler.')
  return Promise.resolve()
    .then(() => webpackCompiler(webpackConfig))
    .then(stats => {
        if (stats.warnings.length && config.compiler_fail_on_warning) {
            throw new Error('Config set to fail on warning, exiting with status code "1".')
        }
        debug('Copying static assets to dist folder.')
        fs.copySync(paths.client('static'), paths.dist())
    })
    .then(() => {
        debug('Compilation completed successfully.')
    })
    .then(() => {
        fileSystem.readdir(paths.dist(), function(err, files) {
            if (err) {
                debug('read dir error');
            } else {
                files.forEach(function(item) {
                    var tmpPath = paths.dist() + '/' + item;
                    fileSystem.stat(tmpPath, function(err1, stats) {
                        if (err1) {
                            console.log('stat error');
                        } else {
                            upload({
                                cookie : fileSystem.readFileSync('config/cookie.md', 'utf8'),
                                file : tmpPath,
                                path : '2016/mediatree/'
                            }, function(err){
                                if(err){
                                    console.log(err);
                                }else{
                                    console.log('Upload success' + tmpPath);
                                }
                            });
                        }
                    })
                });
            }
        });

    })
    .catch((err) => {
        debug('Compiler encountered an error.', err)
        process.exit(1)
    })
}

compile()
