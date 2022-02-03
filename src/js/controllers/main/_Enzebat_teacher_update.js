app.controller('Enzebat_teacher_update', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.obj_disType = {};
    $scope.obj_disTypeName = {};
    $scope.eroretext = "";
    $scope.tmp_the_dis_Id = "";
    $scope.tmp_the_dis_Name = "";
    $scope.the_dis_Id = "";
    $scope.the_dis_Name = "";


    $scope.types = [
        {value: "0", name: "منفی"},
        {value: "1", name: "مثبت"},
    ];

    funcn();

    function funcn() {
        myVar = setTimeout(myfunction, 300);
    }

    function myfunction() {
        var full_url = document.URL;
        var url_array = full_url.split('/')
        $scope.dis_id = url_array[url_array.length - 1];
        var dis = {
            ViewName: "SelectDisciplineTeacher",
            parameters: [
                {key: "%schoolid", value: localStorage.schoolId + ''}],
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "teacherdisciplineid",
                        logic: "and",
                        operator: "eq",
                        value: $scope.dis_id + ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(dis))
            .success(function (result, status, headers, config) {
                $scope.this_dis = result.data[0];
                $scope.the_dis_Id = $scope.this_dis.disciplinetypeid;
                $scope.dis_note = $scope.this_dis.description;
                $scope.dis_date = moment($scope.this_dis.createdAt, 'YYYY-M-D').format('jYYYY-jM-jD');

            });

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
                    $scope.obj_disTypeName[$scope.enz_types[i].disciplinetypeid] = $scope.enz_types[i].name;
                }
            });

    }

    $scope.errText = function () {
        return $scope.eroretext;
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
    $scope.submitDisciplineType = function () {
        $scope.the_dis_Id = $scope.tmp_the_dis_Id;
        $scope.the_dis_Name = $scope.tmp_the_dis_Name;
        $scope.dis_type = $scope.the_dis_Name;
    }
    $scope.selectAlldisType = function ($num) {
        if ($num == true) {
            document.getElementById('lblType').innerText = "مشاهده موارد انضباطی معاون";
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
        for (var i = 0; i < $scope.enz_types.length; i++) {
            if ($scope.enz_types[i].owner == 2)
                $scope.obj_disType[$scope.enz_types[i].disciplinetypeid] = true;
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
                        if ($scope.enz_types[i].owner == 3)
                            $scope.obj_disType[$scope.enz_types[i].disciplinetypeid] = true;
                    }
                }
            } else {
                if ($scope.showAlltype == true) {
                    $scope.obj_disType[$scope.enz_types[i].disciplinetypeid] = true;
                } else {
                    if ($scope.enz_types[i].owner == 2)
                        $scope.obj_disType[$scope.enz_types[i].disciplinetypeid] = true;
                }
            }
        }
    }
    $scope.updateDis = function ($id) {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.the_dis_Id) && ($scope.dis_date)) {
                var upd_dis = {
                    ViewName: "UpdateDisciplineTeacher",
                    parameters: [
                        {key: "%teacherdisciplineid", value: $id + ''},
                        {key: "%disciplinetypeid", value: $scope.the_dis_Id + ''},
                        {key: "%description", value: $scope.dis_note + ''},
                        {key: "%createdAt", value: moment($scope.dis_date, 'jYYYY-jM-jD').format('YYYY-M-D') + ''},
                    ]
                };

                var j = confirm("آیا برای ویرایش مورد انضباطی برای دبیر محترم " + $scope.this_dis.firstname + " " + $scope.this_dis.lastname + " اطمینان دارید ؟ ");
                if (j === true) {
                    $http.post(URL_INSERT, JSON.stringify(upd_dis))
                        .success(function (result, status, headers, config) {
                            window.history.back();
                        }).error(function (result, status, header, config) {
                        alert("ویرایش مورد انظباطی با خطا مواجه شد.");
                        document.location.reload();
                    });


                }
            } else {
                if (!$scope.the_dis_Id) {
                    $scope.eroretext = "مورد انضباطی";
                } else if (!$scope.dis_date) {
                    $scope.eroretext = "تاریخ ثبت انضباط";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }
    $scope.BackToHistory = function () {
        window.history.back();
    }
}
])
;