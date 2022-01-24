"use strict";
/* global document */
jQuery(document).ready(function () {
    /***
     Adding Google Map.
     ***/

    /* Calling goMap() function, initializing map and adding markers. */
    jQuery('#road_map.directory-map').goMap({
        maptype: 'ROADMAP',
        latitude: 31.4234953,
        longitude: 72.9492142,
        zoom: 14,
        scaleControl: true,
        scrollwheel: false,
//        group: 'category',
        markers: [
//            Markers for Doctor Search
            {latitude: 31.4478493, longitude: 73.145233, icon: 'images/map/5.ico', html: {
                    content: '<h5>Faisalabad Serena Hotel.</h5>Enjoy world class hospitality at arguably <br/> the best hotel in Faisalabad <br /><a href="https://maps.app.goo.gl/?link=https://goo.gl/maps/7gW9L9EWxWq?utm_source%3Dapp-invite%26mt%3D8%26pt%3D9008%26utm_medium%3DSIMPLE%26utm_campaign%3Ds2e-ai%26ct%3Ds2e-ai&apn=com.google.android.apps.maps&amv=703000000&isi=585027354&ibi=com.google.Maps&ius=comgooglemapsurl&utm_source=app-invite&mt=8&pt=9008&utm_medium=SIMPLE&utm_campaign=s2e-ai&ct=s2e-ai&invitation_id=493454522602-d56223ac-bc1a-4d99-b691-967c0f3e687e" target="_blank">Get Directions</a>'
                }},   
           
            
        ]

    });
    

    /* Calling goMap() function, initializing map and adding markers. */
    jQuery('#road_map').goMap({
        maptype: 'ROADMAP',
        latitude: 51.450711,
        longitude: 0.2760004,
        zoom: 13,
        scaleControl: true,
        scrollwheel: false,
//        group: 'category',
        markers: [
//            Markers for Doctor Search
            {latitude: 51.5131094, longitude: -0.176425, icon: 'images/map/1.png', html: {
                    content: '<h5>ThemeRegion Ads Portal.</h5>Lorem ipsum dolor sit amet,<br/> consectetur adipisicing elit sed <br /><a href="#">Visit Store</a>'
                }},
            {latitude: 51.511218, longitude: -0.147124, icon: 'images/map/2.png', html: {
                     content: '<h5>ThemeRegion Ads Portal.</h5>Lorem ipsum dolor sit amet,<br/> consectetur adipisicing elit sed <br /><a href="#">Visit Store</a>'
                }},
            {latitude: 51.515918, longitude: -0.219050, icon: 'images/map/3.png', html: {
                     content: '<h5>ThemeRegion Ads Portal.</h5>Lorem ipsum dolor sit amet,<br/> consectetur adipisicing elit sed <br /><a href="#">Visit Store</a>'
                }},
            {latitude: 51.4941563, longitude: -0.1710176, icon: 'images/map/4.png', html: {
                     content: '<h5>ThemeRegion Ads Portal.</h5>Lorem ipsum dolor sit amet,<br/> consectetur adipisicing elit sed <br /><a href="#">Visit Store</a>'
                }},
            {latitude: 51.5238585, longitude: -0.0950225, icon: 'images/map/5.png', html: {
                     content: '<h5>ThemeRegion Ads Portal.</h5>Lorem ipsum dolor sit amet,<br/> consectetur adipisicing elit sed <br /><a href="#">Visit Store</a>'
                }},
            {latitude: 51.4965787, longitude: -0.1169972, icon: 'images/map/6.png', html: {
                     content: '<h5>ThemeRegion Ads Portal.</h5>Lorem ipsum dolor sit amet,<br/> consectetur adipisicing elit sed <br /><a href="#">Visit Store</a>'
                }},
			{latitude: 51.5096738, longitude: -0.2753873, icon: 'images/map/6.png', html: {
                     content: '<h5>ThemeRegion Ads Portal.</h5>Lorem ipsum dolor sit amet,<br/> consectetur adipisicing elit sed <br /><a href="#">Visit Store</a>'
                }},
            {latitude: 51.4965787, longitude: -0.199223, icon: 'images/map/7.png', html: {
                     content: '<h5>ThemeRegion Ads Portal.</h5>Lorem ipsum dolor sit amet,<br/> consectetur adipisicing elit sed <br /><a href="#">Visit Store</a>'
                }},
            {latitude: 51.4925041, longitude: -0.2363018, icon: 'images/map/8.png', html: {
                     content: '<h5>ThemeRegion Ads Portal.</h5>Lorem ipsum dolor sit amet,<br/> consectetur adipisicing elit sed <br /><a href="#">Visit Store</a>'
                }},
            {latitude: 51.5202758, longitude: -0.118047, icon: 'images/map/1.png', html: {
                 content: '<h5>ThemeRegion Ads Portal.</h5>Lorem ipsum dolor sit amet,<br/> consectetur adipisicing elit sed <br /><a href="#">Visit Store</a>'
            }},
			{latitude: 51.5249492, longitude: -0.2450565, icon: 'images/map/1.png', html: {
                 content: '<h5>ThemeRegion Ads Portal.</h5>Lorem ipsum dolor sit amet,<br/> consectetur adipisicing elit sed <br /><a href="#">Visit Store</a>'
            }},
			{latitude: 51.532054, longitude: -0.1639875, icon: 'images/map/8.png', html: {
                 content: '<h5>ThemeRegion Ads Portal.</h5>Lorem ipsum dolor sit amet,<br/> consectetur adipisicing elit sed <br /><a href="#">Visit Store</a>'
            }},
			{latitude: 51.5082309, longitude: -0.076872, icon: 'images/map/3.png', html: {
                 content: '<h5>ThemeRegion Ads Portal.</h5>Lorem ipsum dolor sit amet,<br/> consectetur adipisicing elit sed <br /><a href="#">Visit Store</a>'
            }},
            
        ]

    });
    
   
   
});


 // -------------------------------------------------------------
    //   Google Map 
    // -------------------------------------------------------------  

    (function(){

        var map;

        map = new GMaps({
            el: '#gmap',
            lat: 48.8612228,
            lng: 2.313042,
            scrollwheel:false,
            zoom: 6,
            zoomControl : true,
            panControl : true,
            streetViewControl : true,
            mapTypeControl: false,
            overviewMapControl: true,
            clickable: false
        });

        var image = '';
        map.addMarker({
            lat: 48.8612228,
            lng: 2.313042,
            icon: image,
            animation: google.maps.Animation.DROP,
            verticalAlign: 'bottom',
            horizontalAlign: 'center',
            backgroundColor: '#d3cfcf',
        });


        var styles = [ 

        {
            "featureType": "road",
            "stylers": [
            { "color": "#969696" }
            ]
        },{
            "featureType": "water",
            "stylers": [
            { "color": "#cecece" }
            ]
        },{
            "featureType": "landscape",
            "stylers": [
            { "color": "#efefef" }
            ]
        },{
            "elementType": "labels.text.fill",
            "stylers": [
            { "color": "#555555" }
            ]
        },{
            "featureType": "poi",
            "stylers": [
            { "color": "#cfcfcf" }
            ]
        },{
            "elementType": "labels.text",
            "stylers": [
            { "saturation": 1 },
            { "weight": 0.1 },
            { "color": "#848484" }
            ]
        }

        ];

        map.addStyle({
            styledMapName:"Styled Map",
            styles: styles,
            mapTypeId: "map_style"  
        });

        map.setStyle("map_style");
    }()); 