'user strict';

var generators  = require('yeoman-generator'),
          chalk = require('chalk'),
          yosay = require('yosay')
          _     = require('lodash');

module.exports = generators.Base.extend({

  constructor:function(){
    generators.Base.apply(this,arguments);
  },
  initializing:function(){
  },
  prompting:function(){
    this.log(yosay('Welcome to '+chalk.yellow('H web boilerplate')+')'));
    return this.prompt(
    [
      {
        name:'title',
        message: 'Enter title your site',
        type:'input',
        default: 'Xuan Hoa'
      },
      {
        name:'prefix',
        message: 'Enter prefix class',
        type:'input',
        default: 'xh',
        store: true
      },
      {
        type: 'checkbox',
        name: 'libs',
        message: 'Which would you like to include ?',
        choices:[
          {
            name:'Bootstrap',
            value: 'bootstrap',
            checked: true
          },
          {
            name:'Wow js',
            value: 'wow',
            checked: true
          },
        ]
      },
      {
        name:'gulp',
        message:'Do you want install gulp ?',
        type:'confirm',
        default:false
      }
    ]).then(function(answers){

      this.title     = answers.title;
      this.bootstrap = _.includes(answers.libs,'bootstrap');
      this.gulp      = answers.gulp;
      this.prefix    = answers.prefix;
      this.wow       = _.includes(answers.libs,'wow');;

    }.bind(this));
  },
  configing:function(){
  },
  writing:{ 
    gulpfile:function(){
      this.copy('_gulpfile.js','gulpfile.js');
      this.copy('_gulpconfig.js','gulpconfig.js');
    },
    packageJSON:function(){
      this.copy('_package.json','package.json');
    },
    git:function(){
      this.composeWith('common', {
         options: {
            'skip-messages': true,
            gitignore: true,
            gitattributes: true,
            jshintrc: false,
            editorconfig: false,
            'test-jshintrc' : false
          } 
      },
      {
          local: require.resolve('generator-common')
      });
    },
    appStaticFiles:function(){

      this.directory('favicon','favicon');
      this.directory('assets/fonts/opensans','assets/fonts/opensans');

      if(this.bootstrap){
        this.copy('assets/fonts/glyphicons-halflings-regular.eot','assets/fonts/glyphicons-halflings-regular.eot');
        this.copy('assets/fonts/glyphicons-halflings-regular.svg','assets/fonts/glyphicons-halflings-regular.svg');
        this.copy('assets/fonts/glyphicons-halflings-regular.ttf','assets/fonts/glyphicons-halflings-regular.ttf');
        this.copy('assets/fonts/glyphicons-halflings-regular.woff','assets/fonts/glyphicons-halflings-regular.woff');
        this.copy('assets/fonts/glyphicons-halflings-regular.woff2','assets/fonts/glyphicons-halflings-regular.woff2');
      }
      
      this.copy('assets/fonts/slick.eot','assets/fonts/slick.eot');
      this.copy('assets/fonts/slick.eot','assets/fonts/slick.svg');
      this.copy('assets/fonts/slick.eot','assets/fonts/slick.ttf');
      this.copy('assets/fonts/slick.eot','assets/fonts/slick.woff');

      this.directory('assets/images','assets/images');
      this.copy('_robots.txt','robots.txt');

      if(this.bootstrap){
        this.directory('vendors/bootstrap','vendors/bootstrap');
      }

      this.directory('vendors/jquery','vendors/jquery');
      this.directory('vendors/slick','vendors/slick');
      this.directory('vendors/smoothscroll','vendors/smoothscroll');

      if(this.wow){
        this.directory('vendors/wow','vendors/wow');
      }
      
    },
    scripts:function(){

      if(this.wow){
        this.checkwow = '/* Wow js\n    -------------------------------------------------------------------------- */\n    ';
        this.checkwow += 'new WOW().init();';
      }

      this.fs.copyTpl(
        this.templatePath('assets/js/main.js'),
        this.destinationPath('assets/js/main.js'),
        {
          prefix:this.prefix,
          checkwow: this.checkwow || ''
        }
      );

    },
    html:function(){

      if(this.wow){
        this.classwow = 'class="wow fadeInUp"';
      }

      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('index.html'),
        {
          title:this.title,
          prefix:this.prefix,
          classwow:this.classwow || ''
        }
      );
    },
    scss:function(){
      
      this.directory('assets/scss/abstracts','assets/scss/abstracts');
      this.directory('assets/scss/pages','assets/scss/pages');
      this.copy('assets/scss/layout/_footer.scss','assets/scss/layout/_footer.scss');
      this.copy('assets/scss/vendor/_animate.scss','assets/scss/vendor/_animate.scss');
      this.copy('assets/scss/vendor/_slick-theme.scss','assets/scss/vendor/_slick-theme.scss');
      this.copy('assets/scss/vendor/_slick.scss','assets/scss/vendor/_slick.scss');

      if(!this.bootstrap){

        this.copy('assets/scss/vendor/_normalize.scss','assets/scss/vendor/_normalize.scss');
        this.checkbootstrap = '\'vendor/normalize\',';
        this.containerClass = "\n.container {\n  max-width: $max-width;\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px;\n  width: 100%;\n}\n\n.container:before {\n  content: '';\n  display: table;\n}\n\n.container:after {\n  content: '';\n  display: table;\n  clear: both;\n}";
        this.clearfixClass = "\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: table;\n}\n\n.clearfix:after{\n  clear: both;\n}\n";

      }else{

        this.checkbootstrap = '\'vendor/bootstrap\',\n\t\'vendor/bootstrap-theme\',';
        this.copy('assets/scss/vendor/_bootstrap.scss','assets/scss/vendor/_bootstrap.scss');
        this.copy('assets/scss/vendor/_bootstrap-theme.scss','assets/scss/vendor/_bootstrap-theme.scss');

      }


      this.fs.copyTpl(
        this.templatePath('assets/scss/base/_base.scss'),
        this.destinationPath('assets/scss/base/_base.scss'),
        {
          containerClass:this.containerClass || ''
        }
      );

      this.fs.copyTpl(
        this.templatePath('assets/scss/base/_helpers.scss'),
        this.destinationPath('assets/scss/base/_helpers.scss'),
        {
          clearfixClass:this.clearfixClass || ''
        }
      );

      this.fs.copyTpl(
        this.templatePath('assets/scss/layout/_header.scss'),
        this.destinationPath('assets/scss/layout/_header.scss'),
        {
          prefix:this.prefix
        }
      );

      this.fs.copyTpl(
        this.templatePath('assets/scss/main.scss'),
        this.destinationPath('assets/scss/main.scss'),
        {
          checkbootstrap:this.checkbootstrap,
        }
      );

    }

  },
  conflicts:function(){
  },
  install:function(){
    if(this.gulp){
      // this.installDependencies();
      this.npmInstall();
    }
  },
  end:function(){
    
    this.log(chalk.yellow.bold('Installation succesful!'));

    var howToInstall = '\n After running'+chalk.yellow.bold(' npm install')+
    ',run project by running ' +
    chalk.yellow.bold('gulp serve')+
    '.';
    if(!this.gulp){
      this.log(howToInstall);
    }
  }

})