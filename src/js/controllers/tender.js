app.controller('tenderCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes',
    function ($scope, $filter, $http, editableOptions, editableThemes, $timeout) {
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';
        editableOptions.theme = 'bs3';


        $scope.names1 = [
            {id: 1, file1: 'a0.jpg', order_name: 'Jani', pathAddress: 'Norway', submit: 'yy'},
            {id: 2, file1: 'a1.jpg', order_name: 'Carl', pathAddress: 'Sweden', submit: 'nn'},
            {id: 3, file1: 'a2.jpg', order_name: 'Margareth', pathAddress: 'England', submit: 'yy'},
            {id: 4, file1: 'a3.jpg', order_name: 'Hege', pathAddress: 'Norway', submit: 'yy'},
            {id: 5, file1: 'a4.jpg', order_name: 'Joe', pathAddress: 'Denmark', submit: 'nn'},
            {id: 6, file1: 'a5.jpg', order_name: 'Gustav', pathAddress: 'Sweden', submit: 'yy'},
            {id: 7, file1: 'a6.jpg', order_name: 'Birgit', pathAddress: 'Denmark', submit: 'nn'},
            {id: 8, file1: 'a7.jpg', order_name: 'Mary', pathAddress: 'England', submit: 'yy'},
            {id: 9, file1: 'a8.jpg', order_name: 'Kai', pathAddress: 'Norway', submit: 'nn'}
        ];


        var data1 =
            {
                ViewName: "Order",
                mutualTransaction: {
                    Columns: [""],
                    kendoDataRequest: {
                        filter: {
                            field: "order_type",
                            logic: "And",
                            operator: "eq",
                            value: "3"
                        },
                        skip: 0, take: 24,
                        Sort: [{field: "Ordercreated_at", dir: "DESC"}]
                    }
                }
            }

        $http.post(URL_GET, JSON.stringify(data1))
            .success(function (result, status, headers, config) {
                $scope.names = result.data;
            })
            .error(function (result, status, header, config) {
                $scope.names = result.data;
            });


        //$scope.nlength = $scope.names.length;


        $scope.html5 = {
            email: 'email@example.com',
            tel: '123-45-67',
            number: 29,
            range: 10,
            url: 'http://example.com',
            search: 'blabla',
            color: '#6a4415',
            date: null,
            time: '12:30',
            datetime: null,
            month: null,
            week: null
        };

        $scope.user = {
            name: 'awesome',
            desc: 'Awesome user \ndescription!',
            status: 2,
            agenda: 1,
            remember: false
        };

        $scope.statuses = [
            {value: 1, text: 'status1'},
            {value: 2, text: 'status2'},
            {value: 3, text: 'status3'}
        ];

        $scope.agenda = [
            {value: 1, text: 'male'},
            {value: 2, text: 'female'}
        ];

        $scope.showStatus = function () {
            var selected = $filter('filter')($scope.statuses, {value: $scope.user.status});
            return ($scope.user.status && selected.length) ? selected[0].text : 'Not set';
        };

        $scope.showAgenda = function () {
            var selected = $filter('filter')($scope.agenda, {value: $scope.user.agenda});
            return ($scope.user.agenda && selected.length) ? selected[0].text : 'Not set';
        };

// editable table
        $scope.users = [
            {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
            {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
            {id: 3, name: 'awesome user3', status: 2, group: null}
        ];

        $scope.groups = [];


        $scope.loadGroups = function () {
            return $scope.groups.length ? null : $http.get('api/groups').success(function (data) {
                $scope.groups = data;
            });
        };

        $scope.showGroup = function (user) {
            if (user.group && $scope.groups.length) {
                var selected = $filter('filter')($scope.groups, {id: user.group});
                return selected.length ? selected[0].text : 'Not set';
            } else {
                return user.groupName || 'Not set';
            }
        };

        $scope.showStatus = function (user) {
            var selected = [];
            if (user && user.status) {
                selected = $filter('filter')($scope.statuses, {value: user.status});
            }
            return selected.length ? selected[0].text : 'Not set';
        };

        /*$scope.checkName = function(data, id) {
          if (id === 2 && data !== 'awesome') {
            return "Username 2 should be `awesome`";
          }
        };*/

        $scope.saveUser = function (data, id) {
            //$scope.user not updated yet
            angular.extend(data, {id: id});
            // return $http.post('api/saveUser', data);
        };

// remove user
        $scope.removeUser = function (index,id) {
            var j = confirm("do you want to delete ?");
            if (j === true) {
                $scope.names.splice(index, 1);

                var datadel = {

                    ViewName: "XV_DeleteOrder",
                    parameters: [

                        {key: "%order_id", value: id.toString()}
                    ]

                }



                $http.post(URL_INSERT, JSON.stringify(datadel))
                    .success(function (result, status, headers, config) {
                        alert("آگهی با کد" + id + "با موفقیت حذف شد.");

                    }).error(function (result, status, header, config) {
                    alert("حذف با خطا مواجهه شد.");
                });

            }
        };
    }]);
