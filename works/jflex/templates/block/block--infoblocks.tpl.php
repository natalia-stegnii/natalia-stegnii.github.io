<div class="infoblock m-b-50 <?php print $classes; ?> block" id="<?php print $block_html_id; ?>" <?php print $attributes; ?>>
  <?php print render($title_suffix); ?>
  <?php if ($block->subject): ?>
    <div class="title" <?php print $title_attributes; ?>><?php print $block->subject ?></div>
  <?php endif; ?>
  <?php print render($title_suffix); ?>

  <?php print $content ?>
</div>