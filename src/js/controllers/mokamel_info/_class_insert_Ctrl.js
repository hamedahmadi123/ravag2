app.controller('class_insert', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.arrStudent = [];
    $scope.eroretext = "";
    $scope.gropclass = 0;
    $scope.checkbox1 = [];
    $scope.pEdit = false;
    $scope.showSt = false;
    $scope.tosifi = [
        {value: "1", name: "بلی"},
        {value: "0", name: "خیر"},
    ];
    $scope.isMajor = false;
    $scope.scholtype = JSON.parse(localStorage.schoolBase);
    for (var i = 0; i < $scope.scholtype.length; i++) {
        if ($scope.scholtype[i] >= 1 && $scope.scholtype[i] <= 6) {
            $scope.isMajor = false;
        } else if ($scope.scholtype[i] >= 7 && $scope.scholtype[i] <= 9) {
            $scope.isMajor = false;
        } else if ($scope.scholtype[i] >= 10 && $scope.scholtype[i] <= 12) {
            $scope.isMajor = true;
        }
    }

    var mbs = {
        ViewName: "majorbaseschoolselect",
        mutualTransaction: {
            kendoDataRequest: {
                filter: {
                    field: "schoolid",
                    logic: "and",
                    operator: "eq",
                    value: localStorage.schoolId,
                    filters: [
                        {field: "ismajor", logic: "and", operator: "eq", value: '0'},
                    ]
                },
            }
        }
    }
    $http.post(URL_GET, JSON.stringify(mbs))
        .success(function (result, status, headers, config) {
                $scope.majorbase = result.data;
            }
        )
    ;

    var trm = {
        ViewName: "TermSelect",
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
    $http.post(URL_GET, JSON.stringify(trm))
        .success(function (result, status, headers, config) {
            $scope.terms = result.data;
        });
    $scope.setMajorBase = function ($id) {
        var mbs = {
            ViewName: "allmajor",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        logic: "and",
                        operator: "eq",
                        value: $id + ''
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.majors = result.data;
            });
    }
    $scope.selectStudent = function ($major) {
        var stu = {
            ViewName: "StudentSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ''
                        , filters: [
                            {field: "majorbaseid", logic: "and", operator: "eq", value: $major},
                            {field: "isactive", logic: "and", operator: "eq", value:'1'},
                            ]

                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(stu))
            .success(function (result, status, headers, config) {
                $scope.student = result.data;
                $scope.showSt = true;
                for (var i = 0; i < $scope.student.length; i++) {
                    $scope.checkbox1.push($scope.student[i].studentid);
                }
            });

    }
    $scope.selectStudent();

    $scope.selectARRStudnet = function ($id, $bool) {
        if ($bool == true) {
            $scope.arrStudent.push($id);
        } else {
            for (var i = 0; i < $scope.arrStudent.length; i++) {
                if ($scope.arrStudent[i] == $id) {
                    $scope.arrStudent.splice(i, 1);
                }
            }
        }


    }
    $scope.setStudent = function () {
        $scope.pEdit = !$scope.pEdit;
    }
    $scope.selectAllStudent = function ($num) {
        $scope.arrStudent = [];
        if ($num == true) {
            try {
                for (var i = 0; i < $scope.checkbox1.length; i++) {
                    $scope.checkbox1[$scope.student[i].studentid] = true;
                    $scope.arrStudent.push($scope.student[i].studentid);
                }
            } catch (e) {

            }
        } else {
            try {
                for (var i = 0; i < $scope.checkbox1.length; i++) {
                    $scope.checkbox1[$scope.student[i].studentid] = false;

                    for (var c = 0; c < $scope.arrStudent.length; c++) {
                        if ($scope.arrStudent[c] == $scope.student[i].studentid) {
                            $scope.arrStudent.splice(c, 1);
                        }
                    }
                }
            } catch (e) {

            }
        }


    }
    $scope.insertClassFunctin = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if ($scope.cls_isgrouping == true)
                $scope.gropclass = 1;
            else
                $scope.gropclass = 0;

            var dataArray = [];
            $scope.err = false;
            if (($scope.cls_name) && ($scope.cls_term) && ($scope.cls_base)) {
                var majorbase = "";
                if ($scope.isMajor) {
                    if ($scope.cls_major) {
                        majorbase = $scope.cls_major;
                        $scope.err = true;
                    } else {
                        $scope.eroretext = "رشته";
                        $scope.err = false;
                    }
                } else {
                    majorbase = $scope.cls_base;
                    $scope.err = true;
                }
                if ($scope.err = true) {
                    var ins_cls = {
                        ViewName: "ClassInsert",
                        parameters: [
                            {key: "%title", value: $scope.cls_name + ''},
                            {key: "%termid", value: $scope.cls_term + ''},
                            {key: "%isgrouping", value: $scope.gropclass + ''},
                            {key: "%schoolid", value: localStorage.schoolId},
                            {key: "%majorbaseid", value: majorbase + ''},
                        ]
                    };
                    dataArray.push(ins_cls);
                    for (var i = 0; i < $scope.arrStudent.length; i++) {

                        var ins_studentClass = {
                            ViewName: "classStudentInsert",
                            parameters: [
                                {key: "%studentid", value: $scope.arrStudent[i] + ''},
                                {key: "%schoolid", value: localStorage.schoolId + ''},
                            ]
                        };
                        dataArray.push(ins_studentClass);
                    }
                    $http.post(URL_ARRAY_INSERT, JSON.stringify(dataArray))
                        .success(function (result, status, headers, config) {
                            alert("کلاس جدیدی با عنوان " + $scope.cls_name + " با موفقیت درج شد.");
                            document.location.replace("#/app/page/Class_Ctrl");
                        }).error(function (result, status, header, config) {
                        alert("درج کلاس با خطا مواجه شد.");
                        document.location.reload();
                    });
                }
            } else {
                if (!$scope.cls_name) {
                    $scope.eroretext = "نام کلاس";
                } else if (!$scope.cls_term) {
                    $scope.eroretext = "ترم";
                } else if (!$scope.cls_base) {
                    $scope.eroretext = "پایه تحصیلی";
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

}])
;








