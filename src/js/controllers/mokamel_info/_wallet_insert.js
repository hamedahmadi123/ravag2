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
app.controller('wallet_insert', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.naqdAmount = '';
    $scope.bedhi = 0;
    $scope.sumAmount = 0;
    $scope.chequeNumber = 0;
    $scope.pay2amount = '';
    $scope.paytype = 0;
    $scope.passIF = false;
    $scope.eroretex = "";
    $scope.eroretex2 = "";
    $scope.totalAmount = '';
    $scope.arrayDate = [];
    $scope.arrayCheque = [];
    $scope.ch_num = 0;
    $scope.obj = {};
    var dataArray = [];
    var now = moment().format('jYYYY');
    var next_year1 = moment(now, "YYYY-MM-DD").add(1, 'year').format('YYYY');
    var next_year2 = moment(now, "YYYY-MM-DD").add(2, 'year').format('YYYY');
    var last_year1 = moment(now, "YYYY-MM-DD").add(-1, 'year').format('YYYY');
    var last_year2 = moment(now, "YYYY-MM-DD").add(-2, 'year').format('YYYY');

    //2 last year
    var sal_tahsily1 = last_year1 + ' - ' + last_year2;
    $scope.arrayDate.push({value: sal_tahsily1});

    // 1 last year
    var sal_tahsily0 = now + ' - ' + last_year1;
    $scope.arrayDate.push({value: sal_tahsily0});

    // now
    var sal_tahsily2 = next_year1 + ' - ' + now;
    $scope.arrayDate.push({value: sal_tahsily2});

    // next year
    var sal_tahsily3 = next_year2 + ' - ' + next_year1;
    $scope.arrayDate.push({value: sal_tahsily3});

    $scope.stu_year = $scope.arrayDate[2].value;

    $scope.tmp_st_id = "";
    $scope.tmp_st_name = "";
    //var
    $scope.st_id = "";

    $scope.st_name = "";
    var skip = -15;
    var take = 15;
    var objects = 0;
    var isem = false;
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
    $scope.filterByClass = function ($classId, $name) {
        if (!$classId) {
            document.getElementById('lblName').innerText = "لیست دانش آموزان";
            skip = -15;
            take = 15;
            objects = 0;
            isem = false;
            $scope.load2();
        } else {
            document.getElementById('lblName').innerText = "لیست دانش آموزان کلاس " + "(" + $name + ")";
            $scope.name = [];
            skip = -15;
            take = 15;
            objects = 0;
            isem = false;
            if ($classId == null) {

            } else {
                if (isem)
                    return;

                skip += take;
                for (var i = 1; i <= take; i++) {
                    $scope.name.push({order_id: "-1" + $scope.name.length});
                }
                var msg = {
                    ViewName: "SelectStudentInClass",
                    mutualTransaction: {
                        Columns: [],
                        kendoDataRequest: {
                            filter: {
                                field: "classid", logic: "and", operator: "eq", value: $classId + ""
                                , filters: [
                                    {field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId},
                                    {field: "isactive", logic: "and", operator: "eq", value: "1"}]

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
            }
        }
    }
    $scope.load2 = function () {
        $scope.name = [];
        skip = -15;
        take = 15;
        objects = 0;
        isem = false;

        var field = "";
        var logic = "";
        var operator = "";
        var value = "";
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
                        field: field, logic: logic, operator: operator, value: value
                        , filters: [
                            {field: "schoolid", logic: "and", operator: "eq", value: localStorage.schoolId},
                            {field: "isactive", logic: "and", operator: "eq", value: "1"}]

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

    }
    $scope.selectTMPSt = function ($id, $name) {
        document.getElementById($id).checked = true;
        $scope.tmp_st_id = $id;
        $scope.tmp_st_name = $name;
    }
    $scope.submitSelect = function () {
        $scope.st_id = $scope.tmp_st_id;
        $scope.st_name = $scope.tmp_st_name;
        var bedehi = {
            ViewName: "SelectBedehiSt",
            parameters: [{key: "%studentid", value: $scope.st_id}],
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
        $http.post(URL_GET, JSON.stringify(bedehi))
            .success(function (result, status, headers, config) {
                $scope.bedehiSt = result.data[0];
                console.log($scope.bedehiSt);
            });
    }
    $scope.typePay = function ($num) {
        if ($num == '1') {
            $scope.paytype = 1;
        } else if ($num == '2') {
            $scope.paytype = 2;
        } else {
            $scope.paytype = 0;
        }
    }
    $scope.cheque = function ($num) {
        $scope.arrayCheque = [];
        $scope.obj = {};
        for (var i = 0; i < $num; i++) {
            $scope.obj[i] = {id: i};
            $scope.arrayCheque.push(i);
        }
        $scope.ch_num = $num;
    }
    $scope.enableBtn = function () {
        if ($scope.st_id) {
            return !true;
        } else {
            return !false;
        }
    }
    $scope.addCheque = function () {
        var x;
        var length = 0;
        for (x in $scope.obj) {
            length++;
        }
        if (length < 9) {
            $scope.chequeNumber += 1;
            $scope.obj[length] = {id: length};
            $scope.arrayCheque.push(length);
            $scope.ch_num = length + 1;
        }

    }

    $scope.replyAllCheque = function ($id) {
        var x;
        for (x in $scope.obj) {
            if ($scope.obj[x].id != $scope.obj[$id].id) {
                try {
                    $scope.obj[x].bank = $scope.obj[$id].bank;
                    $scope.obj[x].shobe = $scope.obj[$id].shobe;
                    $scope.obj[x].cheque_number = $scope.obj[$id].cheque_number;
                    $scope.obj[x].owner = $scope.obj[$id].owner;
                } catch (e) {

                }
            }
        }
    }
    $scope.deleyeCheque = function ($id) {
        var x;
        var length = 0;
        for (x in $scope.obj) {
            length++;
            if ($scope.obj[x].id == $id) {
                length--;
                delete $scope.obj[x];
                for (var i = 0; i < $scope.arrayCheque.length; i++) {
                    if ($scope.arrayCheque[i] == $id) {
                        $scope.arrayCheque.splice(i, 1);
                    }
                }
            }
        }
        $scope.chequeNumber = length;
        $scope.ch_num = length;
    }
    $scope.insertWallet = function () {
        $scope.eroretext = "";
        $scope.eroretex2 = "";
        if ($scope.sal_tahsily && $scope.totalAmount) {
            var s1 = $scope.totalAmount;
            while (s1.includes(","))
                s1 = s1.replace(",", "");

            $scope.totalAmount = s1;

            if ($scope.paytype == 0) {
                var ins_wal1 = {
                    ViewName: "InsertWallet",
                    parameters: [
                        {key: "%student_id", value: $scope.st_id + ''},
                        {key: "%sal_tahsily", value: $scope.sal_tahsily + ''},
                        {key: "%total_amount", value: $scope.totalAmount + ''},
                        {key: "%pay_type", value: '0'},
                        {key: "%note", value: $scope.note || ''},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(ins_wal1))
                    .success(function (result, status, headers, config) {
                        alert("با موفقیت انجام شد.");
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("ارسال اطلاعات با خطا مواجه شد.");
                    // document.location.reload();
                });
            } else if ($scope.paytype == 2) {

                $scope.sumAmount = 0;

                dataArray = [];
                var ins_wal3 = {
                    ViewName: "InsertWallet",
                    parameters: [
                        {key: "%student_id", value: $scope.st_id + ''},
                        {key: "%sal_tahsily", value: $scope.sal_tahsily + ''},
                        {key: "%total_amount", value: $scope.totalAmount + ''},
                        {key: "%pay_type", value: '2'},
                        {key: "%note", value: $scope.note},
                    ]
                };
                dataArray.push(ins_wal3);
                if ($scope.pay2amount) {

                    var s0 = $scope.pay2amount;
                    while (s0.includes(","))
                        s0 = s0.replace(",", "");

                    $scope.pay2amount = s0;
                }
                $scope.sumAmount += parseInt($scope.pay2amount);
                $scope.bedhi = parseInt($scope.totalAmount) - parseInt($scope.pay2amount);
                var bdhi = {
                    ViewName: "InsertCheque",
                    parameters: [
                        {key: "%type", value: '2'},
                        {key: "%amount", value: $scope.pay2amount || '0' + ''},
                        {key: "%cheque_date", value: ''},
                        {key: "%cheque_bank", value: ''},
                        {key: "%cheque_owner", value: ''},
                        {key: "%cheque_number", value: ''},
                        {key: "%cheque_shobe", value: ''},
                    ]
                };
                dataArray.push(bdhi);

            } else {
                $scope.sumAmount = 0;
                dataArray = [];
                var ins_wal2 = {
                    ViewName: "InsertWallet",
                    parameters: [
                        {key: "%student_id", value: $scope.st_id + ''},
                        {key: "%sal_tahsily", value: $scope.sal_tahsily + ''},
                        {key: "%total_amount", value: $scope.totalAmount + ''},
                        {key: "%pay_type", value: '1'},
                        {key: "%note", value: $scope.note},
                    ]
                };
                dataArray.push(ins_wal2);
                if ($scope.naqdAmount) {

                    var s2 = $scope.naqdAmount;
                    while (s2.includes(","))
                        s2 = s2.replace(",", "");

                    $scope.naqdAmount = s2;

                    $scope.sumAmount += parseInt($scope.naqdAmount);

                    var nqd = {
                        ViewName: "InsertCheque",
                        parameters: [
                            {key: "%type", value: '0'},
                            {key: "%amount", value: $scope.naqdAmount + ''},
                            {key: "%cheque_date", value: ''},
                            {key: "%cheque_bank", value: ''},
                            {key: "%cheque_owner", value: ''},
                            {key: "%cheque_number", value: ''},
                            {key: "%cheque_shobe", value: ''},
                        ]
                    };
                    dataArray.push(nqd);
                }
                if ($scope.chequeNumber > 0) {
                    $scope.passIF = false;
                    var item;
                    var passCheque = 0;
                    var fillCheque = 0;
                    var l = 0;
                    for (item in $scope.obj) {
                        try {
                            l++;
                            if ($scope.obj[item].bank && $scope.obj[item].amount && $scope.obj[item].date) {
                                passCheque++;
                                document.getElementById($scope.obj[item].id).className = 'fa fa-check-circle';
                                document.getElementById($scope.obj[item].id).style.color = 'green';
                            } else {
                                fillCheque++;
                                document.getElementById($scope.obj[item].id).className = 'fa fa-exclamation-circle';
                                document.getElementById($scope.obj[item].id).style.color = 'red';
                            }
                        } catch (e) {

                        }

                    }
                    if (passCheque == l) {
                        var x;
                        for (x in $scope.obj) {

                            var s3 = $scope.obj[x].amount;
                            while (s3.includes(","))
                                s3 = s3.replace(",", "");

                            $scope.obj[x].amount = s3;

                            $scope.sumAmount += parseInt($scope.obj[x].amount);
                        }

                        for (x in $scope.obj) {
                            var ins_smb = {
                                ViewName: "InsertCheque",
                                parameters: [
                                    {key: "%type", value: '1'},
                                    {key: "%amount", value: $scope.obj[x].amount + ''},
                                    {
                                        key: "%cheque_date",
                                        value: moment($scope.obj[x].date, 'jYYYY-jM-jD').format('YYYY-M-D') || '' + ''
                                    },
                                    {key: "%cheque_bank", value: $scope.obj[x].bank || '' + ''},
                                    {key: "%cheque_owner", value: $scope.obj[x].owner || '' + ''},
                                    {key: "%cheque_number", value: $scope.obj[x].cheque_number || '' + ''},
                                    {key: "%cheque_shobe", value: $scope.obj[x].shobe || '' + ''},
                                ]
                            };
                            dataArray.push(ins_smb);
                            $scope.passIF = true;
                        }
                    } else {
                        $scope.passIF = false;
                        $scope.eroretext = "show";
                        $scope.errText();
                    }
                }
            }
            if ($scope.paytype == 2 || $scope.paytype == 0) {
                $scope.passIF = true;
            } else {
                if (parseInt($scope.totalAmount) == parseInt($scope.sumAmount)) {
                    $scope.passIF = true;
                } else if (($scope.paytype != 2) && (parseInt($scope.totalAmount) > parseInt($scope.sumAmount))) {
                    console.log($scope.totalAmount);
                    console.log($scope.sumAmount);
                    $scope.passIF = false;
                    document.getElementById('naqdInput').style.border = '1px red solid';
                    alert("جمع مبالغ وارد شده نمیتواند کمتر از کل مبلغ باشد.");
                    return;
                } else {
                    $scope.passIF = false;
                    for (x in $scope.obj) {
                        document.getElementById($scope.obj[x].amount).style.border = '1px red solid';
                    }
                    document.getElementById('naqdInput').style.border = '1px red solid';
                    alert("جمع مبالغ وارد شده نمیتواند بیشتر از کل مبلغ باشد.");
                    return;
                }
            }
            if ($scope.passIF) {
                $http.post(URL_ARRAY_INSERT, JSON.stringify(dataArray))
                    .success(function (result, status, headers, config) {
                        if (parseInt($scope.bedhi) == 0) {
                            alert("با موفقیت ثبت شد");
                        } else {
                            alert("با موفقیت ثبت شد. \n" + $scope.bedhi + " ریال بدهی برای دانش آموز ثیت شد. ");
                        }
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("ارسال اطلاعات با خطا مواجه شد.");
                    // document.location.reload();
                });
            }
        } else {
            if (!$scope.sal_tahsily) {
                $scope.eroretex2 = "سال تحصیلی";
                $scope.errText2();
            } else if (!$scope.totalAmount) {
                $scope.eroretex2 = "کل مبلغ قابل پرداخت";
                $scope.errText2();
            }
        }
    }
    $scope.errText = function () {
        return $scope.eroretext;
    }
    $scope.errText2 = function () {
        return $scope.eroretex2;
    }
    $scope.defultinput = function () {
        document.getElementById('naqdInput').style.border = '1px #dae2e5 solid';
        var x;
        for (x in $scope.obj) {
            document.getElementById($scope.obj[x].amount).style.border = '1px #dae2e5 solid';
        }
    }

    $("input[data-type='currency']").on({
        keyup: function () {
            formatCurrency($(this));
        },
        blur: function () {
            formatCurrency($(this), "blur");
        }

    });

    function formatNumber(n) {
        // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    function formatCurrency(input, blur) {
        // appends $ to value, validates decimal side
        // and puts cursor back in right position.

        // get input value
        var input_val = input.val();


        // don't validate empty input
        if (input_val === "") {
            return;
        }

        // original length
        var original_len = input_val.length;

        // initial caret position
        var caret_pos = input.prop("selectionStart");

        // check for decimal
        if (input_val.indexOf(".") >= 0) {

            // get position of first decimal
            // this prevents multiple decimals from
            // being entered
            var decimal_pos = input_val.indexOf(".");

            // split number by decimal point
            var left_side = input_val.substring(0, decimal_pos);
            var right_side = input_val.substring(decimal_pos);


            // add commas to left side of number
            left_side = formatNumber(left_side);

            // validate right side
            right_side = formatNumber(right_side);


            // On blur make sure 2 numbers after decimal
            if (blur === "blur") {
                right_side += "00";
            }

            // Limit decimal to only 2 digits
            right_side = right_side.substring(0, 2);

            // join number by .
            input_val = left_side + "." + right_side;

        } else {
            // no decimal entered
            // remove all non-digits
            input_val = formatNumber(input_val);
            // add commas to number
            input_val = input_val;

            // final formatting

        }

        // send updated string to input
        input.val(input_val);

        // put caret back in the right position
        var updated_len = input_val.length;
        caret_pos = updated_len - original_len + caret_pos;
        input[0].setSelectionRange(caret_pos, caret_pos);
    }
}
])
;