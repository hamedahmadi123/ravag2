app.controller('insertStudent', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.stu_image = "";
    $scope.isMajor = false;
    $scope.scholtype = JSON.parse(localStorage.schoolBase);
    for (var i = 0; i < $scope.scholtype.length; i++) {
        if ($scope.scholtype[i] >= 1 && $scope.scholtype[i] <= 6) {
            // console.log("ابتدایی");
            $scope.isMajor = false;
        } else if ($scope.scholtype[i] >= 7 && $scope.scholtype[i] <= 9) {
            // console.log("راهنمایی");
            $scope.isMajor = false;
        } else if ($scope.scholtype[i] >= 10 && $scope.scholtype[i] <= 12) {
            // console.log("دبیرستان");
            $scope.isMajor = true;
        }
    }
    var i = 0;
    var width = 1;
    myFunction();

    function myFunction() {

        document.getElementById("pic1").className = "gray0";
        document.getElementById("pic2").className = "gray100";
        document.getElementById("pic3").className = "gray100";

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
        var mbs = {
            ViewName: "majorbaseschoolselect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "schoolid",
                        logic: "and",
                        operator: "eq",
                        value: localStorage.schoolId
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.majorbase = result.data;
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
            $scope.insertStudentsFunc();
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
                        $scope.insertStudentsFunc();
                    }
                }
            }
        }
    }
    $scope.checkstep1 = function () {
        if (($scope.stu_fitstname) && ($scope.stu_lastname) && ($scope.stu_codemeli)) {
            return false;
        } else {
            return true;
        }
    }

    $scope.checkstep2 = function () {
        if (($scope.stu_base)) {
            if ($scope.isMajor == true) {
                if ($scope.stu_major) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    $scope.checkstep3 = function () {
        if (($scope.stu_f_name)) {
            return false;
        } else {
            return true;
        }
    }
    $scope.setMajorBase = function ($id) {
        var mbs = {
            ViewName: "allmajor",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        logic: "and",
                        operator: "eq",
                        value: $id + ''
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.majors = result.data;
            });
    }
    $scope.insertStudentsFunc = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            console.log($scope.stu_codemeli);
            console.log($scope.stu_fitstname);
            console.log($scope.stu_lastname);
            console.log($scope.stu_base);
            console.log($scope.stu_f_name);
            if (($scope.stu_codemeli) && ($scope.stu_fitstname) && ($scope.stu_lastname) && ($scope.stu_base) && ($scope.stu_f_name)) {
                var majorbaseid = "";
                if ($scope.isMajor == true) {
                    majorbaseid = $scope.stu_major + '';
                } else {
                    majorbaseid = $scope.stu_base + '';
                }
                var bertday = '';
                if ($scope.stu_berthday) {
                    bertday = moment($scope.stu_berthday, 'jYYYY-jM-jD').format('YYYY-M-D');
                } else {
                    var splitbertday = moment().format().split("T");
                    bertday = splitbertday[0];
                }
                var ins_sch = {
                    ViewName: "StudentInsert",
                    parameters: [
                        //student-Info
                        {key: "%studentcode", value: $scope.stu_codemeli + ''},
                        {key: "%firstname", value: $scope.stu_fitstname + ''},
                        {key: "%lastname", value: $scope.stu_lastname + ''},
                        {key: "%birthdate", value: bertday + ''},
                        {key: "%phone", value: $scope.stu_phone || '' + ''},
                        {key: "%address", value: $scope.stu_address || '' + ''},
                        {key: "%note", value: $scope.stu_note || '' + ''},
                        {key: "%image", value: $scope.stu_image || '' + ''},
                        {key: "%illness", value: $scope.stu_illness || '' + ''},
                        {key: "%username", value: $scope.stu_codemeli + ''},
                        {key: "%password", value: $scope.stu_codemeli + ''},
                        {key: "%basemajorid", value: majorbaseid},
                        {key: "%schoolid", value: localStorage.schoolId + ''},
                        {key: "%isactive", value: '1'},
                        //parrent-Info
                        {key: "%fathername", value: $scope.stu_f_name + ''},
                        {key: "%fathermobile", value: $scope.stu_f_tel || '' + ''},
                        {key: "%fatherjob", value: $scope.stu_f_job || '' + ''},
                        {key: "%fathereducationdegreeid", value: $scope.stu_f_madrak || '0' + ''},
                        {key: "%mothername", value: $scope.stu_m_name || '' + ''},
                        {key: "%mothermobile", value: $scope.stu_m_tel || '' + ''},
                        {key: "%motherjob", value: $scope.stu_m_job || '' + ''},
                        {key: "%mothereducationdegreeid", value: $scope.stu_m_madrak || '0' + ''},
                        {key: "%schoolid", value: localStorage.schoolId + ''},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(ins_sch))
                    .success(function (result, status, headers, config) {
                        alert("دانش آموز جدیدی با عنوان " + $scope.stu_fitstname + " " + $scope.stu_lastname + " با موفقیت درج شد.");
                        document.location.replace("#/app/page/students");
                    }).error(function (result, status, header, config) {
                    alert("درج دانش آموز با خطا مواجه شد.");
                    document.location.reload();
                });


            } else {
                if (!$scope.stu_fitstname) {
                    $scope.eroretext = "نام دانش آموز";
                } else if (!$scope.stu_lastname) {
                    $scope.eroretext = "نام خانوادگی دانش آموز";
                } else if (!$scope.stu_codemeli) {
                    $scope.eroretext = "کد ملی دانش آموز";
                } else if (!$scope.stu_base) {
                    $scope.eroretext = "پایه تحصیلی دانش آموز";
                } else if (!$scope.stu_f_name) {
                    $scope.eroretext = "نام پدر دانش آموز";
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


}])
;