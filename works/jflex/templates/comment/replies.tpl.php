<?php

/**
 * @file
 * Default theme implementation for replies.
 */
$comments = render($replies);
?>
<div id="comments" class="replies-wrapper comments">
  <div class="row sp-10">
    <div class="col d12">
      <?php if (!empty($header)) : ?>
        <div class="replies-header"><h3><?php print $header ?></h3></div>
      <?php endif; ?>
      <?php if ($comments): ?>
        <div class="replies"><?php print $comments; ?></div>
      <?php endif; ?>
    </div>
  </div>

  <?php if ($reply_form): ?>
    <?php print render($reply_form) ?>
    <?php if ($links): ?>
      <div class="replies-links"><?php print render($links) ?></div>
    <?php endif; ?>
  <?php endif; ?>
</div>
