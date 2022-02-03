app.controller('printClassList', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {
        $scope.dateNow = moment().format('jYYYY-jM-jD h:mm:ss');
        $scope.year = moment().format('jYYYY');
        $scope.nextYear = parseInt($scope.year[$scope.year.length - 2] + $scope.year[$scope.year.length - 1]) + 1;
        funcn();

        function funcn() {
            myVar = setTimeout(myfunction, 300);
        }

        function myfunction() {
            var full_url = document.URL;
            var url_array = full_url.split('/')
            $scope.main_id = url_array[url_array.length - 3];
            $scope.teacher_id = url_array[url_array.length - 2];
            $scope.lesson_id = url_array[url_array.length - 1];
            var ClS = {
                ViewName: "selectProgramClassByCLT",
                parameters: [
                    {key: "%classid", value: $scope.main_id + ""},
                    {key: "%teacherid", value: $scope.teacher_id + ""},
                    {key: "%lessonid", value: $scope.lesson_id + ""}
                ],
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
            $http.post(URL_GET, JSON.stringify(ClS))
                .success(function (result, status, headers, config) {
                    try {
                        for (let i = 0; i < result.data.length; i++) {
                            result.data[i].index = i + 1;
                        }
                        $scope.classSession = result.data;

                    } catch (e) {

                    }
                });
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
                    $scope.thisSchool = result.data[0];

                });
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
    }]
);