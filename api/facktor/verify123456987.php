<?php


include "../connect.php";
header('Content-Type: text/html; charset=UTF-8 ');
include_once("functions.php");
$api = 'e35ab013c8ce6000107067123a45893e';
$token = $_GET['token'];
$_factorNumber = $_GET['factorNumber'];
//print_r($_GET);
$result = json_decode(verify($api, $token));
/*$result:{
  "status" : 1,
  "amount" : مبلغ تراکنش,
  "transId" : شماره تراکنش,
  "factorNumber" : شماره فاکتور,
  "mobile" : شماره موبایل,
  "description" : توضیحات,
  "cardNumber" : شماره کارت,
  "message" : OK,
}*/
if (isset($result->status)) {
    if ($result->status == 1) {
//print_r($result);
        $status = $result->{'status'};
        $amount = $result->{'amount'};
        $transId = $result->{'transId'};
        $factorNumber = $result->{'factorNumber'};
        $mobile = $result->{'mobile'};
        $description = $result->{'description'};
        $cardNumber = $result->{'cardNumber'};
        $message = $result->{'message'};
        $Success = "<div class=\"item-page\" itemscope=\"\" itemtype=\"https://schema.org/Article\">
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
        $query = "SELECT status FROM payment_status WHERE factornumber like '$factorNumber' limit 1";
//echo $query;

        $result1 = $connect->query($query);
        if ($result1->rowCount() == 0) {
            $query2 = "INSERT INTO payment_status
 (status, amount, transid, factornumber, mobile,description, cardnumber, message)
  VALUE ($status,$amount,$transId,'$factorNumber','$mobile' ,'$description ','$cardNumber','$message')";
//        echo $query2;

            $sth = $connect->prepare("$query2");
            $sth->execute();


            $query2 = "UPDATE company
SET PaymentStatus =1 , 
factorNumber = '$factorNumber'
WHERE CompanyId =( SELECT company_id FROM payment WHERE token LIKE \"%$factorNumber%\")";
//        echo $query2;

            $sth = $connect->prepare("$query2");
            $sth->execute();
        }


//        $count = $sth->rowCount();


        echo $Success;
    } else {
//        print_r($result);
        $status = $result->{'status'};
        $errorCode = $result->{'errorCode'};
        $errorMessage = $result->{'errorMessage'};
        $query = "SELECT status FROM payment_status WHERE factornumber like '$_factorNumber' limit 1";
//echo $query;

        $result1 = $connect->query($query);
        if ($result1->rowCount() == 0) {
            $query2 = "INSERT INTO payment_status
 (status,errorCode,errorMessage ,factornumber )
  VALUE ($status,$errorCode,'$errorMessage','$_factorNumber')";
//        echo $query2;
            $sth = $connect->prepare("$query2");
            $sth->execute();
        }

        $Failed = "<div class=\"item-page\" itemscope=\"\" itemtype=\"https://schema.org/Article\">
	<meta itemprop=\"inLanguage\" content=\"fa-IR\">
		<div class=\"page-header\">
		<h1 style='text-align: center; align-content: center'> پرداخت انجام نشد! </h1>
	</div>
	

						<div itemprop=\"articleBody\">
		<p dir=\"rtl\" style=\"text-align: center;\">&nbsp;</p>
<p dir=\"rtl\" style=\"text-align: center;\"><span style=\"font-size: 14pt;\"><img src=\"https://pngimage.net/wp-content/uploads/2018/05/errore-png-4.png\" alt=\"\" width=\"150\"></span></p>
<p dir=\"rtl\" style=\"text-align: center;\"><span style=\"font-size: 14pt;\">پرداخت انجام نشد !</span></p>
<p dir=\"rtl\" style=\"text-align: center;\"><span style=\"font-size: 12pt;\">$errorMessage</span></p>
<p dir=\"rtl\" style=\"text-align: center;\"><span style=\"font-size: 12pt;\">شماره کد  $errorCode</span></p>
<p dir=\"rtl\" style=\"text-align: center;\">&nbsp;</p>
<p dir=\"rtl\">&nbsp;</p>
<!-- START: Articles Anywhere --><p dir=\"rtl\">&nbsp;</p>


<!-- END: Articles Anywhere -->
<p dir=\"rtl\">&nbsp;</p> 	</div>	
									</div>";


        echo $Failed;
    }
} else {
    if ($_GET['status'] == 0) {
        echo "خطا111";
    }
}

