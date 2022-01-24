app.controller('permission', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {

    $scope.useridTemp = "";
    $scope.userid = "";
    myfunc();

    function myfunc() {
        var msg = {
            ViewName: "TeacherSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "teacherid",
                        logic: "and",
                        operator: "eq",
                        value: localStorage.userId + ""
                    },
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(msg)).success(function (result, status, headers, config) {
            $scope.userProfile = result.data[0];
        }).error(function (result, status, header, config) {
        })
        try {
            var all = {
                ViewName: "TeacherSelect",
                mutualTransaction: {
                    Columns: [],
                    kendoDataRequest: {
                        filter: {
                            // field: "schoolid",
                            // logic: "and",
                            // operator: "eq",
                            // value: localStorage.schoolId + ""
                        },
                    }
                },
            };
            $http.post(URL_GET, JSON.stringify(all)).success(function (result, status, headers, config) {
                $scope.alluser = result.data;
            }).error(function (result, status, header, config) {
            })
        } catch (e) {

        }

    }

    $scope.selectgrp = function ($roleid) {
        if ($scope.modelRole && $scope.modelRole != "" && $scope.modelRole != undefined && $scope.modelRole != "undefined") {
            document.getElementById($scope.modelRole).style.border = "none";
            document.getElementById($roleid).style.border = "1px #27c24c solid";
        } else {
            document.getElementById($roleid).style.border = "1px #27c24c solid";
        }
        $scope.modelRole = $roleid;


    }

    $scope.selectRole = function ($name, $id) {
        $scope.username = $name;
        $scope.userid = $id;
        $http.post(URL_GET, JSON.stringify({
            ViewName: "XV_SelectRole",
            parameters: [
                {key: "%schoolid", value: localStorage.schoolId},
            ],
        })).success(function (result, status, headers, config) {
            $scope.roles = result.data;
        });
    }
    $scope.UpdateUserRole = function ($id) {
        var upd_UserRole = {
            ViewName: "XV_UpdateUserRole",
            parameters: [
                {key: "%role_id", value: $scope.modelRole + ''},
                {key: "%teacherid", value: $id + ''},
            ]
        };
        var j = confirm("آیا برای تعیین سطح دسترسی برای " + $scope.username + " اطمینان دارید ؟ ");
        if (j === true) {
            $http.post(URL_INSERT, JSON.stringify(upd_UserRole))
                .success(function (result, status, headers, config) {
                    var x = document.getElementById("snackbar");
                    x.className = "show";
                    setTimeout(function () {
                        x.className = x.className.replace("show", "");
                    }, 2000);
                    myfunc();
                    $('#myModal').modal('hide');
                }).error(function (result, status, header, config) {
                alert(" با خطا مواجه شد.");
                document.location.reload();
            });
        }
    }
    $scope.closeAccunt1 = function () {
        var j = confirm("آیا میخواهید از حساب خود خارج شوید ؟");
        if (j === !0) {
            localStorage.adminCount = "";
            localStorage.adminId = "";
            localStorage.userId = "";
            document.location.replace("#/index.html/");
        }
    }
    $scope.profileEdite = function ($userid) {
        document.getElementById("porC").className = "active";
        document.getElementById("perC").className = "";
        $scope.useridTemp = $userid;
        var pro = {
            ViewName: "TeacherSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "teacherid",
                        logic: "and",
                        operator: "eq",
                        value: $userid + ""
                    },
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(pro)).success(function (result, status, headers, config) {
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

        }).error(function (result, status, header, config) {
        })

    }

    $scope.updateTecherFunctin = function ($id) {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.th_fitstname) && ($scope.th_lastname) && ($scope.th_fathername) && ($scope.th_mdrk) && ($scope.th_type)) {
                var upd_th = {
                    ViewName: "TeacherUpdate",
                    parameters: [
                        {key: "%teacherid", value: $id + ''},
                        {key: "%firstname", value: $scope.th_fitstname + ''},
                        {key: "%lastname", value: $scope.th_lastname + ''},
                        {key: "%fathername", value: $scope.th_fathername + ''},
                        {key: "%codemeli", value: $scope.th_codemeli || '' + ''},
                        {key: "%birthDate", value:moment($scope.th_berthday, 'jYYYY-jM-jD').format('YYYY-M-D') + ''},
                        {key: "%address", value: $scope.th_address || '' + ''},
                        {key: "%mobile", value: $scope.th_phone || '' + ''},
                        {key: "%email", value: $scope.th_email || '' + ''},
                        {key: "%personeli", value: $scope.th_prscode || '' + ''},
                        {key: "%educationdegreeid", value: $scope.th_mdrk + ''},
                        {key: "%teachertype", value: $scope.th_type + ''},
                        {key: "%image", value: $scope.th_image || '' + ''},
                        {key: "%note", value: $scope.th_note || '' + ''},
                        {key: "%schoolid", value: localStorage.schoolId},
                        {key: "%username", value: $scope.th_codemeli},
                        {key: "%password", value: $scope.th_codemeli},
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
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
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
        $scope.upImage = data.response.data;
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


}])
;
