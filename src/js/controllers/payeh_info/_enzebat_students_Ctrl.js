app.controller('enzebat_students', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
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
                    filter: {field: "roleid", logic: "and", operator: "eq", value: "1"
                    , filters:[{field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId+""}]},
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

    $scope.insertEnzebatSt = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.enzSt_name) && ($scope.enzSt_barem) && ($scope.enzSt_user) && ($scope.enzSt_type == true || $scope.enzSt_type == false)) {
                if ($scope.enzSt_type == true) {
                    $scope.enzSt_type = "1";
                } else if ($scope.enzSt_type == false)  {
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
                        alert("انضباط دانش آموز جدیدی با عنوان " + $scope.enzSt_name + " با موفقیت درج شد.");
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("درج انضباط دانش آموز با خطا مواجه شد.");
                    document.location.reload();
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
    $scope.updateEnzStud = function ($id) {

        if ($scope.desbel == 1) {
            if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

                if (($scope.enzSt_nameE) && ($scope.enzSt_baremE) && ($scope.enzSt_userE) && ($scope.enzSt_typeE == true || $scope.enzSt_typeE == false)) {
                    if ($scope.enzSt_typeE == true) {
                        $scope.enzSt_typeE = "1";
                    } else if ($scope.enzSt_typeE == false)  {
                        $scope.enzSt_typeE = "0";
                    }
                    var ins_enzS = {
                        ViewName: "DisciplineTypeUpdate",
                        parameters: [
                            {key: "%disciplinetypeid", value: $id + ''},
                            {key: "%name", value: $scope.enzSt_nameE + ''},
                            {key: "%barem", value: $scope.enzSt_baremE + ''},
                            {key: "%owner", value: $scope.enzSt_userE + ''},
                            {key: "%type", value: $scope.enzSt_typeE + ''},
                            {key: "%roleid", value: '1'},
                            {key: "%schoolid", value: localStorage.schoolId},
                        ]
                    };

                    var j = confirm("آیا برای ویرایش انضباط دانش آموز با عنوان " + $scope.enzSt_nameE + " اطمینان دارید ؟ ");
                    if (j === true) {
                        $http.post(URL_INSERT, JSON.stringify(ins_enzS))
                            .success(function (result, status, headers, config) {
                                document.location.reload();
                            }).error(function (result, status, header, config) {
                            alert("ویرایش انضباط دانش آموز با خطا مواجه شد.");
                            document.location.reload();
                        });


                    }
                } else {
                    if (!$scope.enzSt_nameE) {
                        $scope.eroretext = "عنوان انضباط دانش آموز";
                    } else if (!$scope.enzSt_baremE) {
                        $scope.eroretext = "بارم";
                    } else if (!$scope.enzSt_userE) {
                        $scope.eroretext = "استفاده کننده";
                    } else if (!$scope.enzSt_typeE) {
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
                $scope.enzStDetial = result.data[0];
                $scope.enzSt_id = $scope.enzStDetial.disciplinetypeid;
                $scope.enzSt_nameE = $scope.enzStDetial.name;
                if ($scope.enzStDetial.type == "1") {
                    $scope.enzSt_typeE = true;
                } else if ($scope.enzStDetial.type == "0") {
                    $scope.enzSt_typeE = false;
                }
                $scope.enzSt_baremE = parseFloat($scope.enzStDetial.barem);
                $scope.enzSt_userE = $scope.enzStDetial.owner;

            });
    }
    // delete******************************
    $scope.deleteEnzSt = function ($id, $name) {
        var del_Item = {
            ViewName: "DisciplineTypeDelete",
            parameters: [
                {key: "%disciplinetypeid ", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف انضباط دانش آموز با عنوان " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
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