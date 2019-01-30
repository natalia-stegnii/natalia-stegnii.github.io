<?php

/**
 * @file
 * Default theme implementation for a reply.
 */
?>
<div class="<?php print $classes; ?> clearfix" id="reply-<?php print $id ?>">
  <div class="content__wrap">
    <div class="content">
      <div class="top-line">
        <?php if (!empty($content['field_reminder_user']) || !empty($content['field_reminder_type'])): ?>
          <div class="status__wrap">
            <?php if (!empty($content['field_reminder_user'])): ?>
              <div class="c-status">
                <?php print render($content['field_reminder_user']); ?>
              </div>
            <?php endif; ?>
            <?php if (!empty($content['field_reminder_type'])): ?>
              <?php hide($content['field_reminder_type']); ?>
              <div class="c-status">
                <div class="field-items">
                  <?php foreach ($content['field_reminder_type']['#items'] as $item): ?>
                    <div class="field-item <?php print $item['value']; ?>"><?php print $item['value']; ?></div>
                  <?php endforeach ?>
                </div>
              </div>
            <?php endif; ?>
          </div>
        <?php endif; ?>
      </div>
      <?php
      // We hide the comments and links now so that we can render them later.
      print render($content);
      ?>
    </div>

    <?php print render($links) ?>
  </div>
</div>