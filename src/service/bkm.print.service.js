(function () {
    'use strict';

    angular.module('bkm.library.angular.web')
        .service('bkm.print.service', ['$uibModal', serviceFn])
        .controller('bkm.print.ctrl', ['$uibModalInstance', 'context', ctrlFn]);

    function ctrlFn($uibModalInstance, context) {
        var ctrl = this;
        ctrl.modalTitle = "票据打印预揽"
        ctrl.includeUrl = "app/pages/transTrade/template/goodsList.html";
        console.log(context);
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
                                <div ng-include="ctrl.includeUrl"></div>\
                            </div>\
                            <div class="modal-footer">\
                                <button class="btn btn-default" ng-click="$dismiss()">取消</button>\
                                <button class="btn btn-default">打印</button>\
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