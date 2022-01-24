app.controller('classWallet', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.allWallet = [];
    $scope.studentClass = [];

    var cls = {
        ViewName: "ClassSelect",
        mutualTransaction: {
            kendoDataRequest: {
                filter: {
                    field: "schoolid",
                    logic: "and",
                    operator: "eq",
                    value: localStorage.schoolId + ''
                },
            }
        }
    }
    $http.post(URL_GET, JSON.stringify(cls))
        .success(function (result, status, headers, config) {
                $scope.class = result.data;
            }
        );
    var filter = {
        ViewName: "FilterSalTahily",
        parameters: [{key: "%schoolid", value: localStorage.schoolId}],
        mutualTransaction: {
            Columns: [],
            kendoDataRequest: {
                filter: {
                    field: "", logic: "", operator: "", value: "",
                },
            }
        },
    };
    $http.post(URL_GET, JSON.stringify(filter))
        .success(function (result, status, headers, config) {
            $scope.filter = result.data;
        });
    $scope.submitClass = function ($id, $mjrid) {
        if ($id) {
            var msg = {
                ViewName: "SelectStudentInClass",
                mutualTransaction: {
                    Columns: [],
                    kendoDataRequest: {
                        filter: {
                            field: "classid", logic: "and", operator: "eq", value: $id + ""
                            , filters: [
                                {field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId},
                                {field: "isactive", logic: "and", operator: "eq", value: "1"}]

                        },
                        skip: 0,
                        take: 100,
                        Sort: [{field: "studentid", dir: "DESC"}]
                    }
                },
            };
            $http.post(URL_GET, JSON.stringify(msg))
                .success(function (result, status, headers, config) {
                    $scope.studentClass = result.data;
                    var msg = {
                        ViewName: "SelectStWallet",
                        parameters: [{key: "%schoolid", value: localStorage.schoolId}],
                        mutualTransaction: {
                            Columns: [],
                            kendoDataRequest: {
                                filter: {
                                    field: "majorbaseid", logic: "and", operator: "eq", value: $mjrid + "",
                                },
                                skip: 0,
                                take: 1000,
                                Sort: [{field: "cheque_date", dir: "DESC"}]
                            }
                        },
                    };
                    $http.post(URL_GET, JSON.stringify(msg))
                        .success(function (result, status, headers, config) {
                            $scope.allWallet = result.data;

                        });
                });
        } else {
            $scope.allWallet = [];
            $scope.studentClass = [];
        }

    }
    $scope.retBedhi = function ($stid,$sal) {
        var bedhi = 0;
        for (var i = 0; i < $scope.allWallet.length; i++) {
            if ($scope.allWallet[i].student_id == $stid) {
                if($scope.allWallet[i].pay_type == '2' && $scope.allWallet[i].sal_tahsily == $sal)
                {
                    bedhi += (parseFloat($scope.allWallet[i].total_amount)) - (parseFloat($scope.allWallet[i].amount));
                }
            }
        }
        return bedhi;
    }
    $scope.retPay = function ($stid,$sal) {
        var pay = 0;
        for (var i = 0; i < $scope.allWallet.length; i++) {
            if ($scope.allWallet[i].student_id == $stid) {
                if($scope.allWallet[i].pay_type != '2' && $scope.allWallet[i].sal_tahsily == $sal)
                {
                    pay += (parseFloat($scope.allWallet[i].total_amount));
                }
            }
        }
        return pay;
    }
}
])
;