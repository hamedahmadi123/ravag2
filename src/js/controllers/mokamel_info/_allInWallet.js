app.controller('allInWallet', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.name = [];
    var skip = -15;
    var take = 15;
    var objects = 0;
    var isem = false;
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
                console.log($scope.class);
            }
        );
    $scope.filterByClass = function ($majorId) {
        alert($majorId);
        if (!$majorId) {
            skip = -15;
            take = 15;
            objects = 0;
            isem = false;
            $scope.load2();
        } else {
            $scope.name = [];
            skip = -15;
            take = 15;
            objects = 0;
            isem = false;
            if ($majorId == null) {

            } else {
                if (isem)
                    return;

                skip += take;
                for (var i = 1; i <= take; i++) {
                    $scope.name.push({order_id: "-1" + $scope.name.length});
                }
                var msg = {
                    ViewName: "SelectAllWallet",
                    parameters: [{key: "%schoolid", value: localStorage.schoolId}],
                    mutualTransaction: {
                        Columns: [],
                        kendoDataRequest: {
                            filter: {
                                field: "majorbaseid", logic: "and", operator: "eq", value: $majorId + ""
                            },
                            skip: skip,
                            take: take,
                            Sort: [{field: "cheque_date", dir: "DESC"}]
                        }
                    },
                };
                $http.post(URL_GET, JSON.stringify(msg))
                    .success(function (result, status, headers, config) {
                        if (result.data.length === 0) {
                            isem = true;

                        }
                        result.data.forEach(function (element) {
                            $scope.name[objects] = element;
                            objects++;
                        });
                        $scope.name.length = objects;

                    });
            }
        }
    }
    $scope.load2 = function () {
        if (isem)
            return;

        skip += take;
        for (var i = 1; i <= take; i++) {
            $scope.name.push({order_id: "-1" + $scope.name.length});
        }
        var msg = {
            ViewName: "SelectAllWallet",
            parameters: [{key: "%schoolid", value: localStorage.schoolId}],
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "", logic: "", operator: "", value: "",
                    },
                    skip: skip,
                    take: take,
                    Sort: [{field: "cheque_date", dir: "DESC"}]
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(msg))
            .success(function (result, status, headers, config) {
                console.log(result.data);
                if (result.data.length === 0) {
                    isem = true;
                }
                result.data.forEach(function (element) {
                    $scope.name[objects] = element;
                    objects++;
                });
                $scope.name.length = objects;

            });

    };


    $scope.retdata = function ($data) {
        return moment($data, 'YYYY-M-D').format('jYYYY-jM-jD');
    }

    $scope.selectWallet = function ($id) {
        var stu = {
            ViewName: "SelectWallet",
            parameters: [{key: "%wallet_id", value: $id}],
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "",
                        logic: "",
                        operator: "",
                        value: ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(stu))
            .success(function (result, status, headers, config) {
                $scope.wal = result.data[0];
                console.log($scope.wal);
                if ($scope.wal.pay_type == "0") {
                    $scope.paytype = '0';
                } else {
                    $scope.paytype = '1';
                    var ceq = {
                        ViewName: "SelectChequeWallet",
                        parameters: [{key: "%wallet_id", value: $id}],
                        mutualTransaction: {
                            kendoDataRequest: {
                                filter: {
                                    field: "",
                                    logic: "",
                                    operator: "",
                                    value: ""
                                },
                            }
                        }
                    }
                    $http.post(URL_GET, JSON.stringify(ceq))
                        .success(function (result, status, headers, config) {
                            $scope.chqwal = result.data;
                            console.log($scope.chqwal);

                        });
                }
            });
    }
    $scope.showBedehi = function($walid){
        if(!$scope.payqest || $scope.payqest.length == 0)
        {
            var msg = {
                ViewName: "SelectPaywallet",
                parameters: [{key: "%wallet_id", value:$walid+''}],
                mutualTransaction: {
                    Columns: [],
                    kendoDataRequest: {
                        filter: {
                            field: "", logic: "", operator: "", value: "",
                        },
                    }
                },
            };
            $http.post(URL_GET, JSON.stringify(msg))
                .success(function (result, status, headers, config) {
                    $scope.payqest = result.data;
                });
        }

    }
    $scope.bedehi = function ($walid, $total) {
        try {
            for (var i = 0; i < $scope.chqwal.length; i++) {
                if ($scope.chqwal[i].wallet_id == $walid) {
                    return (parseInt($total) - parseInt($scope.chqwal[i].amount)).toString();
                }
            }
        } catch (e) {

        }
    }
    $scope.payBedehi = function ($walid, $total) {
        try {
            for (var i = 0; i < $scope.chqwal.length; i++) {
                if ($scope.chqwal[i].wallet_id == $walid) {
                    return $scope.chqwal[i].amount.toString();
                }
            }
        } catch (e) {

        }
    }
    $scope.deleteDis = function ($id) {
        var del_Item = {
            ViewName: "DeleteWallet",
            parameters: [
                {key: "%wallet_id", value: $id + ''},
            ]
        };
        var j = confirm("آیا برای حذف کامل این تراکنش با شناسه " + $id + " اطمینان دارید ؟ در صورت حذف هرگونه چک یا بدهی در زیر شاخه این تراکنش نیز حذف میگردد.");
        if (j === true) {
            $http.post(URL_INSERT, JSON.stringify(del_Item))
                .success(function (result, status, headers, config) {
                    document.location.reload();
                }).error(function (result, status, header, config) {
                alert("حذف با خطا مواجه شد.");
                document.location.reload();
            });
        }
    }
}
])
;