app.controller('dashboardCtrl', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {
        $scope.eroretext = "";
        $scope.obj_st = {};
        $scope.showWiz = false;
        $scope.week = [
            // {"value": 0, "name": "روزها"},
            {"value": 0, "name": "شنبه"},
            {"value": 1, "name": "یکشنبه"},
            {"value": 2, "name": "دوشنبه"},
            {"value": 3, "name": "سه شنبه"},
            {"value": 4, "name": "چهارشنبه"},
            {"value": 5, "name": "پنجشنبه"}
        ];
        $scope.admin = false;
        $scope.Assistant = false;
        $scope.teacher = false;
        $scope.obj = {};
        $scope.actDayId = "";
        $scope.actDayName = "";
        $scope.weekData = [];
        $scope.thisData = "";
        $scope.weeklyId = "";
        $scope.isTosify = false;
        $scope.isPodemany = false;
        var now = moment().format();
        $scope.thisDay = moment(now, 'YYYY-M-D').format('jYYYY-jM-jD');
        $scope.termName = localStorage.act_term_name;
        $scope.schoolname = localStorage.schoolname;

        myFunction();


        function myFunction() {
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

                    if($scope.school.wizarder == '0')
                    {
                        $scope.showWiz = true;
                    }
                    else {
                        $scope.showWiz = false;
                    }
                });


            var msg = {
                ViewName: "SelectBlog",
                mutualTransaction: {
                    Columns: [],
                    kendoDataRequest: {
                        filter: {
                            field: "schoolid",
                            logic: "and",
                            operator: "eq",
                            value: localStorage.schoolId + ""
                        },
                        skip: 0,
                        take: 5,
                        Sort: [{field: "blog_id", dir: "DESC"}]
                    }
                },
            };
            $http.post(URL_GET, JSON.stringify(msg))
                .success(function (result, status, headers, config) {
                    $scope.blogs = result.data;
                });


            //user type
            if (localStorage.userType == '1') {
                $scope.admin = true;
            } else if (localStorage.userType == '2') {
                $scope.Assistant = true;
            } else if (localStorage.userType == '3') {
                $scope.teacher = true;
            }


            var all_thr = {
                ViewName: "TeacherSelect",
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
            $http.post(URL_GET, JSON.stringify(all_thr))
                .success(function (result, status, headers, config) {
                    $scope.techers = result.data;
                });



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
                    $scope.this_teacher = result.data[0];
                });

            if (localStorage.userType == '1') {
                var student_count = {
                    ViewName: "CountStudentInSchool",
                    parameters: [{key: "%schoolid", value: localStorage.schoolId}],
                }
                var teacher_count = {
                    ViewName: "CountTeacherInSchool",
                    parameters: [{key: "%schoolid", value: localStorage.schoolId}],
                }
                var attendance_count = {
                    ViewName: "CountAttendanceNow",
                    parameters: [{key: "%schoolid", value: localStorage.schoolId}],
                }
                var SessionNow_count = {
                    ViewName: "CountSessionNow",
                    parameters: [{key: "%schoolid", value: localStorage.schoolId}],
                }
                $http.post(URL_GET, JSON.stringify(student_count))
                    .success(function (result, status, headers, config) {
                        $scope.studentCount = result.data[0];
                    });
                $http.post(URL_GET, JSON.stringify(teacher_count))
                    .success(function (result, status, headers, config) {
                        $scope.teacherCount = result.data[0];
                    });
                $http.post(URL_GET, JSON.stringify(attendance_count))
                    .success(function (result, status, headers, config) {
                        $scope.attendanceCount = result.data[0];
                    });
                $http.post(URL_GET, JSON.stringify(SessionNow_count))
                    .success(function (result, status, headers, config) {
                        $scope.NowSessionCount = result.data[0];
                    });

                var Select_TopStudent = {
                    ViewName: "SelectTopStudent",
                    parameters: [
                        {key: "%termid", value: localStorage.act_term_id},
                        {key: "%schoolid", value: localStorage.schoolId},
                    ],
                }
                $http.post(URL_GET, JSON.stringify(Select_TopStudent))
                    .success(function (result, status, headers, config) {
                        $scope.activeUsers = result.data;
                    });
            }
            if (localStorage.userType == '2') {
                var dis_count = {
                    ViewName: "CountDiscipline",
                    parameters: [{key: "%schoolid", value: localStorage.schoolId}],
                }
                var att_count = {
                    ViewName: "Countattendance",
                    parameters: [{key: "%schoolid", value: localStorage.schoolId}],
                }

                var attendance_count = {
                    ViewName: "CountAttendanceNow",
                    parameters: [{key: "%schoolid", value: localStorage.schoolId}],
                }
                var SessionNow_count = {
                    ViewName: "CountSessionNow",
                    parameters: [{key: "%schoolid", value: localStorage.schoolId}],
                }
                $http.post(URL_GET, JSON.stringify(dis_count))
                    .success(function (result, status, headers, config) {
                        $scope.disCount = result.data[0];
                    });
                $http.post(URL_GET, JSON.stringify(att_count))
                    .success(function (result, status, headers, config) {
                        $scope.attCount = result.data[0];
                    });
                $http.post(URL_GET, JSON.stringify(attendance_count))
                    .success(function (result, status, headers, config) {
                        $scope.attendanceCount = result.data[0];
                    });
                $http.post(URL_GET, JSON.stringify(SessionNow_count))
                    .success(function (result, status, headers, config) {
                        $scope.NowSessionCount = result.data[0];
                    });
                var SelectAttendanceNow = {
                    ViewName: "SelectAttendanceNow",
                    parameters: [{key: "%schoolid", value: localStorage.schoolId}],
                }
                $http.post(URL_GET, JSON.stringify(SelectAttendanceNow))
                    .success(function (result, status, headers, config) {
                        $scope.att_list = result.data;
                    });
                var DisclplineNow_select = {
                    ViewName: "SelectDisclplineNow",
                    parameters: [{key: "%schoolid", value: localStorage.schoolId}],
                }
                $http.post(URL_GET, JSON.stringify(DisclplineNow_select))
                    .success(function (result, status, headers, config) {
                        $scope.dis_list = result.data;
                    });
            }
            if (localStorage.userType == '3') {

                var session_count = {
                    ViewName: "ContSessionTeacher",
                    parameters: [
                        {key: "%teacherid", value: localStorage.userId}

                    ],
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
                $http.post(URL_GET, JSON.stringify(session_count))
                    .success(function (result, status, headers, config) {
                        $scope.contSession = result.data[0];
                    });


                //init
                // $scope.weekData.push(moment(date.toISOString().slice(0, 19).replace('T', ' '), 'YYYY-M-D').format('jYYYY-jM-jD'));
                var thisDay = moment().weekday();
                if (thisDay === 6)
                    thisDay = 0;
                else
                    thisDay++;

                for (var i = 0; i <= 5; i++) {
                    var date = new Date();
                    date.setDate(date.getDate() + ((i - thisDay)));
                    $scope.weekData.push(moment(date.toISOString().slice(0, 19).replace('T', ' '), 'YYYY-M-D').format('jYYYY-jM-jD'));

                }
                var jls = {
                    ViewName: "SessionTypeSelect",
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
                $http.post(URL_GET, JSON.stringify(jls))
                    .success(function (result, status, headers, config) {
                        $scope.SessionTypes = result.data;
                    });
            }
            var cls = {
                ViewName: "ClassSelect",
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
                            value: "1",
                            filters: [
                                {field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ""}
                            ]
                        },
                    }
                },
            };
            $http.post(URL_GET, JSON.stringify(msg))
                .success(function (result, status, headers, config) {
                    $scope.enz_types = result.data;
                    for (var i = 0; i < $scope.enz_types.length; i++) {
                        if ($scope.enz_types[i].owner ==  localStorage.userType) {
                            $scope.obj_disType[$scope.enz_types[i].disciplinetypeid] = true;
                        }
                    }
                });
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
        $scope.filterByClass = function ($classId, $name) {
            if (!$classId) {
                document.getElementById('lblName').innerText = "لیست دانش آموزان";
                skip = -15;
                take = 15;
                objects = 0;
                isem = false;

            } else {
                document.getElementById('lblName').innerText = "لیست دانش آموزان کلاس " + "(" + $name + ")";
                $scope.name = [];
                skip = -15;
                take = 15;
                objects = 0;
                isem = false;
                if ($classId == null) {
                    //load2();
                } else {
                    if (isem)
                        return;

                    skip += take;
                    for (var i = 1; i <= take; i++) {
                        $scope.name.push({order_id: "-1" + $scope.name.length});
                    }
                    var msg = {
                        ViewName: "SelectStudentInClass",
                        mutualTransaction: {
                            Columns: [],
                            kendoDataRequest: {
                                filter: {
                                    field: "classid",
                                    logic: "and",
                                    operator: "eq",
                                    value: $classId + ""
                                },
                                skip: skip,
                                take: take,
                                Sort: [{field: "studentid", dir: "DESC"}]
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
                }
            }
        }
        $scope.load2 = function () {
            $scope.name = [];
            skip = -15;
            take = 15;
            objects = 0;
            isem = false;

            var field = "";
            var logic = "";
            var operator = "";
            var value = "";
            if (isem)
                return;

            skip += take;
            for (var i = 1; i <= take; i++) {
                $scope.name.push({order_id: "-1" + $scope.name.length});
            }
            var msg = {
                ViewName: "StudentSelect",
                mutualTransaction: {
                    Columns: [],
                    kendoDataRequest: {
                        filter: {
                            field: field,
                            logic: logic,
                            operator: operator,
                            value: value,
                            filters: [
                                {field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ""}
                            ]
                        },
                        skip: skip,
                        take: take,
                        Sort: [{field: "studentid", dir: "DESC"}]
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

        }
        $scope.returnBase = function ($path) {
            try {
                var path_array = $path.split('//');
                return path_array[2];
            } catch (e) {

            }
        }
        $scope.itemArray = function ($id, $bool, $name) {
            if ($bool == undefined) {
                $bool = true;
            }
            $scope.obj_st[$id] = $bool;
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
        }
        $scope.selectAllStudent = function ($num) {
            $scope.arrselect = [];
            for (var i = 0; i < $scope.name.length; i++) {
                if ($num) {
                    $scope.obj_st[$scope.name[i].studentid] = true;
                    $scope.arrselect.push($scope.name[i].studentid);
                    $scope.arrselectName.push($scope.name[i].firstname + " " + $scope.name[i].lastname);
                } else {
                    $scope.obj_st[$scope.name[i].studentid] = false;
                    $scope.arrselect = [];
                    $scope.arrselectName = [];
                }
            }
        }
        $scope.selectAllStudentINClass = function ($num) {
            $scope.arrselect = [];
            for (var i = 0; i < $scope.students_in_class.length; i++) {
                if ($num) {
                    $scope.obj_st[$scope.students_in_class[i].studentid] = true;
                    $scope.arrselect.push($scope.students_in_class[i].studentid);
                    $scope.arrselectName.push($scope.students_in_class[i].firstname + " " + $scope.students_in_class[i].lastname);
                } else {
                    $scope.obj_st[$scope.students_in_class[i].studentid] = false;
                    $scope.arrselect = [];
                    $scope.arrselectName = [];
                }
            }
        }

        $scope.submitSelect_St = function () {
            $scope.Main_Array = $scope.arrselect;
            $scope.dis_student = JSON.stringify($scope.arrselectName);

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

        $scope.setDisclineType = function () {
            $scope.obj_disType = {};
            if ($scope.Select_As == true) {
                for (var i = 0; i < $scope.enz_types.length; i++) {
                    if ($scope.enz_types[i].owner == 2)
                        $scope.obj_disType[$scope.enz_types[i].disciplinetypeid] = true;
                }
            } else {
                for (var i = 0; i < $scope.enz_types.length; i++) {
                    if ($scope.enz_types[i].owner == 3)
                        $scope.obj_disType[$scope.enz_types[i].disciplinetypeid] = true;
                }
            }
        }
        $scope.filterByType = function ($num) {
            $scope.obj_disType = {};
            for (var i = 0; i < $scope.enz_types.length; i++) {
                if ($num == 1 || $num == 0) {
                    if ($scope.enz_types[i].type == $num) {
                        if ($scope.Select_As == true) {
                            if ($scope.showAlltype == true) {
                                $scope.obj_disType[$scope.enz_types[i].disciplinetypeid] = true;
                            } else {
                                if ($scope.enz_types[i].owner ==  localStorage.userType) {
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
                } else {
                    if ($scope.Select_As == true) {
                        if ($scope.showAlltype == true) {
                            $scope.obj_disType[$scope.enz_types[i].disciplinetypeid] = true;
                        } else {
                            if ($scope.enz_types[i].owner ==  localStorage.userType) {
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
        $scope.submitDisciplineType = function () {
            $scope.the_dis_Id = $scope.tmp_the_dis_Id;
            $scope.the_dis_Name = $scope.tmp_the_dis_Name;
            $scope.dis_type = $scope.the_dis_Name;
        }
        $scope.InsertDiscipline = function () {
            if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
                if ($scope.Select_As == true) {
                    //معاون
                    if (($scope.Main_Array.length != 0) && ($scope.the_dis_Id) && ($scope.dis_date)) {
                        var ins_array = [];
                        for (var i = 0; i < $scope.Main_Array.length; i++) {
                            var ins_dis = {
                                ViewName: "InsertDiscipline",
                                parameters: [
                                    {key: "%studentid", value: $scope.Main_Array[i] + ''},
                                    {key: "%disciplinetypeid", value: $scope.the_dis_Id + ''},
                                    {key: "%teacherid", value: localStorage.userId + ''},
                                    {
                                        key: "%createdAt",
                                        value: moment($scope.dis_date, 'jYYYY-jM-jD').format('YYYY-M-D') + ''
                                    },
                                    {key: "%schoolid", value: localStorage.schoolId + ''},
                                    {key: "%classlessonteacherid", value: '-1'},
                                    {key: "%sessionid", value: 0 + ''},
                                ]
                            };
                            ins_array.push(ins_dis);
                        }
                    } else {
                        if ($scope.Main_Array.length == 0) {
                            $scope.eroretext = "دانش آموزان";
                        } else if (!$scope.dis_type) {
                            $scope.eroretext = "نوع انضباط";
                        } else if (!$scope.dis_date) {
                            $scope.eroretext = "تاریخ درج انضباط";
                        }
                        return;
                    }
                } else {
                    //معلم
                    if (($scope.Main_Array.length != 0) && ($scope.the_dis_Id) && ($scope.dis_date) && ($scope.classLessonId)) {
                        var ins_array = [];
                        for (var i = 0; i < $scope.Main_Array.length; i++) {
                            var ins_dis = {
                                ViewName: "InsertDiscipline",
                                parameters: [
                                    {key: "%studentid", value: $scope.Main_Array[i] + ''},
                                    {key: "%disciplinetypeid", value: $scope.the_dis_Id + ''},
                                    {key: "%teacherid", value: $scope.classLesson_teacherID + ''},
                                    {
                                        key: "%createdAt",
                                        value: moment($scope.dis_date, 'jYYYY-jM-jD').format('YYYY-M-D') + ''
                                    },
                                    {key: "%schoolid", value: localStorage.schoolId + ''},
                                    {key: "%classlessonteacherid", value: $scope.classlessonteacherid + ''},
                                    {key: "%sessionid", value: 0 + ''},
                                ]
                            };
                            ins_array.push(ins_dis);
                        }
                    } else {
                        if ($scope.Main_Array.length == 0) {
                            $scope.eroretext = "دانش آموزان";
                        } else if (!$scope.dis_type) {
                            $scope.eroretext = "نوع انضباط";
                        } else if (!$scope.dis_date) {
                            $scope.eroretext = "تاریخ درج انضباط";
                        } else if (!$scope.classLessonId) {
                            $scope.eroretext = "کلاس درس";
                        }
                        return;
                    }
                }

                $http.post(URL_ARRAY_INSERT, JSON.stringify(ins_array))
                    .success(function (result, status, headers, config) {
                        alert("درج انضباط دانش آموزان با موفقیت انجام شد. ");
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("درج انضباط با خطا مواجه شد.");
                    document.location.reload();
                });
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

        $scope.setDay = function ($value, $name) {
            $scope.thisData = $scope.weekData[$value];
            $scope.actDayId = $value;
            $scope.actDayName = $name;
            $scope.obj[$value] = true;
            var wct = {
                ViewName: "WeeklyscheduleTeacher",
                parameters: [
                    {key: "%schoolid", value: localStorage.schoolId},
                    {key: "%teacherid", value: localStorage.userId}

                ],
                mutualTransaction: {
                    kendoDataRequest: {
                        filter: {
                            field: "day",
                            logic: "and",
                            operator: "eq",
                            value: $value + ""
                        },
                    }
                }
            }
            $http.post(URL_GET, JSON.stringify(wct))
                .success(function (result, status, headers, config) {
                    $scope.WeeklyscheduleTeachers = result.data;
                });
        }
        try {
            var thisDay = moment().weekday();
            if (thisDay == '6') {
                thisDay = 0;
                $scope.setDay($scope.week[thisDay].value, $scope.week[thisDay].name);
            } else {
                thisDay += 1;
                $scope.setDay($scope.week[thisDay].value, $scope.week[thisDay].name);
            }
        }
        catch (e) {

        }

        $scope.Setweeklyschedule = function ($id) {
            var wct = {
                ViewName: "SessionSelect",
                parameters: [
                    {key: "%date", value: moment($scope.thisData, 'jYYYY-jM-jD').format('YYYY-M-D')},
                    {key: "%weeklyscheduleid", value: $id},
                ],
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
            $http.post(URL_GET, JSON.stringify(wct))
                .success(function (result, status, headers, config) {
                    $scope.thisWeekly = result.data;
                    if ($scope.thisWeekly.length == 0 || $scope.thisWeekly == null || $scope.thisWeekly == undefined) {
                        $scope.weeklyId = $id;
                        $scope.scholtype = JSON.parse(localStorage.schoolBase);
                        for (var i = 0; i < $scope.scholtype.length; i++) {
                            if ($scope.scholtype[i] >= 1 && $scope.scholtype[i] <= 6) {
                                // console.log("ابتدایی");
                            } else if ($scope.scholtype[i] >= 7 && $scope.scholtype[i] <= 9) {
                                // console.log("راهنمایی");
                            } else if ($scope.scholtype[i] >= 10 && $scope.scholtype[i] <= 12) {
                                // console.log("دبیرستان");
                                $scope.isPodemany = true;
                            }
                        }
                        $("#myModal").modal();
                    } else {
                        $('.modal').modal('hide');
                        document.location.replace("#/app/page/Session/" + $id + "/" + moment($scope.thisData, 'jYYYY-jM-jD').format('YYYY-M-D'));
                    }
                });


        }

        $scope.insert_jlse = function () {
            if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
                var pod = 0;
                if ($scope.isPodemany) {
                    if ($scope.sessionPodmany == true) {
                        pod = 1;
                    }
                }
                if (($scope.jls_name) && ($scope.jls_type)) {
                    var ins_jls = {
                        ViewName: "SessionInsert",
                        parameters: [
                            {key: "%title", value: $scope.jls_name + ''},
                            {key: "%sessiontypeid", value: $scope.jls_type + ''},
                            {key: "%weeklyscheduleid", value: $scope.weeklyId + ''},
                            {key: "%date", value: moment($scope.thisData, 'jYYYY-jM-jD').format('YYYY-M-D')},
                            {key: "%ispoodeman", value: pod + ''},
                        ]
                    };
                    $http.post(URL_INSERT, JSON.stringify(ins_jls))
                        .success(function (result, status, headers, config) {
                            $('.modal').modal('hide');
                            document.location.replace("#/app/page/Session/" + $scope.weeklyId + "/" + moment($scope.thisData, 'jYYYY-jM-jD').format('YYYY-M-D'));
                        }).error(function (result, status, header, config) {
                        alert("ساخت جلسه با خطا مواجه شد.");
                        document.location.reload();
                    });
                } else {
                    if (!$scope.jls_name) {
                        $scope.eroretext = "عنوان جلسه";
                    } else if (!$scope.jls_type) {
                        $scope.eroretext = "نوع جلسه";
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
        
        $scope.clearWizard = function () {
            var wiz = {
                ViewName: "WizarderClear",
                parameters: [
                    {key: "%schoolid", value: localStorage.schoolId+ ''},
                ]
            };
            $http.post(URL_INSERT, JSON.stringify(wiz))
                .success(function (result, status, headers, config) {
                    $scope.showWiz = false;
                }).error(function (result, status, header, config) {
                console.log("error");
                document.location.reload();
            });
        }
    }
    ]
);
