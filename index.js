var through = require('through2');
var gutil = require('gulp-util');
var nunjucks = require('nunjucks');
var PluginError = gutil.PluginError;

function gulpStaticHtml(context, options) {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      return cb(null, file);
    }
    if (file.isStream()) {
      cb(new PluginError('gulp-static-html', 'Streaming not supported'));
      return;
    }
    var env = (options && options.env) || new nunjucks.Environment(new nunjucks.FileSystemLoader(file.base), options);

    try {
      file.contents = new Buffer(env.renderString(file.contents.toString(), context));
    } catch (err) {
      this.emit('error', PluginError('gulp-nunjucks', err, {fileName: file.path}));
    }

    cb(null, file);

  });

}

module.exports = gulpStaticHtml;