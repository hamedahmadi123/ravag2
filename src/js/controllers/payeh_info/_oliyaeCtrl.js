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

                var j = confirm("آیا برای درج اولیا جدید اطمینان دارید ؟ ");
                if (j === true) {
                    $http.post(URL_INSERT, JSON.stringify(ins_oly))
                        .success(function (result, status, headers, config) {
                            alert("اولیای جدیدی برای دانش آموز" + $scope.oly_s_meliCode + "با موفقیت درج شد.");
                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("درج اولیا با خطا مواجه شد.");
                        document.location.reload();
                    });


                }
            } else {
                if (!$scope.oly_s_meliCode) {
                    $scope.eroretext = "کد ملی";
                }
                else if (!$scope.oly_f_name) {
                    $scope.eroretext = "نام پدر";
                }
                else if (!$scope.oly_f_tel) {
                    $scope.eroretext = "شماره تفلن پدر";
                }
                else if (!$scope.oly_f_job) {
                    $scope.eroretext = "شغل پدر";
                }
                else if (!$scope.oly_f_madrak) {
                    $scope.eroretext = "مدرک تحصیلی پدر";
                } else if (!$scope.oly_m_name) {
                    $scope.eroretext = "نام مادر";
                } else if (!$scope.oly_m_tel) {
                    $scope.eroretext = "شماره تفلن مادر";
                }else if (!$scope.oly_m_job) {
                    $scope.eroretext = "شغل مادر";
                }else if (!$scope.oly_m_madrak) {
                    $scope.eroretext = "مدرک تحصیلی مادر";
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

}])
;