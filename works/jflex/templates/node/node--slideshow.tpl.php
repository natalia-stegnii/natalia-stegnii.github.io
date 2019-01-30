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
 * все параметры необязательные, если не заполнено то вернется пусто ''.
 * если в поле выбрано несколько значений то они будут перечислены в переменной через запятую.
 *
 * @see jflex_preprocess_node() type = slideshow;
 *
 * Высота
 * $field_slide_height_value;
 *  пример: 800
 *
 * Растягивание фона
 * $field_slide_resize;
 *  cover - по ширине или высоте
 *
 * Элементы управления
 * $field_slide_contols_value;
 *  nopaginator - отключить пагинатор
 *  nocontrols - отключить стрелки
 *
 * Вид анимации
 * $field_slide_animation_value;
 *  slide - горизонтальное смахивание
 *  fade - плавный переход
 *
 * Задержка перед сменой слайда милисекунды
 * $field_slide_animation_speed_value;
 *  пример: 5000
 *
 * класс bg-to - значит что на этот элемент имг перейдет фоном,
 * класс bg_v_100p - задает растяжение фона (может быть cover или contain, если нам надо),
 * класс bg-center  задает что фон картинки центруется по центру
 *
 * Насройки передаем в обертку самого слайдера (.js__slick) атрибут data-slick-options, принимает json
 * 1) Точки (пагинация)
 * dots: по умолчанию false
 * включить
 * dots: true
 *
 * 2) Стрелки
 * arrows: по умолчанию true
 * выключить
 * arrows: false
 *
 * 3) Анимация
 * по умолчанию slide
 * fade: по умолчанию false
 * включить fade вместо slide
 * fade: true
 * Включить вертикальное листание
 * vertical:true и verticalSwiping:true (чтоб и пальцем тянуть работало)
 *
 * 4) Задержка
 * autoplaySpeed: по умолчанию 3000
 * ставим
 * autoplaySpeed: значение
 *
 * 5) скорость анимации
 * speed: по умолчанию 300
 * ставим
 * speed: значение
 */
//dpm($node, '$node');

?>
<div class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <?php print render($title_prefix); ?>
  <?php print render($title_suffix); ?>

  <?php if (!empty($content['field_fc_slide'])): ?>
    <div class="slider__wrap">
      <div class="hold pad-h">
        <div id="pageheader__slider" class="pageheader__slider js__slick" <?php print $slider_data_option; ?>>
          <?php foreach (element_children($content['field_fc_slide']) as $key): ?>
            <?php if (!empty($content['field_fc_slide'][$key])): ?>
              <?php foreach (element_children($content['field_fc_slide'][$key]['entity']['field_collection_item']) as $key2): ?>
                <?php
                $field_slide_url = $field_slide_text = $field_slide_style = $field_slide_resize = '';
                $item = $content['field_fc_slide'][$key]['entity']['field_collection_item'][$key2];
                $slide_status = TRUE;
                if (isset($item['field_slide_url']['#items'][0]['value'])) {
                  $field_slide_url = $item['field_slide_url']['#items'][0]['value'];
                }
                if (isset($item['field_slide_style']['#items'][0]['value'])) {
                  $field_slide_style = $item['field_slide_style']['#items'][0]['value'];
                }
                if (isset($item['field_slide_resize']['#items'][0]['value'])) {
                  $field_slide_resize = $item['field_slide_resize']['#items'][0]['value'];
                }
                if (isset($item['field_slide_status'])) {
                  $slide_status = isset($item['field_slide_status']['#items'][0]['value']) && !empty($item['field_slide_status']['#items'][0]['value']);
                }
                if (!empty($item['field_slide_text'])) {
                  $field_slide_text = drupal_render($item['field_slide_text']);
                }
                ?>
                <?php if ($slide_status): ?>
                  <div class="slide slide_<?php print $key; ?> <?php print $field_slide_style; ?>" <?php print $slider_style; ?>>
                    <?php if ($field_slide_url): ?>
                      <a class="content bg-center<?php if ($field_slide_resize): ?> bg-to <?php print $field_slide_resize; ?><?php endif; ?>" href="<?php print $field_slide_url; ?>">
                        <?php print $field_slide_text; ?>
                      </a>
                    <?php else: ?>
                      <div class="content bg-center<?php if ($field_slide_resize): ?> bg-to <?php print $field_slide_resize; ?><?php endif; ?>">
                        <?php print $field_slide_text; ?>
                      </div>
                    <?php endif; ?>
                  </div>
                <?php endif; ?>

              <?php endforeach; ?>
            <?php endif; ?>
          <?php endforeach; ?>

        </div><!--pageheader__slider-->
      </div>
    </div>
  <?php endif; ?>

</div>
