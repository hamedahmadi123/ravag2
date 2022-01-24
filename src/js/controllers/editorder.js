// app.controller('EditOrderCtrl', ['$scope', '$filter', '$http',
//     function ($scope, $filter, $http, $timeout) {
//
//         var order_id;
//
//
//         var locations = {
//             ViewName: "locationParrent",
//             parameters: [
//                 {key: "%parrent", value: "-"}
//
//             ]
//
//         }
//
//         $http.post(URL_GET, JSON.stringify(locations))
//             .success(function (result, status, headers, config) {
//                 $scope.loca = result.data;
//             })
//             .error(function (result, status, header, config) {
//                 $scope.loca = result.data;
//             });
//
//
// //location
//
//
// //category
//         var cat = {
//             ViewName: "categoryTable"
//
//         }
//
//         $http.post(URL_GET, JSON.stringify(cat))
//             .success(function (result, status, headers, config) {
//                 $scope.cate = result.data;
//             })
//             .error(function (result, status, header, config) {
//                 $scope.cate = result.data;
//             });
//
//         $scope.order_type = [
//             {order_itype: 1, order_ntype: 'آگهی عادی'},
//             {order_itype: 2, order_ntype: 'مزایده'},
//             {order_itype: 3, order_ntype: 'مناقصه'}
//         ];
//
//         setTimeout(myFunction, 300);
//
//         function myFunction() {
//             var full_url = document.URL; // Get current url
//             var url_array = full_url.split('/') // Split the string into an array with / as separator
//             order_id = url_array[url_array.length - 1];  // Get the last part of the array (-1)
//
//             var data = {
//                 ViewName: "OrderDetail",
//                 parameters: [
//                     {key: "%order_id", value: order_id}]
//             }
//
//
//             $http.post(URL_GET, JSON.stringify(data))
//                 .success(function (result, status, headers, config) {
//                     $scope.orders = result.data;
//                 })
//
//             $scope.showState = function (order) {
//                 var stateselected = [];
//                 if (order && order.location_id) {
//                     stateselected = $filter('filter')($scope.loca, {location_id: order.location_id});
//                 }
//                 return stateselected.length ? stateselected[0].location_name : 'انتخاب نشده';
//
//
//             };
//             $scope.showCategory = function (order) {
//                 var cateselected = [];
//                 if (order && order.category_id) {
//                     cateselected = $filter('filter')($scope.cate, {category_id: order.category_id});
//                 }
//                 return cateselected.length ? cateselected[0].category_name : 'انتخاب نشده';
//             };
//             $scope.showType = function (order) {
//                 var typeselected = [];
//                 if (order && order.order_type) {
//                     typeselected = $filter('filter')($scope.order_type, {order_itype: order.order_type});
//                 }
//                 return typeselected.length ? typeselected[0].order_ntype : 'انتخاب نشده';
//             };
//
//
//
//             $scope.update = function () {
//
//                 var ordername = document.getElementById("ordername").innerText;
//                 var description = document.getElementById("description").innerText;
//                 var categoryid = document.getElementById("categoryid").innerText;
//                 $scope.cate.forEach(function (cat) {
//                     if (cat.category_name == categoryid)
//                         categoryid = cat.category_id;
//                     if (categoryid == 'انتخاب نشده')
//                         categoryid = 1;
//                 });
//                 var amount = document.getElementById("amount").innerText;
//                 if (amount=="رایگان")
//                     amount=0;
//                 var ordertype = document.getElementById("ordertype").innerText;
//                 $scope.order_type.forEach(function (ordert) {
//                     if (ordert.order_ntype == ordertype)
//                         ordertype = ordert.order_itype;
//                 });
//                 var locationid = document.getElementById("locationid").innerText;
//                 $scope.loca.forEach(function (locat) {
//                     if (locat.location_name == locationid)
//                         locationid = locat.location_id;
//                     if (locationid == 'انتخاب نشده')
//                         locationid = 1;
//                 });
//
//                 var updt = {
//                     ViewName: "XV_UpdateOrder",
//                     parameters: [
//
//                         {key: "%order_name", value: ordername},
//                         {key: "%Description", value: description},
//                         {key: "%category_id", value: categoryid + ''},
//                         {key: "%amount", value: amount + ''},
//                         {key: "%order_type", value: ordertype + ''},
//                         {key: "%location_id", value: locationid + ''},
//                         {key: "%order_id", value: order_id}
//
//
//                     ]
//                 };
//
//                 console.log(updt);
//                 $http.post(URL_INSERT, JSON.stringify(updt))
//                     .success(function (result, status, headers, config) {
//                         alert("آگهی با عنوان " + ordername + " و با شماره " + order_id + " با موفقیت ویرایش شد. ");
//                         document.location.replace("#/app/page/table1");
//                     }).error(function (result, status, header, config) {
//                     alert("ویرایش آگهی با عنوان " + ordername + " و با شماره " + order_id + " با خطا مواجه شد.\n لطفا در پر کردن فرم دقت کنید! ");
//                 });
//
//
//             }
//
//         }
//     }]);
