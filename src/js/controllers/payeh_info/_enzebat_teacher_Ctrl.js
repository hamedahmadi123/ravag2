app.controller('enzebat_teacher', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.enzSt_barem = 0.5;
    $scope.desbel = 0;
    $scope.eroretext = "";
    $scope.titelext = "";
    $scope.name = [];
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
            ViewName: "DisciplineTypeSelect",
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "roleid",
                        logic: "and",
                        operator: "eq",
                        value: "2"
                        ,
                        filters: [{field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ""}]
                    },
                    skip: skip,
                    take: take,
                    Sort: [{field: "disciplinetypeid", dir: "DESC"}]
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

    $scope.insertEnzebatTh = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.enzTh_name) && ($scope.enzTh_user) && ($scope.enzTh_type == true || $scope.enzTh_type == false)) {
                if ($scope.enzTh_type == true) {
                    $scope.enzTh_type = "1";
                } else if ($scope.enzTh_type == false) {
                    $scope.enzTh_type = "0";
                }
                var ins_enzS = {
                    ViewName: "DisciplineTypeInsert",
                    parameters: [
                        {key: "%name", value: $scope.enzTh_name + ''},
                        {key: "%barem", value: "0"},
                        {key: "%owner", value: $scope.enzTh_user + ''},
                        {key: "%type", value: $scope.enzTh_type + ''},
                        {key: "%roleid", value: '2'},
                        {key: "%schoolid", value: localStorage.schoolId},
                    ]
                };

                $http.post(URL_INSERT, JSON.stringify(ins_enzS))
                    .success(function (result, status, headers, config) {
                        alert("انضباط معلم جدیدی با عنوان " + $scope.enzTh_name + " با موفقیت درج شد.");
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("درج انضباط معلم با خطا مواجه شد.");
                    document.location.reload();
                });

            } else {
                if (!$scope.enzTh_name) {
                    $scope.eroretext = "عنوان انضباط معلم";
                } else if (!$scope.enzTh_user) {
                    $scope.eroretext = "استفاده کننده";
                } else if (!$scope.enzTh_type) {
                    $scope.eroretext = "نوع انضباط";
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
    $scope.desbaleForm = function () {
        if ($scope.desbel === 0) {
            return true;
        } else if ($scope.desbel === 1) {
            return false;
        }
    }

    $scope.detial = function ($num, $id) {
        if ($num == 'det') {
            $scope.desbel = 0;
        } else if ($num == 'upd') {
            $scope.desbel = 1;
        }
        var drss = {
            ViewName: "DisciplineTypeSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "disciplinetypeid",
                        logic: "and",
                        operator: "eq",
                        value: $id + ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(drss))
            .success(function (result, status, headers, config) {
                $scope.enzThDetial = result.data[0];
                $scope.enzTh_id = $scope.enzThDetial.disciplinetypeid;
                $scope.enzTh_nameE = $scope.enzThDetial.name;
                if ($scope.enzThDetial.type == "1") {
                    $scope.enzTh_typeE = true;
                } else if ($scope.enzThDetial.type == "0") {
                    $scope.enzTh_typeE = false;
                }
                $scope.enzTh_userE = $scope.enzThDetial.owner;

            });
    }


    $scope.updateEnzTeach = function ($id) {
        if ($scope.desbel == 1) {
            if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
                if ($scope.enzTh_typeE == true) {
                    $scope.enzTh_typeE = "1";
                } else if ($scope.enzTh_typeE == false) {
                    $scope.enzTh_typeE = "0";
                }
                if (($scope.enzTh_nameE) && ($scope.enzTh_typeE == true || $scope.enzTh_typeE == false) && ($scope.enzTh_userE)) {
                    var ins_enzT = {
                        ViewName: "DisciplineTypeUpdate",
                        parameters: [
                            {key: "%disciplinetypeid", value: $id + ''},
                            {key: "%name", value: $scope.enzTh_nameE + ''},
                            {key: "%barem", value: "0"},
                            {key: "%owner", value: $scope.enzTh_userE + ''},
                            {key: "%type", value: $scope.enzTh_typeE + ''},
                            {key: "%roleid", value: '2'},
                            {key: "%schoolid", value: localStorage.schoolId},
                        ]
                    };

                    var j = confirm("آیا برای ویرایش انضباط معلم با عنوان " + $scope.enzTh_nameE + " اطمینان دارید ؟ ");
                    if (j === true) {
                        $http.post(URL_INSERT, JSON.stringify(ins_enzT))
                            .success(function (result, status, headers, config) {
                                document.location.reload();
                            }).error(function (result, status, header, config) {
                            alert("ویرایش انضباط معلم با خطا مواجه شد.");
                            document.location.reload();
                        });


                    }
                } else {
                    if (!$scope.enzTh_nameE) {
                        $scope.eroretext = "عنوان انضباط";
                    } else if (!$scope.enzTh_userE) {
                        $scope.eroretext = "استفاده کننده";
                    } else if (!$scope.enzTh_typeE) {
                        $scope.eroretext = "نوع انضباط";
                    }
                }
            } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
                alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
                document.location.replace("#/app/Main");
                document.location.reload()
            }
        } else {
            $scope.desbel = 1;
        }
    }
    // delete******************************
    $scope.deleteEnzTh = function ($id, $name) {
        var del_Item = {
            ViewName: "DisciplineTypeDelete",
            parameters: [
                {key: "%disciplinetypeid ", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف انضباط معلم با عنوان " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
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