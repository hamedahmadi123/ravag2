app.controller('aboutBase', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.eroretext = "";
    $scope.inputLenght = 500;
    $scope.mjr_image = "";
    $scope.statos = "";
    $scope.grayesh = {};
    $scope.majorArray = [];
    funcn();

    function funcn() {
        myVar = setTimeout(myfunction, 300);
    }

    function myfunction() {
        var full_url = document.URL;
        var url_array = full_url.split('/')
        $scope.majorbaseid = url_array[url_array.length - 1];
        $scope.majorArray.push($scope.majorbaseid);
//         console.log("Major Array")
// console.log($scope.majorArray)
        var mjr = {
            ViewName: "SelectBase",
            parameters: [
                {key: "%majorbaseid", value: $scope.majorbaseid + ''},
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
        // window.alert(JSON.stringify(mjr))
        $http.post(URL_GET, JSON.stringify(mjr))
            .success(function (result, status, headers, config) {
                $scope.majorbase = result.data[0];
                console.log( "about Base" +$scope.majorbase)
                var about_mjr = {
                    ViewName: "SelectAboutBase",
                    parameters: [
                        {key: "%majorbaseid", value: $scope.majorbaseid + ''},
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
                console.log(JSON.stringify(about_mjr))
                $http.post(URL_GET, JSON.stringify(about_mjr))
                    .success(function (result, status, headers, config) {
                        $scope.about_majorbase = result.data[0];
                        if ($scope.about_majorbase) {
                            $scope.statos = "upd";
                            $scope.mjr_content = $scope.about_majorbase.content;
                            $scope.grayesh = JSON.parse($scope.about_majorbase.graiesh);
                        } else {
                            $scope.statos = "ins";
                        }
                    });
                var sch = {
                    ViewName: "LikeMajor",
                    mutualTransaction: {
                        kendoDataRequest: {
                            filter: {
                                field: "",
                                logic: "",
                                operator: "",
                                value: "",
                                filters: [
                                    {field: "ismajor", logic: "and", operator: "eq", value: '0'},
                                    {field: "title", logic: "and", operator: "contains", value: $scope.majorbase.title},
                                    {
                                        field: "majorbaseid",
                                        logic: "and",
                                        operator: "neq",
                                        value: $scope.majorbase.majorbaseid
                                    },
                                ]
                            },
                        }
                    }
                }
                console.log(JSON.stringify(sch));
                $http.post(URL_GET, JSON.stringify(sch))
                    .success(function (result, status, headers, config) {
                        $scope.like_major = result.data
                        console.log($scope.like_major);
                    });
            });
    }

    $scope.inputChange = function ($lenghe) {
        if ($lenghe <= 500) {
            $scope.inputLenght -= $lenghe;
        }
    }
    $scope.itemArray = function ($id, $bool) {
        if ($bool == true) {
            $scope.majorArray.push($id);
        } else {
            for (var i = 0; i < $scope.majorbaseid.length; i++) {
                if ($scope.majorArray[i] === $id) {
                    $scope.majorArray.splice(i, 1);
                }
            }
        }
    }
    $scope.aboutMajorInsert = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.mjr_content)) {
                var dataArray = [];
                for (var i = 0; i < $scope.majorArray.length; i++) {
                    var ins_major = {
                        ViewName: "InsertAboutMajor",
                        parameters: [
                            {key: "%majorbaseid", value: $scope.majorArray[i]},
                            {key: "%content", value: $scope.mjr_content + ''},
                            {key: "%graiesh", value: JSON.stringify($scope.grayesh)},
                            {key: "%img", value: '/api/' + $scope.mjr_image},
                        ]
                    };
                    dataArray.push(ins_major);
                }
                $http.post(URL_ARRAY_INSERT, JSON.stringify(dataArray))
                    .success(function (result, status, headers, config) {
                        window.history.back();
                    }).error(function (result, status, header, config) {
                    alert("درج توضیحات پایه با خطا مواجه شد.");
                    document.location.reload();
                });
            } else {
                if (!$scope.mjr_content) {
                    $scope.eroretext = "توضیح کلی راجع به پایه";
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
    $("#uploadFile1").fileinput({
        uploadUrl: URL_upload,
        autoOrientImage: true,
        maxImageWidth: 1600,
        maxImageHeight: 800,
        resizePreference: 'height',
        resizeImage: true
    });

    $("#uploadFile1").on('fileuploaded', function (event, data) {
        // and check what's in both params
        $scope.mjr_image = data.response.data;
    });
    $("#toggleOrient").on('change', function () {
        var val = $(this).prop('checked');
        $("#uploadFile1").fileinput('refresh', {
            uploadUrl: URL_upload,
            autoOrientImage: val,
            maxImageWidth: 1600,
            maxImageHeight: 800,
            resizePreference: 'height',
            resizeImage: true,
        });
        $('#togStatus')
            .html('Fileinput is reset and <samp>autoOrientImage</samp> is set to <em>'
                + (val ? 'true' : 'false') + '</em>. Retry by selecting images again.');
    });


}])
;








