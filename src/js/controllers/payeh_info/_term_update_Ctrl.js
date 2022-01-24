app.controller('term_update', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretext = "";
    $scope.doreh = [
        {value: "1", name: "ترم 1"},
        {value: "2", name: "ترم 2"},
        {value: "3", name: "تابستان"},
    ],
        funcn();
        function funcn() {
            myVar = setTimeout(myfunction, 300);
        }

    function myfunction () {
            var full_url = document.URL;
            var url_array = full_url.split('/')
            $scope.term_id = url_array[url_array.length - 1];
            var trm = {
                ViewName: "TermSelect",
                mutualTransaction: {
                    kendoDataRequest: {
                        filter: {
                            field: "termid",
                            logic: "and",
                            operator: "eq",
                            value: $scope.term_id + ""
                        },
                    }
                }
            }
            $http.post(URL_GET, JSON.stringify(trm))
                .success(function (result, status, headers, config) {
                    $scope.termha = result.data[0];
                    $scope.trm_id = $scope.termha.termid;
                    $scope.trm_year = $scope.termha.year;
                    $scope.trm_name = $scope.termha.title;
                    $scope.trm_dore = $scope.termha.duration;
                    $scope.trm_start = $scope.termha.startdate;
                    $scope.trm_end = $scope.termha.enddate;
                });
        }

        $scope.updateTermFunctin = function () {
            if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
                if (($scope.trm_year) && ($scope.trm_name) && ($scope.trm_dore) && ($scope.trm_start) && ($scope.trm_end)) {
                    var upd_trm = {
                        ViewName: "TermUpdate",
                        parameters: [
                            {key: "%termid", value: $scope.trm_id + ''},
                            {key: "%year", value: $scope.trm_year + ''},
                            {key: "%title", value: $scope.trm_name + ''},
                            {key: "%duration", value: $scope.trm_dore + ''},
                            {key: "%status", value: '1'},
                            {key: "%startdate", value: moment($scope.trm_start, 'jYYYY-jM-jD').format('YYYY-M-D') + ''},
                            {key: "%enddate", value: moment($scope.trm_end, 'jYYYY-jM-jD').format('YYYY-M-D') + ''},
                            {key: "%schoolid", value: localStorage.schoolId},
                        ]
                    };

                    var j = confirm("آیا برای ویرایش ترم با عنوان " + $scope.trm_name + "  اطمینان دارید ؟");
                    if (j === true) {
                        $http.post(URL_INSERT, JSON.stringify(upd_trm))
                            .success(function (result, status, headers, config) {
                                document.location.replace("#/app/page/termha");
                            }).error(function (result, status, header, config) {
                            alert("ویرایش ترم با خطا مواجه شد.");
                            document.location.reload();
                        });


                    }
                } else {
                    if (!$scope.trm_year) {
                        $scope.eroretext = "سال";
                    } else if (!$scope.trm_name) {
                        $scope.eroretext = "عنوان ترم";
                    } else if (!$scope.trm_dore) {
                        $scope.eroretext = "دوره";
                    } else if (!$scope.trm_start) {
                        $scope.eroretext = "تاریخ شروع ترم";
                    } else if (!$scope.trm_end) {
                        $scope.eroretext = "تاریخ پایان ترم";
                    }
                }
            }
            else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
                alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
                document.location.replace("#/app/Main");
                document.location.reload()
            }
        }
    $scope.errText = function () {
        return $scope.eroretext;
    }
    $scope.BackToHistory = function () {
        window.history.back();
    }

}])
;








