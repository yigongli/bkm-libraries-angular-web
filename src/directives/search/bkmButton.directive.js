/**
 * Created by gurihui on 16/10/8.
 */
(function () {
    'use strict';
    angular.module('bkm.library.angular.web')
        .constant('buttonConfig', {
            categories: ['add', 'edit', 'delete', 'search', 'view', 'save', 'cancel', 'ok', 'close', 'print', 'export', 'refresh', 'submit', 'approve', 'reject','reset'],
            defaultTexts: ['新 增', '编 辑', '删 除', '查 询', '查 看', '保 存', '取 消', '确 定', '关 闭', '打 印', '导 出', '刷 新', '提 交', '同 意', '驳 回','重置'],
            sizeCss: {
                xs: "btn-xs",
                sm: "btn-sm",
                mm: "btn-mm",
                md: "btn-md",
                xm: "btn-xm",
                lg: "btn-lg"
            }
        })
        .directive('bkmButton', function (buttonConfig) {

            return {
                restrict: 'E',
                scope: {
                    category: '@',
                    type: '@',
                    text: '@',
                    size: '@'
                },

                template: '<button class="btn btn-with-icon" ng-class="bkmBtn.buttonCss"><i ng-class="bkmBtn.btnIcon"></i><span></span></button>',
                controller: function () {
                    var mc = this;
                    mc.buttonCss = 'btn-info';
                    mc.btnIcon = 'ion-checkmark';
                },
                controllerAs: 'bkmBtn',
                replace: true,
                link: function ($scope, $elem, $attrs, $ctrl) {

                    $elem.attr('type', $scope.type || 'button');
                    var index = buttonConfig.categories.indexOf($scope.category);
                    switch ($scope.category) {
                        case 'add':
                            $ctrl.buttonCss = 'btn-primary';
                            $ctrl.btnIcon = 'ion-plus-round';
                            break;
                        case 'edit':
                            $ctrl.buttonCss = 'btn-primary';
                            $ctrl.btnIcon = 'ion-edit';
                            break;
                        case 'view':
                            $ctrl.buttonCss = 'btn-primary';
                            $ctrl.btnIcon = 'fa fa fa-binoculars';
                            break;
                        case 'search':
                            $ctrl.buttonCss = 'btn-primary';
                            $ctrl.btnIcon = 'ion-search';
                            break;
                        case 'delete':
                            $ctrl.buttonCss = 'btn-danger';
                            $ctrl.btnIcon = 'ion-trash-a';
                            break;
                        case 'save':
                            $ctrl.buttonCss = 'btn-primary';
                            $ctrl.btnIcon = 'fa fa-floppy-o';
                            break;
                        case 'ok':
                        case 'submit':
                        case 'approve':
                            $ctrl.buttonCss = 'btn-success';
                            $ctrl.btnIcon = 'ion-checkmark';
                            break;
                        case 'print':
                            $ctrl.btnIcon = 'fa fa-print';
                            $ctrl.buttonCss = 'btn-primary';
                            break;
                        case 'export':
                            $ctrl.btnIcon = 'ion-ios-download';
                            $ctrl.buttonCss = 'btn-primary';
                            break;
                        case 'refresh':
                            $ctrl.btnIcon = 'ion-refresh';
                            $ctrl.buttonCss = 'btn-primary';
                            break;
                        case 'reject':
                            $ctrl.btnIcon = 'fa fa-hand-paper-o';
                            $ctrl.buttonCss = 'btn-danger';
                            break;
                        case 'cancel':
                            $ctrl.btnIcon = 'ion-android-cancel';
                            $ctrl.buttonCss = 'btn-warning';
                            break;
                        case 'close':
                            $ctrl.btnIcon = 'ion-close-round';
                            $ctrl.buttonCss = 'btn-warning';
                            break;
                        case 'reset':
                            $ctrl.btnIcon = 'ion-arrow-return-left';
                            $ctrl.buttonCss = 'btn btn-with-icon btn-primary';
                            break;
                        case 'upload':
                            $ctrl.buttonCss = 'btn-primary';
                            $ctrl.btnIcon = 'fa fa-upload';
                            break;
                    }
                    if (!!$scope.size) {
                        $ctrl.buttonCss = ($ctrl.buttonCss + ' ' + buttonConfig.sizeCss[$scope.size]);
                    }
                    $elem.find('span').text($scope.text || buttonConfig.defaultTexts[index]);
                }
            };
        });
})();