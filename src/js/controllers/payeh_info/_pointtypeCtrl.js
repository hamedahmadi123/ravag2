app.controller('pointtype', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretext = "";
    $scope.titelext = "";
    $scope.name = [];
    $scope.users = [
        {value: "0", name: "مدیر آموزشگاه"},
        {value: "1", name: "معاون"},
        {value: "2", name: "معلم"},
        {value: "3", name: "کاربر"},
        {value: "4", name: "مدیر سیستم"},
    ];
    $scope.point_barem = 0.5 ;
    $scope.point_baremE = 0.5 ;
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
            ViewName: "pointtypeSelect",
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
                    Sort: [{field: "pointid", dir: "ASC"}]
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


    // insert******************************
    $scope.insertPoint = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.point_name) && ($scope.point_roolid)) {
                var ins_point = {
                    ViewName: "pointtypeInsert",
                    parameters: [
                        {key: "%name", value: $scope.point_name || '' + ''},
                        {key: "%barem", value: $scope.point_barem || '0.5' + ''},
                        {key: "%roleid", value: $scope.point_roolid || '' + ''},
                        {key: "%schoolid", value: localStorage.schoolId || '' + ''},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(ins_point))
                    .success(function (result, status, headers, config) {
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("درج امتیاز با خطا مواجه شد.");
                    document.location.reload();
                });


            } else {
                if (!$scope.point_name) {
                    $scope.eroretext = "نام امتیاز";
                } else if (!$scope.point_roolid) {
                    $scope.eroretext = "استفاده کننده";
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
    // select******************************
    $scope.detial = function ($id) {
        var point = {
            ViewName: "pointtypeSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "pointid",
                        logic: "and",
                        operator: "eq",
                        value: $id + ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(point))
            .success(function (result, status, headers, config) {
                $scope.point = result.data[0];
                $scope.point_nameE = $scope.point.name;
                $scope.point_baremE = parseInt($scope.point.barem);
                $scope.point_roolidE = $scope.point.roleid;
            });
    }


    // update******************************
    $scope.updatepoint = function ($id) {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.point_nameE) && ($scope.point_roolidE)) {
                var upd_point = {
                    ViewName: "pointtypeUpdate",
                    parameters: [
                        {key: "%pointid", value: $id + ''},
                        {key: "%name", value: $scope.point_nameE || '' + ''},
                        {key: "%barem", value: $scope.point_baremE || '0.5' + ''},
                        {key: "%roleid", value: $scope.point_roolidE || '' + ''},
                        {key: "%schoolid", value: localStorage.schoolId || '' + ''},
                    ]
                };

                var j = confirm("آیا برای ویرایش امتیاز با عنوان " + $scope.point_nameE + " اطمینان دارید ؟ ");
                if (j === true) {
                    $http.post(URL_INSERT, JSON.stringify(upd_point))
                        .success(function (result, status, headers, config) {
                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("ویرایش امتیاز با خطا مواجه شد.");
                        document.location.reload();
                    });
                }
            } else {
                if (!$scope.point_nameE) {
                    $scope.eroretext = "نام امتیاز";
                } else if (!$scope.point_roolidE) {
                    $scope.eroretext = "استفاده کننده";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }


    // delete******************************
    $scope.deletepoint = function ($id, $name) {
        var del_Item = {
            ViewName: "pointtypeDelete",
            parameters: [
                {key: "%pointid", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف امتیاز با عنوان " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
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