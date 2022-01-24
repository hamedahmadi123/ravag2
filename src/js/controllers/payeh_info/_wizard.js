app.controller('wizard', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretext = "";
    $scope.snackText = "";
    $scope.doreh = [
        {value: "1", name: "ترم 1"},
        {value: "2", name: "ترم 2"},
        {value: "3", name: "تابستان"},
    ];
    term();
    seessionType();
    enz();
    function term() {
        var msg1 = {
            ViewName: "TermSelect",
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "schoolid",
                        logic: "and",
                        operator: "eq",
                        value: localStorage.schoolId + ""
                    },
                    skip: 0,
                    take: 5,
                    Sort: [{field: "termid", dir: "DESC"}]
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(msg1))
            .success(function (result, status, headers, config) {
                $scope.terms = result.data;
            });
    }

    function seessionType() {
        var msg2 = {
            ViewName: "SessionTypeSelect",
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "schoolid",
                        logic: "and",
                        operator: "eq",
                        value: localStorage.schoolId + ""
                    },
                    skip: 0,
                    take: 5,
                    Sort: [{field: "sessiontypeid", dir: "DESC"}]
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(msg2))
            .success(function (result, status, headers, config) {
                $scope.sessionType = result.data;
            });
    }

    function enz() {
        var msg3 = {
            ViewName: "DisciplineTypeSelect",
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "roleid",
                        logic: "and",
                        operator: "eq",
                        value: "1"
                        ,
                        filters: [{field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ""}]
                    },
                    skip: 0,
                    take: 5,
                    Sort: [{field: "disciplinetypeid", dir: "DESC"}]
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(msg3))
            .success(function (result, status, headers, config) {
                $scope.disciplinetypeSt = result.data;
            });
    }

    $scope.vaziat = [
        {value: "1", name: "عادی"},
        {value: "2", name: "مستمر"},
        {value: "3", name: "میان ترم"},
        {value: "4", name: "پایان ترم"},
    ],
        $scope.stateReturn = function ($st) {
            if ($st == '1') {
                return "عادی";
            } else if ($st == '2') {
                return "مستمر";
            } else if ($st == '3') {
                return "میان ترم";
            } else if ($st == '4') {
                return "پایان ترم";
            }
        }
    $scope.insertTermFunctin = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.trm_year) && ($scope.trm_name) && ($scope.trm_dore) && ($scope.trm_start) && ($scope.trm_end)) {
                var ins_trm = {
                    ViewName: "TermInsert",
                    parameters: [
                        {key: "%year", value: $scope.trm_year + ''},
                        {key: "%title", value: $scope.trm_name + ''},
                        {key: "%duration", value: $scope.trm_dore + ''},
                        {key: "%status", value: '1'},
                        {key: "%startdate", value: moment($scope.trm_start, 'jYYYY-jM-jD').format('YYYY-M-D') + ''},
                        {key: "%enddate", value: moment($scope.trm_end, 'jYYYY-jM-jD').format('YYYY-M-D') + ''},
                        {key: "%schoolid", value: localStorage.schoolId},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(ins_trm))
                    .success(function (result, status, headers, config) {
                        $scope.snackText = "درج ترم با موفقیت انجام مواجه شد.";
                        var x = document.getElementById("snackbar");
                        x.className = "show";
                        setTimeout(function () {
                            x.className = x.className.replace("show", "");
                        }, 2000);
                        term();
                    }).error(function (result, status, header, config) {
                    alert("درج ترم با خطا مواجه شد.");
                });


            } else {
                if (!$scope.trm_year) {
                    $scope.eroretext = "سال";
                } else if (!$scope.trm_name) {
                    $scope.eroretext = "عنوان ترم";
                } else if (!$scope.trm_dore) {
                    $scope.eroretext = "دوره";
                } else if (!$scope.trm_start) {
                    $scope.eroretext = "تاریخ شروع ترم";
                } else if (!$scope.trm_end) {
                    $scope.eroretext = "تاریخ پایان ترم";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }
    $scope.errText = function () {
        return $scope.eroretext;
    }
    $scope.users = [
        {value: "1", name: "مدیر آموزشگاه"},
        {value: "2", name: "معاون"},
        {value: "3", name: "معلم"},
        {value: "4", name: "کاربر"},
        {value: "5", name: "مدیر سیستم"},
        {value: "6", name: "خدمتگزار"},
    ];


    $scope.ownerReturn = function ($own) {
        if ($own == '1') {
            return "مدیر آموزشگاه";
        } else if ($own == '2') {
            return "معاون";
        } else if ($own == '3') {
            return "معلم";
        } else if ($own == '4') {
            return "کاربر";
        } else if ($own == '5') {
            return "مدیر سیستم";
        }
    }
    $scope.type = [
        {value: true, name: "مثبت +"},
        {value: false, name: "منفی -"},
    ],
        $scope.typeReturn = function ($type) {
            if ($type == 'true') {
                return "مثبت +";
            } else if ($type == 'false') {
                return "منفی -";
            }
        }

    $scope.insertJalase = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.jls_name) && ($scope.jls_vaziat)) {
                var ins_jls = {
                    ViewName: "SessionTypeInsert",
                    parameters: [
                        {key: "%name", value: $scope.jls_name + ''},
                        {key: "%sessionstate", value: $scope.jls_vaziat + ''},
                        {key: "%schoolid", value: localStorage.schoolId},

                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(ins_jls))
                    .success(function (result, status, headers, config) {
                        $scope.snackText = "درج جلسه با موفقیت انجام مواجه شد.";
                        var x = document.getElementById("snackbar");
                        x.className = "show";
                        setTimeout(function () {
                            x.className = x.className.replace("show", "");
                        }, 2000);
                        seessionType();
                    }).error(function (result, status, header, config) {
                    alert("درج جلسه با خطا مواجه شد.");
                });
            } else {
                if (!$scope.jls_name) {
                    $scope.eroretext = "نام جلسه";
                } else if (!$scope.jls_vaziat) {
                    $scope.eroretext = "وضعیت جلسه";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }

    $scope.insertEnzebatSt = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.enzSt_name) && ($scope.enzSt_barem) && ($scope.enzSt_user) && ($scope.enzSt_type == true || $scope.enzSt_type == false)) {
                if ($scope.enzSt_type == true) {
                    $scope.enzSt_type = "1";
                } else if ($scope.enzSt_type == false) {
                    $scope.enzSt_type = "0";
                }
                var ins_enzS = {
                    ViewName: "DisciplineTypeInsert",
                    parameters: [
                        {key: "%name", value: $scope.enzSt_name + ''},
                        {key: "%barem", value: $scope.enzSt_barem + ''},
                        {key: "%owner", value: $scope.enzSt_user + ''},
                        {key: "%type", value: $scope.enzSt_type + ''},
                        {key: "%roleid", value: '1'},
                        {key: "%schoolid", value: localStorage.schoolId},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(ins_enzS))
                    .success(function (result, status, headers, config) {
                        $scope.snackText = "درج انضباط دانش آموز با موفقیت انجام مواجه شد.";
                        var x = document.getElementById("snackbar");
                        x.className = "show";
                        setTimeout(function () {
                            x.className = x.className.replace("show", "");
                        }, 2000);
                        enz();
                    }).error(function (result, status, header, config) {
                    alert("درج انضباط دانش آموز با خطا مواجه شد.");

                });


            } else {
                if (!$scope.enzSt_name) {
                    $scope.eroretext = "عنوان انضباط دانش آموز";
                } else if (!$scope.enzSt_barem) {
                    $scope.eroretext = "بارم";
                } else if (!$scope.enzSt_user) {
                    $scope.eroretext = "استفاده کننده";
                } else if (!$scope.enzSt_type) {
                    $scope.eroretext = "نوع انضباط";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }

    $scope.BackToHistory = function () {
        window.history.back();
    }
    $scope.activeClass1 = function ($new, $old) {
        document.getElementById($new).className = "active";
        document.getElementById($old).className = "";
    }
}])
;