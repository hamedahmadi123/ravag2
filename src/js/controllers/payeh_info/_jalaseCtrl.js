app.controller('jalase', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretext = "";
    $scope.titelext = "";
    $scope.name = [];
    $scope.drsDetail = {};
    $scope.desbel = 0;


    var skip = -15;
    var take = 15;
    var objects = 0;
    var isem = false;
    $scope.load2 = function () {

        if (isem)
            return;

        skip += take;
        for (var i = 1; i <= take; i++) {
            $scope.name.push({order_id: "-1" + $scope.name.length});
        }


        var msg = {
            ViewName: "SessionTypeSelect",
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "schoolid",
                        logic: "and",
                    operator: "eq",
                        value: localStorage.schoolId+""
                    },
                    skip: skip,
                    take: take,
                    Sort: [{field: "sessiontypeid", dir: "DESC"}]
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

    };

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
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("درج جلسه با خطا مواجه شد.");
                    document.location.reload();
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

    $scope.errText = function () {
        return $scope.eroretext;
    }
    $scope.detial = function ($id) {
        var jls = {
            ViewName: "SessionTypeSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "sessiontypeid",
                        logic: "and",
                        operator: "eq",
                        value: $id + ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(jls))
            .success(function (result, status, headers, config) {
                $scope.jlsDetail = result.data[0];
                $scope.jls_id = $scope.jlsDetail.sessiontypeid;
                $scope.jls_nameE = $scope.jlsDetail.name;
                $scope.jls_vaziatE = $scope.jlsDetail.sessionstate;
            });
    }


    $scope.updateJlase = function ($id) {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.jls_nameE) && ($scope.jls_vaziatE)) {
                var upd_jls = {
                    ViewName: "SessionTypeUpdate",
                    parameters: [
                        {key: "%sessiontypeid", value: $id + ''},
                        {key: "%name", value: $scope.jls_nameE + ''},
                        {key: "%sessionstate", value: $scope.jls_vaziatE + ''},
                        {key: "%schoolid", value: localStorage.schoolId},

                    ]
                };
                var j = confirm("آیا برای ویرایش جلسه با " + $scope.jls_nameE + " اطمینان دارید؟");
                if (j === true) {
                    $http.post(URL_INSERT, JSON.stringify(upd_jls))
                        .success(function (result, status, headers, config) {
                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("ویرایش جلسه با خطا مواجه شد.");
                        document.location.reload();
                    });


                }
            } else {
                if (!$scope.jls_nameE) {
                    $scope.eroretext = "نام جلسه";
                } else if (!$scope.jls_vaziatE) {
                    $scope.eroretext = "وضعیت جلسه";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }
    // delete******************************
    $scope.deleteJalase = function ($id, $name) {
        var del_Item = {
            ViewName: "SessionTypeDelete",
            parameters: [
                {key: "%sessiontypeid", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف جلسه با عنوان " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
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
}])
;