<?php

include_once("functions.php");
$api = 'e35ab013c8ce6000107067123a45893e';
include "../connect.php";
header('Content-Type: text/html; charset=UTF-8 ');



$amount = "0";
$token = $_POST["token"];

$query = "SELECT price FROM payment WHERE token like '$token' limit 1";
//echo $query;

$result1 = $connect->query($query);
if ($result1->rowCount() > 0 && $row = $result1->FETCH(PDO::FETCH_ASSOC)) {
    $amount = $row["price"]."0000";

}




$mobile = "09162298244";
$factorNumber = "$token";
//echo $factorNumber;
$description = "";




$redirect = "http://api.panaj.ir/facktor/verify123456987.php?factorNumber=$factorNumber";

$result = send($api,$amount , $redirect, $mobile, $factorNumber, $description);
$result = json_decode($result);
if($result->status) {
	$go = "https://pay.ir/pg/$result->token";
	header("Location: $go");
} else {
	echo $result->errorMessage;
}