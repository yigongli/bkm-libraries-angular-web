/**
 * Created by gurihui on 2016/11/30.
 */
(function () {
    'use strict';

    angular.module('bkm.theme')
        .service('bkmWebApiService', bkmWebApiService);

    /** @ngInject */
    function bkmWebApiService(bkmApiService, webApiUrl) {
        var self = this;

        self.getSalesReport = function (data, successFn, errorFn) {
            bkmApiService.get(webApiUrl.getSalesReport, data, successFn, errorFn);
        };

        self.getPriceList = function (data, successFn, errorFn) {
            bkmApiService.get(webApiUrl.getPriceList, data, successFn, errorFn);
        };

        self.deletePrice = function (data, successFn, errorFn) {
            bkmApiService.get(webApiUrl.deletePrice, data, successFn, errorFn);
        };

        self.importFile = function (formData, successFn, errorFn) {
            bkmApiService.uploadFile(webApiUrl.importPriceData, formData, successFn, errorFn);
        };

        self.getSettlementList = function (data, successFn, errorFn) {
            bkmApiService.get(webApiUrl.getSettlementList, data, successFn, errorFn);
        }

        self.updateSettlement = function (data, successFn, errorFn) {
            bkmApiService.post(webApiUrl.updateSettlement, data, successFn, errorFn);
        };

        self.addSettlement = function (data, successFn, errorFn) {
            bkmApiService.post(webApiUrl.addSettlement, data, successFn, errorFn);
        };

        self.deleteSettlement = function (data, successFn, errorFn) {
            bkmApiService.get(webApiUrl.deleteSettlement, data, successFn, errorFn);
        };

        self.importSalesData = function (formData, successFn, errorFn) {
            bkmApiService.uploadFile(webApiUrl.importSalesData, formData, successFn, errorFn);
        };

        self.deleteSettlementByDate = function (data, successFn, errorFn) {
            bkmApiService.get(webApiUrl.deleteSettlementByDate, data, successFn, errorFn);
        };

        self.batchEditSettlementPriceByIds = function (data, successFn, errorFn) {
            bkmApiService.post(webApiUrl.batchEditSettlementPriceByIds, data, successFn, errorFn);
        };

        self.getReportByCoalQuality = function (data, successFn, errorFn) {
            bkmApiService.get(webApiUrl.getReportByCoalQuality, data, successFn, errorFn);
        };

        self.getCoalQualityReportList = function (data, successFn, errorFn) {
            bkmApiService.get(webApiUrl.getCoalQualityReportList, data, successFn, errorFn);
        };

        self.getReportBySupplier = function(data, successFn, errorFn) {
            bkmApiService.get(webApiUrl.getReportBySupplier, data, successFn, errorFn);
        };

        self.getSupplierReportList = function(data, successFn, errorFn) {
            bkmApiService.get(webApiUrl.getSupplierReportList, data, successFn, errorFn);
        };
    }
})();