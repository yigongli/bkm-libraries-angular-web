(function () {
    'use strict';
    angular.module('bkm.library.angular.web')
        .constant('treeSetting', {
            data: {
                key: {
                    checked: 'checked',
                    children: 'children',
                    name: 'name',
                    title: 'name'
                },
                simpleData: {
                    enable: true
                }
            },
            view: {
                selectedMulti: true,
                showIcon: true,
                showLine: true,
                nameIsHTML: false,
                fontCss: {}

            },
            check: {
                enable: false,
            },
            async: {
                enable: false
            }
        })
        .directive('bkmTree', ['treeSetting', bkmTree])
        .directive('bkmInputTreeAddress', ['$compile', '$timeout',inputTree])
        .service('bkm.zTree.Data', ['$window', 'abp.services.app.region', '$q', bkmZtreeData])
        .controller('bkmInputTreeAddressCtrl', [
            '$timeout',
            'bkm.zTree.Data',
            bkmInputTreeAddressCtrl
        ]);

    var treeTemplate =
          '<div class="tree-address">\
                <div temp></div>\
                <span data-bkm-address class="icon glyphicon glyphicon-list" ng-click="dCtrl.showMenu($event)"></span>\
                <div class="ztree-box" ng-show="dCtrl.show"> \
                   <div class="ztree-box-container">\
                     <div class="ztree-btn-clean">\
                        <a data-bkm-address href="javascript:void(0);" ng-click="dCtrl.clearInput($event);">清空输入</a>\
                        &nbsp;&nbsp;&nbsp;&nbsp;\
                        <a data-bkm-address href="javascript:void(0);" ng-click="$event.stopPropagation(); dCtrl.show=false">关闭</a>\
                      </div>\
                      <ul bkm-tree="dCtrl.setting" class="ztree"></ul>\
                   </div>\
                </div>\
            </div>';

    function bkmZtreeData($window, regionAipService, $q) {
        var self = this;
        self.getData = function (parentId) {
            var deferred = $q.defer(),
                key = parentId || "root",
                data;
            data = $window.localStorage["addressData"];
            if (!!!data) {
                data = {};
                $window.localStorage["addressData"] = "";
            } else {
                data = JSON.parse(data);
                if (!!data[key]) {
                    return $q.resolve(data[key]);
                }
            }

            regionAipService.getAll({
                "parentId": parentId,
                "sorting": "code",
                "skipCount": 0,
                "maxResultCount": 999
            }).then(function (result) {
                data[key] = result.data.items;
                $window.localStorage["addressData"] = JSON.stringify(data);
                deferred.resolve(data[key]);
            }).catch(function (result) {
                deferred.reject();
            });
            return deferred.promise;
        }
    }

    function bkmTree(treeSetting) {
        return {
            restrict: 'A',
            scope: {
                setting: '=bkmTree'
            },
            controller: function () {
            },
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.setting.treeInstance = null;
                //清除选中节点的选中状态
                $scope.setting.cleanSelectedNodes = function () {
                    if (!!!$scope.setting.treeInstance) return;
                    var nodes = $scope.setting.treeInstance.getSelectedNodes();
                    angular.forEach(nodes, function (v, i) {
                        $scope.setting.treeInstance.cancelSelectedNode(v);
                    });
                }

                //当子节点被选中时，将所有父节点设置为选中状态
                $scope.setting.selectParenNode = function (treeNode) {
                    if (!!!$scope.setting.treeInstance) return;
                    $scope.setting.treeInstance.selectNode(treeNode, true);
                    var p = treeNode.getParentNode();
                    if (p) {
                        $scope.setting.selectParenNode(p);
                    }
                };

                //展开节点下的所有了节点
                function expandNode(node) {
                    if (!!!$scope.setting.treeInstance || !!!node) return;
                    $scope.setting.treeInstance.expandNode(node, true);
                    var c = node.children;
                    angular.forEach(c, function (v, i) {
                        expandNode(v);
                    });
                }

                $scope.setting.setNodes = function (nodes) {
                    $scope.setting.treeInstance = $.fn.zTree.init(iElm, $scope.setting, nodes);
                };

                //深度合并
                angular.forEach(treeSetting, function (v, i) {
                    var t = angular.extend({}, v);
                    if (!!!$scope.setting[i]) {
                        $scope.setting[i] = t;
                    } else {
                        angular.extend($scope.setting[i], t);
                    }
                });

                if ($scope.setting.nodes && $scope.setting.nodes.length) {
                    $scope.setting.treeInstance = $.fn.zTree.init(iElm, $scope.setting, $scope.setting.nodes);
                }

                //节点数据初始化回调
                $scope.setting.setNodesDataSource();
            }
        };
    }

    function bkmInputTreeAddressCtrl($timeout, treeDataService) {
        var ctrl = this;
        ctrl.show = false;
        ctrl.ngModel = null;
        ctrl.opt = {};
        ctrl.setting = {
            check: {
                chkStyle: "radio",
                radioType: "all"
            },
            view: {
                dblClickExpand: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                //【节点】点击事件
                beforeClick: beforeClick,
                //【节点】点击事件
                onClick: onClick,
                beforeExpand: beforeExpand
            },
            setNodesDataSource: setNodesDataSource
        };

        function beforeExpand(treeId, treeNode) {
            return beforeExpandFn(treeDataService, treeNode, ctrl.setting.treeInstance, ctrl.opt.chooseLevel);
        }

        //【节点】点击事件
        function beforeClick(treeId, treeNode) {
            if (!!ctrl.opt.chooseLevel && ctrl.opt.chooseLevel >= 0) {
                return treeNode && treeNode.level == ctrl.opt.chooseLevel;
            }
            return true;
        }

        //【节点】点击事件
        function onClick(e, treeId, treeNode) {
            setValue([], [], treeNode);
            ctrl.setting.selectParenNode(treeNode);
            $timeout(function () {
                ctrl.show = false;
            }, 0);
        }
        //将上次展开的节点收起来
        ctrl.showMenu = function (e) {
            e.stopPropagation();
            ctrl.setting.cleanSelectedNodes();
            ctrl.setting.treeInstance.expandAll(false);
            setTimeout(function () {
                angular.element('.ztree').scrollTop(0);
            }, 0);
            ctrl.show = true;
        };

        ctrl.clearInput = function (e) {
            e.stopPropagation();
            if (!!ctrl.ngModel) {
                ctrl.ngModel.$setViewValue("");
                ctrl.ngModel.$modelValue = "";
                ctrl.ngModel.$render();
            }
        }

        function setValue(nodeNames, modelValues, node) {
            nodeNames.unshift(node.name);
            modelValues.unshift(node.data);
            var p = node.getParentNode();
            if (p) {
                setValue(nodeNames, modelValues, p);
            } else {
                ctrl.ngModel.$setViewValue({
                    text: nodeNames,
                    val: {
                        province: modelValues[0],
                        city: modelValues[1],
                        district: modelValues[2]
                    }
                });
                ctrl.ngModel.$render();
            }
        }

        //初始化数据回调函数
        function setNodesDataSource() {
            //初始化省市区数据
            treeDataService
                .getData('')
                .then(function (data) {
                    var newNode = convertData(data, 0 < ctrl.opt.chooseLevel);
                    ctrl.setting.setNodes(newNode);
                })
                .catch(function () {
                    console.log('get tree data error');
                });
        }

        function convertData(data, isParent) {
            angular.forEach(data, function (v, i) {
                v.data = angular.extend({}, v);
                v.pId = v.parentId;
                v.isParent = isParent;
                if (ctrl.showFullName) {
                    v.name = v.fullName;
                }
            });
            return data;
        }

        function beforeExpandFn(treeDataSvc, treeNode, treeInstance, chooseLevel) {
            if (!!!treeNode.children || !!!treeNode.children.length) {
                treeDataSvc.getData(treeNode.id)
                    .then(function (data) {
                        var newNode = convertData(data, treeNode.level + 1 < chooseLevel);
                        treeInstance.addNodes(treeNode, newNode);
                    })
                    .catch(function () {
                        console.log('get tree data error');
                    });

            } else {
                treeInstance.expandNode(treeNode, true, false, null);
            }
            return false;
        }

        
    }

    function inputTree($compile, $timeout) {
        
        return {
            restrict: 'EA',
            require: "ngModel",
            controller: 'bkmInputTreeAddressCtrl',
            controllerAs: 'dCtrl',
            scope: {},
            link: function (scope, elem, attr, ngModel) {
                elem.attr("readonly", true);
                angular.extend(scope.dCtrl.opt, { chooseLevel: attr.chooseLevel, showFullName: attr.showFullName });
                scope.dCtrl.ngModel = ngModel;
                scope.dCtrl.showFullName = !!attr.showFullName && attr.showFullName.toLowerCase() === 'true';
                var el = angular.element(treeTemplate);
                //如果不为 ztree 设置id,则同一个页面有多个 atree 时，将会是同一个实例
                el.find('.ztree').attr("id", newGuid());
                var temp = $compile(el)(scope);
                elem.after(temp);
                elem.appendTo(temp.find('div[temp]'));

                scope.dCtrl.ngModel.$parsers.push(function (value) {
                    //从 view -> model 的转换
                    if (!!value && angular.isArray(value.text)) {
                        ngModel.$viewValue = value.text.slice(1).join('');
                    } else {
                        ngModel.$viewValue = value;
                    }
                    return value.val;
                });

                scope.dCtrl.ngModel.$formatters.push(function (value) {
                    //从 model -> view 的转换
                    if (!!value) {
                        var text = [];
                        if (!!value.province) {
                            text.push(value.province.name);
                        }
                        if (!!value.city) {
                            text.push(value.city.name);
                        }
                        if (!!value.district) {
                            text.push(value.district.name);
                        }
                        return text.join('');
                    }
                    return value;
                });

                //点击除树窗口区域外的地方，响应click事件关闭树窗口
                angular.element(document).on('click', function (e) {
                    if (e.target.hasAttribute("data-bkm-address")) {
                        return;
                    } else {
                        $timeout(function () {
                            scope.dCtrl.show = false;
                        }, 0);
                    }
                });
                //在当前树窗口区域内点击时，将事件阻止掉，避免向父元素传递click事件
                el.find("ul.ztree").on("click", function (e) {
                    e.stopPropagation();
                });

                
            }
        };
    }


    function newGuid() {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                guid += "-";
        }
        return guid;
    }

    

   

    



})();



/*

 bkm-input-tree-address：指令名称
 -----------------------------------------------------------------------
 choose-level="number"： 设置指令可选择的层级，如果没有设置，则所有层级都可选择
 例如：如果设置为 2，则可选择的层级是第 2 层，其他层级则不可选择
 -----------------------------------------------------------------------
 show-full-name="false"：设置省市区显示的名称是【简称】还是【全称】；false:【简称】,true:【全称】
 -----------------------------------------------------------------------
 指令的使用如下：
 <input class="form-control" bkm-input-tree-address choose-level="2" show-full-name="false" ng-model="ctrl.tree"  />
 获取选择的省市区对象示例：
 <button ng-click="ctrl.getTreeResult();">test</button>

 //初始化 ng-model,数据结果如下：
 ctrl.tree = {
 province: {},
 city: {},
 district: {}
 };

 //当选择省市区后，就可以直接获取到 ng-model 对象
 ctrl.getTreeResult = function () {
 console.log(ctrl.tree);
 }

 */
