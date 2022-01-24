app.controller('report_card_class', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {
        $scope.report_st = [];
        $scope.dateNow = moment().format('jYYYY-jM-jD h:mm:ss');
        $scope.year = moment().format('jYYYY');
        $scope.nextYear = moment().add(1, 'years').format('jYYYY');
        $scope.classSession = new Object();
        funcn();

        function funcn() {
            myVar = setTimeout(myfunction, 300);
        }

        function myfunction() {
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
            var full_url = document.URL;
            var url_array = full_url.split('/')
            $scope.class_id = url_array[url_array.length - 1];
            var class_student = {
                ViewName: "SelectRiportCard",
                parameters: [{key: "%classid", value:$scope.class_id + ''}],
                mutualTransaction: {
                    kendoDataRequest: {
                        filter: {
                            field: "",
                            logic: "",
                            operator: "",
                            value: ''
                        },
                    }
                }
            }
            $http.post(URL_GET, JSON.stringify(class_student))
                .success(function (result, status, headers, config) {
                    $scope.studentClassRiportCard = result.data;
                    for (var i = 0; i < $scope.studentClassRiportCard.length ; i++) {
                        $scope.studentClassRiportCard[i].index = i+1;
                    }
                    console.log($scope.studentClassRiportCard);
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
)
;