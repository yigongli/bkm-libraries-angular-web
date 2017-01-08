/**
 * Created by gurihui on 2016/11/30.
 */
(function () {
    'use strict';

    //dev
    var demain = '/web';
    var loginPath = '/auth.html';
    angular.module('bkm.theme')
        .constant('webApiUrl', {
            demain:demain,
            loginPath: loginPath,
            getSalesReport: demain + '/api/Settlement/GetReport',
            //价格管理
            getPriceList: demain + '/api/Price/List',
            updatePrice: demain + '/api/Price/Update',
            deletePrice: demain + '/api/Price/Delete',
            addPrice: demain + '/api/Price/Add',
            importPriceData: demain + '/api/Price/Import',
            //结算管理
            getSettlementList: demain + '/api/Settlement/List',
            updateSettlement: demain + '/api/Settlement/Update',
            deleteSettlement: demain + '/api/Settlement/Delete',
            importSalesData: demain + '/api/Settlement/Import',
            deleteSettlementByDate: demain + '/api/Settlement/deleteByDate',
            batchEditSettlementPriceByIds: demain + '/api/Settlement/BatchEditSettlementPriceByIds',
            getReportByCoalQuality:demain+'/api/Settlement/GetReportByCoalQuality',
            excportCoalQualityReport:demain+'/api/Settlement/excportCoalQualityReport',
            getCoalQualityReportList:demain+'/api/Settlement/GetCoalQualityReportList',
            getReportBySupplier:demain+'/api/Settlement/GetReportBySupplier',
            excportSupplierReport:demain+'/api/Settlement/ExcportSupplierReport',
            getSupplierReportList:demain+'/api/Settlement/GetSupplierReportList',
        });
})();
