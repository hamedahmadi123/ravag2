app.controller('envelop_parrent', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {

    $scope.envelopText = "متن نامه...";
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
                if ($scope.studentClass.length != 0 && $scope.studentClass.length != null && $scope.studentClass.length != undefined) {
                    $('#myModal').modal();
                }
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
    $scope.insertText = function () {
        $scope.envelopText = $scope.env_note;
        $('#myModal').modal('hide');
    }
    $scope.editText = function () {
        $scope.env_note = $scope.envelopText;

    }
}
])
;