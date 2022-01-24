app.controller('quizSchedule', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretext = "";
    $scope.arrselect = [];
    $scope.titelext = "";
    $scope.name = [];
    $scope.quizeId = "";
    $scope.arrselect = [];
    $scope.examDay = 0;
    $scope.objDay = {};
    $scope.objTh = {};
    $scope.weeklyTeachers = [];
    var skip = -15;
    var take = 15;
    var objects = 0;
    var isem = false;
    $scope.filterText = "همه دانش آموزان";
    $scope.load2 = function () {
        if (isem)
            return;

        skip += take;
        for (var i = 1; i <= take; i++) {
            $scope.name.push({order_id: "-1" + $scope.name.length});
        }
        var msg = {
            ViewName: "SelectExamtitle",
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "schoolid",
                        logic: "and",
                        operator: "eq",
                        value: localStorage.schoolId + ""
                    },
                    skip: skip,
                    take: take,
                    Sort: [{field: "examtitleid", dir: "DESC"}]
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
    $scope.insertExamTitle = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.quz_name)) {
                var ins_Quiz = {
                    ViewName: "InsertExamtitle",
                    parameters: [
                        {key: "%title", value: $scope.quz_name || '' + ''},
                        {key: "%schoolid", value: localStorage.schoolId || '' + ''},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(ins_Quiz))
                    .success(function (result, status, headers, config) {
                        alert("برنامه امتحانی جدیدی با عنوان " + $scope.quz_name + " با موفقیت درج شد.");
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("درج برنامه با خطا مواجه شد.");
                    document.location.reload();
                });


            } else {
                if (!$scope.quz_name) {
                    $scope.eroretext = "عنوان برنامه امتحانی";
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
    $scope.selectQuiz = function ($id) {
        $scope.quizeId = $id;
    }

    $scope.detial = function ($id) {
        var quz = {
            ViewName: "SelectExamtitle",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "examtitleid",
                        logic: "and",
                        operator: "eq",
                        value: $id + ""
                    },

                }
            }
        }
        $http.post(URL_GET, JSON.stringify(quz))
            .success(function (result, status, headers, config) {
                $scope.quiz = result.data[0];
                $scope.quz_nameE = $scope.quiz.title;
            });
    }


    // update******************************
    $scope.updateExamTitle = function ($id) {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.quz_nameE)) {
                var upd_quz = {
                    ViewName: "UpdateExamtitle",
                    parameters: [
                        {key: "%examtitleid", value: $id + ''},
                        {key: "%title", value: $scope.quz_nameE + ''},
                    ]
                };

                var j = confirm("آیا برای ویرایش برنامه امتحانی با عنوان " + $scope.quz_nameE + " اطمینان دارید ؟ ");
                if (j === true) {
                    $http.post(URL_INSERT, JSON.stringify(upd_quz))
                        .success(function (result, status, headers, config) {
                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("ویرایش با خطا مواجه شد.");
                        document.location.reload();
                    });
                }
            } else {
                if (!$scope.quz_nameE) {
                    $scope.eroretext = "عنوان برنامه امتحانی";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }


    // delete******************************
    $scope.deleteExamTitel = function ($id, $name) {
        var del_Item = {
            ViewName: "DeleteExamtitle",
            parameters: [
                {key: "%examtitleid", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف برنامه امتحانی با عنوان " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
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

    $scope.showExamPorogram = function () {
        $('#exams').modal('hide');
        $('#examsPorogram').modal();
    }

    $scope.SelectWeeklyscheduleTeacher = function () {
        var scl = {
            ViewName: "SelectWeeklyscheduleTeacher",
            parameters: [{key: "%schoolid", value: localStorage.schoolId}],
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "", logic: "", operator: "", value: ''
                    },
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(scl))
            .success(function (result, status, headers, config) {
                $scope.weeklyTeachers = result.data;
                for (var i = 0; i < $scope.weeklyTeachers.length; i++) {
                    if ($scope.weeklyTeachers[i].day == $scope.examDay) {
                        $scope.objDay[$scope.weeklyTeachers[i].day] = true;
                    }
                }
            });
    }
    $scope.itemArray = function ($id, $bool) {
        if ($bool == true) {
            $scope.arrselect.push($id);
        } else {
            for (var i = 0; i < $scope.arrselect.length; i++) {
                if ($scope.arrselect[i] === $id) {
                    $scope.arrselect.splice(i, 1);
                }
            }
        }
        console.log("0", $scope.arrselect);

    }
    $scope.selectAllTh = function ($num) {
        if ($num == true) {
            document.getElementById('lblAllTh').innerText = "مشاهده معلمینی که در روز " + $scope.returnDay($scope.examDay) + " حضور دارند."
            for (var i = 0; i < $scope.weeklyTeachers.length; i++) {
                $scope.objDay[$scope.weeklyTeachers[i].day] = true;
                if($scope.selectingAll == true)
                {  $scope.objTh[$scope.weeklyTeachers[i].weeklyscheduleid] = true;
                    $scope.arrselect.push($scope.weeklyTeachers[i].weeklyscheduleid);
                }
            }
        } else {
            document.getElementById('lblAllTh').innerText = "مشاهده همه معلمین"
            $scope.arrselect=[];
            for (var c = 0; c < $scope.weeklyTeachers.length; c++) {
                if($scope.selectingAll == true)
                {
                    if ($scope.weeklyTeachers[c].day == $scope.examDay)
                    {
                        $scope.arrselect.push($scope.weeklyTeachers[c].weeklyscheduleid);
                    } else {
                        $scope.objTh[$scope.weeklyTeachers[c].weeklyscheduleid] = false;
                        $scope.arrselect.splice(c, 1);
                    }
                }

                if ($scope.weeklyTeachers[c].day == $scope.examDay) {
                    $scope.objDay[$scope.weeklyTeachers[c].day] = true;
                } else {
                    $scope.objDay[$scope.weeklyTeachers[c].day] = false;
                }

            }
        }
        console.log("1", $scope.arrselect);
    }

    $scope.selectall = function ($num) {
        $scope.arrselect=[];
        for (var i = 0; i < $scope.weeklyTeachers.length; i++) {
            $scope.objTh[$scope.weeklyTeachers[i].weeklyscheduleid] = $num;
            if ($num) {
                if ($scope.objDay[$scope.weeklyTeachers[i].day] == true) {
                    $scope.arrselect.push($scope.weeklyTeachers[i].weeklyscheduleid);
                }
            } else
                $scope.arrselect = [];
        }
        console.log("2", $scope.arrselect);
    }
    $scope.returnDay = function ($dayNumber) {
        if($dayNumber == 0)
        {
            return "شنبه";
        }
        else if($dayNumber == 1)
        {
            return "یکشنبه";
        }
        else if($dayNumber == 2)
        {
            return "دوشنبه";
        }
        else if($dayNumber == 3)
        {
            return "سه شنبه";
        }
        else if($dayNumber == 4)
        {
            return "چهارشنبه";
        }
        else if($dayNumber == 5)
        {
            return "پنجشنبه";
        }
    }
}])
;