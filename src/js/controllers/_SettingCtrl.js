app.controller('Setting', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.obj_colore = {};
    $scope.tem_id = "";
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
    var sch = {
        ViewName: "SchoolSelect",
        mutualTransaction: {
            kendoDataRequest: {
                filter: {
                    // field: "schoolid",
                    // logic: "and",
                    // operator: "eq",
                    // value: localStorage.schoolId + ""
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
            alert(JSON.stringify(upd_sch));
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

}])
;
;
