'user strict';

module.exports = function(){
  var base = '';
  var config = {
    base : base,
    js_vendors  :  [
      base + 'vendors/jquery/jquery-1.12.4.min.js',
      base + 'vendors/**/*.js',
    ],
    js : [
      base + 'assets/js/main.js'
    ],
    build_js: './' + base + 'assets/js/',
    css: [
      base + 'assets/css/*.css',
    ],
    scss: [
      base + 'assets/scss/**/*.scss',
    ],
    build_scss: './' + base + 'assets/css/',
    img: [
      base + 'assets/images/*.png',
      base + 'assets/images/*.jpg'
    ],
    build_img: './'+ base + 'assets/images/'
  };
  return config;
};

