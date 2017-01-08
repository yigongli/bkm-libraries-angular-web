/**
 * Created by k.danovsky on 13.05.2016.
 */

(function () {
  'use strict';

  angular.module('bkm.theme')
    .config(config);

  /** @ngInject */
  function config(baConfigProvider, colorHelper) {
    baConfigProvider.changeTheme({blur: false});
    
    baConfigProvider.changeColors({
     default: 'rgba(#000000, 0.2)',
     defaultText: '#ffffff',
     dashboard: {
       white: '#ffffff',
     },
    });
  }
})();
