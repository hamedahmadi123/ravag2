app.controller('pre_students', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.amozeshi = {};
    $scope.tarbiaty = {};
    $scope.st_name = "";
    $scope.st_id = "";
    $scope.filterText = "همه دانش آموزان پیش ثبت نام شده";
    $scope.act_name = "";
    $scope.act_id = "";
    $scope.act_avg = "";
    $scope.student_id = "";
    $scope.darsadAmozeshi = [];
    $scope.darsadTarbiaty = [];
    $scope.amozeshiColore = "";
    $scope.tarbiatyColore = "";
    $scope.eroretext = "";
    $scope.arrselect = [];
    $scope.titelext = "";
    $scope.name = [];
    $scope.baseName = "";
    $scope.userType = localStorage.userType;
    // var skip = -15;
    // var take = 15;
    var objects = 0;
    var isem = false;
    $scope.resultValue = 0;
    $scope.boolAmozeshi0 = 0;
    $scope.boolTarbiaty0 = 0;
    $scope.isMajor = false;
    $scope.arrayPhone = [];

    $scope.enzs = [
        {"value": 1, "name": "عالی"},
        {"value": 2, "name": "خیلی خوب"},
        {"value": 3, "name": "خوب"},
        {"value": 4, "name": "نیاز به تلاش بیشتر"},
    ];
    var sch = {
        ViewName: "majorbaseschoolselect",
        mutualTransaction: {
            kendoDataRequest: {
                filter: {
                    field: "schoolid",
                    logic: "and",
                    operator: "eq",
                    value: localStorage.schoolId + "",
                    filters: [
                        {field: "ismajor", logic: "and", operator: "eq", value: '0'},
                    ]
                },
            }
        }
    }
    $http.post(URL_GET, JSON.stringify(sch))
        .success(function (result, status, headers, config) {
            $scope.schoolMajorBase = result.data;
            $scope.baseArray = [];
            for (var c = 0; c < $scope.schoolMajorBase.length; c++) {
                $scope.baseArray.push($scope.schoolMajorBase[c].code)
            }
            $scope.scholtype = $scope.baseArray;
            $scope.isMajor = false;
            for (var i = 0; i < $scope.scholtype.length; i++) {
                if ($scope.scholtype[i] >= 1 && $scope.scholtype[i] <= 6) {
                    $scope.isMajor = false;
                } else if ($scope.scholtype[i] >= 7 && $scope.scholtype[i] <= 9) {

                    $scope.isMajor = false;
                } else if ($scope.scholtype[i] >= 10 && $scope.scholtype[i] <= 12) {

                    $scope.isMajor = true;
                }
            }
        });

    $scope.filterByBase = function ($baseid, $name) {

         $scope.baseName = $name;
        $scope.name = [];
        // skip = -15;
        // take = 15;
        objects = 0;
        isem = false;
        if (!$baseid) {
            $scope.filterText = "همه دانش آموزان پیش ثبت نام شده";
            // skip = -15;
            // take = 15;
            objects = 0;
            load2();
            isem = false;

        } else if ($scope.isMajor)
            {
                   //2
            $scope.filterText = "دانش آموزان پیش ثبت نامی در پایه " + $name;
            if (isem)
                return;

            // skip += take;
            // for (var i = 1; i <= take; i++) {
            //     $scope.name.push({order_id: "-1" + $scope.name.length});
            // }
            var msg = {
                ViewName: "StudentSelect",
                parameters: [{key: "%schoolid", value: localStorage.schoolId}],
                mutualTransaction: {
                    Columns: [],
                    kendoDataRequest: {
                        filter: {
                            field: "isactive",
                            logic: "and",
                            operator: "eq",
                            value: "2",
                            filters: [
                                {field: "baseid", logic: "and", operator: "eq", value: $baseid + ''}
                            ]
                        },
                        // skip: skip,
                        // take: take,
                        Sort: [{field: "studentid", dir: "DESC"}]
                    }
                },
            };

            console.log(JSON.stringify(msg))
            $http.post(URL_GET, JSON.stringify(msg))
                .success(function (result, status, headers, config) {
                    if (result.data.length === 0) {
                        console.log(result.data)
                        isem = true;

                    }
                    result.data.forEach(function (element) {
                        $scope.name[objects] = element;
                        objects++;
                    });
                    $scope.name.length = objects;
                });

            if ($scope.isMajor) {
                var mbs = {
                    ViewName: "allmajor",
                    mutualTransaction: {
                        kendoDataRequest: {
                            filter: {
                                field: "parent",
                                logic: "and",
                                operator: "eq",
                                value: $baseid + ''
                            },
                        }
                    }
                }
                console.log(JSON.stringify(mbs))
                $http.post(URL_GET, JSON.stringify(mbs))
                    .success(function (result, status, headers, config) {
                        $scope.majors = result.data;
                        console.log($scope.majors)
                    });
            }
        }
        else if (!$scope.isMajor)
         {
            $scope.filterText = "دانش آموزان پیش ثبت نامی در پایه " + $name;
            if (isem)
                return;

            // skip += take;
            // for (var i = 1; i <= take; i++) {
            //     $scope.name.push({order_id: "-1" + $scope.name.length});
            // }
            var msg = {
                ViewName: "StudentSelect",
                parameters: [{key: "%schoolid", value: localStorage.schoolId}],
                mutualTransaction: {
                    Columns: [],
                    kendoDataRequest: {
                        filter: {
                            field: "isactive",
                            logic: "and",
                            operator: "eq",
                            value: "2",
                            filters: [
                                {field: "majorbaseid", logic: "and", operator: "eq", value: $baseid + ''}
                            ]
                        },
                        // skip: skip,
                        // take: take,
                        Sort: [{field: "studentid", dir: "DESC"}]
                    }
                },
            };

            console.log(JSON.stringify(msg))
            $http.post(URL_GET, JSON.stringify(msg))
                .success(function (result, status, headers, config) {
                    if (result.data.length === 0) {
                        console.log(result.data)
                        isem = true;

                    }
                    result.data.forEach(function (element) {
                        $scope.name[objects] = element;
                        objects++;
                    });
                    $scope.name.length = objects;
                });

            if ($scope.isMajor) {
                var mbs = {
                    ViewName: "allmajor",
                    mutualTransaction: {
                        kendoDataRequest: {
                            filter: {
                                field: "parent",
                                logic: "and",
                                operator: "eq",
                                value: $baseid + ''
                            },
                        }
                    }
                }
                console.log(JSON.stringify(mbs))
                $http.post(URL_GET, JSON.stringify(mbs))
                    .success(function (result, status, headers, config) {
                        $scope.majors = result.data;
                        console.log($scope.majors)
                    });
            }
        }
    }
    $scope.filterByMajor = function ($majorid, $name) {
        $scope.name = [];
        skip = -15;
        take = 15;
        objects = 0;
        isem = false;
        if (!$majorid) {
            $scope.filterText = "دانش آموزان پیش ثبت نامی در پایه " + $scope.baseName;
            skip = -15;
            take = 15;
            objects = 0;
            isem = false;

        } else {

            $scope.filterText = "دانش آموزان پیش ثبت نامی در پایه " + $scope.baseName + " / رشته " + $name;
            if (isem)
                return;

            skip += take;
            for (var i = 1; i <= take; i++) {
                $scope.name.push({order_id: "-1" + $scope.name.length});
            }
            var msg = {
                ViewName: "StudentSelect",
                parameters: [{key: "%schoolid", value: localStorage.schoolId}],
                mutualTransaction: {
                    Columns: [],
                    kendoDataRequest: {
                        filter: {
                            field: "isactive",
                            logic: "and",
                            operator: "eq",
                            value: "2",
                            filters: [
                                {field: "majorbaseid", logic: "and", operator: "eq", value: $majorid + ''}
                            ]
                        },
                        skip: skip,
                        take: take,
                        Sort: [{field: "studentid", dir: "DESC"}]
                    }
                },
            };
            console.log(JSON.stringify(msg))
            $http.post(URL_GET, JSON.stringify(msg))
                .success(function (result, status, headers, config) {
                    if (result.data.length === 0) {
                        isem = true;

                    }
                    result.data.forEach(function (element) {
                        $scope.name[objects] = element;
                        objects++;
                    });
                    $scope.name.length = objects;

                });
        }

    }
    $scope.errText = function () {
        return $scope.eroretext;
    }
    $scope.detailSt = function ($id) {
        var stu = {
            ViewName: "StudentSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "studentid",
                        logic: "and",
                        operator: "eq",
                        value: $id + ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(stu))
            .success(function (result, status, headers, config) {
                $scope.thisSt = result.data[0];
                $scope.student_id = $scope.thisSt.studentid;
                $scope.stu_id = $scope.thisSt.studentcode;
                $scope.stu_name = $scope.thisSt.firstname + " " + $scope.thisSt.lastname;
                if ($scope.thisSt.birthdate) {
                    var splitberthday = $scope.thisSt.birthdate.split(' ');
                    $scope.stu_berthday = moment(splitberthday, 'YYYY-M-D').format('jYYYY-jM-jD');
                }
                $scope.stu_address = $scope.thisSt.address;
                $scope.stu_tel = $scope.thisSt.phone;
                $scope.stu_ilness = $scope.thisSt.illness;
                $scope.stu_major = $scope.thisSt.title;
                if ($scope.thisSt.ismajor == '1') {
                    $scope.isMajor = true;
                }
                var pre_stu = {
                    ViewName: "SelectPre_register",
                    parameters: [
                        {key: "%studentid", value: $scope.student_id + ''},
                    ],
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
                $http.post(URL_GET, JSON.stringify(pre_stu))
                    .success(function (result, status, headers, config) {
                        $scope.pre_stu = result.data[0];
                        $scope.enz = JSON.parse($scope.pre_stu.enz);
                        $scope.drs = JSON.parse($scope.pre_stu.drs);
                        $scope.about_major = $scope.pre_stu.about_major;
                        if ($scope.pre_stu.Current_school == '0') {
                            $scope.btn_act = true;
                            $scope.act_school = true;
                            document.getElementById('Previous_school').placeholder = "مدرسه جاری";
                        } else {
                            document.getElementById('Previous_school').placeholder = "نام مدرسه سال قبلی";
                            $scope.btn_act = false;
                            $scope.Previous_school = $scope.pre_stu.Previous_school;
                        }
                    });
                var stu_parrent = {
                    ViewName: "ParentSelect",
                    mutualTransaction: {
                        kendoDataRequest: {
                            filter: {
                                field: "studentcode",
                                logic: "and",
                                operator: "eq",
                                value: $scope.stu_id + ""
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
                        // By Mohsen
                        // Father
                        $scope.stu_f_meliat = $scope.student_parr.fathermeliat;
                        $scope.stu_f_shenasname = $scope.student_parr.fathershenasname;
                        $scope.stu_f_birth_loc = $scope.student_parr.fatherbirthloc;
                        $scope.stu_f_codemeli = $scope.student_parr.fathercodemeli;
                        $scope.stu_f_birthday = $scope.student_parr.fatherbirthday;
                        // mother
                        $scope.stu_m_meliat = $scope.student_parr.mothermeliat;
                        $scope.stu_m_shenasname = $scope.student_parr.mothershenasname;
                        $scope.stu_m_birth_loc = $scope.student_parr.motherbirthloc;
                        $scope.stu_m_codemeli = $scope.student_parr.mothercodemeli;
                        $scope.stu_m_birthday = $scope.student_parr.motherbirthday;
                    });

            });
    }
    // delete******************************
    $scope.itemArray = function ($id, $mobile, $bool) {
        if ($bool == true) {
            $scope.arrselect.push($id);
            $scope.arrayPhone.push($mobile);
        } else {
            for (var i = 0; i < $scope.arrselect.length; i++) {
                if ($scope.arrselect[i] === $id) {
                    $scope.arrselect.splice(i, 1);
                    $scope.arrayPhone.splice(i, 1);
                }
            }
        }
    }

    $scope.deleteAll = function () {
        var dataArray = [];
        for (var i = 0; i < $scope.arrselect.length; i++) {
            var del_Item = {
                ViewName: "StudentDelete",
                parameters: [
                    {key: "%studentid", value: $scope.arrselect[i] + ''},
                ]
            };
            dataArray.push(del_Item);
        }
        var j = confirm("آیا برای حذف دانش آموزان انتخاب شده اطمینان دارید ؟ ");
        if (j === true) {
            $http.post(URL_ARRAY_INSERT, JSON.stringify(dataArray))
                .success(function (result, status, headers, config) {
                    document.location.reload();
                }).error(function (result, status, header, config) {
                alert("حذف با خطا مواجه شد.");
                document.location.reload();
            });
        }
    }
    $scope.deleteStudent = function ($id, $name) {
        var del_Item = {
            ViewName: "StudentDelete",
            parameters: [
                {key: "%studentid", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف دانش آموز با نام " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
        if (j === true) {
            $http.post(URL_INSERT, JSON.stringify(del_Item))
                .success(function (result, status, headers, config) {
                    document.location.reload();
                }).error(function (result, status, header, config) {
                alert("حذف با خطا مواجه شد.");
                document.location.reload();
            });
        }
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

    $scope.selectSt = function ($id, $name, $avg) {
        $scope.act_id = $id;
        $scope.act_name = $name;
        $scope.act_avg = $avg;
    }
    $scope.set_t_btn = function ($num) {
        if ($num == 't') {
            $scope.tarbiaty.bool = true;
            $scope.t_f_btn = false;
            $scope.a
        } else if ($num == 'f') {
            $scope.tarbiaty.bool = false;
            $scope.t_t_btn = false;
        }
    }
    $scope.set_a_btn = function ($num) {
        if ($num == 't') {
            $scope.amozeshi.bool = true;
            $scope.a_f_btn = false;
        } else if ($num == 'f') {
            $scope.amozeshi.bool = false;
            $scope.a_t_btn = false;
        }
    }

    $scope.submitComment = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.amozeshi.score && $scope.tarbiaty.score && ($scope.amozeshi.bool == true || $scope.amozeshi.bool == false)) && (($scope.tarbiaty.bool == true || $scope.tarbiaty.bool == false))) {
                $scope.eroretext = "";
                var amz_bool = 0;
                var trb_bool = 0;
                if ($scope.amozeshi.bool == true) {
                    amz_bool = 1;
                } else {
                    amz_bool = 0;
                }
                if ($scope.tarbiaty.bool == true) {
                    trb_bool = 1;
                } else {
                    trb_bool = 0;
                }
                var ins_Preregister_comments = {
                    ViewName: "InsertPreregister_comments",
                    parameters: [
                        {key: "%studentid", value: $scope.student_id},
                        {key: "%teacherid", value: localStorage.userId + ''},
                        {key: "%comment", value: $scope.score_note || '' + ''},
                        {key: "%amozeshi_score", value: $scope.amozeshi.score},
                        {key: "%amozeshi_bool", value: amz_bool + ''},
                        {key: "%tarbiaty_score", value: $scope.tarbiaty.score + ''},
                        {key: "%tarbiaty_bool", value: trb_bool + ''},
                    ]
                };

                $http.post(URL_INSERT, JSON.stringify(ins_Preregister_comments))
                    .success(function (result, status, headers, config) {
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("ثبت نظر با خطا مواجه شد.");
                    document.location.reload();
                });
            } else {
                if (!($scope.amozeshi.score && $scope.amozeshi.bool)) {
                    $scope.eroretext = "نظر خود را زمینه آموزشی این دانش آموز";
                } else if (!($scope.tarbiaty.bool && $scope.tarbiaty.bool)) {
                    $scope.eroretext = "نظر خود را زمینه تربیتی این دانش آموز";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }
    $scope.precommentSelect = function ($id, $name) {
        $scope.pre_comment = [];
        $scope.st_name = $name;
        $scope.st_id = $id;
        var stu = {
            ViewName: "SelectPre_comment_result",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "studentid",
                        logic: "and",
                        operator: "eq",
                        value: $id + ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(stu))
            .success(function (result, status, headers, config) {
                $scope.pre_comment = result.data[0];
                try {
                    if ($scope.pre_comment.countAll) {
                        $scope.resultValue = 1;
                        $scope.boolAmozeshi0 = $scope.pre_comment.countAll - $scope.pre_comment.countBoolAmozeshi;
                        $scope.boolTarbiaty0 = $scope.pre_comment.countAll - $scope.pre_comment.countBoolTarbiaty;

                        $scope.darsadAmozeshi.push(($scope.pre_comment.avgScoreAmozeshi * 100) / 20);
                        if ($scope.darsadAmozeshi >= 80 && $scope.darsadAmozeshi <= 100) {
                            $scope.amozeshiColore = "green";
                        } else if ($scope.darsadAmozeshi >= 50 && $scope.darsadAmozeshi <= 79) {
                            $scope.amozeshiColore = "gold";
                        } else if ($scope.darsadAmozeshi >= 30 && $scope.darsadAmozeshi <= 49) {
                            $scope.amozeshiColore = "orange";
                        } else {
                            $scope.amozeshiColore = "red";
                        }
                        $scope.darsadTarbiaty.push(($scope.pre_comment.avgScoreTarbiaty * 100) / 20);
                        if ($scope.darsadTarbiaty >= 80 && $scope.darsadTarbiaty <= 100) {
                            $scope.tarbiatyColore = "green";
                        } else if ($scope.darsadTarbiaty >= 50 && $scope.darsadTarbiaty <= 79) {
                            $scope.tarbiatyColore = "gold";
                        } else if ($scope.darsadTarbiaty >= 30 && $scope.darsadTarbiaty <= 49) {
                            $scope.tarbiatyColore = "orange";
                        } else {
                            $scope.tarbiatyColore = "red";
                        }
                    } else {
                        $scope.resultValue = 0;
                    }
                } catch (e) {
                    $scope.resultValue = 0;
                }

            });
    }
    $scope.showPay_com = function () {
        var stu = {
            ViewName: "SelectPreregister_comments",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "studentid",
                        logic: "and",
                        operator: "eq",
                        value: $scope.st_id + ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(stu))
            .success(function (result, status, headers, config) {
                $scope.all_pre_comment = result.data;
            });

        $('#myModal2').modal('hide');
        $('#pay_com').modal();

    }
    $scope.backToNote = function () {
        $('#pay_com').modal('hide');
        $('#myModal2').modal();
    }
    $scope.convertData = function ($data) {
        return moment($data, 'YYYY-M-D').format('jYYYY-jM-jD');
    }

    $scope.retAmozeshi = function ($val) {
        if ($val == true) {
            return "موافق";
        } else {
            return "مخالف";
        }
    }
    $scope.retTarbity = function ($val) {
        if ($val == true) {
            return "موافق";
        } else {
            return "مخالف";
        }

    }

    $scope.selectAllresult = function () {
        var stu = {
            ViewName: "SelectAll_Pre_comment",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "isactive",
                        logic: "and",
                        operator: "eq",
                        value: "2",
                        filters: [
                            {field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ''}
                        ]
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(stu))
            .success(function (result, status, headers, config) {
                $scope.all_result = result.data;
                for (var i = 0; i < $scope.all_result.length; i++) {
                    $scope.all_result[i].boolAmozeshi0 = $scope.all_result[i].countAll - $scope.all_result[i].countBoolAmozeshi;
                    $scope.all_result[i].boolTarbiaty0 = $scope.all_result[i].countAll - $scope.all_result[i].countBoolTarbiaty;
                }
            });
    }
    $scope.submitSt = function ($id, $name) {
        var j = confirm("آیا برای ثبت نام دانش آموز با نام " + $name + " اطمینان دارید ؟");
        if (j === true) {
            var upd_submite = {
                ViewName: "submitStudent",
                parameters: [
                    {key: "%studentid", value: $id + ''},
                ]
            };
            $http.post(URL_INSERT, JSON.stringify(upd_submite))
                .success(function (result, status, headers, config) {
                    document.location.reload();
                }).error(function (result, status, header, config) {
                alert("ثبت نام دانش آموز با خطا مواجه شد.");
                document.location.reload();
            });

        }
    }
    $scope.smsTemp = function () {
        if ($scope.arrayPhone.length != '0') {
            $('#sendSms').modal();
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
        } else {
            alert("هنوز هیچ دانش آموزی انتخاب نشده است.");
        }
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
    $scope.sendSms = function () {

        if ($scope.arrayPhone.length != '0') {
            if ($scope.sms_note && $scope.sms_note != null && $scope.sms_note != '' && $scope.sms_note != undefined && $scope.sms_note != 'undefined') {
                var j = confirm("آیا برای ارسال پیامک برای دانش آموزان انتخاب شده اطمینان دارید ؟ ");
                if (j === true) {
                    var con = {sms: $scope.sms_note + "", phones: $scope.arrayPhone.join(',') + ""};
                    console.log(JSON.stringify(con));
                    $http.post(URL_ArraySms, JSON.stringify(con))

                        .success(function (result, status, headers, config) {
                            alert("ارسال دعوتنامه برای دانش آموزان با موفقیت انجام شد.");
                            // document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("ارسال دعوتنامه برای دانش آموزان با خطا مواجه شد.");
                        // document.location.reload();
                    });
                }
            } else {
                alert("متن پیامک خالی میباشد . \n لطفا متن خود را وارد نمایید.");
            }
        } else {
            alert("هیچ شماره ای یافت نشد. \n لطفا ابتدا دانش آموزان مورد نظر را انتخاب نمایید.");
        }
    }



      var load2 = function () {

        if (isem)
            return;

        // skip += take;
        // for (var i = 1; i <= take; i++) {
        //     $scope.name.push({order_id: "-1" + $scope.name.length});
        // }
        var msg = {
            ViewName: "StudentSelect",
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "isactive",
                        logic: "and",
                        operator: "eq",
                        value: "2",
                        filters: [
                            {field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ''}
                        ]
                    },
                    // skip: skip,
                    // take: take,
                    Sort: [{field: "studentid", dir: "DESC"}]
                }
            },
        };
        debugger;
          console.log(JSON.stringify(msg));
        $http.post(URL_GET, JSON.stringify(msg))

            .success(function (result, status, headers, config) {
                if (result.data.length === 0) {
                    isem = true;

                }
                result.data.forEach(function (element) {

                    $scope.name[objects] = element;
                    objects++;

                });

                $scope.name.length = objects;

            });

    };
load2();
    // For Pagination By Mohsen
//
//     function pre_students($scope) {
//   $scope.limit = 10;
//   $scope.items = $scope.name.length;
//
//   $scope.loadMore = function (last, inview) {
//       if (last && inview) {
//           $scope.limit += 10;
//       }
//   }
// }
}])
;