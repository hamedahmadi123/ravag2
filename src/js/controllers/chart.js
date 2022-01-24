
app.controller("FlotChartDemoCtrl",['$scope', '$filter', '$http',
    function ($scope, $filter, $http) {

        var i = 0;
        $scope.data =[10,20];
        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];



        var usergrid =
            {
                ViewName: "UserCountPerDay",
                parameters:[
                    {key: "%dayParam",value: "53" }

                ]

            }

        $http.post(URL_GET, JSON.stringify(usergrid))
            .success(function (result, status, headers, config) {
                $scope.usergrid = result.data;
                $scope.usergrid.forEach(function (item) {
                    $scope.data[i] = item.dif;
                    i++;
                });
            });
        console.log($scope.data);





    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }
            ]
        }
    };
}]);
