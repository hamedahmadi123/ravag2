app.controller('class_fizikiCtrl', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
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
            ViewName: "LocationSelect",
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
                    Sort: [{field: "locationid", dir: "DESC"}]
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

    $scope.insertClass_fizikiss = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.clsF_name)) {
                var ins_clsF = {
                    ViewName: "LocationInsert",
                    parameters: [
                        {key: "%name", value: $scope.clsF_name + ''},
                        {key: "%capacity", value: $scope.clsF_zarfiat || '' + ''},
                        {key: "%col", value: $scope.clsF_soton || '' + ''},
                        {key: "%row", value: $scope.clsF_satr || '' + ''},
                        {key: "%fromchairnum", value: $scope.clsF_az || '' + ''},
                        {key: "%untilchairnum", value: $scope.clsF_ta || '' + ''},
                        {key: "%schoolid", value: localStorage.schoolId},

                    ]
                };

                $http.post(URL_INSERT, JSON.stringify(ins_clsF))
                    .success(function (result, status, headers, config) {
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("?????? ???????? ???????????? ???? ?????? ?????????? ????.");
                    document.location.reload();
                });


            } else {
                if (!$scope.clsF_name) {
                    $scope.eroretext = "?????? ???????? ????????????";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("?????? ???? ?????????? ???????? ???????????? \n ???????? ?????????? ???????? ???????? ?????? ????????.");
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
    $scope.updateClassFiziki = function ($id) {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.clsF_nameE)) {
                var upd_clsF = {
                    ViewName: "LocationUpdate",
                    parameters: [
                        {key: "%locationid", value: $id + ''},
                        {key: "%name", value: $scope.clsF_nameE + ''},
                        {key: "%capacity", value: $scope.clsF_zarfiatE || '' + ''},
                        {key: "%col", value: $scope.clsF_sotonE || '' + ''},
                        {key: "%row", value: $scope.clsF_satrE || '' + ''},
                        {key: "%fromchairnum", value: $scope.clsF_azE || '' + ''},
                        {key: "%untilchairnum", value: $scope.clsF_taE || '' + ''},
                        {key: "%schoolid", value: localStorage.schoolId},

                    ]
                };
                var j = confirm("?????? ???????? ???????????? ???????? ???????????? ???? ?????????? " + $scope.clsF_nameE + "?????????????? ?????????? ??");
                if (j === true) {
                    $http.post(URL_INSERT, JSON.stringify(upd_clsF))
                        .success(function (result, status, headers, config) {
                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("???????????? ???????? ???????????? ???? ?????? ?????????? ????.");
                        document.location.reload();
                    });


                }
            } else {
                if (!$scope.clsF_nameE) {
                    $scope.eroretext = "?????? ???????? ????????????";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("?????? ???? ?????????? ???????? ???????????? \n ???????? ?????????? ???????? ???????? ?????? ????????.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }
    $scope.detial = function ($num, $id) {

        if ($num == 'det') {
            $scope.desbel = 0;
        } else if ($num == 'upd') {
            $scope.desbel = 1;
        }
        var drss = {
            ViewName: "LocationSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "locationid",
                        logic: "",
                        operator: "eq",
                        value: $id + ""
                    },

                }
            }
        }
        $http.post(URL_GET, JSON.stringify(drss))
            .success(function (result, status, headers, config) {
                $scope.locDetail = result.data[0];
                $scope.clsF_id = parseInt($scope.locDetail.locationid);
                $scope.clsF_nameE = $scope.locDetail.name;
                $scope.clsF_zarfiatE =  parseInt($scope.locDetail.capacity);
                $scope.clsF_sotonE =  parseInt($scope.locDetail.col);
                $scope.clsF_satrE =  parseInt($scope.locDetail.row);
                $scope.clsF_azE =  parseInt($scope.locDetail.fromchairnum);
                $scope.clsF_taE =  parseInt($scope.locDetail.untilchairnum);
            });
    }

    // delete******************************
    $scope.deleteClassFizizki = function ($id, $name) {
        var del_Item = {
            ViewName: "LocationDelete",
            parameters: [
                {key: "%locationid", value: $id + ''},
            ]
        };

        var j = confirm("?????? ???????? ?????? ???????? ???????????? ???? ?????????? " + $name + " ?? ???? ?????????? " + $id + " ?????????????? ?????????? ??");
        if (j === true) {
            $http.post(URL_INSERT, JSON.stringify(del_Item))
                .success(function (result, status, headers, config) {
                    document.location.reload();
                }).error(function (result, status, header, config) {
                alert("?????? ???? ?????? ?????????? ????.");
                document.location.reload();
            });
        }
    }


}])
;