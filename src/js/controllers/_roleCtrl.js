app.controller('role', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.item = {};
    $scope.txterr = "";

    $scope.changtext = function ($check) {

        $scope.checkbox1 = !$check;
        $scope.selAll();

    }
    $scope.selAll = function () {
        if ($scope.checkbox1 == true) {
            for (var i = 0; i < $scope.Activitys.length; i++) {
                $scope.item[$scope.Activitys[i].name] = true;
            }
        } else {
            for (var i = 0; i < $scope.Activitys.length; i++) {
                $scope.item[$scope.Activitys[i].name] = false;
            }
        }

    }
    myfunc();

    function myfunc() {
        $http.post(URL_GET, JSON.stringify({
            ViewName: "XV_SelectRole",
            parameters: [
                {key: "%schoolid", value: localStorage.schoolId},
            ],
        })).success(function (result, status, headers, config) {
            $scope.roles = result.data;
        });
        $http.post(URL_GET, JSON.stringify({
            ViewName: "XV_SelectActivitys",
        })).success(function (result, status, headers, config) {
            $scope.Activitys = result.data;
        });
    }

    $scope.selectGrp = function ($id) {
        var grp = {
            ViewName: "XV_SelectRole",
            parameters: [
                {key: "%schoolid", value: localStorage.schoolId},
            ],
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {field: "role_id", logic: "and", operator: "eq", value: $id + ""}
                }
            }
        };

        $http.post(URL_GET, JSON.stringify(grp))
            .success(function (result, status, headers, config) {
                $scope.thisGroup = result.data[0];
                $scope.name = $scope.thisGroup.role_name;
                $scope.item = JSON.parse($scope.thisGroup.permission);
            })
    }
    $scope.insertGroup = function () {
        if ($scope.name && JSON.stringify($scope.item)) {
            var ins_grp = {
                ViewName: "XV_InsertRole",
                parameters: [
                    {key: "%role_name", value: $scope.name + ''},
                    {key: "%permission", value: JSON.stringify($scope.item)},
                    {key: "%schoolid", value: localStorage.schoolId+''},
                ]
            };
            var j = confirm("آیا برای افزودن گروه جدید با عنوان " + $scope.name + " اطمینان دارید ؟ ");
            if (j === true) {
                $http.post(URL_INSERT, JSON.stringify(ins_grp))
                    .success(function (result, status, headers, config) {
                        var x = document.getElementById("snackbar");
                        x.className = "show";
                        setTimeout(function () {
                            x.className = x.className.replace("show", "");
                        }, 3000);
                        myfunc();
                        $('#myModal').modal('hide');
                    }).error(function (result, status, header, config) {
                    alert(" با خطا مواجه شد.");
                    document.location.reload();
                });
            }
        } else {
            if (!$scope.name)
                $scope.txterr = "نام گروه";
            else if (!JSON.stringify($scope.item))
                $scope.txterr = "حداقل یک دسترسی";
        }
    }
    $scope.updateGroup = function ($id) {
        if ($scope.name && JSON.stringify($scope.item)) {
            var upd_grp = {
                ViewName: "XV_UpdateRole",
                parameters: [
                    {key: "%role_id", value: $id + ''},
                    {key: "%role_name", value: $scope.name + ''},
                    {key: "%permission", value: JSON.stringify($scope.item)},
                ]
            };
            var j = confirm("آیا برای ویرایش گروه جدید با عنوان " + $scope.name + " اطمینان دارید ؟ ");
            if (j === true) {
                $http.post(URL_INSERT, JSON.stringify(upd_grp))
                    .success(function (result, status, headers, config) {
                        var x = document.getElementById("snackbar");
                        x.className = "show";
                        setTimeout(function () {
                            x.className = x.className.replace("show", "");
                        }, 3000);
                        myfunc();
                        $('#update').modal('hide');
                    }).error(function (result, status, header, config) {
                    alert("ویرایش با خطا مواجه شد.");
                    document.location.reload();
                });
            }
        } else {
            if (!$scope.name)
                $scope.txterr = "نام گروه";
            else if (!JSON.stringify($scope.item))
                $scope.txterr = "حداقل یک دسترسی";
        }
    }
    $scope.errText = function () {
        return $scope.txterr;
    }

}])
;