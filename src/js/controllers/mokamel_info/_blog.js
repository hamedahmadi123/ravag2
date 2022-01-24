app.controller('blog', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.arrselect = [];
    $scope.eroretext = "";
    $scope.titelext = "";
    $scope.blog_img = "";
    $scope.name = [];
    var skip = -15;
    var take = 15;
    var objects = 0;
    var isem = false;
    myfunc();

    function myfunc() {
        // window.alert("aaaaaaaaaa")
        var trm = {
            ViewName: "SelectCategory",
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
        $http.post(URL_GET, JSON.stringify(trm))
            .success(function (result, status, headers, config) {
                $scope.category = result.data;
            });
        // window.alert($scope.category)
    }

    $scope.load2 = function () {

        if (isem)
            return;

        skip += take;
        for (var i = 1; i <= take; i++) {
            $scope.name.push({order_id: "-1" + $scope.name.length});
        }


        var msg = {
            ViewName: "SelectBlog",
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "schoolid",
                        logic: "and",
                        operator: "eq",
                        value: localStorage.schoolId + ""
                    },
                    skip: skip,
                    take: take,
                    Sort: [{field: "blog_id", dir: "DESC"}]
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

    $scope.detailBlog = function ($id) {
        var cls = {
            ViewName: "SelectBlog",
            mutualTransaction: {
                kendoDataRequest: {
                    filter: {
                        field: "blog_id",
                        logic: "and",
                        operator: "eq",
                        value: $id + ""
                    },
                }
            }
        }
        $http.post(URL_GET, JSON.stringify(cls))
            .success(function (result, status, headers, config) {
                $scope.thisblog = result.data[0];
                $scope.titreE = $scope.thisblog.titre;
                $scope.blog_categoryE = $scope.thisblog.category_id;
                $scope.bodyE = $scope.thisblog.body;
                $scope.blog_img = $scope.thisblog.img;
            });
    }


    $scope.insert_blogCategory = function () {

        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.content.titleCat)) {
                var ins_blogCategory = {
                    ViewName: "InsertBlogCategory",
                    parameters: [
                        {key: "%title", value: $scope.content.titleCat},
                        {key: "%schoolid", value: localStorage.schoolId},
                    ]
                };

                $http.post(URL_INSERT, JSON.stringify(ins_blogCategory))
                    .success(function (result, status, headers, config) {
                        alert("دسته جدیدی با عنوان " + $scope.content.titleCat + " با موفقیت درج شد.");
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("درج دسته با خطا مواجه شد.");
                    document.location.reload();
                });
            } else {
                if (!$scope.content.titleCat) {
                    $scope.eroretext = "عنوان دسته";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }
    $scope.update_blogCategory = function ($id) {
        window.alert("Hey")
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.titleCat)) {
                var ins_blog = {
                    ViewName: "UpdateBlogCategory",
                    parameters: [
                        {key: "%title", value: $scope.titleCat},
                        {key: "%category_id", value: $scope.blog_categoryE + ''},
                    ]
                };
                var j = confirm("آیا برای ویرایش خبر با عنوان " + $scope.titreE + " اطمینان دارید ؟ ");
                if (j === true) {
                    $http.post(URL_INSERT, JSON.stringify(ins_blog))
                        .success(function (result, status, headers, config) {
                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("ویرایش خبر با خطا مواجه شد.");
                        document.location.reload();
                    });
                }
            } else {
                if (!$scope.content) {
                    $scope.eroretext = "عنوان و متن خبر";
                } else if (!$scope.blog_category) {
                    $scope.eroretext = "دسته بندی";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }


    $scope.insert_blog = function () {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.content.titr) && ($scope.content.body) && ($scope.blog_category)) {
                var ins_blog = {
                    ViewName: "InsertBlog",
                    parameters: [

                        {key: "%titre", value: $scope.content.titr},
                        {key: "%body", value: $scope.content.body},
                        {key: "%img", value: '/api/' + $scope.blog_img + ''},
                        {key: "%category_id", value: $scope.blog_category + ''},
                        {key: "%schoolid", value: localStorage.schoolId},
                    ]
                };
                $http.post(URL_INSERT, JSON.stringify(ins_blog))
                    .success(function (result, status, headers, config) {
                        alert("خبر جدیدی با عنوان " + $scope.content.titr + " با موفقیت درج شد.");
                        document.location.reload();
                    }).error(function (result, status, header, config) {
                    alert("درج خبر با خطا مواجه شد.");
                    document.location.reload();
                });
            } else {
                if (!$scope.content.titr) {
                    $scope.eroretext = "عنوان خبر";
                } else if (!$scope.blog_category) {
                    $scope.eroretext = "دسته بندی";
                } else if (!$scope.content.body) {
                    $scope.eroretext = "متن خبر";
                }
            }
        } else if ((!localStorage.adminId) || localStorage.adminCount == 0 || (!localStorage.adminCount || localStorage.adminCount == undefined || localStorage.adminCount == "undefined")) {
            alert("خطا در تایید حساب کاربری \n لطفا مجددا وارد حساب خود شوید.");
            document.location.replace("#/app/Main");
            document.location.reload()
        }
    }
    $scope.update_blog = function ($id) {
        if ((localStorage.adminId) && localStorage.adminCount != 0 && (localStorage.adminCount && localStorage.adminCount != undefined && localStorage.adminCount != "undefined")) {
            if (($scope.titreE) && ($scope.blog_categoryE) && ($scope.bodyE)) {
                var ins_blog = {
                    ViewName: "UpdateBlog",
                    parameters: [
                        {key: "%blog_id", value: $id},
                        {key: "%titre", value: $scope.titreE},
                        {key: "%body", value: $scope.bodyE},
                        {key: "%img", value: '/api/' + $scope.blog_img + ''},
                        {key: "%category_id", value: $scope.blog_categoryE + ''},
                    ]
                };
                var j = confirm("آیا برای ویرایش خبر با عنوان " + $scope.titreE + " اطمینان دارید ؟ ");
                if (j === true) {
                    $http.post(URL_INSERT, JSON.stringify(ins_blog))
                        .success(function (result, status, headers, config) {
                            document.location.reload();
                        }).error(function (result, status, header, config) {
                        alert("ویرایش خبر با خطا مواجه شد.");
                        document.location.reload();
                    });
                }
            } else {
                if (!$scope.content) {
                    $scope.eroretext = "عنوان و متن خبر";
                } else if (!$scope.blog_category) {
                    $scope.eroretext = "دسته بندی";
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
                ViewName: "DeleteBlog",
                parameters: [
                    {key: "%blog_id", value: $scope.arrselect[i] + ''},
                ]
            };
            dataArray.push(del_Item);
        }
        var j = confirm("آیا برای حذف خبر های انتخاب شده اطمینان دارید ؟ ");
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

    $scope.deleteClass = function ($id, $name) {
        var del_Item = {
            ViewName: "DeleteBlog",
            parameters: [
                {key: "%blog_id", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف خبر با عنوان " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
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
        $scope.blog_img = data.response.data;
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

    $("#uploadFile2").fileinput({
        uploadUrl: URL_upload,
        autoOrientImage: true,
        maxImageWidth: 1600,
        maxImageHeight: 800,
        resizePreference: 'height',
        resizeImage: true
    });

    $("#uploadFile2").on('fileuploaded', function (event, data) {
        // and check what's in both params
        $scope.blog_img = data.response.data;
    });
    $("#toggleOrient").on('change', function () {
        var val = $(this).prop('checked');
        $("#uploadFile2").fileinput('refresh', {
            uploadUrl: URL_upload,
            autoOrientImage: val,
            maxImageWidth: 1600,
            maxImageHeight: 800,
            resizePreference: 'height',
            resizeImage: true,
        });
        $('#togStatus2')
            .html('Fileinput is reset and <samp>autoOrientImage</samp> is set to <em>'
                + (val ? 'true' : 'false') + '</em>. Retry by selecting images again.');
    });
}])
;