(function () {
    'use strict';

    angular
        .module('bkm.library.angular.web')
        .service('publicLinkFuncService', publicLinkFuncService);

    //date filter format definition
    const dateFormatDef = {
        year: 'YYYY',
        month: 'YYYY-MM',
        day: 'YYYY-MM-DD',
        hour: 'YYYY-MM-DD HH:mm',
        minute: 'YYYY-MM-DD HH:mm'
    };

    const formComponents = {
        textTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}"><div class="{formStyle}" style="position:relative;" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<input bkm-input bkm-form-valid-icon={isShowSpan} name="{formName}" {onChange} class="form-control {type}" type="{type}" placeholder="{placeholder}" {validateAttr} ng-model="{model}"  ng-disabled="{readModel}.isRead||{isRead}"  data-toggle="password" uib-popover="{tooltip}" popover-trigger="\'focus\'"/><span ng-if={isShowSpan} class="input-icon {spanCss} " ng-click="{click}" ></span></div></div>',
        cbxTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}"><div class="{formStyle}" ><label class="checkbox-inline custom-checkbox nowrap"><input  type="checkbox" ng-model="{model}"  ng-disabled="{readModel}.isRead||{isRead}" ng-click="{click}" uib-popover="{tooltip}" popover-trigger="\'focus\'"/><span class="group-header">{label}{formRequired}</span></label></div></div>',
        noteTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}"><div class="{formStyle}" style="position:relative;"><label ng-hide="{hideLabel}.isHide">&nbsp;</label><label  style="border:none;color:{color};font-weight:normal;padding-top:5px; padding-left:0;">{label}{{{model}}}</label></div></div>',
        textareaTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}"><div class="{formStyle}" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<textarea bkm-input bkm-form-valid-icon={isShowSpan} name="{formName}" class="form-control "  placeholder="{placeholder}" {validateAttr} ng-model="{model}" ng-disabled="{readModel}.isRead||{isRead}" uib-popover="{tooltip}" popover-trigger="\'focus\'" ng-click="{click}" /></div></div>',
        dropDownTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}" style="color:{color};font-size:{fontSize}"><div class="{formStyle}" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<select uib-popover="{tooltip}" popover-trigger="\'focus\'" bkm-input name="{formName}" {validateAttr} class="form-control selectpicker" selectpicker ng-model="{model}" ng-disabled="{readModel}.isRead||{isRead}" {onChange} ng-options="{repeat}" ><option value="">-- {placeholder} --</option></select></div></div>',
        multiSelectTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}"><div class="{formStyle}" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<multiselect  show-search="{isShowSearch}" search-limit="{searchLimit}" ng-model="{model}" options="{dataSource}" id-prop="{keyName}" display-prop="{valName}" labels="{disp}" placeholder="{placeholder}" ng-disabled="{readModel}.isRead||{isRead}" {onChange} show-unselect-all="true"  show-tooltip="true" bkm-input name="{formName}" {validateAttr} class="form-control selectpicker"></multiselect></div></div>',
        dateTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}">\
                    <div class="{formStyle}" {validError}>\
                        <div class="dropdown">\
                            <label>{label}{formRequired}</label>&nbsp;&nbsp;\
                            <div ng-class="{\'date\':!({readModel}.isRead===true)}" class="bkm-form-icon form-control">\
                                <a class="dropdown-toggle" id="{dropdownId}" role="button" data-toggle="dropdown" data-target="#">\
                                    <input type="text" class="form-control" data-date-time-input="{dateFormat}" ng-model="{model}"  uib-popover="{tooltip}" popover-trigger="\'focus\'" bkm-input name="{formName}"  {validateAttr} placeholder="{placeholder}" readOnly ng-disabled="{readModel}.isRead||{isRead}">\
                                </a>\
                                <ul ng-if="!({readModel}.isRead===true)" class="dropdown-menu  pull-right" role="menu" aria-labelledby="dLabel">\
                                    <datetimepicker ng-model="{model}" data-datetimepicker-config="{minView:\'{minView}\', minuteStep:{minuteStep}, startView:\'{startView}\', dropdownSelector: \'#{dropdownId}\'}"/>\
                                </ul>\
                                <span ng-if="!({readModel}.isRead===true)" class="input-group-addon" ng-click="{model}=null">\
                                    <i class="input-datepicker glyphicon glyphicon-remove"></i>\
                                </span>\
                            </div>\
                        </div>\
                    </div>\
                </div>',
        buttonTemp: '<button ng-hide="{hideModel}.isHide||{isHide}" uib-popover="{tooltip}" popover-trigger="\'focus\'" type="button" class="{className}" ng-disabled="{readModel}.isRead||{isRead}" ng-click="{click}"><i class="{icon}"></i><span>&nbsp;{text}</span></button>',
        downloadButtonTemp: '<div class="btn-group" ng-hide="{hideModel}.isHide||{isHide}" >\
                                <button uib-popover="{tooltip}" popover-trigger="\'focus\'" type="button" style="margin-left: 5px;" class="{className} dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{text}<span class="caret"></span>\
                                </button>\
                                <ul class="dropdown-menu">\
                                    <li ng-repeat="{repeat}"><a ng-click="item.click()" ng-hide="item.hideModel.isHide" >\
                                        <i class="{{item.icon}}" aria-hidden="true" style="margin-right:5px;"></i>{{item.text}}</a>\
                                    </li>\
                                </ul>\
                            </div>',
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
                    <div class="dropdown dropdown-end-parent {formStyle}" {endValidError}>\
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
        angucompleteAltTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="{cols}"><div class="{formStyle}" style="position:relative;" {validError}><label>{label}{formRequired}</label>&nbsp;&nbsp;<angucomplete-alt name="{formName}"  {angucompleteAltOptAttrs} style="padding:0;border:0;" type="{type}" uib-popover="{tooltip}" popover-trigger="\'focus\'"/></div></div>',
        inputFileBtnTemp: '<button type="button" style="border:0;text-decoration:none;outline:none;padding:0;" ng-hide="{hideModel}.isHide||{isHide}" ng-disabled="{readModel}.isRead||{isRead}">\
                                <label class="{className}" for="{btnId}">\
                                    <i class="fa fa-upload" aria-hidden="true"></i>\
                                    <span>{text}</span>\
                                </label>\
                                <input type="file" bkm-import-sheet options="{importOptions}" ng-show="false" id="{btnId}">\
                            </button>',
        importFileTemp: '<div ng-hide="{hideModel}.isHide||{isHide}" class="col-md-12">\
                            <div class="{formStyle}" style="position:relative;">\
                                <label>{label}</label>&nbsp;&nbsp;\
                                <div>\
                                    <label class="btn btn-with-icon btn-primary" for="{importId}">\
                                        <i class="fa fa-upload" aria-hidden="true" style="color:white;"></i>\
                                        <span>{text}</span>\
                                    </label>\
                                    <input type="file" bkm-import-sheet options="{importOptions}" ng-show="false" id="{importId}">\
                                    <a ng-if="{isShowDemoTemp}" ng-href="{{{demoTempUrl}}}" style="margin-left:14px;">下载模板</a>\
                                    <span ng-if="{isShowFileInfo}" style="margin-left:14px;">文件名:<strong>{{{fileName}}}</strong></span>\
                                    <span ng-if="{isShowFileInfo}" style="margin-left:14px;"><strong>{{{fileSize}}}</strong>&nbsp;&nbsp;KB</span>\
                                </div>\
                            </div>\
                        </div>'
    };



    publicLinkFuncService.$inject = [];
    function publicLinkFuncService() {

        this.linkFunc = linkFunc;

        ////////////////

        function linkFunc(scope, el, selectors, options, cols, formStyle) {
            //设置窗体默认列布局
            let parentCols = !!cols && typeof (cols) == 'number' ? 'col-md-' + cols % 13 : 'col-md-4';
            //将指令参数配置到Controller上在指令间共享
            let opt = scope.dCtrl.opt = Object.assign({}, options);
            // 定位元素位置
            let previous = selectors.items == '' ? el : el.find(selectors.items),
                btnPrevious = selectors.buttons == '' ? el : el.find(selectors.buttons),
                accordElem = !!selectors.accordions ? el.find(selectors.accordions) : null;

            opt.items = opt.items || [];
            opt.items.forEach((t, i) => {
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
                    opt[clickFnName] = () => t.click();
                }
                //设置动态设置元素disable的函数名称
                var dynaIsReadModel = 'dynaIsReadModel' + i;
                opt[dynaIsReadModel] = t.readModel || {};

                //动态设置元素隐藏
                var hideModel = 'hideItemModel' + i;
                opt[hideModel] = t.hideModel || {};

                //设置初始化元素选项 
                var elemOptions = {
                    label: t.label || '',
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
                    isRead: !!opt.isReadonlyForm || !!t.isRead,
                    color: t.color || 'inherit',
                    fontSize: t.fontSize || 'inherit',
                    onChange: ''
                };
                //onChange方法定义
                if (typeof t.onChange == 'function') {
                    elemOptions.onChange = 'ng-change="dCtrl.opt.items[' + i + '].onChange(' + elemOptions.model + ',options.model)"';
                }
                // 组件元素方法映射
                let optItemFuncMapping = {
                    text: () => commInputElemFunc(previous, elemOptions, formComponents.textTemp),
                    number: () => commInputElemFunc(previous, elemOptions, formComponents.textTemp),
                    password: () => commInputElemFunc(previous, elemOptions, formComponents.textTemp),
                    email: () => commInputElemFunc(previous, elemOptions, formComponents.textTemp),
                    tel: () => commInputElemFunc(previous, elemOptions, formComponents.textTemp),
                    checkbox: () => commInputElemFunc(previous, elemOptions, formComponents.cbxTemp),
                    note: () => noteElemFunc(previous, elemOptions, formComponents.noteTemp, t, i, opt),
                    textarea: () => commInputElemFunc(previous, elemOptions, formComponents.textareaTemp),
                    dropDown: () => dropDownFunc(previous, elemOptions, formComponents.dropDownTemp, t, i, opt, scope),
                    multiSelect: () => multiSelectFunc(previous, elemOptions, formComponents.multiSelectTemp, t, i, opt),
                    date: () => dateFunc(previous, elemOptions, formComponents.dateTemp, t, i),
                    beginDateAndEndDate: () => beginDateAndEndDateFunc(previous, elemOptions, formComponents.beginDateAndEndDateTemp, t, i, opt, scope),
                    placeHolder: () => commInputElemFunc(previous, elemOptions, formComponents.placeHolderTemp),
                    address: () => addressFunc(previous, elemOptions, formComponents.addressTemp, t),
                    colorPicker: () => colorPickerFunc(previous, elemOptions, formComponents.colorPickerTemp, t, i, opt),
                    import: () => importFunc(previous, elemOptions, formComponents.importFileTemp, t, i),
                    autoComplete: () => autoCompleteFunc(previous, elemOptions, formComponents.angucompleteAltTemp, t, i, opt, scope)
                }
                let uiItemFunc = optItemFuncMapping[t.type];
                if (typeof uiItemFunc == 'function') {
                    uiItemFunc();
                }
            });

            opt.buttons = opt.buttons || [];
            opt.buttons.forEach((t, i) => {
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
                    className: t.className || 'btn btn-primary',
                    icon: t.icon,
                    tooltip: t.tooltip,
                    hideModel: 'dCtrl.opt.' + hideModel,
                    isHide: !!t.isHide,
                    readModel: 'dCtrl.opt.' + dynaIsReadModel,
                    isRead: !!opt.isReadonlyForm || !!t.isRead,
                    click: 'dCtrl.opt.' + btnClickFnName + '()'
                };
                opt[btnClickFnName] = () => t.click();

                if (t.type == 'button') {
                    btnPrevious.append(formatTemplate(btnOptions, formComponents.buttonTemp));
                } else if (t.type == 'downloadButton') {
                    Object.assign(btnOptions, {
                        repeat: 'item in dCtrl.opt.buttons[' + i + '].btns'
                    });
                    btnPrevious.append(formatTemplate(btnOptions, formComponents.downloadButtonTemp));
                } else if (t.type == 'bkmButton') {
                    Object.assign(btnOptions, {
                        category: t.category
                    });
                    btnPrevious.append(formatTemplate(btnOptions, formComponents.bkmButtonTemp));
                } else if (t.type == 'inputFileBtn') {
                    btnOptions.btnId = 'inputFileBtn' + i;
                    btnOptions.importOptions = 'dCtrl.opt.buttons[' + i + '].options';
                    btnPrevious.append(formatTemplate(btnOptions, formComponents.inputFileBtnTemp));
                }
            });

            opt.accordions = opt.accordions || [];
            opt.accordions.forEach((t, i) => {
                //动态设置元素隐藏
                var hideModel = 'hideAccordionModel' + i;
                opt[hideModel] = t.hideModel || {};
                var accordOptions = {
                    title: t.title,
                    accordId: t.accordId,
                    isExpanded: t.isExpanded,
                    hideModel: 'dCtrl.opt.' + hideModel,
                    isHide: t.isHide
                };
                if (!t.isHide) {
                    accordElem.append(formatTemplate(accordOptions, formComponents.accordTemp));
                }
            });
        }

        /**
         * 通用的文本输入框元素生成方法
         *
         * @param {*} previous
         * @param {*} elemOptions
         * @param {*} elemTemp
         */
        function commInputElemFunc(previous, elemOptions, elemTemp) {
            previous.append(formatTemplate(elemOptions, elemTemp));
        }

        /** 提示元素 */
        function noteElemFunc(previous, elemOptions, elemTemp, t, i, opt) {
            let hideLabel = 'hideItemLabel' + i;
            opt[hideLabel] = t.hideLabel || { isHide: true };
            elemOptions.hideLabel = 'dCtrl.opt.' + hideLabel;
            Object.assign(elemOptions, {
                color: t.color || 'red'
            });
            previous.append(formatTemplate(elemOptions, elemTemp));
        }

        /** 下拉列表元素 */
        function dropDownFunc(previous, elemOptions, elemTemp, t, i, opt, $scope) {
            Object.assign(elemOptions, {
                repeat: 'i.' + t.keyName + ' as i.' + t.valName + ' for i in dCtrl.opt.items[' + i + '].dataSource',
                placeholder: t.placeholder || '请选择'
            });
            previous.append(formatTemplate(elemOptions, elemTemp));
            if (!!t.parent) {
                var modelName = 'options.model.' + t.parent.model;
                $scope.$watch(modelName, function (n, o) {
                    if (n === o) return;
                    opt.items[i].dataSource = [];
                    if (!!!n) return;
                    t.parent.onChange(n).then(function (data) {
                        opt.items[i].dataSource = data;
                    }, null);
                });
            }
        }

        /** 下拉多选项列表元素 */
        function multiSelectFunc(previous, elemOptions, elemTemp, t, i, opt) {
            opt.multiSelectLabels = {
                itemsSelected: " 项已选择    ",
                unselectAll: "清除选项"
            };
            Object.assign(elemOptions, {
                dataSource: 'dCtrl.opt.items[' + i + '].dataSource',
                placeholder: t.placeholder || '-- 请选择 --',
                keyName: t.keyName,
                valName: t.valName,
                isShowSearch: t.isShowSearch || false,
                searchLimit: t.searchLimit || 10,
                disp: 'dCtrl.opt.multiSelectLabels'
            });
            previous.append(formatTemplate(elemOptions, elemTemp));
        }

        /** 日期组件元素 */
        function dateFunc(previous, elemOptions, elemTemp, t, i) {
            Object.assign(elemOptions, {
                startView: !t.startView ? 'day' : t.startView,
                minView: !t.minView ? 'day' : t.minView,
                minuteStep: !t.minuteStep ? '1' : t.minuteStep,
                dropdownId: 'dropdown_' + t.model + i
            });
            elemOptions.dateFormat = dateFormatDef[elemOptions.minView];
            previous.append(formatTemplate(elemOptions, elemTemp));
        }

        /** 开始结束日期元素 */
        function beginDateAndEndDateFunc(previous, elemOptions, elemTemp, t, i, opt, $scope) {
            var template = !!opt.renderSearch ? elemTemp.replace(/class="form-group"/ig, '') : elemTemp;
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
                $scope.$broadcast('start-date-changed');
            };
            var endDateOnSetTime = endDateModel + 'OnSetTime';
            opt[endDateOnSetTime] = function () {
                $scope.$broadcast('end-date-changed');
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
            Object.assign(elemOptions, {
                minView: !t.minView ? 'day' : t.minView,
                minuteStep: !t.minuteStep ? '1' : t.minuteStep,
                cols: 'col-md-' + Number(elemOptions.cols.substr(elemOptions.cols.length - 1, 1)) * 2,
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
                dropdownStart: "dropdownStart_" + beginDateModel.replace('.', '_') + i,
                dropdownEnd: "dropdownEnd_" + endDateModel.replace('.', '_') + i
            });
            elemOptions.dateFormat = dateFormatDef[elemOptions.minView];
            previous.append(formatTemplate(elemOptions, template));
        }

        /** 地址组件元素 */
        function addressFunc(previous, elemOptions, elemTemp, t) {
            Object.assign(elemOptions, {
                level: t.level || 2, //默认2级
                isFullName: t.isFullName || false //默认显示简称
            });
            previous.append(formatTemplate(elemOptions, elemTemp));
        }

        /** 色彩组件 */
        function colorPickerFunc(previous, elemOptions, elemTemp, t, i, opt) {
            opt.colorPickerOpt = {
                required: !!!t.option,
                disabled: opt.isReadonlyForm,
                placeholder: t.placeholder,
                inputClass: 'form-gropu',
                name: t.model,
                format: 'hex'
            };
            if (!opt.isReadonlyForm) {
                Object.assign(opt.colorPickerOpt, {
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
            previous.append(formatTemplate(elemOptions, elemTemp));
        }

        /** 上传文件组件 */
        function importFunc(previous, elemOptions, elemTemp, t, i) {
            let importOptions = 'dCtrl.opt.items[' + i + '].options',
                demoTempUrl = importOptions + '.tempUrl',
                fileName = importOptions + '.file.name';
            Object.assign(elemOptions, {
                importId: 'importId' + i,
                isShowDemoTemp: demoTempUrl + "!=null",
                demoTempUrl: demoTempUrl,
                importOptions: 'dCtrl.opt.items[' + i + '].options',
                text: t.text || '上传文件',
                fileName: importOptions + '.file.name',
                fileSize: importOptions + '.file.size/1000',
                isShowFileInfo: fileName + "!=null"
            });
            previous.append(formatTemplate(elemOptions, elemTemp));
        }

        /** 自动输入完成组件 */
        function autoCompleteFunc(previous, elemOptions, elemTemp, t, i, opt, $scope) {
            var autoOption = {
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
            t.clearInput = function () {
                $scope.$broadcast('angucomplete-alt:clearInput', autoOption.id);
            }
            t.setValue = function (val) {
                $scope.$broadcast("angucomplete-alt:changeInput", autoOption.id, val);
            };
            var optAttrs = [],
                str = '',
                pushStr = '',
                regEx = /([A-Z])/g,
                optStr = `dCtrl.opt.angucompleteAltOpt${i}.`,
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
            autoOption.selectedObject = function (value, selectedObjectData) {
                if (typeof value == 'object') {
                    if (t.modelKey) {
                        opt.model[t.model] = value.originalObject[t.modelKey] || '';
                    } else {
                        opt.model[t.model] = value.originalObject || {};
                    }
                } else {
                    opt.model[t.model] = value || '';
                }

                if (!!t.onSelected) {
                    if (typeof t.onSelected == 'function' && value != null) {
                        t.onSelected(value, selectedObjectData);
                    }
                }
            }

            autoOption.inputChanged = function (value) {
                if (t.modelKey && t.modelKey == t.model) {
                    opt.model[t.model] = value;
                    // 如果 modelKey 和 model 是同一字段时，只要 input 框非空，则设置为非必填
                    $scope.dCtrl.opt[`angucompleteAltOpt${i}`].fieldRequired = (value == '');
                }
                if (!!t.inputChanged) {
                    if (typeof t.inputChanged == 'function') {
                        t.inputChanged(value);
                    }
                }
            }

            if ($scope.myForm) {
                var unWatchFn = $scope.$watch(function () {
                    return $scope.myForm[t.model];
                }, function (newVal) {
                    if (newVal) {
                        unWatchFn();
                        var regex = /^(.*)-error=".*"$/ig;
                        var obj = {};
                        elemOptions.validateAttr.split(' ').forEach(function (c, i, a) {
                            regex.lastIndex = 0;
                            if (regex.test(c)) {
                                regex.lastIndex = 0;
                                obj[c.replace(regex, "$1Error")] = c.split('=')[1].replace(/["']/g, '');
                            }
                        });
                        $scope.myForm[t.model].errorMsg = obj;
                    }
                });
            }
            opt[`angucompleteAltOpt${i}`] = autoOption;
            for (let x in autoOption) {
                if (autoOption[x] == null) continue;
                pushStr = '';
                str = '';
                regEx.lastIndex = 0;
                str = x
                if (regEx.test(x)) {
                    regEx.lastIndex = 0;
                    str = x.replace(regEx, (p) => {
                        return '-' + p.toLowerCase();
                    });
                }
                pushStr = optMap[x] == "@" ? (str + '="{{' + optStr + x + '}}"') : (str + '="' + optStr + x + '"');
                optAttrs.push(pushStr);
            };
            Object.assign(elemOptions, { angucompleteAltOptAttrs: optAttrs.join(' ') });
            previous.append(formatTemplate(elemOptions, elemTemp));
        }


        function setValidError(modelName) {
            return 'ng-class="{\'has-error\':!myForm[\'' + modelName + '\'].$valid && (myForm[\'' + modelName + '\'].$dirt || myForm.$submitted)}"';
        }

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