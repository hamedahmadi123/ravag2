app.controller('class_edit', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretext = "";
    $scope.arr_add_Student = [];
    $scope.arr_del_Student = [];
    $scope.stId = {};
    var stId1 = {};
    $scope.class_id = "";
    $scope.studnet_id = "";
    $scope.majorbaseid = "";
    $scope.isMajor = false;
    $scope.showSt = false;
    $scope.scholtype = JSON.parse(localStorage.schoolBase);
    for (var i = 0; i < $scope.scholtype.length; i++) {
        if ($scope.scholtype[i] >= 1 && $scope.scholtype[i] <= 6) {
            // console.log("ابتدایی");
            $scope.isMajor = false;
        } else if ($scope.scholtype[i] >= 7 && $scope.scholtype[i] <= 9) {
            // console.log("راهنمایی");
            $scope.isMajor = false;
        } else if ($scope.scholtype[i] >= 10 && $scope.scholtype[i] <= 12) {
            // console.log("دبیرستان");
            $scope.isMajor = true;
        }
    }
    var trm = {
        ViewName: "TermSelect",
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
    $http.post(URL_GET, JSON.stringify(trm))
        .success(function (result, status, headers, config) {
            $scope.terms = result.data;
        });

    funcn();

    function funcn() {
        myVar = setTimeout(myfunction, 300);
    }

    function myfunction() {
        var full_url = document.URL;
        var url_array = full_url.split('/')
        $scope.class_id = url_array[url_array.length - 1];
        var cls = {
            ViewName: "ClassSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "classid",
                        logic: "and",
                        operator: "eq",
                        value: $scope.class_id + ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(cls))
            .success(function (result, status, headers, config) {
                    $scope.class = result.data[0];

                    var cls = {
                        ViewName: "SelectStudentInClass",
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
                    $http.post(URL_GET, JSON.stringify(cls))
                        .success(function (result, status, headers, config) {
                            $scope.classStudent = result.data;
                            for (var i = 0; i < $scope.classStudent.length; i++) {
                                $scope.stId[$scope.classStudent[i].studentid] = true;
                                stId1[$scope.classStudent[i].studentid] = true;
                            }
                        });
                    $scope.cls_id = $scope.class.classid;
                    $scope.cls_name = $scope.class.title;
                    $scope.cls_term = $scope.class.termid;
                    if ($scope.class.isgrouping == 1) {
                        $scope.cls_isgrouping = true;
                    } else {
                        $scope.cls_isgrouping = false;
                    }
                    var mbs = {
                        ViewName: "allmajor",
                        mutualTransaction: {
                            kendoDataRequest: {
                                filter: {
                                    field: "majorbaseid",
                                    logic: "and",
                                    operator: "eq",
                                    value: $scope.class.majorbaseid
                                },
                            }
                        }
                    }
                    $http.post(URL_GET, JSON.stringify(mbs))
                        .success(function (result, status, headers, config) {
                            $scope.thismajorBase = result.data[0];
                            $scope.selectStudent($scope.thismajorBase.majorbaseid);
                            if ($scope.isMajor == true) {
                                $scope.setMajorBase($scope.thismajorBase.parent);
                                $scope.cls_major = $scope.thismajorBase.majorbaseid;
                                $scope.cls_base = $scope.thismajorBase.parent;
                            } else {
                                $scope.cls_base = $scope.thismajorBase.majorbaseid;
                            }


                        });


                }
            );
    }

    var mbs = {
        ViewName: "majorbaseschoolselect",
        mutualTransaction: {
            kendoDataRequest: {
                filter: {
                    field: "schoolid",
                    logic: "and",
                    operator: "eq",
                    value: localStorage.schoolId
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
        document.getElementById("myDetails").open = true;
        var stu = {
            ViewName: "SelectStudentInClass",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ''
                        , filters: [
                            {field: "majorbaseid", logic: "and", operator: "eq", value: $major},
                            {field: "classid", logic: "and", operator: "in", value: "0," + $scope.class_id}
                        ]

                    },
                }
            }
        };
        console.log(JSON.stringify(stu));
        $http.post(URL_GET, JSON.stringify(stu))
            .success(function (result, status, headers, config) {
                $scope.student = result.data;
                $scope.showSt = true;
                for (var i = 0; i < $scope.student.length; i++) {
                    $scope.stId[$scope.student[i].studentid] = ($scope.class_id == $scope.student[i].classid && $scope.student[i].isInClass == 1);

                    if ($scope.class_id == $scope.student[i].classid && $scope.student[i].isInClass == 1)
                        stId1[$scope.student[i].studentid] = true;
                }
            });

    }
    $scope.setStudent = function () {
        $scope.pEdit = !$scope.pEdit;
    }

    $scope.selectAllStudent = function ($num) {
        for (let stIdKey in $scope.stId) {
            $scope.stId[stIdKey] = $num;
        }

    }
    $scope.updateClassFunctin = function ($id, $bool) {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if ($scope.cls_isgrouping == true) {
                $scope.cls_isgrouping = "1";
            } else {
                $scope.cls_isgrouping = "0";
            }
            var dataArray = [];
            if (($scope.cls_name) && ($scope.cls_term) && ($scope.cls_isgrouping) && ($scope.cls_base) && ($scope.cls_major)) {
                var upd_cls = {
                    ViewName: "ClassUpdate",
                    parameters: [
                        {key: "%classid", value: $id + ''},
                        {key: "%majorbaseid", value: $scope.cls_major + ''},
                        {key: "%title", value: $scope.cls_name + ''},
                        {key: "%termid", value: $scope.cls_term + ''},
                        {key: "%isgrouping", value: $scope.cls_isgrouping + ''},
                        {key: "%schoolid", value: localStorage.schoolId},
                    ]
                };

                dataArray.push(upd_cls);
                var upd_studentClass = {};
                for (let stIdKey in $scope.stId) {
                    if ($scope.stId[stIdKey] && !stId1[stIdKey]) {
                        upd_studentClass = {
                            ViewName: "classstudentUpdate",
                            parameters: [
                                {key: "%studentid", value: stIdKey + ''},
                                {key: "%classid", value: $scope.class_id + ''},
                                {key: "%schoolid", value: localStorage.schoolId + ''},
                            ]
                        };
                        dataArray.push(upd_studentClass);
                    } else if (!$scope.stId[stIdKey] && stId1[stIdKey]) {
                        upd_studentClass = {
                            ViewName: "classstudentDelete",
                            parameters: [
                                {key: "%studentid", value: stIdKey + ''},
                                {key: "%classid", value: $scope.class_id + ''},
                                {key: "%schoolid", value: localStorage.schoolId + ''},
                            ]
                        };
                        dataArray.push(upd_studentClass);
                    }

                }
                var j = confirm("آیا برای ویرایش کلاس با عنوان " + $scope.cls_name + " اطمینان دارید ؟ ");
                if (j === true) {
                    $http.post(URL_ARRAY_INSERT, JSON.stringify(dataArray))
                        .success(function (result, status, headers, config) {
                            document.location.replace("#/app/page/Class_Ctrl");
                        }).error(function (result, status, header, config) {
                        alert("ویرایش کلاس با خطا مواجه شد.");
                        document.location.reload();
                    });

                }

            } else {
                if (!$scope.cls_name) {
                    $scope.eroretext = "نام کلاس";
                } else if (!$scope.cls_term) {
                    $scope.eroretext = "ترم";
                } else if (!$scope.cls_isgrouping) {
                    $scope.eroretext = "کلاس گروهی";
                } else if (!$scope.cls_base) {
                    $scope.eroretext = "پایه تحصیلی";
                } else if (!$scope.cls_major) {
                    $scope.eroretext = "رشته تحصیلی";
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








