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
app.controller('chequEdit', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretex2 = "";
    funcn();

    function funcn() {
        myVar = setTimeout(myfunction, 300);
    }

    function myfunction() {
        var full_url = document.URL;
        var url_array = full_url.split('/')
        $scope.chequid = url_array[url_array.length - 1];
        var stu = {
            ViewName: "SelectCheque",
            parameters: [{key: "%cheque_id", value: $scope.chequid}],
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
        $http.post(URL_GET, JSON.stringify(stu))
            .success(function (result, status, headers, config) {
                $scope.cheque = result.data[0];
                console.log($scope.cheque);
                $scope.amount = $scope.cheque.amount;
                $scope.dateCheque =moment( $scope.cheque.cheque_date , 'YYYY-M-D').format('jYYYY-jM-jD') ;
                $scope.bank_name = $scope.cheque.cheque_bank;
                $scope.bank_shobe = $scope.cheque.cheque_shobe;
                $scope.bank_owner = $scope.cheque.cheque_owner;
                $scope.bank_code = $scope.cheque.cheque_number;
            });
    }
    $scope.updateCheque = function ($id) {
        if($scope.amount && $scope.dateCheque && $scope.bank_name){
            var upd_cheq = {
                ViewName: "UpdateCheque",
                parameters: [
                    {key: "%cheque_id", value: $id + ''},
                    {key: "%amount", value: $scope.amount + ''},
                    {key: "%cheque_date", value: moment($scope.dateCheque, 'jYYYY-jM-jD').format('YYYY-M-D') || '' + ''},
                    {key: "%cheque_bank", value: $scope.bank_name || ''  + ''},
                    {key: "%cheque_owner", value: $scope.bank_owner + ''},
                    {key: "%cheque_number", value: $scope.bank_code  || '' + ''},
                    {key: "%cheque_shobe", value:$scope.bank_shobe || '' + '' },
                ]
            };
            $http.post(URL_INSERT, JSON.stringify(upd_cheq))
                .success(function (result, status, headers, config) {
                    alert("با موفقیت ویرایش شد.");
                    document.location.replace('#/app/page/wallet');
                }).error(function (result, status, header, config) {
                alert("ارسال اطلاعات با خطا مواجه شد.");
                // document.location.reload();
            });
        }
        else{
            if(!$scope.amount){
                $scope.eroretex2 = "مبلغ چک";
                $scope.errText2();
            }
            else if(!$scope.dateCheque){
                $scope.eroretex2 = "تاریخ وصول";
                $scope.errText2();
            }
            else if(!$scope.bank_name)
            {
                $scope.eroretex2 = "نام بانک";
                $scope.errText2();
            }
        }
    }
    $scope.errText = function () {
        return $scope.eroretex2;
    }
}
])
;