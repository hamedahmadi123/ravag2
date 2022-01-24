app.controller('students', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretext = "";
    $scope.arrselect = [];
    $scope.titelext = "";
    $scope.name = [];
    var skip = -15;
    var take = 15;
    var objects = 0;
    var isem = false;
    $scope.filterText = "همه دانش آموزان";
    var cls = {
        ViewName: "ClassSelect",
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
    $http.post(URL_GET, JSON.stringify(cls))
        .success(function (result, status, headers, config) {
                $scope.class = result.data;
            }
        );

    $scope.load2 = function () {
        if (isem)
            return;

        skip += take;
        for (var i = 1; i <= take; i++) {
            $scope.name.push({order_id: "-1" + $scope.name.length});
        }
        var msg = {
            ViewName: "SelectAllStudent",
            parameters: [{key: "%schoolid", value: localStorage.schoolId}],
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "", logic: "", operator: "", value: ""

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

    };
    $scope.filterByClass = function ($classId, $name) {
        $scope.filterText = "دانش آموزان کلاس " + $name;
        $scope.name = [];
        skip = -15;
        take = 15;
        objects = 0;
        isem = false;
        if (!$classId) {
            skip = -15;
            take = 15;
            objects = 0;
            isem = false;
            $scope.load2();
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
    $scope.detailSt = function ($id) {
        var stu = {
            ViewName: "SelectAllStudent",
            parameters: [{key: "%schoolid", value: localStorage.schoolId}],
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "studentid",
                        logic: "and",
                        operator: "eq",
                        value: $id + ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(stu))
            .success(function (result, status, headers, config) {
                $scope.thisSt = result.data[0];
                $scope.stu_id = $scope.thisSt.studentcode;
                $scope.stu_name = $scope.thisSt.firstname + " " + $scope.thisSt.lastname;
                if ($scope.thisSt.birthdate) {
                    var splitberthday = $scope.thisSt.birthdate.split(' ');
                    $scope.stu_berthday = moment(splitberthday, 'YYYY-M-D').format('jYYYY-jM-jD');
                }
                $scope.stu_address = $scope.thisSt.address;
                $scope.stu_tel = $scope.thisSt.phone;
                $scope.stu_ilness = $scope.thisSt.illness;
                $scope.stu_major = $scope.thisSt.title;
            });
    }
    // delete******************************
    $scope.itemArray = function ($id, $bool) {
        if ($bool == true) {
            $scope.arrselect.push($id);
        } else {
            for (var i = 0; i < $scope.arrselect.length; i++) {
                if ($scope.arrselect[i] === $id) {
                    $scope.arrselect.splice(i, 1);
                }
            }
        }
    }

    $scope.deleteAll = function () {
        var dataArray = [];
        for (var i = 0; i < $scope.arrselect.length; i++) {
            var del_Item = {
                ViewName: "StudentDelete",
                parameters: [
                    {key: "%studentid", value: $scope.arrselect[i] + ''},
                ]
            };
            dataArray.push(del_Item);
        }
        var j = confirm("آیا برای حذف دانش آموزان انتخاب شده اطمینان دارید ؟ ");
        if (j === true) {
            $http.post(URL_ARRAY_INSERT, JSON.stringify(dataArray))
                .success(function (result, status, headers, config) {
                    document.location.reload();
                }).error(function (result, status, header, config) {
                alert("حذف با خطا مواجه شد.");
                document.location.reload();
            });
        }
    }
    $scope.deleteStudent = function ($id, $name) {
        var del_Item = {
            ViewName: "StudentDelete",
            parameters: [
                {key: "%studentid", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف دانش آموز با نام " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
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
}])
;