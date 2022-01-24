app.controller('weeklyschedule', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.techerLesson = [];
    $scope.cls_id = "";
    $scope.cls_name = "";
    $scope.eroretext = "";
    $scope.data1 = [];
    $scope.class = [];
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
        var url_array = full_url.split('/');
        $scope.cls_id = url_array[url_array.length - 1];

        if ($scope.cls_id) {
            $scope.wkl_class = $scope.cls_id;
            $scope.setClassWeekly($scope.cls_id);
        }

    }

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

    var cls = {
        ViewName: "ClassSelect",
        mutualTransaction: {
            kendoDataRequest: {
                filter: {
                    field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ''
                },
            }
        }
    }
    $http.post(URL_GET, JSON.stringify(cls))
        .success(function (result, status, headers, config) {
            $scope.class = result.data;
            if ($scope.cls_id) {
                for (var i = 0; i < $scope.class.length; i++) {
                    if ($scope.class[i].classid == $scope.cls_id) {
                        $scope.cls_name = $scope.class[i].title;
                    }

                }
            }

        });
    $scope.setClassWeekly = function ($id) {
        $scope.obj = {
            child2: {},
            child1: {}
        };
        for (var i = 0; i < $scope.class.length; i++) {
            if ($scope.class[i].classid == $id) {

                $scope.cls_name = $scope.class[i].title;
            }
        }
        try {
            var wksch = {
                ViewName: "WeeklyscheduleSelect",
                mutualTransaction: {
                    kendoDataRequest: {
                        filter: {
                            field: "classid",
                            logic: "and",
                            operator: "eq",
                            value: $id + ""
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
    }
    $scope.printDiv = function (div) {
        var docHead = document.head.outerHTML;
        var printContents = document.getElementById(div).outerHTML;
        var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no, toolbar=no,dependent=no, width=1000, height=600, resizable=yes, screenX=200, screenY=100, personalbar=no, scrollbars=yes";

        var newWin = window.open("", "_blank", winAttr);
        var writeDoc = newWin.document;
        writeDoc.open();
        writeDoc.write('<!doctype html><html>' + docHead + '<body onLoad="window.print();window.close();">' + printContents + '</body></html>');
        writeDoc.close();


    }
    $scope.BackToHistory = function () {
        window.history.back();
    }
}
])
;