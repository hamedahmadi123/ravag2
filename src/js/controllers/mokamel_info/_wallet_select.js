app.controller('wallet_select', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.tmp_st_id = "";
    $scope.tmp_st_name = "";
    //var
    $scope.st_id = "";

    $scope.st_name = "";

    $scope.title = "";
    var now = moment().format('jYYYY');
    var last_year1 = moment(now, "YYYY-MM-DD").add(-1, 'year').format('YYYY');
    $scope.sal_tahsily0 = now + ' - ' + last_year1;

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
            }
        );

    var sta = {
        ViewName: "SelectSumTotal",
        parameters: [
            {key: "%schoolid", value: localStorage.schoolId + ""},
            {key: "%sal_tahsily", value: $scope.sal_tahsily0 + ""},
        ],
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
    $http.post(URL_GET, JSON.stringify(sta))
        .success(function (result, status, headers, config) {
            $scope.sumTotal = result.data[0];

        });

    var scc = {
        ViewName: "SelectCountCheque",
        parameters: [
            {key: "%schoolid", value: localStorage.schoolId + ""},
            {key: "%sal_tahsily", value: $scope.sal_tahsily0 + ""},
        ],
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
    $http.post(URL_GET, JSON.stringify(scc))
        .success(function (result, status, headers, config) {
            $scope.countCheque = result.data[0];
        });
    var ssa = {
        ViewName: "SelectSumAmountCheque",
        parameters: [
            {key: "%schoolid", value: localStorage.schoolId},
            {key: "%sal_tahsily", value: $scope.sal_tahsily0 + ""},
        ],
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
    $http.post(URL_GET, JSON.stringify(ssa))
        .success(function (result, status, headers, config) {
            $scope.SumAmountCheque = result.data[0];
        });
    $scope.filterByClass = function ($classId, $name) {
        if (!$classId) {
            document.getElementById('lblName').innerText = "لیست دانش آموزان";
            skip = -15;
            take = 15;
            objects = 0;
            isem = false;
            $scope.load2();
        } else {
            document.getElementById('lblName').innerText = "لیست دانش آموزان کلاس " + "(" + $name + ")";
            $scope.name = [];
            skip = -15;
            take = 15;
            objects = 0;
            isem = false;
            if ($classId == null) {

            } else {
                if (isem)
                    return;

                skip += take;
                for (var i = 1; i <= take; i++) {
                    $scope.name.push({order_id: "-1" + $scope.name.length});
                }
                var msg = {
                    ViewName: "SelectStudentInClass",
                    mutualTransaction: {
                        Columns: [],
                        kendoDataRequest: {
                            filter: {
                                field: "classid", logic: "and", operator: "eq", value: $classId + ""
                                , filters: [
                                    {field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId},
                                    {field: "isactive", logic: "and", operator: "eq", value: "1"}]

                            },
                            skip: skip,
                            take: take,
                            Sort: [{field: "studentid", dir: "DESC"}]
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
        $scope.name = [];
        skip = -15;
        take = 15;
        objects = 0;
        isem = false;

        var field = "";
        var logic = "";
        var operator = "";
        var value = "";
        if (isem)
            return;

        skip += take;
        for (var i = 1; i <= take; i++) {
            $scope.name.push({order_id: "-1" + $scope.name.length});
        }
        var msg = {
            ViewName: "StudentSelect",
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: field, logic: logic, operator: operator, value: value
                        , filters: [
                            {field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId},
                            {field: "isactive", logic: "and", operator: "eq", value: "1"}]

                    },
                    skip: skip,
                    take: take,
                    Sort: [{field: "studentid", dir: "DESC"}]
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
    $scope.selectTMPSt = function ($id, $name) {
        document.getElementById($id).checked = true;
        $scope.tmp_st_id = $id;
        $scope.tmp_st_name = $name;
    }
    $scope.submitSelect = function () {
        $scope.st_id = $scope.tmp_st_id;
        $scope.st_name = $scope.tmp_st_name;
        var sty = {
            ViewName: "SelectSalTahsily",
            parameters: [{key: "%student_id", value: $scope.st_id}],
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
        $http.post(URL_GET, JSON.stringify(sty))
            .success(function (result, status, headers, config) {
                $scope.saltahsily = result.data;
            });

        var wlt = {
            ViewName: "SelectStundetWallet",
            parameters: [{key: "%student_id", value: $scope.st_id}],
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
        $http.post(URL_GET, JSON.stringify(wlt))
            .success(function (result, status, headers, config) {
                $scope.st_wallet = result.data;
                for (var i = 0; i < $scope.st_wallet.length; i++) {
                    $scope.st_wallet[i].index = i;
                }
            });

        var chc = {
            ViewName: "SelectStudentCheque",
            parameters: [{key: "%student_id", value: $scope.st_id}],
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
        $http.post(URL_GET, JSON.stringify(chc))
            .success(function (result, status, headers, config) {
                $scope.st_cheque = result.data;
            });


        var bedehi = {
            ViewName: "SelectBedehiSt",
            parameters: [{key: "%studentid", value: $scope.st_id}],
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
        $http.post(URL_GET, JSON.stringify(bedehi))
            .success(function (result, status, headers, config) {
                $scope.bedehiSt = result.data[0];
            });

        var chequeSt = {
            ViewName: "SelectSumChequeStudent",
            parameters: [{key: "%student_id", value: $scope.st_id}],
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
        $http.post(URL_GET, JSON.stringify(chequeSt))
            .success(function (result, status, headers, config) {
                $scope.chequeSt = result.data[0];
            });

        var totalSt = {
            ViewName: "SelectSumTotalStudent",
            parameters: [{key: "%student_id", value: $scope.st_id}],
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
        $http.post(URL_GET, JSON.stringify(totalSt))
            .success(function (result, status, headers, config) {
                $scope.totalSt = result.data[0];
                console.log($scope.totalSt);
            });

    }
    $scope.bedehi = function ($walid, $total) {
        try {
            for (var i = 0; i < $scope.st_cheque.length; i++) {
                if ($scope.st_cheque[i].wallet_id == $walid) {
                    return (parseInt($total) - parseInt($scope.st_cheque[i].amount)).toString();
                }
            }
        } catch (e) {

        }
    }
    $scope.payBedehi = function ($walid, $total) {
        try {
            for (var i = 0; i < $scope.st_cheque.length; i++) {
                if ($scope.st_cheque[i].wallet_id == $walid) {
                    return $scope.st_cheque[i].amount.toString();
                }
            }
        } catch (e) {

        }
    }
    $scope.selectAllCheque = function ($num) {
        if ($num == '1') {
            $scope.title = "لیست چک ها";
        } else {
            $scope.title = "لیست دریافتی های نقدی";
        }
        var all_cheque = {
            ViewName: "SelectAllCheque",
            parameters: [
                {key: "%schoolid", value: localStorage.schoolId},
                {key: "%type", value: $num + ''},
            ],
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
        $http.post(URL_GET, JSON.stringify(all_cheque))
            .success(function (result, status, headers, config) {
                $scope.all_cheque = result.data;
                console.log($scope.all_cheque);
                for (var i = 0; i < $scope.all_cheque.length; i++) {
                    $scope.all_cheque[i].show = true;
                }
            });
    }

    $scope.selectAllBedehi = function ($num) {
        var all_bdhi = {
            ViewName: "selectAllBedehi",
            parameters: [
                {key: "%schoolid", value: localStorage.schoolId},
            ],
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
        $http.post(URL_GET, JSON.stringify(all_bdhi))
            .success(function (result, status, headers, config) {
                $scope.all_bedehi = result.data;
                for (var i = 0; i < $scope.all_bedehi.length; i++) {
                    $scope.all_bedehi[i].show = true;
                }
            });
    }
    $scope.filterBySal = function ($id) {
        if ($id) {
            for (var i = 0; i < $scope.all_cheque.length; i++) {
                if ($scope.all_cheque[i].sal_tahsily == $id)
                    $scope.all_cheque[i].show = true;
                else
                    $scope.all_cheque[i].show = false;

            }
        } else {
            for (var i = 0; i < $scope.all_cheque.length; i++) {
                $scope.all_cheque[i].show = true;
            }
        }
    }
    $scope.filterBySal2 = function ($id) {
        if ($id) {
            for (var i = 0; i < $scope.all_bedehi.length; i++) {
                if ($scope.all_bedehi[i].sal_tahsily == $id)
                    $scope.all_bedehi[i].show = true;
                else
                    $scope.all_bedehi[i].show = false;

            }
        } else {
            for (var i = 0; i < $scope.all_bedehi.length; i++) {
                $scope.all_bedehi[i].show = true;
            }
        }
    }
    $scope.retdata = function ($data) {
        return moment($data, 'YYYY-M-D').format('jYYYY-jM-jD');
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
}]);