/**
 * Created by gurihui on 2016/12/30.
 */
(function() {
    'use strict';

    var formComponents = {
        textTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}"><div class="{formStyle}" style="position:relative;" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<input bkm-input bkm-form-valid-icon={isShowSpan} name="{formName}" class="form-control {type}" type="{type}" placeholder="{placeholder}" {validateAttr} ng-model="{model}"  ng-disabled="{readModel}.isRead||{isRead}"   uib-popover="{tooltip}" popover-trigger="\'focus\'"/><span ng-if={isShowSpan} class="input-icon {spanCss} " ng-click="{click}" ></span></div></div>',
        cbxTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}"><div class="{formStyle}" ><label class="checkbox-inline custom-checkbox nowrap"><input  type="checkbox" ng-model="{model}"  ng-disabled="{readModel}.isRead||{isRead}" ng-click="{click}" uib-popover="{tooltip}" popover-trigger="\'focus\'"/><span class="group-header">{label}{formRequired}</span></label></div></div>',
        noteTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}"><div class="{formStyle}" style="position:relative;"><label ng-hide="{hideLabel}.isHide">&nbsp;</label><label class="form-control" style="border:none;color:red;font-weight:normal;padding-top:5px; padding-left:0;">{label}{{{model}}}</label></div></div>',
        textareaTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}"><div class="{formStyle}" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<textarea bkm-input bkm-form-valid-icon={isShowSpan} name="{formName}" class="form-control "  placeholder="{placeholder}" {validateAttr} ng-model="{model}" ng-disabled="{readModel}.isRead||{isRead}" uib-popover="{tooltip}" popover-trigger="\'focus\'" ng-click="{click}" /></div></div>',
        dropDownTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}"><div class="{formStyle}" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<select uib-popover="{tooltip}" popover-trigger="\'focus\'" bkm-input name="{formName}" {validateAttr} class="form-control selectpicker" selectpicker ng-model="{model}" ng-disabled="{readModel}.isRead||{isRead}" {onChange} ng-options="{repeat}" ><option value="">-- {placeholder} --</option></select></div></div>',
        multiSelectTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}"><div class="{formStyle}" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<multiselect  ng-model="{model}" options="{dataSource}" id-prop="{keyName}" display-prop="{valName}" labels="{disp}" placeholder="{placeholder}" ng-disabled="{readModel}.isRead||{isRead}" {onChange} show-unselect-all="true"  show-tooltip="true" bkm-input name="{formName}" {validateAttr} class="form-control selectpicker"></multiselect></div></div>',
        dateTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}">\
                <div class="{formStyle}" {validError}>\
                    <div class="dropdown">\
                        <label>{label}{formRequired}</label>&nbsp;&nbsp;\
                        <div ng-class="{\'date\':!({readModel}.isRead===true)}" class="bkm-form-icon form-control">\
                            <a class="dropdown-toggle" id="{dropdownId}" role="button" data-toggle="dropdown" data-target="#" >\
                                <input type="text" class="form-control" data-date-time-input="{dateFormat}" ng-model="{model}"  uib-popover="{tooltip}" popover-trigger="\'focus\'" bkm-input name="{formName}"  {validateAttr} placeholder="{placeholder}" readOnly ng-disabled="{readModel}.isRead||{isRead}">\
                            </a>\
                            <ul ng-if="!({readModel}.isRead===true)" class="dropdown-menu  pull-right" role="menu" aria-labelledby="dLabel">\
                                <datetimepicker ng-model="{model}" data-datetimepicker-config="{minView:\'{minView}\', minuteStep:{minuteStep}, dropdownSelector: \'#{dropdownId}\'}"/>\
                            </ul>\
                            <span ng-if="!({readModel}.isRead===true)" class="input-group-addon" ng-click="{model}=null">\
                                <i class="input-datepicker glyphicon glyphicon-remove"></i>\
                            </span>\
                        </div>\
                     </div>\
                 </div>\
              </div>',
        inputFileBtnTemp: '<button type="button" style="border:0;text-decoration:none;outline:none;padding:0;" ng-hide="{hideModel}.isHide||{isHide}" ng-disabled="{readModel}.isRead||{isRead}">\
                        <label class="{className}" for="{btnId}">\
                            <i class="fa fa-upload" aria-hidden="true"></i>\
                            <span>{text}</span>\
                        </label>\
                        <input type="file" bkm-elem-onload event-name="{inputFileOnload}" ng-show="false" id="{btnId}">\
                    </button>',
        buttonTemp: '<button ng-hide="{hideModel}.isHide||{isHide}" uib-popover="{tooltip}" popover-trigger="\'focus\'" type="button" class="{className}" ng-disabled="{readModel}.isRead||{isRead}" ng-click="{click}"><i class="{icon}"></i><span>&nbsp;{text}</span></button>',
        downloadButtonTemp: '<a ng-hide="{hideModel}.isHide||{isHide}" class="down-link" href="javascript:void(0);" target="_blank"><button uib-popover="{tooltip}" popover-trigger="\'focus\'" type="button" class="{className}" ng-click="{click}"><i class="{icon}"></i><span>&nbsp;{text}</span></button></a>',
        placeHolderTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols} placeholder"> <div class="{formStyle}"></div> </div>',
        bkmButtonTemp: '<bkm-button ng-hide="{hideModel}.isHide||{isHide}" category="{category}" text="{text}" ng-disabled="{readModel}.isRead||{isRead}" ng-click="{click}"></bkm-button>',
        beginDateAndEndDateTemp: ' <div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}">\
                <div class="col-md-6" style="padding-left: 0;">\
                    <div class="dropdown dropdown-start-parent {formStyle}" {beginValidError}>\
                        <label>{beginDateLabel}{formRequired}</label>&nbsp;&nbsp;\
                        <div class="date bkm-form-icon form-control">\
                            <a class="dropdown-toggle" id="{dropdownStart}" role="button" data-toggle="dropdown" data-target="#" >\
                                <input type="text" class="form-control" ng-model="{beginDateModel}" data-date-time-input="{dateFormat}" uib-popover="{tooltip}" popover-trigger="\'focus\'" bkm-input name="{beginFormName}"  {validateAttr} placeholder="{beginDatePlaceholder}" readOnly>\
                            </a>\
                            <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">\
                                <datetimepicker ng-model="{beginDateModel}"\
                                                data-datetimepicker-config="{ minView:\'{minView}\', minuteStep:{minuteStep}, dropdownSelector: \'#{dropdownStart}\', renderOn: \'end-date-changed\' }"\
                                                data-on-set-time="{startDateOnSetTime}"\
                                                data-before-render="{startDateBeforeRender}"></datetimepicker>\
                            </ul>\
                            <span class="input-group-addon" ng-click="{beginDateModel}=null">\
                                <i class="input-datepicker glyphicon glyphicon-remove"></i>\
                            </span>\
                        </div>\
                    </div>\
                </div>\
                <div class="col-md-6" style="padding-right: 0;">\
                    <div class="dropdown dropdown-start-parent {formStyle}" {endValidError}>\
                        <label>{endDateLabel}{formRequired}</label>&nbsp;&nbsp;\
                        <div class="date bkm-form-icon form-control">\
                            <a class="dropdown-toggle" id="{dropdownEnd}" role="button" data-toggle="dropdown" data-target="#" >\
                                <input type="text" class="form-control" ng-model="{endDateModel}"  data-date-time-input="{dateFormat}" uib-popover="{tooltip}" popover-trigger="\'focus\'" bkm-input name="{endFormName}"  {validateAttr} placeholder="{endDatePlaceholder}" readOnly>\
                            </a>\
                            <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">\
                                <datetimepicker ng-model="{endDateModel}"\
                                                data-datetimepicker-config="{ minView:\'{minView}\', minuteStep:{minuteStep}, dropdownSelector: \'#{dropdownEnd}\', renderOn: \'start-date-changed\'}"\
                                                data-on-set-time="{endDateOnSetTime}"\
                                                data-before-render="{endDateBeforeRender}"></datetimepicker>\
                            </ul>\
                            <span class="input-group-addon" ng-click="{endDateModel}=null">\
                                <i class="input-datepicker glyphicon glyphicon-remove"></i>\
                            </span>\
                        </div>\
                    </div>\
                </div>\
            </div>',
        accordTemp: '<uib-accordion class="row bkm-uib-accordion" ng-hide="{hideModel}.isHide||{isHide}">\
                    <div uib-accordion-group class="panel-default" is-open="{isExpanded}">\
                        <uib-accordion-heading>\
                            <div class="col-md-12 bkm-panel-title" ng-click="status=!status" >\
                                <span>{title}</span>\
                                <i class="pull-right glyphicon" \
                                   ng-class="{\'glyphicon-chevron-up\': status, \'glyphicon-chevron-down\': !status }">\
                                </i>\
                            </div>\
                        </uib-accordion-heading>\
                        <bkm-elements is-accordions=true accordion-id="{accordId}"></bkm-elements>\
                    </div>\
                </uib-accordion>',
        addressTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}"><div class="{formStyle}"  {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<input bkm-input bkm-input-tree-address choose-level="{level}" ng-disabled="{readModel}.isRead||{isRead}" show-full-name="{isFullName}" name="{formName}" class="form-control " type="text" placeholder="{placeholder}" {validateAttr} ng-model="{model}" uib-popover="{tooltip}" popover-trigger="\'focus\'" /></div></div>',
        colorPickerTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}"><div class="{formStyle}" style="position:relative;" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<color-picker ng-model="{model}" class="form-group" options="dCtrl.opt.colorPickerOpt"></color-picker></div></div>',
        angucompleteAltTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}"><div class="{formStyle}" style="position:relative;" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<angucomplete-alt name="{formName}"  {angucompleteAltOptAttrs} style="padding:0;border:0;" type="{type}" uib-popover="{tooltip}" popover-trigger="\'focus\'"/></div></div>'
    };

    //date filter format definition
    var dateFormatDef = {
        day: 'YYYY-MM-DD',
        hour: 'YYYY-MM-DD HH:mm',
        minute: 'YYYY-MM-DD HH:mm'
    };

    angular.module('bkm.library.angular.web')
        .controller('directiveCtrl', directiveCtrl)
        .directive('bkmSearch', ['$compile', bkmSearch])
        .directive('bkmGeneralCrud', ['$compile', '$uibModal', 'toastr', 'bkmCommGetDict', 'abp.services.app.file', 'bkmFileUpload', bkmGeneralCrud])
        .directive('bkmElements', ['$compile', '$filter', 'bkmFileUpload', 'toastr', bkmElements])
        .directive('bkmMsgModal', ['$compile', bkmMsgModal])
        .directive('bkmModalForm', ['$compile', 'bkmFmValSvc', bkmModalForm])
        .run(['toastr', '$uibModal', 'bkmCommGetDict', '$templateCache', '$timeout', function(toastr, $uibModal, dict, $templateCache, $timeout) {
            $templateCache.put('attatchesList.html',
                '<uib-accordion close-others="oneAtATime" class="row bkm-uib-accordion" style="margin: 0;">\
                    <div uib-accordion-group class="panel-default bkm-attatches" is-open="options.attaches.isAttachesExpanded">\
                        <uib-accordion-heading>\
                            <div class="bkm-panel-title" ng-click="status.open=!!!status.open">\
                                <span>附件列表</span>\
                                <i class="pull-right glyphicon" \
                                   ng-class="{\'glyphicon-chevron-up\': status.open, \'glyphicon-chevron-down\': !status.open}"></i>\
                            </div>\
                        </uib-accordion-heading>\
                        <div class="attaches upfile row" ng-if="options.attaches.isShowUpload">\
                            <div class="col-md-6">{{options.attaches.prompt}}</div>\
                            <div class="col-md-6 operation">\
                                <div ng-if="options.attaches.isShowFileUpType" style="display:inline-block">\
                                    <select ng-model="options.attaches.upFileTypeValue" ng-change="options.attaches.upFileTypeValueChange()" class="form-control selectpicker ng-pristine ng-invalid ng-invalid-required ng-touched" ng-options="o.name for o in options.attaches.upFileTypeObj">\
                                        <option value="">-- 请选择附件类型 --</option>\
                                    </select>\
                                </div>\
                                <i class="fa fa-upload" aria-hidden="true"></i><a ngf-select-disabled="options.attaches.fileUpdisabled" ngf-select="options.attaches.uploadFiles($files)" ngf-pattern="{{options.attaches.attachesPattern}}" ngf-multiple="{{options.attaches.multiple}}">&nbsp;&nbsp;添加附件...</a>\
                            </div>\
                        </div>\
                        <div ui-grid="options.attaches.gridOption" class="grid" ui-grid-selection ui-grid-pagination ui-grid-auto-resize ng-style="options.attaches.gridOption.autoHeight()"></div>\
                    </div>\
                </uib-accordion>'
            );




            /**
             * @ngdoc directive
             * @name baseSearchFn
             * @description
             * UI-GRID 通用的页面查询和结果集绑定的函数，可以用于普通查询页面的查询方法的快速构造
             * 用法：baseSearchFn.apply(ctrl.页面绑定的gridoption名称, [ $scope,  ABP查询服务
             * 的方法名称, toastr, 是否需要首次加载数据,  Controller中需要注册的UI-GRID事件]);
             *
             * @param input {scope,serviceApiFunc,toastr,isInitLoad,registerCustomizedApi,paramsSetting} 接收的值
             * serviceApiFunc:需要传入的查询服务方法,
             * isInitLoad:是否需要在页面首次打开时加载数据
             * registerCustomizedApi: 需要controller中定义的UI-GRID事件方法,
             * paramsSetting： 在调用searchData方法时需要额外配置的查询参数
             * uiGridName 给每一个grid唯一的一个标识
             * @returns {string} 返回替换后的值
             */
            window.baseSearchFn = function($scope,
                serviceApiFunc,
                paramsSetting,
                isInitLoad,
                registerCustomizedApi,
                uiGridName) {

                var self = this;
                //构造页面查询参数基类对象
                self.params = extendSearchObj();
                //设置UI-GRID属性参数
                self.gridOption = baseUiGridProp();
                //配置UI-GRID的grid.appScope的作用域为当前Ctrl
                self.gridOption.appScopeProvider = self;
                //UI-GRID高度自动伸缩函数
                self.gridOption.autoHeight = function() {
                    return {
                        height: (self.gridOption.paginationPageSize * 24 + 30) + "px"
                    };
                };

                //注册事件回调函数
                self.gridApi = {};
                if (angular.isString(uiGridName) && uiGridName.length > 0) {
                    self.gridOption.gridMenuCustomItems = [{
                        title: '保存列状态',
                        action: function($event) {
                            localStorage.setItem(uiGridName, JSON.stringify(this.grid.api.saveState.save()));
                            toastr.info("列状态保存成功!");
                        },
                        order: 210
                    }];
                }

                self.gridOption.onRegisterApi = function(gridApi) {
                    self.gridApi = gridApi;
                    //判断在页面第一次加载的时候需要加载数据
                    if (isInitLoad == undefined || isInitLoad)
                        getData(1, self.gridOption.paginationPageSize);

                    //判断是否传入了grid标识
                    if (angular.isString(uiGridName) && uiGridName.length > 0) {
                        var item = localStorage.getItem(uiGridName);
                        if (!!item) {
                            setTimeout(function() {
                                self.gridApi.saveState.restore(null, JSON.parse(item));
                            }, 1);
                        }
                    }
                    //注册UI-GRID翻页函数
                    if (gridApi.pagination) {
                        gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
                            getData(newPage, pageSize);
                        });
                    }
                    //注册Controller自己的UI-GRID 个性化事件
                    if (angular.isFunction(registerCustomizedApi)) {
                        registerCustomizedApi(gridApi);
                    }
                };

                self.searchData = getData;
                //查询数据
                function getData(newPage, pageSize) {
                    if (!angular.isFunction(serviceApiFunc)) return;
                    //合并分页查询参数
                    self.params.skipCount = (typeof self.gridApi.pagination == 'object') ? (self.gridApi.pagination.getPage() - 1) * self.gridOption.paginationPageSize : 0;
                    self.params.maxResultCount = self.gridOption.paginationPageSize;
                    //查询参数处理回调函数
                    if (typeof paramsSetting == 'function') {
                        paramsSetting();
                    }
                    //调用查询服务
                    serviceApiFunc(self.params)
                        .then(function(result) {
                            self.gridOption.data = result.data.items;
                            self.gridOption.totalItems = result.data.totalCount;

                            if (typeof self.searchSuccessFn == 'function') {
                                $timeout(function() {
                                    return self.searchSuccessFn(result.data.items);
                                })
                            }
                        });
                };

                //Construct base UI-grid component properties group
                function baseUiGridProp(obj) {
                    return angular.extend({}, obj, {
                        enableColumnResizing: true,
                        enableRowSelection: true,
                        enableRowHeaderSelection: false,
                        modifierKeysToMultiSelect: false,
                        noUnselect: false,
                        multiSelect: false,
                        useExternalPagination: true,
                        paginationPageSize: 10,
                        paginationPageSizes: [5, 10, 15, 20],
                        enableColumnMenus: false,
                        enableGridMenu: true,
                        exporterMenuCsv: false,
                        exporterMenuPdf: false
                    });
                }

                //general parameters setting for api request
                function extendSearchObj(obj) {
                    return angular.extend({}, {
                        dictionaryTypes: [],
                        dictionaryHash: '',
                        sorting: '',
                        skipCount: '0',
                        maxResultCount: '10'
                    }, obj);
                }
            };


            /**
             * @ngdoc directive
             * @name baseApproveFn
             * @description
             * 通用的审核功能
             *
             * @param input {parentCtrl,rowEntity} 接收的值
             * parentCtrl:传入应用所在的ctrl,
             * rowEntity: (可选)审批按钮在行上定义的时候需要传入row.entity对象
             *
             * @returns {string} 返回替换后的值
             */
            window.baseApproveFn = function(parentCtrl, rowEntity, rejectSuccessCallback) {

                var self = parentCtrl;

                var promptName = self.formSetting.promptName;
                var approveSvc = self.formSetting.resourceSvc;

                //获取所选择审核的记录
                var rtnRows = [];
                rtnRows[0] = rowEntity || self.gridApi.selection.getSelectedRows()[0];
                if (!rtnRows[0] || !(rtnRows[0].status == 0 || rtnRows[0].status == 1)) {
                    toastr.info(bkm.util.format("请选择 {0} 状态为待审核的记录!", promptName));
                    return;
                }

                //审核的对话框
                var uibModalInstance = $uibModal.open({
                    backdrop: false,
                    animation: true,
                    template: '<bkm-modal-form options="ctrl.formOption"></bkm-modal-form>',
                    controller: ['$uibModalInstance', '$scope', function($uibModalInstance, $scope) {

                        //初始化数据模型
                        var ctrl = this;
                        ctrl.formOption = {};
                        var formModel = ctrl.formOption.model = self.formSetting.approveParams || { relatedId: rtnRows[0].id };

                        //表单数据模型绑定
                        $scope.modalTitle = promptName + '审核';
                        angular.extend(ctrl.formOption, {
                            items: [{
                                    type: 'textarea',
                                    model: 'reason',
                                    label: '备注',
                                    option: true,
                                    cols: 12
                                },
                                {
                                    type: 'dropDown',
                                    model: 'type',
                                    label: '拒绝原因',
                                    option: true,
                                    cols: 12,
                                    dataSource: dict.dictionary[dict.AuditType()]
                                }
                            ],
                            buttons: [{
                                    text: '同意',
                                    category: 'approve',
                                    click: approveFn
                                },
                                {
                                    text: '拒绝',
                                    category: 'reject',
                                    click: rejectFn
                                }
                            ]
                        });

                        //审核通过
                        function approveFn() {
                            formModel.isPass = true;
                            approveSvc.approve(formModel)
                                .then(function(result) {
                                    toastr.success("审核成功!");
                                    $uibModalInstance.close();
                                    self.searchData();
                                });
                        };

                        //审核不通过
                        function rejectFn() {
                            if (formModel.type == undefined) {
                                toastr.info("请选择拒绝原因的类型!");
                                return;
                            }
                            var modalInstance = $uibModal.open({
                                backdrop: false,
                                animation: true,
                                controller: function() {
                                    var mCtrl = this;
                                    mCtrl.message = "您确认要拒绝吗?";
                                },
                                controllerAs: 'mCtrl',
                                template: '<bkm-msg-modal message="mCtrl.message" cancel=true category="danger" ></bkm-msg-modal>'
                            });

                            modalInstance.result
                                .then(function(result) {
                                    angular.extend(formModel, {
                                        isPass: false,
                                        type: formModel.type,
                                        reason: formModel.reason
                                    });
                                    return approveSvc.approve(formModel);
                                })
                                .then(function(result) {
                                    toastr.success(bkm.util.format("该{0}已被标记为审核不通过!", promptName));
                                    $uibModalInstance.close();
                                    self.searchData();
                                    if (typeof rejectSuccessCallback == 'function') {
                                        rejectSuccessCallback();
                                    }
                                });
                        }
                    }],
                    controllerAs: 'ctrl',
                    size: 'lg',
                    resolve: {
                        items: function() {
                            return rtnRows;
                        }
                    }
                });
            };


            /**
             * @ngdoc directive
             * @name simpleFormModelDalg
             * @description
             * 通用的简单form表单
             *
             * @param input {parentCtrl,rowEntity} 接收的值
             * parentCtrl:传入应用所在的ctrl,
             * rowEntity: (可选)审批按钮在行上定义的时候需要传入row.entity对象
             *
             * @returns {string} 返回替换后的值
             */
            window.simpleFormModelDalg = function(parentCtrl, rowEntity, formOption) {

                var self = parentCtrl;

                //获取所选择审核的记录
                var rtnRows = [];
                rtnRows[0] = rowEntity || self.gridApi.selection.getSelectedRows()[0];

                //审核的对话框
                var uibModalInstance = $uibModal.open({
                    backdrop: false,
                    animation: true,
                    template: '<bkm-modal-form options="ctrl.formOption"></bkm-modal-form>',
                    controller: ['$uibModalInstance', '$scope', function($uibModalInstance, $scope) {

                        //初始化数据模型
                        var ctrl = this;
                        ctrl.formOption = {};
                        var formModel = ctrl.formOption.model = self.formSetting.approveParams || rtnRows[0]; // || { relatedId: rtnRows[0].id };

                        angular.forEach(formOption.buttons, function(v, i) {
                            var tClick = v.click;
                            v.click = function(e) {
                                if (!!v.onClickConfirm) {
                                    confirmFn(v.onClickConfirm, tClick);
                                } else {
                                    tClick({ e: e, uibModalInstance: $uibModalInstance, formModel: formModel });
                                }
                            };
                        });

                        //表单数据模型绑定
                        $scope.modalTitle = formOption.modalTitle; //self.formSetting.modalTitle || (promptName + '审核');
                        angular.extend(ctrl.formOption, {
                            items: formOption.items,
                            buttons: formOption.buttons
                        });

                        //审核不通过
                        function confirmFn(opt, clickFn) {
                            // if (formModel.type == undefined) {
                            //     toastr.info("请选择拒绝原因的类型!");
                            //     return;
                            // }
                            var modalInstance = $uibModal.open({
                                backdrop: false,
                                animation: true,
                                controller: function() {
                                    var mCtrl = this;
                                    mCtrl.message = opt.message; // "您确认要拒绝吗?";
                                },
                                controllerAs: 'mCtrl',
                                template: '<bkm-msg-modal message="mCtrl.message" cancel=true category="danger" ></bkm-msg-modal>'
                            });

                            modalInstance.result
                                .then(function(result) {
                                    return clickFn({ formModel: formModel });
                                })
                                .then(function(result) {
                                    // toastr.success(bkm.util.format("该{0}已被标记为审核不通过!", promptName));
                                    toastr.success(opt.successMsg);
                                    $uibModalInstance.close();
                                    self.searchData();
                                    if (typeof opt.rejectSuccessCallback == 'function') {
                                        opt.rejectSuccessCallback(result);
                                    }
                                });
                        }
                    }],
                    controllerAs: 'ctrl',
                    size: 'lg',
                    resolve: {
                        items: function() {
                            return rtnRows;
                        }
                    }
                });
            };

        }]);

    function directiveCtrl() {
        var ctrl = this;
    };

    function bkmElements($compile, $filter, bkmFileUpload, toastr) {
        return {
            restrict: 'E',
            scope: {
                includeOption: '=?',
                cols: '=?',
                isAccordions: '@?',
                accordionId: '@?'
            },
            require: '?^bkmModalForm',
            controller: 'directiveCtrl',
            controllerAs: 'dCtrl',
            replace: true,
            template: '<div></div>',
            link: function(scope, el, attrs, ctrl) {

                var formCtrlOpt = ctrl.opt.includeOption || [];
                if (scope.isAccordions) {
                    var result = $filter('filter')(ctrl.opt.accordions, { accordId: scope.accordionId }, true);
                    formCtrlOpt = result.length == 0 ? formCtrlOpt : result[0].accordOption;
                }
                scope.options = !!scope.includeOption ? scope.includeOption : formCtrlOpt;
                linkFunc(
                    scope,
                    el,
                    formComponents, {
                        items: '',
                        buttons: ''
                    },
                    scope.options,
                    scope.cols,
                    'form-group',
                    bkmFileUpload,
                    toastr
                );
                $compile(el)(scope);
                //设置表单对象
                if (!!ctrl.myForm) {
                    (function setMyform(s) {
                        scope.myForm = s.myForm;
                        if (!!!scope.myForm) {
                            setMyform(s.$parent);
                        }
                    })(scope.$parent);
                }
            }
        };
    }

    /**
     * @ngdoc directive
     * @name demo.directive:bkmSearch
     * @description
     * 列表页面的搜索指令
     * @restrict E
     * @scope
     * @param {Object} options = 指令所需的配置对象
     * options.items 该数组接收需要显示的搜索项
     * 搜索项有六种类型：
     *
     */
    function bkmSearch($compile) {

        return {
            restrict: 'E',
            scope: {
                options: '=',
                cols: '=?cols'
            },
            controller: 'directiveCtrl',
            controllerAs: 'dCtrl',
            replace: true,
            template: '<div class="search-condition "><div class="row"></div><div class="text-right search-btn button-panel btns"></div>',
            link: function(scope, el, attrs) {
                //定义默认的布局列数
                var cols = !!scope.cols ? scope.cols : 4;
                scope.options.renderSearch = true;
                linkFunc(
                    scope,
                    el,
                    formComponents, {
                        items: '.row',
                        buttons: '.btns'
                    },
                    scope.options,
                    cols,
                    ''
                );
                $compile(el)(scope);
            }
        };
    }

    /**
     * @ngdoc directive
     * @name bkmGeneralCrud
     * @description
     * 通用的增、删、改功能指令封装
     *
     * @restrict E
     * @scope
     * @param {Object} options = 指令所需的配置对象
     * options.items 该数组接收需要显示的搜索项
     * 搜索项有六种类型：
     *
     */
    function bkmGeneralCrud($compile,
        $uibModal,
        toastr,
        dict,
        fileSvc,
        bkmUpload) {

        return {
            restrict: 'E',
            scope: {
                options: '=',
                cols: '=?cols'
            },
            controller: 'directiveCtrl',
            controllerAs: 'dCtrl',
            replace: true,
            template: '<div class="search-condition form-inline text-right"><div class="row"></div><div class="text-right search-btn button-panel btns"></div>',
            link: function(scope, el, attrs) {


                //定义附件列表的模板文件地址(缓冲模板文件)
                var attachesTempUrl = 'attatchesList.html';

                //定义默认的布局列数
                var cols = scope.cols ? scope.cols : 3;
                //获取options中定义的parentCtrl
                if (!scope.options || !scope.options.parentCtrl) {
                    toastr.warning("应用内部错误：请将错误截图，联系系统管理员!");
                    return;
                }
                var parentCtrl = scope.options.parentCtrl;

                //显示详情
                parentCtrl.display = function(row) {
                        row.isEdit = false;
                        modalForm(row);
                    }
                    //编辑
                parentCtrl.edit = function(row) {
                        row.isEdit = true;
                        modalForm(row);
                    }
                    //删除
                parentCtrl.delete = function(row) {

                        if (!row) {
                            toastr.info("请选择要删除的记录!");
                            return;
                        }

                        //删除数据回调
                        if (!!parentCtrl.formSetting && typeof parentCtrl.formSetting.deleteRowFn == 'function') {
                            var isGoingon = parentCtrl.formSetting.deleteRowFn(row.entity);
                            //如果不继续提交则直接返回
                            if (isGoingon != undefined && !isGoingon)
                                return;
                        }

                        var delSvcFn = parentCtrl.formSetting.delSvcFn || parentCtrl.formSetting.resourceSvc.delete;
                        var delParas = parentCtrl.formSetting.deleteParas || { id: row.entity.id };
                        var delPrompt = parentCtrl.formSetting.delPrompt || "您确认要删除吗?";

                        var modalInstance = $uibModal.open({
                            backdrop: false,
                            animation: true,
                            controller: function() {
                                var mCtrl = this;
                                mCtrl.message = delPrompt;
                            },
                            controllerAs: 'mCtrl',
                            template: '<bkm-msg-modal message="mCtrl.message" cancel=true category="danger" ></bkm-msg-modal>'
                        });

                        modalInstance.result
                            .then(function(result) {
                                return delSvcFn(delParas);
                            })
                            .then(function(result) {
                                parentCtrl.searchData();
                                toastr.success("已被成功的删除!");
                            });
                    }
                    //添加
                parentCtrl.add = function() {
                        modalForm();
                    }
                    //审核操作
                parentCtrl.approve = function() {
                        baseApproveFn(parentCtrl);
                    }
                    //新建表单
                function modalForm(row) {

                    $uibModal.open({
                        backdrop: false,
                        animation: false,
                        windowClass: 'bkm-backdrop',
                        template: '<bkm-modal-form options="ctrl.formOption"></bkm-modal-form>',
                        controller: ['$scope', '$state', '$uibModalInstance', 'toastr', function($scope, $state, $uibModalInstance, toastr) {

                            var ctrl = this;

                            //获取选择的行记录
                            var rtnRow = null;
                            var isEdit = false;
                            if (!!$scope.$resolve.items) {
                                rtnRow = $scope.$resolve.items.entity;
                                isEdit = !!$scope.$resolve.items.isEdit;
                            }
                            //初始化数据模型
                            ctrl.formOption = {};
                            var formModel = ctrl.formOption.model = {},
                                resourceSvc = parentCtrl.formSetting.resourceSvc,
                                getSvcFn = parentCtrl.formSetting.getSvcFn || resourceSvc.get,
                                createSvcFn = parentCtrl.formSetting.createSvcFn || resourceSvc.create,
                                updateSvcFn = parentCtrl.formSetting.updateSvcFn || resourceSvc.update,
                                newFormOption = {};
``
                            //初始化表单数据模型回调
                            if (typeof parentCtrl.formSetting.initFormModelFn == 'function') {
                                parentCtrl.formSetting.initFormModelFn(newFormOption, formModel, rtnRow, isEdit);
                            }

                            //表单标题头提示
                            var promptName = parentCtrl.formSetting.promptName || '';
                            $scope.modalTitle = !rtnRow ? '新建' + promptName : promptName + "详情";

                            //配置新建表单指令参数
                            angular.extend(ctrl.formOption, {
                                    buttons: !!rtnRow && !isEdit ? [] : [{
                                        text: '提交',
                                        category: 'submit',
                                        click: submitFn
                                    }]
                                },
                                newFormOption
                            );

                            //查看详情或编辑时加载数据
                            var attachesPara = { 'relatedId': !!rtnRow ? rtnRow.id : '' }; //初始化附件查询参数对象
                            //对附件类型的处理
                            if (!!parentCtrl.formSetting.isShowUpFileType) {
                                attachesPara.isShowUpFileType = parentCtrl.formSetting.isShowUpFileType;
                                attachesPara.getUpFileTypeFn = parentCtrl.formSetting.getUpFileTypeFn;
                                attachesPara.rtnRow = rtnRow;
                            }
                            attachesPara.attachTypes = parentCtrl.formSetting.attachTypes || [];

                            if (rtnRow) {
                                //直接将rtnRow中的数据绑定在表单上
                                if (rtnRow.isShowData) {
                                    bindResultToForm(rtnRow);
                                } else { //通过rtnRow.id先查询明细，将查询结果绑定在表单上
                                    //设置Get方法参数的默认值：id
                                    var getParas = { id: rtnRow.id };
                                    //判断是否存在get方法的额外参数
                                    if (rtnRow.addiParas) {
                                        angular.extend(getParas, { type: rtnRow.addiParas });
                                    }
                                    //获取信息
                                    getSvcFn(getParas)
                                        .then(function(result) {
                                            var items = result.data || [];
                                            bindResultToForm(items);
                                        });
                                }
                            } else if (!!parentCtrl.formSetting.hasAttaches) {
                                angular.extend(ctrl.formOption, {
                                    includeAttachesUrl: attachesTempUrl,
                                    isAttachesExpanded: parentCtrl.formSetting.isAttachesExpanded || false
                                });
                                attachesFn(ctrl, attachesPara, $scope, isEdit, !rtnRow);
                            }

                            //数据绑定的公共函数
                            function bindResultToForm(items) {
                                //表单数据绑定
                                angular.extend(formModel, items);

                                //表单绑定数据处理回调
                                if (typeof parentCtrl.formSetting.getSuccessFn == 'function') {
                                    parentCtrl.formSetting.getSuccessFn(formModel, items, attachesPara);
                                }

                                //表单中的公共附件列表数据绑定
                                if (!!parentCtrl.formSetting.hasAttaches) {
                                    angular.extend(ctrl.formOption, {
                                        includeAttachesUrl: attachesTempUrl,
                                        isAttachesExpanded: parentCtrl.formSetting.isAttachesExpanded || false
                                    });
                                    attachesFn(ctrl, attachesPara, $scope, isEdit && !formModel.isReadAttaches, !rtnRow);
                                    angular.extend(ctrl.formOption.attaches.params, attachesPara);
                                    ctrl.formOption.attaches.searchData();
                                }
                            }

                            //提交表单
                            function submitFn() {
                                ctrl.formOption.onSubmit(function (validResult) {
                                    if (!parentCtrl.formSetting) {
                                        toastr.danger("应用内部错误：请将错误截图，联系系统管理员!");
                                        return;
                                    }
                                    if (!validResult.isSuccess) {
                                        toastr.warning('您有未填写完整的数据，请按照错误提示补充完善，谢谢！');
                                        return;
                                    }
                                    //设置附件列表的数据
                                    if (!!parentCtrl.formSetting.hasAttaches) {
                                        formModel.attachments = [];
                                        angular.forEach(ctrl.formOption.attaches.gridOption.data, function (v, i) {
                                            formModel.attachments.push({
                                                contentLength: v.contentLength,
                                                contentType: v.contentType,
                                                id: v.id,
                                                lastModified: v.lastModified,
                                                lastModifiedDate: v.lastModifiedDate,
                                                name: v.name,
                                                size: v.size,
                                                type: v.type,
                                                webkitRelativePath: v.webkitRelativePath
                                            });
                                        });
                                    }
                                    //数据处理回调
                                    if (typeof parentCtrl.formSetting.beforeSubmitFn == 'function') {
                                        var isGoingon = parentCtrl.formSetting.beforeSubmitFn(formModel);
                                        if (isGoingon === true || isGoingon == undefined) {
                                            updateAndCreateFn();
                                        } else if (!!isGoingon.promise) {
                                            isGoingon.promise.then(function (result) {
                                                if (result === true) {
                                                    updateAndCreateFn();
                                                }
                                            });
                                        }
                                    } else {
                                        updateAndCreateFn();
                                    }
                                    //调用创建或更新服务
                                    function updateAndCreateFn() {
                                        (isEdit ? updateSvcFn(formModel) : createSvcFn(formModel))
                                            .then(function (result) {
                                                toastr.success('提交成功，请继续添加或点击关闭按钮返回！');
                                                parentCtrl.searchData();
                                                //更新成功处理回调
                                                if (typeof parentCtrl.formSetting.postSubmitFn == 'function') {
                                                    parentCtrl.formSetting.postSubmitFn(formModel);
                                                }
                                                $uibModalInstance.close();
                                            });
                                    }
                                });
                            };
                        }],
                        controllerAs: 'ctrl',
                        size: 'lg',
                        resolve: {
                            items: function() {
                                return row;
                            }
                        }
                    });
                };


                //附件列表操作
                function attachesFn(appliedCtrl,
                    attchesPara,
                    scope,
                    isEdit, //附件列表是否处于编辑状态
                    isNew //附件列表是否处于新建状态
                ) {

                    //初始化附件数据模型
                    var self = appliedCtrl;
                    var attachesPattern = angular.isArray(attchesPara.attachTypes) && attchesPara.attachTypes.length > 0 ? attchesPara.attachTypes.join(',') : "'.jpg,.png'";
                    var addiPrompt = attchesPara.addiPrompt || bkm.util.format("支持文件格式({0})，文件大小不超过200K", attachesPattern);
                    var attaches = self.formOption.attaches = {
                        attachesPattern: attachesPattern,
                        multiple: true,
                        isShowUpload: !!isNew || !!isEdit,
                        isRemovePaging: !!isNew || !!isEdit,
                        isShowDelete: !!isNew || !!isEdit,
                        prompt: addiPrompt,
                        isShowFileUpType: !!attchesPara.isShowUpFileType || false, //默认为不使用上传文件类型
                        upFileTypeValue: '', //上传文件的类型
                        fileUpdisabled: false, //是否禁用上传功能,默认禁用
                        isAttachesExpanded: self.formOption.isAttachesExpanded //附件列表默认不展开
                    };

                    if (!!attaches.isShowFileUpType) {

                        //需要文件类型是请求数据
                        self.upFileTypeObj = {};
                        if (typeof attchesPara.getUpFileTypeFn == 'function') {
                            attchesPara.getUpFileTypeFn(attchesPara.rtnRow)
                                .then(function(data) {
                                    angular.extend(self.upFileTypeObj, data.items);
                                })
                                .catch(function(e) {
                                    // 异常处理
                                });
                        }
                        //添加文件类型选择
                        angular.extend(attaches, {
                            upFileTypeObj: self.upFileTypeObj,
                            fileUpdisabled: true,
                            upFileTypeValueChange: function() {
                                if (!!attaches.upFileTypeValue) {
                                    attaches.fileUpdisabled = false;
                                } else {
                                    attaches.fileUpdisabled = true;
                                }
                            },
                        });
                    }
                    //删除附件
                    attaches.delAttch = function(row) {
                        var modalInstance = $uibModal.open({
                            backdrop: false,
                            animation: true,
                            controller: function() {
                                var mCtrl = this;
                                mCtrl.message = "您确认要删除该附件吗?";
                            },
                            controllerAs: 'mCtrl',
                            template: '<bkm-msg-modal message="mCtrl.message" cancel=true category="warning" ></bkm-msg-modal>'
                        });

                        modalInstance.result
                            .then(function(result) {
                                var index = bkm.util.indexOf(attaches.gridOption.data, 'id', row.entity.id);
                                attaches.gridOption.data.splice(index, 1);
                            });

                    };

                    //继承基类查询对象
                    baseSearchFn.apply(attaches, [scope, fileSvc.getAll, , false]);

                    //配置附件列表
                    angular.extend(attaches.gridOption, { paginationPageSize: 5 });
                    attaches.gridOption.columnDefs = [
                        { field: "seq", displayName: "序号", width: 50 },
                        {
                            field: " ",
                            displayName: '附件名称',
                            cellTemplate: '<div class="operation attaches"> <a target="blank" href="{{row.entity.id|pathUrl}}">{{row.entity.name}}</a></div>'
                        },
                        { field: "contentType", displayName: "附件类型" },
                        { field: "contentLength", displayName: "附件大小(KB)", cellFilter: "kbSize|number" },
                        { field: "creatorName", displayName: "创建人" },
                        { field: "creationTime", displayName: "创建时间", cellFilter: "date:'yyyy-MM-dd HH:mm'" },
                        {
                            field: "operation",
                            displayName: '操作',
                            cellTemplate: '<div class="operation"> <a  href="{{row.entity.id|pathUrl:true}}">下载&nbsp;&nbsp;</a><a ng-if="grid.appScope.isShowDelete"  ng-click="grid.appScope.delAttch(row);">删除</a></div>'
                        }
                    ];
                    //配置查询参数
                    if (!isNew)
                        angular.extend(attaches.params, attchesPara);

                    //上传附件服务调用
                    attaches.uploadFiles = function(files) {
                        if (files && files.length) {
                            var f,
                                imageInfo = !!attchesPara.attachTypes && attchesPara.attachTypes.length ? {
                                    type: attchesPara.attachTypes.join('').split('.')
                                } :
                                true;
                            // 判断是否需要文件类型
                            if (!!attaches.isShowFileUpType) {
                                // if (files.length > 0) {
                                //     files[0].sendFormData = { name: attaches.upFileTypeValue.name };
                                // }
                                var i,
                                    len = files.length;
                                f = {
                                    sendFormData: { fileAdditions: [] },
                                    uploadFiles: files
                                };
                                for (i = 0; i < len; i++) {
                                    f.sendFormData.fileAdditions.push({
                                        alias: attaches.upFileTypeValue.name,
                                        name: files[i].name
                                    });
                                }
                            } else {
                                f = files;
                            }

                            bkmUpload.upload(f, imageInfo)
                                .then(function(response) {
                                    //把files存放到filesLists中
                                    var filesLists = [];
                                    for (var x in files) {
                                        var fileData = {};
                                        fileData.name = response.data[0].name;
                                        fileData.contentType = files[x].type;
                                        fileData.contentLength = files[x].size;
                                        fileData.id = response.data[x].id;
                                        filesLists.push(fileData);
                                    }
                                    attaches.gridOption.data = attaches.gridOption.data.concat(filesLists);
                                });
                        }
                    };
                }

                scope.options.renderSearch = true;
                linkFunc(
                    scope,
                    el,
                    formComponents, {
                        items: '.row',
                        buttons: '.btns'
                    },
                    scope.options,
                    cols,
                    ''
                );
                $compile(el)(scope);
            }
        };
    }


    function bkmMsgModal($compile) {

        return {
            restrict: 'E',
            scope: {
                message: '=',
                category: '@?',
                cancel: '@?'
            },
            controller: 'directiveCtrl',
            controllerAs: 'dCtrl',
            replace: true,
            template: '<div class="modal-content"><div class="modal-header {{dCtrl.modalParas.bgType}}"><i class="{{dCtrl.modalParas.iconClass}} modal-icon"></i><span>{{dCtrl.modalParas.titleType}}</span></div><div class="modal-body text-center">{{dCtrl.modalParas.message}}</div><div class="modal-footer"></div></div>',

            link: function(scope, el) {

                var msgCollection = {
                    info: {
                        bgType: 'bg-info',
                        iconClass: 'ion-information-circled',
                        titleType: '提示',
                        message: scope.message,
                        btnClass: 'btn btn-info'
                    },
                    success: {
                        bgType: 'bg-success',
                        iconClass: 'ion-checkmark',
                        titleType: '成功',
                        message: scope.message,
                        btnClass: 'btn btn-success'
                    },
                    warning: {
                        bgType: 'bg-warning',
                        iconClass: 'ion-android-warning',
                        titleType: '警告',
                        message: scope.message,
                        btnClass: 'btn btn-warning'
                    },
                    danger: {
                        bgType: 'bg-danger',
                        iconClass: 'ion-flame',
                        titleType: '重要',
                        message: scope.message,
                        btnClass: 'btn btn-danger'
                    }
                };
                scope.dCtrl.modalParas = msgCollection[scope.category] || {};

                //设置默认的提交和关闭操作按钮
                scope.options = scope.options || {};
                scope.options.buttons = scope.options.buttons || [];

                scope.cancelMsg = function() {
                    scope.$parent.$dismiss('cancel');
                };

                scope.okMsg = function() {
                    scope.$parent.$close('ok');
                };

                if (!!scope.cancel) {
                    scope.options.buttons.push({
                        type: 'button',
                        text: '取消',
                        className: scope.dCtrl.modalParas.btnClass,
                        category: 'cancel',
                        click: scope.cancelMsg
                    });
                }

                scope.options.buttons.push({
                    type: 'button',
                    className: scope.dCtrl.modalParas.btnClass,
                    text: '确认',
                    category: 'ok',
                    click: scope.okMsg
                });

                //format body template
                linkFunc(
                    scope,
                    el,
                    formComponents, {
                        items: '',
                        buttons: '.modal-footer'
                    },
                    scope.options,
                    scope.cols,
                    ''
                );
                $compile(el)(scope);
            }
        };
    }

    /**
     * @ngdoc directive
     * @name demo.directive:bkmModalForm
     * @description
     * 列表页面的搜索指令
     * 使用方法：
     * 1. 页面控制器中设置模态框标题：scope.modalTitle="我的标题"
     * 2.
     *
     * @param {Object} options = 指令所需的配置对象
     * options.items 该数组接收需要显示的搜索项
     * options.includeUrl 该参数提供一个个性化模板地址，插入到Form表单中
     *
     * @param {int} cols = 可选参数，设置表单元素的布局列数，默认为两列
     *
     */
    function bkmModalForm($compile, bkmFmValSvc) {

        return {
            restrict: 'E',
            scope: {
                options: '=',
                cols: '=?cols'
            },
            controller: 'directiveCtrl',
            controllerAs: 'dCtrl',
            replace: true,
            template: '<div class="modal-content" ><div class="modal-header" style="background-color:#209e91"><i class="ion-information-circled modal-icon"></i><span>{{$parent.modalTitle}}</span><button type="button" class="close" ng-click="$parent.$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><div class="modal-body"><form novalidate  name="myForm"><div class="row bkm-form-item"></div><div ng-include="options.includeUrl" style="margin-bottom:16px;"></div><div id="uibAccordions" class="row"></div><div ng-include="options.includeAttachesUrl"></div></form></div><div class="modal-footer "></div><script type="text/javascript">$(".modal-dialog").drags({handle: ".modal-header"});</script></div>',

            link: function(scope, el) {

                //定义表单验证的回调函数
                scope.options.onSubmit = function(onSubmitFn) {
                    scope.myForm.$setSubmitted(true);
                    bkmFmValSvc.isValid(scope.myForm).then(onSubmitFn, null);
                };

                ////format footer template
                ////设置默认的关闭操作按钮
                //scope.options.buttons = scope.options.buttons || [];
                ////设置默认的关闭按钮
                //scope.options.buttons.push({
                //    text: '关闭',
                //    category: 'cancel',
                //    click: scope.$parent.$dismiss
                //});

                //format body template
                linkFunc(
                    scope,
                    el,
                    formComponents, {
                        items: '.bkm-form-item',
                        buttons: '.modal-footer',
                        accordions: '#uibAccordions'
                    },
                    scope.options,
                    scope.cols,
                    'form-group'
                );

                //将指令的myForm对象通过Controller传递给其他使用myForm的指令
                scope.dCtrl.myForm = !!scope.myForm ? scope.myForm : {};

                $compile(el)(scope);

                //用于初始化Password输入框的show/hide功能
                el.find('.password').password();

                //判断是否移除掉附件列表的翻页控件
                if (!!scope.options.attaches && !!scope.options.attaches.isRemovePaging) {
                    setTimeout(function() {
                        el.find('v-pane-content .ui-grid-pager-panel').remove();
                    }, 0);
                }

            }
        };
    }

    function linkFunc(scope, el, uiComponents, selectors, options, cols, formStyle, bkmFileUpload, toastr) {

        //设置窗体默认列布局
        var parentCols = !!cols && typeof(cols) == 'number' ? 'col-md-' + cols % 13 : 'col-md-4';

        //将指令参数配置到Controller上在指令间共享
        var opt = scope.dCtrl.opt = angular.extend({}, options);

        //定位元素位置
        var previous = selectors.items == '' ? el : el.find(selectors.items);
        var btnPrevious = selectors.buttons == '' ? el : el.find(selectors.buttons);
        var accordElem = !!selectors.accordions ? el.find(selectors.accordions) : null;

        angular.forEach(opt.items, function(t, i) {
            if (!t) return;
            //设置下拉列表默认的key,name标识
            t.keyName = !!t.keyName ? t.keyName : 'key';
            t.valName = !!t.valName ? t.valName : 'name';
            //设置元素默认列布局
            var elemCols = !!t.cols && typeof(t.cols) == 'number' ? 'col-md-' + t.cols % 13 : parentCols;
            //设置默认的验证要求
            t.validateAttr = t.validateAttr || [];
            if (!t.option && t.validateAttr.toString().indexOf('required') == -1) {
                t.validateAttr.push('required', 'required-error="该项为必填信息"');
            }
            //设置默认可选提示符
            var optionPrompt = (!!t.option || formStyle == '') ? '' : " * ",
                validError = setValidError(t.model); //'ng-class="{\'has-error\':!myForm[\'' + t.model + '\'].$valid && (myForm[\'' + t.model + '\'].$dirt || myForm.$submitted)}"';
            //未设置tooltip时，默认清空提示
            t.tooltip = t.tooltip || '';
            //设置数字输入默认的PlaceHolder提示语
            t.placeholder = t.placeholder || '';
            if (t.type == 'number' && !opt.isReadonlyForm)
                t.placeholder = t.placeholder || ('请填写数字，小数点保留两位');
            if (t.type == 'text' && !opt.isReadonlyForm)
                t.placeholder = t.placeholder || ('请输入' + t.label);
            if (t.type == 'date' && !opt.isReadonlyForm)
                t.placeholder = t.placeholder || ('点击选择日期');
            //设置鼠标点击事件函数名称
            var clickFnName = 'click' + i;
            if (typeof t.click == 'function') {
                opt[clickFnName] = function() {
                    t.click();
                };
            }
            //设置动态设置元素disable的函数名称
            var dynaIsReadModel = 'dynaIsReadModel' + i;
            opt[dynaIsReadModel] = t.readModel || {};

            //动态设置元素隐藏
            var hideModel = 'hideItemModel' + i;
            opt[hideModel] = t.hideModel || {};

            //设置初始化元素选项 
            var elemOptions = {
                label: t.label,
                type: t.type,
                placeholder: t.placeholder,
                model: 'options.model.' + t.model,
                formRequired: optionPrompt,
                validateAttr: t.validateAttr.join(' '),
                formName: t.model,
                validError: validError,
                cols: elemCols,
                formStyle: formStyle,
                tooltip: t.tooltip,
                click: 'dCtrl.opt.' + clickFnName + '()', //input元素的附加span点击
                spanCss: t.spanCss || 'glyphicon glyphicon-search',
                isShowSpan: !!t.click, //默认不添加span元素,
                hideModel: 'dCtrl.opt.' + hideModel,
                isHide: !!t.isHide,
                readModel: 'dCtrl.opt.' + dynaIsReadModel,
                isRead: !!opt.isReadonlyForm || !!t.isRead
            };

            if (t.type == 'text' || t.type == 'number' || t.type == 'password' || t.type == 'email' || t.type == 'tel') {
                previous.append(formatTemplate(elemOptions, uiComponents.textTemp));
            } else if (t.type == 'checkbox') {
                previous.append(formatTemplate(elemOptions, uiComponents.cbxTemp));
            } else if (t.type == 'note') {
                var hideLabel = 'hideItemLabel' + i;
                opt[hideLabel] = t.hideLabel || { isHide: true };
                elemOptions.hideLabel = 'dCtrl.opt.' + hideLabel;
                previous.append(formatTemplate(elemOptions, uiComponents.noteTemp));
            } else if (t.type == 'textarea') {
                previous.append(formatTemplate(elemOptions, uiComponents.textareaTemp));
            } else if (t.type == 'dropDown') {
                angular.extend(elemOptions, {
                    repeat: 'i.' + t.keyName + ' as i.' + t.valName + ' for i in dCtrl.opt.items[' + i + '].dataSource',
                    placeholder: t.placeholder || '请选择'
                });
                if (angular.isFunction(t.onChange)) {
                    elemOptions.onChange = 'ng-change="dCtrl.opt.items[' + i + '].onChange(' + elemOptions.model + ',options.model)"';
                } else {
                    elemOptions.onChange = "";
                }
                previous.append(formatTemplate(elemOptions, uiComponents.dropDownTemp));
                if (!!t.parent) {
                    var modelName = 'options.model.' + t.parent.model;
                    scope.$watch(modelName, function(n, o) {
                        if (n === o) return;
                        opt.items[i].dataSource = [];
                        if (!!!n) return;
                        t.parent.onChange(n).then(function(data) {
                            opt.items[i].dataSource = data;
                        }, null);
                    });
                }
            } else if (t.type == 'multiSelect') {
                opt.multiSelectLabels = {
                    itemsSelected: " 项已选择    ",
                    unselectAll: "清除选项"
                };
                angular.extend(elemOptions, {
                    dataSource: 'dCtrl.opt.items[' + i + '].dataSource',
                    placeholder: t.placeholder || '-- 请选择 --',
                    keyName: t.keyName,
                    valName: t.valName,
                    disp: 'dCtrl.opt.multiSelectLabels'
                });
                previous.append(formatTemplate(elemOptions, uiComponents.multiSelectTemp));
            } else if (t.type == 'date') {
                angular.extend(elemOptions, {
                    minView: !t.minView ? 'day' : t.minView,
                    minuteStep: !t.minuteStep ? '1' : t.minuteStep,
                    dropdownId: 'dropdown_' + t.model
                });
                elemOptions.dateFormat = dateFormatDef[elemOptions.minView];
                previous.append(formatTemplate(elemOptions, uiComponents.dateTemp));
            } else if (t.type == 'beginDateAndEndDate') {
                var template = !!options.renderSearch ? uiComponents.beginDateAndEndDateTemp.replace(/class="form-group"/ig, '') : uiComponents.beginDateAndEndDateTemp;

                var beginDateModel = t.beginDate.model;
                var endDateModel = t.endDate.model;

                var startDateBeforeRender = beginDateModel + 'BeforeRender';
                opt[startDateBeforeRender] = function($dates) {
                    var dateRangeEnd = opt.model[endDateModel];
                    if (dateRangeEnd) {
                        var activeDate = moment(dateRangeEnd);
                        $dates.filter(function(date) {
                            return date.localDateValue() >= activeDate.valueOf()
                        }).forEach(function(date) {
                            date.selectable = false;
                        })
                    }
                }

                var endDateBeforeRender = endDateModel + 'BeforeRender';
                opt[endDateBeforeRender] = function($view, $dates) {
                    var dateRangeStart = opt.model[beginDateModel];
                    if (dateRangeStart) {
                        var activeDate = moment(dateRangeStart).subtract(1, $view).add(1, 'minute');

                        $dates.filter(function(date) {
                            return date.localDateValue() <= activeDate.valueOf()
                        }).forEach(function(date) {
                            date.selectable = false;
                        })
                    }
                }

                var startDateOnSetTime = beginDateModel + 'OnSetTime';
                opt[startDateOnSetTime] = function() {
                    scope.$broadcast('start-date-changed');
                };

                var endDateOnSetTime = endDateModel + 'OnSetTime';
                opt[endDateOnSetTime] = function() {
                    scope.$broadcast('end-date-changed');
                    //如果设置为天的时候，结束日期自动设置到23点59分59秒
                    this.items.forEach(function(item) {
                        if (item.type == "beginDateAndEndDate" &&
                            item.endDate.model == endDateModel &&
                            !item.minView) {
                            opt.model[endDateModel].setHours(23, 59, 59, 999);
                            return;
                        }
                    });
                };

                angular.extend(elemOptions, {
                    minView: !t.minView ? 'day' : t.minView,
                    minuteStep: !t.minuteStep ? '1' : t.minuteStep,
                    cols: 'col-md-' + Number(elemCols.substr(elemCols.length - 1, 1)) * 2,
                    beginDateLabel: t.beginDate.label,
                    beginDatePlaceholder: !t.beginDate.placeholder ? "点击选择日期" : t.beginDate.placeholder,
                    beginDateModel: 'options.model.' + beginDateModel,
                    beginFormName: beginDateModel,
                    beginValidError: setValidError(beginDateModel),
                    endValidError: setValidError(endDateModel),
                    endFormName: endDateModel,
                    endDateLabel: t.endDate.label,
                    endDatePlaceholder: !t.endDate.placeholder ? "点击选择日期" : t.endDate.placeholder,
                    endDateModel: 'options.model.' + endDateModel,
                    startDateBeforeRender: 'dCtrl.opt.' + startDateBeforeRender + "($dates)",
                    endDateBeforeRender: 'dCtrl.opt.' + endDateBeforeRender + "($view, $dates)",
                    startDateOnSetTime: 'dCtrl.opt.' + startDateOnSetTime + "()",
                    endDateOnSetTime: 'dCtrl.opt.' + endDateOnSetTime + "()",
                    dropdownStart: "dropdownStart_" + beginDateModel.replace('.', '_'),
                    dropdownEnd: "dropdownEnd_" + endDateModel.replace('.', '_')
                });
                elemOptions.dateFormat = dateFormatDef[elemOptions.minView];
                previous.append(formatTemplate(elemOptions, template));
            } else if (t.type == 'placeHolder') {
                previous.append(formatTemplate(elemOptions, uiComponents.placeHolderTemp));
            } else if (t.type == 'address') {
                angular.extend(elemOptions, {
                    level: t.level || 2, //默认2级
                    isFullName: t.isFullName || false //默认显示简称
                });
                previous.append(formatTemplate(elemOptions, uiComponents.addressTemp));
            } else if (t.type == 'colorPicker') {
                opt.colorPickerOpt = {
                    required: !!!t.option,
                    disabled: opt.isReadonlyForm,
                    placeholder: t.placeholder,
                    inputClass: 'form-gropu',
                    name: t.model,
                    format: 'hex'
                };
                if (!opt.isReadonlyForm) {
                    angular.extend(opt.colorPickerOpt, {
                        close: {
                            show: true,
                            label: '关闭',
                            class: '',
                        },
                        clear: {
                            show: true,
                            label: '清空',
                            class: '',
                        },
                        reset: {
                            show: true,
                            label: '重置',
                            class: '',
                        }
                    });
                }
                previous.append(formatTemplate(elemOptions, uiComponents.colorPickerTemp));
            } else if (t.type == 'autoComplete') {
                var o = {
                    textSearching: t.textSearching || '搜索中...',
                    textNoResults: t.textNoResults || '无返回结果',
                    focusFirst: (t.focusFirst == null ? true : t.focusFirst),
                    searchFields: t.searchFields || "name",
                    titleField: t.titleField || "name",
                    minlength: t.minlength || 1,
                    id: t.type + t.model.replace('.', '_') + i,
                    localData: t.localData,
                    inputClass: t.inputClass || 'form-control',
                    placeholder: t.placeholder,
                    inputName: t.model,
                    fieldRequired: !!!t.option,
                    disableInput: !!elemOptions.isRead,
                    selectedObjectData: t.selectedObjectData,
                    initialValue: t.initialValue,
                    localSearch: t.localSearch,
                    remoteUrlRequestFormatter: t.remoteUrlRequestFormatter,
                    remoteUrlRequestWithCredentials: t.remoteUrlRequestWithCredentials,
                    remoteUrlResponseFormatter: t.remoteUrlResponseFormatter,
                    remoteUrlErrorCallback: t.remoteUrlErrorCallback,
                    remoteApiHandler: t.remoteApiHandler,
                    type: t.autoCompleteType || 'text',
                    remoteUrl: t.remoteUrl,
                    remoteUrlDataField: t.remoteUrlDataField,
                    descriptionField: t.descriptionField,
                    imageField: t.imageField,
                    pause: t.pause,
                    matchClass: t.matchClass,
                    clearSelected: t.clearSelected,
                    overrideSuggestions: t.overrideSuggestions,
                    fieldRequiredClass: t.fieldRequiredClass,
                    autoMatch: t.autoMatch,
                    focusOut: t.focusOut,
                    focusIn: t.focusIn,
                    fieldTabindex: t.fieldTabindex,
                    parseInput: t.parseInput
                };
                t.clearInput = function() {
                    scope.$broadcast('angucomplete-alt:clearInput', o.id);
                }
                t.setValue = function(val) {
                    scope.$broadcast("angucomplete-alt:changeInput", o.id, val);
                };
                var optAttrs = [],
                    str = '',
                    pushStr = '',
                    regEx = /([A-Z])/g,
                    optStr = 'dCtrl.opt.angucompleteAltOpt.',
                    optMap = {
                        // options.onSelectedObject 对应 selectedObject，其他都一一对应
                        selectedObject: '=',
                        selectedObjectData: '=',
                        disableInput: '=',
                        initialValue: '=',
                        localData: '=',
                        localSearch: '&',
                        remoteUrlRequestFormatter: '=',
                        remoteUrlRequestWithCredentials: '@',
                        remoteUrlResponseFormatter: '=',
                        remoteUrlErrorCallback: '=',
                        remoteApiHandler: '=',
                        id: '@',
                        type: '@',
                        placeholder: '@',
                        textSearching: '@',
                        textNoResults: '@',
                        remoteUrl: '@',
                        remoteUrlDataField: '@',
                        titleField: '@',
                        descriptionField: '@',
                        imageField: '@',
                        inputClass: '@',
                        pause: '@',
                        searchFields: '@',
                        minlength: '@',
                        matchClass: '@',
                        clearSelected: '@',
                        overrideSuggestions: '@',
                        fieldRequired: '=',
                        fieldRequiredClass: '@',
                        inputChanged: '=',
                        autoMatch: '@',
                        focusOut: '&',
                        focusIn: '&',
                        fieldTabindex: '@',
                        inputName: '@',
                        focusFirst: '@',
                        parseInput: '&'
                    };

                // onSelectedObject Map to selectedObject  value, selectedObjectData
                o.selectedObject = function(value, selectedObjectData) {
                    if (angular.isObject(value)) {
                        if (t.modelKey) {
                            scope.options.model[t.model] = value.originalObject[t.modelKey] || '';
                        } else {
                            scope.options.model[t.model] = value.originalObject || {};
                        }
                    } else {
                        scope.options.model[t.model] = value || '';
                    }

                    if (!!t.onSelected) {
                        if (angular.isFunction(t.onSelected) && value != null) {
                            t.onSelected(value, selectedObjectData);
                        }
                    }
                }

                o.inputChanged = function(value) {
                    if (t.modelKey && t.modelKey == t.model) {
                        scope.options.model[t.model] = value;
                        // 如果 modelKey 和 model 是同一字段时，只要 input 框非空，则设置为非必填
                        scope.dCtrl.opt.angucompleteAltOpt.fieldRequired = (value == '');
                    }
                    if (!!t.inputChanged) {
                        if (angular.isFunction(t.inputChanged)) {
                            t.inputChanged(value);
                        }
                    }
                }

                if (scope.myForm) {
                    var unWatchFn = scope.$watch(function() {
                        return scope.myForm[t.model];
                    }, function(newVal) {
                        if (newVal) {
                            unWatchFn();
                            var regex = /^(.*)-error=".*"$/ig;
                            var obj = {};
                            elemOptions.validateAttr.split(' ').forEach(function(c, i, a) {
                                regex.lastIndex = 0;
                                if (regex.test(c)) {
                                    regex.lastIndex = 0;
                                    obj[c.replace(regex, "$1Error")] = c.split('=')[1].replace(/["']/g, '');
                                }
                            });
                            scope.myForm[t.model].errorMsg = obj;
                        }
                    });
                }
                opt.angucompleteAltOpt = o;
                angular.forEach(o, function(v, i) {
                    if (v == null) return;
                    pushStr = '';
                    str = '';
                    regEx.lastIndex = 0;
                    str = i
                    if (regEx.test(i)) {
                        regEx.lastIndex = 0;
                        str = i.replace(regEx, function(p) {
                            return '-' + p.toLowerCase();
                        });
                    }
                    if (optMap[i] == "@") {
                        pushStr = (str + '="{{' + optStr + i + '}}"');
                    } else {
                        pushStr = (str + '="' + optStr + i + '"');
                    }
                    optAttrs.push(pushStr);
                });
                angular.extend(elemOptions, { angucompleteAltOptAttrs: optAttrs.join(' ') });
                previous.append(formatTemplate(elemOptions, uiComponents.angucompleteAltTemp));
            }
        });

        angular.forEach(opt.buttons, function(t, i) {

            //如果空对象或未定义则继续下一个
            if (!t) return;

            //未提供type时，默认使用bkmButton
            t.type = !!t.type ? t.type : 'bkmButton';
            //未设置tooltip时，默认清空提示信息
            t.tooltip = t.tooltip || '';

            //设置动态设置元素disable的函数名称
            var dynaIsReadModel = 'dynaIsReadBtnModel' + i;
            opt[dynaIsReadModel] = t.readModel || {};

            //动态设置元素隐藏
            var hideModel = 'hideBtnModel' + i;
            opt[hideModel] = t.hideModel || {};

            //设置初始化button选项
            var btnClickFnName = 'buttonClick' + i;
            var btnOptions = {
                text: t.text,
                className: t.className,
                icon: t.icon,
                tooltip: t.tooltip,
                hideModel: 'dCtrl.opt.' + hideModel,
                isHide: !!t.isHide,
                readModel: 'dCtrl.opt.' + dynaIsReadModel,
                isRead: !!opt.isReadonlyForm || !!t.isRead,
                click: 'dCtrl.opt.' + btnClickFnName + '()'
            };
            opt[btnClickFnName] = function() {
                t.click();
            };

            if (t.type == 'button') {
                btnPrevious.append(formatTemplate(btnOptions, uiComponents.buttonTemp));
            } else if (t.type == 'downloadButton') {
                opt[btnClickFnName] = function(event) {
                    var url = t.click();
                    if (!!url) {
                        event.currentTarget.parentElement.href = url;
                    }
                };
                angular.extend(btnOptions, {
                    click: 'dCtrl.opt.' + btnClickFnName + '($event)',
                    model: ''
                });
                btnPrevious.append(formatTemplate(btnOptions, uiComponents.downloadButtonTemp));
            } else if (t.type == 'bkmButton') {
                angular.extend(btnOptions, { category: t.category });
                btnPrevious.append(formatTemplate(btnOptions, uiComponents.bkmButtonTemp));
            } else if (t.type == 'inputFileBtn') {
                btnOptions.btnId = 'inputFileBtn' + i;
                btnOptions.inputFileOnload = 'inputFileOnload' + i;
                //绑定change事件
                scope.$on(btnOptions.inputFileOnload, function(sender, obj) {
                    obj.on('change', onFileInputChange);

                    function onFileInputChange() {
                        var senderObje = this,
                            file = this.files[0];
                        if (!!!file.name.match(t.fileType.join('|'))) {
                            toastr.warning('文件类型不正确!');
                            return;
                        }
                        bkmFileUpload
                            .upload([file], { type: t.fileType })
                            .then(function(response) {
                                resetInputFile(senderObje);
                                if (!!!response.data || !!!response.data[0].isSucess) {
                                    toastr.error('文件上传失败');
                                    return;
                                }
                                t.onUploaded(response);
                            }).catch(function(result) {
                                if (result.message) {
                                    toastr.error(result.message);
                                }
                            });

                        function resetInputFile(sender) {
                            var inputAttr = [],
                                len = sender.attributes.length,
                                newInput, parentNode,
                                inputElemObj = $(sender);

                            parentNode = inputElemObj.parent();
                            for (var i = 0; i < len; i++) {
                                inputAttr.push(sender.attributes[i].name + '="' + sender.attributes[i].value + '"');
                            }
                            newInput = $('<input ' + inputAttr.join(' ') + '/>');
                            newInput.on('change', onFileInputChange);
                            inputElemObj.remove();
                            parentNode.append(newInput);
                        }

                    }
                });
                btnPrevious.append(formatTemplate(btnOptions, uiComponents.inputFileBtnTemp));
            }
        });

        angular.forEach(opt.accordions, function(t, i) {
            //动态设置元素隐藏
            var hideModel = 'hideAccordionModel' + i;
            opt[hideModel] = t.hideModel || {};
            var accordOptions = {
                title: t.title,
                accordId: t.accordId,
                isExpanded: !!t.isExpanded,
                hideModel: 'dCtrl.opt.' + hideModel
            };
            accordElem.append(formatTemplate(accordOptions, uiComponents.accordTemp));
        });

        function formatTemplate(dta, tmpl) {
            var format = {
                name: function(x) {
                    return x;
                }
            };
            return tmpl.replace(/{(\w+)}/g, function(m1, m2) {
                if (!m2) return "";
                return (format && format[m2]) ? format[m2](dta[m2]) : dta[m2];
            });
        }

        function setValidError(modelName) {
            return 'ng-class="{\'has-error\':!myForm[\'' + modelName + '\'].$valid && (myForm[\'' + modelName + '\'].$dirt || myForm.$submitted)}"';
        }
    }

})();