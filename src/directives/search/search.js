/**
 * Created by gurihui on 2016/12/30.
 */
(function () {
    'use strict';

    var formComponents = {
        textTemp: '<div class="{cols}"><div class="{formStyle}" style="position:relative;" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<input bkm-input name="{formName}" class="form-control " type="{type}" placeholder="{placeholder}" {validateAttr} ng-model="{model}" uib-popover="{tooltip}" popover-trigger="mouseenter" /><span ng-if={isShowSpan} class="input-icon {spanCss} " ng-click="{click}" ></span></div></div>',
        //tagsTemp: '<div class="{cols}"><div class="{formStyle}" style="position:relative;" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<tags-input bkm-input name="{formName}" class="form-control " placeholder="{placeholder}" {validateAttr} ng-model="{model}" uib-popover="{tooltip}" popover-trigger="mouseenter" display-property="{dispProp}"><auto-complete source="{loadFn}"></auto-complete></tags-input><span ng-if={isShowSpan} class="input-icon {spanCss} " ng-click="{click}" ></span></div></div>',
        textareaTemp: '<div class="{cols}"><div class="{formStyle}" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<textarea bkm-input name="{formName}" class="form-control "  placeholder="{placeholder}" {validateAttr} ng-model="{model}" uib-popover="{tooltip}" popover-trigger="mouseenter" ng-click="{click}" /></div></div>',
        dropDownTemp: '<div class="{cols}"><div class="{formStyle}" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<select uib-popover="{tooltip}" popover-trigger="mouseenter" bkm-input name="{formName}" {validateAttr} class="form-control selectpicker" selectpicker ng-model="{model}" ng-options="{repeat}" ><option value="">-- 所有 --</option></select></div></div>',
        dateTemp: '<div class="{cols}"><div class="bkm-date-picker"><div class="{formStyle}" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<input uib-popover="{tooltip}" popover-trigger="mouseenter" bkm-input name="{formName}" class="form-control" ng-model="{model}" type="datetime" {validateAttr} placeholder="{placeholder}" readOnly="true"  uib-datepicker-popup is-open="{openDate}" current-text="今天" clear-text="清除" close-text="关闭"/><button type="button" class="btn btn-default datepicker" ng-click="{click}"><i class="glyphicon glyphicon-calendar"></i></button></div></div></div>',
        buttonTemp: '<button uib-popover="{tooltip}" popover-trigger="mouseenter" type="button" class="{className}" ng-click="{click}"><i class="{icon}"></i><span>&nbsp;{text}</span></button>',
        downloadButtonTemp: '<a class="down-link" href="javascript:void(0);" target="_blank"><button uib-popover="{tooltip}" popover-trigger="mouseenter" type="button" class="{className}" ng-click="{click}"><i class="{icon}"></i><span>&nbsp;{text}</span></button></a>',
        placeHolderTemp: '<div class="{cols} placeholder"> <div class="{formStyle}"></div> </div>',
        bkmButtonTemp: '<bkm-button category="{category}" text="{text}" ng-click="{click}"></bkm-button>',
        beginDateAndEndDateTemp: '<div class="{cols}"><div class="col-md-6"><label>{beginDateLabel}</label>&nbsp;&nbsp;<input class="form-control" type="text" placeholder="{beginDatePlaceholder}" readOnly="true" ng-model="{beginDateModel}" uib-datepicker-popup is-open="{beginDateOpenDate}" current-text="今天" clear-text="清除" close-text="关闭"/><button type="button" class="btn btn-default datepicker" ng-click="{beginDateClick}"><i class="glyphicon glyphicon-calendar"></i></button></div><div class="col-md-6" style="padding-right: 0;"><label>{endDateLabel}</label>&nbsp;&nbsp;<input class="form-control" type="text" placeholder="{endDatePlaceholder}" readOnly="true" ng-model="{endDateModel}" uib-datepicker-popup is-open="{endDateOpenDate}" current-text="今天" clear-text="清除" close-text="关闭"/><button type="button" style="right:0;" class="btn btn-default datepicker" ng-click="{endDateClick}"><i class="glyphicon glyphicon-calendar"></i></button></div></div>',
        accordTemp: '<v-accordion class="vAccordion--default"><v-pane expanded={isExpanded}><v-pane-header>{title}</v-pane-header><v-pane-content class="row"><bkm-elements is-accordions=true accordion-id="{accordId}" ></bkm-elements></v-pane-content></v-pane></v-accordion>',
        addressTemp: '<div class="{cols}"><div class="{formStyle}"  {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<input bkm-input bkm-input-tree-address choose-level="{level}" show-full-name="{isFullName}" name="{formName}" class="form-control " type="text" placeholder="{placeholder}" {validateAttr} ng-model="{model}" uib-popover="{tooltip}" popover-trigger="mouseenter" /></div></div>'
    };

    angular.module('bkm.library.angular.web', [])
        .controller('directiveCtrl', directiveCtrl)
        .directive('bkmSearch', bkmSearch)
        .directive('bkmGeneralCrud', ['$compile', '$filter', '$uibModal', 'toastr', 'bkmCommGetDict', 'logisCst', 'abp.services.app.file', 'bkmFileUpload', bkmGeneralCrud])
        .directive('bkmElements', bkmElements)
        .directive('bkmMsgModal', bkmMsgModal)
        .directive('bkmModalForm', ['$compile', 'bkmFmValSvc', bkmModalForm]);

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
                    var result = $filter('filter')(ctrl.opt.accordions, { accordId: scope.accordionId });
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
                scope.myForm = !!ctrl.myForm ? ctrl.myForm : {};
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
     * text：文本输入框
     * {
     *      type: 'text',
     *      model: '要双向邦定到输入框的 ng-model 的名称',
     *      label: '输入框的 lable 名称',
     *      placeholder: '当输入没有接收用户输入的值时，显示的占位提示字符',
     *      defaultVal: '默认值'
     * }
     * number：数字输入框
     * {
     *      type: 'number',
     *      model: '要双向邦定到输入框的 ng-model 的名称',
     *      label: '输入框的 lable 名称',
     *      placeholder: '当输入没有接收用户输入的值时，显示的占位提示字符',
     *      defaultVal: '默认值'
     * }
     * date：日期选择
     * {
     *      type: 'date',
     *      model: '要双向邦定的 ng-model 的名称',
     *      label: '输入框的 lable 名称',
     *      placeholder: '当输入没有接收用户输入的值时，显示的占位提示字符',
     *      defaultVal: '默认值(Date 类型)'
     * }
     * dropDown：下拉列表
     * {
     *      type: 'dropDown',
     *      model: '要双向邦定的 ng-model 的名称',
     *      label: 'lable 名称',
     *      //当有级联关系时，指定父级下拉列表
     *      parent: {
     *          model: '父级下拉表的 ng-model 名称',
     *          //当父级下拉表发生改变时的事件，返回 promise 类型对象
     *          //参数 parentVal 为父级下拉列表选择的值
     *          onChange: function (parentVal) { return promise; }
     *      },
     *      keyName: '下拉列表选项的 value 属性，对应 dataSource 数组的中对象的属性的名称',
     *      valName: '下拉列表选项的显示的内容，对应 dataSource 数组的中对象的属性的名称',
     *      //要邦定到下拉列表的数据源，可以是 object 对象的集合，也可以是字符串数组，也可以是数字数组
     *      //如果数据源不是 object 数组，请不要指定 keyName 和 valName 属性
     *      dataSource: [{}|''],
     *      defaultVal: '默认选择的值'
     * }
     * beginDateAndEndDate：开始日期结束日期
     * {
     *      type: 'beginDateAndEndDate',
     *      //开始日期
     *      beginDate: {
     *          model: '要双向邦定的 ng-model 的名称',
     *          label: 'lable 名称',
     *          placeholder: '当输入没有接收用户输入的值时，显示的占位提示字符',
     *          defaultVal: '默认值(Date 类型)'
     *      },
     *      //结束日期
     *      endDate: {
     *          model: '要双向邦定的 ng-model 的名称',
     *          label: 'lable 名称',
     *          placeholder: '当输入没有接收用户输入的值时，显示的占位提示字符',
     *          defaultVal: '默认值(Date 类型)'
     *      }
     * }
     * placeHolder：占位符，创建一个空白项
     * {
     *      type: 'placeHolder'
     * }
     * options.buttons 该数组接收需要显示的按钮
     * 按钮的类型有两种：button、downloadButton
     * button：普通按钮
     * {
     *      type: 'button',
     *      text: '显示在按钮上的文本',
     *      className: '指定按钮的 class 名称',
     *      //按钮的点击事件
     *      //参数 search 为用户在页面输入的查询项对象
     *      click: function (search) {}
     * }
     * bkmButton：BKM封装按钮
     * {
     *      type: 'bkmButton',
     *      text: '显示在按钮上的文本',
     *      category: '指定按钮的类型',
     *      //按钮的点击事件
     *      //参数 search 为用户在页面输入的查询项对象
     *      click: function (search) {}
     * }
     * downloadButton：下载按钮
     * {
     *      type: 'downloadButton',
     *      text: '显示在按钮上的文本',
     *      className: '指定按钮的 class 名称',
     *      //按钮的点击事件
     *      //参数 search 为用户在页面输入的查询项对象
     *      //必须返回需要下载文件的 url
     *      click: function (search) { return 'url'; }
     * }
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
            template: '<div class="search-condition form-inline text-right"><div class="row"></div><div class="text-right search-btn button-panel btns"></div>',
            link: function (scope, el, attrs) {
                //定义默认的布局列数
                var cols = !!scope.cols ? scope.cols : 3;
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

    function bkmGeneralCrud($compile, $filter, $uibModal, toastr, dict, logisCst, fileSvc, bkmUpload) {

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

                    var ctrl = parentCtrl;
                    var delSvc = ctrl.formSetting.resourceSvc.delete;
                    var delParas = ctrl.formSetting.deleteParas || { id: row.entity.id };

                    var modalInstance = $uibModal.open({
                        backdrop: false,
                        animation: true,
                        controller: function () {
                            var mCtrl = this;
                            mCtrl.message = "您确认要删除吗?";
                        },
                        controllerAs: 'mCtrl',
                        template: '<bkm-msg-modal message="mCtrl.message" cancel=true category="warning" ></bkm-msg-modal>'
                    });

                    modalInstance.result
                		.then(function (result) {
                		    return delSvc(delParas);
                		})
                		.then(function (result) {
                		    ctrl.searchData();
                		    toastr.success("已被成功的删除!");
                		})
                		.catch(function (reason) {
                		    if (typeof (reason) == 'string') return;
                		    toastr.warning(bkm.util.format("服务器请求错误: {0} 请稍后重试! " + reason.statusText));
                		});
                }

                //添加
                parentCtrl.add = function () {
                    modalForm();
                }

                //新建表单
                function modalForm(row) {

                    $uibModal.open({
                        backdrop: false,
                        animation: false,
                        template: '<bkm-modal-form options="ctrl.formOption"></bkm-modal-form>',
                        controller: function ($scope, $state, $uibModal, toastr) {

                            var ctrl = this;

                            //获取选择的行记录
                            var rtnRow = null;
                            var isEdit = false;
                            if (!!$scope.$resolve.items) {
                                rtnRow = $scope.$resolve.items.entity;
                                isEdit = !!$scope.$resolve.items.isEdit;
                            };

                            //初始化数据模型
                            ctrl.formOption = {};
                            var formModel = ctrl.formOption.model = {};
                            var resourceSvc = parentCtrl.formSetting.resourceSvc;

                            //初始化表单数据模型回调
                            if (typeof parentCtrl.formSetting.initFormModelFn == 'function') {
                                parentCtrl.formSetting.initFormModelFn(formModel, rtnRow, isEdit);
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
                                parentCtrl.newformOption
                            );

                            //查看详情或编辑时加载数据
                            var attachesPara = { 'relatedId': !!rtnRow ? rtnRow.id : '' };//初始化附件查询参数对象
                            if (!!rtnRow) {
                                //获取信息
                                resourceSvc.get({ id: rtnRow.id })
                                    .then(function (result) {
                                        var items = result.data || [];

                                        function setModelVal(obj1, obj2, arr, i) {
                                            if (arr.length - 1 == i) {
                                                obj1[arr[i]] = new Date(obj2[arr[i]]);
                                                return;
                                            }
                                            if (!obj1[arr[i]]) {
                                                obj1[arr[i]] = {};
                                            }
                                            setModelVal(obj1[arr[i]], obj2[arr[i]], arr, ++i);
                                        }

                                        //表单数据绑定
                                        angular.extend(formModel, items);

                                        //字典数据对象转换
                                        angular.forEach(ctrl.formOption.items, function (v, i) {
                                            if (v.type == 'dropDown' && !v.notDict) {
                                                var t = v.model.replace(/\w{1,}\.(\w{1,})Obj$|(\w{1,})Obj$/, '$2' + '$1')
                                                var k = t.substring(0, 1).toUpperCase() + t.substring(1);
                                                formModel[v.model] = $filter(k)(items[t], true);
                                            } else if (v.type == 'date') {//日期字符串转换未日期对象并赋值到模型上
                                                var rtnArr = v.model.split(".");
                                                setModelVal(formModel, items, rtnArr, 0);
                                            }
                                        });

                                        //数据处理回调
                                        if (typeof parentCtrl.formSetting.getSuccessFn == 'function') {
                                            parentCtrl.formSetting.getSuccessFn(formModel, items, attachesPara);
                                        }
                                        if (!!parentCtrl.formSetting.hasAttaches) {
                                            angular.extend(ctrl.formOption.attaches.params, attachesPara);
                                            ctrl.formOption.attaches.searchData();
                                        }
                                    })
                                    .catch(function (reason) {
                                        toastr.warning(bkm.util.format("服务器请求错误: {0} 请稍后重试! " + reason.statusText));
                                    });
                            }

                            //附件列表
                            if (!!parentCtrl.formSetting.hasAttaches) {
                                angular.extend(ctrl.formOption, { includeUrl: logisCst.ATTACHES_TPL_URL });
                                attachesFn(ctrl, attachesPara, $scope, isEdit, !rtnRow);
                            }
                            //提交表单
                            function submitFn() {
                                ctrl.formOption.onSubmit(function (validResult) {
                                    if (validResult.isSuccess) {

                                        //字典对象数据转换
                                        bkm.util.dictObjFmt(formModel);

                                        //数据处理回调
                                        if (typeof parentCtrl.formSetting.beforeSubmitFn == 'function') {
                                            parentCtrl.formSetting.beforeSubmitFn(formModel);
                                        }

                                        //设置附件列表的数据
                                        if (!!parentCtrl.formSetting.hasAttaches) {
                                            formModel.attachments = ctrl.formOption.attaches.gridOption.data;
                                        }
                                        //调用创建或更新服务
                                        (isEdit ? resourceSvc.update(formModel) : resourceSvc.create(formModel))
                                            .then(function (result) {
                                                toastr.success('提交成功，请继续添加或点击关闭按钮返回！');
                                                parentCtrl.searchData();
                                            })
                                            .catch(function (reason) {
                                                toastr.warning(bkm.util.format("服务器请求错误: {0} 请稍后重试! " + reason.statusText));
                                            });
                                    }
                                    else {
                                        toastr.warning('您有未填写完整的数据，请按照错误提示补充完善，谢谢！');
                                    }
                                });
                            };
                        },
                        controllerAs: 'ctrl',
                        size: 'lg',
                        resolve: {
                            items: function () {
                                return row;
                            }
                        }
                    });
                };

                //审核操作
                parentCtrl.approve = function () {

                    var promptName = parentCtrl.formSetting.promptName;
                    var approveSvc = parentCtrl.formSetting.resourceSvc;

                    var self = parentCtrl;

                    //获取所选择审核的记录
                    var rtnRows = self.gridApi.selection.getSelectedRows();
                    if (!!!rtnRows.length || rtnRows[0].status != 0) {
                        toastr.info(bkm.util.format("请选择 {0} 状态为待审核的记录!", promptName));
                        return;
                    }

                    //审核的对话框
                    var uibModalInstance = $uibModal.open({
                        backdrop: false,
                        animation: true,
                        template: '<bkm-modal-form options="ctrl.formOption"></bkm-modal-form>',
                        controller: function ($uibModalInstance, $scope) {

                            //初始化数据模型
                            var ctrl = this;
                            ctrl.formOption = {};
                            var formModel = ctrl.formOption.model = parentCtrl.formSetting.approveParams || { relatedId: rtnRows[0].id };

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
                                        model: 'typeObj',
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
                                    })
                                    .catch(function (reason) {
                                        toastr.warning(bkm.util.format("服务器请求错误: {0} 请稍后重试! " + reason.statusText));
                                    });
                            };

                            //审核不通过
                            function rejectFn() {
                                if (!formModel.typeObj) {
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
                                    template: '<bkm-msg-modal message="mCtrl.message" cancel=true category="warning" ></bkm-msg-modal>'
                                });

                                modalInstance.result
                                    .then(function (result) {
                                        angular.extend(formModel, {
                                            isPass: false,
                                            type: formModel.typeObj.key,
                                            reason: formModel.reason,
                                            typeObj: null
                                        });
                                        return approveSvc.approve(formModel);
                                    })
                                    .then(function (result) {
                                        toastr.success(bkm.util.format("该{0}已被标记为审核不通过!", promptName));
                                        $uibModalInstance.close();
                                        self.searchData();
                                    })
                                    .catch(function (reason) {
                                        if ((reason.toString().match('cancel') == null) && (reason.toString().match('escape') == null))
                                            toastr.warning(bkm.util.format("服务器请求错误: {0} 请稍后重试! " + reason.statusText));
                                    });
                            }
                        },
                        controllerAs: 'ctrl',
                        size: 'lg',
                        resolve: {
                            items: function () {
                                return rtnRows;
                            }
                        }
                    });

                }

                //附件列表操作
                function attachesFn(
                    appliedCtrl,
                    attchesPara,
                    scope,
                    isEdit, //附件列表是否处于编辑状态
                    isNew //附件列表是否处于新建状态
                    ) {

                    //初始化附件数据模型
                    var self = appliedCtrl;
                    var attaches = self.formOption.attaches = {
                        attachesPattern: "'.jpg,.png'",
                        multiple: true,
                        isShowUpload: !!isNew || !!isEdit,
                        isRemovePaging: !!isNew || !!isEdit,
                        isShowDelete: !!isNew || !!isEdit,
                        prompt: "支持文件格式(jpg,png)，文件大小不超过200K"
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
                            })
                            .catch(function (reason) {
                                if ((reason.toString().match('cancel') == null) && (reason.toString().match('escape') == null))
                                    toastr.warning(bkm.util.format("服务器请求错误: {0} 请稍后重试! " + reason.statusText));
                            });

                    };

                    //继承基类查询对象
                    baseSearchFn.apply(attaches, [scope, fileSvc.getAll, toastr, false]);

                    //配置附件列表
                    angular.extend(attaches.gridOption, { paginationPageSize: 5 });
                    attaches.gridOption.columnDefs = [
                        { field: "seq", displayName: "序号", width: 50 },
                        {
                            field: " ", displayName: '附件名称', cellTemplate: '<div class="operation attaches"> <a  href="{{row.entity.id|pathUrl}}">{{row.entity.name}}</a></div>'
                        },
                        { field: "contentType", displayName: "附件类型" },
                        { field: "contentLength", displayName: "附件大小(KB)", cellFilter: "kbSize|number" },
                        { field: "creatorName", displayName: "创建人" },
                        { field: "creationTime", displayName: "创建时间", cellFilter: "date:'yyyy-MM-dd HH:mm'" },
                        {
                            field: "operation", displayName: '操作', cellTemplate: '<div class="operation"> <a  href="{{row.entity.id|pathUrl:true}}">下载&nbsp;&nbsp;</a><a ng-if="grid.appScope.isShowDelete"  ng-click="grid.appScope.delAttch(row);">删除</a></div>'
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
                                })
                                .catch(function (reason) {
                                    toastr.warning(bkm.util.format("服务器请求错误: {0} 请稍后重试! " + reason.statusText));
                                });
                        }
                    };
                }



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
            template: '<div class="modal-content" ><div class="modal-header" style="background-color:#209e91"><i class="ion-information-circled modal-icon"></i><span>{{$parent.modalTitle}}</span><button type="button" class="close" ng-click="$parent.$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><div class="modal-body"><form novalidate  name="myForm"><div class="row"></div><div id="uibAccordions"></div><div ng-include="options.includeUrl"></div></form></div><div class="modal-footer "></div><script type="text/javascript">$(".modal-dialog").drags({handle: ".modal-header"});</script></div>',

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
                         items: '.row',
                         buttons: '.modal-footer',
                         accordions: '#uibAccordions'
                     },
                    scope.options,
                    scope.cols,
                    'form-group'
                    );
                $compile(el)(scope);

                //判断是否移除掉附件列表的翻页控件
                if (!!scope.options.attaches && !!scope.options.attaches.isRemovePaging) {
                    setTimeout(function () {
                        el.find('v-pane-content .ui-grid-pager-panel').remove();
                    }, 0);
                }

                //将指令的myForm对象通过Controller传递给其他使用myForm的指令
                scope.dCtrl.myForm = !!scope.myForm ? scope.myForm : {};
            }
        };
    }

    function linkFunc(scope, el, uiComponents, selectors, options, cols, formStyle) {

        //设置窗体默认列布局
        var parentCols = !!cols && typeof (cols) == 'number' ? 'col-md-' + cols % 13 : 'col-md-4';

        //将指令参数配置到Controller上在指令间共享
        var opt = scope.dCtrl.opt = angular.extend({}, options);

        var i, t;

        var previous = selectors.items == '' ? el : el.find(selectors.items);
        var btnPrevious = selectors.buttons == '' ? el : el.find(selectors.buttons);
        var accordElem = !!selectors.accordions ? el.find(selectors.accordions) : null;

        angular.forEach(opt.items, function (t, i) {

            t = opt.items[i];

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
            //设置鼠标点击事件函数名称
            var clickFnName = 'click' + i;
            if (!!t.click) {
                opt[clickFnName] = function () {
                    t.click();
                };
            }
            //设置初始化元素选项
            var elemOptions = {
                label: t.label,
                type: t.type,
                placeholder: t.placeholder,
                model: 'options.model.' + t.model,
                formRequired: optionPrompt,
                validateAttr: t.validateAttr.join(' ') + ((!!opt.isReadonlyForm || !!t.isRead) ? ' disabled' : ''),
                formName: t.model,
                validError: validError,
                cols: elemCols,
                formStyle: formStyle,
                tooltip: t.tooltip,
                click: 'dCtrl.opt.' + clickFnName + '()', //input元素的附加span点击
                spanCss: t.spanCss || 'glyphicon glyphicon-search',
                isShowSpan: !!t.click //默认不添加span元素
            };


            if (t.type == 'text' || t.type == 'number') {
                previous.append(formatTemplate(elemOptions, uiComponents.textTemp));
            } else if (t.type == 'textarea') {
                previous.append(formatTemplate(elemOptions, uiComponents.textareaTemp));
            } else if (t.type == 'dropDown') {
                angular.extend(elemOptions, {
                    repeat: 'i.' + t.valName + ' for i in dCtrl.opt.items[' + i + '].dataSource'
                });
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
                var isOpen = 'openDate' + t.model.replace(/\./g, '_');
                opt[isOpen] = false;
                opt[isOpen + 'Click'] = function () {
                    opt[isOpen] = true;
                };
                angular.extend(elemOptions, {
                    openDate: 'dCtrl.opt.' + isOpen,
                    click: 'dCtrl.opt.' + isOpen + 'Click()'
                });
                previous.append(formatTemplate(elemOptions, uiComponents.dateTemp));
            } else if (t.type == 'beginDateAndEndDate') {
                var beginModelName = t.beginDate.model;
                var isBeginOpen = 'beginOpenDate' + beginModelName.replace(/\./g, '_');
                opt[isBeginOpen] = false;
                opt[isBeginOpen + 'Click'] = function () {
                    opt[isBeginOpen] = true;
                };

                var endModelName = t.endDate.model;
                var isEndOpen = 'endOpenDate' + endModelName.replace(/\./g, '_');
                opt[isEndOpen] = false;
                opt[isEndOpen + 'Click'] = function () {
                    opt[isEndOpen] = true;
                };
                previous.append(formatTemplate({
                    cols: 'col-md-' + Number(elemCols.substr(elemCols.length - 1, 1)) * 2,
                    beginDateLabel: t.beginDate.label,
                    beginDatePlaceholder: t.beginDate.placeholder,
                    beginDateModel: 'options.model.' + beginModelName,
                    beginDateOpenDate: 'dCtrl.opt.' + isBeginOpen,
                    beginDateClick: 'dCtrl.opt.' + isBeginOpen + 'Click()',

                    endDateLabel: t.endDate.label,
                    endDatePlaceholder: t.endDate.placeholder,
                    endDateModel: 'options.model.' + endModelName,
                    endDateOpenDate: 'dCtrl.opt.' + isEndOpen,
                    endDateClick: 'dCtrl.opt.' + isEndOpen + 'Click()',
                    formRequired: optionPrompt
                }, uiComponents.beginDateAndEndDateTemp));
            } else if (t.type == 'placeHolder') {
                previous.append(formatTemplate(elemOptions, uiComponents.placeHolderTemp));
            } else if (t.type == 'address') {
                angular.extend(elemOptions, {
                    level: t.level || 2,//默认2级
                    isFullName: t.isFullName || false //默认显示简称
                });
                previous.append(formatTemplate(elemOptions, uiComponents.addressTemp));
            }
            //else if (t.type == 'tags') {
            //    var loadFnName = 'loadFn' + i;
            //    if (!!t.loadFn) {
            //        opt[loadFnName] = function (query) {
            //            t.loadFn(query);
            //        };
            //    }
            //    angular.extend(elemOptions, {
            //        dispProp: t.dispProp, //配置tags-input的对象显示字段
            //        loadFn: 'dCtrl.opt.' + loadFnName + '(query)' //配置auto-complete的数据load方法
            //    });
            //    previous.append(formatTemplate(elemOptions, uiComponents.tagsTemp));
            //}
        });

        angular.forEach(opt.buttons, function (t, i) {

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
                click: 'dCtrl.opt.' + btnClickFnName + '()'
            };
            opt[btnClickFnName] = function () {
                t.click();
            };

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