/**
 * @author v.lugovsky
 * created on 15.12.2015
 */
(function () {
    'use strict';

    angular.module('bkm.theme', [
        'toastr',
        'bkm.theme.components',
        'bkm.theme.bkmAlter'
    ]).config(bkmConfig)
        .factory('httpInterceptor', httpInterceptor);

    function bkmConfig($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
        $httpProvider.defaults.withCredentials = true;
        // $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
    }//http 请求拦截器
    function httpInterceptor($q, $window, webApiUrl) {
        return {
            request: function (config) {
                //webApi 请求时带上 token
                // if ((/^http:\/\/api.bkm.com\/webapi\/api\//ig).test(config.url) && window.localStorage.getItem('token')) {
                //     config.headers = config.headers || {};
                //     config.headers.token = "Bearer " + window.localStorage.getItem('token');
                // }

                //config.headers = config.headers || {};
                //if ($localStorage.token) {
                //    config.headers.token = $localStorage.token;
                //}
                //console.log(config);
                //console.log('请求拦截器 =======request=======');
                return config;
            },
            requestError: function (config) {
                //console.log(config);
                //console.log('请求拦截器 =======requestError=======');
                return $q.reject(config);
            },
            response: function (response) {
                //if (response.status == 200) {
                //    // console.log('do something...');
                //}
                //console.log(response);
                //console.log('请求拦截器 =======response=======');
                return response || $q.when(response);
            },
            responseError: function (response) {
                if (response.status == 401) {
                    //var rootScope = $injector.get('$rootScope');
                    //var state = $injector.get('$rootScope').$state.current.name;
                    //rootScope.stateBeforLogin = state;
                    //rootScope.$state.go("login");
                    $window.location.replace(webApiUrl.loginPath);
                    return $q.reject(response);
                } else if (response.status === 404) {
                    alert("404!");
                    return $q.reject(response);
                }
                //console.log(response);
                //console.log('请求拦截器 =======responseError=======');
                return $q.reject(response);
            }
        };
    }

})();
