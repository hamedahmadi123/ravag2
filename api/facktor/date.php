<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>وبگو | تبدیل تاریخ میلادی به شمسی</title>
    <!-- http://webgoo.ir -->
    <style type="text/css">
        body{
            font-family:Tahoma, Geneva, sans-serif;
            font-size:12px;
        }
    </style>
</head>
<body>
<?php
$timezone = 0;//برای 3:30 عدد 12600 و برای 4:30 عدد 16200 را تنظیم کنید
$now = date("Y-m-d", time()+$timezone);
$time = date("H:i:s", time()+$timezone);
list($year, $month, $day) = explode('-', $now);
list($hour, $minute, $second) = explode(':', $time);
$timestamp = mktime($hour, $minute, $second, $month, $day, $year);
include ('jdf.php');
$jalali_date = jdate("زمان: H:i:s - تاریخ: Y/m/d",$timestamp);
echo $jalali_date;
?>
<hr />
خروجی به صورت تاریخ و زمان نشان داده می شود
</body>
</html>
توضیح: