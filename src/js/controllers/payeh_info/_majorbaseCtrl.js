app.controller('majorbase', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretext = "";
    $scope.mb_discription = "";
    $scope.titelext = "";
    $scope.edit = false;
    $scope.name = [];
    $scope.pcode = "";
    $scope.pName = "";
    $scope.path = [];
    $scope.pathName = [];
    $scope.parrent1 = "";
    $scope.mb_shahriye = 0;
    $scope.pathCode1 = "";
    $scope.pathName1 = "";
    $scope.major = "";
    $scope.status = 0;
    var mbName = "";
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
            ViewName: "allmajor",
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "",
                        logic: "",
                        operator: "",
                        value: ""
                    },
                    skip: skip,
                    take: take,
                    Sort: [{field: "majorbaseid", dir: "DESC"}]
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




    selectParrent();
    $scope.editMB = function () {
        $scope.edit = !$scope.edit;
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
    //edit *************************ویرایش پایه و رشته
    $scope.detial = function ($id, $ismajor) {

        var viename = "";
        if ($ismajor == 1) {
            viename = "allmajor";
            mbName = "رشته";
        } else {
            viename = "majorbaseSelect";
            mbName = "پایه";
        }
        var mbs = {
            ViewName: viename,
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "majorbaseid",
                        logic: "and",
                        operator: "eq",
                        value: $id + ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(mbs))
            .success(function (result, status, headers, config) {
                $scope.thisMajorbase = result.data[0];
                $scope.mb_name = $scope.thisMajorbase.title;
                $scope.mb_discription = $scope.thisMajorbase.description;
                $scope.mb_code = parseInt($scope.thisMajorbase.code);
                $scope.mb_shahriye = parseInt($scope.thisMajorbase.shahriye);

                $scope.parrent1 = $scope.thisMajorbase.parent;
                $scope.pathCode1 = $scope.thisMajorbase.pathcode;
                $scope.pathName1 = $scope.thisMajorbase.pathname;
                $scope.major = $ismajor;

            });
    }

    $scope.editMajorBase = function ($id) {
        if ($scope.edit == true) {
            $scope.mb_discription = "";
            if ($scope.path.length == 0) {
                $scope.parrent1 = '0';
                $scope.pathCode1 = '0';
                $scope.pathName1 = $scope.mb_name + "//";
                $scope.mb_discription = $scope.pathName;
            }//if is child
            else {
                $scope.pathCode1 = "";
                $scope.pathName1 = "";
                for (var i = 0; i < $scope.path.length; i++) {
                    $scope.pathCode1 += $scope.path[i] + '//';
                    $scope.pathName1 += $scope.pathName[i] + "//";
                    $scope.mb_discription += $scope.pathName[i] + ' - ';
                }
                $scope.parrent1 = $scope.path.pop();
            }
        }
        var upd_mb = {
            ViewName: "majorbaseUpdate",
            parameters: [
                {key: "%majorbaseid", value: $id + ''},
                {key: "%title", value: $scope.mb_name + ''},
                {key: "%code", value: $scope.mb_code || '' + ''},
                {key: "%description", value: $scope.mb_discription  + $scope.mb_name + ''},
                {key: "%pathcode", value: $scope.pathCode1 + ''},
                {key: "%pathname", value: $scope.pathName1 + ''},
                {key: "%parent", value: $scope.parrent1 + ''},
                {key: "%ismajor", value: $scope.major + ''},
                {key: "%shahriye", value: $scope.mb_shahriye + ''},

            ]
        };
        var j = confirm("آیا برای ویرایش " + mbName + " با عنوان " + $scope.mb_name + "  اطمینان دارید ؟");
        if (j === true) {
            $http.post(URL_INSERT, JSON.stringify(upd_mb))
                .success(function (result, status, headers, config) {
                    document.location.reload();
                }).error(function (result, status, header, config) {
                alert("درج مقطع با خطا مواجه شد.");
                document.location.reload();
            });
        }
    }


    // delete******************************
    $scope.deleteMajorbase = function ($id, $name) {
        var del_Item = {
            ViewName: "majorbaseDelete",
            parameters: [
                {key: "%majorbaseid", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف مقطع با عنوان " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
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