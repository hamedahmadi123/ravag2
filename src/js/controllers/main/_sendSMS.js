app.controller('sendSMS', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.obj = {};
    $scope.envelopText = "";
    $scope.smsLen = 0;
    $scope.studentClass = [];
    $scope.sender = {};
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
                    var smsTemp = {
                        ViewName: "SelectSmsTemplate",
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
                    $http.post(URL_GET, JSON.stringify(smsTemp))
                        .success(function (result, status, headers, config) {
                            $scope.smsTemps = result.data;
                        });
                    $('#myModal').modal();
                }
            });

    }

    $scope.selectAllSt = function () {
        for (var i = 0; i < $scope.studentClass.length; i++) {
            $scope.obj[$scope.studentClass[i].studentid] = !$scope.obj[$scope.studentClass[i].studentid];
            $scope.sender[$scope.studentClass[i].studentid] = {
                student_id: $scope.studentClass[i].studentid,
                tel: $scope.returnTel($scope.studentClass[i].fathermobile, $scope.studentClass[i].mothermobile),
            };
            $scope.checkbox1 = $scope.obj[$scope.studentClass[i].studentid];
        }
    }
    $scope.selectSt = function ($check, $id, $father_tel, $mother_tel) {
        if ($check == true) {
            $scope.sender[$id] = {
                student_id: $id,
                tel: $scope.returnTel($father_tel, $mother_tel),
            }
        } else {
            if( $scope.sender[$id])
            {
                delete $scope.sender[$id];
            }
        }
    }
    $scope.returnTel = function ($f_tel, $m_tel) {
        try {
            if ($f_tel && $f_tel != null && $f_tel != undefined) {
                return $f_tel.toString();
            } else if ($m_tel && $m_tel != null && $m_tel != undefined) {
                console.log("else")
                return $m_tel.toString();
            }
        } catch (e) {
            return;
        }

    }
    $scope.insertText = function () {
        $scope.envelopText = $scope.sms_note;
        $('#myModal').modal('hide');
    }
    $scope.editText = function () {
        $scope.sms_note = $scope.envelopText;

    }
    $scope.setTemp = function ($txt) {
        $scope.smsLen = 0;
        $scope.sms_note = $txt;
        $scope.smsLength($txt.length);
    }
    $scope.smsLength = function ($length) {
        var len = parseInt($length / 70);
        $scope.smsLen = len + 1;
    }
    $scope.BackToHistory = function () {
        window.history.back();
    }
    $scope.sendSMS = function () {
        console.log($scope.sender);
    }
}
])
;