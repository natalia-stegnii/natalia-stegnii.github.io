<?php
/**
 * @file
 * Views infinite scroll pager template.
 */
?>
<ul class="pager pager--infinite-scroll <?php print $automatic_scroll_class ?>">
  <?php if ($button_render = render($button)): ?>
    <li class="pager__item">
      <?php print $button_render; ?>
    </li>
  <?php endif; ?>
</ul>
