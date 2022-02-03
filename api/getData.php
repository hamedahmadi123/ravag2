<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

/**
 * Created by PhpStorm.
 * User: Farzad
 * Date: 31/05/2019
 * Time: 07:45 PM
 */




include "connect.php";
$connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$inputdata = json_decode(file_get_contents('php://input'), true);
$skip = 0;
$take = 100;
$ViewName = $inputdata["ViewName"];
$query = "SELECT quarry , with_quarries FROM quarrybank WHERE name LIKE '$ViewName' limit 1";
$result = $connect->query($query);
$Columns = '*';
$where = "";
$limit = "";
//$result->bindParam("QueryName", $inputdata["ViewName"]);
//
//$result->execute();
if (isset($inputdata["mutualTransaction"])) {
    $mutualTransaction = $inputdata["mutualTransaction"];
    if (isset($mutualTransaction["Columns"])) {
        if (count($mutualTransaction["Columns"]) > 0) {

            $Columns = implode(" , ", $mutualTransaction["Columns"]);
        }
    }
    if (isset($mutualTransaction["kendoDataRequest"])) {
        $kendoDataRequest = $mutualTransaction["kendoDataRequest"];
        $skip = "0";
        if (isset($kendoDataRequest["skip"]))
            $skip = $kendoDataRequest["skip"];
        $take = "20";
        if (isset($kendoDataRequest["take"]))
            $take = $kendoDataRequest["take"];
        $limit = "LIMIT  $skip , $take";

        if (isset($kendoDataRequest["filter"])) {
            $Operation = getfilter($kendoDataRequest["filter"]);
            if (!empty ($Operation))
                if ($Operation != "()")
                    $where = "WHERE $Operation";
        }
    }

}


function getfilter($filter)
{
    $Operation = getOperation($filter);
    if (isset($filter["filters"])) {
        $filters = $filter ["filters"];
        if (count($filters) > 0) {
            $OperationMain = '';
            $logic2 = '';
            foreach ($filters as $value) {
                $Operation3 = getfilter($value);
                if ($Operation3 === "()")
                    continue;
                $OperationMain .= " $logic2 $Operation3";
                if (isset($value["logic"]))
                    $logic2 = $value ["logic"];
                else
                    $logic2 = 'AND';
            }
            $logic = "";
            if (isset($filter["logic"]))
                $logic = $filter ["logic"];
            if (empty ($Operation))
                return "($OperationMain)";
            else
                return "($Operation $logic ($OperationMain))";

        } else {
            return "($Operation)";
        }

    }


    return "($Operation)";

}


function getOperation($filter)
{
    $field = "";
    if (isset($filter["field"]))
        $field = $filter ["field"];
    if (empty ($field))
        return "";
    $value = "";
    if (isset($filter["value"]))
        $value = $filter ["value"];
    $operator = "";
    if (isset($filter["operator"]))
        $operator = $filter ["operator"];


    switch ($operator) {
        case "eq":
            return $field . " = " . $value;
        case "neq":
            return $field . " <> " . $value;
        case "lt":
            return $field . " < " . $value;
        case "lte":
            return $field . " <= " . $value;
        case "gt":
            return $field . " > " . $value;
        case "gte":
            return $field . " >= " . $value;
        case "isnull":
            return $field . " is NULL";
        case "isnotnull":
            return $field . " is NOT NULL";
        case "LIKE":
            return $field . " LIKE '" . $value . "'";
        case "endswith":
            return $field . " LIKE '%" . $value . "'";
        case "startswith":
            return $field . " LIKE '" . $value . "'";
        case "contains":
            return $field . " LIKE '%" . $value . "%'";
        case "in":
            return $field . " in (" . $value . ")";
        case "ni":
            return $field . " NOT in (" . $value . ")";
        case "between":
            return $field . " BETWEEN " . $value;
    }

    return "";
}


$resultData = (object)array();
$resultData->data = [];
$resultData->error = "";
$resultData->code = 503;
$query2 = "";
//echo  $result->rowCount();
if ($result->rowCount() > 0 && $row = $result->FETCH(PDO::FETCH_ASSOC)) {
    try {
        $resultData->code = 200;
        if (isset($inputdata["parameters"]))
            $parameters = $inputdata["parameters"];
        else
            $parameters = array();

        $query2 = $row["quarry"];
        for ($x = 0; $x < count($parameters); $x++) {
            $query2 = str_replace($parameters[$x]["key"], $parameters[$x]["value"], $query2);
        }


        $query2 = "SELECT $Columns FROM ($query2) dd $where $limit   ";

        $sth = $connect->query("$query2");
        $resultData->data = $sth->fetchAll();
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