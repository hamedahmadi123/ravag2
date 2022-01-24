app.controller('TimeCtrl', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
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
            ViewName: "GeneralTimeSelect",
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "",
                        logic: "",
                        operator: "",
                        value: ""
                    },
                    skip: skip,
                    take: take,
                    Sort: [{field: "generaltimeid", dir: "DESC"}]
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

    $scope.insertTime = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.zmn_name) && ($scope.zmn_start) && ($scope.zmn_end)) {
                var ins_zmn = {
                    ViewName: "GeneralTimeInsert",
                    parameters: [
                        {key: "%title", value: $scope.zmn_name + ''},
                        {key: "%startTime", value: $scope.zmn_start + ''},
                        {key: "%endTime", value: $scope.zmn_end + ''},
                        {key: "%schoolid", value: localStorage.schoolId},


                    ]
                };

                $http.post(URL_INSERT, JSON.stringify(ins_zmn))
                    .success(function (result, status, headers, config) {
                        alert("زمان جدیدی با عنوان " + $scope.zmn_name + " با موفقیت درج شد.");
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("درج زمان با خطا مواجه شد.");
                    document.location.reload();
                });


            } else {
                if (!$scope.zmn_name) {
                    $scope.eroretext = "عنوان زمان";
                } else if (!$scope.zmn_start) {
                    $scope.eroretext = "ساعت شروع";
                } else if (!$scope.zmn_end) {
                    $scope.eroretext = "ساعت پایان";
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
        var zmn = {
            ViewName: "GeneralTimeSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "generaltimeid",
                        logic: "and",
                        operator: "eq",
                        value: $id + ""
                    },

                }
            }
        }
        $http.post(URL_GET, JSON.stringify(zmn))
            .success(function (result, status, headers, config) {
                $scope.zman = result.data[0];
                $scope.zmn_id = $scope.zman.generaltimeid;
                $scope.zmn_nameE = $scope.zman.title;
                $scope.zmn_startE = $scope.zman.startTime;
                $scope.zmn_endE = $scope.zman.endTime;
            });
    }

    $scope.updateTime = function ($id) {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.zmn_nameE) && ($scope.zmn_startE) && ($scope.zmn_endE)) {
                var ins_zmn = {
                    ViewName: "GeneralTimeUpdate",
                    parameters: [
                        {key: "%generaltimeid", value: $id + ''},
                        {key: "%title", value: $scope.zmn_nameE + ''},
                        {key: "%startTime", value: $scope.zmn_startE + ''},
                        {key: "%endTime", value: $scope.zmn_endE + ''},
                        {key: "%schoolid", value: localStorage.schoolId},


                    ]
                };

                var j = confirm("آیا برای ویرایش زمان با عنوان " + $scope.zmn_nameE + " اطمینان دارید ؟ ");
                if (j === true) {
                    $http.post(URL_INSERT, JSON.stringify(ins_zmn))
                        .success(function (result, status, headers, config) {
                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("ویرایش زمان با خطا مواجه شد.");
                        document.location.reload();
                    });


                }
            } else {
                if (!$scope.zmn_nameE) {
                    $scope.eroretext = "عنوان زمان";
                } else if (!$scope.zmn_startE) {
                    $scope.eroretext = "ساعت شروع";
                } else if (!$scope.zmn_endE) {
                    $scope.eroretext = "ساعت پایان";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }
    $scope.dateStart = function ($time) {
        $time = $time[0] + $time[1] + ":" + $time[2] + $time[3] ;
        return $time;
    }
    // delete******************************
    $scope.deleteTime = function ($id, $name) {
        var del_Item = {
            ViewName: "BaseDelete",
            parameters: [
                {key: "%baseid", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف زمان با عنوان " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
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