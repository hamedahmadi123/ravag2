<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: *');
require "utils.php";

$resultData = (object)array();

$resultData->data = "";
$resultData->error = "";
$resultData->code = 200;
$nameimage="";

// Check if image file is a actual image or fake image
if (isset($_FILES["uploadFile1"])) {
    $target_dir = "/home/ravaghesf/public_html/image/";
    $imageFileType = strtolower(pathinfo(basename($_FILES["uploadFile1"]["name"]), PATHINFO_EXTENSION));
    $nameimage = GUID() . '.' . $imageFileType;
    $target_file = $target_dir .$nameimage;
    $uploadOk = 1;


// Check if file already exists
    if (file_exists($target_file)) {
        $resultData->error = "Sorry, file already exists.";
        $resultData->code = 501;
    }
// Check file size
    if ($_FILES["uploadFile1"]["size"] > 43097152 ) {
        $resultData->error = "Sorry, your file is too large.";
        $resultData->code = 502;
    }
// Allow certain file formats
//if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
//    && $imageFileType != "gif" ) {
//    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
//    $uploadOk = 0;
//}
// Check if $uploadOk is set to 0 by an error
    if ($resultData->code == 200) {
        if (move_uploaded_file($_FILES["uploadFile1"]["tmp_name"], $target_file)) {
            $resultData->data = "https://ravaaghesf.ir/image/".$nameimage;
            $resultData->code = 200;
        } else {
            $resultData->code = 500;
            $resultData->error = "Sorry, there was an error uploading your file.";
        }
    }
}else{
    $resultData->data = "";
    $resultData->error = "not set uploadFile1";
    $resultData->code = 503;
}
http_response_code($resultData->code);
print json_encode($resultData);
?>
