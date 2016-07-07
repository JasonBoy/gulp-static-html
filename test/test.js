var template = require('nunjucks');

var result = template.render('test.html', {name: 'jason'});

console.log(result);