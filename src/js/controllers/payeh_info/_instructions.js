app.controller('instructions', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretext = "";
    $scope.titelext = "";
    selectIns();

    function selectIns() {
        var msg = {
            ViewName: "SelectInstruction",
            parameters: [{key: "%schoolid", value: localStorage.schoolId}],
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "",
                        logic: "",
                        operator: "",
                        value: ""
                    },
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(msg))
            .success(function (result, status, headers, config) {
                $scope.ins = result.data[0];
                console.log($scope.ins);
            });
    }

    // insert******************************
    $scope.insertInstructions = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.instructions)) {
                var ins_mdk = {
                    ViewName: "InsertInstruction",
                    parameters: [
                        {key: "%instructions", value: $scope.instructions + ''},
                        {key: "%schoolid", value: localStorage.schoolId + ''},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(ins_mdk))
                    .success(function (result, status, headers, config) {
                        alert("موافقت نامه انضباطی شما با موفقیت تنظیم گردید.");
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("درج با خطا مواجه شد.");
                    document.location.reload();
                });


            } else {
                if (!$scope.instructions) {
                    $scope.eroretext = "متن موافقت نامه";
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
    $scope.detial = function () {

        $scope.instructionsE = $scope.ins.instructions;
    }

    // update******************************
    $scope.updateInstructions = function ($id) {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.instructionsE)) {
                var upd_mdk = {
                    ViewName: "UpdateInstruction",
                    parameters: [
                        {key: "%id", value: $scope.ins.id + ''},
                        {key: "%instructions", value: $scope.instructionsE + ''},
                    ]
                };

                var j = confirm("آیا برای ویرایش موافقت نامه اطمینان دارید ؟ ");
                if (j === true) {
                    $http.post(URL_INSERT, JSON.stringify(upd_mdk))
                        .success(function (result, status, headers, config) {
                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("ویرایش با خطا مواجه شد.");
                        document.location.reload();
                    });
                }
            } else {
                if (!$scope.instructionsE) {
                    $scope.eroretext = "متن موافقت نامه";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }
    $scope.crDate = function ($date) {
        return moment($date, 'YYYY-M-D').format('jYYYY-jM-jD');
    }
}])
;