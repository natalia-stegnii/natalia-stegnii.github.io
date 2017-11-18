<?php 

	require_once $_SERVER["DOCUMENT_ROOT"]."/wp-load.php";
	if(!isset($_SERVER['HTTP_REFERER'])) { echo "error"; die();	}
	if(strpos($_SERVER['HTTP_REFERER'], $_SERVER['HTTP_HOST']) !== false) {} else { echo "error"; die(); }
	function PostData($field, $caption, $type=null) {
		if(isset($_POST[$field]) && $_POST[$field]!="") {
			$field_data = substr(htmlspecialchars(trim($_POST[$field])), 0, 1000); 
			$field_data_bl = '<div style="padding: 5px 0px 0px 0px; margin: 0px 0px 0px 0px; font-size: 14px; font-weight: 700;">'.$caption.': <span style="font-style: italic; font-weight: 400;">'.$field_data.'</span></div>';
		} else {
			$field_data = '';
			$field_data_bl = '';
		}
		if($type==null) {
			return $field_data_bl;
		} else {
			return $field_data;
		}
	}
	
	$to = get_theme_option('email_send');
	require_once('PHPMailerAutoload.php');
	$mail = new PHPMailer;
	$mail->ClearAddresses();
	$mail->addAddress($to);
	$mail->Subject = 'Заявка «ESS»';
	$mail->IsHTML(true);
	$mail->CharSet = "UTF-8";
	$mail->msgHTML('
		<div style="padding: 0px 0px 0px 0px; margin: 0px 0px 0px 0px; font-weight: bold; font-size: 17px;">'.PostData("form-title", "Форма", "auto").'</div>
		'.PostData("name", "Имя").'
		'.PostData("phone", "Телефон").'
		'.PostData("email", "E-mail").'
		'.PostData("question", "Вопрос").'
		'.PostData("master-name", "Мастер").'
		'.PostData("eskiz-name", "Бесплатный эскиз").'
	');
	if(!$mail->send()) {
		echo "error"; die();
	} else {
		echo "ok"; die();
	}
	
?>