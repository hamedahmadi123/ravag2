app.controller('Enzebat_student_insert', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretext = "";
    $scope.Select_As = true;
    $scope.SelectTh = false;
    $scope.tmp_the_dis_Id = "";
    $scope.tmp_the_dis_Name = "";
    $scope.the_dis_Id = "";
    $scope.the_dis_Name = "";
    $scope.temp_classLessonId = "";
    $scope.classLessonId = "";
    $scope.temp_classLessonName = "";
    $scope.classLessonName = "";
    $scope.temp_classLessonName = "";
    $scope.classlessonteacherid = "";
    $scope.temp_classlessonteacherid = "";
    $scope.classLesson_teacherID = "";
    $scope.obj_disType = {};
    $scope.arrselect = [];
    $scope.arrselectName = [];
    $scope.obj_st = {};
    $scope.obj_clt = {};
    $scope.Main_Array = [];
    $scope.setOwnert = function () {
        $scope.Select_As = !$scope.Select_As;
        $scope.arrselect = [];
        $scope.arrselectName = [];
        $scope.obj_st = {};
        $scope.Main_Array = [];
        $scope.dis_student = [];
    }
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
                        value: "1"
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
                        field: "schoolid",
                        logic: "and",
                        operator: "eq",
                        value: localStorage.schoolId + ''
                    },
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


    $scope.setClassLesson = function ($id, $name, $thId, $cltId) {
        document.getElementById($cltId).checked = true;
        $scope.temp_classLessonId = $id;
        $scope.temp_classLessonName = $name;
        $scope.temp_classLesson_teacherID = $thId;
        $scope.temp_classlessonteacherid = $cltId;
    }
    $scope.submitSelectClassLesson = function () {
        $scope.classLessonId = $scope.temp_classLessonId;
        $scope.dis_classLesson = $scope.temp_classLessonName;
        $scope.classLesson_teacherID = $scope.temp_classLesson_teacherID;
        $scope.classlessonteacherid = $scope.temp_classlessonteacherid;
    }

    $scope.selectStudentsInClass = function () {
        var msg = {
            ViewName: "SelectStudentInClass",
            mutualTransaction: {

                kendoDataRequest: {
                    filter: {
                        field: "classid",
                        logic: "and",
                        operator: "eq",
                        value: $scope.classLessonId
                    },
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(msg))
            .success(function (result, status, headers, config) {
                $scope.students_in_class = result.data;
            });
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
        console.log($scope.arrselect);
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
            } else {
                if ($scope.Select_As == true) {
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
                    alert(JSON.stringify(ins_array));
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

}
])
;
