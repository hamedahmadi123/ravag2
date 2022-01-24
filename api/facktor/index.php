<!doctype html>

<?php


$timezone = 0;//برای 3:30 عدد 12600 و برای 4:30 عدد 16200 را تنظیم کنید
$day1 = date("Y-m-d H:i:s", time() + $timezone);
$now = date("Y-m-d", time() + $timezone);
$time = date("H:i:s", time() + $timezone);
list($year, $month, $day) = explode('-', $now);
list($hour, $minute, $second) = explode(':', $time);
$timestamp = mktime($hour, $minute, $second, $month, $day, $year);
include('jdf.php');
include('../utils.php');
$datttt = jdate("H:i:s Y/m/d", $timestamp);
$guid = GUID();
//$jalali_date = jdate("زمان: H:i:s - تاریخ: Y/m/d", $timestamp);
//echo $jalali_date;


/**
 * Created by PhpStorm.
 * User: Farzad
 * Date: 31/05/2019
 * Time: 07:45 PM
 */
$Name = "آریا کارت";
$CompanyId = 0;
$factorNumber = 0;
$Logo = "pic/web-icon-5.jpg";
$Email = "z.hamed.a@gmail.com";
$Tel = "09162298244";
$Mobile = "09162298244";
$Description = "بهترین اپلیکیشن دنیای تبلیغات";
$Slogan = "هوشمندانه انتخاب کنید";
$Website = "https://panaj.ir";
$InstagramLink = "https://www.instagram.com/p/BhJTPNBlgeu/";
$TelegramLink = "https://telegram.me/sssssssssasa";
$id = 3;
if (isset($_GET["id"])) {
    $id = $_GET["id"];
}
include "../connect.php";
header('Content-Type: text/html; charset=UTF-8 ');
$query = "SELECT factorNumber, Logo, company.Name, company.Tel 
,company.Mobile ,Description ,Slogan ,company.CompanyId
,Website,InstagramLink,TelegramLink,Email
FROM company
WHERE company.user_id = $id  limit 1";
$result = $connect->query($query);

if ($result->rowCount() > 0 && $row = $result->FETCH(PDO::FETCH_ASSOC)) {
    $Name = $row["Name"];
    $CompanyId = $row["CompanyId"];
    $factorNumber = $row["factorNumber"];
    $Tel = $row["Tel"];
    $Mobile = $row["Mobile"];
    $Description = $row["Description"];
    $Slogan = $row["Slogan"];
    $Website = $row["Website"];
    $InstagramLink = $row["InstagramLink"];
    $TelegramLink = $row["TelegramLink"];
    $Email = $row["Email"];
}
if ($factorNumber != "" && $factorNumber != "NULL") {
    $query = "select amount ,  transid from payment_status where factornumber = '$factorNumber'  limit 1";
    $result = $connect->query($query);
    $amount = 0;
    $transId = 0;
    if ($result->rowCount() > 0 && $row = $result->FETCH(PDO::FETCH_ASSOC)) {
        $amount = $row["amount"];
        $transId = $row["transid"];
    }

    echo "<div class=\"item-page\" itemscope=\"\" itemtype=\"https://schema.org/Article\">
	<meta itemprop=\"inLanguage\" content=\"fa-IR\">
		<div class=\"page-header\">
		<h1 style='text-align: center; align-content: center'> پرداخت آنلاین با موفقیت انجام شد! </h1>
	</div>
							<div itemprop=\"articleBody\">
		<p dir=\"rtl\" style=\"text-align: center;\">&nbsp;</p>
<p dir=\"rtl\" style=\"text-align: center;\"><span style=\"font-size: 14pt;\"><img src=\"http://www.turandesign.com/images/success-icon.png\" alt=\"\" width=\"150\"></span></p>
<p dir=\"rtl\" style=\"text-align: center;\"><span style=\"font-size: 14pt;\">مبلغ $amount ریال با موفقیت به حساب ما پرداخت شد!</span></p>
<p dir=\"rtl\" style=\"text-align: center;\"><span style=\"font-size: 12pt;\">از پرداخت شما سپاسگذاریم.</span></p>
<p dir=\"rtl\" style=\"text-align: center;\"><span style=\"font-size: 12pt;\">شماره تراکنش $transId</span></p>
<p dir=\"rtl\" style=\"text-align: center;\">&nbsp;</p>
<p dir=\"rtl\">&nbsp;</p>
<!-- START: Articles Anywhere --><p dir=\"rtl\">&nbsp;</p>

<!-- END: Articles Anywhere -->
<p dir=\"rtl\">&nbsp;</p> 	</div>
									</div>";
    return;

} else {


    $query2 = "INSERT into payment (token,  company_id, price) VALUE ('$guid',$CompanyId,$price)";
    $sth = $connect->prepare("$query2");
    $sth->execute();


    echo "<html>
<head>
    <meta charset=\"utf-8\">
    <title>فاکتور فروش</title>

    <style>
        .button {
            display: inline-block;
            font-size: 18px;
            background-color: #00cc67;
            border: none;
            width: 25%;
            height: auto;
            margin: 10px;
            padding: 10px;
            border-radius: 10px;
            color: white;
            text-align: center;
            transition: all 0.5s;
            cursor: pointer;
        }

        .button span {
            cursor: pointer;
            display: inline-block;
            position: relative;
            transition: 0.5s;
        }

        .button span:after {
            content: '\00bb';
            position: absolute;
            opacity: 0;
            top: 0;
            right: -20px;
            transition: 0.5s;
        }

        .button:hover span {
            padding-right: 25px;
        }

        .button:hover span:after {
            opacity: 1;
            right: 0;
        }

        .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            color: #555;
        }

        .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
        }

        .invoice-box table td {
            padding: 5px;
            vertical-align: top;
        }

        .invoice-box table tr td:nth-child(2) {
            text-align: right;
        }

        .invoice-box table tr.top table td {
            padding-bottom: 20px;
        }

        .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
        }

        .invoice-box table tr.information table td {
            padding-bottom: 40px;
        }

        .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
        }

        .invoice-box table tr.details td {
            padding-bottom: 20px;
        }

        .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
        }

        .invoice-box table tr.item.last td {
            border-bottom: none;
        }

        .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
        }

        @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
            }

            .invoice-box table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
            }
        }

        /** RTL **/
        .rtl {
            direction: rtl;
            font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        }

        .rtl table {
            text-align: right;
        }

        .rtl table tr td:nth-child(2) {
            text-align: left;
        }
    </style>
</head>

<body style=\"background-color: #f0f3f4\">
<br><br>
<div class=\"invoice-box\" style=\"background-color: #ffffff\">

    <table cellpadding=\"0\" cellspacing=\"0\">
        <tr class=\"top\">
            <td colspan=\"2\">
                <table>
                    <tr>
                        <td class=\"title\">
                            <img src=\"img/icon2.png\" style=\"width:40%; max-width:300px;\">
                        </td>

                        <td>
                        کد فاکتور
                        <br>
              $guid<br>
             تاریخ ثبت : $datttt<br>

                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr class=\"information\">
            <td colspan=\"2\">
                <table>
                    <tr>
                        <td>
                            panaj.ir <br>
                            آریا کارت <br>
                        </td>

                        <td>
                             $Name<br>
                             $Email
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

<!--        <tr class=\"heading\">-->
<!--            <td>-->
<!--                روش پرداخت-->
<!--            </td>-->
<!---->
<!--            <td>-->
<!--                بررسی #-->
<!--            </td>-->
<!--        </tr>-->
<!---->
<!--        <tr class=\"details\">-->
<!--            <td>-->
<!--                بررسی-->
<!--            </td>-->
<!---->
<!--            <td>-->
<!--                1000-->
<!--            </td>-->
<!--        </tr>-->

        <tr class=\"heading\">
            <td>
                مورد
            </td>

            <td>
                قیمت
            </td>
        </tr>

<!--        <tr class=\"item\">-->
<!--            <td>-->
<!--                طراحی وب سایت-->
<!--            </td>-->
<!---->
<!--            <td>-->
<!--                3,000,000 تومان-->
<!--            </td>-->
<!--        </tr>-->
<!---->
<!--        <tr class=\"item\">-->
<!--            <td>-->
<!--                خرید هاست 3 ماهه-->
<!--            </td>-->
<!---->
<!--            <td>-->
<!--                250,000 هزار تومان-->
<!--            </td>-->
<!--        </tr>-->

        <tr class=\"item last\">
            <td>
               آریا کارت
            </td>

            <td>
                 $price.000 تومان
            </td>
        </tr>

        <tr class=\"total\">
            <td></td>

            <td>
                جمع کل :                 $price.000 تومان

            </td>
        </tr>
    </table>
    <br>
    <form method=\"post\" action=\"send.php\">
        <input type=\"hidden\" name=\"token\" value=\"$guid\">
    <button class=\"button\" type=\"submit\" style=\"vertical-align:middle\"><span>پرداخت  </span></button>
    </form>
</div>
</body>
</html>";
}
?>


