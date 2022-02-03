app.controller('Setting', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.obj_colore = {};
    $scope.schoolBase = [];
    $scope.baseMajor = [];
    $scope.schoolMajor = [];
    $scope.majorArray = [];
    $scope.tem_id = "";
    $scope.isMajor = false;
    $scope.scholtype = JSON.parse(localStorage.schoolBase);
    for (var i = 0; i < $scope.scholtype.length; i++) {
        if ($scope.scholtype[i] >= 1 && $scope.scholtype[i] <= 6) {
            $scope.isMajor = false;
        } else if ($scope.scholtype[i] >= 7 && $scope.scholtype[i] <= 9) {
            $scope.isMajor = false;
        } else if ($scope.scholtype[i] >= 10 && $scope.scholtype[i] <= 12) {
            $scope.isMajor = true;
        }
    }

    $scope.jensiat = [
        {value: "0", name: "پسرانه"},
        {value: "1", name: "دخترانه"},
    ],
        $scope.loca = [
            {location_id: "1", location_name: "اصفهان"},
            {location_id: "2", location_name: "تهران"},
            {location_id: "3", location_name: "مشهد"},
        ],
        $scope.subloca = [
            {location_id: "4", location_name: "شاهین شهر"},
            {location_id: "5", location_name: "نجف آباد"},
            {location_id: "6", location_name: "فولاد شهر"},
        ],
        $scope.shift = [
            {value: "0", name: "یک نوبته"},
            {value: "1", name: "دو نوبته"},
        ];
    var pnl = {
        ViewName: "SelectPanel",
        parameters: [
            {key: "%schoolid", value: localStorage.schoolId + ''}],
    }
    $http.post(URL_GET, JSON.stringify(pnl))
        .success(function (result, status, headers, config) {
            $scope.panel_disgen = result.data[0];
            $scope.obj_colore = JSON.parse($scope.panel_disgen.colore);

        });

    var mbs1 = {
        ViewName: "majorbaseschoolselect",
        mutualTransaction: {
            kendoDataRequest: {
                filter: {
                    field: "schoolid",
                    logic: "and",
                    operator: "eq",
                    value: localStorage.schoolId + ''
                },
                skip: 0,
                take: 1000,
            }
        }
    }
    $http.post(URL_GET, JSON.stringify(mbs1))
        .success(function (result, status, headers, config) {
            $scope.schoolMajorbase = result.data;
            for (var i = 0; i < $scope.schoolMajorbase.length; i++) {
                if ($scope.schoolMajorbase[i].ismajor == '0') {
                    $scope.schoolBase.push($scope.schoolMajorbase[i]);

                } else {
                    $scope.schoolMajor.push($scope.schoolMajorbase[i]);
                }
            }
        });

    var sch = {
        ViewName: "SchoolSelect",
        mutualTransaction: {
            kendoDataRequest: {
                filter: {
                    field: "schoolid",
                    logic: "and",
                    operator: "eq",
                    value: localStorage.schoolId + ""
                },
            }
        }
    }
    $http.post(URL_GET, JSON.stringify(sch))
        .success(function (result, status, headers, config) {
            $scope.school = result.data[0];
            $scope.sch_id = parseInt($scope.school.schoolid);
            $scope.sch_name = $scope.school.name;
            if ($scope.school.difftime == '0') {
                $scope.sch_shift = '0';
            } else {
                $scope.sch_shift = '1';
                $scope.sch_difftime = $scope.school.difftime;
            }
            $scope.sch_type = $scope.school.jensiyat;
            $scope.sch_city = $scope.school.city;
            $scope.sch_province = $scope.school.province;
            $scope.sch_address = $scope.school.address;
            $scope.sch_area = $scope.school.area;
            $scope.sch_tel = $scope.school.phone;
            $scope.sch_note = $scope.school.note;
            $scope.zanghLenth = parseInt($scope.school.zanghLenth);
            $scope.sch_latin = $scope.school.latin_name;
        });
    $scope.update_school = function ($id) {
        if ($scope.sch_shift == '0') {
            $scope.sch_difftime = '0';
        }
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.sch_id) && ($scope.sch_name) && ($scope.sch_type) && ($scope.sch_city) && ($scope.zanghLenth)) {
                var upd_sch = {
                    ViewName: "SchoolUpdate",
                    parameters: [
                        {key: "%schoolid", value: $id + ''},
                        {key: "%code", value: $scope.sch_id + ''},
                        {key: "%name", value: $scope.sch_name + ''},
                        {key: "%phone", value: $scope.sch_tel || '' + ''},
                        {key: "%note", value: $scope.sch_note || '' + ''},
                        {key: "%province", value: $scope.sch_province || '' + ''},
                        {key: "%city", value: $scope.sch_city + ''},
                        {key: "%address", value: $scope.sch_address || '' + ''},
                        {key: "%area", value: $scope.sch_area || '' + ''},
                        {key: "%jensiyat", value: $scope.sch_type + ''},
                        {key: "%difftime", value: $scope.sch_difftime + ''},
                        {key: "%zanghLenth", value: $scope.zanghLenth + ''},
                        {key: "%latin_name", value: $scope.sch_latin + ''},
                    ]
                };
                var j = confirm("آیا برای ویرایش آموزشگاه با عنوان " + $scope.sch_name + " اطمینان دارید ؟ ");
                if (j === true) {
                    $http.post(URL_INSERT, JSON.stringify(upd_sch))
                        .success(function (result, status, headers, config) {
                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("ویرایش آموزشگاه با خطا مواجه شد.");
                        document.location.reload();
                    });

                }
            } else {
                if (!$scope.sch_id) {
                    $scope.eroretext = "کد اموزشگاه";
                } else if (!$scope.name) {
                    $scope.eroretext = "نام آموزشگاه";
                } else if (!$scope.sch_city) {
                    $scope.eroretext = "شهر";
                } else if (!$scope.province) {
                    $scope.eroretext = "استان";
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
    $scope.errText = function () {
        return $scope.eroretext;
    }

    $scope.Insert_panel = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            var Colores = JSON.stringify($scope.obj_colore);
            var upd_sch = {
                ViewName: "UpdatePanel",
                parameters: [
                    {key: "%colore", value: Colores},
                    {key: "%schoolid", value: localStorage.schoolId + ''},

                ]
            };
            $http.post(URL_INSERT, JSON.stringify(upd_sch))
                .success(function (result, status, headers, config) {
                    document.location.reload();
                }).error(function (result, status, header, config) {
                alert("ویرایش تنظیمات ظاهری پنل با خطا مواجه شد.");
                document.location.reload();
            });
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }

    $scope.addMajor = function ($baseid) {
        $scope.baseMajor = [];
        $scope.majorInBase = [];
        $scope.majorArray = [];
        var mbs1 = {
            ViewName: "LikeMajor",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        logic: "and",
                        operator: "eq",
                        value: $baseid + ''
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs1))
            .success(function (result, status, headers, config) {
                    $scope.majorInBase = [];
                    for (var j = 0; j < $scope.schoolMajor.length; j++) {
                        if ($scope.schoolMajor[j].parent == $baseid) {
                            $scope.majorInBase.push($scope.schoolMajor[j])
                        }
                    }
                    for (var i = 0; i < result.data.length; i++) {
                        if (result.data[i].schoolid != localStorage.schoolId) {
                            $scope.baseMajor.push(result.data[i]);
                        }
                    }
                    if ($scope.baseMajor.length != 0) {
                        $('#myModal').modal();
                    } else {
                        alert("متاسفانه هیچ رشته قابل انتخابی برای شما در این پایه یافت نشد.")
                    }
                }
            );

    }

    $scope.setMajor = function ($id, $bool) {
        if ($bool == true) {
            $scope.majorArray.push($id);
        } else {
            for (var i = 0; i < $scope.majorArray.length; i++) {
                if ($scope.majorArray[i] == $id) {
                    $scope.majorArray.splice(i, 1);
                    break;
                }
            }
        }
    }
    $scope.addMajorToSchool = function () {
        var dataArray = [];
        if ($scope.majorArray.length != 0) {
            for (var i = 0; i < $scope.majorArray.length; i++) {
                var ins_smb = {
                    ViewName: "InsertMajorBaseSchool",
                    parameters: [
                        {key: "%majorbaseid", value: $scope.majorArray[i]+''},
                        {key: "%schoolid", value: localStorage.schoolId + ''},

                    ]
                };
                dataArray.push(ins_smb);
            }
            $http.post(URL_ARRAY_INSERT, JSON.stringify(dataArray))
                .success(function (result, status, headers, config) {
                    document.location.reload();
                }).error(function (result, status, header, config) {
                alert("خطا در ارسال اطلاعات");
                document.location.reload();
            });
        } else {
            alert("هیچ رشته ای انتخاب نشده است.")
        }
    }

}])
;
