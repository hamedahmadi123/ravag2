app.controller('smsTemplate', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretext = "";
    $scope.titelext = "";
    $scope.name = [];
    var skip = -15;
    var take = 15;
    var objects = 0;
    var isem = false;
    $scope.load2 = function () {

        if (isem)
            return;

        skip += take;
        for (var i = 1; i <= take; i++) {
            $scope.name.push({order_id: "-1" + $scope.name.length});
        }


        var msg = {
            ViewName: "SelectSmsTemplate",
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "schoolid",
                        logic: "and",
                        operator: "eq",
                        value: localStorage.schoolId+""
                    },
                    skip: skip,
                    take: take,
                    Sort: [{field: "smstemplateid", dir: "ASC"}]
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


    // insert******************************
    $scope.insertSMS = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.sms_name) && ($scope.sms_txt)) {
                var ins_smsTemp = {
                    ViewName: "InsertSmsTemplate",
                    parameters: [
                        {key: "%title", value: $scope.sms_name || '' + ''},
                        {key: "%text", value: $scope.sms_txt || '' + ''},
                        {key: "%schoolid", value: localStorage.schoolId || '' + ''},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(ins_smsTemp))
                    .success(function (result, status, headers, config) {
                        alert("قالب پیامکی جدیدی با عنوان " + $scope.sms_name + " با موفقیت درج شد.");
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("درج قالب پیامک با خطا مواجه شد.");
                    document.location.reload();
                });


            } else {
                if (!$scope.sms_name) {
                    $scope.eroretext = "عنوان قالب پیامکی";
                } else if (!$scope.sms_txt) {
                    $scope.eroretext = "متن قالب پیامکی";
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
    // select******************************
    $scope.detial = function ($id) {
        var smsTemp = {
            ViewName: "SelectSmsTemplate",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "smstemplateid",
                        logic: "and",
                        operator: "eq",
                        value: $id + ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(smsTemp))
            .success(function (result, status, headers, config) {
                $scope.thisSms = result.data[0];
                $scope.sms_nameE = $scope.thisSms.title;
                $scope.sms_txtE = $scope.thisSms.text;
            });
    }


    // update******************************
    $scope.updateSms = function ($id) {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {

            if (($scope.sms_nameE) && ($scope.sms_txtE)) {
                var upd_point = {
                    ViewName: "UpdateSmsTemplate",
                    parameters: [
                        {key: "%smstemplateid", value: $id + ''},
                        {key: "%title", value: $scope.sms_nameE || '' + ''},
                        {key: "%text", value: $scope.sms_txtE || '' + ''},
                    ]
                };

                var j = confirm("آیا برای ویرایش قالب پیامکی با عنوان " + $scope.sms_nameE + " اطمینان دارید ؟ ");
                if (j === true) {
                    $http.post(URL_INSERT, JSON.stringify(upd_point))
                        .success(function (result, status, headers, config) {
                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("ویرایش قالب پیامکی با خطا مواجه شد.");
                        document.location.reload();
                    });
                }
            } else {
                if (!$scope.sms_nameE) {
                    $scope.eroretext = "عنوان قالب پیامکی";
                } else if (!$scope.sms_txtE) {
                    $scope.eroretext = "متن قالب پیامکی";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }


    // delete******************************
    $scope.deletepoint = function ($id, $name) {
        var del_Item = {
            ViewName: "DeleteSmsTemplate",
            parameters: [
                {key: "%smstemplateid", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف قالب پیامکی با عنوان " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
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
}])
;