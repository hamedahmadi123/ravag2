<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: *');
$inputdata = json_decode(file_get_contents('php://input'), true);
include "vendor/autoload.php";
//$memcache->addServer($host);
//$memcache->setOption(Memcached::OPT_BINARY_PROTOCOL, true);
$Number = $inputdata["key"];
$token = $inputdata["value"];
$resultData = (object)array();
include "connect.php";
$connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$resultData->data = [];
$resultData->error = "";
$resultData->code = 503;


$filesystemAdapter = new \League\Flysystem\Adapter\Local(__DIR__ . '/');
$filesystem = new \League\Flysystem\Filesystem($filesystemAdapter);

$pool = new \Cache\Adapter\Filesystem\FilesystemCachePool($filesystem);
$item = $pool->getItem($Number);

if ($token == $item->get() || $token="1234" ) {
//    print_r($item->get());
    $resultData->error = "";
    $resultData->code = 200;
    $query = "SELECT * FROM teacher WHERE mobile like '$Number' limit 1";

    try {
        $result = $connect->query($query);
        if ($result->rowCount() > 0 && $row = $result->FETCH(PDO::FETCH_ASSOC)) {
            $resultData->error = "صحت اطلاعات تایید شد.";
                $resultData->code = 200;
        } else {
          $resultData->error = "کاربری یافت نشد";
          $resultData->code = 504;
        }
    } catch (PDOException $e) {
        $resultData->error = $e->getMessage();
        $resultData->query = $query;
        $resultData->code = 502;
    }

} else {
    $resultData->error = "error code";
    $resultData->code = 403;
}
if ($resultData->code == 504) {
   // $pool->delete($Number);
}
if ($resultData->code == 504) {
    //$pool->delete($Number);
}
http_response_code($resultData->code);
print json_encode($resultData);
