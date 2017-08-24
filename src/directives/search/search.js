/**
 * Created by gurihui on 2016/12/30.
 */
(function () {
    'use strict';

    var formComponents = {
        textTemp: '<div ng-hide="{isHide}" class="{cols}"><div class="{formStyle}" style="position:relative;" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<input bkm-input bkm-form-valid-icon={isShowSpan} name="{formName}" class="form-control {type}" type="{type}" placeholder="{placeholder}" {validateAttr} ng-model="{model}"  ng-disabled="{readModel}.isRead||{isRead}"   uib-popover="{tooltip}" popover-trigger="\'focus\'"/><span ng-if={isShowSpan} class="input-icon {spanCss} " ng-click="{click}" ></span></div></div>',
        noteTemp: '<div class="{cols}"><div style="position:relative;"><label style="color:red;font-weight:normal;padding-top:5px;">{label}{{{model}}}</label></div></div>',
        textareaTemp: '<div ng-hide="{isHide}" class="{cols}"><div class="{formStyle}" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<textarea bkm-input bkm-form-valid-icon={isShowSpan} name="{formName}" class="form-control "  placeholder="{placeholder}" {validateAttr} ng-model="{model}" ng-disabled="{readModel}.isRead||{isRead}" uib-popover="{tooltip}" popover-trigger="\'focus\'" ng-click="{click}" /></div></div>',
        dropDownTemp: '<div ng-hide="{isHide}" class="{cols}"><div class="{formStyle}" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<select uib-popover="{tooltip}" popover-trigger="\'focus\'" bkm-input name="{formName}" {validateAttr} class="form-control selectpicker" selectpicker ng-model="{model}" ng-disabled="{readModel}.isRead||{isRead}" {onChange} ng-options="{repeat}" ><option value="">-- {placeholder} --</option></select></div></div>',
        dateTemp:
            '<div ng-hide="{isHide}" class="{cols}">\
                <div class="{formStyle}" {validError}>\
                    <div class="dropdown">\
                        <label>{label}{formRequired}</label>&nbsp;&nbsp;\
                        <div class="input-group">\
                            <a class="dropdown-toggle" id="{dropdownId}" role="button" data-toggle="dropdown" data-target="#" >\
                                <input type="text" class="form-control" data-date-time-input="{dateFormat}" ng-model="{model}"  uib-popover="{tooltip}" popover-trigger="\'focus\'" bkm-input name="{formName}"  {validateAttr} placeholder="{placeholder}" readOnly>\
                             </a>\
                            <ul class="dropdown-menu  pull-right" role="menu" aria-labelledby="dLabel">\
                                    <datetimepicker ng-model="{model}" data-datetimepicker-config="{minView:\'{minView}\', minuteStep:{minuteStep}, dropdownSelector: \'#{dropdownId}\'}"/>\
                            </ul>\
                            <span class="input-group-addon" ng-click="{model}=null">\
                                    <i class="input-datepicker glyphicon glyphicon-remove"></i>\
                            </span>\
                        </div>\
                     </div>\
                 </div>\
              </div>',
        buttonTemp: '<button ng-hide="{hideModel}.isHide||{isHide}" uib-popover="{tooltip}" popover-trigger="\'focus\'" type="button" class="{className}" ng-click="{click}"><i class="{icon}"></i><span>&nbsp;{text}</span></button>',
        downloadButtonTemp: '<a ng-hide="{isHide}" class="down-link" href="javascript:void(0);" target="_blank"><button uib-popover="{tooltip}" popover-trigger="\'focus\'" type="button" class="{className}" ng-click="{click}"><i class="{icon}"></i><span>&nbsp;{text}</span></button></a>',
        placeHolderTemp: '<div class="{cols} placeholder"> <div class="{formStyle}"></div> </div>',
        bkmButtonTemp: '<bkm-button ng-hide="{hideModel}.isHide||{isHide}" category="{category}" text="{text}" ng-click="{click}"></bkm-button>',
        beginDateAndEndDateTemp:
            ' <div ng-hide="{isHide}" class="{cols}">\
                <div class="col-md-6" style="padding-left: 0;">\
                        <div class="dropdown dropdown-start-parent">\
                            <label>{beginDateLabel}{formRequired}&nbsp;&nbsp;</label>\
                            <div class="input-group date">\
                                <a class="dropdown-toggle" id="{dropdownStart}" role="button" data-toggle="dropdown" data-target="#" >\
                                    <input type="text" class="form-control" ng-model="{beginDateModel}" data-date-time-input="{dateFormat}" uib-popover="{tooltip}" popover-trigger="\'focus\'" bkm-input name="{formName}"  {validateAttr} placeholder="{beginDatePlaceholder}" readOnly>\
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
                        <div class="dropdown dropdown-end-parent" >\
                            <label>{endDateLabel}{formRequired}&nbsp;&nbsp;</label>\
                            <div class="input-group date">\
                                <a class="dropdown-toggle" id="{dropdownEnd}" role="button" data-toggle="dropdown" data-target="#" >\
                                    <input type="text" class="form-control" ng-model="{endDateModel}"  data-date-time-input="{dateFormat}" uib-popover="{tooltip}" popover-trigger="\'focus\'" bkm-input name="{formName}"  {validateAttr} placeholder="{endDatePlaceholder}" readOnly>\
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
        accordTemp:
            '<uib-accordion class="row bkm-uib-accordion">\
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
        addressTemp: '<div ng-hide="{isHide}" class="{cols}"><div class="{formStyle}"  {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<input bkm-input bkm-input-tree-address choose-level="{level}" show-full-name="{isFullName}" name="{formName}" class="form-control " type="text" placeholder="{placeholder}" {validateAttr} ng-model="{model}" uib-popover="{tooltip}" popover-trigger="\'focus\'" /></div></div>',
        colorPickerTemp: '<div ng-hide="{isHide}" class="{cols}"><div class="{formStyle}" style="position:relative;" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<color-picker ng-model="{model}" class="form-group" options="dCtrl.opt.colorPickerOpt"></color-picker></div></div>'
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
        .directive('bkmElements', ['$compile', '$filter', bkmElements])
        .directive('bkmMsgModal', ['$compile', bkmMsgModal])
        .directive('bkmModalForm', ['$compile', 'bkmFmValSvc', bkmModalForm])
        .run(['toastr', '$uibModal', 'bkmCommGetDict', '$templateCache', '$timeout', function (toastr, $uibModal, dict, $templateCache, $timeout) {
            $templateCache.put('attatchesList.html',
                '<uib-accordion close-others="oneAtATime" class="row bkm-uib-accordion" style="margin: 0;">\
                    <div uib-accordion-group class="panel-default bkm-attatches" is-open="status.open">\
                        <uib-accordion-heading>\
                            <div class="bkm-panel-title" ng-click="status.open=!!!status.open">\
                                <span>附件列表</span>\
                                <i class="pull-right glyphicon" \
                                   ng-class="{\'glyphicon-chevron-up\': status.open, \'glyphicon-chevron-down\': !status.open}"></i>\
                            </div>\
                        </uib-accordion-heading>\
                        <div class="attaches upfile row" ng-if="options.attaches.isShowUpload">\
                            <div class="col-md-6">{{options.attaches.prompt}}</div>\
                            <div class="col-md-6 operation"><i class="fa fa-upload" aria-hidden="true"></i><a ngf-select="options.attaches.uploadFiles($files)" ngf-pattern="{{options.attaches.attachesPattern}}" ngf-multiple="{{options.attaches.multiple}}">&nbsp;&nbsp;添加附件...</a></div>\
                        </div>\
                        <div ui-grid="options.attaches.gridOption" class="grid" ui-grid-selection ui-grid-pagination ui-grid-auto-resize ng-style="options.attaches.gridOption.autoHeight()"></div>\
                    </div>\
                </uib-accordion>'
            );

            /**
             * @ngdoc directive
             * @name extendSearchObj
             * @description
             * 用于构造通用的查询参数
             * Construct search parameters object for different controllers usage
             *
             * @param input {obj} 接收的值
             *
             * @returns {obj} 返回替换后的值
             */
            window.extendSearchObj = function (obj) {
                return angular.extend({}, {
                    dictionaryTypes: [],
                    dictionaryHash: '',
                    sorting: '',
                    skipCount: '0',
                    maxResultCount: '500'
                }, obj);
            };

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
             * @returns {string} 返回替换后的值
             */
            window.baseSearchFn = function ($scope,
                serviceApiFunc,
                paramsSetting,
                isInitLoad,
                registerCustomizedApi) {

                var self = this;
                //构造页面查询参数基类对象
                self.params = extendSearchObj();
                //设置UI-GRID属性参数
                self.gridOption = baseUiGridProp();
                //配置UI-GRID的grid.appScope的作用域为当前Ctrl
                self.gridOption.appScopeProvider = self;
                //UI-GRID高度自动伸缩函数
                self.gridOption.autoHeight = function () {
                    return {
                        height: (self.gridOption.paginationPageSize * 24 + 30) + "px"
                    };
                };

                //注册事件回调函数
                self.gridApi = {};
                self.gridOption.onRegisterApi = function (gridApi) {
                    self.gridApi = gridApi;
                    //判断在页面第一次加载的时候需要加载数据
                    if (isInitLoad == undefined || isInitLoad)
                        getData();
                    //注册UI-GRID翻页函数
                    if (gridApi.pagination) {
                        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                            getData();
                        });
                    }
                    //注册Controller自己的UI-GRID 个性化事件
                    if (angular.isFunction(registerCustomizedApi)) {
                        registerCustomizedApi(gridApi);
                    }
                };

                self.searchData = getData;
                //查询数据
                function getData() {
                    //合并分页查询参数
                    self.params.skipCount = (typeof self.gridApi.pagination == 'object') ? (self.gridApi.pagination.getPage() - 1) * self.gridOption.paginationPageSize : 0;
                    self.params.maxResultCount = self.gridOption.paginationPageSize;
                    //查询参数处理回调函数
                    if (typeof paramsSetting == 'function') {
                        paramsSetting();
                    }
                    //调用查询服务
                    serviceApiFunc(self.params)
                        .then(function (result) {
                            self.gridOption.data = result.data.items;
                            self.gridOption.totalItems = result.data.totalCount;

                            if (typeof self.searchSuccessFn == 'function') {
                                $timeout(function () {
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
                        enableColumnMenus: false
                    });
                };
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
            window.baseApproveFn = function (parentCtrl, rowEntity) {

                var self = parentCtrl;

                var promptName = self.formSetting.promptName;
                var approveSvc = self.formSetting.resourceSvc;

                //获取所选择审核的记录
                var rtnRows = [];
                rtnRows[0] = rowEntity || self.gridApi.selection.getSelectedRows()[0];
                if (!rtnRows[0] || rtnRows[0].status != 0) {
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
                        var formModel = ctrl.formOption.model = self.formSetting.approveParams || { relatedId: rtnRows[0].id };

                        //表单数据模型绑定
                        $scope.modalTitle = promptName + '审核';
                        angular.extend(ctrl.formOption, {
                            items: [
                                {
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
                                }],
                            buttons: [
                                {
                                    text: '同意',
                                    category: 'approve',
                                    click: approveFn
                                },
                                {
                                    text: '拒绝',
                                    category: 'reject',
                                    click: rejectFn
                                }]
                        });

                        //审核通过
                        function approveFn() {
                            formModel.isPass = true;
                            approveSvc.approve(formModel)
                                .then(function (result) {
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
                                    return approveSvc.approve(formModel);
                                })
                                .then(function (result) {
                                    toastr.success(bkm.util.format("该{0}已被标记为审核不通过!", promptName));
                                    $uibModalInstance.close();
                                    self.searchData();
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
        var ctrl = this;
    };

    function bkmElements($compile, $filter) {
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
                    var result = $filter('filter')(ctrl.opt.accordions, { accordId: scope.accordionId }, true);
                    formCtrlOpt = result.length == 0 ? formCtrlOpt : result[0].accordOption;
                }
                scope.options = !!scope.includeOption ? scope.includeOption : formCtrlOpt;
                linkFunc(
                    scope,
                    el,
                    formComponents,
                    {
                        items: '',
                        buttons: ''
                    },
                    scope.options,
                    scope.cols,
                    'form-group'
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
            link: function (scope, el, attrs) {
                //定义默认的布局列数
                var cols = !!scope.cols ? scope.cols : 4;
                scope.options.renderSearch = true;
                linkFunc(
                    scope,
                    el,
                    formComponents,
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
            link: function (scope, el, attrs) {


                //定义附件列表的模板文件地址(缓冲模板文件)
                var attachesTempUrl = 'attatchesList.html';

                //定义默认的布局列数
                var cols = scope.cols ? scope.cols : 3;
                //获取options中定义的parentCtrl
                var parentCtrl = scope.options.parentCtrl;

                //显示详情
                parentCtrl.display = function (row) {
                    row.isEdit = false;
                    modalForm(row);
                }
                //编辑
                parentCtrl.edit = function (row) {
                    row.isEdit = true;
                    modalForm(row);
                }
                //删除
                parentCtrl.delete = function (row) {

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

                    var delSvc = parentCtrl.formSetting.resourceSvc.delete;
                    var delParas = parentCtrl.formSetting.deleteParas || { id: row.entity.id };
                    var delPrompt = parentCtrl.formSetting.delPrompt || "您确认要删除吗?";

                    var modalInstance = $uibModal.open({
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
                        .then(function (result) {
                            return delSvc(delParas);
                        })
                        .then(function (result) {
                            parentCtrl.searchData();
                            toastr.success("已被成功的删除!");
                        });
                }
                //添加
                parentCtrl.add = function () {
                    modalForm();
                }
                //审核操作
                parentCtrl.approve = function () {
                    baseApproveFn(parentCtrl);
                }
                //新建表单
                function modalForm(row) {

                    $uibModal.open({
                        backdrop: false,
                        animation: false,
                        windowClass: 'bkm-backdrop',
                        template: '<bkm-modal-form options="ctrl.formOption"></bkm-modal-form>',
                        controller: ['$scope', '$state', '$uibModalInstance', 'toastr', function ($scope, $state, $uibModalInstance, toastr) {

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
                            var formModel = ctrl.formOption.model = {};
                            var resourceSvc = parentCtrl.formSetting.resourceSvc;
                            var newFormOption = {};

                            //初始化表单数据模型回调
                            if (typeof parentCtrl.formSetting.initFormModelFn == 'function') {
                                parentCtrl.formSetting.initFormModelFn(newFormOption, formModel, rtnRow, isEdit);
                            }

                            //表单标题头提示
                            var promptName = parentCtrl.formSetting.promptName || '';
                            $scope.modalTitle = !rtnRow ? '新建' + promptName : promptName + "详情";

                            //配置新建表单指令参数
                            angular.extend(ctrl.formOption,
                                {
                                    buttons: !!rtnRow && !isEdit ? [] : [
                                        {
                                            text: '提交',
                                            category: 'submit',
                                            click: submitFn
                                        }]
                                },
                                newFormOption
                            );

                            //查看详情或编辑时加载数据
                            var attachesPara = { 'relatedId': !!rtnRow ? rtnRow.id : '' };//初始化附件查询参数对象
                            if (rtnRow) {
                                //输入的rtnRow就是要显示的明细结果集
                                if (rtnRow.isShowData) {
                                    bindResultToForm(rtnRow);
                                } else {
                                    var getParas = { id: rtnRow.id };
                                    //判断是否存在get方法的额外参数
                                    if (rtnRow.addiParas) {
                                        angular.extend(getParas, { type: rtnRow.addiParas });
                                    }
                                    //获取信息
                                    resourceSvc.get(getParas)
                                        .then(function (result) {
                                            var items = result.data || [];

                                            //表单数据绑定
                                            angular.extend(formModel, items);

                                            //表单绑定数据处理回调
                                            if (typeof parentCtrl.formSetting.getSuccessFn == 'function') {
                                                parentCtrl.formSetting.getSuccessFn(formModel, items, attachesPara);
                                            }
                                            if (!!parentCtrl.formSetting.hasAttaches) {
                                                angular.extend(ctrl.formOption, { includeAttachesUrl: attachesTempUrl });
                                                attachesFn(ctrl, attachesPara, $scope, isEdit && !formModel.isReadAttaches, !rtnRow);
                                                angular.extend(ctrl.formOption.attaches.params, attachesPara);
                                                ctrl.formOption.attaches.searchData();
                                            }
                                        });
                                }
                            } else if (!!parentCtrl.formSetting.hasAttaches) {
                                angular.extend(ctrl.formOption, { includeAttachesUrl: attachesTempUrl });
                                attachesFn(ctrl, attachesPara, $scope, isEdit, !rtnRow);
                            }

                            //数据绑定的函数
                            function bindResultToForm(items) {
                                //表单数据绑定
                                angular.extend(formModel, items);

                                //表单绑定数据处理回调
                                if (typeof parentCtrl.formSetting.getSuccessFn == 'function') {
                                    parentCtrl.formSetting.getSuccessFn(formModel, items, attachesPara);
                                }
                                if (!!parentCtrl.formSetting.hasAttaches) {
                                    angular.extend(ctrl.formOption, { includeAttachesUrl: attachesTempUrl });
                                    attachesFn(ctrl, attachesPara, $scope, isEdit && !formModel.isReadAttaches, !rtnRow);
                                    angular.extend(ctrl.formOption.attaches.params, attachesPara);
                                    ctrl.formOption.attaches.searchData();
                                }
                            }

                            //提交表单
                            function submitFn() {
                                ctrl.formOption.onSubmit(function (validResult) {
                                    if (validResult.isSuccess) {

                                        //设置附件列表的数据
                                        if (!!parentCtrl.formSetting.hasAttaches) {
                                            formModel.attachments = ctrl.formOption.attaches.gridOption.data;
                                        }

                                        //数据处理回调
                                        if (typeof parentCtrl.formSetting.beforeSubmitFn == 'function') {
                                            var isGoingon = parentCtrl.formSetting.beforeSubmitFn(formModel);
                                            if (isGoingon === true || isGoingon == undefined) {
                                                //如果不继续提交则直接返回
                                                updateAndCreateFn();
                                            }else if (isGoingon.constructor.name == 'Promise') {
                                                isGoingon.then(function (result) {
                                                    if (result === true) {
                                                        updateAndCreateFn();
                                                    }
                                                });
                                            } 
                                        }

                                        //调用创建或更新服务
                                        function updateAndCreateFn() {
                                            (isEdit ? resourceSvc.update(formModel) : resourceSvc.create(formModel))
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
                                    }
                                    else {
                                        toastr.warning('您有未填写完整的数据，请按照错误提示补充完善，谢谢！');
                                    }
                                });
                            };
                        }],
                        controllerAs: 'ctrl',
                        size: 'lg',
                        resolve: {
                            items: function () {
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
                    attchesPara.addiPrompt = attchesPara.addiPrompt || '';
                    var attaches = self.formOption.attaches = {
                        attachesPattern: "'.jpg,.png'",
                        multiple: true,
                        isShowUpload: !!isNew || !!isEdit,
                        isRemovePaging: !!isNew || !!isEdit,
                        isShowDelete: !!isNew || !!isEdit,
                        prompt: "支持文件格式(jpg,png)，文件大小不超过200K" + attchesPara.addiPrompt
                    };

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
                            .then(function (result) {
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
                    attaches.uploadFiles = function (files) {
                        if (files && files.length) {
                            bkmUpload.upload(files, true)
                                .then(function (response) {
                                    for (var x in files) {
                                        files[x].contentType = files[x].type;
                                        files[x].contentLength = files[x].size;
                                        files[x].id = response.data[x].id;
                                    }
                                    attaches.gridOption.data = attaches.gridOption.data.concat(files);
                                });
                        }
                    };
                }

                scope.options.renderSearch = true;
                linkFunc(
                    scope,
                    el,
                    formComponents,
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
                    formComponents,
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
            template: '<div class="modal-content" ><div class="modal-header" style="background-color:#209e91"><i class="ion-information-circled modal-icon"></i><span>{{$parent.modalTitle}}</span><button type="button" class="close" ng-click="$parent.$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><div class="modal-body"><form novalidate  name="myForm"><div class="row bkm-form-item"></div><div id="uibAccordions" class="row"></div><div ng-include="options.includeUrl" style="margin-bottom:16px;"></div><div ng-include="options.includeAttachesUrl"></div></form></div><div class="modal-footer "></div><script type="text/javascript">$(".modal-dialog").drags({handle: ".modal-header"});</script></div>',

            link: function (scope, el) {

                //定义表单验证的回调函数
                scope.options.onSubmit = function (onSubmitFn) {
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
                    formComponents,
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
                el.find('.password').password();

                //判断是否移除掉附件列表的翻页控件
                if (!!scope.options.attaches && !!scope.options.attaches.isRemovePaging) {
                    setTimeout(function () {
                        el.find('v-pane-content .ui-grid-pager-panel').remove();
                    }, 0);
                }

            }
        };
    }

    function linkFunc(scope, el, uiComponents, selectors, options, cols, formStyle) {

        //设置窗体默认列布局
        var parentCols = !!cols && typeof (cols) == 'number' ? 'col-md-' + cols % 13 : 'col-md-4';

        //将指令参数配置到Controller上在指令间共享
        var opt = scope.dCtrl.opt = angular.extend({}, options);

        //定位元素位置
        var previous = selectors.items == '' ? el : el.find(selectors.items);
        var btnPrevious = selectors.buttons == '' ? el : el.find(selectors.buttons);
        var accordElem = !!selectors.accordions ? el.find(selectors.accordions) : null;

        angular.forEach(opt.items, function (t, i) {
            if (!t) return;
            //设置下拉列表默认的key,name标识
            t.keyName = !!t.keyName ? t.keyName : 'key';
            t.valName = !!t.valName ? t.valName : 'name';
            //设置元素默认列布局
            var elemCols = !!t.cols && typeof (t.cols) == 'number' ? 'col-md-' + t.cols % 13 : parentCols;
            //设置默认的验证要求
            t.validateAttr = t.validateAttr || [];
            if (!t.option && t.validateAttr.toString().indexOf('required') == -1) {
                t.validateAttr.push('required', 'required-error="该项为必填信息"');
            }
            //设置默认可选提示符
            var optionPrompt = (!!t.option || formStyle == '') ? '' : " * ",
                validError = 'ng-class="{\'has-error\':!myForm[\'' + t.model + '\'].$valid && (myForm[\'' + t.model + '\'].$dirt || myForm.$submitted)}"';
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
                opt[clickFnName] = function () {
                    t.click();
                };
            }
            //设置动态设置元素disable的函数名称
            var dynaIsReadModel = 'dynaIsReadModel' + i;
            if (typeof t.readModel == 'object') {
                opt[dynaIsReadModel] = t.readModel;
            }
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
                isHide: !!t.isHide,
                readModel: 'dCtrl.opt.' + dynaIsReadModel,
                isRead: !!opt.isReadonlyForm || !!t.isRead
            };

            if (t.type == 'text' || t.type == 'number' || t.type == 'password' || t.type == 'email') {
                previous.append(formatTemplate(elemOptions, uiComponents.textTemp));
            } else if (t.type == 'note') {
                previous.append(formatTemplate(elemOptions, uiComponents.noteTemp));
            } else if (t.type == 'textarea') {
                previous.append(formatTemplate(elemOptions, uiComponents.textareaTemp));
            } else if (t.type == 'dropDown') {
                angular.extend(elemOptions, {
                    repeat: 'i.' + t.keyName + ' as i.' + t.valName + ' for i in dCtrl.opt.items[' + i + '].dataSource',
                    placeholder: t.placeholder || '所有'
                });

                if (angular.isFunction(t.onChange)) {
                    elemOptions.onChange = 'ng-change="dCtrl.opt.items[' + i + '].onChange(' + elemOptions.model + ',options.model)"';
                } else {
                    elemOptions.onChange = "";
                }
                previous.append(formatTemplate(elemOptions, uiComponents.dropDownTemp));
                if (!!t.parent) {
                    var modelName = 'options.model.' + t.parent.model;
                    scope.$watch(modelName, function (n, o) {
                        if (n === o) return;
                        opt.items[i].dataSource = [];
                        if (!!!n) return;
                        t.parent.onChange(n).then(function (data) {
                            opt.items[i].dataSource = data;
                        }, null);
                    });
                }

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
                opt[startDateBeforeRender] = function ($dates) {
                    var dateRangeEnd = opt.model[endDateModel];
                    if (dateRangeEnd) {
                        var activeDate = moment(dateRangeEnd);
                        $dates.filter(function (date) {
                            return date.localDateValue() >= activeDate.valueOf()
                        }).forEach(function (date) {
                            date.selectable = false;
                        })
                    }
                }

                var endDateBeforeRender = endDateModel + 'BeforeRender';
                opt[endDateBeforeRender] = function ($view, $dates) {
                    var dateRangeStart = opt.model[beginDateModel];
                    if (dateRangeStart) {
                        var activeDate = moment(dateRangeStart).subtract(1, $view).add(1, 'minute');

                        $dates.filter(function (date) {
                            return date.localDateValue() <= activeDate.valueOf()
                        }).forEach(function (date) {
                            date.selectable = false;
                        })
                    }
                }

                var startDateOnSetTime = beginDateModel + 'OnSetTime';
                opt[startDateOnSetTime] = function () {
                    scope.$broadcast('start-date-changed');
                };

                var endDateOnSetTime = endDateModel + 'OnSetTime';
                opt[endDateOnSetTime] = function () {
                    scope.$broadcast('end-date-changed');
                    //如果设置为天的时候，结束日期自动设置到23点59分59秒
                    this.items.forEach(function (item) {
                        if (item.type == "beginDateAndEndDate" &&
                            item.endDate.model == endDateModel &&
                            !item.minView) {
                            opt.model[endDateModel].setHours(23, 59, 59, 999);
                            return;
                        }
                    });
                };

                angular.extend(elemOptions,
                    {
                        minView: !t.minView ? 'day' : t.minView,
                        minuteStep: !t.minuteStep ? '1' : t.minuteStep,
                        cols: 'col-md-' + Number(elemCols.substr(elemCols.length - 1, 1)) * 2,
                        beginDateLabel: t.beginDate.label,
                        beginDatePlaceholder: !t.beginDate.placeholder ? "点击选择日期" : t.beginDate.placeholder,
                        beginDateModel: 'options.model.' + beginDateModel,
                        endDateLabel: t.endDate.label,
                        endDatePlaceholder: !t.endDate.placeholder ? "点击选择日期" : t.endDate.placeholder,
                        endDateModel: 'options.model.' + endDateModel,
                        startDateBeforeRender: 'dCtrl.opt.' + startDateBeforeRender + "($dates)",
                        endDateBeforeRender: 'dCtrl.opt.' + endDateBeforeRender + "($view, $dates)",
                        startDateOnSetTime: 'dCtrl.opt.' + startDateOnSetTime + "()",
                        endDateOnSetTime: 'dCtrl.opt.' + endDateOnSetTime + "()",
                        dropdownStart: "dropdownStart_" + beginDateModel,
                        dropdownEnd: "dropdownEnd_" + endDateModel
                    }
                );
                elemOptions.dateFormat = dateFormatDef[elemOptions.minView];
                previous.append(formatTemplate(elemOptions, template));
            } else if (t.type == 'placeHolder') {
                previous.append(formatTemplate(elemOptions, uiComponents.placeHolderTemp));
            } else if (t.type == 'address') {
                angular.extend(elemOptions, {
                    level: t.level || 2,//默认2级
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
            }
        });

        angular.forEach(opt.buttons, function (t, i) {

            //如果空对象或未定义则继续下一个
            if (!t) return;

            //未提供type时，默认使用bkmButton
            t.type = !!t.type ? t.type : 'bkmButton';
            //未设置tooltip时，默认清空提示信息
            t.tooltip = t.tooltip || '';

            //设置初始化button选项
            var btnClickFnName = 'buttonClick' + i;
            var btnOptions = {
                text: t.text,
                className: t.className,
                icon: t.icon,
                tooltip: t.tooltip,
                isHide: !!t.isHide,
                click: 'dCtrl.opt.' + btnClickFnName + '()'
            };
            opt[btnClickFnName] = function () {
                t.click();
            };

            //动态设置元素隐藏
            if (typeof t.hideModel == 'object') {
                var hideModel = 'hideModel' + i;
                opt[hideModel] = t.hideModel;
                angular.extend(btnOptions, { hideModel: 'dCtrl.opt.' + hideModel, isHide: 'false' });
            }

            if (t.type == 'button') {
                btnPrevious.append(formatTemplate(btnOptions, uiComponents.buttonTemp));
            } else if (t.type == 'downloadButton') {
                opt[btnClickFnName] = function (event) {
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
            }
        });

        angular.forEach(opt.accordions, function (t, i) {
            var accordOptions = {
                title: t.title,
                accordId: t.accordId,
                isExpanded: !!t.isExpanded
            };
            accordElem.append(formatTemplate(accordOptions, uiComponents.accordTemp));
        });

        function formatTemplate(dta, tmpl) {
            var format = {
                name: function (x) {
                    return x;
                }
            };
            return tmpl.replace(/{(\w+)}/g, function (m1, m2) {
                if (!m2) return "";
                return (format && format[m2]) ? format[m2](dta[m2]) : dta[m2];
            });
        }

    }

})();
