'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window',
        function ($scope, $translate, $localStorage, $window) {
            $scope.showPanel = function () {
                if (localStorage.adminCount && localStorage.adminCount != 0) {
                    return true;
                    document.location.reload();
                }
                else {
                    return false;
                }

            }
            $scope.CreateOrderDate = "";
            $scope.orderTEXT = "";
            $scope.orderCITY = "";
            $scope.orderCAT = "";
            $scope.alert = 0;
            $scope.conShow = 0;
            $scope.cityMenu = "";
            $scope.userAccunt = "";
            $scope.Filter = "";
            $scope.FilterValue = "";
            $scope.loginNum = 0;
            $scope.signoutNum = 0;
            $scope.adminId = "";

            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            if (isIE) {
                angular.element($window.document.body).addClass('ie');
            }
            if (isSmartDevice($window)) {
                angular.element($window.document.body).addClass('smart')
            }
            ;

            // config
            $scope.app = {
                name: 'کشاورزان موفق',
                version: '1.0',
                // for chart colors
                color: {
                    primary: '#7266ba',
                    info: '#23b7e5',
                    success: '#27c24c',
                    warning: '#fad733',
                    danger: '#f05050',
                    light: '#e8eff0',
                    dark: '#3a3f51',
                    black: '#1c2b36'
                },
                settings: {
                    themeID: 1,
                    navbarHeaderColor: 'bg-Cg',
                    navbarCollapseColor: 'bg-Cg',
                    asideColor: 'bg-white-only',
                    headerFixed: true,
                    asideFixed: true,
                    asideFolded: false,
                    asideDock: false,
                    container: false
                }
            }

            // save settings to local storage
            if (angular.isDefined($localStorage.settings)) {
                $scope.app.settings = $localStorage.settings;
            } else {
                $localStorage.settings = $scope.app.settings;
            }
            $scope.$watch('app.settings', function () {
                if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
                    // aside dock and fixed must set the header fixed.
                    $scope.app.settings.headerFixed = true;
                }
                // for box layout, add background image
                $scope.app.settings.container ? angular.element('html').addClass('bg') : angular.element('html').removeClass('bg');
                // save to local storage
                $localStorage.settings = $scope.app.settings;
            }, true);

            // angular translate
            $scope.lang = {isopen: false};
            $scope.langs = {en: 'English', de_DE: 'German', it_IT: 'Italian', fa_IR: 'فارسی'};
            $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
            $scope.setLang = function (langKey, $event) {
                // set the current lang
                $scope.selectLang = $scope.langs[langKey];
                // You can change the language during runtime
                $translate.use(langKey);
                $scope.lang.isopen = !$scope.lang.isopen;
            };

            function isSmartDevice($window) {
                // Adapted from http://www.detectmobilebrowsers.com
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            }
        }]);


'use strict';

/* Controllers */

app.controller('loginCtrl', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout) {
    $scope.adminProfile = [];
    $scope.CreateOrderDate = "";
    $scope.orderTEXT = "";
    $scope.orderCITY = "";
    $scope.orderCAT = "";
    $scope.alert = 0;
    $scope.conShow = 0;
    $scope.cityMenu = "";
    $scope.userAccunt = "";
    $scope.Filter = "";
    $scope.FilterValue = "";
    $scope.loginNum = 0;
    $scope.signoutNum = 0;
    $scope.adminId = "";


    //login

    $scope.SignupMenu = function () {
        alert("ورود با موفقیت انجام شد");
        localStorage.adminId = '3';
        $scope.adminCounter();
        $scope.showPanel();
        $scope.showLogin();
        var pro = {ViewName: "XV_UserProfile", parameters: [{key: "%user_id", value: localStorage.adminId + ''}]}
        $http.post(URL_GET, JSON.stringify(pro)).success(function (result, status, headers, config) {
            $scope.adminProfile = result.data[0];
            localStorage.adminNeame  = $scope.adminProfile.first_name + " " +$scope.adminProfile.last_name;
            localStorage.adminimg  = $scope.adminProfile.picture ;

            $scope.adminPoro();
        })

        // if ($scope.phoneNumber) {
        //
        //     if (!$scope.confirmCode) {
        //
        //         var tel = {key: $scope.phoneNumber + "", value: ""};
        //         $http.post(URL_SendSMS, JSON.stringify(tel)).success(function (result, status, headers, config) {
        //             alert(" لطفا کد تایید 4رقمی ارسال شده بروی شماره تلفن  " + $scope.phoneNumber + " را وارد نمایید. ");
        //             $scope.conShow = 1;
        //             $scope.alert = 0;
        //             $scope.showConfirim()
        //         }).error(function (result, status, header, config) {
        //             alert("خطا در ورود \t لطفا شماره تلفن خود را به صورت صحیح وارد نمایید .")
        //         })
        //     } else {
        //         var con = {key: $scope.phoneNumber + "", value: $scope.confirmCode + ""};
        //         $http.post(URL_login, JSON.stringify(con)).success(function (result, status, headers, config) {
        //             alert("ورود با موفقیت انجام شد");
        //             $scope.adminAcct = result.data;
        //             localStorage.adminId = $scope.adminAcct.user_id;
        //             $scope.adminCounter();
        //             $scope.showPanel();
        //             $scope.showLogin();
        //
        //         }).error(function (result, status, header, config) {
        //             alert(" کد تایید وارد شده نادرست میباشد! \t لطفا دوباره تلاش کنید. .")
        //         })
        //     }
        // } else {
        //     $scope.alert = 1;
        //     $scope.showAlertDang()
        // }
    }
    $scope.adminPoro = function () {
        return localStorage.adminNeame ;
    }

    $scope.adminImage = function () {
        return localStorage.adminimg ;
    }

    $scope.showAlertDang = function () {
        if ($scope.alert == 0) {
            return !1
        } else if ($scope.alert == 1) {
            return !0
        }
    }
    $scope.showConfirim = function () {
        if ($scope.conShow == 0) {
            return !1
        } else if ($scope.conShow == 1) {
            return !0
        }
    }
    $scope.adminCounter = function () {
        if (typeof (Storage) !== "undefined") {
            if (localStorage.adminCount) {
                localStorage.adminCount = Number(localStorage.adminCount) + 1
            } else {
                localStorage.adminCount = 1
            }
        } else {
            alert("با عرض پوزش مرورگر شما از localStorage ما پشتیبانی نمیکند \t مروگر خود را اپدیت یا تغییر دهید سپس مجددا تلاش کنید.")
        }
    }
    $scope.logoutAdmin = function () {
        var j = confirm("آیا میخواهید از حساب خود خارج شوید ؟");
        if (j === !0) {
            localStorage.adminCount = "";
            $scope.showPanel();
            $scope.showLogin();
        }
    }

    $scope.showLogin = function () {
        if (!localStorage.adminCount || localStorage.adminCount == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    $scope.showPanel = function () {
        if (localStorage.adminCount || localStorage.adminCount != 0) {
            return false;
        }
        else {
            return true;
        }

    }


//login


}])
;
