/**
 * Created by gurihui on 2016/11/30.
 */
(function () {
    'use strict';

    angular.module('bkm.theme')
        .service('bkmApiService', bkmApiService);

    /** @ngInject */
    function bkmApiService($rootScope, $http, $timeout, $q) {
        var self = this;

        // method 可以是：GET/DELETE/HEAD/JSONP/POST/PUT
        // angular传递给then方法的响应对象包括以下几个属性
        // data:转换之后的响应体
        // status:http响应状态码
        // headers:头信息
        // config:生成原始请求的设置对象
        // statusText:http响应状态的文本

        self.get = function httpGet(url, data, successFn, errorFn) {
            _http({
                url: url,
                method: 'get',
                params: data || {}
            }, successFn, errorFn);
        };

        self.post = function httpPost(url, data, successFn, errorFn) {
            _http({
                url: url,
                method: 'post',
                data: data || {}
            }, successFn, errorFn);
        };

        self.uploadFile = function uploadFile(url, formData, successFn, errorFn) {
            _http({
                url: url,
                method: 'post',
                data: formData,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }, successFn, errorFn);
        };

        self.put = function httpPost(url, data, successFn, errorFn) {
            _http({
                url: url,
                method: 'PUT',
                data: data || {}
            }, successFn, errorFn);
        };

        self.delete = function httpPost(url, data, successFn, errorFn) {
            _http({
                url: url,
                method: 'DELETE',
                data: data || {}
            }, successFn, errorFn);
        };

        function _http(config, successFn, errorFn) {
            if ($rootScope.$pageFinishedLoading) {
                $rootScope.httpLoading = true;
            }
            var deferred = $q.defer();
            // $http(angular.extend({}, config, {withCredentials: true})).then(function (result) {
            //     successFn(result.data);
            //     deferred.resolve();
            // }, function (result) {
            //     errorFn(result.data);
            //     deferred.resolve();
            // });
            $http(config).then(function (result) {
                successFn(result.data);
                deferred.resolve();
            }, function (result) {
                errorFn(result.data);
                deferred.resolve();
            });

            deferred.promise.then(function () {
                $timeout(function () {
                    $rootScope.httpLoading = false;
                }, 1000);
            });
        }
    }
})();