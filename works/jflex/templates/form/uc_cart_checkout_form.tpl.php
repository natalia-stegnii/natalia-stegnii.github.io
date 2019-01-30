<?php
/**
 * @file uc_cart_checkout_form.tpl.php
 * @see uc_cart_checkout_form()
 * Main view template.
 *
 *
 * Variables:
 * $form['panes']['customer'] -- customer form
 * $form['panes']['delivery'] -- delivery form
 * $form['panes']['quotes'] -- counts delivery prices
 * $form['panes']['payment'] -- select payment types
 * $form['panes']['comments'] -- order comment
 * $form['panes']['coupon'] -- coupons module pane
 * $form['panes']['cart'] -- standart cart list of ubercart checkout
 * $form['panes']['simplenews'] -- simplenews
 *
 * $form['actions']
 * $form['actions']['cancel']
 * $form['actions']['continue']
 * $user
 */
hide($form['uc_one_step_order_custom_cart_block']);
hide($form['actions']['cancel']);
//dpm($form, '$form');
?>

<div class="row sp-10">
  <div class="col d5 t12">
    <div class="customer-info">
      <div class="user-info__wrap">
        <h3><?php print t('Ordering'); ?></h3>

        <?php if (!empty($form['panes']['uc_coupon_giftcertificate'])): ?>
          <div class="pane uc-coupon-giftcertificate hide"><?php print render($form['panes']['uc_coupon_giftcertificate']); ?></div>
        <?php endif; ?>
        <?php if (!empty($form['panes']['uc_pane_login'])): ?>
          <div class="pane login"><?php print render($form['panes']['uc_pane_login']); ?></div>
        <?php endif; ?>
        <?php if (!empty($form['panes']['customer'])): ?>
          <div class="pane customer"><?php print render($form['panes']['customer']); ?></div>
        <?php endif; ?>
        <?php if (!empty($form['panes']['delivery'])): ?>
          <div class="pane delivery"><?php print render($form['panes']['delivery']); ?></div>
        <?php endif; ?>
        <?php if (!empty($form['panes']['comments'])): ?>
          <div class="pane comments"><?php print render($form['panes']['comments']); ?></div>
        <?php endif; ?>
      </div>

      <?php if (!empty($form['panes']['quotes'])): ?>
        <div class="delivery__wrap">
          <div class="title"><?php print t('Choose a shipping method'); ?></div>
          <div class="pane delivery"><?php print render($form['panes']['quotes']); ?></div>
          <?php if (!empty($form['panes']['uc_shipping_expand_date'])): ?>
            <div class="pane shippings-date"><?php print render($form['panes']['uc_shipping_expand_date']); ?></div>
          <?php endif; ?>
        </div>
      <?php endif; ?>

      <?php if (!empty($form['panes']['payment'])): ?>
        <div class="payment__wrap">
          <div class="title"><?php print t('Select a Payment Method'); ?></div>
          <div class="pane payment"><?php print render($form['panes']['payment']); ?></div>
        </div>
      <?php endif; ?>

      <div class="agreement__wrap">
        <?php if (!empty($form['panes']['simplenews'])): ?>
          <div class="pane simplenews"><?php print render($form['panes']['simplenews']); ?></div>
        <?php endif; ?>
        <?php if (!empty($form['panes']['uc_termsofservice_agreement_checkout'])): ?>
          <div class="pane terms"><?php print render($form['panes']['uc_termsofservice_agreement_checkout']); ?></div>
        <?php endif; ?>
        <?php if (!empty($form['actions']['continue'])): ?>
          <div class="pane submit"><?php print render($form['actions']['continue']); ?></div>
        <?php endif; ?>
        <?php if (!empty($form['panes']['uc_checkout_rebuild'])): ?>
          <div class="pane checkout_rebuild_order hidden"><?php print render($form['panes']['uc_checkout_rebuild']); ?></div>
        <?php endif; ?>
      </div>
    </div>
  </div>
  <div class="col d7 t12">
    <div class="cart-info sticky">
      <span class="btn content-toggler s_grey center mv20 d-hide t-hide js__et-sla" data-et-target="#cart-content">
        <span class="content-inactive"><?php print t('Show Cart'); ?></span>
        <span class="content-active"><?php print t('Hide Cart'); ?></span>
      </span>
      <div id="cart-content" class="cart-content">
        <h3><?php print t('Cart'); ?></h3>

        <div class="cart__box">
          <?php if (!empty($form['panes']['uc_ajaxcart_expand'])): ?>
            <div class="pane uc-ajaxcart-expand"><?php print render($form['panes']['uc_ajaxcart_expand']); ?></div>
          <?php endif; ?>

          <?php if (!empty($form['panes']['uc_discount_logic'])): ?>
            <div class="pane discounts"><?php print render($form['panes']['uc_discount_logic']); ?></div>
          <?php endif; ?>

          <div class="bottom">
            <div class="box-cart-amount">
              <div class="coupon-form-wrapper">
                <?php if (!empty($form['panes']['coupon'])): ?>
                  <div class="pane coupon"><?php print render($form['panes']['coupon']); ?></div>
                <?php endif; ?>
              </div>

              <?php if (!empty($form['panes']['uc_pane_summary'])): ?>
                <div class="pane uc-pane-summary"><?php print render($form['panes']['uc_pane_summary']); ?></div>
              <?php endif; ?>
            </div>

            <?php if (!empty($form['panes']['sms_ucpane'])): ?>
              <div class="pane sms-ucpane-pane"><?php print render($form['panes']['sms_ucpane']); ?></div>
            <?php endif; ?>

            <div class="cart-empty">
              <?php print l(t('Empty cart'), 'cart/empty', array(
                'attributes' => array('class' => array('btn simple bold')),
              )); ?>
            </div>
          </div>

        </div>
      </div>

      <?php if (!empty($form['panes']['checkout_similar'])): ?>
        <div class="pane uc-pane-checkout-similar checkout-similar"><?php print render($form['panes']['checkout_similar']); ?></div>
      <?php endif; ?>
    </div>
  </div>
</div>

<?php print drupal_render_children($form);//do not remove this code to ubercart's checkout continues to work ?>
