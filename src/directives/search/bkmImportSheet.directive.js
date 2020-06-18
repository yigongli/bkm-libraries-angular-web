(function () {
    'use strict';

    angular
        .module('bkm.library.angular.web')
        .directive('bkmImportSheet', importSheetDirective);

    importSheetDirective.$inject = ['bkmFileUpload', 'toastr'];

    function importSheetDirective(bkmFileUpload, toastr) {
        var directive = {
            controller: directiveController,
            controllerAs: 'ctrl',
            link: link,
            restrict: 'A',
            scope: {
                options: '='
            }
        };
        return directive;

        function link($scope, $elem, $attrs) {
            var opts = $scope.options || {},
                fileType = angular.isArray(opts.fileType) ? opts.fileType : ['xlsx', 'xls'];
            // 初始化返回的文件对象
            opts.file = {};
        
            // 监听文件变化
            $elem.on('change', onInputChange);

            function onInputChange(e) {
                var targetElem = e.target,
                    file = targetElem.files[0];
                if (!fileType.find(item => file.name.match(item))) {
                    toastr.info(bkm.util.format('请选择文件后缀为{0}类型的文件!', fileType.join(',')));
                    return;
                }
                
                // 设置返回的文件对象
                angular.extend(opts.file, {
                    name: file.name,
                    size: file.size,
                    type: file.type
                });

                // 上传文件
                if (angular.isFunction(opts.onUploadSuccess)) {
                    // 上传文件
                    bkmFileUpload.upload([file], {
                        type: fileType
                    }).then((response) => {
                        if (!response.data || !response.data[0].isSucess) {
                            toastr.error('文件上传失败');
                            resetInputFile(targetElem);
                            return;
                        }
                        // 上传文件成功后回调
                        opts.onUploadSuccess(response.data, file);
                        // 解析excel文件
                        if (angular.isFunction(opts.onParseSuccess)) {
                            parseSheet(e, opts.onParseSuccess);
                        }
                        // 重置监测状态
                        resetInputFile(targetElem);
                    });
                } else if (angular.isFunction(opts.onParseSuccess)) { // 直接解析Excel文件成功
                    parseSheet(e, opts.onParseSuccess);
                    // 重置监测状态
                    resetInputFile(targetElem);
                }
                
            }

            // 解析Excel文件
            function parseSheet(e, onParseSuccess) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    /* read workbook */
                    var bstr = e.target.result,
                        sheets = [],
                        wb = XLSX.read(bstr, {
                            type: 'binary'
                        });
                    // Get worksheets
                    if (wb && wb.SheetNames && wb.SheetNames.length > 0) {
                        wb.SheetNames.forEach(sheetName => {
                            var results = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
                                raw: true
                            });
                            sheets.push({
                                name: sheetName,
                                items: results
                            });
                        });
                        if (angular.isFunction(onParseSuccess)) {
                            onParseSuccess(sheets);
                        }
                    }
                };
                reader.readAsBinaryString(e.target.files[0]);
            }

            function resetInputFile(elem) {
                var inputAttr = [],
                    len = elem.attributes.length,
                    newInput, parentNode,
                    inputElemObj = $(elem);

                parentNode = inputElemObj.parent();
                for (var i = 0; i < len; i++) {
                    inputAttr.push(elem.attributes[i].name + '="' + elem.attributes[i].value + '"');
                }
                newInput = $('<input ' + inputAttr.join(' ') + '/>');
                newInput.on('change', onInputChange);
                inputElemObj.remove();
                parentNode.append(newInput);
            }
        }

    }
    /* @ngInject */
    function directiveController() {

    }
})();
