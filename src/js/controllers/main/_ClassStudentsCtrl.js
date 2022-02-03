app.controller('ClassStudents', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    myFunction();
    $scope.modelClassId = "";
    $scope.modelClassName = "";
    $scope.modelClassMajorBase = "";
    $scope.printNum = '0';
    $scope.flotingShow = true;
    $scope.showSt = false;
    $scope.showAllClass = true;
    $scope.showStInfo = false;
    $scope.act_st_id = "";
    $scope.act_st_name = "";
    var cunter = 0;

    function myFunction() {
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
            });
    }

    $scope.selectLessonTeacher = function ($id, $num) {
        $scope.printNum = $num;
        var thr = {
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
        $http.post(URL_GET, JSON.stringify(thr))
            .success(function (result, status, headers, config) {
                $scope.techers = result.data;

            });

    }
    $scope.selectLessonForTeacher = function ($teacherid) {
        var leson = {
            ViewName: "SelectLessonForTeacher",
            parameters: [{key: "%teacherid", value: $teacherid + ''}],
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
        $http.post(URL_GET, JSON.stringify(leson))
            .success(function (result, status, headers, config) {
                if (result.data.length != '0') {
                    $scope.lessons = result.data;
                } else {
                    alert("هیج درسی برای این دبیر ارایه نشده است . ابتدا در برنامه کلاسی درس مربوط به این دبیر را مشخص نمایید.")
                }

            });
    }
    $scope.groupClass = function ($group) {
        if ($group == 0)
            return "خیر";
        else
            return "بلی";
    }


    $scope.floting = function () {
        $scope.flotingShow = !$scope.flotingShow;
    }


    $scope.selectgrp = function ($classId, $name, $major) {
        if ($scope.modelClassId && $scope.modelClassId != "" && $scope.modelClassId != undefined && $scope.modelClassId != "undefined") {
            document.getElementById($scope.modelClassId).style.border = "none";
            document.getElementById($classId).style.border = "2px #27c24c solid";
        } else {
            document.getElementById($classId).style.border = "2px #27c24c solid";
        }
        $scope.flotingShow = true;
        $scope.studentClass = "";
        $scope.modelClassId = $classId;
        $scope.modelClassName = $name;
        $scope.modelClassMajorBase = $major;
        var class_student = {
            ViewName: "SelectStudentInClass",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "classid",
                        logic: "and",
                        operator: "eq",
                        value: $classId + ''
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(class_student))
            .success(function (result, status, headers, config) {
                $scope.studentClass = result.data;

            });
    }

    $scope.selectStudentInclass = function ($id) {
        $scope.showSt = !$scope.showSt;
        window.scrollBy(0, 10000);
    }
    $(document).keydown(function (event) {
        if (event.keyCode == 27) {
            $('#myModal').modal('hide');
        }
    });

    $scope.gotoPrint = function () {
        if ($scope.modelClassId && $scope.clsTeacher && $scope.clsLson) {
            $('#print').modal('hide');
            if ($scope.printNum == '0') {
                window.open(
                    "#/app/page/printClassList/" + $scope.modelClassId + "/" + $scope.clsTeacher + "/" + $scope.clsLson,
                    '_blank' // <- This is what makes it open in a new window.
                );
            } else if ($scope.printNum == '1') {
                window.open(
                    "#/app/page/printScoreList/" + $scope.modelClassId + "/" + $scope.clsTeacher + "/" + $scope.clsLson,
                    '_blank' // <- This is what makes it open in a new window.
                );
            }
        }
    }

    $scope.gotoSt = function ($id, $name) {
        $scope.showAllClass = false;
        $scope.showStInfo = true;
        $scope.act_st_id = $id;
        $scope.act_st_name = $name;
        var stuSelect = {
            ViewName: "StudentSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "studentid",
                        logic: "and",
                        operator: "eq",
                        value: $scope.act_st_id
                    },
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(stuSelect))
            .success(function (result, status, headers, config) {
                $scope.this_student = result.data[0];

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
                                value: $scope.act_st_id
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
                        value: $scope.act_st_id
                    },
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(RankAvgStudentInclass))
            .success(function (result, status, headers, config) {
                $scope.RankAvgStudent = result.data[0];
            });


    }
    $scope.backtoClass = function () {
        $scope.showAllClass = true;
        $scope.showStInfo = false;
    }

}
])
;



