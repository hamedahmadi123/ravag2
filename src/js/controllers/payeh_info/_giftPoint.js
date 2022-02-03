app.controller('giftPoint', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
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
            ViewName: "SelectGiftpoint",
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
                    Sort: [{field: "giftpoint_id", dir: "ASC"}]
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
    $scope.insertGift = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.gif_name) && ($scope.gift_point)) {
                var ins_gif = {
                    ViewName: "InsertGiftpoint",
                    parameters: [
                        {key: "%name", value: $scope.gif_name + ''},
                        {key: "%point", value: $scope.gift_point + ''},
                        {key: "%schoolid", value: localStorage.schoolId || '' + ''},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(ins_gif))
                    .success(function (result, status, headers, config) {
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("درج جایزه با خطا مواجه شد.");
                    document.location.reload();
                });


            } else {
                if (!$scope.gif_name) {
                    $scope.eroretext = "نام جایزه";
                } else if (!$scope.gift_point) {
                    $scope.eroretext = "امتیاز مرود نیاز";
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
            ViewName: "SelectGiftpoint",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "giftpoint_id",
                        logic: "and",
                        operator: "eq",
                        value: $id + ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(point))
            .success(function (result, status, headers, config) {
                $scope.gift = result.data[0];
                $scope.gift_nameE = $scope.gift.name;
                $scope.gift_pointE = parseInt($scope.gift.point);
            });
    }


    // update******************************
    $scope.updateGift = function ($id) {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.gift_nameE) && ($scope.gift_pointE)) {
                var upd_gift = {
                    ViewName: "UpdateGiftpoint",
                    parameters: [
                        {key: "%giftpoint_id", value: $id + ''},
                        {key: "%name", value: $scope.gift_nameE + ''},
                        {key: "%point", value: $scope.gift_pointE + ''},
                    ]
                };

                var j = confirm("آیا برای ویرایش جایزه با عنوان " + $scope.gift_nameE + " اطمینان دارید ؟ ");
                if (j === true) {
                    $http.post(URL_INSERT, JSON.stringify(upd_gift))
                        .success(function (result, status, headers, config) {
                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("ویرایش جایزه با خطا مواجه شد.");
                        document.location.reload();
                    });
                }
            } else {
                if (!$scope.gift_nameE) {
                    $scope.eroretext = "نام جایزه";
                } else if (!$scope.gift_pointE) {
                    $scope.eroretext = "امتیاز مورد نیاز";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }


    // delete******************************
    $scope.deleteGift = function ($id, $name) {
        var del_Item = {
            ViewName: "DeleteGiftpoint",
            parameters: [
                {key: "%giftpoint_id", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف جایزه با عنوان " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
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