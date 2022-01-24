app.controller('Enzebat_teacher_insert', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretext = "";
    //temp
    $scope.temp_classlessonteacher_id = "";
    $scope.temp_lessonid = "";
    $scope.temp_classLessonName = "";
    $scope.temp_classLessonId = "";
    $scope.temp_classLesson_teacherName = "";
    $scope.temp_WeeklyScheduleId = "";
    $scope.tmp_the_dis_Name = "";
    $scope.tmp_the_WeeklySchedule_Name = "";
    //var
    $scope.classlessonteacher_id = "";
    $scope.classLesson_teacherID = "";
    $scope.classLesson_teacherName = "";
    $scope.classLesson_teacherID = "";
    $scope.classLesson_teacherName = "";
    $scope.classLessonId = "";
    $scope.classLessonName = "";
    $scope.lessonid = "";
    $scope.the_dis_Id = "";
    $scope.the_dis_Name = "";
    $scope.WeeklyScheduleId = "";

    $scope.obj_clt = {};
    //dis type
    $scope.obj_disType = {};
    $scope.tmp_the_dis_Id = "";
    $scope.tmp_the_dis_Name = "";
    $scope.types = [
        {value: "0", name: "منفی"},
        {value: "1", name: "مثبت"},
    ];
    myfunc();

    function myfunc() {
        var cls = {
            ViewName: "ClassSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "",
                        logic: "",
                        operator: "",
                        value: ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(cls))
            .success(function (result, status, headers, config) {
                    $scope.class = result.data;
                }
            );

        var msg = {
            ViewName: "DisciplineTypeSelect",
            mutualTransaction: {

                kendoDataRequest: {
                    filter: {
                        field: "roleid",
                        logic: "and",
                        operator: "eq",
                        value: "2"
                    },
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(msg))
            .success(function (result, status, headers, config) {
                $scope.enz_types = result.data;
                for (var i = 0; i < $scope.enz_types.length; i++) {
                    if ($scope.enz_types[i].owner == 2) {
                        $scope.obj_disType[$scope.enz_types[i].disciplinetypeid] = true;
                    }
                }
            });

        var clt = {
            ViewName: "SelectLessonClassTeacher",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ''
                    }
                    ,
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(clt))
            .success(function (result, status, headers, config) {
                $scope.classLesson = result.data;
                for (var i = 0; i < $scope.classLesson.length; i++) {
                    $scope.obj_clt[$scope.classLesson[i].teacherid] = true;
                    $scope.obj_clt[$scope.classLesson[i].classid] = true;
                }
            });


        var teachers = {
            ViewName: "TeacherSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ''
                    }
                    ,
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(teachers))
            .success(function (result, status, headers, config) {
                $scope.teachers = result.data;
            });

        var All_class = {
            ViewName: "ClassSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ''
                    }
                    ,
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(All_class))
            .success(function (result, status, headers, config) {
                $scope.All_class = result.data;
            });


    }


    $scope.setClassLesson = function ($id, $name, $thId, $lessonId, $thName, $cltId) {
        document.getElementById($cltId).checked = true;
        $scope.temp_classLessonId = $id;
        $scope.temp_classLessonName = $name;
        $scope.temp_classLesson_teacherID = $thId;
        $scope.temp_classLesson_teacherName = $thName;
        $scope.temp_lessonid = $lessonId;
        $scope.temp_classlessonteacher_id = $cltId;
    }
    $scope.submitSelectClassLesson = function () {
        $scope.classLessonId = $scope.temp_classLessonId;
        $scope.dis_classLesson = $scope.temp_classLessonName;
        $scope.classLesson_teacherID = $scope.temp_classLesson_teacherID;
        $scope.classLesson_teacherName = $scope.temp_classLesson_teacherName;
        $scope.lessonid = $scope.temp_lessonid;
        $scope.classlessonteacher_id = $scope.temp_classlessonteacher_id;
    }

    $scope.filterClassLesson = function ($filter, $num) {
        $scope.obj_clt = {};
        for (var i = 0; i < $scope.classLesson.length; i++) {
            if ($num == '0') {
                $scope.filterTeacher = "";
                if ($scope.classLesson[i].classid == $filter)
                    $scope.obj_clt[$scope.classLesson[i].classid] = true;

            } else {
                $scope.filterClass = "";
                if ($scope.classLesson[i].teacherid == $filter)
                    $scope.obj_clt[$scope.classLesson[i].teacherid] = true;
            }
        }
    }

    $scope.selectWeeklyschedule = function () {
        var wkly = {
            ViewName: "WeeklyscheduleSelect_Paramaters",
            parameters: [
                {key: "%schoolid", value: localStorage.schoolId + ''},
                {key: "%teacherid", value: $scope.classLesson_teacherID + ''},
                {key: "%lessonid", value: $scope.lessonid + ''},
                {key: "%classid", value: $scope.classLessonId + ''},
            ],
        };
        $http.post(URL_GET, JSON.stringify(wkly))
            .success(function (result, status, headers, config) {
                $scope.Weeklyschedules = result.data;
                console.log($scope.Weeklyschedules);
            });
    }
    $scope.selectWeekly = function ($Id, $day, $zang) {
        if ($scope.temp_WeeklyScheduleId && $scope.temp_WeeklyScheduleId != "" && $scope.temp_WeeklyScheduleId != undefined && $scope.temp_WeeklyScheduleId != "undefined") {
            document.getElementById($scope.temp_WeeklyScheduleId).style.border = "none";
            document.getElementById($Id).style.border = "2px #27c24c solid";
        } else {
            document.getElementById($Id).style.border = "2px #27c24c solid";
        }
        $scope.temp_WeeklyScheduleId = $Id;
        $scope.tmp_the_WeeklySchedule_Name = "روز  " + $scope.returnDay($day) + " زنگ " + $zang;
    }
    $scope.submitWeekly = function () {
        $scope.WeeklyScheduleId = $scope.temp_WeeklyScheduleId;
        $scope.dis_time = $scope.tmp_the_WeeklySchedule_Name;
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
    $scope.submitDisciplineType = function () {
        $scope.the_dis_Id = $scope.tmp_the_dis_Id;
        $scope.the_dis_Name = $scope.tmp_the_dis_Name;
        $scope.dis_type = $scope.the_dis_Name;
    }

    $scope.selectAlldisType = function ($num) {
        if ($num == true) {
            if ($scope.Select_As == true)
                document.getElementById('lblType').innerText = "مشاهده موارد انضباطی معاون";
            else
                document.getElementById('lblType').innerText = "مشاهده موارد انضباطی معلم";
            for (var i = 0; i < $scope.enz_types.length; i++) {
                $scope.obj_disType[$scope.enz_types[i].disciplinetypeid] = true;
            }
        } else {
            document.getElementById('lblType').innerText = "مشاهده همه موارد انضباطی";
            $scope.setDisclineType();
        }

    }
    $scope.filterByType = function ($num) {
        $scope.obj_disType = {};
        for (var i = 0; i < $scope.enz_types.length; i++) {
            if ($num == 1 || $num == 0) {
                if ($scope.enz_types[i].type == $num) {
                    if ($scope.showAlltype == true) {
                        $scope.obj_disType[$scope.enz_types[i].disciplinetypeid] = true;
                    } else {
                        if ($scope.enz_types[i].owner == 2) {
                            $scope.obj_disType[$scope.enz_types[i].disciplinetypeid] = true;
                        }
                    }
                } else {
                    if ($scope.showAlltype == true) {
                        $scope.obj_disType[$scope.enz_types[i].disciplinetypeid] = true;
                    } else {
                        if ($scope.enz_types[i].owner == 3) {
                            $scope.obj_disType[$scope.enz_types[i].disciplinetypeid] = true;
                        }
                    }
                }
            }

        }
    }

    $scope.setDisclineType = function () {
        $scope.obj_disType = {};
        for (var i = 0; i < $scope.enz_types.length; i++) {
            if ($scope.enz_types[i].owner == 2)
                $scope.obj_disType[$scope.enz_types[i].disciplinetypeid] = true;
        }
    }
    $scope.selectgrp = function ($Id, $name) {
        if ($scope.tmp_the_dis_Id && $scope.tmp_the_dis_Id != "" && $scope.tmp_the_dis_Id != undefined && $scope.tmp_the_dis_Id != "undefined") {
            document.getElementById($scope.tmp_the_dis_Id).style.border = "none";
            document.getElementById($Id).style.border = "2px #27c24c solid";
        } else {
            document.getElementById($Id).style.border = "2px #27c24c solid";
        }
        $scope.tmp_the_dis_Id = $Id;
        $scope.tmp_the_dis_Name = $name;
    }
    $scope.InsertDisciplineTeacher = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.classLessonId) && ($scope.WeeklyScheduleId) && ($scope.the_dis_Id) && ($scope.dis_date)) {
                var ins_dis = {
                    ViewName: "InsertDisciplineTeacher",
                    parameters: [
                        {key: "%classlessonteacherid", value: $scope.classlessonteacher_id + ''},
                        {key: "%weeklyscheduleid", value: $scope.WeeklyScheduleId + ''},
                        {key: "%disciplinetypeid", value: $scope.the_dis_Id + ''},
                        {key: "%description", value: $scope.dis_note + ''},
                        {key: "%createdAt", value: moment($scope.dis_date, 'jYYYY-jM-jD').format('YYYY-M-D') + ''},
                        {key: "%schoolid", value: localStorage.schoolId + ''},
                    ]
                };
                alert(JSON.stringify(ins_dis));
                $http.post(URL_INSERT, JSON.stringify(ins_dis))
                    .success(function (result, status, headers, config) {
                        alert("درج انضباط معلم با موفقیت انجام شد. ");
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("درج انضباط با خطا مواجه شد.");
                    document.location.reload();
                });
            } else {
                if (!$scope.classLessonId) {
                    $scope.eroretext = "کلاس درس";
                } else if (!$scope.WeeklyScheduleId) {
                    $scope.eroretext = "ساعت کلاس";
                } else if (!$scope.dis_type) {
                    $scope.eroretext = "نوع انضباط";
                } else if (!$scope.dis_date) {
                    $scope.eroretext = "تاریخ درج انضباط";
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

}
])
;
