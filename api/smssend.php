<?php

header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: *');

$data=file_get_contents('php://input');
 //echo $data;
$inputdata = json_decode($data, true);
// print_r($inputdata);
$phones = $inputdata["phones"];
$sms = $inputdata["sms"];
// print_r($sms);
$url = "https://api.kavenegar.com/v1/7748676C734C38732B515856496A4569346D447635584435326B576B52374A6C/sms/send.json";

//$urlencode = rawurlencode($sms);
// print_r($phones);
$obj = (object)array('receptor' => $phones, 'message' => $sms);

$contents = CallAPI("POST", $url, $obj);

print_r($contents["return"]);
function callAPI($method, $url, $data){
   $curl = curl_init();
   switch ($method){
      case "POST":
         curl_setopt($curl, CURLOPT_POST, 1);
         if ($data)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
         break;
      case "PUT":
         curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
         if ($data)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);			 					
         break;
      default:
         if ($data)
            $url = sprintf("%s?%s", $url, http_build_query($data));
   }
   // OPTIONS:
   curl_setopt($curl, CURLOPT_URL, $url);
   $result = curl_exec($curl);
   if(!$result){die("Connection Failure");}
   curl_close($curl);
   return $result;
}

















