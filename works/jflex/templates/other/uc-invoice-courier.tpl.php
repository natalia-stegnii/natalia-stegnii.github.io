<?php
//$profile_class = !isset($profile) ? ' class="notvalid"' : '';
$profile_class = '';
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">

<head>
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
  <script src="/<?php print drupal_get_path('module', 'jquery_update') . '/replace/jquery/1.7/jquery.min.js'; ?>"></script>
  <script type="application/javascript">
    $( document ).ready(function() {
      $("#toggle-button").click(function() {
        $("img#toggle-hide, #toggle-hide").toggleClass("invisible");
      });
    });
  </script>

  <style type="text/css">
    .invisible {visibility: hidden;}
    .buttons {
      text-align: right;
      margin: 0 1em 1em 0;
    }
    .notvalid .buttons {display:none;}
    .notvalid .ht3, .notvalid .ht3 td {border-color:#ddd;}
    .notvalid {color:#ccc!important;}
    .notvalid .corpdetails {font-weight:bold; font-size:16px; color:#000;}
  </style>
  <style type="text/css" media="print">
    input, .buttons {
      display: none;
    }
  </style>
</head>
<body<?php print $profile_class; ?>>
  <div class="buttons">
    <input type="button" value="<?php print t('Распечатать'); ?>" onclick="window.print();" />
    <input type="button" value="<?php print t('Скрыть печать и подпись'); ?>" id="toggle-button" />
  </div>

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
  .ht2, .ht2 td { padding: 2px; border-width: 0, text-align: left }
  .ht3 {border: 2px solid black; border-collapse:collapse; padding: 2px;}
  .ht3 td {border: 1px solid black; border-collapse:collapse; padding:5px;}
  .ht4 {border: 0px solid black; border-collapse:collapse; padding: 2px;}
  .ht4 td {border: 0px solid black; border-collapse:collapse; padding: 2px;}
  sup { vertical-align: super; font-size: smaller;}
  .desc {text-align:center; font-size:10px; color:#777;}
</style>

<div style="width: 750px; margin:30px auto 0; padding: 0;">


  <table class="ht4" style="width:100%; margin-bottom:30px;">
  <tr>
    <td style="padding-right:20px; width:150px"><b style="font-size:16px; white-space:nowrap;"><?php print variable_get('uc_store_phone', ''); ?></b><br/><a href="mailto:<?php print variable_get('uc_store_email', ''); ?>"><?php print variable_get('uc_store_email', ''); ?></td>
    <td style="height:30px;"><div style="background:url('<?php print $logo_path; ?>') no-repeat right center transparent; background-size: contain; width:100%; height:100%;); border-width: 0;"></div></td>
  </tr>
</table>

  <h1>
  <div style="font-size: 19px; font-weight: bold;">Накладная по счету №<?=$order->order_id?> от <?=variable_get('uc_bank_date_current') ? date('d.m.Y') : date('d.m.Y', $order->created)?></div>
  </h1>
  <hr style="margin-top: 20px; border: 1px solid black;" />
  <table class="ht2" cellspacing="0" cellpadding="0" width="100%" style="margin-bottom: 10px;">
    <tr>
      <td width="80" style="vertical-align:top; padding:0 10px 0 0;"><b>Поставщик:</b></td>
      <td><?php
        print variable_get('uc_bank_the_name_of_the_payee', '')
          . ', ' . variable_get('uc_bank_address', '')
          . ', ИНН ' . variable_get('uc_bank_tin', '')
          . ', КПП ' . variable_get('uc_bank_kpp', '')
          . ', Р/С ' . variable_get('uc_bank_current_account', '')
          . ', БИК ' . variable_get('uc_bank_bic', '')
          . ', К/С ' . variable_get('uc_bank_correspondent_account', '');
        ?></td>
    </tr>
    <tr>
      <td width="80" style="vertical-align:top; padding:0 10px 0 0;"><b>Покупатель:</b></td>
      <td class="corpdetails"><?php
        if (isset($profile)) {
          if ($profile['field_corp_name']) print $profile['field_corp_name'];
          if ($profile['field_corp_zip']) print ', ' . $profile['field_corp_zip'];
          if ($profile['field_corp_area'] || $profile['field_corp_city']) print ', ' . $profile['field_corp_area'] . ' ' . $profile['field_corp_city'];
          if ($profile['field_corp_street'] || $profile['field_corp_directlocation']) print ', ' . $profile['field_corp_street'] . ' ' . $profile['field_corp_directlocation'];
          if ($profile['field_corp_inn']) print ', ' . $profile['field_corp_inn'];
          if ($profile['field_corp_kpp']) print ', ' . $profile['field_corp_kpp'];
          if ($profile['field_corp_pacc']) print ', ' . $profile['field_corp_pacc'];
          if ($profile['field_corp_bankbik']) print ', ' . $profile['field_corp_bankbik'];
          if ($profile['field_copr_koracc']) print ', ' . $profile['field_copr_koracc'];
        }
        else {
          //$link = l('ссылке', 'profile-' . FLEXPROD_ACT_PROFILE2_USERCORPDATA_TYPE . '/'  . $order->uid . '/edit');
          //print "Реквизиты не заполнены. Пройдите по этой $link для заполнения реквизитов.";
        }
        ?></td>
    </tr>
  </table>

  <table class="ht3" cellspacing="0" cellpadding="0" width="100%">
    <tr>
      <td valign="top" align="center" width="3%"><b>№</b></td>
      <td valign="top" align="center"><b>Товар</b></td>
      <td valign="top" align="center" width="7%"><b>Кол-во</b></td>
      <td valign="top" align="center" width="5%"><b>Ед.</b></td>
      <td valign="top" align="center" width="12%"><b>Цена</b></td>
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

  <table class="ht2" cellspacing="0" cellpadding="0" width="100%" style="margin-top: 10px;">
    <tr>
      <td style="padding:0 10px 0 0; text-align: right;"><b>Итого:</b></td>
      <td width="90" style="text-align: right;"><b><?php $cleartotalprice = number_format($order->order_total, 2, ',', ' '); print $cleartotalprice; ?> руб.</b></td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: right;"><b>НДС не облагается.</b></td>
    </tr>
  </table>

  </br>
  Всего наименований <?php print count($order->products);?> на сумму <?php print $cleartotalprice; ?> руб.</br>
  <b style="display: block; margin-top: 5px;">

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

  </b>
  <hr style="margin-top: 10px; margin-bottom: 10px; border: 1px solid black;" />

  <div style="clear:both; margin:10px 0"></div>
  <table style="float:left;" class="ht2" cellspacing="0" cellpadding="0" width="60%">
    <tr>
      <td valign="top" width="60">Отпустил</td>
      <td valign="top" id="toggle-hide">
        <img src="/<?php print drupal_get_path('theme',$GLOBALS['theme']); ?>/img/<?=variable_get('uc_bank_gendirsign')?>" style="width: 170px; height: 85px; border-width: 0;" />
      </td>
      <td valign="top" id="toggle-hide">
        <?php if ($stamp): ?>
          <img src="/<?php print drupal_get_path('theme',$GLOBALS['theme']); ?>/img/<?=variable_get('uc_bank_firmprint')?>" style="width: 180px; height: 180px; border-width: 0;" />
        <?php endif; ?>
      </td>
    </tr>
  </table>

  <table style="float:right;" class="ht2" cellspacing="0" cellpadding="0" width="40%">
    <tr>
      <td width="60">Получил</td>
      <td valign="top">
        <br>
        <hr style="width: 90%; border: 1px solid black" />
      </td>
    </tr>
  </table>
</div>
</body>
</html>