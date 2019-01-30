<?php
/**
 * @file comment-form.tpl.php
 * Main view template.
 *
 *
 * Variables:
 * $form['author']['name']
 * $form['author']['mail']
 * $form['subject']
 *
 * $form['actions']
 * $form['actions']['submit']
 * $form['actions']['preview']
 * $user
 */
//dpm($form, '$form');
?>
<div class="row sp-10">
  <div class="col d3 t2 m12"></div>
  <div class="col d6 t8 m12">
    <div class="row sp-10">
      <?php if(!empty($form['author']['name'])): ?>
        <div class="col d6">
          <?php print render($form['author']['name']); ?>
        </div>
      <?php endif; ?>
      <?php if(!empty($form['author']['mail'])): ?>
        <div class="col d6">
          <?php print render($form['author']['mail']); ?>
        </div>
      <?php endif; ?>
    </div>
    <?php print drupal_render_children($form);//do not remove this code to ubercart's checkout continues to work ?>
  </div>
  <div class="col d3 t2 m12"></div>
</div>
