app.controller('attendanse', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.showBTN = false;
    $scope.absn_note_show = {};
    $scope.absent = 1;
    var now = moment().format();
    $scope.az = moment(now, 'YYYY-M-D').format('jYYYY-jM-jD');
    $scope.ta = moment(now, 'YYYY-M-D').format('jYYYY-jM-jD');
    $scope.selectAbsent = function () {
        if( $scope.az &&  $scope.ta) {
            var msg = {
                ViewName: "SelectAbsenStudent",
                parameters: [
                    {key: "%schoolid", value: localStorage.schoolId + ''}
                    , {key: "%az", value: $scope.az}
                    , {key: "%ta", value: $scope.ta}
                ],
                mutualTransaction: {
                    kendoDataRequest: {
                        filter:
                            {field: "", logic: "", operator: "", value: ''},
                    },
                }
            }
            $http.post(URL_GET, JSON.stringify(msg))
                .success(function (result, status, headers, config) {
                    $scope.absent_st = result.data;
                });
        }
    }
    $scope.selectAbsent();
    $scope.$watch('absndateAz', function (newVal) {
        $scope.az = moment(newVal, 'jYYYY-jM-jD').format('YYYY-MM-DD');
        $scope.selectAbsent();
    });
    $scope.$watch('absndateTa', function (newVal) {
        $scope.ta = moment(newVal, 'jYYYY-jM-jD').format('YYYY-MM-DD');
        $scope.selectAbsent(moment(newVal, 'jYYYY-jM-jD').format('YYYY-MM-DD'));
    });
    $scope.checkAbsen = function ($num, $stid) {
        $scope.showBTN = true;
        if ($num == 0) {
            //مجاز
            $scope.absn_note_show[$stid] = true;
            $scope.absent = 0;
        } else {
            //غیر مجاز
            $scope.absn_note_show[$stid] = false;
            $scope.absent = 1;
        }
    }
    $scope.cancelAbsent = function ($stid, $date) {
        $scope.showBTN = false;
        $scope.absn_note_show[$stid] = false;
        document.getElementById('mojaz').checked = false;
        document.getElementById('g_mojaz').checked = false;
    }
    $scope.absentUpdate = function ($id, $data, $note) {
        if (!$note || $note == undefined || $note == "") {
            $note = "";
        }
        var upd_absn = {
            ViewName: "UpdateAttendance_isillegal",
            parameters: [
                {key: "%isillegal", value: $scope.absent + ''},
                {key: "%studentid", value: $id + ''},
                {key: "%createdAt", value: $data + ''},
                {key: "%note", value: $note + ''},
            ]
        };
        alert(JSON.stringify(upd_absn));
        $http.post(URL_INSERT, JSON.stringify(upd_absn))
            .success(function (result, status, headers, config) {
                document.location.reload();
            }).error(function (result, status, header, config) {
            alert("تعین مجاز یا غیر مجاز بودن این دانش آموز با خطا مواجه شد.");
            document.location.reload();
        });
    }
    $scope.BackToHistory = function () {
        window.history.back();
    }
    $scope.crDate = function ($date) {
        return moment($date, 'YYYY-M-D').format('jYYYY-jM-jD');
    }
}
])
;
