app.controller('majorbase_insert', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretext = "";
    $scope.titleHeader = "";
    $scope.path = [];
    $scope.pathName = [];
    $scope.parrent1 = "";
    $scope.pathCode1 = "";
    $scope.pathName1 = "";
    $scope.major = "";
    $scope.status = 0;
    $scope.mb_discription = "";
    funcn();

    function funcn() {
        myVar = setTimeout(myfunction, 300);
    }

    function myfunction() {
        var full_url = document.URL;
        var url_array = full_url.split('/')
        $scope.status = url_array[url_array.length - 1];
        if( $scope.status == 0)
        {
            $scope.titleHeader = "پایه";
        }
        else {
            $scope.titleHeader = "رشته";
        }
        selectParrent();
    }

    function selectParrent() {
        var mbs = {
            ViewName: "majorbaseSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        logic: "and",
                        operator: "eq",
                        value: '0'
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.parrent = result.data;
            });
    }

    $scope.seleteChild1 = function ($parrentId, $title) {
        if ($parrentId && $parrentId != null && $parrentId != undefined) {
            $scope.path[0] = $parrentId;
            $scope.pathName[0] = $title;
        } else {
            $scope.path = [];
            $scope.pathName = [];
        }
        var mbs = {
            ViewName: "majorbaseSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        logic: "and",
                        operator: "eq",
                        value: $parrentId
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.child1 = result.data;
            });
    }
    $scope.seleteChild2 = function ($child1Id, $titile) {
        if ($child1Id && $child1Id != null && $child1Id != undefined) {
            $scope.path[1] = $child1Id;
            $scope.pathName[1] = $titile;
        } else {
            $scope.path.splice(1);
            $scope.pathName.splice(1);
        }
        var mbs = {
            ViewName: "majorbaseSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        operator: "eq",
                        logic: "and",
                        value: $child1Id
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.child2 = result.data;
            });
    }
    $scope.seleteChild3 = function ($child2Id, $title) {
        if ($child2Id && $child2Id != null && $child2Id != undefined) {
            $scope.path[2] = $child2Id;
            $scope.pathName[2] = $title;
        } else {
            $scope.path.splice(2);
            $scope.pathName.splice(2);
        }
        var mbs = {
            ViewName: "majorbaseSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        operator: "eq",
                        logic: "and",
                        value: $child2Id
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.child3 = result.data;
            });
    }
    $scope.seleteChild4 = function ($child3Id, $title) {
        if ($child3Id && $child3Id != null && $child3Id != undefined) {
            $scope.path[3] = $child3Id;
            $scope.pathName[3] = $title;
        } else {
            $scope.path.splice(3);
            $scope.pathName.splice(3);
        }
        var mbs = {
            ViewName: "majorbaseSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "parent",
                        operator: "eq",
                        logic: "and",
                        value: $child3Id
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.child4 = result.data;
            });
    }


    $scope.insertMajorbaseFunctin = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.mb_name)) {
                //if is parrent
                if ($scope.path.length == 0) {
                    $scope.parrent1 = '0';
                    $scope.pathCode1 = '0';
                    $scope.pathName1 = $scope.mb_name + "//";
                    $scope.mb_discription += $scope.mb_name ;
                }//if is child
                else {
                    $scope.pathCode1 = "";
                    $scope.pathName1 = "";
                    for (var i = 0; i < $scope.path.length; i++) {
                        $scope.pathCode1 += $scope.path[i] + '//';
                        $scope.pathName1 += $scope.pathName[i] + "//" ;
                        $scope.mb_discription += $scope.pathName[i] + ' - ';
                    }
                    $scope.parrent1 = $scope.path.pop();
                }
                if ($scope.status == 0) {
                    $scope.major = 0;
                } else if ($scope.status == 1) {
                    $scope.major = 1;
                }
                var ins_mb = {
                    ViewName: "majorbaseInsert",
                    parameters: [
                        {key: "%title", value: $scope.mb_name + ''},
                        {key: "%code", value: $scope.mb_code || '' + ''},
                        {key: "%description", value: $scope.mb_discription + $scope.mb_name  + ''},
                        {key: "%pathcode", value: $scope.pathCode1 + ''},
                        {key: "%pathname", value: $scope.pathName1 + ''},
                        {key: "%parent", value: $scope.parrent1 + ''},
                        {key: "%ismajor", value: $scope.major  + ''},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(ins_mb))
                    .success(function (result, status, headers, config) {
                        alert($scope.titleHeader + " جدیدی با عنوان " + $scope.mb_name + " با موفقیت درج شد.");
                        document.location.replace("#/app/page/majorbase");
                    }).error(function (result, status, header, config) {
                    alert("درج مقطع با خطا مواجه شد.");
                    document.location.reload();
                });
            } else {
                if (!$scope.mb_name) {
                    $scope.eroretext = "نام مقطع";
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
    $scope.BackToHistory = function () {
        window.history.back();
    }
}

])
;