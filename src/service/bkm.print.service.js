(function () {
    'use strict';

    angular.module('bkm.library.angular.web')
        .service('bkm.print.service', ['$uibModal', serviceFn])
        .controller('bkm.print.ctrl', ['$uibModalInstance', 'context', ctrlFn]);
//         .run(['$templateCache', runFn]);

//     function runFn($templateCache) {
//         $templateCache.put('bkm.print.defaultTemplate.html',
//             '<style>\
//     .bkm-print-container.bkm-print-hidden *{\
//         border: none !important;\
//     }\
//     .bkm-print-container table tr td {\
//         vertical-align: middle;\
//         text-align: center;\
//     }\
//     .bkm-print-container table tr td.text-left{\
//         text-align: left;\
//     }\
// </style>\
// <div class="bkm-print-container" ng-class="{\'bkm-print-hidden\':ctrl.isPrint}" style="background-color:#cebba9;padding:50px;width:850px;height:475px;">\
//     <div class="text-center" ng-style="ctrl.printingStyle" style="margin:50px auto 20px auto;">\
//         <h2>山西煤销集团晋煤物流阳泉有限公司统一派车单</h2>\
//     </div>\
//     <table class="table table-bordered">\
//         <tr style="height:80px;">\
//             <td ng-style="ctrl.printingStyle">派车单号</td>\
//             <td class="text-left" colspan="2" ng-bind="ctrl.model.no">*SC161126000350</td>\
//             <td ng-style="ctrl.printingStyle">用户</td>\
//             <td class="text-left" ng-bind="ctrl.model.userName">山西阳光发电有限责任公司</td>\
//         </tr>\
//         <tr>\
//             <td ng-style="ctrl.printingStyle">计划日期</td>\
//             <td class="text-left" colspan="2" ng-bind="ctrl.model.order.goods.earliestLoadTime|date:\'yyyy-MM-dd\'">2016-11-26</td>\
//             <td ng-style="ctrl.printingStyle">销售订单号</td>\
//             <td class="text-left"  ng-bind="ctrl.model.orderNo">SAB166109000012</td>\
//         </tr>\
//         <tr>\
//             <td ng-style="ctrl.printingStyle">煤品</td>\
//             <td ng-style="ctrl.printingStyle">品种</td>\
//             <td ng-style="ctrl.printingStyle">合同编号</td>\
//             <td ng-style="ctrl.printingStyle">装货地</td>\
//             <td class="text-left">旧街煤矿</td>\
//         </tr>\
//         <tr>\
//             <td  ng-bind="ctrl.model.order.goods.category">贫瘦煤</td>\
//             <td  ng-bind="ctrl.model.pingzhong">煤</td>\
//             <td ng-bind="ctrl.model.constractNo">D160600003</td>\
//             <td ng-style="ctrl.printingStyle">卸货地</td>\
//             <td class="text-left" ng-bind="ctrl.model.order.goods.unloadAddressName">阳泉</td>\
//         </tr>\
//         <tr ng-style="ctrl.printingStyle">\
//             <td>车号</td>\
//             <td>车型</td>\
//             <td>承运车队</td>\
//             <td>销售类别</td>\
//             <td>备注</td>\
//         </tr>\
//         <tr>\
//             <td ng-bind="ctrl.model.vehicle.no">晋C55158</td>\
//             <td ng-bind="ctrl.model.vehicle.vehicleType|VehicleType"></td>\
//             <td ng-bind="ctrl.model.order.tenantAgent.name">晋煤物流运力405</td>\
//             <td ng-bind="ctrl.model.order.xiaoshouleibie">省内电煤</td>\
//             <td ng-bind="ctrl.model.remark"></td>\
//         </tr>\
//     </table>\
//     <div class="row" style="margin-top:20px;">\
//         <div class="col-xs-4">\
//             <span ng-style="ctrl.printingStyle" class="col-xs-5">开票单位</span>\
//             <span class="col-xs-7">阳泉物流</span>\
//         </div>\
//         <div class="col-xs-4">\
//             <span ng-style="ctrl.printingStyle" class="col-xs-5">开票人</span>\
//             <span class="col-xs-7" ng-bind="ctrl.model.user.name">李济成</span>\
//         </div>\
//         <div class="col-xs-4">\
//             <span ng-style="ctrl.printingStyle" class="col-xs-5">开票时间</span>\
//             <span class="col-xs-7" ng-bind="ctrl.currentDate|date:\'yyyy-MM-dd HH:mm\'"></span>\
//         </div>\
//     </div>\
// </div>');
//     }

    function ctrlFn($uibModalInstance, context) {
        var ctrl = this;
        ctrl.modalTitle = context.modalTitle || "票据打印预揽";
        ctrl.includeUrl = context.includeUrl;
        ctrl.model = context.model;
        ctrl.isPrint = false;
        ctrl.printingStyle = {};
        ctrl.currentDate=new Date();
        ctrl.print = function () {
            ctrl.isPrint = true;
            ctrl.printingStyle = {
                "visibility": "hidden"
            };
            setTimeout(function () {
                $(".print-container").printArea();
                $uibModalInstance.close();
            }, 500);
        };
        ctrl.getCurrentDate = function(){
            console.log('当前时间');
            return new Date();
        }
    }

    function serviceFn($uibModal) {

        function preview(params) {
            $uibModal.open({
                backdrop: false,
                animation: true,
                windowClass: 'bkm-backdrop',
                template:
                '<div class="modal-content">\
                            <div class="modal-header" style="background-color:#209e91">\
                                <i class="ion-information-circled modal-icon"></i>\
                                <span ng-bind="ctrl.modalTitle"></span>\
                                <button type="button" class="close" ng-click="$dismiss()" aria-label="Close">\
                                    <em class="ion-ios-close-empty sn-link-close"></em>\
                                </button>\
                            </div>\
                            <div class="modal-body">\
                                <div class="print-container" ng-include="ctrl.includeUrl"></div>\
                            </div>\
                            <div class="modal-footer">\
                                <button class="btn btn-default" ng-click="$dismiss()">取消</button>\
                                <button class="btn btn-default" ng-click="ctrl.print()">打印</button>\
                            </div>\
                            <script type="text/javascript">\
                                $(".modal-dialog").drags({ handle: ".modal-header" });\
                            </script>\
                        </div>',
                controller: ctrlFn,
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    context: function () {
                        return params;
                    }
                }
            });

        }

        return {
            preview: preview
        }
    }
})();