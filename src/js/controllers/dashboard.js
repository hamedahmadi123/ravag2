app.controller('dashboardCtrl', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {
        $scope.eroretext = "";
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
                            value: localStorage.userId + ''
                            ,
                            filters: [{field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ""}]
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
                localStorage.act_term_id = '1';
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
        var thisDay = moment().weekday();
        if (thisDay == '6') {
            thisDay = 0;
            $scope.setDay($scope.week[thisDay].value, $scope.week[thisDay].name);
        } else {
            thisDay += 1;
            $scope.setDay($scope.week[thisDay].value, $scope.week[thisDay].name);
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
                    alert(JSON.stringify(ins_jls));
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
    }
    ]
);
