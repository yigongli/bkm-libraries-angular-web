/**
 * Created by gurihui on 2016/12/30.
 */
(function () {
    'use strict';

    angular.module('bkm.library.angular.web')
        .controller('directiveCtrl', directiveCtrl)
        .directive('bkmSearch', ['$compile', 'publicLinkFuncService', bkmSearch])
        .directive('bkmGeneralCrud', ['$compile', '$uibModal', 'toastr', 'abp.services.app.fileUtil', 'bkmFileUpload', 'publicLinkFuncService', bkmGeneralCrud])
        .directive('bkmElements', ['$compile', '$filter', 'publicLinkFuncService', bkmElements])
        .directive('bkmMsgModal', ['$compile', 'publicLinkFuncService', bkmMsgModal])
        .directive('bkmModalForm', ['$compile', 'bkmFmValSvc', 'publicLinkFuncService', bkmModalForm])
        .run(['toastr', '$uibModal', 'bkmCommGetDict', '$templateCache', '$timeout', function (toastr, $uibModal, dict, $templateCache, $timeout) {
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
                                <div ng-if="options.attaches.isShowUpFileType" style="display:inline-block">\
                                    <select ng-model="options.attaches.upFileTypeValue" ng-change="options.attaches.upFileTypeValueChange()" class="form-control selectpicker ng-pristine ng-invalid ng-invalid-required ng-touched" ng-options="o.name as o.name for o in options.attaches.upFileTypeObj">\
                                        <option value="">-- 请选择附件类型 --</option>\
                                    </select>\
                                </div>\
                                <i ng-if="!options.attaches.fileUpdisabled" class="fa fa-upload" aria-hidden="true"><a ngf-select="options.attaches.uploadFiles($files)" ngf-pattern="{{options.attaches.attachesPattern}}" ngf-multiple="{{options.attaches.multiple}}">&nbsp;&nbsp;添加附件...</a></i>\
                            </div>\
                        </div>\
                        <div ui-grid="options.attaches.gridOption" class="grid" ui-grid-selection ui-grid-auto-resize ng-style="options.attaches.gridOption.autoHeight()"></div>\
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
             * @param input {scope,getAllDataFn,toastr,isInitLoad,registerCustomizedApi,paramsSetting} 接收的值
             * getAllDataFn:需要传入的查询服务方法,
             * isInitLoad:是否需要在页面首次打开时加载数据
             * registerCustomizedApi: 需要controller中定义的UI-GRID事件方法,
             * paramsSetting： 在调用searchData方法时需要额外配置的查询参数
             * uiGridName 给每一个grid唯一的一个标识
             * @returns {string} 返回替换后的值
             */
            window.baseSearchFn = function ($scope,
                getAllDataFn,
                paramsSetting,
                isInitLoad,
                registerCustomizedApi,
                uiGridName) {

                var self = this;

                //兼容参数传递
                $scope = $scope ? $scope : self.$scope;
                getAllDataFn = angular.isFunction(self.getAllDataFn) ? self.getAllDataFn : getAllDataFn;
                paramsSetting = angular.isFunction(self.paramsSetting) ? self.paramsSetting : paramsSetting;
                isInitLoad = self.isInitLoad != null ? self.isInitLoad : isInitLoad;
                registerCustomizedApi = angular.isFunction(self.registerCustomizedApi) ? self.registerCustomizedApi : registerCustomizedApi;
                uiGridName = angular.isString(self.uiGridName) ? self.uiGridName : uiGridName;
                var rowHeight = self.rowHeight == null ? 30 : self.rowHeight,
                    isReserveSelection = self.isReserveSelection != null ? self.isReserveSelection : false;

                //构造页面查询参数基类对象
                self.params = self.params || {};
                angular.extend(self.params, {
                    skipCount: '0',
                    maxResultCount: '10'
                });
                //设置UI-GRID属性参数
                self.gridOption = baseUiGridProp();
                //配置UI-GRID的grid.appScope的作用域为当前Ctrl
                self.gridOption.appScopeProvider = self;
                //UI-GRID高度自动伸缩函数
                self.gridOption.autoHeight = function () {
                    return {
                        height: ((self.gridOption.paginationPageSize + 1) * rowHeight + rowHeight) + "px"
                    };
                };

                //初始化列表标识
                if (angular.isString(uiGridName) && uiGridName.length > 0) {
                    self.gridOption.gridMenuCustomItems = [{
                        title: '保存列状态',
                        action: function ($event) {
                            localStorage.setItem(uiGridName, JSON.stringify(this.grid.api.saveState.save()));
                            toastr.info("列状态保存成功!");
                        },
                        order: 210
                    }];
                }

                //注册事件回调函数
                self.gridApi = {};
                self.gridOption.onRegisterApi = function (gridApi) {
                    self.gridApi = gridApi;
                    //判断在页面第一次加载的时候需要加载数据
                    if (isInitLoad == null || isInitLoad) {
                        getData(1, self.gridOption.paginationPageSize);
                    } else {
                        // 初始化表格列表的数据为空
                        self.gridOption.data = self.gridOption.data || [];
                    }

                    //判断是否传入了grid标识
                    if (angular.isString(uiGridName) && uiGridName.length > 0) {
                        var item = localStorage.getItem(uiGridName);
                        if (!!item) {
                            setTimeout(function () {
                                self.gridApi.saveState.restore(null, JSON.parse(item));
                            }, 1);
                        }
                    }

                    // 注册click事件回调方法 
                    if (self.gridOption.enableFullRowSelection) {
                        gridApi.grid.element.on('click', (ev) => {
                            if (ev.target.className.includes('ui-grid-cell-contents')) {
                                self.gridApi.selection.clearSelectedRows();
                                self.gridApi.selection.selectRow(self.selectedRowEntity);
                            }
                        });
                    }

                    //注册UI-GRID翻页函数
                    if (gridApi.pagination) {
                        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                            getData(newPage, pageSize);
                            // 翻页事件回调
                            if (angular.isFunction(self.onPaginationChanged)) {
                                $timeout(() => self.onPaginationChanged(newPage, pageSize));
                            }
                        });
                    }
                    //注册Controller自己的UI-GRID 个性化事件
                    if (angular.isFunction(registerCustomizedApi)) {
                        registerCustomizedApi(gridApi);
                    }
                    //注册行事件选择
                    gridApi.selection.on.rowSelectionChanged($scope, (row) => {
                        if (isReserveSelection) {
                            self.currentRowIndex = bkm.util.indexOf(self.gridOption.data, 'id', row.entity.id);
                        }
                        self.selectedRowEntity = row.entity;
                        // 行选择事件回调
                        if (angular.isFunction(self.rowSelChangeCallback)) {
                            self.rowSelChangeCallback(row);
                        }
                    });

                };

                //查询数据
                self.searchData = getData;

                function getData(customParams) {
                    if (!angular.isFunction(getAllDataFn)) return;
                    //合并分页查询参数
                    self.params.skipCount = (typeof self.gridApi.pagination == 'object') ? (self.gridApi.pagination.getPage() - 1) * self.gridOption.paginationPageSize : 0;
                    self.params.maxResultCount = self.gridOption.paginationPageSize;
                    //查询参数处理回调函数
                    if (typeof paramsSetting == 'function') {
                        paramsSetting(self.params);
                    }
                    var getAllInput = self.params;
                    // 如果提供了直接查询参数对象，则不使用内置参数对象
                    if (angular.isObject(customParams)) {
                        customParams.skipCount = customParams.skipCount == null ? self.params.skipCount : customParams.skipCount;
                        customParams.maxResultCount = customParams.maxResultCount == null ? self.params.maxResultCount : customParams.maxResultCount;
                        getAllInput = customParams;
                    }
                    //调用查询服务
                    getAllDataFn(getAllInput)
                        .then(function (result) {
                            self.gridOption.totalItems = result.data.totalCount;
                            var dataItems = result.data.items || [];
                            if (typeof self.searchSuccessFn == 'function') {
                                self.searchSuccessFn(dataItems, getAllInput);
                            }
                            var gridOptionData = self.gridOption.data || [];
                            // 先清空原来的数据
                            gridOptionData.splice(0, gridOptionData.length);
                            // 再更新为新的数据
                            gridOptionData.push.apply(gridOptionData, dataItems);

                            if (isReserveSelection) {
                                $timeout(() => self.gridApi.selection.selectRow(self.gridOption.data[self.currentRowIndex > 0 ? self.currentRowIndex : 0]));
                            }
                        })
                        .catch(err => toastr.warning(err));
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
                        exporterMenuExcel: false,
                        exporterMenuPdf: false,
                        exporterSuppressColumns: []
                    });
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
            window.baseApproveFn = function (parentCtrl, rowEntity, rejectSuccessCallback) {
                var self = parentCtrl;
                //获取所选择审核的记录
                var rtnRow = rowEntity || self.gridApi.selection.getSelectedRows()[0];
                if (!rtnRow) {
                    toastr.info("请先选择要审批的记录!");
                    return;
                }
                //初始化审核参数
                var approveParams = {
                    promptName: self.formSetting.promptName || '',
                    approveSvcFn: self.formSetting.approveSvcFn || self.formSetting.resourceSvc.approve,
                    validStatus: [0, 1],
                    statusField: 'status',
                    items: [],
                    buttons: []
                };
                angular.extend(approveParams, self.formSetting.approveParams);
                approveParams.formModel = {
                    relatedId: rtnRow.id
                };
                if (angular.isFunction(approveParams.getFormModel)) {
                    approveParams.getFormModel(approveParams.formModel);
                }
                var promptName = approveParams.promptName;
                var approveSvcFn = approveParams.approveSvcFn;
                var validStatus = approveParams.validStatus;
                var formItems = approveParams.items.concat([{
                    type: 'textarea',
                    model: 'reason',
                    label: '备注',
                    option: true,
                    cols: 12
                },
                {
                    type: 'dropDown',
                    model: 'type',
                    label: '拒绝原因类型',
                    option: true,
                    cols: 12,
                    dataSource: dict.dictionary[dict.AuditType()]
                }
                ]);
                var statusField = approveParams.statusField;
                //判断审核状态是否符合条件
                var found = validStatus.filter(item => item == rtnRow[statusField]);
                if (found.length == 0) {
                    toastr.info(bkm.util.format("请选择 {0} 状态为待审核的记录!", promptName));
                    return;
                }
                //审核的对话框
                var uibModalInstance = $uibModal.open({
                    backdrop: false,
                    animation: true,
                    template: '<bkm-modal-form options="ctrl.formOption"></bkm-modal-form>',
                    controller: ['$uibModalInstance', '$scope', function ($uibModalInstance, $scope) {
                        //初始化数据模型
                        var ctrl = this;
                        ctrl.formOption = {};
                        var formModel = ctrl.formOption.model = approveParams.formModel;
                        //表单数据模型绑定
                        $scope.modalTitle = promptName + '审核';
                        var buttons = approveParams.buttons.concat([{
                            text: '同意',
                            category: 'approve',
                            click: approveFn
                        },
                        {
                            text: '拒绝',
                            category: 'reject',
                            click: rejectFn
                        }
                        ]);
                        angular.extend(ctrl.formOption, {
                            items: formItems,
                            buttons: buttons
                        });
                        //审核通过
                        function approveFn() {
                            ctrl.formOption.onSubmit(function (validResult) {
                                if (!validResult.isSuccess) {
                                    toastr.warning('您有未填写完整的数据，请按照错误提示补充完善，谢谢！');
                                    return;
                                }
                                formModel.isPass = true;
                                approveSvcFn(formModel)
                                    .then(function (result) {
                                        toastr.success("审核成功!");
                                        $uibModalInstance.close();
                                        self.searchData();
                                    });
                            });
                        };
                        //审核不通过
                        function rejectFn() {
                            if (formModel.type == null) {
                                toastr.info("请选择拒绝原因的类型!");
                                return;
                            }
                            var modalInstance = $uibModal.open({
                                backdrop: false,
                                animation: true,
                                controller: function () {
                                    var mCtrl = this;
                                    mCtrl.message = "您确认要拒绝吗?";
                                },
                                controllerAs: 'mCtrl',
                                template: '<bkm-msg-modal message="mCtrl.message" cancel=true category="danger" ></bkm-msg-modal>'
                            });
                            modalInstance.result
                                .then(function (result) {
                                    angular.extend(formModel, {
                                        isPass: false,
                                        type: formModel.type,
                                        reason: formModel.reason
                                    });
                                    return approveSvcFn(formModel);
                                })
                                .then(function (result) {
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
                    resolve: null
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
            window.simpleFormModelDalg = function (parentCtrl, rowEntity, formOption) {

                var self = parentCtrl;

                //获取所选择审核的记录
                var rtnRows = [];
                rtnRows[0] = rowEntity || self.gridApi.selection.getSelectedRows()[0];

                //审核的对话框
                var uibModalInstance = $uibModal.open({
                    backdrop: false,
                    animation: true,
                    template: '<bkm-modal-form options="ctrl.formOption"></bkm-modal-form>',
                    controller: ['$uibModalInstance', '$scope', function ($uibModalInstance, $scope) {

                        //初始化数据模型
                        var ctrl = this;
                        ctrl.formOption = {};
                        var formModel = ctrl.formOption.model = self.formSetting.approveParams || rtnRows[0]; // || { relatedId: rtnRows[0].id };

                        angular.forEach(formOption.buttons, function (v, i) {
                            var tClick = v.click;
                            v.click = function (e) {
                                if (!!v.onClickConfirm) {
                                    confirmFn(v.onClickConfirm, tClick);
                                } else {
                                    tClick({
                                        e: e,
                                        uibModalInstance: $uibModalInstance,
                                        formModel: formModel
                                    });
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
                                controller: function () {
                                    var mCtrl = this;
                                    mCtrl.message = opt.message; // "您确认要拒绝吗?";
                                },
                                controllerAs: 'mCtrl',
                                template: '<bkm-msg-modal message="mCtrl.message" cancel=true category="danger" ></bkm-msg-modal>'
                            });

                            modalInstance.result
                                .then(function (result) {
                                    return clickFn({
                                        formModel: formModel
                                    });
                                })
                                .then(function (result) {
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
                        items: function () {
                            return rtnRows;
                        }
                    }
                });
            };

        }]);

    function directiveCtrl() {
        let ctrl = this;
        // 初始化显示上传按钮
        ctrl.isShowUploadBtn = true;
        ctrl.toggleUploadBtn = () => ctrl.isShowUploadBtn = !ctrl.isShowUploadBtn

    };

    function bkmElements($compile, $filter, publicLinkFuncSvc) {
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
            link: function (scope, el, attrs, ctrl) {

                var formCtrlOpt = ctrl.opt.includeOption || [];
                if (scope.isAccordions) {
                    var result = $filter('filter')(ctrl.opt.accordions, {
                        accordId: scope.accordionId
                    }, true);
                    formCtrlOpt = result.length == 0 ? formCtrlOpt : result[0].accordOption;
                }
                scope.options = !!scope.includeOption ? scope.includeOption : formCtrlOpt;
                publicLinkFuncSvc.linkFunc(
                    scope,
                    el,
                    {
                        items: '',
                        buttons: ''
                    },
                    scope.options,
                    scope.cols,
                    'form-group',
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
    function bkmSearch($compile, publicLinkFuncSvc) {
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
            link: function (scope, el, attrs) {
                //定义默认的布局列数
                var cols = !!scope.cols ? scope.cols : 4;
                scope.options.renderSearch = true;
                publicLinkFuncSvc.linkFunc(
                    scope,
                    el,
                    {
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
     * 通用的增删改查指令
     *
     * @param {*} $compile
     * @param {*} $uibModal
     * @param {*} toastr
     * @param {*} fileSvc
     * @param {*} bkmUpload
     * @param {*} publicLinkFuncSvc
     * @returns
     */
    function bkmGeneralCrud($compile, $uibModal, toastr, fileSvc, bkmUpload, publicLinkFuncSvc) {
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
            link: function (scope, el, attrs) {
                //定义默认的布局列数
                var cols = scope.cols ? scope.cols : 3;
                //获取options中定义的parentCtrl
                if (!scope.options || !scope.options.parentCtrl) {
                    toastr.warning("应用内部错误：请将错误截图，联系系统管理员!");
                    return;
                }
                var parentCtrl = scope.options.parentCtrl,
                    formSetting = parentCtrl.formSetting;

                //显示详情
                parentCtrl.display = function (row) {
                    row.isEdit = false;
                    modalForm(row, formSetting, bkmUpload.upload, fileSvc.getAll, $uibModal);
                }
                //编辑
                parentCtrl.edit = function (row) {
                    row.isEdit = true;
                    modalForm(row, formSetting, bkmUpload.upload, fileSvc.getAll, $uibModal, parentCtrl.searchData);
                }
                //删除
                parentCtrl.delete = function (row) {
                    if (!row) {
                        toastr.info("请选择要删除的记录!");
                        return;
                    }
                    //删除数据回调
                    if (!!formSetting && typeof formSetting.deleteRowFn == 'function') {
                        var isGoingon = formSetting.deleteRowFn(row.entity);
                        //如果不继续提交则直接返回
                        if (isGoingon != undefined && !isGoingon)
                            return;
                    }
                    var delSvcFn = formSetting.delSvcFn || formSetting.resourceSvc.delete,
                        delParas = formSetting.deleteParas || { id: row.entity.id },
                        delPrompt = formSetting.delPrompt || "您确认要删除吗?",
                        modalInstance = $uibModal.open({
                            backdrop: false,
                            animation: true,
                            controller: function () {
                                var mCtrl = this;
                                mCtrl.message = delPrompt;
                            },
                            controllerAs: 'mCtrl',
                            template: '<bkm-msg-modal message="mCtrl.message" cancel=true category="danger" ></bkm-msg-modal>'
                        });
                    modalInstance.result
                        .then(() => delSvcFn(delParas))
                        .then(() => {
                            parentCtrl.searchData();
                            toastr.success("已被成功的删除!");
                        });
                }
                //添加
                parentCtrl.add = function () {
                    modalForm(null, formSetting, bkmUpload.upload, fileSvc.getAll, $uibModal, parentCtrl.searchData);
                }
                //审核操作
                parentCtrl.approve = function () {
                    baseApproveFn(parentCtrl);
                }
                // 渲染search区域时，组件样式的处理
                scope.options.renderSearch = true;
                publicLinkFuncSvc.linkFunc(
                    scope,
                    el,
                    {
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


    function bkmMsgModal($compile, publicLinkFuncSvc) {
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
            link: function (scope, el) {
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

                scope.cancelMsg = function () {
                    scope.$parent.$dismiss('cancel');
                };

                scope.okMsg = function () {
                    scope.$parent.$close('ok');
                };

                if (angular.isString(scope.cancel) && scope.cancel.toLowerCase() == 'true') {
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
                publicLinkFuncSvc.linkFunc(
                    scope,
                    el,
                    {
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
    function bkmModalForm($compile, bkmFmValSvc, publicLinkFuncSvc) {
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

            link: function (scope, el) {
                //定义表单验证的回调函数
                scope.options.onSubmit = function (onSubmitFn) {
                    var myForm = scope.myForm;
                    myForm.$setSubmitted(true);
                    bkmFmValSvc.isValid(myForm).then(onSubmitFn, null);
                };
                //format body template
                publicLinkFuncSvc.linkFunc(
                    scope,
                    el,
                    {
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
                var pwdElm = el.find('.password');
                if (pwdElm != null && angular.isFunction(pwdElm.password)) {
                    pwdElm.password();
                }
                //判断是否移除掉附件列表的翻页控件
                if (!!scope.options.attaches && !!scope.options.attaches.isRemovePaging) {
                    setTimeout(function () {
                        el.find('v-pane-content .ui-grid-pager-panel').remove();
                    }, 0);
                }

            }
        };
    }

    /**
     * 附件列表操作 
     *
     * @param {*} appliedCtrl
     * @param {*} attchesPara
     * @param {*} scope
     * @param {*} isEdit - 附件列表是否处于编辑状态
     * @param {*} isNew - 附件列表是否处于新建状态
     */
    function attachesFn(appliedCtrl, $uibModal, attchesPara, scope, isEdit, isNew) {

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
            isShowUpFileType: !!attchesPara.isShowUpFileType, //默认为不使用上传文件类型
            upFileTypeValue: attchesPara.defaultFileType, //上传文件的默认类型
            fileUpdisabled: false, //是否禁用上传功能,默认启用
            isAttachesExpanded: self.formOption.isAttachesExpanded, //附件列表默认不展开
            uploadFn: attchesPara.uploadFn,
            getAllFn: attchesPara.getAllFn
        };

        // 启用文件类型时初始化
        if (attaches.isShowUpFileType) {
            //需要文件类型是请求数据
            self.upFileTypeObj = {};
            if (typeof attchesPara.getUpFileTypeFn == 'function') {
                attchesPara.getUpFileTypeFn(attchesPara.rtnRow)
                    .then((data) => {
                        angular.extend(self.upFileTypeObj, data.items);
                    });
            }
            //添加文件类型选择
            angular.extend(attaches, {
                upFileTypeObj: self.upFileTypeObj,
                fileUpdisabled: attaches.upFileTypeValue == null,
                upFileTypeValueChange: () => attaches.fileUpdisabled = !attaches.upFileTypeValue
            });
        }
        //删除附件
        attaches.delAttch = function (row) {
            var modalInstance = $uibModal.open({
                backdrop: false,
                animation: true,
                controller: function () {
                    var mCtrl = this;
                    mCtrl.message = "您确认要删除该附件吗?";
                },
                controllerAs: 'mCtrl',
                template: '<bkm-msg-modal message="mCtrl.message" cancel=true category="warning" ></bkm-msg-modal>'
            });

            modalInstance.result
                .then( () => {
                    var index = bkm.util.indexOf(attaches.gridOption.data, 'id', row.entity.id);
                    attaches.gridOption.data.splice(index, 1);
                });

        };

        //继承基类查询对象, 附件不分页，默认返回最大1000条数据
        baseSearchFn.apply(attaches, [scope, attaches.getAllFn, (params) => params.maxResultCount = 1000, false]);

        //配置查询参数
        if (!isNew) {
            angular.extend(attaches.params, attchesPara.queryParam);
        }

        //配置附件列表的高度，默认为5个行高
        angular.extend(attaches.gridOption, {
            paginationPageSize: 5
        });

        attaches.gridOption.columnDefs = [{
            field: " ",
            displayName: '附件名称',
            cellTemplate: '<div class="operation attaches"> <a target="blank" href="{{row.entity.id|pathUrl}}">{{row.entity.name}}</a></div>'
        },
        {
            field: "category",
            displayName: "业务分类"
        },
        {
            field: "contentType",
            displayName: "附件类型"
        },
        {
            field: "contentLength",
            displayName: "附件大小(KB)",
            cellFilter: "kbSize|number"
        },
        {
            field: "creatorName",
            displayName: "创建人"
        },
        {
            field: "creationTime",
            displayName: "创建时间",
            cellFilter: "date:'yyyy-MM-dd HH:mm'"
        },
        {
            field: "operation",
            displayName: '操作',
            cellTemplate: '<div class="operation"> <a  href="{{row.entity.id|pathUrl:true}}">下载&nbsp;&nbsp;</a><a ng-if="grid.appScope.isShowDelete"  ng-click="grid.appScope.delAttch(row);">删除</a></div>'
        }];
        

        //上传附件服务调用
        attaches.uploadFiles = function (files) {
            if (!files || !files.length) {
                return;
            }
            let f = {
                sendFormData: {
                    fileAdditions: []
                },
                uploadFiles: files
            },
                imageInfo = !!attchesPara.attachTypes && attchesPara.attachTypes.length ? {
                    type: attchesPara.attachTypes.join('').split('.')
                } : true;
            // 文件业务类型
            if (attaches.upFileTypeValue != null) {
                for (var i = 0; i < files.length; i++) {
                    f.sendFormData.fileAdditions.push({
                        alias: attaches.upFileTypeValue,
                        name: files[i].name
                    });
                }
            } else {
                f = files;
            }

            // 把files存放到filesLists中
            attaches.uploadFn(f, imageInfo).then((response) => {
                let filesLists = [];
                for (var x in files) {
                    var fileData = {};
                    fileData.name = response.data[0].name;
                    fileData.contentType = files[x].type;
                    fileData.contentLength = files[x].size;
                    fileData.id = response.data[x].id;
                    fileData.category = response.data[0].category;
                    filesLists.push(fileData);
                }
                attaches.gridOption.data = attaches.gridOption.data.concat(filesLists);
            });
        };
    }

    /**
     * 新建、查看、编辑的表单
     *
     * @param {*} row - 当前行记录
     * @param {*} formSetting - 表单配置
     * @param {*} uploadFn - 上传文件方法
     * @param {*} fileGetAllFn - 附件默认的获取方法
     * @param {*} $uibModal - 
     * @param {*} successCallback - 表单提交成功后的回调方法
     */
    function modalForm(row, formSetting, uploadFn, fileGetAllFn, $uibModal, successCallback) {
        let backdrop = formSetting ? formSetting.backdrop : false,
            modalSize = formSetting && formSetting.size ? formSetting.size : 'lg'

        $uibModal.open({
            backdrop: false,
            animation: false,
            windowClass: backdrop == null ? 'bkm-backdrop' : null,
            template: '<bkm-modal-form options="ctrl.formOption"></bkm-modal-form>',
            controller: ['$scope', '$uibModalInstance', 'toastr', function ($scope, $uibModalInstance, toastr) {
                let ctrl = this,
                    rtnRow = row != null ? row.entity : null,
                    isEdit = row != null ? row.isEdit : false;

                //初始化数据模型
                ctrl.formOption = {};
                let formModel = ctrl.formOption.model = {},
                    resourceSvc = formSetting.resourceSvc,
                    getSvcFn = formSetting.getSvcFn || resourceSvc.get,
                    createSvcFn = formSetting.createSvcFn || resourceSvc.create,
                    updateSvcFn = formSetting.updateSvcFn || resourceSvc.update,
                    newFormOption = {};
                //初始化表单数据模型回调
                if (typeof formSetting.initFormModelFn == 'function') {
                    formSetting.initFormModelFn(newFormOption, formModel, rtnRow, isEdit);
                }
                //表单标题头提示
                let promptName = formSetting.promptName || '';
                $scope.modalTitle = !rtnRow ? '新建' + promptName : promptName + "详情";
                //配置新建表单指令参数
                let btns = newFormOption.buttons || [];
                Object.assign(ctrl.formOption, newFormOption, {
                    buttons: rtnRow && !isEdit ? [] : btns.concat([{
                        text: '提交',
                        category: 'submit',
                        click: submitFn
                    }])
                });

                //定义附件列表的模板文件地址(缓冲模板文件)
                let attachesTempUrl = 'attatchesList.html';
                // 初始化附件查询参数对象
                let attachesPara = Object.assign({
                    queryParam: { relatedId: rtnRow ? rtnRow.id : '' },
                    defaultFileType: null,
                    isShowUpFileType: false,
                    getUpFileTypeFn: null,
                    isAttachesExpanded: false,
                    rtnRow: rtnRow,
                    uploadFn: uploadFn,
                    getAllFn: fileGetAllFn
                }, formSetting.attachesPara);

                if (rtnRow) {
                    //直接将rtnRow中的数据绑定在表单上
                    if (rtnRow.isShowData) {
                        bindResultToForm(rtnRow);
                    } else { //通过rtnRow.id先查询明细，将查询结果绑定在表单上
                        //设置Get方法参数的默认值：id
                        var getParas = {
                            id: rtnRow.id
                        };
                        //判断是否存在get方法的额外参数
                        if (rtnRow.addiParas) {
                            angular.extend(getParas, {
                                type: rtnRow.addiParas
                            });
                        }
                        // 判断是否存在get方法的额外参数对象
                        if (angular.isObject(rtnRow.addiParasObj)) {
                            angular.extend(getParas, rtnRow.addiParasObj);
                        }
                        //获取信息
                        getSvcFn(getParas)
                            .then(function (result) {
                                var items = result.data || [];
                                bindResultToForm(items);
                            });
                    }
                } else if (!!formSetting.hasAttaches) {
                    angular.extend(ctrl.formOption, {
                        includeAttachesUrl: attachesTempUrl,
                        isAttachesExpanded: attachesPara.isAttachesExpanded || false
                    });
                    attachesFn(ctrl, $uibModal, attachesPara, $scope, isEdit, !rtnRow);
                }

                //数据绑定的公共函数
                function bindResultToForm(items) {
                    //表单数据绑定
                    angular.extend(formModel, items);
                    //表单绑定数据处理回调
                    if (typeof formSetting.getSuccessFn == 'function') {
                        formSetting.getSuccessFn(formModel, items, attachesPara);
                    }
                    //表单中的公共附件列表数据绑定
                    if (!!formSetting.hasAttaches) {
                        angular.extend(ctrl.formOption, {
                            includeAttachesUrl: attachesTempUrl,
                            isAttachesExpanded: attachesPara.isAttachesExpanded || false
                        });
                        attachesFn(ctrl, $uibModal, attachesPara, $scope, isEdit && !formModel.isReadAttaches, !rtnRow);
                        angular.extend(ctrl.formOption.attaches.params, attachesPara.queryParam);
                        ctrl.formOption.attaches.searchData();
                    }
                }

                //提交表单
                function submitFn() {
                    ctrl.formOption.onSubmit((validResult) => {
                        if (!formSetting) {
                            toastr.danger("应用内部错误：请将错误截图，联系系统管理员!");
                            return;
                        }
                        if (!validResult.isSuccess) {
                            toastr.warning('您有未填写完整的数据，请按照错误提示补充完善，谢谢！');
                            return;
                        }
                        //设置附件列表的数据
                        if (!!formSetting.hasAttaches) {
                            formModel.attachments = ctrl.formOption.attaches.gridOption.data.map(v => {
                                return {
                                    category: v.category,
                                    contentLength: v.contentLength,
                                    contentType: v.contentType,
                                    id: v.id,
                                    lastModified: v.lastModified,
                                    lastModifiedDate: v.lastModifiedDate,
                                    name: v.name,
                                    size: v.size,
                                    type: v.type,
                                    webkitRelativePath: v.webkitRelativePath
                                };
                            });
                        }
                        //数据处理回调
                        if (typeof formSetting.beforeSubmitFn == 'function') {
                            var isGoingon = formSetting.beforeSubmitFn(formModel);
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
                                .then((result) => {
                                    if ((!formSetting.isDisableSubmitRefresh) && typeof successCallback == 'function') {
                                        successCallback();
                                        let successMsg = formSetting.addOrUpdateSuccessMsg || '提交成功，请继续添加或点击关闭按钮返回！';
                                        toastr.success(successMsg);
                                    }
                                    //更新成功处理回调
                                    if (typeof formSetting.postSubmitFn == 'function') {
                                        formSetting.postSubmitFn(formModel, result);
                                    }
                                    $uibModalInstance.close();
                                });
                        }
                    });
                };
            }],
            controllerAs: 'ctrl',
            size: modalSize,
            resolve: {
                items: {}
            }
        });
    };


})();