/**
 * Created by gurihui on 2016/12/30.
 */
(function () {
    'use strict';


    var formComponents = {
        textTemp: '<div class="{cols}"><div class="{formStyle}" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<input bkm-input name="{formName}" class="form-control " type="{type}" placeholder="{placeholder}" {validateAttr} ng-model="{model}" uib-popover="{tooltip}" popover-trigger="mouseenter"  /></div></div>',
        dropDownTemp: '<div class="{cols}"><div class="{formStyle}" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<select uib-popover="{tooltip}" popover-trigger="mouseenter" bkm-input name="{formName}" {validateAttr} class="form-control selectpicker" selectpicker ng-model="{model}" ng-options="{repeat}" ><option value="">-- 所有 --</option></select></div></div>',
        dateTemp: '<div class="{cols}"><div class="bkm-date-picker"><div class="{formStyle}" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<input uib-popover="{tooltip}" popover-trigger="mouseenter" bkm-input name="{formName}" class="form-control" ng-model="{model}" type="datetime" {validateAttr} placeholder="{placeholder}" readOnly="true"  uib-datepicker-popup is-open="{openDate}" current-text="今天" clear-text="清除" close-text="关闭"/><button type="button" class="btn btn-default datepicker" ng-click="{click}"><i class="glyphicon glyphicon-calendar"></i></button></div></div></div>',
        buttonTemp: '<button uib-popover="{tooltip}" popover-trigger="mouseenter" type="button" class="{className}" ng-click="{click}"><i class="{icon}"></i><span>&nbsp;{text}</span></button>',
        downloadButtonTemp: '<a class="down-link" href="javascript:void(0);" target="_blank"><button uib-popover="{tooltip}" popover-trigger="mouseenter" type="button" class="{className}" ng-click="{click}"><i class="{icon}"></i><span>&nbsp;{text}</span></button></a>',
        placeHolderTemp: '<div class="{cols} placeholder"> <div class="form-control" style="border:0px"></div> </div>',
        bkmButtonTemp: '<bkm-button category="{category}" text="{text}" ng-click="{click}"></bkm-button>',
        beginDateAndEndDateTemp: '<div class="col-md-6"><div class="col-md-6"><label>{beginDateLabel}</label>&nbsp;&nbsp;<input class="form-control" type="text" placeholder="{beginDatePlaceholder}" readOnly="true" ng-model="{beginDateModel}" uib-datepicker-popup is-open="{beginDateOpenDate}" current-text="今天" clear-text="清除" close-text="关闭"/><button type="button" class="btn btn-default datepicker" ng-click="{beginDateClick}"><i class="glyphicon glyphicon-calendar"></i></button></div><div class="col-md-6" style="padding-right: 0;"><label>{endDateLabel}</label>&nbsp;&nbsp;<input class="form-control" type="text" placeholder="{endDatePlaceholder}" readOnly="true" ng-model="{endDateModel}" uib-datepicker-popup is-open="{endDateOpenDate}" current-text="今天" clear-text="清除" close-text="关闭"/><button type="button" style="right:0;" class="btn btn-default datepicker" ng-click="{endDateClick}"><i class="glyphicon glyphicon-calendar"></i></button></div></div>'
    };

    angular.module('bkm.library.angular.web', [])
        .controller('directiveCtrl', directiveCtrl)
        .directive('bkmSearch', bkmSearch)
        .directive('bkmElements', bkmElements)
        .directive('bkmModalForm', ['$compile', '$filter', 'bkmFmValSvc', bkmModalForm]);

    function directiveCtrl() {
        var ctrl = this;
    };

    function bkmElements($compile) {
        return {
            restrict: 'E',
            scope: {
                includeOption: '=?',
                cols: '=?'
            },
            require: '?^bkmModalForm',
            controller: 'directiveCtrl',
            controllerAs: 'dCtrl',
            replace: true,
            template: '<div></div>',
            link: function (scope, el, attrs, ctrl) {

                var formCtrlOpt = ctrl.opt.includeOption || [];
                var includeOption = !!scope.includeOption ? scope.includeOption : formCtrlOpt;
                linkFunc(
                scope,
                el,
                formComponents,
                {
                    items: '',
                    buttons: ''
                },
                includeOption,
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
                var cols = !!scope.cols ? scope.cols : 4;
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
    function bkmModalForm($compile, $filter, bkmFmValSvc) {

        return {
            restrict: 'E',
            scope: {
                options: '=',
                footers: '=?',
                cols: '=?cols'
            },
            controller: 'directiveCtrl',
            controllerAs: 'dCtrl',
            replace: true,
            template: '<div class="modal-content" ><div class="modal-header" style="background-color:#209e91"><i class="ion-information-circled modal-icon"></i><span>{{$parent.modalTitle}}</span><button type="button" class="close" ng-click="$parent.$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><div class="modal-body"><form novalidate  name="myForm"><div class="row"></div><div ng-include="options.includeUrl"></div></form></div><div class="modal-footer "></div><script type="text/javascript">$(".modal-dialog").drags({handle: ".modal-header"});</script></div>',

            link: function (scope, el) {

                //定义表单验证的回调函数
                scope.options.onSubmit = function (onSubmitFn) {
                    scope.myForm.$setSubmitted(true);
                    bkmFmValSvc.isValid(scope.myForm).then(onSubmitFn, null);
                };

                //format footer template
                //设置默认的提交和关闭操作按钮
                scope.options.buttons = scope.options.buttons || [];
                if ($filter('filter')(scope.options.buttons, { category: 'submit' }).length == 0) {
                    angular.extend(scope.options, {
                        buttons: [
                            {
                                text: '关闭',
                                category: 'cancel',
                                click: scope.$parent.$dismiss
                            }, {
                                text: '提交',
                                category: 'submit',
                                click: scope.options.model.submitFn
                            }]
                    });
                };

                //format body template
                linkFunc(
                    scope,
                    el,
                    formComponents,
                     {
                         items: '.row',
                         buttons: '.modal-footer'
                     },
                    scope.options,
                    scope.cols,
                    'form-group'
                    );
                $compile(el)(scope);

                //将指令的myForm对象通过Controller传递给其他使用myForm的指令
                scope.dCtrl.myForm = !!scope.myForm ? scope.myForm : {};
            }
        };
    }

    function linkFunc(scope, el, uiComponents, selectors, options, cols, formStyle) {

        //设置窗体默认列布局
        cols = !!cols && typeof (cols) == 'number' && cols < 5 ? 'col-md-' + 12 / cols : 'col-md-6';

        var search = scope.dCtrl.search = {};
        var opt = scope.dCtrl.opt = angular.extend({}, options);



        var i, t;

        var previous = selectors.items == '' ? el : el.find(selectors.items);
        var btnPrevious = selectors.buttons == '' ? el : el.find(selectors.buttons);

        angular.forEach(opt.items, function (t, i) {
            t = opt.items[i];

            search[t.model] = !!t.defaultVal ? t.defaultVal : null;

            //设置下拉列表默认的key,name标识
            t.keyName = !!t.keyName ? t.keyName : 'key';
            t.valName = !!t.valName ? t.valName : 'name';
            //设置元素默认列布局
            t.cols = !!t.cols && typeof (t.cols) == 'number' && t.cols < 5 ? 'col-md-' + 12 / t.cols : cols;

            //设置默认的验证要求
            t.validateAttr = t.validateAttr || [];
            if (!t.option) {
                if (t.validateAttr.toString().indexOf('required') == -1) {
                    t.validateAttr.push('required', 'required-error="必填信息"');
                }
            }

            //设置可选提示符
            var optionPrompt = !!t.option ? ' (可选) ' : "",
            validError = 'ng-class="{\'has-error\':!myForm.' + t.model + '.$valid && (myForm.' + t.model + '.$dirt || myForm.$submitted)}"';

            //无tooltip时，默认清空提示
            t.tooltip = t.tooltip || '';

            if (t.type == 'text' || t.type == 'number') {
                //设置默认的PlaceHolder提示语
                if (t.type == 'number')
                    t.placeholder = t.placeholder || '请填写数字，精确小数点两位';

                previous.append(formatTemplate({
                    label: t.label,
                    type: t.type,
                    placeholder: t.placeholder,
                    model: 'options.model.' + t.model,
                    formRequired: optionPrompt,
                    validateAttr: t.validateAttr.join(' '),
                    formName: t.model,
                    validError: validError,
                    cols: t.cols,
                    formStyle: formStyle,
                    tooltip: t.tooltip
                }, uiComponents.textTemp));
            } else if (t.type == 'dropDown') {
                var c_modelName = 'options.model.' + t.model;
                previous.append(formatTemplate({
                    label: t.label,
                    type: t.type,
                    placeholder: t.placeholder,
                    model: c_modelName,
                    repeat: 'i.' + t.valName + ' for i in dCtrl.opt.items[' + i + '].dataSource',
                    formRequired: optionPrompt,
                    validateAttr: t.validateAttr.join(' '),
                    formName: t.model,
                    validError: validError,
                    cols: t.cols, formStyle: formStyle,
                    tooltip: t.tooltip
                }, uiComponents.dropDownTemp));
                if (!!t.parent) {
                    var modelName = 'options.model.' + t.parent.model;
                    scope.$watch(modelName, function (n, o) {
                        if (n === o) return;
                        search[c_modelName] = '';
                        opt.items[i].dataSource = [];
                        if (!!!n) return;
                        t.parent.onChange(n).then(function (data) {
                            opt.items[i].dataSource = data;
                        }, null);
                    });
                }
            } else if (t.type == 'date') {
                var modelName = t.model;
                var isOpen = 'openDate' + modelName.replace(/\./g, '_');
                opt[isOpen] = false;
                opt[isOpen + 'Click'] = function () {
                    opt[isOpen] = true;
                };
                previous.append(formatTemplate({
                    label: t.label,
                    placeholder: t.placeholder,
                    model: 'options.model.' + modelName,
                    openDate: 'dCtrl.opt.' + isOpen,
                    click: 'dCtrl.opt.' + isOpen + 'Click()',
                    formRequired: optionPrompt,
                    validateAttr: t.validateAttr.join(' '),
                    formName: modelName,
                    validError: validError,
                    cols: t.cols, formStyle: formStyle,
                    tooltip: t.tooltip
                }, uiComponents.dateTemp));
            } else if (t.type == 'beginDateAndEndDate') {
                if (!!t.beginDate.defaultVal) {
                    search[t.beginDate.model] = t.beginDate.defaultVal;
                }
                if (!!t.endDate.defaultVal) {
                    search[t.endDate.model] = t.endDate.defaultVal;
                }
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
                previous.append(formatTemplate({
                    cols: t.cols
                }, uiComponents.placeHolderTemp));
            }
        });

        angular.forEach(opt.buttons, function (t, i) {

            t.type = !!t.type ? t.type : 'bkmButton';

            //无tooltip时，默认清空提示
            t.tooltip = t.tooltip || '';

            var btnClickFnName = 'buttonClick' + i;
            if (t.type == 'button') {
                opt[btnClickFnName] = function () {
                    t.click(search);
                };
                btnPrevious.append(formatTemplate({
                    text: t.text,
                    className: t.className,
                    icon: t.icon,
                    tooltip: t.tooltip,
                    click: 'dCtrl.opt.' + btnClickFnName + '()'
                }, uiComponents.buttonTemp));
            } else if (t.type == 'downloadButton') {
                opt[btnClickFnName] = function (event) {
                    var url = t.click(search);
                    if (!!url) {
                        event.currentTarget.parentElement.href = url;
                    }
                };
                btnPrevious.append(formatTemplate({
                    text: t.text,
                    className: t.className,
                    icon: t.icon,
                    tooltip: t.tooltip,
                    model: '',
                    click: 'dCtrl.opt.' + btnClickFnName + '($event)'
                }, uiComponents.downloadButtonTemp));
            } else if (t.type == 'bkmButton') {
                opt[btnClickFnName] = function () {
                    t.click(search);
                };
                btnPrevious.append(formatTemplate({
                    text: t.text,
                    category: t.category,
                    click: 'dCtrl.opt.' + btnClickFnName + '()'
                }, uiComponents.bkmButtonTemp));
            }
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