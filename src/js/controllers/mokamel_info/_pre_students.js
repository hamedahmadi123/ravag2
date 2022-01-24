app.controller('pre_students', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.amozeshi = {};
    $scope.tarbiaty = {};
    $scope.st_name = "";
    $scope.eroretext = "";
    $scope.arrselect = [];
    $scope.titelext = "";
    $scope.name = [];
    var skip = -15;
    var take = 15;
    var objects = 0;
    var isem = false;
    $scope.filterText = "همه دانش آموزان";

    $scope.act_name = "";
    $scope.act_id = "";
    $scope.act_avg = "";
    $scope.student_id = "";
    $scope.darsadAmozeshi = [];
    $scope.darsadTarbiaty = [];
    $scope.amozeshiColore = "";
    $scope.tarbiatyColore = "";
    $scope.load2 = function () {
        if (isem)
            return;

        skip += take;
        for (var i = 1; i <= take; i++) {
            $scope.name.push({order_id: "-1" + $scope.name.length});
        }
        var msg = {
            ViewName: "StudentSelect",
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId + ""
                        , filters: [{field: "isactive", logic: "and", operator: "eq", value: "2"}]
                    },
                    skip: skip,
                    take: take,
                    Sort: [{field: "studentid", dir: "DESC"}]
                }
            },
        };
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
                    });

            });
    }
    // delete******************************
    $scope.itemArray = function ($id, $bool) {
        if ($bool == true) {
            $scope.arrselect.push($id);
        } else {
            for (var i = 0; i < $scope.arrselect.length; i++) {
                if ($scope.arrselect[i] === $id) {
                    $scope.arrselect.splice(i, 1);
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
            if (($scope.amozeshi.score && ($scope.amozeshi.bool == true || $scope.amozeshi.bool == false)) && (($scope.tarbiaty.bool == true || $scope.tarbiaty.bool == false))) {
                $scope.eroretext = "";
                var ins_Preregister_comments = {
                    ViewName: "InsertPreregister_comments",
                    parameters: [
                        {key: "%studentid", value: $scope.student_id},
                        {key: "%teacherid", value: localStorage.userId + ''},
                        {key: "%comment", value: $scope.score_note + ''},
                        {key: "%amozeshi", value: JSON.stringify($scope.amozeshi)},
                        {key: "%tarbiaty", value: JSON.stringify($scope.tarbiaty)},
                    ]
                };
                alert(JSON.stringify(ins_Preregister_comments));
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
        $scope.st_name = $name;
        var stu = {
            ViewName: "SelectPreregister_comments",
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
                $scope.pre_comment = result.data;
                $scope.amozeshi_Score_avg = 0;
                $scope.amozeshi_true = 0;
                $scope.amozeshi_false = 0;
                $scope.tarbiaty_Score_avg = 0;
                $scope.tarbiaty_true = 0;
                $scope.tarbiaty_false = 0;
                for (var i = 0; i < $scope.pre_comment.length; i++) {
                    $scope.amozeshi = JSON.parse($scope.pre_comment[i].amozeshi);
                    $scope.tarbiaty = JSON.parse($scope.pre_comment[i].tarbiaty);
                    $scope.amozeshi_Score_avg += $scope.amozeshi.score;
                    if ($scope.amozeshi.bool == true) {
                        $scope.amozeshi_true += 1;
                    } else {
                        $scope.amozeshi_false += 1;
                    }
                    $scope.tarbiaty_Score_avg += $scope.tarbiaty.score;
                    if ($scope.tarbiaty.bool == true) {
                        $scope.tarbiaty_true += 1;
                    } else {
                        $scope.tarbiaty_false += 1;
                    }
                }
                //میانگین امتیاز های داده شده این برای این دانش آموز
                var a = 0;
                var b = 0;
                $scope.tarbiaty_Score_avg = $scope.tarbiaty_Score_avg / $scope.pre_comment.length;
                a = $scope.tarbiaty_Score_avg * 100;
                b = a / 20;
                $scope.darsadTarbiaty.push(b);
                if ($scope.darsadTarbiaty >= 80 && $scope.darsadTarbiaty <= 100) {
                    $scope.tarbiatyColore = "green";
                } else if ($scope.darsadTarbiaty >= 50 && $scope.darsadTarbiaty <= 79) {
                    $scope.tarbiatyColore = "gold";
                } else if ($scope.darsadTarbiaty >= 30 && $scope.darsadTarbiaty <= 49) {
                    $scope.tarbiatyColore = "orange";
                } else {
                    $scope.tarbiatyColore = "red";
                }
                $scope.amozeshi_Score_avg = $scope.amozeshi_Score_avg / $scope.pre_comment.length;
                a = $scope.amozeshi_Score_avg * 100;
                b = a / 20;
                $scope.darsadAmozeshi.push(b);
                if ($scope.darsadAmozeshi >= 80 && $scope.darsadAmozeshi <= 100) {
                    $scope.amozeshiColore = "green";
                } else if ($scope.darsadAmozeshi >= 50 && $scope.darsadAmozeshi <= 79) {
                    $scope.amozeshiColore = "gold";
                } else if ($scope.darsadAmozeshi >= 30 && $scope.darsadAmozeshi <= 49) {
                    $scope.amozeshiColore = "orange";
                } else {
                    $scope.amozeshiColore = "red";
                }

            });
    }
    $scope.showPay_com = function () {
        $('#myModal2').modal('hide');
        $('#pay_com').modal();
        console.log($scope.pre_comment);
    }
    $scope.backToNote = function () {
        $('#pay_com').modal('hide');
        $('#myModal2').modal();
    }
    $scope.convertData = function ($data) {
        return moment($data, 'YYYY-M-D').format('jYYYY-jM-jD');
    }
    $scope.retAmozeshi = function ($val, $num) {
        $scope.am = JSON.parse($val);
        if ($num == 'bool') {
            if ($scope.am.bool == true) {
                return "موافق";
            } else {
                return "مخالف";
            }
        } else if ($num == 'score') {
            return $scope.am.score;
        }
    }
    $scope.retTarbity = function ($val, $num) {
        $scope.tr = JSON.parse($val);
        if ($num == 'bool') {
            if ($scope.tr.bool == true) {
                return "موافق";
            } else {
                return "مخالف";
            }
        } else if ($num == 'score') {
            return $scope.tr.score;
        }
    }

}])
;