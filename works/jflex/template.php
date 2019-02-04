<?php

/**
 * Implements hook_theme()
 *
 * @return array
 */
function jflex_theme($existing, $type, $theme, $path) {
  return array(
    'uc_cart_checkout_form_wrapper' => array(
      'render element' => 'form',
      'template' => 'uc-cart-checkout-form-wrapper',
      'path' => $path . '/templates/form',
    ),
    'comment_reply_wrapper' => array(
      'render element' => 'content',
      'template' => 'comment-reply-wrapper',
      'path' => $path . '/templates/comment',
    ),
    'comment_form' => array(
      'render element' => 'form',
      'template' => 'comment-form',
      'path' => $path . '/templates/comment',
    ),
    'reply_form' => array(
      'render element' => 'form',
      'template' => 'reply-form',
      'path' => $path . '/templates/comment',
    ),
    'uc_product_add_to_cart_form' => array(
      'render element' => 'form',
      'template' => 'uc-product-add-to-cart-form',
      'path' => $path . '/templates/form',
    ),
  );
}

/**
 * Implements hook_uc_product_add_to_cart_form(&$vars)
 *
 * @param $vars
 */
function jflex_preprocess_uc_product_add_to_cart_form(&$vars) {
  if (!empty($vars['form']['attributes']) && isset($vars['form']['node']['#value'])) {
    $vars['form']['attributes']['#node'] = $vars['form']['node']['#value'];
  }
  if (isset($vars['form']['#view_mode'])) {
    $vars['theme_hook_suggestions'][] = 'uc_product_add_to_cart_form__' . $vars['form']['#view_mode'];
    switch ($vars['form']['#view_mode']) {
      case 'full':
        break;

      case 'teaser_short':
        if (isset($vars['form']['fast_oder_button'])) {
          hide($vars['form']['fast_oder_button']);
        }
        hide($vars['form']['attributes']);
        hide($vars['form']['downpayment']);
        hide($vars['form']['qty']);
        break;
    }
  }
  else {
    hide($vars['form']['attributes']);
    hide($vars['form']['downpayment']);
  }
}

/**
 * Implements hook_preprocess_html(&$vars)
 *
 * @param $vars
 */
function jflex_preprocess_html(&$vars) {
  // Get device.
  //$vars['device'] = jflex_get_device();

  // This is to prevent JS from kicking up a massive fuss on a theme check in ckeditor.config.js bya adding the setting manually
  drupal_add_js(array('ckeditor' => array('theme' => 'jflex')), 'setting');

  // Display Mode.
  if (!empty($_COOKIE['displaymode'])) {
    $vars['classes_array'][] = 'displaymode ' . $_COOKIE['displaymode'];
  }
  else {
    $vars['classes_array'][] = 'displaymode grid';
  }

  $vars['classes_array'][] = 'isadaptive-t';

  $status = drupal_get_http_header("status");
  switch ($status) {
    case '404 Not Found':
      $vars['flex_copyright'] = jflex_theme_flex_copyright();
      $vars['theme_hook_suggestions'][] = 'page__404';
      break;
    case '403 Forbidden':
      $vars['flex_copyright'] = jflex_theme_flex_copyright();
      $vars['theme_hook_suggestions'][] = 'page__403';
      break;
  }
}

/**
 * hook_preprocess_page()
 *
 * @param $vars
 * @param $hook
 *
 * @see theme_menu_local_tasks()
 */
function jflex_preprocess_menu_local_tasks(&$vars, $hook) {
  $menu_types = array('primary', 'secondary');
  foreach ($menu_types as $menu_type) {
    if (isset($vars[$menu_type]) && !empty($vars[$menu_type])) {
      foreach ($vars[$menu_type] as $key => $var) {
        if (!empty($vars[$menu_type][$key]["#link"])) {
          $vars[$menu_type][$key]["#link"]['localized_options']['attributes']['class'][] = 'tab-link-item tab-link-' . $key;
        }
      }
    }
  }
}

/**
 * hook_preprocess_page()
 *
 * @param $vars
 * @param $hook
 */
function jflex_preprocess_page(&$vars, $hook) {
  $path_cur = menu_get_item();
  $frontpage = variable_get('site_frontpage', '/');

  // Device.
  $vars['device'] = jflex_get_device();
  $vars['is_mobile'] = isset($vars['device']['ismobiledevice']) && !empty($vars['device']['ismobiledevice']);

  // Get categories.
  $vars['is_category'] = FALSE;
  $vars['is_desine_category'] = FALSE;
  $vars['category_slider'] = NULL;
  if (!isset($vars['is_title'])) {
    $vars['is_title'] = TRUE;
  }
  if (!isset($vars['is_tabs_hide'])) {
    $vars['is_tabs_hide'] = FALSE;
  }
  $vars['title_suffix_text'] = '';
  // Added wrapper to content.
  $vars['content_nowrap'] = isset($vars['content_nowrap']) ? $vars['content_nowrap'] : FALSE;
  // Show breadcrumb on page
  $vars['breadcrumb_show'] = FALSE;

  // Show the "cart" tab on mobile device.
  $vars['show_mobile_tab_cart'] = TRUE;

  // Cart qty.
  $vars['cart_qty'] = uc_cart_get_total_qty();

  // flex_copyright.
  $vars['flex_copyright'] = jflex_theme_flex_copyright();

  // Sub domain.
  $vars['is_subdomain'] = FALSE;
  global $_SERVER;
  if (isset($_SERVER['HTTP_HOST']) && !empty($_SERVER['HTTP_HOST'])) {
    $subdomain = explode(".", $_SERVER['HTTP_HOST']);
    $vars['is_subdomain'] = count($subdomain) > 2 ? array_reverse($subdomain) : FALSE;
  }

  // Node Compare.
  $vars['node_compare_count'] = 0;
  $vars['node_compare_count_class'] = ' hidden';
  if (module_exists('node_compare') && isset($_SESSION['node_compare']['nids']) && !empty($_SESSION['node_compare']['nids']) && is_array($_SESSION['node_compare']['nids'])) {
    $vars['node_compare_count'] = count($_SESSION['node_compare']['nids']);
    $vars['node_compare_count_class'] = $vars['node_compare_count'] ? '' : ' hidden';
  }

  // Flag (product_favorites).
  $vars['flag_product_favorites_count'] = 0;
  $vars['flag_product_favorites_count_class'] = ' hidden';
  if (module_exists('flag')) {
    global $user;
    $flag = flag_get_flag('product_favorites');
    if ($flag) {
      $vars['flag_product_favorites_count'] = $flag->get_user_count($user->uid);
      $vars['flag_product_favorites_count_class'] = $vars['flag_product_favorites_count'] ? '' : ' hidden';
    }
  }

  if (drupal_is_front_page()) {
    $vars['is_title'] = FALSE;
  }
  elseif (strpos($path_cur['path'], 'cart') === 0) {
    $vars['is_title'] = FALSE;
  }
  elseif (strpos($path_cur['path'], 'user') === 0) {
    $vars['is_title'] = FALSE;
  }
  //elseif (strpos($path_cur['path'], 'compare/type') !== FALSE) {
  //  $vars['is_title'] = TRUE;
  //}

  $title_suffix_text = ' <span class="goods-count"></span>';
  if ($path_cur) {
    switch ($path_cur['path']) {

      // Show breadcrumb on url.
      case 'support/docs':
        // Show breadcrumb on page
        $vars['breadcrumb_show'] = TRUE;

        // Breadcrumbs.
        $breadcrumb = array();
        $breadcrumb[] = drupal_get_title();
        drupal_set_breadcrumb($breadcrumb);
        break;

      case 'user/tickets':
        $vars['is_title'] = FALSE;
        break;

      case 'shop/search':
        //$vars['is_title'] = TRUE;
        $vars['is_desine_category'] = TRUE;
        $vars['title_suffix_text'] = $title_suffix_text;
        break;

      case 'shop/catalog':
        //$vars['is_title'] = TRUE;
        $vars['is_desine_category'] = TRUE;
        $vars['title_suffix_text'] = $title_suffix_text;
        break;

      case 'taxonomy/term/%':
        // Title.
        //$vars['is_title'] = TRUE;
        $vars['title_suffix_text'] = $title_suffix_text;
        $vars['is_category'] = TRUE;
        $vars['is_desine_category'] = TRUE;
        $term = taxonomy_term_load($path_cur['page_arguments'][2]);
        if ($term && $term->vocabulary_machine_name == 'category') {
          // Show breadcrumb on page
          $vars['breadcrumb_show'] = TRUE;
        }
        break;

      case 'articles':
        //$vars['is_title'] = TRUE;

        // Show breadcrumb on page
        $vars['breadcrumb_show'] = TRUE;

        // Breadcrumbs.
        $breadcrumb = array();
        $breadcrumb[] = t('Articles');
        drupal_set_breadcrumb($breadcrumb);
        break;

      case 'news':
        //$vars['is_title'] = TRUE;

        // Show breadcrumb on page
        $vars['breadcrumb_show'] = TRUE;

        // Breadcrumbs.
        $breadcrumb = array();
        $breadcrumb[] = t('News');
        drupal_set_breadcrumb($breadcrumb);
        break;

      case 'cart':
        // Show the "cart" tab on mobile device.
        $vars['show_mobile_tab_cart'] = FALSE;

        // Show breadcrumb on page
        $vars['breadcrumb_show'] = TRUE;

        // Breadcrumbs.
        $breadcrumb = array();
        $breadcrumb[] = l(t('Online store'), 'shop/catalog');
        $breadcrumb[] = t('Cart');
        drupal_set_breadcrumb($breadcrumb);
        break;

      case 'shop/favorites':
        // Title.
        //$vars['is_title'] = TRUE;
        $vars['title_suffix_text'] = $title_suffix_text;

        // Show breadcrumb on page
        $vars['breadcrumb_show'] = TRUE;

        // Breadcrumbs.
        $breadcrumb = array();
        $breadcrumb[] = l(t('Online store'), 'shop/catalog');
        $breadcrumb[] = t('Favorites');
        drupal_set_breadcrumb($breadcrumb);
        break;

      case 'cart/checkout':
        // Show the "cart" tab on mobile device.
        $vars['show_mobile_tab_cart'] = FALSE;

        // Checkout Cart.
        if (isset($vars['page']['cart']['uc_one_step_order_custom_cart_block'])) {
          unset($vars['page']['cart']['uc_one_step_order_custom_cart_block']['actions']['checkout']);
          $vars['page']['content']['system_main']['uc_one_step_order_custom_cart_block'] = $vars['page']['cart']['uc_one_step_order_custom_cart_block'];
          unset($vars['page']['cart']);
        }
        break;

      case 'cart/checkout/complete':
        // Show the "cart" tab on mobile device.
        $vars['show_mobile_tab_cart'] = FALSE;

        //if (isset($vars['page']['content']['system_main']['#order'])) {
        //  $order = $vars['page']['content']['system_main']['#order'];
        //}
        break;

      case 'node/%':
        // Page Node.
        if (!empty($vars['node'])) {
          $node = $vars['node'];
          $vars['back_catalog'] = '';
          //$vars['is_title'] = TRUE;
          switch ($node->type) {
            case 'product':
              if (!empty($node->field_category)) {
                $vars['back_catalog'] = url('taxonomy/term/' . $node->field_category[LANGUAGE_NONE][0]['tid']);
              }

              // Breadcrumbs.
              $breadcrumb = array();
              $breadcrumb[] = l(t('Online store'), 'shop/catalog');
              if (!empty($node->field_category)) {
                foreach ($node->field_category[LANGUAGE_NONE] as $key => $value) {
                  if ($parents = taxonomy_get_parents_all($value['tid'])) {
                    $parents = array_reverse($parents);
                    foreach ($parents as $term) {
                      $breadcrumb[] = l($term->name, 'taxonomy/term/' . $term->tid);
                    }
                  }
                }
                $breadcrumb = array_unique($breadcrumb);
                $breadcrumb = array_merge($breadcrumb);
              }
              $breadcrumb[] = drupal_get_title();
              // Show breadcrumb on page
              $vars['breadcrumb_show'] = TRUE;
              drupal_set_breadcrumb($breadcrumb);
              break;

            case 'article':
              // Show breadcrumb on page
              $vars['breadcrumb_show'] = TRUE;
              $breadcrumb = array();
              $breadcrumb[] = t('Articles');
              drupal_set_breadcrumb($breadcrumb);
              break;

            case 'news':
              // Show breadcrumb on page
              $vars['breadcrumb_show'] = TRUE;
              $breadcrumb = array();
              $breadcrumb[] = t('News');
              drupal_set_breadcrumb($breadcrumb);
              break;

            case 'course':
              // Show breadcrumb on page
              $vars['breadcrumb_show'] = TRUE;
              $breadcrumb = array();
              $breadcrumb[] = t('Course');
              drupal_set_breadcrumb($breadcrumb);
              break;

            case 'help':
              // Show breadcrumb on page
              $vars['breadcrumb_show'] = TRUE;
              $breadcrumb = array();
              $breadcrumb[] = l(t('Help'), '/support');
              drupal_set_breadcrumb($breadcrumb);
              break;

            case 'faq':
              // Show breadcrumb on page
              $vars['breadcrumb_show'] = TRUE;
              $breadcrumb = array();
              $breadcrumb[] = t('Faq');
              drupal_set_breadcrumb($breadcrumb);
              break;

            case 'request':
              $vars['title'] = t('Request') . ': ' . $node->nid;
              $order_id = '';
              $emw = entity_metadata_wrapper('node', $node);
              if ($emw->__isset('field_order')) {
                $order_id = $emw->field_order->raw();
              }
              if ($emw->__isset('field_order_product') && $order_product = $emw->field_order_product->value()) {
                $order_id = $order_id ? ' / ' . t('order') . ' #' . $order_id : '';
                $vars['title'] = $vars['title'] . ' (' . t('model') . ' ' . $order_product->model . $order_id . ')';
              }

              // Show breadcrumb on page
              $vars['breadcrumb_show'] = TRUE;
              $breadcrumb = array();
              $breadcrumb[] = t('Request');
              drupal_set_breadcrumb($breadcrumb);
              break;
          }

          $field = field_get_items('node', $node, 'field_title_mode');
          if ($field) {
            foreach ($field as $item) {
              switch ($item['value']) {
                case 'hide':
                  $vars['is_title'] = FALSE;
                  break;
              }
            }
          }
        }
        break;
    }
  }

  // All page of user.
  $arg = arg();
  if (isset($arg[1])
    && $arg[0] == 'user'
    && is_numeric($arg[1])
  ) {
    // Hide tabs on the user page.
    //$vars['is_tabs_hide'] = TRUE;
    // Show breadcrumb on page
    $vars['breadcrumb_show'] = TRUE;
  }

  //$status = drupal_get_http_header("status");
  //if (!isset($_GET['q']) || empty($_GET['q']) || strpos($_GET['q'], 'files/styles') === FALSE) {
  //  switch ($status) {
  //    case '404 Not Found':
  //      $vars['theme_hook_suggestions'][] = 'page__404';
  //      break;
  //    case '403 Forbidden':
  //      $vars['theme_hook_suggestions'][] = 'page__403';
  //      break;
  //  }
  //}
}

/**
 * hook_preprocess_node()
 *
 * @param $vars
 */
function jflex_preprocess_node(&$vars) {
  $entity_type = $vars['elements']['#entity_type'];
  $entity = $vars['elements']['#node'];
  $view_mode = $vars['elements']['#view_mode'];
  list($id, $vid, $bundle) = entity_extract_ids($entity_type, $entity);
  $path_cur = menu_get_item();

  // Get device.
  $vars['device'] = jflex_get_device();
  $node = $vars['node'];

  $vars['comment_new'] = comment_num_new($node->nid);

  // Set up template suggestions for non-standard view modes
  if ($vars['view_mode'] <> 'full') {
    $vars['theme_hook_suggestions'][] = 'node__' . $vars['type'] . '__' . $vars['view_mode'];
    $vars['theme_hook_suggestions'][] = 'node__' . $vars['view_mode'];
  }
  elseif ($vars['view_mode'] == 'full') {
    if (!empty($vars['content'])) {
      $extra_fields = field_info_extra_fields($entity_type, $bundle, 'display');
      foreach ($vars['content'] as $field_name => $value) {
        if (!isset($vars['content'][$field_name]['#title']) && isset($extra_fields[$field_name]['label'])) {
          $vars['content'][$field_name]['#title'] = $extra_fields[$field_name]['label'];
        }
      }
    }
  }

  // Просчитываем скидку/цены
  if (isset($node->sell_price) && isset($node->price_old)) {
    $discount = '';
    $sell_price = (float) $node->sell_price;
    $price_old = (float) $node->price_old;
    if ($price_old && $sell_price && $price_old > $sell_price) {
      $discount = $sell_price * 100 / $price_old - 100;
      $discount = number_format($discount, 2, '.', '');
      $discount = abs(fmod($discount, floor($discount))) ? $discount : floor($discount);
      $discount = $discount ? $discount . ' %' : '';
    }
    else {
      $price_old = 0;
    }
    //$sell_price_decimals = 0;
    $sell_price_decimals = $sell_price && abs(fmod($sell_price, floor($sell_price))) ? 2 : 0;
    $sell_price = $sell_price ? number_format($sell_price, $sell_price_decimals, '.', ' ') : 0;
    //$price_old_decimals = 0;
    $price_old_decimals = $price_old && abs(fmod($price_old, floor($price_old))) ? 2 : 0;
    $price_old = $price_old ? number_format($price_old, $price_old_decimals, '.', ' ') : 0;
    $vars['sell_price'] = $sell_price ? $sell_price : t('free');
    $vars['price_old'] = $price_old;
    $vars['discount'] = $discount;
  }

  if (!empty($vars['content']['links']['print_html'])) {
    $vars['content']['links']['print_html']['#links']['print_html']['title'] = '';
    $vars['content']['links']['print_html']['#links']['print_html']['attributes']['class'][] = 'fr print icon icon-uniE6AE';
  }
  elseif (isset($vars['content']['links']['book']['#links']['book_printer'])) {
    unset($vars['content']['links']['book']['#links']['book_add_child']);
    $vars['content']['links']['book']['#links']['book_printer']['title'] = '';
    $vars['content']['links']['book']['#links']['book_printer']['attributes']['class'][] = 'fr print icon icon-uniE6AE';
  }

  switch ($path_cur['path']) {
    // Page the node.
    case 'node/%':
      if ($vars['view_mode'] == 'full' && isset($path_cur['original_map'][1]) && $node->nid == $path_cur['original_map'][1]) {
        // Regions.
        static $regions;
        if (is_null($regions)) {
          $regions = array();
          $regions['region_product_promo'] = block_get_blocks_by_region('product_promo');
          $regions['region_product_social'] = block_get_blocks_by_region('product_social');
          $regions['region_innode_leftside'] = block_get_blocks_by_region('innode_leftside');
          $regions['region_innode_rightside'] = block_get_blocks_by_region('innode_rightside');
        }
        $vars += $regions;
      }
      break;
  }

  // Add to cart view_mode.
  if (isset($vars['content']['add_to_cart']['#view_mode'])) {
    $vars['content']['add_to_cart']['#form']['#view_mode'] = $vars['content']['add_to_cart']['#view_mode'];
  }

  switch ($node->type) {
    case 'product':
      $field = field_get_items('node', $node, 'field_product_addtocart');
      if ($field) {
        foreach ($field as $item) {
          switch ($item['value']) {
            case 'hide':
              $vars['content']['add_to_cart']['#access'] = FALSE;
              break;
          }
        }
      }
      break;

    case 'slideshow':
      $fields_value = array(
        'field_slide_height',
        'field_slide_contols',
        'field_slide_animation',
        'field_slide_animation_speed',
      );
      $data_slick_options = array();
      // Точки (пагинация)
      $data_slick_options['dots'] = TRUE;
      // Стрелки
      $data_slick_options['arrows'] = TRUE;
      // Автоматичиская пагинация.
      $data_slick_options['autoplay'] = TRUE;
      // Анимация
      //$data_slick_options['fade'] = FALSE;
      //$data_slick_options['slide'] = TRUE;
      // Задержка
      //$data_slick_options['autoplaySpeed'] = 300;

      foreach ($fields_value as $field_name) {
        $value = '';
        if ($items = field_get_items('node', $node, $field_name)) {
          foreach ($items as $item) {
            switch ($field_name) {
              case 'field_slide_contols':
                switch ($item['value']) {
                  case 'nopaginator':
                    $data_slick_options['dots'] = FALSE;
                    break;
                  case 'nocontrols':
                    $data_slick_options['arrows'] = FALSE;
                    break;
                }
                break;

              case 'field_slide_animation':
                switch ($item['value']) {
                  case 'fade':
                    $data_slick_options['fade'] = TRUE;
                    break;
                  case 'slide':
                    break;
                }

              case 'field_slide_animation_speed':
                $data_slick_options['autoplaySpeed'] = (int) $item['value'];
                break;
            }

            $value = $value ? $value . ' ' . $item['value'] : $item['value'];
          }
        }

        $vars[$field_name . '_value'] = $value;
      }

      // slick_options.
      if ($data_slick_options) {
        $data_slick_options = drupal_json_encode($data_slick_options);
        $vars['slider_data_option'] = "data-slick-options='$data_slick_options'";
      }
      else {
        $vars['slider_data_option'] = '';
      }

      // style.
      $slider_style = '';
      if (!empty($vars['field_slide_height_value'])) {
        $slider_style = 'style="height: ' . $vars['field_slide_height_value'] . 'px"';
      }
      $vars['slider_style'] = $slider_style;
      break;
  }
}

/**
 * hook_preprocess_comment_wrapper()
 *
 * @param $vars
 */
function jflex_preprocess_comment_wrapper(&$vars) {
  // Required for the module "ajax_comments".
  $vars['class_wrapper_comments'] = 'comment-wrapper-nid-' . $vars['node']->nid;

  // Hide the comment for client.
  if (!empty($vars['content']['comments']) && !j_crm_operator_is_user()) {
    $comment = reset($vars['content']['comments']);
    if (isset($comment['#comment']->field_comment_note, $comment['#comment']->comment_body)) {
      foreach ($vars['content']['comments'] as $key => $comment) {
        if (!empty($comment['field_comment_note']) && empty($comment['comment_body'])) {
          $vars['content']['comments'][$key]['#access'] = FALSE;
        }
      }
    }
  }
}

/**
 * hook_preprocess_comment()
 *
 * @param $vars
 */
function jflex_preprocess_comment(&$vars) {
  // Deleted the "inline" class.
  if (isset($vars['content']['links']['#attributes']['class'])) {
    $key = array_search('inline', $vars['content']['links']['#attributes']['class']);
    if (is_numeric($key)) {
      unset($vars['content']['links']['#attributes']['class'][$key]);
    }
  }
  $vars['created'] = format_date($vars['elements']['#comment']->created, 'medium');
  $vars['submitted'] = t('!username !datetime', array('!username' => $vars['author'], '!datetime' => $vars['created']));

  if (isset($vars['content']['field_invoice']['#items'][0]['target_id'])) {
    $vars['content']['field_invoice'][0] = array(
      '#type' => 'item',
      '#markup' => views_embed_view('bill', 'block_invoice', $vars['content']['field_invoice']['#items'][0]['target_id']),
    );
  }
}

/**
 * hook_preprocess_block()
 *
 * @param $vars
 */
function jflex_preprocess_block(&$vars) {
  $vars['title_attributes_array']['class'][] = 'block-title';
}

/**
 * hook_preprocess_flag()
 *
 * @param $vars
 */
function jflex_preprocess_flag(&$vars) {
  $vars['theme_hook_suggestions'][] = 'flag--' . $vars['flag']->name;
}

/**
 * Implements hook_mefibs_elements_alter()
 *
 * @TODO Имеется жесткая привязка к ID блока, нужно сделатьуниверсальнее. $context['block_id'] == 'sort_block'.
 *
 * @param $form_keys
 * @param $context
 *
 * @see mefibs_hide_exposed_form_items().
 */
function jflex_mefibs_elements_alter(&$form_keys, $context) {
  if ($context['block_id'] == 'sort_block' && !isset($form_keys['sort'])) {
    $form_keys[] = 'sort_by';
  }
}

/**
 * hook_preprocess_views_exposed_form()
 *
 * @see mefibs_form_views_exposed_form_alter().
 *
 * @param $vars
 */
function jflex_preprocess_views_exposed_form(&$vars) {
  $hide_fields = array();
  foreach (element_children($vars['form']) as $field_name) {
    if (isset($vars['form'][$field_name]['#options']) && empty($vars['form'][$field_name]['#options'])) {
      $hide_fields[$field_name] = $field_name;
    }
  }
  foreach ($vars['widgets'] as $key => $widget) {
    $vars['widgets'][$key]->class = '';
    if (strpos($widget->widget, '<div style="display: none;">') !== FALSE) {
      $vars['widgets'][$key]->class = ' hidden';
    }
    else {
      $field_name = preg_replace('/[\w\s\.]*-/', '', $key);
      if (isset($hide_fields[$field_name])) {
        $widget->widget = '<div style="display: none;">' . $widget->widget . '</div>';
        $vars['widgets'][$key]->class = ' hidden';
      }
    }
  }
  $vars['hide_fields'] = array();
  $validate_fields = array(
    'sort_order',
    'button',
    'sort_by',
  );
  foreach ($validate_fields as $validate_field) {
    if (isset($vars[$validate_field]) && strpos($vars[$validate_field], '<div style="display: none;">') !== FALSE) {
      $vars['hide_fields'][$validate_field] = TRUE;
    }
  }
}

/**
 * Theme the calendar title.
 *
 * @see theme_date_nav_title();
 *
 * @params $params
 *
 * @return null|string
 */
function jflex_date_nav_title($params) {
  $title = '';
  $granularity = $params['granularity'];
  $view = $params['view'];
  $date_info = $view->date_info;
  $link = !empty($params['link']) ? $params['link'] : FALSE;
  $format = !empty($params['format']) ? $params['format'] : NULL;
  $format_with_year = variable_get('date_views_' . $granularity . '_format_with_year', 'l, F j, Y');
  $format_without_year = variable_get('date_views_' . $granularity . '_format_without_year', 'l, F j');
  switch ($granularity) {
    case 'year':
      $title = $date_info->year;
      $date_arg = $date_info->year;
      break;

    case 'month':
      $format = !empty($format) ? $format : (empty($date_info->mini) ? $format_with_year : $format_without_year);
      $title = date_format_date($date_info->min_date, 'custom', $format);
      $date_arg = $date_info->year . '-' . date_pad($date_info->month);
      break;

    //case 'month_custom':
    //  $format = !empty($format) ? $format : (empty($date_info->mini) ? $format_with_year : $format_without_year);
    //  $title = date_format_date($date_info->min_date, 'custom', $format);
    //  $time_min = (int) date_format_date($date_info->min_date, 'custom', 'U');
    //  //$title = t($format, $time_min);
    //  //$title = date($format, $time_min);
    //  $date_arg = $date_info->year . '-' . date_pad($date_info->month);
    //  break;

    case 'day':
      $format = !empty($format) ? $format : (empty($date_info->mini) ? $format_with_year : $format_without_year);
      $title = date_format_date($date_info->min_date, 'custom', $format);
      $date_arg = $date_info->year;
      $date_arg .= '-';
      $date_arg .= date_pad($date_info->month);
      $date_arg .= '-';
      $date_arg .= date_pad($date_info->day);
      break;

    case 'week':
      $time_min = (int) date_format_date($date_info->min_date, 'custom', 'U');
      $time_max = $time_min + (86400 * 6);
      $title = t('Week of @date_mounth @date_min - @date_max', array(
        '@date_mounth' => date_format_date($date_info->min_date, 'custom', 'F'),
        '@date_min' => date('d.m.Y', $time_min),
        '@date_max' => date('d.m.Y', $time_max),
      ));
      $date_arg = $date_info->year . '-W' . date_pad($date_info->week);
      break;
  }
  if (!empty($date_info->mini) || $link) {
    // Month navigation titles are used as links in the mini view.
    $attributes = array('title' => t('View full page month'));
    $url = date_pager_url($view, $granularity, $date_arg, TRUE);
    return l($title, $url, array('attributes' => $attributes));
  }
  else {
    return $title;
  }
}

/**
 * Change attr "#title" of sell price.
 *
 * @param $form
 * @param $form_state
 */
function jflex_form_views_exposed_form_alter(&$form, &$form_state) {
  if (isset($form['sell_price']['max']) && !isset($form['sell_price']['#prefix'])) {
    $form['sell_price']['min']['#field_prefix'] = t('price from', array(), array('context' => 'sell price o views filter'));
    $form['sell_price']['max']['#field_prefix'] = t('price to', array(), array('context' => 'sell price o views filter'));
  }
}

/**
 * Added tpl for the comment form.
 *
 * Implements hook_form_FORM_ID_alter();
 *
 * @see jflex_theme().
 * @see comment_form().
 *
 * @param $form
 * @param $form_state
 * @param $form_id
 */
function jflex_form_comment_form_alter(&$form, &$form_state, $form_id) {
  hide($form['author']['homepage']);
  //array_unshift($form['#theme'], 'comment_form__node_' . $form['#node']->type);
}

/**
 * Добавление wrapper формы checkout.
 *
 * @see jflex_theme().
 * @see uc_cart_checkout_form().
 *
 * @param $form
 * @param $form_state
 * @param $form_id
 */
function jflex_form_uc_cart_checkout_form_alter(&$form, &$form_state, $form_id) {
  $form['#theme_wrappers'][] = 'uc_cart_checkout_form_wrapper';
}

/**
 * Add class to the form simplenews_confirm_removal_form.
 *
 * @see simplenews_confirm_removal_form().
 *
 * @param $form
 * @param $form_state
 * @param $form_id
 */
function jflex_form_simplenews_confirm_removal_form_alter(&$form, &$form_state, $form_id) {
  $form['#attributes']['class'][] = 'simplenews-confirm-removal-form';
}

/**
 * Change form simplenews.
 *
 * Implements hook_form_alter().
 *
 * @param $form
 * @param $form_state
 * @param $form_id
 */
function jflex_form_simplenews_block_form_alter(&$form, &$form_state, $form_id, $tid) {
  $form['#attributes'] = array('class' => array('simplenews-subscribe'));
  $form['action'] = array('#type' => 'value', '#value' => 'subscribe');
  $form['mail'] = array(
    '#type' => 'textfield',
    '#title' => t('E-mail'),
    '#size' => 20,
    '#maxlength' => 128,
    '#required' => TRUE,
  );
  $form['mail']['#attributes']['placeholder'][] = 'введите email';
  if (user_is_logged_in()) {
    global $user;
    $tid = $form['#tid'];
    $form['mail']['#default_value'] = $user->mail;
    if (simplenews_user_is_subscribed($user->mail, $tid)) {
      $form['action'] = array('#type' => 'value', '#value' => 'unsubscribe');
      $form['#attributes']['class'][] = 'subscribed';
      $form['submit']['#attributes']['class'][] = 'subscribed';
    }
  }
}

/**
 * Search form.
 * Added redirect to page shop/search/.. then submit form.
 *
 * Implements HOOK_form_FORM_ID_alter().
 *
 * @see search_block_form().
 *
 * @param $form
 * @param $form_state
 * @param $form_id
 */
function jflex_form_search_block_form_alter(&$form, &$form_state, $form_id) {
  $form['#method'] = 'get';
  $form['#action'] = '/shop/search';
  $form['search_block_form']['#name'] = 'mfb-shopsearch-populate';
  $form['form_id']['#name'] = 'mfb-shopsearch-mefibs_block_id';
  $form['form_id']['#value'] = 'shopsearch';
  unset($form['form_token']);
  unset($form['form_build_id']);
}

/**
 * Added the class to all forms.
 *
 * Implements HOOK_form_alter().
 *
 * @see form().
 *
 * @param $form
 * @param $form_state
 * @param $form_id
 */
function jflex_form_alter(&$form, &$form_state, $form_id) {
  if (!empty($form['#attributes']['class']) && is_string($form['#attributes']['class'])) {
    $form['#attributes']['class'] = explode(' ', $form['#attributes']['class']);
  }
  // Duplicate the form ID as a class so we can reduce specificity in our CSS.
  if (!empty($form['#id'])) {
    $class = drupal_clean_css_identifier($form['#id']);
  }
  else {
    $class = drupal_clean_css_identifier($form_id);
  }

  if (!empty($form['#theme']) && is_array($form['#theme'])) {
    $class_wrap = end($form['#theme']);
    $class_wrap = drupal_clean_css_identifier($class_wrap);
    if ($class_wrap <> $class) {
      $class .= ' ' . $class_wrap;
    }
  }

  if ($class) {
    $form['#attributes']['class'][] = $class;
  }

  switch ($form_id) {
    case 'sms_user_settings_add_form':
      $form['number']['#attributes']['class'][] = 'phone';
      $form['number']['#maxlength'] = 20;
      // Add element validation for number.
      //array_unshift($form['number']['#element_validate'], 'jflex_sms_user_validate_number_element');
      break;
  }
}

/**
 * hook_form_FORM_ID_alter()
 *
 * @see reply_form()
 *
 * @param $form
 * @param $form_state
 */
function jflex_form_reply_form_alter(&$form, $form_state) {
  $form['#attributes']['class'][] = 'comment-form';
}

/**
 * Theming a link to add/remove nodes for compares.
 */
function jflex_node_compare_toggle_link($vars) {
  $id = 'compare-toggle-' . $vars['nid'];
  $node_added = isset($_SESSION['node_compare']['nids'][$vars['nid']]);
  $action_class = '';
  $remove_t = variable_get('node_compare_text_remove', t('Remove from comparison'));

  if ($vars['block']) {
    $id .= '-block';
    $path = $GLOBALS['base_path'] . 'misc/message-16-error.png';
    $text = '<img title="' . $remove_t . '" src="' . $path . '">';
  }
  else {
    $text = $node_added ? $remove_t : variable_get('node_compare_text_add', t('Add to compare'));
    $action_class = $node_added ? 'remove' : 'add';
  }
  $options = array(
    'query' => drupal_get_destination(),
    'html' => TRUE,
    'attributes' => array(
      'class' => array('compare', 'compare-toggle', 'use-ajax', $action_class),
      'id' => array($id),
      'rel' => 'nofollow',
      'title' => $text,
    ),
  );
  $title = '';
  if (!empty($vars['title'])) {
    $title = $vars['title'];
  }

  return l($title, 'compare/toggle/' . $vars['nid'] . '/nojs', $options);
}

/**
 * Implements hook_preprocess_uc_attribute_add_to_cart();
 *
 * @param $vars
 */
function jflex_preprocess_uc_attribute_add_to_cart(&$vars) {
  $form = &$vars['form'];
  $form['#attributes']['class']['jflex'] = 'row sp-10';
  foreach (element_children($form) as $aid) {
    $form[$aid]['#uc_attribute_expand_attributes']['class']['jflex'] = 'col d6 m12';
  }
}

/**
 * @see theme_form_element().
 *
 * @param $variables
 *
 * @return string
 * @throws \Exception
 */
function jflex_form_element($variables) {
  $element = &$variables['element'];

  // This function is invoked as theme wrapper, but the rendered form element
  // may not necessarily have been processed by form_builder().
  $element += array(
    '#title_display' => 'before',
  );

  // Add element #id for #type 'item'.
  if (isset($element['#markup']) && !empty($element['#id'])) {
    $attributes['id'] = $element['#id'];
  }
  // Add element's #type and #name as class to aid with JS/CSS selectors.
  $attributes['class'] = array('form-item');
  if (!empty($element['#type'])) {
    $attributes['class'][] = 'form-type-' . strtr($element['#type'], '_', '-');
  }
  if (!empty($element['#name'])) {
    $attributes['class'][] = 'form-item-' . strtr($element['#name'], array(' ' => '-', '_' => '-', '[' => '-', ']' => ''));
  }
  // Add a class for disabled elements to facilitate cross-browser styling.
  if (!empty($element['#attributes']['disabled'])) {
    $attributes['class'][] = 'form-disabled';
  }
  $output = '<div' . drupal_attributes($attributes) . '>' . "\n";

  // If #title is not set, we don't display any label or required marker.
  if (!isset($element['#title'])) {
    $element['#title_display'] = 'none';
  }
  $prefix = isset($element['#field_prefix']) ? '<span class="field-prefix">' . $element['#field_prefix'] . '</span>' : '';
  $suffix = isset($element['#field_suffix']) ? '<span class="field-suffix">' . $element['#field_suffix'] . '</span>' : '';

  $wrap = !isset($element['#type']) || $element['#type'] <> 'checkbox';

  switch ($element['#title_display']) {
    case 'before':
    case 'invisible':
      if ($wrap) {
        $output .= ' <span class="label">' . theme('form_element_label', $variables) . '</span>';
        $output .= ' <span class="item">' . $prefix . $element['#children'] . $suffix . "</span>\n";
      }
      else {
        $output .= ' ' . theme('form_element_label', $variables);
        $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      }
      break;

    case 'after':
      if ($wrap) {
        $output .= ' <span class="item">' . $prefix . $element['#children'] . $suffix . '</span>';
        $output .= ' <span class="label">' . theme('form_element_label', $variables) . "</span>\n";
      }
      else {
        $output .= ' ' . $prefix . $element['#children'] . $suffix;
        $output .= ' ' . theme('form_element_label', $variables) . "\n";
      }
      break;

    case 'none':
    case 'attribute':
      // Output no label and no required marker, only the children.
      if ($wrap) {
        $output .= ' <span class="item">' . $prefix . $element['#children'] . $suffix . "</span>\n";
      }
      else {
        $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      }
      break;
  }

  if (!empty($element['#description'])) {
    $output .= '<div class="description">' . $element['#description'] . "</div>\n";
  }

  $output .= "</div>\n";

  return $output;
}

///**
// * Implements hook_date_combo_process_alter().
// */
//function jflex_date_combo_process_alter(&$element, &$form_state, $context) {
//  //$element['value']['#date_format'] = 'd/m/Y - H:i';
//}

/**
 * Implements hook_translated_menu_link_alter().
 *
 * Added the token for the link "flush-cache".
 *
 * @param $item
 * @param $map
 */
function jflex_translated_menu_link_alter(&$item, $map) {
  if ($item['menu_name'] == 'menu-admin-flex-additional' && $item['href'] == 'flex/flush-cache') {
    $item['localized_options']['query'] = array('token' => drupal_get_token('flex/flush-cache')) + drupal_get_destination();
  }
}

/**
 * Override theme_menu_link(array $vars) function
 *
 * Returns HTML for a menu link and submenu.
 *
 * @param $vars
 *   An associative array containing:
 *   - element: Structured array data for a menu link.
 *
 * @ingroup themeable
 *
 * @return string
 */
function jflex_menu_link($vars) {
  $element = $vars['element'];
  $sub_menu = '';
  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }
  if (isset($element['#localized_options']['attributes']['name'])) {
    $sub_menu .= ' <small>' . $element['#localized_options']['attributes']['name'] . '</small>';
  }
  $text = '<span>' . $element['#title'] . '</span>';
  $element['#localized_options']['html'] = TRUE;
  $output = l($text, $element['#href'], $element['#localized_options']);

  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/**
 * Alter the filter of "mefibs" module.
 *
 * Implements hook_mefibs_filter_alter().
 *
 * @param $filters
 */
function jflex_mefibs_filter_alter(&$filters) {
  // Clear the filters if we pressed the button "clean all"
  if (isset($_REQUEST['op']) && $_REQUEST['op'] == 'Очистить все') {
    if (isset($_SESSION['mefibs'])) {
      unset($_SESSION['mefibs']);
    }
    $filters = array();
    drupal_goto(base_path() . request_path());
  }

  // Clear the filters if we moved to other the a page
  if (isset($_SESSION['mefibs_q']) && $_SESSION['mefibs_q'] <> $_GET['q']) {
    if (isset($_SESSION['mefibs'])) {
      unset($_SESSION['mefibs']);
    }
    $filters = array();
  }
  $_SESSION['mefibs_q'] = $_GET['q'];
}

/**
 * Темизация хлебных крошек.
 *
 * @param $variables
 *
 * @return string
 */
function jflex_breadcrumb($variables) {
  $outp = '';
  $breadcrumb = $variables['breadcrumb'];
  $path_cur = menu_get_item();

  // Page taxonomy.
  if ($path_cur['path'] == 'taxonomy/term/%') {
    // Breadcrumbs.
    $breadcrumb_add = l(t('Online store'), 'shop/catalog');
    array_unshift($breadcrumb, $breadcrumb_add);
  }

  // Page user.
  if ($user_current_page = menu_get_object('user')) {
    // Hide tabs on the user page.
    $breadcrumb = array();
    $breadcrumb[] = l(t('Personal Area'), 'user/' . $user_current_page->uid);
    if (isset($user_current_page->realname)) {
      $breadcrumb[] = $user_current_page->realname;
    }
  }

  if ($ct = count($breadcrumb)) {
    $frontpage = variable_get('site_frontpage', '/');
    $home_link = l(t('Site'), $frontpage);
    if ($home_link <> $breadcrumb[0]) {
      array_unshift($breadcrumb, $home_link);
      $ct++;
    }
    $ul = $ct >= 5;
    // Revert.
    if ($ul) {
      $breadcrumb_temp = array();
      $breadcrumb_temp[] = array_shift($breadcrumb);
      $breadcrumb_slice = array_slice($breadcrumb, 0, $ct - 1);
      $breadcrumb_temp += array_reverse($breadcrumb_slice);
      $breadcrumb_temp[] = array_pop($breadcrumb);
      $breadcrumb = $breadcrumb_temp;
    }
    foreach ($breadcrumb as $key => $br) {
      if ($key == 0) {
        $outp .= '<span class="sep first">' . $br . '</span>';
      }
      elseif ($ul && $key == 1) {
        $outp .= '<span class="sep expanded">';
        $outp .= $br;
        $outp .= '<ul>';
      }
      elseif ($ct <> ($key + 1)) {
        if ($ul && $key > 0) {
          $outp .= '<li><span class="sep">' . $br . '</span></li>';
        }
        else {
          $outp .= '<span class="sep">' . $br . '</span>';
        }
      }
      elseif ($ct == ($key + 1)) {
        if ($ul) {
          $outp .= '</ul></span>';
        }
        $outp .= '<span class="sep last">' . $br . '</span>';
      }
    }

    // Page Node.
    if ($node = menu_get_object()) {
      switch ($node->type) {
        case 'article':
        case 'news':
          $outp .= l(t('Back'), 'news', array(
            'attributes' => array('class' => array('back__btn btn small simple icon icon-chevron-small-left')),
          ));
          break;
      }
    }

    return $outp;
  }
}

/**
 * Theme function for the attribute/option form
 */
function jflex_uc_order_attributes_form($variables) {
  $output = '';

  // Explain to the user that updating attributes with this form will not update the product pricing.
  $output .= '<p>' . t('<strong>PLEASE NOTE</strong>: Editing the attributes of this product will not automatically update the product\'s price, cost, or weight in the order. You must do this manually in the order editor or add the product to the order again from scratch.') . '</p><br />';

  // Alias the form variable.
  $form = $variables['form'];

  // If there are attributes, render them.
  if (!empty($form['attributes'])) {
    $attributes = element_children($form['attributes']);
  }
  if (!empty($attributes)) {

    // Give the existing attributes a title.
    $output .= '<h3>' . t('Existing Attributes') . '</h3>';

    // Create a table for the existing attributes and options.
    $table = array(
      'header' => array(),
      'rows' => array(),
      'attributes' => array(
        'id' => 'attributes-table',
      ),
    );

    // Add table headers.
    if (variable_get('uc_order_attributes_arbitrary', 0) && user_access('arbitrarily edit attribute data')) {
      $table['header']['attribute'] = t('Attribute');
    }
    $table['header']['option'] = t('Option');
    $table['header']['remove'] = t('Remove');
    $table['header']['order'] = t('Order');

    // Output the list of attributes/options as table rows.
    foreach ($attributes as $key) {
      $data = array();
      if (variable_get('uc_order_attributes_arbitrary', 0) && user_access('arbitrarily edit attribute data')) {
        $data[] = drupal_render($form['attributes'][$key]['attribute']);
      }
      $data[] = drupal_render($form['attributes'][$key]['option']);
      $data[] = drupal_render($form['attributes'][$key]['delete']);
      $data[] = drupal_render($form['attributes'][$key]['weight']);
      $table['rows'][] = array(
        'data' => $data,
        'class' => array('draggable'),
      );
    }

    // Theme the table
    $output .= theme('table', $table);
  }

  // Render the rest of the form
  $output .= drupal_render_children($form);

  // Give the user the ability to rearrange the attributes.
  drupal_add_tabledrag('attributes-table', 'order', 'sibling', 'weight');

  return $output;
}

/****************************************************
 * SUPPORT FUNCTIONS
 *****************************************************/

/**
 * Get logo jetoflex.
 *
 * @return string
 */
function jflex_theme_flex_copyright() {
  return variable_get('flex_license_copyright', '');
}

/**
 * Темизируем Jslider на странице товаров.
 *
 * @param array $images
 * @param null $jslider_options
 * @param null $jslider_main_options
 *
 * @return string
 */
function jflex_theme_jslider($images = array(), $jslider_options = NULL, $jslider_main_options = NULL) {
  $output = '';
  if ($jslider_main_options) {
    $jslider_main_options = ' data-slick-options=\'' . $jslider_main_options . '\'';
  }
  $output_default = '{
    "slidesToShow":5
  }';
  $jslider_options = $jslider_options ? $jslider_options : $output_default;
  if ($images && count($images['#items'])) {
    $output = '<div class="photo-block"><div class="product__slider views__slider js__slick js__slick-thumbs-master"' . $jslider_main_options . '>';
    $img_url_first = '';
    $img_first = TRUE;
    foreach ($images['#items'] as $key => $value) {
      $img_url = image_style_url('product_big', $value['uri']);
      if ($img_first) {
        $img_url_first = $img_url;
      }
      $img_first = FALSE;
      $output .= '<div class="slide">';
      $output .= '<a href="' . $img_url . '" class="jbox gallery-product"><img id="product-slide_' . $key . '" src="' . image_style_url('product_big', $value['uri']) . '" alt=""></a>';
      $output .= '</div>';
    }
    $output .= '</div>';
    $output .= '<div class="d-hide pv20 center"><a href="' . $img_url_first . '" class="jbox gallery-product btn_enlarge btn small simple icon i-search">' . t('увеличить') . '</a></div>';
    $output .= '<div class="product-control__slider views__slider js__slick js__slick-thumbs-slave" data-slick-options=\'' . $jslider_options . '\'>';
    foreach ($images['#items'] as $key => $value) {
      $output .= '<div class="slide">';
      $output .= '<a href="#" class="jbox"><img src="' . image_style_url('product_paginator', $value['uri']) . '" alt=""></a>';
      $output .= '</div>';
    }
    $output .= '</div></div>';
  }

  return $output ? $output : '';
}

/**
 * Get extended Mobile Detect device detection results.
 *
 * The returned array contains following values:
 * - mobile_detect_class: boolean
 * - ismobiledevice: boolean
 * - istablet: boolean
 * - useragent: string, the browser user agent
 * - prevent_device: boolean
 * - deskbrowser_usage: boolean
 * - tablet_usage: boolean
 * - device_type: string, the values are desktop or mobile
 * $device = mobile_switch_mobile_detect();
 * $device['ismobiledevice'];
 * $device['useragent'];
 *
 * Other (in the operating mode 'Do not use'):
 * global $msw_detect;
 * $msw_detect->isMobile();
 * $msw_detect->isTablet();
 *
 * @param bool $is_mobile
 * @param bool $getlabel
 *
 * @return mixed|null|string
 */
function jflex_get_device($is_mobile = FALSE, $getlabel = FALSE) {
  static $output = array();
  $key = $is_mobile . $getlabel;
  if (!isset($output[$key])) {
    $output[$key] = FALSE;
    if (module_exists('mobile_switch')) {
      $device = mobile_switch_mobile_detect();
      if ($device) {
        if ($device['device_type'] == 'mobile') {
          $device['label'] = empty($device['istablet']) ? t('Mobile device') : t('Tablet device');
        }
        else {
          $device['label'] = t('Desktop device');
        }
        if ($is_mobile) {
          return $device['ismobiledevice'];
        }
        elseif ($getlabel) {
          return $device['label'];
        }
      }
    }
  }

  return $output[$key];
}

/**
 * Получаем значение поля
 *
 * @param $entity
 * @param $field_name
 * @param bool|TRUE $once
 *
 * @return string
 */
function jflex_tf_val($entity, $field_name, $once = FALSE) {
  $output = '';
  if (is_object($entity)) {
    if (isset($entity->{$field_name}[LANGUAGE_NONE])) {
      if ($once) {
        $output = $entity->{$field_name}[LANGUAGE_NONE][0]['value'];
      }
      else {
        foreach ($entity->{$field_name}[LANGUAGE_NONE] as $value) {
          $output = $output ? $output . ' ' : $output;
          $output .= $value['value'];
        }
      }
    }
  }

  return $output;
}

/****************************************************
 * Functions.
 *****************************************************/

/**
 * Get discounts for product for all items.
 *
 * @param $order
 *
 * @return array
 *  opid => discount
 */
function jflex_order_get_discount_products_item($order) {
  $discount_products = array();
  // validate, if coupon exist on site.
  if (!empty($order) && is_object($order)) {
    // Get line_items witch coupons.
    foreach ($order->line_items as $item) {
      switch ($item['type']) {

        // Module uc_coupon.
        case 'coupon':
          foreach ($order->products as $product) {
            $discount_coupon = 0;
            $coupon_codes = array();
            // Write data about coupon in order dada.
            if (!empty($order->data['coupons'])) {
              // Get line_items witch coupons.
              $coupon_codes[] = $item['data']['code'];
              if ($coupon_codes) {
                foreach ($coupon_codes as $coupon_code) {
                  if (isset($order->data['coupons'][$coupon_code][$product->nid])) {
                    $discount_coupon = abs($order->data['coupons'][$coupon_code][$product->nid]->discount);
                    $discount_coupon = $discount_coupon / $product->qty;
                  }
                }
              }
            }
            else {
              // Get line_items witch coupons.
              $discount_coupon += abs($item['amount']);
              $discount_coupon = $discount_coupon ? $discount_coupon / $order->product_count : 0;
            }
            if ($discount_coupon) {
              if (isset($discount_products[$product->order_product_id]['amount'])) {
                $discount_products[$product->order_product_id]['amount'] += $discount_coupon;
              }
              else {
                $discount_products[$product->order_product_id]['type'] = $item['type'];
                $discount_products[$product->order_product_id]['amount'] = $discount_coupon;
                $discount_products[$product->order_product_id]['code'] = $item['data']['code'];
              }
            }
          }

          break;

        // Module uc_discount_logic.
        case 'uc_discount_logic':
          //$discount_uc_discount_logic = 0;
          foreach ($order->products as $product) {
            if (isset($item['data']['opids'][$product->order_product_id])) {
              $disc = $item['data']['opids'][$product->order_product_id];
              //$discount_uc_discount_logic = (float) number_format(($disc['amount'] / $disc['qty']), 2, '.', '');
              $discount_uc_discount_logic = (float) number_format(($disc['amount'] / $product->qty), 2, '.', '');
              if ($discount_uc_discount_logic) {
                if (isset($discount_products[$product->order_product_id]['amount'])) {
                  $discount_products[$product->order_product_id]['amount'] += $discount_uc_discount_logic;
                }
                else {
                  $discount_products[$product->order_product_id]['type'] = $item['type'];
                  $discount_products[$product->order_product_id]['amount'] = $discount_uc_discount_logic;
                }
              }
            }
          }
          break;
      }
    }
  }

  return $discount_products;
}