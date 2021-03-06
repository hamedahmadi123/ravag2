app.controller('profailAdmin', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretext = "";
    $scope.th_id = "";
    $scope.submitUserName = "";
    $scope.th_image = "";
    $scope.alertUsername = false;
    $scope.users = [
        {value: "1", name: "مدیر آموزشگاه"},
        {value: "2", name: "معاون"},
        {value: "3", name: "معلم"},
        {value: "4", name: "کاربر"},
        {value: "5", name: "مدیر سیستم"},
        {value: "6", name: "خدمتگزار"},
    ];
    myfunction();

    function myfunction() {
        var mdk = {
            ViewName: "educationdegreeSelect",
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
        $http.post(URL_GET, JSON.stringify(mdk))
            .success(function (result, status, headers, config) {
                $scope.madraks = result.data;
            });
        $scope.th_id = localStorage.userId;
        var thr = {
            ViewName: "TeacherSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "teacherid",
                        logic: "and",
                        operator: "eq",
                        value: $scope.th_id + ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(thr))
            .success(function (result, status, headers, config) {
                $scope.techer = result.data[0];
                $scope.th_fitstname = $scope.techer.firstname;
                $scope.th_lastname = $scope.techer.lastname;
                $scope.th_fathername = $scope.techer.fathername;
                $scope.th_codemeli = $scope.techer.codemeli;
                if ($scope.techer.birthDate) {
                    $scope.th_berthday = moment($scope.techer.birthDate, 'YYYY-M-D').format('jYYYY-jM-jD');
                }
                $scope.th_address = $scope.techer.address;
                $scope.th_phone = $scope.techer.mobile;
                $scope.th_email = $scope.techer.email;
                $scope.th_mdrk = $scope.techer.educationdegreeid;
                $scope.th_type = $scope.techer.teachertype;
                $scope.th_note = $scope.techer.note;
                $scope.th_image = $scope.techer.image;
                $scope.th_prscode = $scope.techer.personeli;
                $scope.th_username = $scope.techer.username;
                $scope.submitUserName = $scope.techer.username;
                $scope.th_pass = $scope.techer.password;
            });

    }

    $scope.updateTecherFunctin = function ($id) {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.th_fitstname) && ($scope.th_lastname) && ($scope.th_fathername) && ($scope.th_mdrk) && ($scope.th_type) && ($scope.submitUserName) && ($scope.th_pass)) {
                if ($scope.alertUsername == true) {
                    var j = confirm("نام کاربری وارد شده تایید نشد .با نام کاربری قبلی در برنامه شناخته خواهید شد ! ادامه میدهید ؟");
                    if (j === true) {

                    } else {
                        return;
                    }
                }
                var upd_th = {
                    ViewName: "TeacherUpdate",
                    parameters: [
                        {key: "%teacherid", value: $id + ''},
                        {key: "%firstname", value: $scope.th_fitstname + ''},
                        {key: "%lastname", value: $scope.th_lastname + ''},
                        {key: "%fathername", value: $scope.th_fathername + ''},
                        {key: "%codemeli", value: $scope.th_codemeli || '' + ''},
                        {key: "%birthDate", value: moment($scope.th_berthday, 'jYYYY-jM-jD').format('YYYY-M-D') + ''},
                        {key: "%address", value: $scope.th_address || '' + ''},
                        {key: "%mobile", value: $scope.th_phone || '' + ''},
                        {key: "%email", value: $scope.th_email || '' + ''},
                        {key: "%personeli", value: $scope.th_prscode || '' + ''},
                        {key: "%educationdegreeid", value: $scope.th_mdrk + ''},
                        {key: "%teachertype", value: $scope.th_type + ''},
                        {key: "%image", value: $scope.th_image || '' + ''},
                        {key: "%note", value: $scope.th_note || '' + ''},
                        {key: "%schoolid", value: localStorage.schoolId},
                        {key: "%username", value: $scope.submitUserName},
                        {key: "%password", value: $scope.th_pass},
                        {key: "%role_id", value: $scope.techer.role_id},
                    ]
                };
                var j = confirm(" آیا برای ویرایش معلم با عنوان " + $scope.th_fitstname + " " + $scope.th_lastname + " اطمینان دارید ؟ ");
                if (j === true) {
                    $http.post(URL_INSERT, JSON.stringify(upd_th))
                        .success(function (result, status, headers, config) {
                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("ویرایش معلم با خطا مواجه شد.");
                        document.location.reload();
                    });
                }
            } else {
                if (!$scope.th_fitstname) {
                    $scope.eroretext = "نام";
                } else if (!$scope.th_lastname) {
                    $scope.eroretext = "نام خانوادگی";
                } else if (!$scope.th_fathername) {
                    $scope.eroretext = "نام پدر";
                } else if (!$scope.th_mdrk) {
                    $scope.eroretext = "مدرک تحصیلی";
                } else if (!$scope.th_type) {
                    $scope.eroretext = "سمت";
                } else if (!$scope.submitUserName) {
                    $scope.eroretext = "نام کاربری";
                } else if (!$scope.th_pass) {
                    $scope.eroretext = "رمز عبور";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }
    $scope.errText = function () {
        return $scope.eroretext;
    }

    $("#uploadFile1").fileinput({
        uploadUrl: URL_upload,
        autoOrientImage: true,
        maxImageWidth: 1600,
        maxImageHeight: 800,
        resizePreference: 'height',
        resizeImage: true
    });

    $("#uploadFile1").on('fileuploaded', function (event, data) {
        // and check what's in both params
        $scope.stu_image = data.response.data;
    });
    $("#toggleOrient").on('change', function () {
        var val = $(this).prop('checked');
        $("#uploadFile1").fileinput('refresh', {
            uploadUrl: URL_upload,
            autoOrientImage: val,
            maxImageWidth: 1600,
            maxImageHeight: 800,
            resizePreference: 'height',
            resizeImage: true,
        });
        $('#togStatus')
            .html('Fileinput is reset and <samp>autoOrientImage</samp> is set to <em>'
                + (val ? 'true' : 'false') + '</em>. Retry by selecting images again.');
    });

    $scope.BackToHistory = function () {
        window.history.back();
    }

    $scope.checkUsername = function ($user, $techerid) {
        $scope.alertUsername = false;
        $http.post(URL_GET, JSON.stringify({
            ViewName: "SelectUserName",
            parameters: [
                {key: "%username", value: $user + ''},
                {key: "%teacherid", value: $techerid + ''},
            ],
        })).success(function (result, status, headers, config) {
            $scope.user = result.data;
            if ($scope.user.length == '0') {
                $scope.submitUserName = $user;
                document.getElementById("userInpout").style.border = "1px green solid";
                document.getElementById("userBtn").style.backgroundColor = "green";
            } else {
                $scope.alertUsername = true;
                $scope.submitUserName = $scope.techer.username;
                document.getElementById("userInpout").style.border = "1px red solid";
                document.getElementById("userBtn").style.backgroundColor = "red";
            }

        });
    }
}])