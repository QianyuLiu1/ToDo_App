// Load libraries
import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';

import AppController from 'src/AppController';
import Users from 'src/users/Users';
import Todome from 'src/todome/Todome';

export default angular.module( 'starter-app', [ 'ngMaterial', Users.name, Todome.name ] )
  .config(($mdIconProvider, $mdThemingProvider) => {
    // Register the user `avatar` icons
    $mdIconProvider
      .defaultIconSet("./assets/svg/avatars.svg", 128)
      .icon("menu", "./assets/svg/menu.svg", 24)
      .icon("share", "./assets/svg/share.svg", 24)
      .icon("google_plus", "./assets/svg/google_plus.svg", 24)
      .icon("hangouts", "./assets/svg/hangouts.svg", 24)
      .icon("twitter", "./assets/svg/twitter.svg", 24)
      .icon("phone", "./assets/svg/phone.svg", 24)
      .icon("plus", "./assets/svg/plus.svg", 24)
      .icon("delete", "./assets/svg/delete.svg", 24)
      .icon("CheckBox0", "./assets/svg/CheckBox0.svg", 24)
      .icon("CheckBox1", "./assets/svg/CheckBox1.svg", 24)
      .icon("left", "./assets/svg/left.svg", 24);
      

    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('red');
  })
  .controller('AppController', AppController);
