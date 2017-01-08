/**
 * Created by gurihui on 2016/12/17.
 */
(function () {
    'use strict';

    angular.module('bkm.theme.bkmAlter', [])
        .service('bkmAlter', bkmAlter)
        .controller('bkmAlterCtrl', bkmAlterCtrl);

    function bkmAlter($uibModal) {
        this.alterModal = function (message, title, size, type) {
            modal('alter', message, title, size, type);
        };

        this.confirmModal = function (message, title, size, type) {
            return modal('confirm', message, title, size, type);
        }

        function modal(modalType, message, title, size, type) {
            var headClassName = '';
            var iconClassName = '';
            var btnClassName = '';
            type = type || 'info';
            switch (type) {
                case 'success':
                    headClassName = 'bg-success';
                    iconClassName = 'ion-android-success';
                    btnClassName = ' btn-success';
                    break;
                case 'warning':
                    headClassName = 'bg-warning';
                    iconClassName = 'ion-android-warning';
                    btnClassName = ' btn-warning';
                    break;
                case 'danger':
                    headClassName = 'bg-danger';
                    iconClassName = 'ion-android-danger';
                    btnClassName = ' btn-danger';
                    break;
                case 'info':
                default:
                    headClassName = 'bg-info';
                    iconClassName = 'ion-information-circled';
                    btnClassName = ' btn-info';
                    break;
            }
            size = size || 'ms';
            title = title || '提示';
            var bkmAlterInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/theme/services/bkmAlter/alertTemp.html',
                size: size,
                controller: 'bkmAlterCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    content: function () {
                        return {
                            message: message,
                            title: title,
                            modalType: modalType,
                            type: {
                                head: headClassName,
                                icon: iconClassName,
                                btn: btnClassName
                            }
                        };
                    }
                }
            });
            return bkmAlterInstance.result;
        }
    }

    function bkmAlterCtrl($uibModalInstance, content) {
        var ctrl = this;
        this.message = content.message;
        this.title = content.title;
        this.type = content.type;
        this.modalType = content.modalType;
        this.ok = function () {
            $uibModalInstance.close({});
        }
        this.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();