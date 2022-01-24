app.controller('dooros', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.schooltype = 0;
    $scope.eroretext = "";
    $scope.titelext = "";
    $scope.name = [];
    $scope.descriptive = 0;
    $scope.poodemani = 0;
    $scope.arrMajor = [];
    $scope.desbel = 0;
    $scope.podeman = [{value: "1", name: "بلی"}, {value: "0", name: "خیر"},];
    //s1
    $scope.arr1Path = [];
    $scope.arr1PathName = [];
    //s2
    $scope.arr2Path = [];
    $scope.arr2PathName = [];
    //s3
    $scope.arr3Path = [];
    $scope.arr3PathName = [];
    //s4
    $scope.arr4Path = [];
    $scope.arr4PathName = [];
    //
    //s5
    $scope.arr5Path = [];
    $scope.arr5PathName = [];
    //
    $scope.arrayMB = [];
    var skip = -15;
    var take = 15;
    var objects = 0;
    var isem = false;
    $scope.load2 = function () {

        if (isem)
            return;

        skip += take;
        for (var i = 1; i <= take; i++) {
            $scope.name.push({order_id: "-1" + $scope.name.length});
        }


        var msg = {
            ViewName: "LessonSelect",
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "",
                        logic: "",
                        operator: "",
                        value: ""
                    },
                    skip: skip,
                    take: take,
                    Sort: [{field: "lessonid", dir: "DESC"}]
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
    };
    $scope.majorbaseSelect = function () {
        $scope.resetArr();
        $scope.podemany_false = true;
        $scope.tosify_false = true;
        var mbs = {
            ViewName: "allmajor",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        logic: "and",
                        operator: "eq",
                        value: "0"
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.parrent = result.data;
            });
        $scope.type2 = function () {
            return true;
        }
    }
    $scope.setS1 = function ($id, $name, $bool) {

        if ($bool == true) {
            $scope.arr1Path.push($id);
            $scope.arr1PathName.push($name);
        } else {
            for (var i = 0; i < $scope.arr1Path.length; i++) {
                if ($scope.arr1Path[i] == $id) {
                    $scope.arr1Path.splice(i, 1);
                    $scope.arr1PathName.splice(i, 1);
                    break;
                }
            }
        }
    }
    $scope.checkS1 = function () {
        if ($scope.arr1Path.length == 0) {
            return true;
        } else {
            return false;
        }
    }
    $scope.selectMB1 = function () {
        var stingarry1 = $scope.arr1Path.toString();
        var mbs = {
            ViewName: "allmajor",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        logic: "and",
                        operator: "in",
                        value: stingarry1
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.s2 = result.data;
                if ($scope.s2.length == 0) {
                    $('#myModal2').modal('hide');
                }
            });
    }

    $scope.setS2 = function ($id, $name, $bool) {
        if ($bool == true) {
            $scope.arr2Path.push($id);
            $scope.arr2PathName.push($name);
        } else {
            for (var i = 0; i < $scope.arr2Path.length; i++) {
                if ($scope.arr2Path[i] == $id) {
                    $scope.arr2Path.splice(i, 1);
                    $scope.arr2PathName.splice(i, 1);
                    break;
                }
            }
        }
    }
    $scope.checkS2 = function () {
        if ($scope.arr2Path.length == 0) {
            return true;
        } else {
            return false;
        }
    }
    $scope.selectMB2 = function () {
        var stingarry2 = $scope.arr2Path.toString();
        var mbs = {
            ViewName: "allmajor",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        logic: "and",
                        operator: "in",
                        value: stingarry2
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.s3 = result.data;
                if ($scope.s3.length == 0) {
                    $('#myModal2').modal('hide');
                }
            });
    }
    $scope.setS3 = function ($id, $name, $bool) {
        if ($bool == true) {
            $scope.arr3Path.push($id);
            $scope.arr3PathName.push($name);
        } else {
            for (var i = 0; i < $scope.arr3Path.length; i++) {
                if ($scope.arr3Path[i] == $id) {
                    $scope.arr3Path.splice(i, 1);
                    $scope.arr3PathName.splice(i, 1);
                    break;
                }
            }
        }
    }
    $scope.checkS3 = function () {
        if ($scope.arr3Path.length == 0) {
            return true;
        } else {
            return false;
        }
    }
    $scope.selectMB3 = function () {
        var stingarry3 = $scope.arr3Path.toString();
        var mbs = {
            ViewName: "allmajor",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        logic: "and",
                        operator: "in",
                        value: stingarry3
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.s4 = result.data;
                if ($scope.s4.length == 0) {
                    $('#myModal2').modal('hide');
                }
            });
    }

    $scope.setS4 = function ($id, $name, $bool) {
        if ($bool == true) {
            $scope.arr4Path.push($id);
            $scope.arr4PathName.push($name);
        } else {
            for (var i = 0; i < $scope.arr4Path.length; i++) {
                if ($scope.arr4Path[i] == $id) {
                    $scope.arr4Path.splice(i, 1);
                    $scope.arr4PathName.splice(i, 1);
                    break;
                }
            }
        }
    }
    $scope.selectMB4 = function () {
        var stingarry4 = $scope.arr4Path.toString();
        var mbs = {
            ViewName: "allmajor",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        logic: "and",
                        operator: "in",
                        value: stingarry4
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.s5 = result.data;
            });
    }
    $scope.setS5 = function ($id, $name, $bool) {
        if ($bool == true) {
            $scope.arr5Path.push($id);
            $scope.arr5PathName.push($name);
        } else {
            for (var i = 0; i < $scope.arr3Path.length; i++) {
                if ($scope.arr5Path[i] == $id) {
                    $scope.arr5Path.splice(i, 1);
                    $scope.arr5PathName.splice(i, 1);
                    break;
                }
            }
        }
    }


    $scope.setTosify = function ($num) {
        if ($num == true) {
            $scope.descriptive = 1;
        } else {
            $scope.descriptive = 0;
        }
    }
    $scope.setPodemany = function ($num) {
        if ($num == true) {
            $scope.poodemani = 0;
        } else {
            $scope.poodemani = 1;
        }
    }
    $scope.resetArr = function () {
        $scope.arr1Path = [];
        $scope.arr2Path = [];
        $scope.arr3Path = [];
        $scope.arr4Path = [];
        $scope.arr1PathName = [];
        $scope.arr2PathName = [];
        $scope.arr3PathName = [];
        $scope.arr4PathName = [];
    }
    $scope.insertDarsFunctin = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            var dataArray = [];
            if (($scope.drs_name) && ($scope.arr2Path.length != 0 || $scope.arr3Path.length != 0 || $scope.arr4Path.length != 0) && $scope.drs_passNomre && $scope.drs_tedadVahed) {


                if ($scope.arr5Path.length != 0) {
                    for (var a = 0; a < $scope.arr5Path.length; a++) {
                        $scope.arrayMB[a] = $scope.arr5Path[a];
                    }
                } else if ($scope.arr4Path.length != 0) {
                    for (var j = 0; j < $scope.arr4Path.length; j++) {
                        $scope.arrayMB[j] = $scope.arr4Path[j];
                    }
                } else if ($scope.arr3Path.length != 0) {
                    for (var c = 0; c < $scope.arr3Path.length; c++) {
                        $scope.arrayMB[c] = $scope.arr3Path[c];
                    }
                }
                else {
                    for (var c = 0; c < $scope.arr2Path.length; c++) {
                        $scope.arrayMB[c] = $scope.arr2Path[c];
                    }
                }
                console.log($scope.arrayMB);

                var ins_drs = {
                    ViewName: "LessonInsert",
                    parameters: [
                        {key: "%title", value: $scope.drs_name + ''},
                        {key: "%unitcount", value: $scope.drs_tedadVahed || '' + ''},
                        {key: "%code", value: $scope.drs_code || '' + ''},
                        {key: "%passinggrade", value: $scope.drs_passNomre || '' + ''},
                        {key: "%isdescriptive", value: $scope.descriptive + ''},
                        {key: "%poodemani", value: $scope.poodemani || '0' + ''},

                    ]
                };
                dataArray.push(ins_drs);
                for (let i = 0; i < $scope.arrayMB.length; i++) {

                    var ins_lmb = {
                        ViewName: "lesson_majorbaseInsert",
                        parameters: [
                            {key: "%majorbaseid", value: $scope.arrayMB[i] + ''},
                        ]
                    };
                    dataArray.push(ins_lmb);
                }
                alert(JSON.stringify(dataArray));
                $http.post(URL_ARRAY_INSERT, JSON.stringify(dataArray))
                    .success(function (result, status, headers, config) {
                        alert("درس جدیدی با عنوان " + $scope.drs_name + " با موفقیت درج شد.");
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("درج درس با خطا مواجه شد.");
                    document.location.reload();
                });

            } else {
                if (!$scope.drs_name) {
                    $scope.eroretext = "نام درس";
                    $scope.titelext = "را وارد نمایید";
                } else if (!($scope.arr3Path.length != 0 || $scope.arr4Path.length != 0)) {
                    $scope.eroretext = "رشته تحصیلی";
                    $scope.titelext = "را انتخاب نمایید";
                } else if (!($scope.drs_passNomre)) {
                    $scope.eroretext = "نمره قبولی";
                    $scope.titelext = "را وارد نمایید";
                } else if (!($scope.drs_tedadVahed)) {
                    $scope.eroretext = "تعداد واحد";
                    $scope.titelext = "را وارد نمایید";
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
    $scope.title = function () {
        return $scope.titelext;
    }

    $scope.desbaleForm = function () {
        if ($scope.desbel === 0) {
            return true;
        } else if ($scope.desbel === 1) {
            return false;
        }
    }
    $scope.setTosifyE = function ($num) {
        if ($num == true) {
            $scope.descriptiveE = 0;
        } else {
            $scope.descriptiveE = 1;
        }
    }
    $scope.setPodemanyE = function ($num) {
        if ($num == '0') {
            $scope.podemany_trueE = false;
            $scope.poodemaniE = 0;
        } else {
            $scope.podemany_falseE = false;
            $scope.poodemaniE = 1;
        }
    }
    $scope.updateDrs = function ($id) {
        if ($scope.desbel == 1) {
            if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

                if (($scope.drs_nameE) && ($scope.drs_passNomreE) && ($scope.drs_tedadVahedE)) {
                    var ins_drs = {
                        ViewName: "LessonUpdate",
                        parameters: [
                            {key: "%lessonid", value: $id + ''},
                            {key: "%title", value: $scope.drs_nameE + ''},
                            {key: "%unitcount", value: $scope.drs_tedadVahedE || '' + ''},
                            {key: "%code", value: $scope.drs_codeE || '' + ''},
                            {key: "%passinggrade", value: $scope.drs_passNomreE || '' + ''},
                            {key: "%isdescriptive", value: $scope.descriptiveE + ''},
                            {key: "%poodemani", value: $scope.poodemaniE + ''},
                        ]
                    };

                    var j = confirm("آیا برای ویرایش درس با عنوان " + $scope.drs_nameE + " اطمینان دارید ؟ ");
                    if (j === true) {
                        $http.post(URL_INSERT, JSON.stringify(ins_drs))
                            .success(function (result, status, headers, config) {
                                document.location.reload();
                            }).error(function (result, status, header, config) {
                            alert("ویرایش درس با خطا مواجه شد.");
                            document.location.reload();
                        });


                    }
                } else {
                    if (!$scope.drs_nameE) {
                        $scope.eroretext = "نام درس";
                        $scope.titelext = "را وارد نمایید";
                    }
                    else  if (!$scope.drs_passNomreE) {
                        $scope.eroretext = "نمره قبولی";
                        $scope.titelext = "را وارد نمایید";
                    }
                    else  if (!$scope.drs_tedadVahedE) {
                        $scope.eroretext = "تعداد واحد";
                        $scope.titelext = "را وارد نمایید";
                    }
                }
            } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
                alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
                document.location.replace("#/app/Main");
                document.location.reload()
            }
        } else {
            $scope.desbel = 1;
        }
    }
    $scope.detial = function ($num, $id) {
        if ($num == 'det') {
            $scope.desbel = 0;
        } else if ($num == 'upd') {
            $scope.desbel = 1;
        }
        var drss = {
            ViewName: "LessonSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "lessonid",
                        logic: "",
                        operator: "eq",
                        value: $id + ""
                    },

                }
            }
        }
        $http.post(URL_GET, JSON.stringify(drss))
            .success(function (result, status, headers, config) {
                $scope.drsDetail = result.data[0];
                $scope.drs_id = $scope.drsDetail.lessonid;
                $scope.drs_nameE = $scope.drsDetail.title;
                $scope.drs_tedadVahedE = parseInt($scope.drsDetail.unitcount);
                $scope.drs_codeE = parseInt($scope.drsDetail.code);
                $scope.drs_passNomreE = parseInt($scope.drsDetail.passinggrade);
                $scope.descriptiveE = $scope.drsDetail.isdescriptive;
                $scope.poodemaniE = $scope.drsDetail.poodemani;
                if ($scope.drsDetail.isdescriptive == "1") {
                    $scope.tosifyE = true;
                } else {
                    $scope.tosifyE = false;
                }
                if ($scope.drsDetail.poodemani == "1") {
                    $scope.podemanyE = true;
                } else {
                    $scope.podemanyE = false;
                }
            });
    }


    // delete******************************
    $scope.deleteDrs = function ($id, $name) {
        var del_Item = {
            ViewName: "LessonDelete",
            parameters: [
                {key: "%lessonid", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف درس با عنوان " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
        if (j === true) {
            $http.post(URL_INSERT, JSON.stringify(del_Item))
                .success(function (result, status, headers, config) {
                    document.location.reload();
                }).error(function (result, status, header, config) {
                alert("حذف با خطا مواجه شد.");
                document.location.reload();
            });
        }
    }

}])
;