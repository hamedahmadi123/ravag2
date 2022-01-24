app.controller('termha_insert', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretext = "";
    $scope.doreh = [
        {value: "1", name: "ترم 1"},
        {value: "2", name: "ترم 2"},
        {value: "3", name: "تابستان"},
    ],

        $scope.insertTermFunctin = function () {
            if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
                if (($scope.trm_year) && ($scope.trm_name) && ($scope.trm_dore) && ($scope.trm_start) && ($scope.trm_end)) {
                    var ins_trm = {
                        ViewName: "TermInsert",
                        parameters: [
                            {key: "%year", value: $scope.trm_year + ''},
                            {key: "%title", value: $scope.trm_name + ''},
                            {key: "%duration", value: $scope.trm_dore + ''},
                            {key: "%status", value: '1'},
                            {key: "%startdate", value: moment($scope.trm_start, 'jYYYY-jM-jD').format('YYYY-M-D') + ''},
                            {key: "%enddate", value: moment($scope.trm_end, 'jYYYY-jM-jD').format('YYYY-M-D') + ''},
                            {key: "%schoolid", value: localStorage.schoolId},
                        ]
                    };
                    $http.post(URL_INSERT, JSON.stringify(ins_trm))
                        .success(function (result, status, headers, config) {
                            alert("ترم جدیدی با عنوان " + $scope.trm_name + " با موفقیت درج شد.");
                            document.location.replace("#/app/page/termha");
                        }).error(function (result, status, header, config) {
                        alert("درج ترم با خطا مواجه شد.");
                        document.location.reload();
                    });


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
            } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
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








