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
 */
//dpm($node, '$node');
//dpm($content, '$content');
?>
<?php //print drupal_render($content); ?>
<div class="product complete mb20 <?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <?php print render($title_prefix); ?>
  <?php print render($title_suffix); ?>

  <div class="row sp-10 top-line">
    <div class="col d6 t10 m12">
      <div class="info">
        <?php if (!empty($content['field_product_marker'])): ?>
          <?php print drupal_render($content['field_product_marker']); ?>
        <?php endif; ?>
        <?php if (!empty($content['field_product_availability'])): ?>
          <?php print drupal_render($content['field_product_availability']); ?>
        <?php endif; ?>
        <div class="sku"><?php print t('SKU') .': '. $node->model; ?></div>
        <div class="reviews">
          <a href="#comments"><?php print t('Responsed'); ?>: <span><?php print $node->comment_count; ?></span></a>
        </div>

        <?php print drupal_render($region_product_social); ?>
      </div>
    </div>

    <?php if (!empty($content['links']['print_html'])): ?>
      <div class="col d6 t2 m12">
        <div class="print_nav">
          <?php print drupal_render($content['links']['print_html']); ?>
        </div>
      </div>
    <?php endif; ?>
  </div>

  <div class="row sp-10 mb50">
    <div class="col d6 t12">
      <?php if (!empty($content['field_image'])): ?>
        <?php print jflex_theme_jslider($content['field_image']); ?>
      <?php endif; ?>
    </div>

    <div class="col d6 t12">
      <div class="info-block">
        <div>
          <div class="prices">
            <div class="current">
              <?php if (is_numeric($sell_price) || $sell_price <> t('free')): ?>
                <div class="display-price icon ic-rub uc-product-<?php print $nid; ?>">
                  <?php print $sell_price; ?>
                </div>
              <?php else: ?>
                <div class="display-price uc-product-<?php print $nid; ?>">
                  <?php print $sell_price; ?>
                </div>
              <?php endif; ?>
            </div>
            <div class="additional">
              <?php if ($price_old): ?>
                <span class="old"><?php print $price_old; ?></span>
              <?php endif; ?>
              <?php if ($discount): ?>
                <span class="discount"><?php print $discount; ?></span>
              <?php endif; ?>
            </div>
          </div>
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
        </div>

        <div>
          <div class="choose-info">
            <?php if (!empty($content['add_to_cart'])): ?>
              <?php print drupal_render($content['add_to_cart']); ?>
            <?php endif; ?>
          </div>

          <?php if (!empty($region_product_promo)): ?>
            <?php print drupal_render($region_product_promo); ?>
          <?php endif; ?>
        </div>
      </div><!--info-block-->
    </div>
  </div>

  <div id="product-info-views-block" class="product-views-block">
    <div class="tabs-nav tab-block tab-name-wrap mb30" data-selector=".product-info__tabs-pages">
      <?php if (!empty($content['body'])): ?>
        <div class="tab-name"><?php print $content['body']['#title']; ?></div>
      <?php endif; ?>
      <?php if (!empty($content['group_characteristics'])): ?>
        <div class="tab-name"><?php print t('Characteristics'); ?></div>
      <?php endif; ?>
      <?php if (!empty($content['comments']) || !empty($content['comment_form'])): ?>
        <div class="tab-name" id="comments">Отзывы (<?php print $node->comment_count; ?>)</div>
      <?php endif; ?>
      <!--<div class="tab-name">Наличие в магазинах</div>-->
      <?php if (!empty($content['field_files'])): ?>
        <div class="tab-name"><?php print $content['field_files']['#title']; ?></div>
      <?php endif; ?>
      <?php if (!empty($content['field_video'])): ?>
        <div class="tab-name"><?php print $content['field_video']['#title']; ?></div>
      <?php endif; ?>
      <?php if (!empty($content['field_faq'])): ?>
        <div class="tab-name"><?php print $content['field_faq']['#title']; ?></div>
      <?php endif; ?>
      <?php if (!empty($content['group_delivery'])): ?>
        <div class="tab-name"><?php print t('Delivery'); ?></div>
      <?php endif; ?>
    </div>

    <div class="product-info__tabs-pages">
      <?php if (!empty($content['body'])): ?>
        <div class="tab-page fadeIn">
          <div class="product-description">
            <?php print drupal_render($content['body']); ?>
          </div>
        </div>
      <?php endif; ?>

      <?php if (!empty($content['group_characteristics'])): ?>
        <div class="tab-page fadeIn">
          <?php if (!empty($content['group_characteristics']['#prefix'])): ?>
            <?php print $content['group_characteristics']['#prefix']; ?>
          <?php endif; ?>

          <?php
          $field_feature_free = '';
          if (!empty($content['group_characteristics']['field_feature_free'])) {
            $field_feature_free = $content['group_characteristics']['field_feature_free'];
            unset($content['group_characteristics']['field_feature_free']);
          }
          ?>

          <?php foreach (element_children($content['group_characteristics']) as $key): ?>
            <?php if (!empty($content['group_characteristics'][$key])): ?>
              <?php $content['group_characteristics'][$key]['#label_display'] = 'hidden'; ?>
              <?php if ($field_render = drupal_render($content['group_characteristics'][$key])): ?>
                <div class="item">
                  <span class="field-label">
                    <?php if (!empty($content['group_characteristics'][$key]['#title'])): ?>
                      <?php print $content['group_characteristics'][$key]['#title']; ?>
                    <?php endif; ?>
                  </span>
                  <div class="field-product-qty-m3 inline">
                    <?php print $field_render; ?>
                  </div>
                </div>
              <?php endif; ?>
            <?php endif; ?>
          <?php endforeach; ?>

          <?php if (!empty($field_feature_free)): ?>
            <?php foreach($field_feature_free['#items'] as $fieldcollection_item): ?>
              <?php
              $field_feature_free_group = $field_feature_free_label = $field_feature_free_val = '';
              $item = field_collection_item_load($fieldcollection_item['value']);
              if (isset($item->field_feature_free_group[LANGUAGE_NONE][0])) {
                $field_feature_free_group = field_view_value('field_collection_item', $item, 'field_feature_free_group', $item->field_feature_free_group[LANGUAGE_NONE][0], array('label' => 'hidden'));
              }
              if (isset($item->field_feature_free_label[LANGUAGE_NONE][0])) {
                $field_feature_free_label = field_view_value('field_collection_item', $item, 'field_feature_free_label', $item->field_feature_free_label[LANGUAGE_NONE][0], array('label' => 'hidden'));
              }
              if (isset($item->field_feature_free_val[LANGUAGE_NONE][0])) {
                $field_feature_free_val = field_view_value('field_collection_item', $item, 'field_feature_free_val', $item->field_feature_free_val[LANGUAGE_NONE][0], array('label' => 'hidden'));
              }
              ?>
              <?php if ($field_feature_free_group = render($field_feature_free_group)): ?>
                <span class="field-group">
                  <?php print $field_feature_free_group; ?>
                </span>
              <?php endif; ?>
              <div class="item">
                <span class="field-label">
                  <?php print render($field_feature_free_label); ?>:
                </span>
                <div class="field-product-qty-m3 inline">
                  <?php print render($field_feature_free_val); ?>
                </div>
              </div>
            <?php endforeach; ?>
          <?php endif; ?>

          <?php if (!empty($content['group_characteristics']['#suffix'])): ?>
            <?php print $content['group_characteristics']['#suffix']; ?>
          <?php endif; ?>
        </div>
      <?php endif; ?>

      <?php if (!empty($content['comments']) || !empty($content['comment_form'])): ?>
        <div class="tab-page fadeIn">
          <div class="product-comments">
            <?php if (!empty($content['comments'])): ?>
              <?php print drupal_render($content['comments']); ?>
            <?php endif; ?>
          </div>
        </div>
      <?php endif; ?>


      <!--Наличие в магазинах-->
      <!--<div class="tab-page fadeIn">-->
      <!--  <div class="product-aviable"></div>-->
      <!--</div>-->

      <?php if (!empty($content['field_files'])): ?>
        <div class="tab-page fadeIn">
          <div class="product-additional">
            <div class="title mb30"><?php print t('Files to download'); ?>:</div>
            <?php print drupal_render($content['field_files']); ?>
          </div>
        </div>
      <?php endif; ?>

      <?php if (!empty($content['field_video'])): ?>
        <div class="tab-page fadeIn">
          <div class="product-video">
            <?php print drupal_render($content['field_video']); ?>
          </div>
        </div>
      <?php endif; ?>

      <?php if (!empty($content['field_faq'])): ?>
        <div class="tab-page fadeIn">
          <div class="product-faq">
            <?php print drupal_render($content['field_faq']); ?>
          </div>
        </div>
      <?php endif; ?>

      <?php if (!empty($content['group_delivery'])): ?>
        <div class="tab-page fadeIn">
          <?php if (!empty($content['group_delivery']['#prefix'])): ?>
            <?php print $content['group_delivery']['#prefix']; ?>
          <?php endif; ?>

          <?php foreach (element_children($content['group_delivery']) as $key): ?>
            <?php if (!empty($content['group_delivery'][$key])): ?>
              <div class="item"><?php print drupal_render($content['group_delivery'][$key]); ?></div>
            <?php endif; ?>
          <?php endforeach; ?>

          <?php if (!empty($content['group_delivery']['#suffix'])): ?>
            <?php print $content['group_delivery']['#suffix']; ?>
          <?php endif; ?>
        </div>
      <?php endif; ?>

    </div>
    <!--tabs-->

  </div><!--product-views-block-->

</div><!--product complete-->

<?php if (!empty($content['field_product_ref']) || !empty($content['field_product_recommended']) || !empty($content['field_product_services'])): ?>
  <div class="sub-product">
    <div id="product-views-block" class="product-views-block">
      <?php
      $tab_items = 0;
      if (!empty($content['field_product_ref'])) {
        $tab_items += 1;
      }
      if (!empty($content['field_product_recommended'])) {
        $tab_items += 1;
      }
      if (!empty($content['field_product_services'])) {
        $tab_items += 1;
      }
      ?>
      <?php if ($tab_items > 1): ?>
        <div class="tabs-nav tab-block tab-name-wrap mb30 s_default" data-selector=".sub-product__tabs-pages">
          <?php if (!empty($content['field_product_ref'])): ?>
            <div class="tab-name"><?php print $content['field_product_ref']['#title']; ?></div>
          <?php endif; ?>
          <?php if (!empty($content['field_product_recommended'])): ?>
            <div class="tab-name"><?php print $content['field_product_recommended']['#title']; ?></div>
          <?php endif; ?>
          <?php if (!empty($content['field_product_services'])): ?>
            <div class="tab-name"><?php print $content['field_product_services']['#title']; ?></div>
          <?php endif; ?>
        </div>
      <?php elseif ($tab_items == 1): ?>
        <?php if (!empty($content['field_product_ref'])): ?>
          <h4><?php print $content['field_product_ref']['#title']; ?></h4>
        <?php endif; ?>
        <?php if (!empty($content['field_product_recommended'])): ?>
          <h4><?php print $content['field_product_recommended']['#title']; ?></h4>
        <?php endif; ?>
        <?php if (!empty($content['field_product_services'])): ?>
          <h4><?php print $content['field_product_services']['#title']; ?></h4>
        <?php endif; ?>
      <?php endif; ?>

      <div class="sub-product__tabs-pages">
        <?php $data_slick_options = '{
                "slidesToShow":4,
                "responsive":[
                  {
                    "breakpoint":960,
                    "settings":{
                      "slidesToShow":3
                    }
                  },
                  {
                    "breakpoint":641,
                    "settings":{
                      "slidesToShow":2
                    }
                  },
                  {
                    "breakpoint":481,
                    "settings":{
                      "slidesToShow":1,
                      "unslick": true
                    }
                  }
                ]
              }'; ?>
        <?php if (!empty($content['field_product_ref'])): ?>
          <div class="tab-page fadeIn">
            <div class="views__slider js__slick arrowspace" data-slick-options='<?php print $data_slick_options; ?>'>
              <?php foreach (element_children($content['field_product_ref']) as $key): ?>
                <?php if (!empty($content['field_product_ref'][$key])): ?>
                  <div class="slide">
                    <div class="data">
                      <?php print drupal_render($content['field_product_ref'][$key]); ?>
                    </div>
                  </div>
                <?php endif; ?>
              <?php endforeach; ?>
            </div>
          </div>
        <?php endif; ?>

        <?php if (!empty($content['field_product_recommended'])): ?>
          <div class="tab-page fadeIn">
            <div class="views__slider js__slick arrowspace" data-slick-options='<?php print $data_slick_options; ?>'>
              <?php foreach (element_children($content['field_product_recommended']) as $key): ?>
                <?php if (!empty($content['field_product_recommended'][$key])): ?>
                  <div class="slide">
                    <div class="data">
                      <?php print drupal_render($content['field_product_recommended'][$key]); ?>
                    </div>
                  </div>
                <?php endif; ?>
              <?php endforeach; ?>
            </div>
          </div>
        <?php endif; ?>

        <?php if (!empty($content['field_product_services'])): ?>
          <div class="tab-page fadeIn">
            <div class="views__slider js__slick arrowspace" data-slick-options='<?php print $data_slick_options; ?>'>
              <?php foreach (element_children($content['field_product_services']) as $key): ?>
                <?php if (!empty($content['field_product_services'][$key])): ?>
                  <div class="slide">
                    <div class="data">
                      <?php print drupal_render($content['field_product_services'][$key]); ?>
                    </div>
                  </div>
                <?php endif; ?>
              <?php endforeach; ?>
            </div>
          </div>
        <?php endif; ?>
      </div>
      <!--tabs-->
    </div><!--product-views-block-->
  </div><!--sub-product-->
<?php endif; ?>