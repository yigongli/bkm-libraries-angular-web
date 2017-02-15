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
                fontCss: {

                }

            },
            check: {
                enable: true
            },
            async: {
                enable: true,
                autoParam: ["id"],
                contentType: "application/json",
                type: 'post'
            }


        })
        .directive('bkmTree', function (treeSetting, $http) {

            var zTreeObj;

            return {
                restrict: 'A',
                scope: {
                    setting: '=bkmTree',
                    setNodes: '&',
                    distinctLevel: '@?'
                },

                link: function ($scope, iElm, iAttrs, controller) {

                    var parentNodeChecked = null;
                    var distinctLevel = parseInt($scope.distinctLevel);

                    $scope.setting.getRawNodesChecked = function () {
                        return zTreeObj.getCheckedNodes(true);
                    };

                    $scope.setting.clearChecked = function () {

                        zTreeObj.checkAllNodes(false);

                    }

                    $scope.setting.justCheckWithinSameParent = function (treeId, treeNode) {

                        if (treeNode.checked) {
                            if ($scope.setting.getRawNodesChecked().length == 0) {
                                parentNodeChecked = null;
                            }
                            return true;
                        }

                        if (treeNode.level > distinctLevel) {

                            if (!parentNodeChecked) {
                                parentNodeChecked = treeNode.getParentNode();

                                return true;

                            }

                            if (parentNodeChecked != treeNode.getParentNode()) {
                                $scope.setting.clearChecked();
                                parentNodeChecked = treeNode.getParentNode();
                            }



                            return true;

                        } else if (treeNode.level == distinctLevel) {
                            if (parentNodeChecked) {
                                $scope.setting.clearChecked();

                            }
                            parentNodeChecked = treeNode.getParentNode();
                            return true;


                        }

                        return false;

                    }

                    $scope.setting.getNodesChecked = function (includingParent) {
                        var nodes = [];

                        zTreeObj.getCheckedNodes(true).forEach(function (node, index) {
                            if (includingParent == undefined || includingParent == false) {
                                if (!node.isParent) {
                                    nodes.push({
                                        id: node.id,
                                        name: node.name,
                                        level: node.level
                                    });
                                }

                            } else {
                                nodes.push({
                                    id: node.id,
                                    name: node.name,
                                    level: node.level
                                });
                            }

                        });

                        return nodes;
                    };



                    $scope.setting.getNamesOfNodesChecked = function (includingParent) {
                        var names = [];
                        zTreeObj.getCheckedNodes(true).forEach(function (node, index) {
                            if (includingParent == undefined || includingParent == false) {
                                if (!node.isParent) {
                                    names.push(node.name);
                                }

                            } else {
                                names.push(node.name);
                            }

                        });

                        return names;
                    };

                    $scope.setting.getIdsOfNodesChecked = function (includingParent) {
                        var ids = [];
                        zTreeObj.getCheckedNodes(true).forEach(function (node, index) {
                            if (includingParent == undefined || includingParent == false) {
                                if (!node.isParent) {
                                    ids.push(node.id);
                                }

                            } else {
                                ids.push(node.id);
                            }

                        });

                        return ids;
                    }


                    angular.extend(treeSetting, $scope.setting);

                    //$scope.setNodes()(function (nodes) {
                    //    if (nodes) {
                    //        zTreeObj = $.fn.zTree.init(iElm, treeSetting, nodes);
                    //    }
                    //});

                    $scope.setting.initNodes = function (nodes) {
                        zTreeObj = $.fn.zTree.init(iElm, treeSetting, nodes);
                    };

                }
            };
        })
    .directive('bkmInputTree', inputTree).
    controller('bkmInputTreeCtrl', bkmInputTreeCtrl);

    function bkmInputTreeCtrl() {
        var ctrl = this;

        var setting = {
            view: {
                dblClickExpand: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                beforeClick: beforeClick,
                onClick: onClick
            }
        };

        var zNodes = [
            { id: 1, pId: 0, name: "北京" },
            { id: 2, pId: 0, name: "天津" },
            { id: 3, pId: 0, name: "上海" },
            { id: 6, pId: 0, name: "重庆" },
            { id: 4, pId: 0, name: "河北省", open: true },
            { id: 41, pId: 4, name: "石家庄" },
            { id: 42, pId: 4, name: "保定" },
            { id: 43, pId: 4, name: "邯郸" },
            { id: 44, pId: 4, name: "承德" },
            { id: 5, pId: 0, name: "广东省", open: true },
            { id: 51, pId: 5, name: "广州" },
            { id: 52, pId: 5, name: "深圳" },
            { id: 53, pId: 5, name: "东莞" },
            { id: 54, pId: 5, name: "佛山" },
            { id: 6, pId: 0, name: "福建省", open: true },
            { id: 61, pId: 6, name: "福州" },
            { id: 62, pId: 6, name: "厦门" },
            { id: 63, pId: 6, name: "泉州" },
            { id: 64, pId: 6, name: "三明" }
        ];

        function beforeClick(treeId, treeNode) {
            var check = (treeNode && !treeNode.isParent);
            if (!check) alert("只能选择城市...");
            return check;
        }

        function onClick(e, treeId, treeNode) {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
            nodes = zTree.getSelectedNodes(),
            v = "";
            nodes.sort(function compare(a, b) { return a.id - b.id; });
            for (var i = 0, l = nodes.length; i < l; i++) {
                v += nodes[i].name + ",";
            }
            if (v.length > 0) v = v.substring(0, v.length - 1);
            var cityObj = $("#citySel");
            cityObj.attr("value", v);
        }

        this.showMenu = function () {
            var cityObj = $("#citySel");
            var cityOffset = $("#citySel").offset();
            $("#menuContent").css({ left: cityOffset.left + "px", top: cityOffset.top + cityObj.outerHeight() + "px" }).slideDown("fast");

            $("body").bind("mousedown", onBodyDown);
        };

        function hideMenu() {
            $("#menuContent").fadeOut("fast");
            $("body").unbind("mousedown", onBodyDown);
        }
        function onBodyDown(event) {
            if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
                hideMenu();
            }
        }

        $(document).ready(function () {
            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        });
    }

    function inputTree() {
        return {
            restrict: 'EA',
            controller: 'bkmInputTreeCtrl',
            controllerAs: 'ctrl',
            scope: {
                treeData: []
            },
            template: '<div class="bkm-tree"><input id="citySel" type="text" readonly value="" style="width:120px;" /><a id="menuBtn" href="#" ng-click="ctrl.showMenu(); return false;">选择</a><bkm-tree></bkm-tree></div>',
            link: function (scope, elem, attr) {

            }
        };
    }
})();
