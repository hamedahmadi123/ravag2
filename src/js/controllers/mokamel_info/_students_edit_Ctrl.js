app.controller('Student_edit', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.parentID = 0;
    $scope.stu_image = "";
    $scope.eroretext = "";
    $scope.stu_id = "";
    $scope.pEdit = false;
    $scope.editeCode = false;
    $scope.codeEdit = true;
    $scope.parrentEdit = true;
    funcn();

    function funcn() {
        myVar = setTimeout(myfunction, 300);
    }

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
        var mbs = {
            ViewName: "majorbaseschoolselect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "schoolid",
                        logic: "and",
                        operator: "eq",
                        value: localStorage.schoolId,
                        filters: [
                            {field: "ismajor", logic: "and", operator: "eq", value: '0'},
                        ]
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                    $scope.majorbase = result.data;
                }
            )
        ;
        var full_url = document.URL;
        var url_array = full_url.split('/')
        $scope.stu_id = url_array[url_array.length - 1];
        var stu = {
            ViewName: "SelectAllStudent",
            parameters: [{key: "%schoolid", value: localStorage.schoolId}],
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "studentid",
                        logic: "and",
                        operator: "eq",
                        value: $scope.stu_id + ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(stu))
            .success(function (result, status, headers, config) {
                $scope.student = result.data[0];
                $scope.stu_id = $scope.student.studentid;
                $scope.stu_fitstname = $scope.student.firstname;
                $scope.stu_lastname = $scope.student.lastname;
                $scope.stu_codemeli = $scope.student.studentcode;
                var stu_parrent = {
                    ViewName: "ParentSelect",
                    mutualTransaction: {
                        kendoDataRequest: {
                            filter: {
                                field: "studentcode",
                                logic: "and",
                                operator: "eq",
                                value: $scope.stu_codemeli + ""
                            },
                        }
                    }
                }
                $http.post(URL_GET, JSON.stringify(stu_parrent))
                    .success(function (result, status, headers, config) {
                        $scope.student_parr = result.data[0];
                        $scope.parentID = $scope.student_parr.parentid;
                        $scope.stu_f_name = $scope.student_parr.fathername;
                        $scope.stu_f_tel = $scope.student_parr.fathermobile;
                        $scope.stu_f_job = $scope.student_parr.fatherjob;
                        $scope.stu_f_madrak = $scope.student_parr.fathereducationdegreeid;
                        $scope.stu_m_name = $scope.student_parr.mothername;
                        $scope.stu_m_tel = $scope.student_parr.mothermobile;
                        $scope.stu_m_job = $scope.student_parr.motherjob;
                        $scope.stu_m_madrak = $scope.student_parr.mothereducationdegreeid;
                    });
                if ($scope.student.birthdate) {
                    var splitberthday = $scope.student.birthdate.split(' ');
                    $scope.stu_berthday = moment(splitberthday, 'YYYY-M-D').format('jYYYY-jM-jD');
                }
                $scope.stu_address = $scope.student.address;
                $scope.stu_phone = $scope.student.phone;
                $scope.stu_note = $scope.student.note;
                $scope.stu_image = $scope.student.image;
                $scope.stu_illness = $scope.student.illness;
                var mbs = {
                    ViewName: "allmajor",
                    mutualTransaction: {
                        kendoDataRequest: {
                            filter: {
                                field: "majorbaseid",
                                logic: "and",
                                operator: "eq",
                                value: $scope.student.majorbaseid
                            },
                        }
                    }
                }
                $http.post(URL_GET, JSON.stringify(mbs))
                    .success(function (result, status, headers, config) {
                        $scope.thismajorBase = result.data[0];
                        $scope.setMajorBaseE($scope.thismajorBase.parent);
                        $scope.stu_major = $scope.thismajorBase.majorbaseid;
                        $scope.stu_base = $scope.thismajorBase.parent;
                    });


            });
    }

    $scope.setMajorBaseE = function ($id) {
        var mbs = {
            ViewName: "majorbaseschoolselect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "schoolid",
                        logic: "and",
                        operator: "eq",
                        value: localStorage.schoolId,
                        filters: [
                            {field: "ismajor", logic: "and", operator: "eq", value: '1'},
                            {field: "parent", logic: "and", operator: "eq", value: $id}
                        ]
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.majors = result.data;
            });
    }
    $scope.editParrent = function () {
        $scope.pEdit = !$scope.pEdit;
    }
    $scope.editeCodemeli = function () {
        $scope.editeCode = true;
    }
    $scope.updateStudentFunctin = function ($id) {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if ($scope.pEdit == true) {
                var username = "";
                var password = "";
                if ($scope.stu_f_tel) {
                    username = $scope.stu_f_tel;
                    password = $scope.stu_f_tel;
                } else if ($scope.stu_m_job) {
                    username = $scope.stu_m_job;
                    password = $scope.stu_m_job;
                }
                if ($scope.stu_f_name) {
                    var upd_prn = {
                        ViewName: "ParentUpdate",
                        parameters: [
                            // //parrent-Info
                            {key: "%parentid", value: $scope.parentID + ''},
                            {key: "%fathername", value: $scope.stu_f_name + ''},
                            {key: "%fathermobile", value: $scope.stu_f_tel || '' + ''},
                            {key: "%fatherjob", value: $scope.stu_f_job || '' + ''},
                            {key: "%fathereducationdegreeid", value: $scope.stu_f_madrak || '0' + ''},
                            {key: "%mothername", value: $scope.stu_m_name || '' + ''},
                            {key: "%mothermobile", value: $scope.stu_m_tel || '' + ''},
                            {key: "%motherjob", value: $scope.stu_m_job || '' + ''},
                            {key: "%mothereducationdegreeid", value: $scope.stu_m_madrak || '0' + ''},
                            {key: "%username", value: username || '' + ''},
                            {key: "%password", value: password || '' + ''},
                        ]
                    };
                    $http.post(URL_INSERT, JSON.stringify(upd_prn))
                        .success(function (result, status, headers, config) {

                            $scope.parrentEdit = true;
                        }).error(function (result, status, header, config) {
                        alert("ویرایش ولی دانش آموز با خطا مواجه شد.");
                        $scope.parrentEdit = false;
                        document.location.reload();
                    });
                } else {
                    $scope.eroretext = "نام پدر دانش آموز";
                    $scope.parrentEdit = false;
                }
            }
            if ($scope.editeCode == true) {
                if ($scope.stu_codemeli) {
                    var upd_code = {
                        ViewName: "ParentUpdateCode",
                        parameters: [
                            // //parrent-Info
                            {key: "%studentcode", value: $scope.stu_codemeli + ''},
                            {key: "%parentid", value: $scope.parentID + ''},

                        ]
                    };
                    $http.post(URL_INSERT, JSON.stringify(upd_code))
                        .success(function (result, status, headers, config) {

                            $scope.codeEdit = true;
                        }).error(function (result, status, header, config) {
                        alert("ویرایش کد ملی دانش آمووز با خطا مواجه شد.");
                        $scope.codeEdit = false;
                        document.location.reload();
                    });
                } else {
                    $scope.eroretext = "کد ملی دانش آموز";
                    $scope.codeEdit = false;
                }
            }
            if ($scope.codeEdit == true && $scope.parrentEdit == true) {
                if (($scope.stu_codemeli) && ($scope.stu_fitstname) && ($scope.stu_lastname) && ($scope.stu_major) && ($scope.stu_f_name)) {
                    var bertday = '';
                    if ($scope.stu_berthday) {
                        bertday = moment($scope.stu_berthday, 'jYYYY-jM-jD').format('YYYY-M-D');
                    } else {
                        var splitbertday = moment().format().split("T");
                        bertday = splitbertday[0];
                    }
                    var upd_stu = {
                        ViewName: "StudentUpdate",
                        parameters: [
                            //student-Info
                            {key: "%studentid", value: $id + ''},
                            {key: "%studentcode", value: $scope.stu_codemeli + ''},
                            {key: "%firstname", value: $scope.stu_fitstname + ''},
                            {key: "%lastname", value: $scope.stu_lastname + ''},
                            {
                                key: "%birthdate",
                                value: bertday + ''
                            },
                            {key: "%phone", value: $scope.stu_phone || '' + ''},
                            {key: "%address", value: $scope.stu_address || '' + ''},
                            {key: "%note", value: $scope.stu_note || '' + ''},
                            {key: "%image", value: $scope.stu_image || '' + ''},
                            {key: "%illness", value: $scope.stu_illness || '' + ''},
                            {key: "%username", value: $scope.stu_codemeli + ''},
                            {key: "%password", value: $scope.stu_codemeli + ''},
                            {key: "%majorbaseid", value: $scope.stu_major + ''},
                            {key: "%schoolid", value: localStorage.schoolId + ''},
                        ]
                    };
                    $http.post(URL_INSERT, JSON.stringify(upd_stu))
                        .success(function (result, status, headers, config) {

                            window.history.back();
                        }).error(function (result, status, header, config) {
                        alert("ویرایش دانش آموز با خطا مواجه شد.");
                        document.location.reload();
                    });


                } else {
                    if (!$scope.stu_fitstname) {
                        $scope.eroretext = "نام دانش آموز";
                    } else if (!$scope.stu_lastname) {
                        $scope.eroretext = "نام خانوادگی دانش آموز";
                    } else if (!$scope.stu_codemeli) {
                        $scope.eroretext = "کد ملی دانش آموز";
                    }  else if (!$scope.stu_major) {
                        $scope.eroretext = "رشته تحصیلی دانش آموز";
                    } else if (!$scope.stu_f_name) {
                        $scope.eroretext = "نام پدر دانش آموز";
                    }
                }
            } else {
                alert("خطا در درج اطلاعات")
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

}])
;








