app.controller('Enzebat_student', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretext = "";
    $scope.arrselect = [];
    $scope.titelext = "";
    $scope.name = [];
    $scope.obj_clt = {};
    var skip = -15;
    var take = 15;
    var objects = 0;
    var isem = false;

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

    $scope.load2 = function ($filter) {
        if (isem)
            return;

        skip += take;
        for (var i = 1; i <= take; i++) {
            $scope.name.push({order_id: "-1" + $scope.name.length});
        }
        var msg = {
            ViewName: "SelectDiscipline",
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "schoolid",
                        logic: "and",
                        operator: "eq",
                        value: localStorage.schoolId + ""
                    },
                    skip: skip,
                    take: take,
                    Sort: [{field: "disciplineid", dir: "DESC"}]
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

    $scope.crDate = function ($date) {
        return moment($date, 'YYYY-M-D').format('jYYYY-jM-jD');
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
    $scope.itemArray = function ($id, $bool, $name) {
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
        if ($scope.arrselect.length != 0) {
            var dataArray = [];
            for (var i = 0; i < $scope.arrselect.length; i++) {
                var del_Item = {
                    ViewName: "DeleteDiscipline",
                    parameters: [
                        {key: "%disciplineid", value: $scope.arrselect[i] + ''},
                    ]
                };
                dataArray.push(del_Item);
            }
            var j = confirm("آیا برای حذف موارد انضباطی انتخاب شده اطمینان دارید ؟ ");
            if (j === true) {
                $http.post(URL_ARRAY_INSERT, JSON.stringify(dataArray))
                    .success(function (result, status, headers, config) {
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("حذف گروهی با خطا مواجه شد.");
                    document.location.reload();
                });
            }
        } else {
            alert("لطفا حداقل یک مورد را برای حذف انتخاب نمایید.")
        }
    }
    $scope.deleteDis = function ($id, $name) {
        var del_Item = {
            ViewName: "DeleteDiscipline",
            parameters: [
                {key: "%disciplineid", value: $id + ''},
            ]
        };
        var j = confirm("آیا برای حذف مورد انضباطی دانش آموز " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
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

}
])
;
