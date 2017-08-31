(function() {
    'use strict';

    angular.module('bkm.library.angular.web')
        .service('bkm.print.service', ['$uibModal', serviceFn])
        .controller('bkm.print.ctrl', ['$uibModalInstance', 'context', ctrlFn]);

    function ctrlFn($uibModalInstance, context) {
        var ctrl = this;
        ctrl.modalTitle = context.modalTitle || "票据打印预揽";
        ctrl.includeUrl = context.includeUrl;
        ctrl.model = context.model;
        ctrl.isPrint = false;
        ctrl.printingStyle = {};
        ctrl.currentDate = new Date();
        ctrl.print = function() {
            var p;
            ctrl.isPrint = true;
            ctrl.printingStyle = {
                "visibility": "hidden"
            };
            if (angular.isFunction(context.onPrint)) {
                p = context.onPrint();
            }

            if (!!p && p.constructor.name === "Promise") {
                p.then(_print);
            } else {
                _print();
            }

            function _print() {
                setTimeout(function() {
                    $(".print-container").printArea();
                    $uibModalInstance.close();
                }, 500);
            }
        };
        ctrl.getCurrentDate = function() {
            console.log('当前时间');
            return new Date();
        };
        if (angular.isFunction(context.closed)) {
            $uibModalInstance.closed.then(context.closed);
        }
    }

    function serviceFn($uibModal) {

        function preview(params) {
            $uibModal.open({
                backdrop: false,
                animation: true,
                windowClass: 'bkm-backdrop',
                template: '<div class="modal-content">\
                        <div class="modal-header" style="background-color:#209e91">\
                            <i class="ion-information-circled modal-icon"></i>\
                            <span ng-bind="ctrl.modalTitle"></span>\
                            <button type="button" class="close" ng-click="$dismiss()" aria-label="Close">\
                                <em class="ion-ios-close-empty sn-link-close"></em>\
                            </button>\
                        </div>\
                        <div class="modal-body" style="background-color:#d2d2d2;">\
                            <div class="print-container" ng-include="ctrl.includeUrl"></div>\
                        </div>\
                        <div class="modal-footer" style="padding:10px;">\
                            <button class="btn btn-default" ng-click="$dismiss()">取消</button>\
                            <button class="btn btn-default" ng-click="ctrl.print()">打印</button>\
                        </div>\
                        <script type="text/javascript">\
                            $(".modal-dialog").drags({ handle: ".modal-header" });\
                        </script>\
                    </div>',
                controller: 'bkm.print.ctrl',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    context: function() {
                        return params;
                    }
                }
            });

        }

        return {
            preview: preview
        };
    }
})();