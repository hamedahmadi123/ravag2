app.controller('Session', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {
        $scope.classlessonteacherid = "";
        $scope.weekly_id = "";
        $scope.weekly_date = "";
        $scope.this_st_id = "";
        $scope.this_st_name = "";
        $scope.this_st_img = "";
        $scope.this_st_index = "";
        $scope.next = false;
        $scope.eroretext = "";
        $scope.prv = false;
        $scope.sessionId = "";
        $scope.thisSessionDate = "";
        $scope.isTosify = false;
        $scope.isPodemany = false;
        $scope.edit_enz = false;
        $scope.edit_point = false;
        $scope.edit_gheybat = false;
        $scope.edit_score = false;
        $scope.this_enz_id = "";
        $scope.this_point_id = "";
        $scope.this_score_id = "";
        $scope.this_geybat_id = "";
        $scope.teacherId = "";
        $scope.snackText = "";
        $scope.arrTosify = [
            {"value": 0, "name": "خیلی خوب"},
            {"value": 1, "name": "خوب"},
            {"value": 2, "name": "قابل قبول"},
            {"value": 3, "name": "نیاز به تلاش بیشتر"},
        ];
        $scope.arrPodeman = [
            {"value": 1, "name": "پودمان 1"},
            {"value": 2, "name": "پودمان 2"},
            {"value": 3, "name": "پودمان 3"},
            {"value": 4, "name": "پودمان 4"},
            {"value": 5, "name": "پودمان 5"},
        ];
        funcn();

        function funcn() {
            myVar = setTimeout(myfunction, 300);
        }

        function myfunction() {
            var full_url = document.URL;
            var url_array = full_url.split('/')
            $scope.weekly_id = url_array[url_array.length - 2];
            $scope.weekly_date = url_array[url_array.length - 1];
            var dash = $scope.weekly_date.search("-");
            var viewname = "";
            if (dash == '-1') {
                viewname = "SessionSelect_";
            } else {
                viewname = "SessionSelect";
            }
            var wct = {
                ViewName: viewname,
                parameters: [
                    {key: "%date", value: $scope.weekly_date},
                    {key: "%weeklyscheduleid", value: $scope.weekly_id},
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
                    $scope.thisWeekly = result.data[0];
                    $scope.classlessonteacherid = $scope.thisWeekly.classlessonteacherid;
                    $scope.teacherId = $scope.thisWeekly.teacherid;
                    $scope.thisSessionDate = moment($scope.thisWeekly.createdAt, 'YYYY-M-D').format('jYYYY-jM-jD');
                    if ($scope.thisWeekly.ispoodeman == '1' && $scope.thisWeekly.poodemani == '1') {
                        $scope.isPodemany = true;
                    } else if ($scope.thisWeekly.isdescriptive == '1') {
                        $scope.isTosify = true;
                    }
                    $scope.sessionId = $scope.thisWeekly.sessionid

                    $scope.StudentsClass();


                });
            var enz = {
                ViewName: "DisciplineTypeSelect",
                mutualTransaction: {
                    kendoDataRequest: {
                        filter: {
                            field: "owner", logic: "and", operator: "eq", value: "3"
                            , filters: [
                                {field: "roleid", logic: "and", operator: "eq", value: "1"}
                            ]

                        },
                    }
                }
            }
            $http.post(URL_GET, JSON.stringify(enz))
                .success(function (result, status, headers, config) {
                    $scope.enzStDetial = result.data;
                });

            var point = {
                ViewName: "pointtypeSelect",
                mutualTransaction: {
                    kendoDataRequest: {
                        filter: {
                            field: "roleid", logic: "and", operator: "eq", value: "2"
                        },
                    }
                }
            }
            $http.post(URL_GET, JSON.stringify(point))
                .success(function (result, status, headers, config) {
                    $scope.teacherPoints = result.data;
                    console.log($scope.teacherPoints);
                });

        }

        $scope.StudentsClass = function () {
            var class_student = {
                ViewName: "SelectStudentandscoreInClass",
                mutualTransaction: {
                    kendoDataRequest: {
                        filter: {
                            field: "weeklyscheduleid",
                            logic: "and",
                            operator: "eq",
                            value: $scope.weekly_id + ''
                        },
                    }
                }
            }
            $http.post(URL_GET, JSON.stringify(class_student))
                .success(function (result, status, headers, config) {
                    for (let i = 0; i < result.data.length; i++) {
                        result.data[i].index = i;
                    }
                    $scope.studentClass = result.data;


                });
        }

        $scope.returnTosifyNomre = function ($num) {
            if ($num == '0') {
                return "خیلی خوب";
            } else if ($num == '1') {
                return "خوب";
            } else if ($num == '2') {
                return "قابل قبول";
            } else if ($num == '3') {
                return "نیاز به تلاش بیشتر";
            }
        }
        $scope.selectLessonTeacher = function () {
            var wsl = {
                ViewName: "WeeklyschedulesessionSelect",
                parameters: [
                    {key: "%weeklyscheduleid", value: $scope.weekly_id},
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
            $http.post(URL_GET, JSON.stringify(wsl))
                .success(function (result, status, headers, config) {
                    $scope.lessonTeachers = result.data;
                    console.log($scope.lessonTeachers);
                });
        }
        $scope.returnDate = function ($date) {
            return moment($date, 'YYYY-M-D').format('jYYYY-jM-jD');
        }
        $scope.gotoSession = function ($weeklyid, $date) {
            $('.modal').modal('hide');
            document.location.replace("#/app/page/Session/" + $weeklyid + "/" + $date);
        }
        $scope.selectStu = function ($index) {
            $scope.resetStData();
            $scope.this_st_id = $scope.studentClass[$index].studentid;
            $scope.this_st_name = $scope.studentClass[$index].firstname + " " + $scope.studentClass[$index].lastname;
            $scope.this_st_img = $scope.studentClass[$index].image;
            $scope.this_st_index = $scope.studentClass[$index].index;
            var index1 = parseInt($scope.this_st_index);
            if (index1 <= 0 || index1 == undefined || index1 == 'undefined') {
                $scope.prv = true;
            } else {
                if ((++index1) == $scope.studentClass.length) {
                    $scope.next = true;
                }
            }
            $scope.sesseionStudents();
        }
        $scope.nextStudent = function () {
            $scope.resetStData();
            var index1 = parseInt($scope.this_st_index + 1);
            if (index1 < $scope.studentClass.length) {
                if ((index1 + 1) == $scope.studentClass.length) {
                    $scope.next = true;
                } else {
                    $scope.next = false;
                }
                $scope.prv = false;
                $scope.this_st_id = $scope.studentClass[index1].studentid;
                $scope.this_st_name = $scope.studentClass[index1].firstname + " " + $scope.studentClass[index1].lastname;
                $scope.this_st_img = $scope.studentClass[index1].image;
                $scope.this_st_index = $scope.studentClass[index1].index;
                $scope.sesseionStudents();
            } else {
                $scope.next = true;
            }
        }
        $scope.prvStudent = function () {
            $scope.resetStData();
            var index2 = parseInt($scope.this_st_index - 1);
            if (index2 >= 0) {
                if (index2 == 0) {
                    $scope.prv = true;
                } else {
                    $scope.prv = false;
                }
                $scope.next = false;
                $scope.this_st_id = $scope.studentClass[index2].studentid;
                $scope.this_st_name = $scope.studentClass[index2].firstname + " " + $scope.studentClass[index2].lastname;
                $scope.this_st_img = $scope.studentClass[index2].image;
                $scope.this_st_index = $scope.studentClass[index2].index;
                $scope.sesseionStudents();
            } else {
                $scope.prv = true;
            }
        }
        $scope.sesseionStudents = function () {
            var sessionSt = [
                {
                    ViewName: "AttendanceSelect",
                    parameters: [
                        {key: "%sessionId", value: $scope.sessionId},
                        {key: "%studentid", value: $scope.this_st_id},]
                },
                {
                    ViewName: "DisciplineSelect",
                    parameters: [
                        {key: "%sessionId", value: $scope.sessionId},
                        {key: "%studentid", value: $scope.this_st_id},]
                },
                {
                    ViewName: "ScoreSelect",
                    parameters: [
                        {key: "%sessionId", value: $scope.sessionId},
                        {key: "%studentid", value: $scope.this_st_id},]
                },
                {
                    ViewName: "PointSelect",
                    parameters: [
                        {key: "%sessionId", value: $scope.sessionId},
                        {key: "%studentid", value: $scope.this_st_id},]
                },
                {
                    ViewName: "SelectPointValue",
                    parameters: [
                        {key: "%studentid", value: $scope.this_st_id},]
                }
            ]
            $http.post(URL_GET, JSON.stringify(sessionSt))
                .success(function (result, status, headers, config) {
                    $scope.sessionStudent = result;
                    console.log($scope.sessionStudent);
                    //نمره
                    try {
                        $scope.this_st_score = result.ScoreSelect.data[0];
                        $scope.this_score_id = $scope.this_st_score.scoreid;
                        //پودمانی
                        if ($scope.isPodemany == true) {
                            $scope.ss_tosifi_type = parseFloat($scope.this_st_score.poodemaniType);
                            $scope.ss_podeman_1 = parseFloat($scope.this_st_score.value);
                            $scope.ss_podeman_2 = parseFloat($scope.this_st_score.value2);
                        }
                        //توصیفی
                        else if ($scope.isTosify == true) {
                            $scope.ss_tosifi_nomre = parseFloat($scope.this_st_score.value);
                        }
                        //عادی
                        else {
                            $scope.ss_nomre = parseFloat($scope.this_st_score.value);
                        }
                        if ($scope.this_st_score.length != 0 || $scope.this_st_score != undefined || $scope.this_st_score != null)
                            $scope.edit_score = true;
                        else
                            $scope.edit_score = false;
                    } catch (e) {
                        $scope.edit_score = false;
                    }
                    //امتیاز
                    try {
                        $scope.this_st_point = result.PointSelect.data[0];
                        $scope.this_point_id = $scope.this_st_point.pointsid;
                        $scope.ss_point = $scope.this_st_point.pointTypeid;
                        $scope.ss_note = $scope.this_st_point.comment;
                        if ($scope.this_st_point.length != 0 || $scope.this_st_point != undefined || $scope.this_st_point != null)
                            $scope.edit_point = true;
                        else
                            $scope.edit_point = false;
                    } catch (e) {
                        $scope.edit_point = false;
                    }
                    //انضباط
                    try {
                        $scope.this_st_discipline = result.DisciplineSelect.data[0];
                        $scope.this_enz_id = $scope.this_st_discipline.disciplineid
                        $scope.ss_enzebat = $scope.this_st_discipline.disciplinetypeid;
                        if ($scope.this_st_discipline.length != 0 || $scope.this_st_discipline != undefined || $scope.this_st_discipline != null)
                            $scope.edit_enz = true;
                        else
                            $scope.edit_enz = false;

                    } catch (e) {
                        $scope.edit_enz = false;
                    }
                    //حضور و غیاب
                    try {
                        $scope.this_st_attendance = result.AttendanceSelect.data[0];
                        $scope.this_geybat_id = $scope.this_st_attendance.Attendanceid;
                        if ($scope.this_st_attendance.isabsent == '0') {
                            $scope.ss_geibat = false;
                        } else if ($scope.this_st_attendance.isabsent == '1') {
                            $scope.ss_geibat = true;
                        }
                        if ($scope.this_st_attendance.length != 0 || $scope.this_st_attendance != undefined || $scope.this_st_attendance != null) {
                            $scope.edit_gheybat = true;
                        } else {
                            $scope.edit_gheybat = false;
                        }

                    } catch (e) {
                        $scope.ss_geibat = true;
                    }
                    //مقدار امتیاز
                    try {
                        $scope.this_st_pointValue = result.SelectPointValue.data[0];
                        console.log($scope.this_st_pointValue);
                        var gifts = {
                            ViewName: "SelectGiftpoint",
                            mutualTransaction: {
                                kendoDataRequest: {
                                    filter: {
                                        field: "point",
                                        logic: "and",
                                        operator: "lt",
                                        value: $scope.this_st_pointValue.Amount_Owed + ""
                                    },
                                }
                            }
                        }
                        $http.post(URL_GET, JSON.stringify(gifts))
                            .success(function (result, status, headers, config) {
                                $scope.gifts = result.data;
                                console.log($scope.gifts);
                            });
                    } catch (e) {

                    }
                });
        }
        $scope.resetStData = function () {
            $scope.ss_geibat = true;
            $scope.ss_enzebat = "";
            $scope.ss_point = "";
            $scope.ss_note = "";
            $scope.ss_nomre = "";
            $scope.ss_tosifi_type = "";
            $scope.ss_podeman_1 = "";
            $scope.ss_podeman_2 = "";
            $scope.ss_tosifi_nomre = "";
            $scope.edit_score = false;
            $scope.edit_point = false;
            $scope.edit_gheybat = false;
            $scope.edit_enz = false;
        }
        $scope.key = function ($event) {
            if ($event.keyCode == 39)
                $scope.nextStudent();
            else if ($event.keyCode == 37)
                $scope.prvStudent();
            else if ($event.keyCode == 27)
                $('.modal').modal('hide');
        }
        $scope.errText = function () {
            return $scope.eroretext;
        }
        $scope.showAlert = function ($text) {
            $scope.snackText = $text;
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function () {
                x.className = x.className.replace("show", "");
            }, 3000);
        }
        //درج نمره
        $scope.insertScore = function () {
            if ($scope.isPodemany == true && $scope.isPodemany != undefined) {
                //پودمانی
                if (($scope.ss_podeman_1) && ($scope.ss_podeman_2) && ($scope.ss_tosifi_type)) {
                    var ins_score = {
                        ViewName: "ScorePoodemaniInsert",
                        parameters: [
                            {key: "%sessionid", value: $scope.sessionId + ''},
                            {key: "%studentid", value: $scope.this_st_id + ''},
                            {key: "%value1", value: parseFloat($scope.ss_podeman_1)},
                            {key: "%value2", value: parseFloat($scope.ss_podeman_2)},
                            {key: "%poodemaniType", value: $scope.ss_tosifi_type + ''},
                        ]
                    };
                    $http.post(URL_INSERT, JSON.stringify(ins_score))
                        .success(function (result, status, headers, config) {
                            $scope.StudentsClass();
                            $scope.showAlert("نمره پودمانی این دانش آموز");
                        }).error(function (result, status, header, config) {
                        alert("درج نمره برای این دانش آموز با خطا مواجه شد.");
                        document.location.reload();
                    });
                } else {
                    if (!$scope.ss_podeman_1) {
                        $scope.eroretext = "نمره شایستگی دانش آموز";
                    } else if (!$scope.ss_podeman_2) {
                        $scope.eroretext = " نمره مستمر دانش آموز";
                    } else if (!$scope.ss_tosifi_type) {
                        $scope.eroretext = "پودمان";
                    }
                }
            } else {
                //عادی
                if (!($scope.isPodemany) && !($scope.isTosify)) {
                    if (($scope.ss_nomre)) {
                        var ins_score = {
                            ViewName: "ScoreInsert",
                            parameters: [
                                {key: "%sessionid", value: $scope.sessionId + ''},
                                {key: "%studentid", value: $scope.this_st_id + ''},
                                {key: "%value", value: parseFloat($scope.ss_nomre)},
                            ]
                        };
                    } else {
                        if (!$scope.ss_nomre) {
                            $scope.eroretext = "نمره دانش آموز";
                        }
                    }
                }
                //توصیفی
                else if (!($scope.isPodemany) && ($scope.isTosify)) {
                    if (($scope.ss_tosifi_nomre)) {
                        var ins_score = {
                            ViewName: "ScoreInsert",
                            parameters: [
                                {key: "%sessionid", value: $scope.sessionId + ''},
                                {key: "%studentid", value: $scope.this_st_id + ''},
                                {key: "%value", value: parseFloat($scope.ss_tosifi_nomre)},
                            ]
                        };
                    } else {
                        if (!$scope.ss_tosifi_nomre) {
                            $scope.eroretext = "نمره توصیفی دانش آموز";
                        }
                    }
                }
                $http.post(URL_INSERT, JSON.stringify(ins_score))
                    .success(function (result, status, headers, config) {
                        $scope.StudentsClass();
                        $scope.showAlert("نمره این دانش آموز");
                    }).error(function (result, status, header, config) {
                    alert("درج نمره برای این دانش آموز با خطا مواجه شد.");
                    document.location.reload();
                });
            }
        }
        //درج امتیاز
        $scope.pointsInsert = function () {
            if (($scope.ss_point)) {
                var ins_point = {
                    ViewName: "pointsInsert",
                    parameters: [
                        {key: "%sessionid", value: $scope.sessionId + ''},
                        {key: "%studentid", value: $scope.this_st_id + ''},
                        {key: "%pointTypeid", value: $scope.ss_point + ''},
                        {key: "%comment", value: $scope.ss_note || '' + ''},
                        {key: "%type", value: '0'},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(ins_point))
                    .success(function (result, status, headers, config) {
                        $scope.StudentsClass();
                        $scope.showAlert("امتیاز برای دانش آموز");
                    }).error(function (result, status, header, config) {
                    alert("درج امتیاز برای این دانش آموز با خطا مواجه شد.");
                    document.location.reload();
                });
            } else {
                if (!$scope.ss_nomre) {
                    $scope.eroretext = "امتیاز دانش آموز";
                }
            }
        }
        //درج انصباط
        $scope.DisciplineInsert = function () {
            if (($scope.ss_enzebat)) {
                var ins_Discipline = {
                    ViewName: "InsertDiscipline",
                    parameters: [
                        {key: "%classlessonteacherid", value: $scope.classlessonteacherid + ''},
                        {key: "%studentid", value: $scope.this_st_id + ''},
                        {key: "%disciplinetypeid", value: $scope.ss_enzebat + ''},
                        {key: "%teacherid", value: $scope.teacherId + ''},
                        {key: "%schoolid", value: localStorage.schoolId + ''},
                        {key: "%createdAt", value: moment().subtract(1, 'days').format('YYYY-MM-DD h:mm:ss ') + ''},
                        {key: "%sessionid", value: $scope.sessionId || '0' + ''},
                    ]
                };
                alert(JSON.stringify(ins_Discipline));
                $http.post(URL_INSERT, JSON.stringify(ins_Discipline))
                    .success(function (result, status, headers, config) {
                        $scope.showAlert("انضباط برای دانش آموز");
                    }).error(function (result, status, header, config) {
                    alert("درج انضباط برای این دانش آموز با خطا مواجه شد.");
                    document.location.reload();
                });
            } else {
                if (!$scope.ss_enzebat) {
                    $scope.eroretext = "انضباط دانش آموز";
                }
            }
        }
        //درج غیبت
        $scope.attendanceInsert = function ($bool) {
            if ($scope.edit_gheybat == true) {
                $scope.attendanceUpdate($scope.this_geybat_id, $bool);
            } else {
                var absent = 1;
                if ($bool == false || $bool == undefined) {
                    absent = 0;
                } else {
                    absent = 1;
                }
                var ins_attendance = {
                    ViewName: "attendanceInsert",
                    parameters: [
                        {key: "%sessionid", value: $scope.sessionId + ''},
                        {key: "%studentid", value: $scope.this_st_id + ''},
                        {key: "%isabsent", value: absent + ''},
                        {key: "%isillegal", value: '1'},
                        {key: "%schoolid", value: localStorage.schoolId},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(ins_attendance))
                    .success(function (result, status, headers, config) {
                        $scope.showAlert("غیبت این دانش آموز");
                    }).error(function (result, status, header, config) {
                    alert("درج غیبت برای این دانش آموز با خطا مواجه شد.");
                    document.location.reload();
                });
            }
        }
        //درج جایزه
        $scope.giftInsert = function () {
            if (($scope.ss_gifts)) {
                var ins_gif = {
                    ViewName: "pointsInsert",
                    parameters: [
                        {key: "%sessionid", value: $scope.sessionId + ''},
                        {key: "%studentid", value: $scope.this_st_id + ''},
                        {key: "%pointTypeid", value: $scope.ss_gifts + ''},
                        {key: "%comment", value: ''},
                        {key: "%type", value: 1},
                    ]
                };
                alert(JSON.stringify(ins_gif));
                $http.post(URL_INSERT, JSON.stringify(ins_gif))
                    .success(function (result, status, headers, config) {
                        $scope.sesseionStudents();
                        $scope.showAlert("جایزه برای دانش آموز");
                    }).error(function (result, status, header, config) {
                    alert("درج جایزه برای این دانش آموز با خطا مواجه شد.");
                    document.location.reload();
                });
            } else {
                if (!$scope.ss_gifts) {
                    $scope.eroretext = "جایزه ارایه شده";
                }
            }
        }
        //ویرایش نمره
        $scope.ScoreUpdate = function () {
            if ($scope.isPodemany == true && $scope.isPodemany != undefined) {
                //پودمانی
                if (($scope.ss_podeman_1) && ($scope.ss_podeman_2) && ($scope.ss_tosifi_type)) {
                    var upd_score_podeman = {
                        ViewName: "ScorePoodemaniUpdate",
                        parameters: [
                            {key: "%scoreid", value: $scope.this_score_id + ''},
                            {key: "%value1", value: parseFloat($scope.ss_podeman_1)},
                            {key: "%value2", value: parseFloat($scope.ss_podeman_2)},
                            {key: "%poodemaniType", value: $scope.ss_tosifi_type + ''},
                        ]
                    };
                    $http.post(URL_INSERT, JSON.stringify(upd_score_podeman))
                        .success(function (result, status, headers, config) {
                            $scope.StudentsClass();
                            $scope.showAlert("ویرایش نمره دانش آموز");
                        }).error(function (result, status, header, config) {
                        alert("ویرایش نمره برای این دانش آموز با خطا مواجه شد.");
                        document.location.reload();
                    });
                } else {
                    if (!$scope.ss_podeman_1) {
                        $scope.eroretext = "نمره شایستگی دانش آموز";
                    } else if (!$scope.ss_podeman_2) {
                        $scope.eroretext = " نمره مستمر دانش آموز";
                    } else if (!$scope.ss_tosifi_type) {
                        $scope.eroretext = "پودمان";
                    }
                }
            } else {
                //عادی
                if (!($scope.isPodemany) && !($scope.isTosify)) {
                    if (($scope.ss_nomre)) {
                        var upd_score = {
                            ViewName: "ScoreUpdate",
                            parameters: [
                                {key: "%scoreid", value: $scope.this_score_id + ''},
                                {key: "%value", value: parseFloat($scope.ss_nomre)},
                            ]
                        };
                    } else {
                        if (!$scope.ss_nomre) {
                            $scope.eroretext = "نمره دانش آموز";
                        }
                    }
                }
                //توصیفی
                else if (!($scope.isPodemany) && ($scope.isTosify)) {
                    if (($scope.ss_tosifi_nomre)) {
                        var upd_score = {
                            ViewName: "ScoreUpdate",
                            parameters: [
                                {key: "%scoreid", value: $scope.this_score_id + ''},
                                {key: "%value", value: parseFloat($scope.ss_tosifi_nomre)},
                            ]
                        };
                    } else {
                        if (!$scope.ss_tosifi_nomre) {
                            $scope.eroretext = "نمره توصیفی دانش آموز";
                        }
                    }
                }
                $http.post(URL_INSERT, JSON.stringify(upd_score))
                    .success(function (result, status, headers, config) {
                        $scope.StudentsClass();
                        $scope.showAlert("ویرایش نمره دانش آموز");
                    }).error(function (result, status, header, config) {
                    alert("ویرایش نمره برای این دانش آموز با خطا مواجه شد.");
                    document.location.reload();
                });
            }
        }
        //حذف نمره
        $scope.ScoreDelete = function () {
            var delScore = {
                ViewName: "DeleteScoreSession",
                parameters: [
                    {key: "%sessionId", value: $scope.sessionId + ''},
                    {key: "%studentid", value: $scope.this_st_id + ''},
                ]
            };
            $http.post(URL_INSERT, JSON.stringify(delScore))
                .success(function (result, status, headers, config) {
                    $scope.StudentsClass();
                    $scope.showAlert("حذف نمره دانش آموز");
                }).error(function (result, status, header, config) {
                alert("حذف نمره برای این دانش آموز با خطا مواجه شد.");
                document.location.reload();
            });
        }
        //ویرایش امتیاز
        $scope.pointsUpdate = function () {
            if (($scope.ss_point)) {
                var upd_score = {
                    ViewName: "PointUpdate",
                    parameters: [
                        {key: "%pointsid", value: $scope.this_point_id + ''},
                        {key: "%pointTypeid", value: $scope.ss_point + ''},
                        {key: "%comment", value: $scope.ss_note || '' + ''},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(upd_score))
                    .success(function (result, status, headers, config) {
                        $scope.showAlert("ویرایش امتیاز دانش آموز");
                    }).error(function (result, status, header, config) {
                    alert("ویرایش امتیاز برای این دانش آموز با خطا مواجه شد.");
                    document.location.reload();
                });
            } else {
                if (!$scope.ss_nomre) {
                    $scope.eroretext = "امتیاز دانش آموز";
                }
            }
        }
        //حذف امتیاز
        $scope.pointDelete = function () {
            var del_point = {
                ViewName: "DeletePointSession",
                parameters: [
                    {key: "%sessionId", value: $scope.sessionId + ''},
                    {key: "%studentid", value: $scope.this_st_id + ''},
                ]
            };
            $http.post(URL_INSERT, JSON.stringify(del_point))
                .success(function (result, status, headers, config) {
                    $scope.showAlert("حذف امتیاز دانش آموز");
                }).error(function (result, status, header, config) {
                alert("حذف امتیاز برای این دانش آموز با خطا مواجه شد.");
                document.location.reload();
            });
        }
        //ویرایش انصباط
        $scope.DisciplineUpdate = function () {
            if (($scope.ss_enzebat)) {
                var upd_Discipline = {
                    ViewName: "DisciplineUpdate",
                    parameters: [
                        {key: "%disciplineid", value: $scope.this_enz_id + ''},
                        {key: "%disciplinetypeid", value: $scope.ss_enzebat + ''},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(upd_Discipline))
                    .success(function (result, status, headers, config) {
                        $scope.showAlert("ویرایش انضباط دانش آموز");
                    }).error(function (result, status, header, config) {
                    alert("ویرایش انضباط برای این دانش آموز با خطا مواجه شد.");
                    document.location.reload();
                });
            } else {
                if (!$scope.ss_enzebat) {
                    $scope.eroretext = "انضباط دانش آموز";
                }
            }
        }
        //حذف انضباط
        $scope.DisciplineDelete = function () {
            var del_Discipline = {
                ViewName: "DeleteDiscipline",
                parameters: [
                    {key: "%disciplineid", value: $scope.this_enz_id + ''},
                ]
            };
            $http.post(URL_INSERT, JSON.stringify(del_Discipline))
                .success(function (result, status, headers, config) {
                    $scope.showAlert("حذف انضباط دانش آموز");
                }).error(function (result, status, header, config) {
                alert("حذف انضباط برای این دانش آموز با خطا مواجه شد.");
                document.location.reload();
            });
        }
        //ویرایش غیبت
        $scope.attendanceUpdate = function ($id, $bool) {
            var absent = 1;
            if ($bool == false || $bool == undefined) {
                absent = 0;
            } else {
                absent = 1;
            }
            var upd_attendance = {
                ViewName: "attendanceUpdate",
                parameters: [
                    {key: "%Attendanceid", value: $id + ''},
                    {key: "%isabsent", value: absent + ''},
                ]
            };
            $http.post(URL_INSERT, JSON.stringify(upd_attendance))
                .success(function (result, status, headers, config) {
                    $scope.showAlert("غیبت دانش آموز");
                }).error(function (result, status, header, config) {
                alert("ویرایش غیبت این دانش آموز با خطا مواجه شد.");
                document.location.reload();
            });
        }


    }]
);
