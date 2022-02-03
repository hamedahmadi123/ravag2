app.controller('termha', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout){
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
            ViewName: "TermSelect",
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
                    Sort: [{field: "termid", dir: "DESC"}]
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

    $scope.detial = function ($id) {
        var trm = {
            ViewName: "TermSelect",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "termid",
                        logic: "and",
                        operator: "eq",
                        value: $id + ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(trm))
            .success(function (result, status, headers, config) {
                $scope.termha = result.data[0];
                $scope.trm_id = $scope.termha.termid;
                $scope.trm_year = $scope.termha.year;
                $scope.trm_name = $scope.termha.title;
                $scope.trm_dore = $scope.termha.duration;
                $scope.trm_start = $scope.termha.startdate;
                $scope.trm_end = $scope.termha.enddate;
            });
    }

    // delete******************************
    $scope.deleteTerm = function ($id, $name) {
        var del_Item = {
            ViewName: "TermDelete",
            parameters: [
                {key: "%termid", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف ترم با عنوان " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
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