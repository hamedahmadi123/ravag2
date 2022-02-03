app.controller('insertTheacher', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    var ber = null;
    var i = 0;
    var width = 1;
    $scope.th_image = "";
    $scope.users = [
        {value: "1", name: "مدیر آموزشگاه"},
        {value: "2", name: "معاون"},
        {value: "3", name: "معلم"},
        {value: "4", name: "کاربر"},
        {value: "5", name: "مدیر سیستم"},
        {value: "6", name: "خدمتگزار"},
    ];
        myFunction();

    function myFunction() {
        document.getElementById("pic1").className = "gray0";
        document.getElementById("pic2").className = "gray100";
        document.getElementById("pic3").className = "gray100";

        $http.post(URL_GET, JSON.stringify({
            ViewName: "XV_SelectRole",
            parameters: [
                {key: "%schoolid", value: localStorage.schoolId},
            ],
        })).success(function (result, status, headers, config) {
            $scope.roles = result.data;
        });
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

    }

    $scope.setStylePic = function ($state, $name, $val) {
        // ng-click="moveprogss(40, 'pic2')"
        //pic1
        if ($state == 'prv' && $name == 'pic1') {
            document.getElementById("pic1").className = "gray0";
            document.getElementById("pic2").className = "gray100";
            document.getElementById("pic3").className = "gray100";
        }


        //pic2
        else if ($state == 'next' && $name == 'pic2') {
            document.getElementById("pic2").className = "gray0";
            document.getElementById("pic1").className = "gray100";

            document.getElementById("pic3").className = "gray100";
            $scope.moveprogss($val, 'pic2');
        } else if ($state == 'prv' && $name == 'pic2') {
            document.getElementById("pic2").className = "gray0";
            document.getElementById("pic1").className = "gray100";

            document.getElementById("pic3").className = "gray100";
        }

        //pic3
        else if ($state == 'next' && $name == 'pic3') {
            document.getElementById("pic3").className = "gray0";
            document.getElementById("pic1").className = "gray100";
            document.getElementById("pic2").className = "gray100";
            $scope.moveprogss($val, 'pic3');
        } else if ($state == 'prv' && $name == 'pic3') {
            document.getElementById("pic3").className = "gray0";
            document.getElementById("pic1").className = "gray100";
            document.getElementById("pic2").className = "gray100";
        }

    }
    $scope.setCity = function ($cityId) {
        $scope.ins_orderlocation = $cityId;
    }
    $scope.moveprogss = function ($value, $name) {

        if ($value == 100 && width == 100) {
            $scope.insertTecherFunc();
        }
        if (i == 0) {
            i = 1;
            var elem = document.getElementById("myBar");
            var id = setInterval(frame, 10);

            function frame() {
                if (width >= $value) {
                    clearInterval(id);
                    i = 0;
                } else {
                    width++;
                    elem.style.width = width + "%";
                    if (width == 100) {
                        $scope.insertTecherFunc();
                    }
                }
            }
        }
    }
    $scope.checkstep1 = function () {
        if (($scope.th_fitstname) && ($scope.th_lastname) && ($scope.th_fathername) && ($scope.th_codemeli)) {
            return false;
        } else {
            return true;
        }
    }

    $scope.checkstep2 = function () {
        return false;
    }
    $scope.checkstep3 = function () {
        if (($scope.th_mdrk) && ($scope.th_type)&&($scope.th_roleid)) {
            return false;
        } else {
            return true;
        }
    }
    $scope.insertTecherFunc = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.th_fitstname) &&  ($scope.th_lastname) && ($scope.th_codemeli) && ($scope.th_fathername) && ($scope.th_mdrk) && ($scope.th_type) && ($scope.th_roleid)) {
                var bertday = '';
                if ($scope.th_berthday) {
                    bertday = moment($scope.th_berthday, 'jYYYY-jM-jD').format('YYYY-M-D');
                } else {
                    var splitbertday = moment().format().split("T");
                    bertday = splitbertday[0];
                }

                var ins_th = {
                    ViewName: "TeacherInsert",
                    parameters: [
                        {key: "%firstname", value: $scope.th_fitstname + ''},
                        {key: "%lastname", value: $scope.th_lastname + ''},
                        {key: "%fathername", value: $scope.th_fathername + ''},
                        {key: "%codemeli", value: $scope.th_codemeli || '' + ''},
                        {key: "%birthDate", value: bertday+''},
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
                        {key: "%role_id", value:$scope.th_roleid},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(ins_th))
                    .success(function (result, status, headers, config) {
                        alert("معلم جدیدی با نام " + $scope.th_fitstname + " " + $scope.th_lastname + " با موفقیت درج شد.");
                        document.location.replace("#/app/page/teachers");
                    }).error(function (result, status, header, config) {
                    alert("درج معلم با خطا مواجه شد.");
                    document.location.reload();
                });

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
        $scope.th_image = data.response.data;
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