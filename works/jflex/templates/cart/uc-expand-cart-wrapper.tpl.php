<?php

/**
 * @file uc-cart-wrapper.tpl.php
 * Файл для создания обвертки для панелей корзины.
 *
 * This file is not used and is here as a starting point for customization only.
 * @see theme_field()
 *
 * Available variables:
 * $panes: Панели страницы корзина
 * $panes['cart_form']: Форма корзины
 * $panes['checkout_similar']: Сопуствующие товары.
 *
 * @see jflex_theme()
 */
//dpm($panes, '$panes');
$coupon = block_get_blocks_by_region('coupon');
?>
<div class="cart-content-block pb20">
  <div class="row sp-10">
    <div class="col d8 t12">
      <div class="cart-content">
        <h3><?php print t('Cart'); ?></h3>
        <div class="cart__box">
          <?php if (!empty($panes['cart_form'])): ?>
            <?php print render($panes['cart_form']); ?>
          <?php endif; ?>
          <?php if ($coupon): ?>
            <div class="promo-code__wrap">
              <div class="btn_promo btn small simple"><?php print t('I have a promo code'); ?></div>
              <div class="promo-code">
                <!--block-uc-coupon / Код купона на скидку-->
                <?php print render($coupon); ?>
              </div>
            </div>
          <?php endif; ?>
        </div>
      </div>
    </div>
    <div class="col d4 t12">
      <?php if (!empty($panes['checkout_similar'])): ?>
        <div class="accessory">
          <?php print render($panes['checkout_similar']); ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</div>