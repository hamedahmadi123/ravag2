app.directive('currencyMask', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelController) {

            var formatNumber = function (value) {

                value = value.toString();
                value = value.replace(/[^0-9\.]/g, "");
                var parts = value.split('.');
                parts[0] = parts[0].replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
                if (parts[1] && parts[1].length > 2) {
                    parts[1] = parts[1].substring(0, 2);
                }

                return parts.join(".");
            };
            var applyFormatting = function () {
                var value = element.val();
                var original = value;
                if (!value || value.length == 0) {
                    return
                }
                value = formatNumber(value);
                if (value != original) {
                    element.val(value);
                    element.triggerHandler('input')
                }
            };
            element.bind('keyup', function (e) {
                var keycode = e.keyCode;
                var isTextInputKey =
                    (keycode > 47 && keycode < 58) || // number keys
                    keycode == 32 || keycode == 8 || // spacebar or backspace
                    (keycode > 64 && keycode < 91) || // letter keys
                    (keycode > 95 && keycode < 112) || // numpad keys
                    (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
                    (keycode > 218 && keycode < 223); // [\]' (in order)
                if (isTextInputKey) {
                    applyFormatting();
                }
            });
            element.bind('blur', function (evt) {
                if (angular.isDefined(ngModelController.$modelValue)) {
                    var val = ngModelController.$modelValue.split('.');
                    if (val && val.length == 1) {
                        if (val != "") {
                            ngModelController.$setViewValue(val);
                            ngModelController.$render();
                        }
                    } else if (val && val.length == 2) {
                        if (val[1] && val[1].length == 1) {
                            ngModelController.$setViewValue(val[0] + '.' + val[1] + '0');
                            ngModelController.$render();
                        } else if (val[1].length == 0) {
                            ngModelController.$setViewValue(val[0]);
                            ngModelController.$render();
                        }
                        applyFormatting();
                    }
                }
            })
            ngModelController.$parsers.push(function (value) {
                if (!value || value.length == 0) {
                    return value;
                }
                value = value.toString();
                value = value.replace(/[^0-9\.]/g, "");
                return value;
            });
            ngModelController.$formatters.push(function (value) {
                if (!value || value.length == 0) {
                    return value;
                }
                value = formatNumber(value);
                return value;
            });
        }
    };
});
app.controller('payBedehi', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.walid = "";
    $scope.chequeid = "";
    $scope.total = "";
    $scope.bedehi = "";
    $scope.bedehiLast = "";
    $scope.st_id = "";
    $scope.st_name = "";
    $scope.erroreText = "";
    $scope.payment_parrent = "";
    $scope.pay_old = 0;

    var cls = {
        ViewName: "ClassSelect",
        mutualTransaction: {
            kendoDataRequest: {
                filter: {
                    field: "schoolid",
                    logic: "and",
                    operator: "eq",
                    value: localStorage.schoolId + ''
                },
            }
        }
    }
    $http.post(URL_GET, JSON.stringify(cls))
        .success(function (result, status, headers, config) {
                $scope.class = result.data;
            }
        );
    var all_bdhi = {
        ViewName: "selectAllBedehi",
        parameters: [
            {key: "%schoolid", value: localStorage.schoolId},
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
    $http.post(URL_GET, JSON.stringify(all_bdhi))
        .success(function (result, status, headers, config) {
            $scope.all_bedehi = result.data;
            console.log($scope.all_bedehi);
            for (var i = 0; i < $scope.all_bedehi.length; i++) {
                $scope.all_bedehi[i].show = true;
            }
        });


    $scope.retdata = function ($data) {
        return moment($data, 'YYYY-M-D').format('jYYYY-jM-jD');
    }
    $scope.filterByclass = function ($id) {
        if ($id) {
            for (var i = 0; i < $scope.all_bedehi.length; i++) {
                if ($scope.all_bedehi[i].majorbaseid == $id)
                    $scope.all_bedehi[i].show = true;
                else
                    $scope.all_bedehi[i].show = false;

            }
        } else {
            for (var i = 0; i < $scope.all_bedehi.length; i++) {
                $scope.all_bedehi[i].show = true;
            }
        }
    }
    $scope.payment = function ($id, $chid, $total, $bedehi, $stname, $stid, $pay) {
        $scope.walid = $id;
        $scope.chequeid = $chid;
        $scope.total = $total;
        $scope.bedehi = $bedehi;
        $scope.st_id = $stid;
        $scope.st_name = $stname;
        $scope.pay_old = $pay;
    }
    $scope.payy = function () {
        $scope.erroreText = "";
        if ($scope.pay_amount) {
            if (parseFloat($scope.pay_amount) > parseFloat($scope.bedehi)) {
                document.getElementById('naqdInput').style.border = '1px red solid';
                alert("مبلغ قابل پرداخت نمیتواند بیشتر از کل مبلغ بدهی باشد. \nمبلغی کمتر یا مساوی " + $scope.total + " ريال " + " وارد کنید. ");
            }
            else {
                var pay = {
                    ViewName: "UpdatePaymentPay",
                    parameters: [
                        {key: "%cheque_id", value: $scope.chequeid + ''},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(pay))
                    .success(function (result, status, headers, config) {
                        $scope.bedehiLast = parseFloat($scope.bedehi) - parseFloat($scope.pay_amount);
                        if (parseFloat($scope.pay_old) + parseFloat($scope.pay_amount) == parseInt($scope.total)) {
                            $scope.payment_parrent = "pay";
                        } else {
                            $scope.payment_parrent = $scope.chequeid;
                        }
                        var nqd = {
                            ViewName: "PayWallet",
                            parameters: [
                                {key: "%type", value: '2'},
                                {key: "%wallet_id", value: $scope.walid + ''},
                                {key: "%amount", value: parseFloat($scope.pay_old) + parseFloat($scope.pay_amount) + ''},
                                {key: "%payment_parrent", value: $scope.payment_parrent + ''},
                                {key: "%cheque_date", value: ''},
                                {key: "%cheque_bank", value: ''},
                                {key: "%cheque_owner", value: ''},
                                {key: "%cheque_number", value: ''},
                                {key: "%cheque_shobe", value: ''},
                            ]
                        };
                        alert(JSON.stringify(nqd));
                        $http.post(URL_INSERT, JSON.stringify(nqd))
                            .success(function (result, status, headers, config) {
                                if (parseFloat($scope.bedehiLast) == 0) {
                                    alert("با موفقیت ثبت و بدهی دانش آموز صاف شد.");
                                } else {
                                    alert("با موفقیت ثبت شد. \n" + $scope.bedehiLast + " ریال بدهی برای دانش آموز باقی ماند. ");
                                }
                                document.location.reload();
                            }).error(function (result, status, header, config) {
                            alert("ارسال اطلاعات با خطا مواجه شد.");
                            // document.location.reload();
                        });
                    }).error(function (result, status, header, config) {
                    alert("ارسال اطلاعات با خطا مواجه شد.");
                    // document.location.reload();
                });
            }
        } else {
            $scope.erroreText = "مبلغ پرداختی";
            $scope.errText();
        }
    }

    $scope.errText = function () {
        return $scope.erroreText;
    }
    $scope.defaultInput = function () {
        document.getElementById('naqdInput').style.border = '1px #dae2e5 solid';
    }
}])
;