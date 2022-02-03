<?php

/**
 * Created by PhpStorm.
 * User: Farzad
 * Date: 31/05/2019
 * Time: 07:45 PM
 */
$query3 = "";

include "../connect.php";
$connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$inputdata = json_decode(file_get_contents('php://input'), true);
//print_r($inputdata);
//echo  count($inputdata);
for ($i = 0; $i < count($inputdata); $i++) {
    $query2 = "";

    $ViewName = $inputdata[$i]["ViewName"];
//    echo $ViewName . "\n";

    $query = "SELECT quarry FROM quarrybank WHERE name LIKE '$ViewName' limit 1";
//    echo $query;

    $result = $connect->query($query);
//$result->bindParam("QueryName", $inputdata["ViewName"]);
//
//$result->execute();
    $resultData = (object)array();
    $resultData->data = [];
    $resultData->error = "";
    $resultData->code = 503;

//echo  $result->rowCount();
    if ($result->rowCount() > 0 && $row = $result->FETCH(PDO::FETCH_ASSOC)) {
        try {
            $parameters = $inputdata[$i]["parameters"];
            $query2 = $row["quarry"];
//            echo $query2.'\n';
            for ($x = 0; $x < count($parameters); $x++) {
//                echo $parameters[$x]["key"].":". $parameters[$x]["value"]."\n";

                if ($parameters[$x]["value"]=='') {
                    $parameters[$x]["value"] = ' ';
//                                    echo $parameters[$x]["key"].":". $parameters[$x]["value"]."\n";
                }
                $query2 = str_replace($parameters[$x]["key"], $parameters[$x]["value"], $query2);
            }
            $query3 = $query3 . "\n" . $query2;
        } catch (Exception $e) {
            $resultData->error = $e->getMessage();
            $resultData->query = $query2;
            $resultData->code = 500;
        }
    } else {
        $resultData->error = "$ViewName invalid ";
        $resultData->code = 500;
    }

}
//echo $query3;
try {
    $resultData->code = 200;
                $resultData->query = $query3;

    $sth = $connect->prepare("$query3");
    $sth->execute();
} catch (Exception $e) {
    $resultData->error = $e->getMessage();
    $resultData->query = $query3;
    $resultData->code = 500;
}

http_response_code($resultData->code);
print json_encode($resultData);

?>