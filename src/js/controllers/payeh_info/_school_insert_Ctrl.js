app.controller('school_insert', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
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
    $scope.arrayMB = [];
    var i = 0;
    var width = 1;

    $scope.jensiat = [
        {value: "0", name: "پسرانه"},
        {value: "1", name: "دخترانه"},
    ],
        $scope.loca = [
            {location_id: "1", location_name: "اصفهان"},
            {location_id: "2", location_name: "تهران"},
            {location_id: "3", location_name: "مشهد"},
        ],
        $scope.subloca = [
            {location_id: "4", location_name: "شاهین شهر"},
            {location_id: "5", location_name: "نجف آباد"},
            {location_id: "6", location_name: "فولاد شهر"},
        ],
        $scope.shift = [
            {value: "0", name: "یک نوبته"},
            {value: "1", name: "دو نوبته"},
        ],
        myFunction();

    function myFunction() {
        document.getElementById("pic1").className = "gray0";
        document.getElementById("pic2").className = "gray100";
        document.getElementById("pic3").className = "gray100";

        var mbs = {
            ViewName: "majorbaseSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        logic: "and",
                        operator: "eq",
                        value: '0'
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.parrent = result.data;
            });
    }

    $scope.seleteChild1 = function ($parrentId, $title) {
        if ($parrentId && $parrentId != null && $parrentId != undefined) {
            $scope.path[0] = $parrentId;
            $scope.pathName[0] = $title;
        } else {
            $scope.path = [];
            $scope.pathName = [];
        }
        var mbs = {
            ViewName: "majorbaseSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        logic: "and",
                        operator: "eq",
                        value: $parrentId
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.child1 = result.data;
            });
    }
    $scope.seleteChild2 = function ($child1Id, $titile) {
        if ($child1Id && $child1Id != null && $child1Id != undefined) {
            $scope.path[1] = $child1Id;
            $scope.pathName[1] = $titile;
        } else {
            $scope.path.splice(1);
            $scope.pathName.splice(1);
        }
        var mbs = {
            ViewName: "majorbaseSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        operator: "eq",
                        logic: "and",
                        value: $child1Id
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.child2 = result.data;
            });
    }
    $scope.seleteChild3 = function ($child2Id, $title) {
        if ($child2Id && $child2Id != null && $child2Id != undefined) {
            $scope.path[2] = $child2Id;
            $scope.pathName[2] = $title;
        } else {
            $scope.path.splice(2);
            $scope.pathName.splice(2);
        }
        var mbs = {
            ViewName: "majorbaseSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        operator: "eq",
                        logic: "and",
                        value: $child2Id
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.child3 = result.data;
            });
    }
    $scope.seleteChild4 = function ($child3Id, $title) {
        if ($child3Id && $child3Id != null && $child3Id != undefined) {
            $scope.path[3] = $child3Id;
            $scope.pathName[3] = $title;
        } else {
            $scope.path.splice(3);
            $scope.pathName.splice(3);
        }
        var mbs = {
            ViewName: "majorbaseSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        operator: "eq",
                        logic: "and",
                        value: $child3Id
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.child4 = result.data;
            });
    }

    $scope.checkstep1 = function () {
        if (($scope.sch_id) && ($scope.sch_name) && ($scope.sch_type)) {
            return false;
        } else {
            return true;
        }
    }

    $scope.checkstep2 = function () {
        if (($scope.sch_city) && ($scope.zanghLenth)) {
            return false;
        } else {
            return true;
        }
    }
    $scope.checkstep3 = function () {
        if ($scope.arr2Path.length != 0 || $scope.arr3Path.length != 0 || $scope.arr4Path.length != 0) {
            return false;
        } else {
            return true;
        }
    }

    $scope.setStylePic = function ($state, $name, $val) {
        // ng-click="moveprogss(40, 'pic2')"
        //pic1
        if ($state == 'prv' && $name == 'pic1') {
            document.getElementById("pic1").className = "gray0";
            document.getElementById("pic2").className = "gray100";
            document.getElementById("pic3").className = "gray100";
        }


        //pic2
        else if ($state == 'next' && $name == 'pic2') {
            document.getElementById("pic2").className = "gray0";
            document.getElementById("pic1").className = "gray100";

            document.getElementById("pic3").className = "gray100";
            $scope.moveprogss($val, 'pic2');
        } else if ($state == 'prv' && $name == 'pic2') {
            document.getElementById("pic2").className = "gray0";
            document.getElementById("pic1").className = "gray100";

            document.getElementById("pic3").className = "gray100";
        }

        //pic3
        else if ($state == 'next' && $name == 'pic3') {
            document.getElementById("pic3").className = "gray0";
            document.getElementById("pic1").className = "gray100";
            document.getElementById("pic2").className = "gray100";
            $scope.moveprogss($val, 'pic3');
        } else if ($state == 'prv' && $name == 'pic3') {
            document.getElementById("pic3").className = "gray0";
            document.getElementById("pic1").className = "gray100";
            document.getElementById("pic2").className = "gray100";
        }

    }
    $scope.moveprogss = function ($value, $name) {

        if ($value == 100 && width == 100) {
            $scope.insertStudentsFunc();
        }
        if (i == 0) {
            i = 1;
            var elem = document.getElementById("myBar");
            var id = setInterval(frame, 10);

            function frame() {
                if (width >= $value) {
                    clearInterval(id);
                    i = 0;
                } else {
                    width++;
                    elem.style.width = width + "%";
                    if (width == 100) {
                        $scope.insertStudentsFunc();
                    }
                }
            }
        }
    }
    $scope.resetmyData = function () {
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
        $scope.arrayMB = [];
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
        console.log("stingarry1", stingarry1);
        var mbs = {
            ViewName: "majorbaseSelect",
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
                console.log("s2",$scope.s2);
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
        console.log("stingarry2", stingarry2);
        var mbs = {
            ViewName: "majorbaseSelect",
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
                console.log("  $scope.s3 ",   $scope.s3 );
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
        console.log("  stingarry3 ",   stingarry3 );
        var mbs = {
            ViewName: "majorbaseSelect",
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
                console.log("  $scope.s4 ",   $scope.s4 );
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
                }
            }
        }
    }
    $scope.insert_school = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.sch_id) && ($scope.sch_name) && ($scope.sch_type) && ($scope.sch_city) && ($scope.arr2Path.length != 0 || $scope.arr3Path.length != 0 || $scope.arr4Path.length != 0)) {
                if ($scope.arr4Path.length != 0) {
                    for (var j = 0; j < $scope.arr4Path.length; j++) {
                        $scope.arrayMB[j] = $scope.arr4Path[j];
                    }
                } else if ($scope.arr3Path.length != 0) {
                    for (var c = 0; c < $scope.arr3Path.length; c++) {
                        $scope.arrayMB[c] = $scope.arr3Path[c];
                    }
                } else if ($scope.arr2Path.length != 0) {
                    for (var i = 0; i < $scope.arr2Path.length; i++) {
                        $scope.arrayMB[i] = $scope.arr2Path[i];
                    }
                } else if ($scope.arr1Path.length != 0) {
                    for (var e = 0; e < $scope.arr1Path.length; e++) {
                        $scope.arrayMB[e] = $scope.arr1Path[e];
                    }
                }
                console.log($scope.arrayMB);
                if ($scope.sch_shift == '0') {
                    $scope.sch_difftime = '0';
                }
                var dataArray = [];
                var ins_sch = {
                    ViewName: "SchoolInsert",
                    parameters: [
                        {key: "%code", value: $scope.sch_id + ''},
                        {key: "%name", value: $scope.sch_name + ''},
                        {key: "%phone", value: $scope.sch_tel || '' + ''},
                        {key: "%note", value: $scope.sch_note || '' + ''},
                        {key: "%province", value: $scope.sch_province || '' + ''},
                        {key: "%city", value: $scope.sch_city + ''},
                        {key: "%address", value: $scope.sch_address || '' + ''},
                        {key: "%area", value: $scope.sch_area || '' + ''},
                        {key: "%jensiyat", value: $scope.sch_type + ''},
                        {key: "%difftime", value: $scope.sch_difftime || '0' + ''},
                        {key: "%zanghLenth", value: $scope.zanghLenth + ''},
                    ]
                };
                dataArray.push(ins_sch);
                for (var i = 0; i < $scope.arrayMB.length; i++) {

                    var ins_smb = {
                        ViewName: "majorbaseSchoolInsert",
                        parameters: [
                            {key: "%majorbaseid", value: $scope.arrayMB[i] + ''},
                        ]
                    };
                    dataArray.push(ins_smb);
                }
                alert(JSON.stringify(dataArray));
                $http.post(URL_ARRAY_INSERT, JSON.stringify(dataArray))
                    .success(function (result, status, headers, config) {
                        alert("آموزشگاه جدیدی با عنوان " + $scope.sch_name + " با موفقیت درج شد.");
                        document.location.replace("#/app/page/schoolCtrl");
                    }).error(function (result, status, header, config) {
                    alert("درج آموزشگاه با خطا مواجه شد.");
                    document.location.reload();
                });

            } else {
                if (!$scope.sch_id) {
                    $scope.eroretext = "کد اموزشگاه";
                } else if (!$scope.name) {
                    $scope.eroretext = "نام آموزشگاه";
                } else if (!$scope.sch_type) {
                    $scope.eroretext = "نوع آموزشگاه";
                } else if (!$scope.sch_city) {
                    $scope.eroretext = "شهر";
                } else if (!($scope.arr3Path.length != 0 || $scope.arr4Path.length != 0)) {
                    $scope.eroretext = "مقطع تحصیلی";
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
]);