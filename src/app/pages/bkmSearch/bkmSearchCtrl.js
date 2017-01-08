/**
 * Created by gurihui on 2016/12/30.
 */
(function () {
    'use strict';

    var coalQualities = [
        {id: '炭', name: '炭', type: '贫瘦煤'},
        {id: '二炭', name: '二炭', type: '贫瘦煤'},
        {id: '三炭', name: '三炭', type: '贫瘦煤'},
        {id: '四炭', name: '四炭', type: '贫瘦煤'},
        {id: '矸石', name: '矸石', type: '贫瘦煤'},
        {id: '混块', name: '混块', type: '贫瘦煤'},
        {id: '混煤', name: '混煤', type: '贫瘦煤'},
        {id: '精煤', name: '精煤', type: '贫瘦煤'},
        {id: '块炭', name: '块炭', type: '贫瘦煤'},
        {id: '煤', name: '煤', type: '无烟煤3号'},
        {id: '煤（15#）', name: '煤（15#）', type: '无烟煤3号'},
        {id: '煤（常顺）', name: '煤（常顺）', type: '无烟煤3号'},
        {id: '煤2#', name: '煤2#', type: '无烟煤3号'},
        {id: '煤泥', name: '煤泥', type: '无烟煤3号'},
        {id: '原煤', name: '原煤', type: '无烟煤3号'},
        {id: '中煤', name: '中煤', type: '无烟煤3号'},
        {id: '籽煤', name: '籽煤', type: '无烟煤3号'},
        {id: '末煤', name: '末煤', type: '无烟煤3号'},
        {id: '筛末煤', name: '筛末煤', type: '无烟煤3号'},
        {id: '末煤（1#）', name: '末煤（1#）', type: '无烟煤3号'},
        {id: '末煤（2#）', name: '末煤（2#）', type: '无烟煤3号'},
        {id: '大块', name: '大块', type: '无烟煤3号'},
        {id: '中块', name: '中块', type: '无烟煤3号'},
        {id: '小块', name: '小块', type: '无烟煤3号'},
        {id: '洗大块', name: '洗大块', type: '无烟煤3号'},
        {id: '洗末煤', name: '洗末煤', type: '无烟煤3号'}
    ];

    var coalType = [
        {id: '贫瘦煤', name: '贫瘦煤'},
        {id: '无烟煤3号', name: '无烟煤3号'}
    ];

    angular.module('bkm.pages.bkmSearch')
        .controller('bkmSearchCtrl', bkmSearchCtrl)
        .controller('ImportPriceCtrl', ImportPriceCtrl);

    /** @ngInject */
    function bkmSearchCtrl(bkmSearchService, $state, $uibModal, toastr, $scope, $q, $filter) {
        var ctrl = this;

        //页面查询参数
        this.params = {
            search: {
                supplier: '',
                coalType: '',
                coalQuality: '',
                beginDate: '',
                endDate: ''
            },
            sort: {
                predicate: ""
            }
        }

        this.models = [];

        this.searchOption = {
            items: [
                {
                    type: 'text',
                    model: 'supplier',
                    label: '供应商',
                    placeholder: '供应商'
                },
                {
                    type: 'dropDown',
                    model: 'coalType',
                    label: '煤种',
                    placeholder: '',
                    parentModel: '',
                    keyName: 'id',
                    valName: 'name',
                    dataSource: coalType
                },
                {
                    type: 'dropDown',
                    model: 'coalQuality',
                    label: '煤品',
                    placeholder: '',
                    parent: {
                        model: 'coalType',
                        onChange: function (parentVal) {
                            var deferred = $q.defer();
                            var filtered = $filter('filter')(coalQualities, {type: parentVal});
                            deferred.resolve(filtered);
                            return deferred.promise;
                        }
                    },
                    keyName: 'id',
                    valName: 'name',
                    dataSource: []
                },
                {
                    type: 'beginDateAndEndDate',
                    beginDate: {
                        model: 'beginDate',
                        label: '开始日期',
                        placeholder: '开始日期'
                    },
                    endDate: {
                        model: 'endDate',
                        label: '结束日期',
                        placeholder: '结束日期'
                    }
                }
            ],
            buttons: [
                {
                    type:'button',
                    text: '搜索',
                    className: 'btn btn-primary',
                    icon: 'ion-search',
                    click: searchData
                },
                {
                    type:'button',
                    text: '全同步导入',
                    className: 'btn btn-primary',
                    icon: 'ion-reply',
                    click: importData
                }
            ]
        };

        //grid 配置
        ctrl.gridApi = {};
        ctrl.gridOption = {
            enableColumnResizing: true,
            //选择
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            useExternalPagination: true,
            paginationPageSize: 20,
            paginationPageSizes: [20, 50, 100],
            enableColumnMenus: false,
            columnDefs: [
                {name: "date", displayName: "生效日期", cellFilter: "date:'yyyy-MM-dd'"},
                {name: "supplier", displayName: "供应商"},
                {name: "coalType", displayName: "煤种"},
                {name: "coalQuality", displayName: "煤品"},
                {name: "priceType", displayName: "价格类型"},
                {name: "salesPrice", displayName: "价格(元/吨)", cellFilter: "currency:'￥'"}],
            onRegisterApi: function (gridApi) {
                ctrl.gridApi = gridApi;
                searchData();
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    searchData();
                });
            }
        };

        //查询数据
        function searchData(search) {
            if (!!search) {
                setSearchParam(search);
            }

            ctrl.params.search.priceEnum = $state.current.type;
            bkmSearchService.getData(ctrl.gridApi.pagination.getPage() - 1, ctrl.gridOption.paginationPageSize, ctrl.params)
                .then(function (result) {
                    if (result.success) {
                        ctrl.models = result.results;
                    } else {
                        ctrl.models = [];
                    }
                    ctrl.gridOption.data = ctrl.models;
                    ctrl.gridOption.totalItems = result.recordCount;
                }, function () {
                    ctrl.models = [];
                });
        };

        function setSearchParam(search) {
            angular.extend(ctrl.params.search, search);
            ctrl.params.search.beginDate = '';
            ctrl.params.search.endDate = '';
            if (!!search.beginDate) {
                ctrl.params.search.beginDate = search.beginDate.Format("yyyy-MM-dd");
            }
            if (!!search.endDate) {
                ctrl.params.search.endDate = search.endDate.Format("yyyy-MM-dd");
            }
        }

        function importData() {
            ctrl.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/bkmSearch/template/modalTemp.html',
                size: 'lg',
                controller: 'ImportPriceCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    content: function () {
                        return {
                            priceType: '',
                            includeUrl: 'app/pages/bkmSearch/template/importDateTemp.html'
                        };
                    }
                }
            });
            ctrl.modalInstance.result.then(function (result) {
                if (result.success) {
                    ctrl.params.search = {
                        supplier: '',
                        coalType: '',
                        coalQuality: '',
                        beginDate: '',
                        endDate: ''
                    };
                    searchData();
                }
            }, null);
        };
    }

    function ImportPriceCtrl($uibModalInstance, $state, content, bkmSearchService, toastr) {
        var $ctrl = this;
        this.title = "价格导入";
        this.includeUrl = content.includeUrl;
        this.ok = function ok() {
            var fd = new FormData();
            fd.append('priceEnum', $state.current.type);
            var files = document.querySelector('input[type=file]').files;
            var len = files.length, i = 0;
            for (i; i < len; i++) {
                fd.append('file' + i, files[i]);
            }
            bkmSearchService.importFile(fd).then(function (result) {
                if (result.success) {
                    $uibModalInstance.close(result);
                    toastr.success('导入成功');
                } else {
                    toastr.error('导入失败');
                }
            }, function (result) {
                toastr.error('导入失败');
            });
        };

        $ctrl.cancel = function cancel() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
