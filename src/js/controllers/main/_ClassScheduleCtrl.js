var thisday = "";
var thiszang = "";
app.controller('ClassSchedule', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.techerLesson = [];
    $scope.cls_id = "";
    $scope.eroretext = "";
    $scope.data1 = [];
    $scope.obj = {};
    $scope.thechers = [];
    $scope.week = [
        // {"value": 0, "name": "روزها"},
        {"value": 0, "name": "شنبه"},
        {"value": 1, "name": "یکشنبه"},
        {"value": 2, "name": "دوشنبه"},
        {"value": 3, "name": "سه شنبه"},
        {"value": 4, "name": "چهارشنبه"},
        {"value": 5, "name": "پنجشنبه"}
    ];

    funcn();

    function funcn() {
        myVar = setTimeout(myfunction, 300);
    }

    function myfunction() {
        var full_url = document.URL;
        var url_array = full_url.split('/')
        $scope.cls_id = url_array[url_array.length - 1];
        var cls = {
            ViewName: "ClassSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ''
                        , filters: [
                            {field: "classid", logic: "and", operator: "eq", value: $scope.cls_id+''}
                        ]

                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(cls))
            .success(function (result, status, headers, config) {
                $scope.class = result.data[0];
                var msg = {
                    ViewName: "lesson_majorbaseSelect",
                    mutualTransaction: {
                        kendoDataRequest: {
                            filter: {
                                field: "majorbaseid",
                                logic: "and",
                                operator: "eq",
                                value: $scope.class.majorbaseid + ""
                            },

                        }
                    }
                }
                $http.post(URL_GET, JSON.stringify(msg))
                    .success(function (result, status, headers, config) {
                        for (let i = 0; i < result.data.length; i++) {
                            result.data[i].index = i;
                        }
                        $scope.lessons = result.data;
                    });

                try {
                    var wksch = {
                        ViewName: "WeeklyscheduleSelect",
                        mutualTransaction: {
                            kendoDataRequest: {
                                filter: {
                                    field: "classid",
                                    logic: "and",
                                    operator: "eq",
                                    value: $scope.class.classid + ""
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
                    console.log("no record");
                }
            });

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

        var th = {
            ViewName: "TeacherSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "schoolid",
                        logic: "and",
                        operator: "eq",
                        value: localStorage.schoolId+""
                    },

                }
            }
        }
        $http.post(URL_GET, JSON.stringify(th))
            .success(function (result, status, headers, config) {
                for (let i = 0; i < result.data.length; i++) {
                    result.data[i].index = i;
                }

                $scope.thechers = result.data;
            });
    }


    $scope.groupClass = function ($group) {
        if ($group == 0)
            return "خیر";
        else
            return "بلی";
    }

    $scope.resetData = function () {
        $scope.tl_techer = "";
        $scope.tl_drs = "";
        if ($scope.obj[thisday + "-" + thiszang]) {
            if ($scope.obj[thisday + "-" + thiszang]["child2"].teacherid) {
                $scope.tl_shift = true;
                for (let i = 0; i < $scope.thechers.length; i++) {
                    if ($scope.obj[thisday + "-" + thiszang]["child2"].teacherid === $scope.thechers[i].teacherid) {
                        $scope.tl_techer2 = $scope.thechers[i].index;
                        break;
                    }

                }
                for (let i = 0; i < $scope.lessons.length; i++) {
                    if ($scope.obj[thisday + "-" + thiszang]["child2"].lessonid === $scope.lessons[i].lessonid) {
                        $scope.tl_drs2 = $scope.lessons[i].index;
                        break;
                    }

                }
            }
            for (let i = 0; i < $scope.thechers.length; i++) {
                if ($scope.obj[thisday + "-" + thiszang]["child1"].teacherid === $scope.thechers[i].teacherid) {
                    $scope.tl_techer = $scope.thechers[i].index;
                    break;
                }

            }
            for (let i = 0; i < $scope.lessons.length; i++) {
                if ($scope.obj[thisday + "-" + thiszang]["child1"].lessonid === $scope.lessons[i].lessonid) {
                    $scope.tl_drs = $scope.lessons[i].index;
                    break;
                }

            }
        }

    }
    $scope.TestAngularMethod = function ($oldObj, $thisObj) {
        if ($oldObj === $thisObj)
            return;
        if ($scope.obj[$thisObj]) {
            //thisOBJ is fill
            try {
                if ($scope.obj[$oldObj]["child1"].teacherid) {
                    var del_weeklyschedule = {
                        ViewName: "WeeklyscheduleDelete",
                        parameters: [
                            {key: "%day", value: $scope.obj[$thisObj]["child1"].day + ''},
                            {key: "%zang", value: $scope.obj[$thisObj]["child1"].zang},
                            {key: "%classid", value: $scope.cls_id + ''},
                            {key: "%schoolid", value: localStorage.schoolId},
                        ]
                    };
                    $http.post(URL_INSERT, JSON.stringify(del_weeklyschedule))
                        .success(function (result, status, headers, config) {
                            if ($scope.obj[$oldObj]["child1"]) {
                                if ($scope.obj[$oldObj]["child2"].teacherid) {
                                    $scope.insertTecherLesson(
                                        true,
                                        $scope.obj[$oldObj]["child1"].teacherid,
                                        $scope.obj[$oldObj]["child1"].teacherName,
                                        $scope.obj[$oldObj]["child1"].lessonid,
                                        $scope.obj[$oldObj]["child1"].lessonName,
                                        $scope.obj[$oldObj]["child2"].teacherid,
                                        $scope.obj[$oldObj]["child2"].teacherName,
                                        $scope.obj[$oldObj]["child2"].lessonid,
                                        $scope.obj[$oldObj]["child2"].lessonName,
                                    );
                                } else if ($scope.obj[$oldObj]["child1"].teacherid) {
                                    $scope.insertTecherLesson(
                                        false,
                                        $scope.obj[$oldObj]["child1"].teacherid,
                                        $scope.obj[$oldObj]["child1"].teacherName,
                                        $scope.obj[$oldObj]["child1"].lessonid,
                                        $scope.obj[$oldObj]["child1"].lessonName,
                                    );
                                }
                            }
                        }).error(function (result, status, header, config) {
                        alert("حذف برنامه درسی فعلی با خطا مواجه شد.");
                        document.location.reload();
                    });
                }
            } catch (e) {
            }
        } else {
            //thisOBJ is null
            if ($scope.obj[$oldObj]["child1"]) {
                if ($scope.obj[$oldObj]["child2"].teacherid) {
                    $scope.insertTecherLesson(
                        true,
                        $scope.obj[$oldObj]["child1"].teacherid,
                        $scope.obj[$oldObj]["child1"].teacherName,
                        $scope.obj[$oldObj]["child1"].lessonid,
                        $scope.obj[$oldObj]["child1"].lessonName,
                        $scope.obj[$oldObj]["child2"].teacherid,
                        $scope.obj[$oldObj]["child2"].teacherName,
                        $scope.obj[$oldObj]["child2"].lessonid,
                        $scope.obj[$oldObj]["child2"].lessonName,
                    );
                } else if ($scope.obj[$oldObj]["child1"].teacherid) {
                    $scope.insertTecherLesson(
                        false,
                        $scope.obj[$oldObj]["child1"].teacherid,
                        $scope.obj[$oldObj]["child1"].teacherName,
                        $scope.obj[$oldObj]["child1"].lessonid,
                        $scope.obj[$oldObj]["child1"].lessonName,
                    );
                }
            }
        }
    };

    $scope.insertTecherLesson = function ($shift, $teacherid1, $teacherName1, $lessonId1, $lessonName1, $teacherid2, $teacherName2, $lessonId2, $lessonName2) {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($teacherid1) && ($lessonId1) && (thisday) && (thiszang)) {
                if ($scope.obj[thisday + "-" + thiszang]) {
                    if ($scope.obj[thisday + "-" + thiszang]["child2"].teacherid) {
                        var del_weeklyschedule1 = {
                            ViewName: "WeeklyscheduleDelete",
                            parameters: [
                                {key: "%day", value: $scope.obj[thisday + "-" + thiszang]["child2"].day + ''},
                                {key: "%zang", value: $scope.obj[thisday + "-" + thiszang]["child2"].zang},
                                {key: "%classid", value: $scope.cls_id + ''},
                                {key: "%schoolid", value: localStorage.schoolId},
                            ]
                        };
                        $http.post(URL_INSERT, JSON.stringify(del_weeklyschedule1))
                            .success(function (result, status, headers, config) {
                            }).error(function (result, status, header, config) {
                            alert("حذف برنامه درسی فعلی با خطا مواجه شد.");
                            document.location.reload();
                        });
                    }
                    if ($scope.obj[thisday + "-" + thiszang]["child1"].teacherid) {
                        var del_weeklyschedule2 = {
                            ViewName: "WeeklyscheduleDelete",
                            parameters: [
                                {key: "%day", value: $scope.obj[thisday + "-" + thiszang]["child1"].day + ''},
                                {key: "%zang", value: $scope.obj[thisday + "-" + thiszang]["child1"].zang},
                                {key: "%classid", value: $scope.cls_id + ''},
                                {key: "%schoolid", value: localStorage.schoolId},
                            ]
                        };
                        $http.post(URL_INSERT, JSON.stringify(del_weeklyschedule2))
                            .success(function (result, status, headers, config) {
                                $scope.obj[thisday + "-" + thiszang] = {
                                    child2: {},
                                    child1: {}
                                };
                                var tt = '0';

                                //if shift true ******************
                                if ($shift) {
                                    tt = '1';
                                    $scope.obj[thisday + "-" + thiszang]["child2"] = {
                                        teacherid: $teacherid2,
                                        teacherName: $teacherName2,
                                        lessonid: $lessonId2,
                                        lessonName: $lessonName2,
                                        classid: $scope.cls_id,
                                        schoolid: localStorage.schoolId,
                                        day: thisday,
                                        zang: thiszang,
                                        shift: tt,

                                    };
                                    if (($teacherid2) && ($lessonId2)) {
                                        var ins_weeklyschedule = {
                                            ViewName: "WeeklyscheduleInsert",
                                            parameters: [
                                                {key: "%teacherid", value: $teacherid2 + ''},
                                                {key: "%lessonid", value: $lessonId2 + ''},
                                                {key: "%classid", value: $scope.cls_id + ''},
                                                {key: "%schoolid", value: localStorage.schoolId},
                                                {key: "%day", value: thisday + ''},
                                                {key: "%zang", value: thiszang + ''},
                                                {key: "%shift", value: tt},
                                            ]
                                        };
                                        $http.post(URL_INSERT, JSON.stringify(ins_weeklyschedule))
                                            .success(function (result, status, headers, config) {
                                                $('#myModal').modal('hide');
                                            }).error(function (result, status, header, config) {
                                            alert("درج برنامه درسی  با خطا مواجه شد.");
                                            document.location.reload();
                                        });
                                    } else {
                                        if (!$scope.tl_techer2) {
                                            $scope.eroretext = "معلم تگ زنگ دوم";
                                        } else if (!$scope.tl_drs2) {
                                            $scope.eroretext = "درس تگ زنگ دوم";
                                        }
                                    }
                                }
                                $scope.obj[thisday + "-" + thiszang]["child1"] = {
                                    teacherid: $teacherid1,
                                    teacherName: $teacherName1,
                                    lessonid: $lessonId1,
                                    lessonName: $lessonName1,
                                    classid: $scope.cls_id,
                                    schoolid: localStorage.schoolId,
                                    day: thisday,
                                    zang: thiszang,
                                    shift: tt,
                                };
                                var ins_weeklyschedule = {

                                    ViewName: "WeeklyscheduleInsert",
                                    parameters: [
                                        {key: "%teacherid", value: $teacherid1 + ''},
                                        {key: "%lessonid", value: $lessonId1 + ''},
                                        {key: "%classid", value: $scope.cls_id + ''},
                                        {key: "%schoolid", value: localStorage.schoolId},
                                        {key: "%day", value: thisday + ''},
                                        {key: "%zang", value: thiszang + ''},
                                        {key: "%shift", value: '0'},
                                    ]
                                };
                                $http.post(URL_INSERT, JSON.stringify(ins_weeklyschedule))
                                    .success(function (result, status, headers, config) {
                                        $('#myModal').modal('hide');
                                    }).error(function (result, status, header, config) {
                                    alert("درج برنامه درسی  با خطا مواجه شد.");
                                    document.location.reload();
                                });

                            }).error(function (result, status, header, config) {
                            alert("حذف برنامه درسی فعلی با خطا مواجه شد.");
                            document.location.reload();
                        });
                    }
                } else {
                    $scope.obj[thisday + "-" + thiszang] = {
                        child2: {},
                        child1: {}
                    };

                    var tt = '0';

                    //if shift true ******************
                    if ($shift) {
                        tt = '1';

                        $scope.obj[thisday + "-" + thiszang]["child2"] = {
                            teacherid: $teacherid2,
                            teacherName: $teacherName2,
                            lessonid: $lessonId2,
                            lessonName: $lessonName2,
                            classid: $scope.cls_id,
                            schoolid: localStorage.schoolId,
                            day: thisday,
                            zang: thiszang,
                            shift: tt,

                        };
                        if (($teacherid2) && ($lessonId2)) {
                            var ins_weeklyschedule = {
                                ViewName: "WeeklyscheduleInsert",
                                parameters: [
                                    {key: "%teacherid", value: $teacherid2 + ''},
                                    {key: "%lessonid", value: $lessonId2 + ''},
                                    {key: "%classid", value: $scope.cls_id + ''},
                                    {key: "%schoolid", value: localStorage.schoolId},
                                    {key: "%day", value: thisday + ''},
                                    {key: "%zang", value: thiszang + ''},
                                    {key: "%shift", value: tt},
                                ]
                            };
                            $http.post(URL_INSERT, JSON.stringify(ins_weeklyschedule))
                                .success(function (result, status, headers, config) {
                                    $('#myModal').modal('hide');
                                }).error(function (result, status, header, config) {
                                alert("درج برنامه درسی با خطا مواجه شد.");
                                document.location.reload();
                            });
                        } else {
                            if (!$scope.tl_techer2) {
                                $scope.eroretext = "معلم تگ زنگ دوم";
                            } else if (!$scope.tl_drs2) {
                                $scope.eroretext = "درس تگ زنگ دوم";
                            }
                        }
                    }
                    $scope.obj[thisday + "-" + thiszang]["child1"] = {
                        teacherid: $teacherid1,
                        teacherName: $teacherName1,
                        lessonid: $lessonId1,
                        lessonName: $lessonName1,
                        classid: $scope.cls_id,
                        schoolid: localStorage.schoolId,
                        day: thisday,
                        zang: thiszang,
                        shift: tt,
                    };
                    var ins_weeklyschedule = {

                        ViewName: "WeeklyscheduleInsert",
                        parameters: [
                            {key: "%teacherid", value: $teacherid1 + ''},
                            {key: "%lessonid", value: $lessonId1 + ''},
                            {key: "%classid", value: $scope.cls_id + ''},
                            {key: "%schoolid", value: localStorage.schoolId},
                            {key: "%day", value: thisday + ''},
                            {key: "%zang", value: thiszang + ''},
                            {key: "%shift", value: '0'},
                        ]
                    };
                    $http.post(URL_INSERT, JSON.stringify(ins_weeklyschedule))
                        .success(function (result, status, headers, config) {
                            $('#myModal').modal('hide');
                        }).error(function (result, status, header, config) {
                        alert("درج برنامه درسی با خطا مواجه شد.");
                        document.location.reload();
                    });

                }

                //******************
            } else {
                if (!$scope.tl_techer) {
                    $scope.eroretext = "معلم";
                } else if (!$scope.tl_drs) {
                    $scope.eroretext = "درس";
                } else if (!thisday) {
                    $scope.eroretext = "روز هفته";
                } else if (!thiszang) {
                    $scope.eroretext = "زنگ کلاس";
                }
            }
        }
    }
    $scope.errText = function () {
        return $scope.eroretext;
    }
    $scope.deleteTecherLesson = function () {
        if ($scope.obj[thisday + "-" + thiszang]) {
             if ($scope.obj[thisday + "-" + thiszang]["child1"].teacherid) {
                var j = confirm("آیا برای حذف برنامه کلاسی در این بازه زمانی اطمینان دارید ؟")
                if (j === true) {
                    var del_weeklyschedule2 = {
                        ViewName: "WeeklyscheduleDelete",
                        parameters: [
                            {key: "%day", value: thisday + ''},
                            {key: "%zang", value: thiszang},
                            {key: "%classid", value: $scope.cls_id + ''},
                            {key: "%schoolid", value: localStorage.schoolId},
                        ]
                    };
                    $http.post(URL_INSERT, JSON.stringify(del_weeklyschedule2))
                        .success(function (result, status, headers, config) {
                            $scope.obj[thisday + "-" + thiszang] = {
                                child2: {},
                                child1: {}
                            };
                            $('#myModal').modal('hide');
                        }).error(function (result, status, header, config) {
                        alert("حذف برنامه درسی با خطا مواجه شد.");
                        document.location.reload();
                    });
                }
            }
        }
    }
}
])
;



