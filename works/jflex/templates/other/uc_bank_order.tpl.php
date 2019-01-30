<style type="text/css" media="print">
    input { display: none }
</style>

<style type="text/css">
    H1 {font-size: 12pt;}
    p, ul, ol, h1 {margin-top:6px; margin-bottom:6px}
    td {font-size: 9pt;}
    small {font-size: 7pt;}
    body {font-size: 10pt;}
.buttons {text-align:center!important;}
.buttons input {font-weight:bold; font-size:18px;}

body {font-family: Arial, Tahoma, Verdana, Helvetica; font-size:12px;}
.ht1, .ht1 td {border: 1px solid black; border-collapse:collapse; padding: 2px;}
.ht2, .ht2 td { padding: 2px; border-width: 0; text-align: left }
.ht3 {border: 2px solid black; border-collapse:collapse; padding: 2px;}
.ht3 td {border: 1px solid black; border-collapse:collapse; padding: 2px;}
.ht4 {border: 0px solid black; border-collapse:collapse; padding: 2px;}
.ht4 td {border: 0px solid black; border-collapse:collapse; padding: 2px;}
sup { vertical-align: super; font-size: smaller;}
.desc {text-align:center; font-size:10px; color:#777;}
</style>
<table style="width: 750px; margin:0 auto;" class="ht4">
  <tr>
    <td style="padding-right:20px; width:250px"><b style="font-size:16px; white-space:nowrap;"><?php print variable_get('uc_store_phone', ''); ?></b><br/><a href="mailto:<?php print variable_get('uc_store_email', ''); ?>"><?php print variable_get('uc_store_email', ''); ?></td>
    <td style="height:50px;"><div style="background:url('<?php print $logo_path; ?>') no-repeat center transparent; background-size: contain; width:100%; height:100%;); border-width: 0;"></div></td>
    <td style="width:250px; padding-left:20px;"></td>
  </tr>
</table>
<div style="width: 750px; margin:30px auto 0; padding: 0;">
</br></br>
<p style="text-align: center; font-size: 10px"><b>ВНИМАНИЕ!</b> Оплата данного счета производится Заказчиком. Оплата третьими лицами не допускается!</p>

<table class="ht1" cellspacing="0" cellpadding="0" width="100%">
<tr>
    <td width="25%"><b>ИНН:</b> <?=variable_get('uc_bank_tin')?></td>
    <td width="25%"><b>КПП:</b> <?=variable_get('uc_bank_kpp')?></td>
    <td width="50%" valign="bottom" rowspan="2"><b>к/сч №:</b> <?=variable_get('uc_bank_correspondent_account')?></td>
</tr>
<tr>
    <td width="50%" valign="top" colspan="2"><b>Получатель:</b> <nowrap><?=variable_get('uc_bank_the_name_of_the_payee')?></nowrap></td>
</tr>
<tr>
    <td width="50%" valign="top" colspan="2" rowspan="2"><b>Банк получателя:</b><br /><?=variable_get('uc_bank_bank')?></td>
    <td width="50%" valign="top"><b>БИК:</b> <nowrap><?=variable_get('uc_bank_bic')?></nowrap></td>
</tr>
<tr>
    <td width="50%" valign="bottom"><b>р/сч №:</b> <?=variable_get('uc_bank_current_account')?></td>
</tr>
<tr>
  <td colspan="3"><b>Назначение платежа:</b><div style="font-size: 19px; font-weight: bold;">Оплата по счету № <?=$order->order_id?> от <?=variable_get('uc_bank_date_current') ? date('d.m.Y') : date('d.m.Y', $order->created)?> за интернет-услуги. Без НДС.</div></td>
</tr>
</table>
</br>
</br>
<!--<p style="text-align: left; font-size: 19px; font-weight: bold; border-bottom: 2px solid black; padding: 5px 0">Счет на оплату № <?=$order->order_id?> от <?=variable_get('uc_bank_date_current') ? date('d.m.Y') : date('d.m.Y', $order->created)?></p>-->

<table class="ht2" cellspacing="0" cellpadding="0" width="100%">
<tr>
    <td width="15%" valign="top">Поставщик:</td>
    <td width="85%" valign="top"><?=variable_get('uc_bank_the_name_of_the_payee')?>, ИНН <?=variable_get('uc_bank_tin')?>, КПП <?=variable_get('uc_bank_kpp')?>, <?=variable_get('uc_bank_address')?></td>
</tr>
<!--<tr>
    <td width="15%" valign="top">Покупатель:</td>
    <td width="85%" valign="top"><b><?=variable_get('uc_sbrf_payer_info', 0) ? "$order->billing_first_name $order->billing_last_name $order->billing_company, $order->billing_city $order->billing_street1 $order->billing_street2" : ''?></b></td>
</tr>-->
  <?php if (isset($profile)): ?>
    <tr>
      <td style="vertical-align:top;">Заказчик:</td>
      <td class="corpdetails">
        <?php
  //      if (isset($profile)) {
          if ($profile['field_corp_name']) print $profile['field_corp_name'] .  ', ';
          if ($profile['field_corp_zip']) print $profile['field_corp_zip'] .  ', ';
          if ($profile['field_corp_area'] || $profile['field_corp_city']) print $profile['field_corp_area'] . ' ' . $profile['field_corp_city'] .  ', ';
          if ($profile['field_corp_street'] || $profile['field_corp_directlocation']) print $profile['field_corp_street'] . ' ' . $profile['field_corp_directlocation'] .  ', ';
          if ($profile['field_corp_inn']) print $profile['field_corp_inn'] .  ', ';
          if ($profile['field_corp_kpp']) print $profile['field_corp_kpp'] .  ', ';
          if ($profile['field_corp_pacc']) print $profile['field_corp_pacc'] .  ', ';
          if ($profile['field_corp_bankbik']) print $profile['field_corp_bankbik'] .  ', ';
          if ($profile['field_copr_koracc']) print $profile['field_copr_koracc'];
  //      }
  //      else {
  //        $link = l('ссылке', 'profile-' . FLEXPROD_PROFILE2_USERCORPDATA_TYPE . '/'  . $order->uid . '/edit');
  //        print "Реквизиты не заполнены. Пройдите по этой $link для заполнения реквизитов.";
  //      }
        ?>
      </td>
    </tr>
  <?php endif; ?>
</table>
<br />

<table class="ht3" cellspacing="0" cellpadding="0" width="100%">
  <tr>
      <td valign="top" align="center" width="3%"><b>№</b></td>
      <td valign="top" align="center"><b>Товары (работы, услуги)</b></td>
      <td valign="top" align="center" width="12%"><b>Цена</b></td>
      <td valign="top" align="center" width="7%"><b>Кол-во</b></td>
      <td valign="top" align="center" width="5%"><b>Ед.</b></td>
      <td valign="top" align="center" width="13%"><b>Сумма</b></td>
  </tr>
  <?php foreach ($rows as $num => $row): ?>
    <?php if ($row['type'] == 'product'): ?>
      <tr>
        <td align="center" valign="center" width="3%"><?php print $num++; ?></td>
        <td align="left" valign="center">
          <?php print $row['title']; ?>
          </br><?php print t('SKU'); ?>: <?php print $row['product']->model; ?>
          <?php if (!empty($row['attributes'])): ?>
            <br/><?php print $row['attributes']; ?>
          <?php endif; ?>
          <?php if (!empty($row['promo_code'])): ?>
            <br/>Промокод: <?php print $row['promo_code']; ?>
          <?php endif; ?>
        </td>
        <td align="center" valign="center" width="7%"><?php print $row['qty']; ?></td>
        <td align="center" valign="center" width="5%">усл.</td>
        <td align="right" valign="center" width="12%"><?php print $row['price']; ?></td>
        <td align="right" valign="center" width="13%"><?php print $row['total']; ?></td>
      </tr>
    <?php elseif ($row['type'] == 'line_item'): ?>
      <tr>
        <td align="center" valign="center" width="3%"><?php print $num++; ?></td>
        <td align="left" valign="center"><?php print $row['title']; ?></td>
        <td align="center" valign="center" width="7%"><?php print $row['qty']; ?></td>
        <td align="center" valign="center" width="5%">усл.</td>
        <td align="right" valign="center" width="12%"><?php print $row['price']; ?></td>
        <td align="right" valign="center" width="13%"><?php print $row['total']; ?></td>
      </tr>
    <?php endif; ?>
  <?php endforeach; ?>
</table>

</br>

<table class="ht4" cellspacing="0" cellpadding="0" width="100%"><tr>    <td valign="top" align="right" width="87%"><b>Всего к оплате:</b></td>    <td valign="top" align="right" width="13%"><b><?php $cleartotalprice = number_format($order->order_total, 2, ',', ' '); print $cleartotalprice; ?> руб.</b></td></tr><tr>    <td valign="top" align="right" colspan="2"><b>НДС не облагается.</b></td></tr></table>





<p style="text-align: left">Всего наименований <?php print count($order->products);?> на сумму <?php print $cleartotalprice; ?> руб.</p>
<p style="text-align: left; font-weight: bold; border-bottom: 2px solid black; padding: 0 0 5px">


<?php

function num2str($num) {
    $nul='ноль';
    $ten=array(
        array('','один','два','три','четыре','пять','шесть','семь', 'восемь','девять'),
        array('','одна','две','три','четыре','пять','шесть','семь', 'восемь','девять'),
    );
    $a20=array('десять','одиннадцать','двенадцать','тринадцать','четырнадцать' ,'пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать');
    $tens=array(2=>'двадцать','тридцать','сорок','пятьдесят','шестьдесят','семьдесят' ,'восемьдесят','девяносто');
    $hundred=array('','сто','двести','триста','четыреста','пятьсот','шестьсот', 'семьсот','восемьсот','девятьсот');
    $unit=array( // Units
        array('копейка' ,'копейки' ,'копеек',  1),
        array('рубль'   ,'рубля'   ,'рублей'    ,0),
        array('тысяча'  ,'тысячи'  ,'тысяч'     ,1),
        array('миллион' ,'миллиона','миллионов' ,0),
        array('миллиард','милиарда','миллиардов',0),
    );
    //
    list($rub,$kop) = explode('.',sprintf("%015.2f", floatval($num)));
    $out = array();
    if (intval($rub)>0) {
        foreach(str_split($rub,3) as $uk=>$v) { // by 3 symbols
            if (!intval($v)) continue;
            $uk = sizeof($unit)-$uk-1; // unit key
            $gender = $unit[$uk][3];
            list($i1,$i2,$i3) = array_map('intval',str_split($v,1));
            // mega-logic
            $out[] = $hundred[$i1]; # 1xx-9xx
            if ($i2>1) $out[]= $tens[$i2].' '.$ten[$gender][$i3]; # 20-99
            else $out[]= $i2>0 ? $a20[$i3] : $ten[$gender][$i3]; # 10-19 | 1-9
            // units without rub & kop
            if ($uk>1) $out[]= morph($v,$unit[$uk][0],$unit[$uk][1],$unit[$uk][2]);
        } //foreach
    }
    else $out[] = $nul;
    $out[] = morph(intval($rub), $unit[1][0],$unit[1][1],$unit[1][2]); // rub
    $out[] = $kop.' '.morph($kop,$unit[0][0],$unit[0][1],$unit[0][2]); // kop
    return trim(preg_replace('/ {2,}/', ' ', join(' ',$out)));
}

/**
 * Склоняем словоформу
 * @ author runcore
 */
function morph($n, $f1, $f2, $f5) {
    $n = abs(intval($n)) % 100;
    if ($n>10 && $n<20) return $f5;
    $n = $n % 10;
    if ($n>1 && $n<5) return $f2;
    if ($n==1) return $f1;
    return $f5;
}

print num2str($order->order_total);

?>




</p>
<p style="text-align: left; margin-bottom: 15px">Счет действителен к оплате в течении <?=variable_get('uc_bank_days')?> дней.</p>

<table class="ht2" cellspacing="0" cellpadding="0" width="100%">
<tr>
    <td width="150" valign="middle"><br /><b>Генеральный директор</b><br /><hr style="border: 0px solid white" /><sup>&nbsp;</sup></td>
    <td rowspan="2" valign="middle"><img src="/<?php print drupal_get_path('theme',$GLOBALS['theme']); ?>/img/<?=variable_get('uc_bank_firmprint')?>" style="width: 180px; height: 180px; border-width: 0;" /></td>
    <td width="175" valign="middle"><img src="/<?php print drupal_get_path('theme',$GLOBALS['theme']); ?>/img/<?=variable_get('uc_bank_gendirsign')?>" style="width: 170px; height: 85px; border-width: 0;" /></td>
    <td width="200" valign="middle" style="text-align: center"><br /><b>/ <?=variable_get('uc_bank_gendir')?> /</b><br /><hr style="border: 1px solid black" /><sup>расшифровка подписи</sup></td>
</tr>
<tr style="display:none;">
    <td width="150" valign="middle"><br /><b>Бухгалтер</b><br /><hr style="border: 0px solid white" /><sup>&nbsp;</sup></td>
    <td width="175" valign="middle"><img src="/<?php print drupal_get_path('theme',$GLOBALS['theme']); ?>/img/<?=variable_get('uc_bank_buhsign')?>" style="width: 170px; height: 85px; border-width: 0;" /></td>
    <td width="200" valign="middle" style="text-align: center"><br /><b>/ <?=variable_get('uc_bank_buh')?> /</b><br /><hr style="border: 1px solid black" /><sup>расшифровка подписи</sup></td>
</tr>
</table>
</br>
</br>
</br>
<div style="border:5px solid #ff0000; padding:20px; font-size:16px;"><b>ВНИМАНИЕ!</b></br>Оплата третьими лицами не допускается. Назначение платежа указывается <u>БЕЗ</u> изменений:</br>Оплата по счету № <?=$order->order_id?> от <?=variable_get('uc_bank_date_current') ? date('d.m.Y') : date('d.m.Y', $order->created)?> за интернет-услуги. Без НДС. </div>
</br>
</br>
</br>
<div class="desc">Для ускорения зачисления средств рекомендуется отправить скан-копию оплаченной платежки на почту: <b><?=variable_get('uc_bank_billemail')?></b></div>
</div>
