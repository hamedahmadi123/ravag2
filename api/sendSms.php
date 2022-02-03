<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: *');
$inputdata = json_decode(file_get_contents('php://input'), true);
include "vendor/autoload.php";
//$memcache->addServer($host);
//$memcache->setOption(Memcached::OPT_BINARY_PROTOCOL, true);
$token = rand(1000, 9999);
$Number = $inputdata["key"];
$filesystemAdapter = new \League\Flysystem\Adapter\Local(__DIR__ . '/');
$filesystem = new \League\Flysystem\Filesystem($filesystemAdapter);
//echo $token;


$url = "https://api.kavenegar.com/v1/7748676C734C38732B515856496A4569346D447635584435326B576B52374A6C/verify/lookup.json?receptor=$Number&token=$token&template=ariyakart";
$contents = CallAPI("", $url);
if ($contents) {
    $pool = new \Cache\Adapter\Filesystem\FilesystemCachePool($filesystem);
    $item = $pool->getItem($Number);
    $item->set($token);
    $pool->save($item);
    $manage = json_decode($contents);
    $resultData = (object)array();
    $resultData->data = $manage->{'return'};
    $resultData->error = $resultData->data->message;
    $resultData->code = $resultData->data->status;
    http_response_code($resultData->code);

    print json_encode($resultData, JSON_UNESCAPED_UNICODE);

}
function CallAPI($method, $url, $data = false)
{
    $curl = curl_init();

    switch ($method) {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);

            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_PUT, 1);
            break;
        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    // Optional Authentication:
//    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
//    curl_setopt($curl, CURLOPT_USERPWD, "username:password");
//    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
//    echo $result;

    curl_close($curl);
//    echo "gggg";
    return $result;
}

















