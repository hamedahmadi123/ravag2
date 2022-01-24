//Mock Data service
(function(){
    var mock = function(){

        var getStates = [

            {
                id: 1,
                name: 'Florida'
            }, {
                id: 2,
                name: 'California'
            }, {
                id: 3,
                name: 'Texas'
            }

        ];

        var getCities = [{
            id: 1,
            names: ['Miami', 'Ft.Lauderdale', 'Tampa']
        }, {
            id: 2,
            names: ['San Diego', 'San Francisco', 'L.A.']
        }, {
            id: 3,
            names: ['Dallas', 'San Antonio', 'Anywhere USA']
        }

        ];

        //Public Api
        return{

            getStates:getStates,
            getCities:getCities

        };
    };

    var module = angular.module('app'); //get reference to module
    module.factory('mock', mock); //create mock service

}());