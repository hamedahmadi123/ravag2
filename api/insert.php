<?php
header("Access-Control-Allow-Origin: *");
/**
 * Created by PhpStorm.
 * User: Farzad
 * Date: 31/05/2019
 * Time: 07:45 PM
 */

include "connect.php";
$connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$inputdata = json_decode(file_get_contents('php://input'), true);

$ViewName = $inputdata["ViewName"];
$query = "SELECT quarry FROM quarrybank WHERE name LIKE '$ViewName' limit 1";
$result = $connect->query($query);
//$result->bindParam("QueryName", $inputdata["ViewName"]);
//
//$result->execute();
$resultData = (object)array();
$resultData->data = [];
$resultData->error = "";
$resultData->code = 503;
$query2 = "";
//echo  $result->rowCount();
if ($result->rowCount() > 0 && $row = $result->FETCH(PDO::FETCH_ASSOC)) {
    try {
        $resultData->code = 200;

        $parameters = $inputdata["parameters"];
        $query2 = $row["quarry"];
        for ($x = 0; $x < count($parameters); $x++) {
            if ($parameters[$x]["value"]=='') {
                $parameters[$x]["value"] = ' ';
            }
            $query2 = str_replace($parameters[$x]["key"], $parameters[$x]["value"], $query2);
        }
        $sth = $connect->prepare("$query2");
        $sth->execute();
                $resultData->query = $query2;

    } catch (PDOException $e) {
        $resultData->error = $e->getMessage();
        $resultData->query = $query2;
        $resultData->code = 500;
    }
} else {
    $resultData->error = "$ViewName invalid ";
    $resultData->code = 500;
}
http_response_code($resultData->code);
print json_encode($resultData);

?>