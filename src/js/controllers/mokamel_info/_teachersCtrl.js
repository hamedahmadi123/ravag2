app.controller('teachers', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.users = [
        {value: "1", name: "مدیر آموزشگاه"},
        {value: "2", name: "معاون"},
        {value: "3", name: "معلم"},
        {value: "4", name: "کاربر"},
        {value: "5", name: "مدیر سیستم"},
        {value: "6", name: "خدمتگزار"},
    ];
    $scope.eroretext = "";
    $scope.titelext = "";
    $scope.name = [];
    $scope.arrselect = [];
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
            ViewName: "TeacherSelect",
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "schoolid",
                        logic: "and",
                        operator: "eq",
                        value: localStorage.schoolId+""
                    },
                    skip: skip,
                    take: take,
                    Sort: [{field: "teacherid", dir: "DESC"}]
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
                document.location.replace();

            });

    };

    $scope.detailTh = function ($id) {
        var stu = {
            ViewName: "TeacherSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "teacherid",
                        logic: "and",
                        operator: "eq",
                        value: $id + ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(stu))
            .success(function (result, status, headers, config) {
                $scope.thisTh = result.data[0];
                $scope.th_id = $scope.thisTh.codemeli;
                $scope.th_name = $scope.thisTh.firstname + " " + $scope.thisTh.lastname;
                if ($scope.thisTh.birthDate) {
                    $scope.th_berthday = moment($scope.thisTh.birthDate, 'YYYY-M-D').format('jYYYY-jM-jD');
                }
                $scope.th_address = $scope.thisTh.address;
                $scope.th_tel = $scope.thisTh.mobile;
                $scope.th_madrak = $scope.thisTh.madrakTahsili;
                $scope.th_type = $scope.thisTh.teachertype + '';
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
                ViewName: "TeacherDelete",
                parameters: [
                    {key: "%teacherid", value: $scope.arrselect[i] + ''},
                ]
            };
            dataArray.push(del_Item);
        }
        var j = confirm("آیا برای حذف معلین انتخاب شده اطمینان دارید ؟ ");
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
    $scope.deleteTecher = function ($id, $name) {
        var del_Item = {
            ViewName: "TeacherDelete",
            parameters: [
                {key: "%teacherid", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف معلم با نام " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
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