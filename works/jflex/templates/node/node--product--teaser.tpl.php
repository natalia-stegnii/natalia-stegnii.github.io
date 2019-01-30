<?php

/**
 * @file
 * Default theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct URL of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type; for example, "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type; for example, story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode; for example, "full", "teaser".
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined; for example, $node->body becomes $body. When needing to
 * access a field's raw values, developers/themers are strongly encouraged to
 * use these variables. Otherwise they will have to explicitly specify the
 * desired field language; for example, $node->body['en'], thus overriding any
 * language negotiation rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see template_process()
 *
 * @ingroup themeable
 */

/**
 * @see jflex_preprocess_node().
 *
 * VARIABLES:
 * $sell_price;
 * $discount;
 * $price_old;
 * $field_marker_render;
 */
//dpm($node, '$node');
//dpm($content, '$content');
?>
<div class="product teaser <?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <?php print render($title_prefix); ?>
  <?php print render($title_suffix); ?>

  <?php print drupal_render($content['field_product_marker']); ?>
  <?php if (!empty($content['field_image'])): ?>
    <a href="<?php print $node_url; ?>"  class="photo">
      <img src="<?php print image_style_url('product_preview', $content['field_image']['#items'][0]['uri']); ?>"/>
    </a>
  <?php endif; ?>
  <?php if (!empty($content['node_compare']) || !empty($flag__product_favorites)): ?>
    <div class="statistics">
      <span class="compare__wrap">
        <?php if (!empty($content['node_compare'])): ?>
          <?php print drupal_render($content['node_compare']); ?>
        <?php endif; ?>
      </span>
      <span class="like__wrap">
        <?php if (!empty($content['flag_product_favorites'])): ?>
          <?php print drupal_render($content['flag_product_favorites']); ?>
        <?php endif; ?>
      </span>
    </div>
  <?php endif; ?>
  <a href="<?php print $node_url; ?>" class="title"><?php print $title; ?></a>
  <?php if (!empty($model)): ?>
    <div class="sku"><?php print t('SKU'); ?>: <?php print $model; ?></div>
  <?php endif; ?>
  <div class="prices">
    <div class="current icon ic-rub">
      <?php print $sell_price; ?>
    </div>
    <div class="additional">
      <?php if ($price_old): ?>
        <span class="old"><?php print $price_old; ?></span>
      <?php endif; ?>
      <?php if ($discount): ?>
        <span class="discount oblique"><?php print $discount; ?></span>
      <?php endif; ?>
    </div>
  </div>

  <a href="<?php print $node_url; ?>" class="add-to-cart btn bold s_red"><?php print t('Details'); ?></a>
</div>

