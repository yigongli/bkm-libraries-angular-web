/**
 * Created by gurihui on 2016/12/30.
 */
(function () {
    'use strict';

    angular.module('bkm.pages.bkmSearch')
        .service('bkmSearchService', bkmSearchService)

    /** @ngInject */
    function bkmSearchService($q, bkmApiService) {

        //getData获取数据的函数
        function getData(start, number, params) {
            var sort = '';
            if (!!params.sort.predicate) {
                sort = params.sort.predicate + (params.sort.reverse ? ' desc' : '');
            }
            var search = angular.extend({}, params.search);
            for (var i in search) {
                if (!!!search[i]) {
                    delete search[i];
                }
            }
            var deferred = $q.defer();

            bkmApiService.get(
                '/api/priceList',
                angular.extend({
                    pageIndex: start,
                    pageSize: number
                }, params.search, {sort: sort}),
                function (result) {
                    deferred.resolve(result);
                },
                function () {
                }
            )

            return deferred.promise;
        }

        function importFile(formData) {

            //var deferred = $q.defer();
            //bkmWebApiService.importFile(
            //    formData,
            //    function (result) {
            //        deferred.resolve(result);
            //    }, function (result) {
            //        deferred.reject(result);
            //    });
            //return deferred.promise;
        }

        return {
            getData: getData,
            importFile: importFile,
        };
    }
})();