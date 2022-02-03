<?php
header("Access-Control-Allow-Origin: *");

header('Content-Type: application/json');
$server="localhost";
$user="ravaghesf_amoozesh";
$pass="N^xrmmG(8!Yl";
$dbname="ravaghesf_amoozesh";
$dsn="mysql:host=$server;dbname=$dbname;port=3307";
try {
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];

    $connect=new PDO($dsn,$user,$pass,$options);
    $connect->exec("SET CHARACTER SET utf8");
    $connect->exec("set names utf8");


}
catch(PDOException $error){
    echo "can not connect to DB because : ".$error->getmessage();
}


?>
