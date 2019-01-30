<div class="mb20">
  <div class="title fl"><?php print t('Video reviews'); ?></div>
  <a href="/video" class="btn small simple fr lcase"><?php print t('View all'); ?></a>
</div>

<?php if ($rows): ?>
    <?php print $rows; ?>
<?php elseif ($empty): ?>
    <?php print $empty; ?>
<?php endif; ?>

<?php if ($pager): ?>
  <?php print $pager; ?>
<?php endif; ?>
