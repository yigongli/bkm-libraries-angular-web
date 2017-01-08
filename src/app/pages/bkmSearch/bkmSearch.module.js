/**
 * Created by gurihui on 2016/12/30.
 */
(function () {
    'use strict';

    angular.module('bkm.pages.bkmSearch', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('bkmSearch', {
                url: '/bkmSearch',
                templateUrl: 'app/pages/bkmSearch/bkm.search.main.html',
                title: 'bkm-search 指令',
                controller: 'bkmSearchCtrl',
                controllerAs: 'ctrl',
                sidebarMeta: {
                    icon: 'fa fa-rmb',
                    order: 1
                }
            });
    }
})();
