app.controller('teacherClass', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.classTeacher = [];
    $scope.teacher_id = "";
    $scope.teacher_name = "";
    $scope.class_id = "";
    $scope.class_name = "";
    $scope.show_jlse = false;
    $scope.show_weekly = false;
    $scope.show_enz_teacher = false;
    $scope.show_score = false;
    $scope.showInfoText = true;
    $scope.data1 = [];
    $scope.class = [];
    $scope.obj = {};
    $scope.thechers = [];
    $scope.enz_good = 0;
    $scope.enz_bad = 0;
    $scope.week = [
        // {"value": 0, "name": "روزها"},
        {"value": 0, "name": "شنبه"},
        {"value": 1, "name": "یکشنبه"},
        {"value": 2, "name": "دوشنبه"},
        {"value": 3, "name": "سه شنبه"},
        {"value": 4, "name": "چهارشنبه"},
        {"value": 5, "name": "پنجشنبه"}
    ];
    $scope.setClassWeekly = function ($) {
        $scope.show_weekly = !$scope.show_weekly;
        $scope.obj = {
            child2: {},
            child1: {}
        };
        for (var i = 0; i < $scope.class.length; i++) {
            if ($scope.class[i].classid == $id) {

                $scope.cls_name = $scope.class[i].title;
            }
        }
        try {
            var wksch = {
                ViewName: "WeeklyscheduleSelect",
                mutualTransaction: {
                    kendoDataRequest: {
                        filter: {
                            field: "teacherid",
                            logic: "and",
                            operator: "eq",
                            value: localStorage.userId + ""
                        },

                    }
                }
            }
            $http.post(URL_GET, JSON.stringify(wksch))
                .success(function (result, status, headers, config) {
                    $scope.weeklyschedules = result.data;
                    for (var i = 0; i < $scope.weeklyschedules.length; i++) {
                        if (!$scope.obj[$scope.weeklyschedules[i].day + "-" + $scope.weeklyschedules[i].zang])
                            $scope.obj[$scope.weeklyschedules[i].day + "-" + $scope.weeklyschedules[i].zang] = {
                                child2: {},
                                child1: {}
                            };
                        if ($scope.weeklyschedules[i].shift == 1) {
                            //shift1 -> child2
                            $scope.obj[$scope.weeklyschedules[i].day + "-" + $scope.weeklyschedules[i].zang]["child2"] = {
                                teacherid: $scope.weeklyschedules[i].teacherid,
                                teacherName: $scope.weeklyschedules[i].FirstName + " " + $scope.weeklyschedules[i].LastName,
                                lessonid: $scope.weeklyschedules[i].lessonid,
                                lessonName: $scope.weeklyschedules[i].lessonTitle,
                                classid: $scope.weeklyschedules[i].classid,
                                schoolid: localStorage.schoolId,
                                day: $scope.weeklyschedules[i].day,
                                zang: $scope.weeklyschedules[i].zang,
                                shift: 1,
                            };
                        } else {
                            //shift0 -> child1
                            $scope.obj[$scope.weeklyschedules[i].day + "-" + $scope.weeklyschedules[i].zang]["child1"] = {
                                teacherid: $scope.weeklyschedules[i].teacherid,
                                teacherName: $scope.weeklyschedules[i].FirstName + " " + $scope.weeklyschedules[i].LastName,
                                lessonid: $scope.weeklyschedules[i].lessonid,
                                lessonName: $scope.weeklyschedules[i].lessonTitle,
                                classid: $scope.weeklyschedules[i].classid,
                                schoolid: localStorage.schoolId,
                                day: $scope.weeklyschedules[i].day,
                                zang: $scope.weeklyschedules[i].zang,
                                shift: 0,
                            };
                        }
                    }
                });
        } catch (e) {
        }
    }
    $scope.setClassWeekly();
    $scope.disklpline_teacher = function () {
        var msg = {
            ViewName: "SelectDisciplineTeacher",
            parameters: [
                {key: "%schoolid", value: localStorage.schoolId + ''}],
            mutualTransaction: {
                kendoDataRequest: {
                    filter:
                        {field: "teacherid", logic: "and", operator: "eq", value: localStorage.userId},
                },
            }
        }
        $http.post(URL_GET, JSON.stringify(msg))
            .success(function (result, status, headers, config) {
                $scope.disklpline_th = result.data;
                for (var i = 0; i < $scope.disklpline_th.length; i++) {
                    if ($scope.disklpline_th[i].type == 0) {
                        $scope.enz_bad += 1;
                    } else {
                        $scope.enz_good += 1;
                    }


                }
            });
    }
    $scope.disklpline_teacher();
    $scope.selectSession = function () {
        if($scope.class_id)
        {
            var session_weekly = {
                ViewName: "SelectSessionWeeklyschedule",
                parameters: [
                    {key: "%classlessonteacherid", value: $scope.class_id + ''},
                    {key: "%schoolid", value: localStorage.schoolId + ''}
                ],
                mutualTransaction: {
                    kendoDataRequest: {
                        filter: {
                            field: "", logic: "", operator: "", value: ''
                        },
                    }
                }
            }
            $http.post(URL_GET, JSON.stringify(session_weekly))
                .success(function (result, status, headers, config) {
                    $scope.session_weekly = result.data;
                });
        }
        else {
            alert("لطفا ابتدا کلاس مورد نظر را انتخاب نمایید");
        }

    }
    var sch = {
        ViewName: "SchoolSelect",
        mutualTransaction: {
            kendoDataRequest: {
                filter: {
                    field: "schoolid",
                    logic: "and",
                    operator: "eq",
                    value: localStorage.schoolId + ""
                },
            }
        }
    }
    $http.post(URL_GET, JSON.stringify(sch))
        .success(function (result, status, headers, config) {
            $scope.school = result.data[0];
            for (var i = 0; i <= $scope.school.zanghLenth; i++) {
                if (i == 0) {
                    $scope.data1.push({"value": 0, "name": "زنگ ها"});
                } else {
                    $scope.data1.push({"value": i, "name": "زنگ " + i});
                }
            }
        });


    $scope.selectTeacher = function ($id, $name) {
        $scope.show_jlse = false;
        $scope.show_weekly = false;
        $scope.show_enz_teacher = false;
        $scope.show_score = false;
        $scope.showInfoText = false;
        $scope.teacher_id = $id;
        $scope.teacher_name = $name;
        var clt = {
            ViewName: "SelectLessonClassTeacher",
            parameters: [
                {key: "%schoolid", value: localStorage.schoolId}
            ],
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "teacherid", logic: "and", operator: "eq", value: $id + ''
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(clt))
            .success(function (result, status, headers, config) {
                $scope.classLesson = result.data;
            });
    }
    var thr = {
        ViewName: "TeacherSelect",
        mutualTransaction: {
            kendoDataRequest: {
                filter: {
                    field: "teacherid",
                    logic: "and",
                    operator: "eq",
                    value: localStorage.userId + ""
                },
            }
        }
    }
    $http.post(URL_GET, JSON.stringify(thr))
        .success(function (result, status, headers, config) {
            $scope.techer = result.data[0];
            $scope.selectTeacher(localStorage.userId, $scope.techer.firstname+' '+$scope.techer.lastname);
        });

    $scope.selectLesson = function ($id, $name ) {
        $scope.class_id = $id;
        $scope.class_name = $name;
    }



    $scope.selectScore = function () {
       if( $scope.class_id)
       {
           var session_score = {
               ViewName: "SessionScoreForClass",
               parameters: [
                   {key: "%classlessonteacherid", value: $scope.class_id + ''},
                   {key: "%schoolid", value: localStorage.schoolId + ''},
                   {key: "%termid", value: localStorage.act_term_id + ''},
               ],
               mutualTransaction: {
                   kendoDataRequest: {
                       filter: {
                           field: "", logic: "", operator: "", value: ''
                       },
                   }
               }
           }
           $http.post(URL_GET, JSON.stringify(session_score))
               .success(function (result, status, headers, config) {
                   $scope.session_score = result.data;
               });

       }
       else {
           alert("لطفا ابتدا کلاس مورد نظر را انتخاب نمایید");
       }

    }
    $scope.crDate = function ($date) {
        return moment($date, 'YYYY-M-D').format('jYYYY-jM-jD');
    }

    $scope.returnDay = function ($dayNumber) {
        if ($dayNumber == 0) {
            return "شنبه";
        } else if ($dayNumber == 1) {
            return "یکشنبه";
        } else if ($dayNumber == 2) {
            return "دوشنبه";
        } else if ($dayNumber == 3) {
            return "سه شنبه";
        } else if ($dayNumber == 4) {
            return "چهارشنبه";
        } else if ($dayNumber == 5) {
            return "پنجشنبه";
        }
    }
    $scope.BackToHistory = function () {
        window.history.back();
    }
}
])
;
