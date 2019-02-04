<?php
/**
 * @file uc-product-add-to-cart-form.tpl.php
 * @see uc_product_add_to_cart_form()
 * Main view template.
 *
 *
 * Variables:
 * $form['downpayment']
 * $form['attributes']
 * $form['actions']
 *
 */
//dpm($form, '$form');
?>
<?php if (!empty($form['flexprod_change_extension'])): ?>
  <?php print drupal_render($form['flexprod_change_extension']); ?>
<?php endif; ?>
<?php if (!empty($form['downpayment'])): ?>
  <div>
    <?php print drupal_render($form['downpayment']); ?>
  </div>
<?php endif; ?>
<?php if (!empty($form['attributes'])): ?>
  <div>
    <?php print drupal_render($form['attributes']); ?>
  </div>
<?php endif; ?>
<div>
  <div class="product-control">
    <?php print drupal_render_children($form);//do not remove this code to ubercart's checkout continues to work ?>
  </div>
</div>
