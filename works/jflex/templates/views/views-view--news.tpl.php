<div class="mb20">
  <div class="title fl"><?php print t('News'); ?></div>
  <a href="/news" class="btn small simple fr"><?php print t('View all'); ?></a>
</div>

<?php if ($rows): ?>
    <?php print $rows; ?>
<?php elseif ($empty): ?>
    <?php print $empty; ?>
<?php endif; ?>

<?php if ($pager): ?>
  <?php print $pager; ?>
<?php endif; ?>
