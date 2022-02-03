app.controller('sendSMS', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.obj = {};
    $scope.envelopText = "";
    $scope.smsLen = 0;
    $scope.studentClass = [];
    $scope.sender = {};
    $scope.objActive = {};
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
                        value: $scope.classId + '',
                        filters: [
                            {field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ""}
                        ]
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(class_student))
            .success(function (result, status, headers, config) {
                    $scope.studentClass = result.data;
                    for (var i = 0; i < $scope.studentClass.length; i++) {
                        if ($scope.studentClass[i].fathermobile && $scope.studentClass[i].fathermobile != null && $scope.studentClass[i].fathermobile != ' ') {
                            $scope.objActive[$scope.studentClass[i].studentid] = false;
                        } else if ($scope.studentClass[i].mothermobile && $scope.studentClass[i].mothermobile != null && $scope.studentClass[i].mothermobile != ' ') {
                            $scope.objActive[$scope.studentClass[i].studentid] = false;
                        } else {
                            $scope.objActive[$scope.studentClass[i].studentid] = true;
                        }
                    }

                    if ($scope.studentClass.length != 0 && $scope.studentClass.length != null && $scope.studentClass.length != undefined) {
                        var smsTemp = {
                            ViewName: "SelectSmsTemplate",
                            mutualTransaction: {
                                kendoDataRequest: {
                                    filter: {
                                        field: "schoolId",
                                        logic: "and",
                                        operator: "eq",
                                        value: localStorage.schoolId + ""
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
                }
            );

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
            if ($scope.sender[$id]) {
                delete $scope.sender[$id];
            }
        }

    }
    $scope.returnTel = function ($f_tel, $m_tel) {
        try {
            if ($f_tel && $f_tel != null && $f_tel != undefined) {
                return $f_tel.toString();
            } else if ($m_tel && $m_tel != null && $m_tel != undefined) {
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
        if ($length == '0') {
            $scope.smsLen = 0;
        } else {
            var len = parseInt($length / 70);
            $scope.smsLen = len + 1;
        }
    }
    $scope.BackToHistory = function () {
        window.history.back();
    }
    $scope.sendSMS = function () {
        $scope.arrayphone = [];
        for (item in $scope.sender) {
            $scope.arrayphone.push($scope.sender[item].tel);
        }
        if ($scope.arrayphone.length != '0') {
            if ($scope.envelopText && $scope.envelopText != null && $scope.envelopText != '' && $scope.envelopText != undefined && $scope.envelopText != 'undefined') {
                var j = confirm("آیا برای ارسال پیامک برای دانش آموزان انتخاب شده اطمینان دارید ؟ ");
                if (j === true) {
                    var con = {sms: $scope.envelopText + "", phones: $scope.arrayphone.join(',') + ""};
                    $http.post(URL_ArraySms, JSON.stringify(con))
                        .success(function (result, status, headers, config) {
                            alert("ارسال پیامک برای اولیا دانش آموزان با موفقیت انجام شد.");
                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("ارسال پیامک برای اولیا دانش آموزان با خطا مواجه شد.");
                        document.location.reload();
                    });
                }
            } else {
                alert("متن پیامک خالی میباشد . \n لطفا متن خود را وارد نمایید.");
                $('#myModal').modal();

            }
        } else {
            alert("هیچ شماره ای یافت نشد. \n لطفا ابتدا دانش آموزان مورد نظر را انتخاب نمایید.");
        }
    }
}
])
;