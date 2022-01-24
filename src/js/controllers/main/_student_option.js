app.controller('student_option', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.showInfoText = true;
    $scope.tmp_st_id = "";
    $scope.tmp_st_name = "";
    //var
    $scope.st_id = "";
    $scope.st_name = "";
    $scope.st_classid = "";

    $scope.show_enz = false;
    $scope.show_Score = false;
    $scope.show_absen = false;
    $scope.obj_clt = {};
    $scope.absent_not_iillegal = 0;
    $scope.absent_isillegal = 0;
    $scope.enz_good = 0;
    $scope.enz_bad = 0;
    $scope.splitPath = "";
    $scope.this_student = "";
    myfunc();

    function myfunc() {
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
                for (var i = 0; i < $scope.classLesson.length; i++) {
                    $scope.obj_clt[$scope.classLesson[i].classlessonteacherid] = $scope.classLesson[i].className;
                }
            });

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
    }

    $scope.filterByClass = function ($classId, $name) {
        if (!$classId) {
            document.getElementById('lblName').innerText = "لیست دانش آموزان";
            skip = -15;
            take = 15;
            objects = 0;
            isem = false;
            $scope.load2();
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
                        value: value
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
    $scope.selectTMPSt = function ($id, $name) {
        document.getElementById($id).checked = true;
        $scope.tmp_st_id = $id;
        $scope.tmp_st_name = $name;
    }
    $scope.submitSelect = function () {
        $scope.show_enz = false;
        $scope.show_Score = false;
        $scope.show_absen = false;
        $scope.st_id = $scope.tmp_st_id;
        $scope.st_name = $scope.tmp_st_name;
        var stuSelect = {
            ViewName: "StudentSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "studentid",
                        logic: "and",
                        operator: "eq",
                        value: $scope.st_id
                    },
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(stuSelect))
            .success(function (result, status, headers, config) {
                $scope.this_student = result.data[0];
                console.log($scope.this_student);
                $scope.st_classid = $scope.this_student.classid;
                var RankAvgStudentInBase = {
                    ViewName: "RankAvgLessonPerBase",
                    parameters: [{key: "%majorbaseid", value: $scope.this_student.majorbaseid + ''}],
                    mutualTransaction: {
                        kendoDataRequest: {
                            filter: {
                                field: "StudentId",
                                logic: "and",
                                operator: "eq",
                                value: $scope.st_id
                            },
                        }
                    },
                };
                $http.post(URL_GET, JSON.stringify(RankAvgStudentInBase))
                    .success(function (result, status, headers, config) {
                        $scope.RankAvgStudentInBase = result.data[0];
                    });
            });

        localStorage.act_term_id = 1;
        var RankAvgStudentInclass = {
            ViewName: "RankAvgStudentInClass",
            parameters: [{key: "%TermId", value: localStorage.act_term_id + ''}],
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "StudentId",
                        logic: "and",
                        operator: "eq",
                        value: $scope.st_id
                    },
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(RankAvgStudentInclass))
            .success(function (result, status, headers, config) {
                $scope.RankAvgStudent = result.data[0];
            });


    }
    $scope.selecScore = function () {
        console.log($scope.st_classid);
        $scope.show_Score = !$scope.show_Score;
        var msg = {
            ViewName: "OneStudentScoreLessonAvg",
            parameters: [
                {key: "%termid", value: localStorage.act_term_id + ''},
                {key: "%classid", value: $scope.st_classid + ''},
                {key: "%studentid", value:  $scope.st_id + ''}

            ],
            mutualTransaction: {
                kendoDataRequest: {
                    filter:
                        {field: "", logic: "", operator: "", value: ''},
                },
            }
        }
        console.log(JSON.stringify(msg));
        $http.post(URL_GET, JSON.stringify(msg))
            .success(function (result, status, headers, config) {
                $scope.score_st = result.data;
                console.log($scope.score_st);
            });
    }
    $scope.selectEnzSt = function () {
        $scope.show_enz = !$scope.show_enz;
        var msg = {
            ViewName: "SelectDisciplineStudent",
            parameters: [
                {key: "%schoolid", value: localStorage.schoolId + ''}],
            mutualTransaction: {
                kendoDataRequest: {
                    filter:
                        {field: "studentid", logic: "and", operator: "eq", value: $scope.st_id},
                },
            }
        }
        $http.post(URL_GET, JSON.stringify(msg))
            .success(function (result, status, headers, config) {
                $scope.disklpline_st = result.data;
                for (var i = 0; i < $scope.disklpline_st.length; i++) {
                    if ($scope.disklpline_st[i].type == 0) {
                        $scope.enz_bad += 1;
                    } else {
                        $scope.enz_good += 1;
                    }


                }
            });
    }

    $scope.crDate = function ($date) {
        return moment($date, 'YYYY-M-D').format('jYYYY-jM-jD');
    }
    $scope.selecAbsent = function () {
        $scope.show_absen = !$scope.show_absen;
        var msg = {
            ViewName: "SelectAbsenStudent",
            parameters: [
                {key: "%schoolid", value: localStorage.schoolId + ''}],
            mutualTransaction: {
                kendoDataRequest: {
                    filter:
                        {field: "studentid", logic: "and", operator: "eq", value: $scope.st_id + ''},
                },
            }
        }
        $http.post(URL_GET, JSON.stringify(msg))
            .success(function (result, status, headers, config) {
                $scope.absent_st = result.data;
                for (var i = 0; i < $scope.absent_st.length; i++) {
                    if ($scope.absent_st[i].isillegal == 0) {
                        $scope.absent_not_iillegal += 1;
                    } else {
                        $scope.absent_isillegal += 1;
                    }

                }
            });
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