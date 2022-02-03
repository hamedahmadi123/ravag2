app.controller('quizSchedule_exam', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.dateExam = "";
    $scope.eroretext = "";
    $scope.dayNum = "";
    $scope.arrselect = [];
    $scope.arrselectName = [];
    funcn();

    function funcn() {
        myVar = setTimeout(myfunction, 300);
    }

    function myfunction() {
        var full_url = document.URL;
        var url_array = full_url.split('/')
        $scope.quizeId = url_array[url_array.length - 1];
        var msg = {
            ViewName: "SelectExamtitle",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ''
                        , filters: [
                            {field: "examtitleid", logic: "and", operator: "eq", value: $scope.quizeId}
                        ]

                    },
                    Sort: [{field: "examtitleid", dir: "DESC"}]
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(msg))
            .success(function (result, status, headers, config) {
                $scope.this_exam = result.data[0];
            });
    }

    $scope.BackToHistory = function () {
        window.history.back();
    }
    $scope.$watch('exm_data', function ($date) {
        if ($date && $date != undefined && $date != 'undefined') {
            $scope.dateExam = $date;
            var day = parseInt(moment(moment($scope.dateExam, 'jYYYY-jM-jD').format('YYYY-M-D')).day());
            try {
                if (day == 6) {
                    $scope.dayNum = 0;
                    $scope.exm_day = "شنبه";
                } else if (day == 0) {
                    $scope.dayNum = 1;
                    $scope.exm_day = "یکشنبه";
                } else if (day == 1) {
                    $scope.dayNum = 2;
                    $scope.exm_day = "دوشنبه";
                } else if (day == 2) {
                    $scope.dayNum = 3;
                    $scope.exm_day = "سه شنبه";
                } else if (day == 3) {
                    $scope.dayNum = 4;
                    $scope.exm_day = "چهارشنبه";
                } else if (day == 4) {
                    $scope.dayNum = 5;
                    $scope.exm_day = "پنجشنبه";
                } else if (day == 5) {
                    $scope.dayNum = 6;
                    $scope.exm_day = "جمعه";
                }
            } catch (e) {
                $scope.dayNum = -1;
                $scope.exm_day = "نامشخص";
            }
        }
    });

    $scope.insert_ExamPorogram = function () {
        //لبست کلاس ها :  $scope.arrselect;
        //لبست کلاس ها :  $scope.arrselect;
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.exm_data) && ($scope.exm_start) && ($scope.exm_end) && ($scope.arrselect.length != 0)) {
                var dataArray = [];
                for (var i = 0; i < $scope.arrselect.length-1; i++) {
                    var ins_smb = {
                        ViewName: "InsertExamporgram",
                        parameters: [
                            {key: "%examtitleid", value: $scope.this_exam.examtitleid + ''},
                            {key: "%classlessonteacherid", value: $scope.arrselect[i] + ''},
                            {key: "%date", value: $scope.exm_data || '' + ''},
                            {key: "%day", value: $scope.dayNum || '' + ''},
                            {key: "%starttime", value: $scope.exm_start || '' + ''},
                            {key: "%endtime", value: $scope.exm_end || '' + ''},
                            {key: "%schoolid", value: localStorage.schoolId || '' + ''},
                        ]
                    };
                    dataArray.push(ins_smb);
                }

                return;
                $http.post(URL_INSERT, JSON.stringify(ins_exam))
                    .success(function (result, status, headers, config) {
                        alert("امتحان جدیدی در تاریخ " + $scope.exm_data + " روز " + $scope.exm_day + " با موفقیت اضافه گردید. ");
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("درج امتحان با خطا مواجه شد.");
                    document.location.reload();
                });


            } else {
                if ($scope.arrselect.length == 0) {
                    $scope.eroretext = "کلاس درس";
                } else if (!$scope.exm_data) {
                    $scope.eroretext = "تاریخ امتحان";
                } else if (!$scope.exm_start) {
                    $scope.eroretext = "ساعت شروع امتحان";
                } else if (!$scope.exm_end) {
                    $scope.eroretext = "ساعت پایان امتحان";
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
    $scope.selectClassLesson = function () {
        var scl = {
            ViewName: "SelectLessonClassTeacher",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ''
                    },
                }
            },
            Sort: [{field: "classid", dir: "DESC"}]
        };
        $http.post(URL_GET, JSON.stringify(scl))
            .success(function (result, status, headers, config) {
                $scope.classLesson = result.data;
            });
    }
    $scope.itemArray = function ($id, $bool, $name) {
        if ($bool == true) {
            $scope.arrselect.push($id);
            $scope.arrselectName.push($name);
        } else {
            for (var i = 0; i < $scope.arrselect.length; i++) {
                if ($scope.arrselect[i] === $id) {
                    $scope.arrselect.splice(i, 1);
                    $scope.arrselectName.splice(i, 1);
                }
            }
        }
        $scope.exm_classLesson = JSON.stringify($scope.arrselectName);
    }


}])
;