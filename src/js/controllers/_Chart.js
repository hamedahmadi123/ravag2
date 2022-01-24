app.controller("FlotChartDemoCtrl", ["$scope", "$filter", "$http", function (a, e, i) {
    var s = 0;
    a.data = [10, 20], a.labels = ["January", "February", "March", "April", "May", "June", "July"], a.series = ["Series A", "Series B"];
    i.post(URL_GET, JSON.stringify({
        ViewName: "UserCountPerDay",
        parameters: [{key: "%dayParam", value: "53"}]
    })).success(function (e, i, r, t) {
        a.usergrid = e.data, a.usergrid.forEach(function (e) {
            a.data[s] = e.dif, s++
        })
    }),  a.onClick = function (a, e) {

    }, a.datasetOverride = [{yAxisID: "y-axis-1"}, {yAxisID: "y-axis-2"}], a.options = {
        scales: {
            yAxes: [{
                id: "y-axis-1",
                type: "linear",
                display: !0,
                position: "left"
            }, {id: "y-axis-2", type: "linear", display: !0, position: "right"}]
        }
    }
}]);