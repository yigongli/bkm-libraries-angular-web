/**
 * Created by gurihui on 2016/12/30.
 */
(function () {
    'use strict';


    var formComponents = {
        textTemp: '<div class="col-md-6"><div class="form-group"><label>{label}{formRequired}</label><input class="form-control " type="{type}" placeholder="{placeholder}" ng-model="{model}"/></div></div>',
        dropDownTemp: '<div class="col-md-6"><div class="form-group"><label>{label}</label><select class="form-control selectpicker" selectpicker ng-model="{model}" ng-options="{repeat}" ></select></div></div>',
        dateTemp: '<div class="col-md-6"><div class="bkm-date-picker"><div class="form-group"><label>{label}</label><input bkm-input class="form-control" ng-model="{model}" type="datetime" {validateAttr} placeholder="{placeholder}" readOnly="true"  uib-datepicker-popup is-open="{openDate}" current-text="今天" clear-text="清除" close-text="关闭"/><button type="button" class="btn btn-default datepicker" ng-click="{click}"><i class="glyphicon glyphicon-calendar"></i></button></div></div></div>',
        buttonTemp: '<button type="button" class="{className}" ng-click="{click}"><i class="{icon}"></i><span>&nbsp;{text}</span></button>',
        downloadButtonTemp: '<a class="down-link" href="javascript:void(0);" target="_blank"><button type="button" class="{className}" ng-click="{click}"><i class="{icon}"></i><span>&nbsp;{text}</span></button></a>',
        placeHolderTemp: '<div class="col-md-6 placeholder"> <div class="form-control"></div> </div>',
        bkmButtonTemp: '<bkm-button category="{category}" text="{text}" ng-click="{click}"></bkm-button>',
    };

    var searchComponents = {
        textTemp: '<div class="col-md-3"><label>{label}</label>&nbsp;&nbsp;<input class="form-control" type="{type}" placeholder="{placeholder}" ng-model="{model}"/></div>',
        dropDownTemp: '<div class="col-md-3"><label>{label}</label>&nbsp;&nbsp;<select class="form-control selectpicker" selectpicker ng-model="{model}"><option value="">-- 所有 --</option><option value="{{{key}}}" ng-repeat="{repeat}" ng-bind="{val}"></option></select></div>',
        dateTemp: '<div class="col-md-3"><label>{label}</label>&nbsp;&nbsp;<input class="form-control" type="text" placeholder="{placeholder}" readOnly="true" ng-model="{model}" uib-datepicker-popup is-open="{openDate}" current-text="今天" clear-text="清除" close-text="关闭"/><button type="button" class="btn btn-default datepicker" ng-click="{click}"><i class="glyphicon glyphicon-calendar"></i></button></div>',
        beginDateAndEndDateTemp: '<div class="col-md-6"><div class="col-md-6"><label>{beginDateLabel}</label>&nbsp;&nbsp;<input class="form-control" type="text" placeholder="{beginDatePlaceholder}" readOnly="true" ng-model="{beginDateModel}" uib-datepicker-popup is-open="{beginDateOpenDate}" current-text="今天" clear-text="清除" close-text="关闭"/><button type="button" class="btn btn-default datepicker" ng-click="{beginDateClick}"><i class="glyphicon glyphicon-calendar"></i></button></div><div class="col-md-6" style="padding-right: 0;"><label>{endDateLabel}</label>&nbsp;&nbsp;<input class="form-control" type="text" placeholder="{endDatePlaceholder}" readOnly="true" ng-model="{endDateModel}" uib-datepicker-popup is-open="{endDateOpenDate}" current-text="今天" clear-text="清除" close-text="关闭"/><button type="button" style="right:0;" class="btn btn-default datepicker" ng-click="{endDateClick}"><i class="glyphicon glyphicon-calendar"></i></button></div></div>',
        buttonTemp: '<button type="button" class="{className}" ng-click="{click}"><i class="{icon}"></i><span>&nbsp;{text}</span></button>',
        downloadButtonTemp: '<a class="down-link" href="javascript:void(0);" target="_blank"><button type="button" class="{className}" ng-click="{click}"><i class="{icon}"></i><span>&nbsp;{text}</span></button></a>',
        placeHolderTemp: '<div class="col-md-3 placeholder"> <div class="form-control"></div> </div>',
        bkmButtonTemp: '<bkm-button category="{category}" text="{text}" ng-click="{click}"></bkm-button>',
    };

    angular.module('bkm.library.angular.web', [])
        .controller('directiveCtrl', directiveCtrl)
        .directive('bkmSearch', bkmSearch)
        .directive('bkmModalForm', bkmModalForm)
        .directive('bkmModalBodyComponents', bkmModalBodyComponents)
        .directive('bkmModalHeader', bkmModalHeader)
        .directive('bkmModalFooter', bkmModalFooter);

    function directiveCtrl() {
        var ctrl = this;
        this.earliestLoadTime = '';
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

        //set the CSS selector
        var selectors = {
            items: '.row',
            buttons: '.btns'
        };

        return {
            restrict: 'E',
            scope: { options: '=' },
            controller: 'directiveCtrl',
            controllerAs: 'dCtrl',
            replace: true,
            template: '<div class="search-condition form-inline text-right"><div class="row"></div><div class="text-right search-btn button-panel btns"></div>',
            link: function (scope, el) {
                linkFunc(scope, el, $compile, searchComponents, selectors, scope.options);
            }
        };
    }

    function bkmModalForm($compile) {

        var selectors = {
            items: '.row',
            buttons: '.modal-footer'
        };

        return {
            restrict: 'E',
            scope: {
                title: '=',
                options: '=',
                cols: '='
            },
            controller: 'directiveCtrl',
            controllerAs: 'dCtrl',
            replace: true,
            template: '<div class="modal-content" id="draggableModal"><div class="modal-header" style="background-color:#209e91"><i class="ion-information-circled modal-icon"></i><span>{{title}}</span><button type="button" class="close" ng-click="$parent.$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><div class="modal-body"><div class="row"></div></div><div class="modal-footer "></div><script type="text/javascript">$(".modal-dialog").drags({handle: ".modal-header"});</script></div>',
            link: function (scope, el) {
                linkFunc(scope, el, $compile, formComponents, selectors, scope.options);
            }
        };
    }

    function bkmModalBodyComponents($compile, bkmFmValSvc) {

        var selectors = {
            items: '',
            buttons: ''
        };

        return {
            restrict: 'AE',
            scope: {
                options: '=',
                cols: '='
            },
            controller: 'directiveCtrl',
            controllerAs: 'dCtrl',
            replace: true,
            template: '<form novalidate class="row" name="dCtrl.myForm"></form>',
            link: function (scope, el) {
                scope.options.onSubmit = function (onSubmitFn) {
                    bkmFmValSvc.isValid(scope.dCtrl.myForm).then(onSubmitFn, null);
                };
                linkFunc(scope, el, $compile, formComponents, selectors, scope.options, null, bkmFmValSvc);
            }
        };
    }

    function bkmModalHeader($compile) {

        return {
            restrict: 'E',
            scope: {
                title: '='
            },
            controller: 'directiveCtrl',
            controllerAs: 'dCtrl',
            replace: true,
            template: '<div class="modal-header" style="background-color:#209e91"><i class="ion-information-circled modal-icon"></i><span>{{title}}</span><button type="button" class="close" ng-click="$parent.$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div>'
        };
    }

    function bkmModalFooter($compile) {

        var selectors = {
            items: '',
            buttons: '.modal-footer'
        };

        return {
            restrict: 'E',
            scope: { options: '=' },
            controller: 'directiveCtrl',
            controllerAs: 'dCtrl',
            replace: true,
            template: '<div class="modal-footer"><script type="text/javascript">$(".modal-dialog").drags({handle: ".modal-header"});</script></div>',
            link: function (scope, el) {
                linkFunc(scope, el.parent(), $compile, formComponents, selectors, scope.options);
            }
        };
    }

    function linkFunc(scope, el, $compile, uiComponents, selectors, options, cols, bkmFmValService) {
        if (!!cols) {
            //todo: config colums layout with cols parameters
        }

        var search = scope.dCtrl.search = {};
        var opt = scope.dCtrl.opt = angular.extend({}, options);
        var i, t;

        var previous = selectors.items == '' ? el : el.find(selectors.items);
        var btnPrevious = selectors.buttons == '' ? el : el.find(selectors.buttons);

        angular.forEach(opt.items, function (t, i) {
            t = opt.items[i];

            t.keyName = !!t.keyName ? t.keyName : 'key';
            t.valName = !!t.valName ? t.valName : 'name';

            if (!!t.defaultVal) {
                search[t.model] = t.defaultVal;
            }
            var requiredPrompt = "";
            if (!!t.option) {
                requiredPrompt = ' (可选) ';
            }
            if (t.type == 'text' || t.type == 'number') {
                previous.append($compile(formatTemplate({
                    label: t.label,
                    type: t.type,
                    placeholder: t.placeholder,
                    model: 'options.model.' + t.model,
                    formRequired: requiredPrompt
                }, uiComponents.textTemp))(scope));
            } else if (t.type == 'dropDown') {
                var c_modelName = 'options.model.' + t.model;
                previous.append($compile(formatTemplate({
                    label: t.label,
                    type: t.type,
                    placeholder: t.placeholder,
                    model: c_modelName,
                    repeat: 'i.' + t.valName + ' for i in dCtrl.opt.items[' + i + '].dataSource',
                    formRequired: requiredPrompt
                }, uiComponents.dropDownTemp))(scope));
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
                previous.append($compile(formatTemplate({
                    label: t.label,
                    placeholder: t.placeholder,
                    model: 'options.model.' + modelName,
                    openDate: 'dCtrl.opt.' + isOpen,
                    click: 'dCtrl.opt.' + isOpen + 'Click()',
                    formRequired: requiredPrompt,
                    validateAttr: t.validateAttr.join(' ')
                }, uiComponents.dateTemp))(scope));
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
                previous.append($compile(formatTemplate({
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
                    formRequired: requiredPrompt
                }, uiComponents.beginDateAndEndDateTemp))(scope));
            } else if (t.type == 'placeHolder') {
                previous.append(formatTemplate({}, uiComponents.placeHolderTemp));
            }
        });

        angular.forEach(opt.buttons, function (t, i) {
            var btnClickFnName = 'buttonClick' + i;
            if (t.type == 'button') {
                opt[btnClickFnName] = function () {
                    t.click(search);
                };
                btnPrevious.append($compile(formatTemplate({
                    text: t.text,
                    className: t.className,
                    icon: t.icon,
                    click: 'dCtrl.opt.' + btnClickFnName + '()'
                }, uiComponents.buttonTemp))(scope));
            } else if (t.type == 'downloadButton') {
                opt[btnClickFnName] = function (event) {
                    var url = t.click(search);
                    if (!!url) {
                        event.currentTarget.parentElement.href = url;
                    }
                };
                btnPrevious.append($compile(formatTemplate({
                    text: t.text,
                    className: t.className,
                    icon: t.icon,
                    model: '',
                    click: 'dCtrl.opt.' + btnClickFnName + '($event)'
                }, uiComponents.downloadButtonTemp))(scope));
            } else if (t.type == 'bkmButton') {
                opt[btnClickFnName] = function () {
                    t.click(search);
                };
                btnPrevious.append($compile(formatTemplate({
                    text: t.text,
                    category: t.category,
                    click: 'dCtrl.opt.' + btnClickFnName + '()'
                }, uiComponents.bkmButtonTemp))(scope));
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