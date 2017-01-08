/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('bkm.theme.components')
        .directive('msgCenter', msgCenter);

    /** @ngInject */
    function msgCenter() {
        return {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/theme/components/msgCenter/msgCenter.html',
            controller: 'MsgCenterCtrl'
        };
    }

})();