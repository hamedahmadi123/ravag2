app.controller('oliyaeCtrl', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout){
    $scope.eroretext = "";
    myFunction();

    function myFunction() {
        var msg = {
            ViewName: "Order",
            mutualTransaction: {
                Columns: [""],
                kendoDataRequest: {
                    filter: {
                        field: "",
                        logic: "",
                    operator: "",
                        value: ""
                    },
                    skip: 0,
                    take: 9999999999,
                    Sort: [{field: "Ordercreated_at", dir: "DESC"}]
                }
            },
        }

        $http.post(URL_GET, JSON.stringify(msg))
            .success(function (result, status, headers, config) {
                $scope.oliyae = result.data;

            });
    }
    $scope.insertOliyae = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.oly_s_meliCode)&&($scope.oly_f_name)&&($scope.oly_f_tel)&&($scope.oly_f_job)&&($scope.oly_f_madrak)&&($scope.oly_m_name)&&($scope.oly_m_tel)&&($scope.oly_m_job)&&($scope.oly_m_madrak)) {
                var ins_oly = {
                    ViewName: "lessonInsert",
                    parameters: [
                        {key: "%title", value: $scope.oly_s_meliCode + ''},
                        {key: "%title", value: $scope.oly_f_name + ''},
                        {key: "%title", value: $scope.oly_f_tel + ''},
                        {key: "%title", value: $scope.oly_f_job + ''},
                        {key: "%title", value: $scope.oly_f_madrak + ''},
                        {key: "%title", value: $scope.oly_m_name + ''},
                        {key: "%title", value: $scope.oly_m_tel + ''},
                        {key: "%title", value: $scope.oly_m_job + ''},
                        {key: "%title", value: $scope.oly_m_madrak + ''},

                    ]
                };

                var j = confirm("?????? ???????? ?????? ?????????? ???????? ?????????????? ?????????? ?? ");
                if (j === true) {
                    $http.post(URL_INSERT, JSON.stringify(ins_oly))
                        .success(function (result, status, headers, config) {

                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("?????? ?????????? ???? ?????? ?????????? ????.");
                        document.location.reload();
                    });


                }
            } else {
                if (!$scope.oly_s_meliCode) {
                    $scope.eroretext = "???? ??????";
                }
                else if (!$scope.oly_f_name) {
                    $scope.eroretext = "?????? ??????";
                }
                else if (!$scope.oly_f_tel) {
                    $scope.eroretext = "?????????? ???????? ??????";
                }
                else if (!$scope.oly_f_job) {
                    $scope.eroretext = "?????? ??????";
                }
                else if (!$scope.oly_f_madrak) {
                    $scope.eroretext = "???????? ???????????? ??????";
                } else if (!$scope.oly_m_name) {
                    $scope.eroretext = "?????? ????????";
                } else if (!$scope.oly_m_tel) {
                    $scope.eroretext = "?????????? ???????? ????????";
                }else if (!$scope.oly_m_job) {
                    $scope.eroretext = "?????? ????????";
                }else if (!$scope.oly_m_madrak) {
                    $scope.eroretext = "???????? ???????????? ????????";
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

}])
;