<?php
/**
 * @file uc_cart_checkout_form.tpl.php
 * @see uc_cart_checkout_form()
 * Main view template.
 *
 * Variables:
 *  $form
 *
 * Print full form:
 *  $form['#children']
 */
?>
<div id="checkout" class="checkout">
  <?php print $form['#children']; ?>
</div>