app.controller('students_card', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {

    funcn();

    function funcn() {
        myVar = setTimeout(myfunction, 300);
    }

    function myfunction() {
        var full_url = document.URL;
        var url_array = full_url.split('/')
        $scope.classId = url_array[url_array.length - 1];
        var class_student = {
            ViewName: "SelectStudentInClass",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "classid",
                        logic: "and",
                        operator: "eq",
                        value: $scope.classId + ''
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(class_student))
            .success(function (result, status, headers, config) {
                $scope.studentClass = result.data;

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
}
])
;