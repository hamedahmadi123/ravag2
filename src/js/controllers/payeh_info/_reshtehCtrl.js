app.controller('reshteh', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.namelength = "";
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
            ViewName: "MajorSelect",
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
                    Sort: [{field: "majorid", dir: "DESC"}]
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

    $scope.insertReshteh = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.rsh_name)) {
                var ins_rsh = {
                    ViewName: "MajorInsert",
                    parameters: [
                        {key: "%name", value: $scope.rsh_name + ''},
                    ]
                };

                    $http.post(URL_INSERT, JSON.stringify(ins_rsh))
                        .success(function (result, status, headers, config) {
                            alert("رشته جدیدی با عنوان " + $scope.rsh_name + " با موفقیت درج شد.");
                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("درج رشته با خطا مواجه شد.");
                        document.location.reload();
                    });

            } else {
                if (!$scope.rsh_name) {
                    $scope.eroretext = "نام رشته";
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
    $scope.updateRshth = function($id){
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.rsh_nameE)) {
                var upd_rsh = {
                    ViewName: "MajorUpdate",
                    parameters: [
                        {key: "%majorid", value: $id + ''},
                        {key: "%name", value: $scope.rsh_nameE + ''},
                    ]
                };

                var j = confirm("آیا برای ویرایش رشته با عنوان " +  $scope.rsh_nameE + " اطمینان دارید ؟ ");
                if (j === true) {
                    $http.post(URL_INSERT, JSON.stringify(upd_rsh))
                        .success(function (result, status, headers, config) {
                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("ویرایش رشته با خطا مواجه شد.");
                        document.location.reload();
                    });


                }
            } else {
                if (!$scope.rsh_nameE) {
                    $scope.eroretext = "نام رشته";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }
    $scope.detial = function ($id) {
        var rshte = {
            ViewName: "MajorSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "majorid",
                        logic: "and",
                        operator: "eq",
                        value: $id + ""
                    },

                }
            }
        }
        $http.post(URL_GET, JSON.stringify(rshte))
            .success(function (result, status, headers, config) {
                $scope.rshDetail = result.data[0];
                $scope.rsh_code = $scope.rshDetail.majorid;
                $scope.rsh_nameE = $scope.rshDetail.name;
            });
    }
    // delete******************************
    $scope.deleteReshte = function ($id, $name) {
        var del_Item = {
            ViewName: "MajorDelete",
            parameters: [
                {key: "%majorid ", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف رشته با عنوان " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
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