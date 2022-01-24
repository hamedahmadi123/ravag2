app.controller('wallet', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    var now = moment().format();
    $scope.thisDay = moment(now, 'YYYY-M-D').format('jYYYY-jM-jD');
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
            ViewName: "SelectChequeInMonth",
            parameters: [{key: "%schoolid", value: localStorage.schoolId}],
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "", logic: "", operator: "", value: "",
                    },
                    skip: skip,
                    take: take,
                    Sort: [{field: "cheque_date", dir: "DESC"}]
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

    $scope.retdata = function ($data) {
        return moment($data, 'YYYY-M-D').format('jYYYY-jM-jD');
    }


    $scope.passNotCheque = function () {

        var filter = {
            ViewName: "FilterSalTahily",
            parameters: [{key: "%schoolid", value: localStorage.schoolId}],
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "", logic: "", operator: "", value: "",
                    },
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(filter))
            .success(function (result, status, headers, config) {
                $scope.filter = result.data;
            });

        var msg = {
            ViewName: "SelectNotPassCheque",
            parameters: [{key: "%schoolid", value: localStorage.schoolId}],
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "pass", logic: "and", operator: "eq", value: "0",
                    },
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(msg))
            .success(function (result, status, headers, config) {
                $scope.passCheque = result.data;
                for (var i = 0; i < $scope.passCheque.length; i++) {
                    $scope.passCheque[i].show = true;
                }
            });
    }
    $scope.passcheque = function ($id) {
        var pass = {
            ViewName: "passcheque",
            parameters: [
                {key: "%cheque_id", value: $id + ''},
                {key: "%pass", value: '1'},
            ]
        };
        var j = confirm(" آیا برای پاس شدن این چک اطمینان دارید ؟ ");
        if (j === true) {
            $http.post(URL_INSERT, JSON.stringify(pass))
                .success(function (result, status, headers, config) {
                    skip = -15;
                    take = 15;
                    objects = 0;
                    isem = false;
                    $scope.load2();
                    $scope.passNotCheque();
                }).error(function (result, status, header, config) {
                alert("ارسال اطلاعات با خطا مواجه شد.");
                // document.location.reload();
            });
        }
    }
    $scope.filterBySal = function ($id) {
        if ($id) {
            for (var i = 0; i < $scope.passCheque.length; i++) {
                if ($scope.passCheque[i].sal_tahsily == $id)
                    $scope.passCheque[i].show = true;
                else
                    $scope.passCheque[i].show = false;

            }
        } else {
            for (var i = 0; i < $scope.passCheque.length; i++) {
                $scope.passCheque[i].show = true;
            }
        }
    }
}
])
;