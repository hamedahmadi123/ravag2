app.controller('madarek', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout){
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
            ViewName: "educationdegreeSelect",
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
                    Sort: [{field: "educationdegreeid", dir: "DESC"}]
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
    $scope.insertMadrak = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.mdk_name) ) {
                var ins_mdk = {
                    ViewName: "educationdegreeInsert",
                    parameters: [
                        {key: "%name", value: $scope.mdk_name + ''},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(ins_mdk))
                    .success(function (result, status, headers, config) {
                        alert("مدرک جدیدی با عنوان " + $scope.mdk_name + " با موفقیت درج شد.");
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("درج پایه با خطا مواجه شد.");
                    document.location.reload();
                });


            } else {
                if (!$scope.mdk_name) {
                    $scope.eroretext = "نام مدرک";
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
        var mdk = {
            ViewName: "educationdegreeSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "educationdegreeid",
                        logic: "and",
                        operator: "eq",
                        value: $id + ""
                    },

                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mdk))
            .success(function (result, status, headers, config) {
                $scope.mdks = result.data[0];
                $scope.mdk_code = $scope.mdks.educationdegreeid;
                $scope.mdk_nameE = $scope.mdks.name;
            });
    }


    // update******************************
    $scope.updateMadrak = function ($id) {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.mdk_nameE)) {
                var upd_mdk = {
                    ViewName: "educationdegreeUpdate",
                    parameters: [
                        {key: "%educationdegreeid", value: $id + ''},
                        {key: "%name", value: $scope.mdk_nameE + ''},
                    ]
                };

                var j = confirm("آیا برای ویرایش مدرک با عنوان " + $scope.mdk_nameE + " اطمینان دارید ؟ ");
                if (j === true) {
                    $http.post(URL_INSERT, JSON.stringify(upd_mdk))
                        .success(function (result, status, headers, config) {
                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("ویرایش پایه با خطا مواجه شد.");
                        document.location.reload();
                    });
                }
            } else {
                if (!$scope.mdk_nameE) {
                    $scope.eroretext = "عنوان مدرک";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }


    // delete******************************
    $scope.deleteMadrak = function ($id, $name) {
        var del_Item = {
            ViewName: "educationdegreeDelete",
            parameters: [
                {key: "%educationdegreeid", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف مدرک با عنوان " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
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