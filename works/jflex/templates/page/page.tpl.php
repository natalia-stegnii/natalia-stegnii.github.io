<?php

/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template in this directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see template_process()
 * @see html.tpl.php
 *
 * @ingroup themeable
 */
?>
<div class="fullpage<?php if (!empty($page['menu_adminflex'])): ?> adminflex<?php endif; ?><?php if (!empty($page['livechat'])): ?> livechat<?php endif; ?>">
  <div class="fulldata">
    <header>
      <div class="top-line">
        <div class="hold pad-h">
          <div class="row sp-10">
            <div class="col d3 t4">
              <?php if (!empty($page['cityselect'])): ?>
                <div class="city-select__wrap">
                  <div class="title icon icon-uniE61B"><?php print t('Your location:'); ?></div>
                  <div class="city-select">
                    <!--block-target-locatidon / Выбор города пользователя-->
                    <?php print render($page['cityselect']); ?>
                  </div>
                </div>
              <?php endif; ?>
            </div>

            <div class="col d5">
              <?php if (!empty($page['menu_corp'])): ?>
                <div class="corporate-menu">
                  <!--block-menu / Корпоративное меню-->
                  <?php print render($page['menu_corp']); ?>
                </div>
              <?php endif; ?>
            </div>

            <div class="col d4 t3">
              <div class="row sp-10">
                <div class="col d6 t12">
                  <div class="user-menu menu expanded">
                    <!--Меню пользователя-->
                    <?php if (!empty($page['menu_user'])): ?>
                      <?php print render($page['menu_user']); ?>
                    <?php endif; ?>
                  </div>
                </div>

                <div class="col d6">
                  <?php print l(t('Cart') . ' <span class="qty-items cart-qty-items">' . $cart_qty . '</span>', 'cart', array(
                    'attributes' => array('class' => array('btn_cart-link icon icon-shopping-cart')),
                    'html' => TRUE,
                  )); ?>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div><!--top-line-->

      <div class="mid-line">
        <div class="hold pad-h">
          <div class="row middle sp-10">
            <div class="col d3 t12">
              <?php if ($logo): ?>
                <div class="logo__wrap">
                  <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" class="logo">
                    <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" class="retina" />
                  </a>
                </div>
              <?php endif; ?>
              <?php if ($site_slogan): ?><h1 class="slogan smallest"><?php if ($is_front): ?><?php print $site_slogan; ?><?php else: ?><?php print render($page['pagetitleslogan']); ?><?php endif; ?></h1><?php endif; ?>
            </div>

            <div class="col d5 t12">
              <?php if (!empty($page['search'])): ?>
                <div class="site-search globalsearch mm-menu__search">
                  <!--block-search / Поиск-->
                    <?php print render($page['search']); ?>
                </div>
              <?php endif; ?>
            </div>

            <div class="col d4 t12">
              <div class="phone">
                <?php if (!empty($page['tel_first'])): ?>
                  <?php print render($page['tel_first']); ?>
                <?php endif; ?>
                <a href="#hidden .recall" class="jbox call-back dashed"><?php print t('Call me back'); ?></a>
              </div>
              <div class="schedule">
                <?php if (!empty($page['openhours'])): ?>
                  <?php print render($page['openhours']); ?>
                <?php endif; ?>
              </div>
            </div>

          </div>
        </div>
      </div><!--mid-line-->
    </header>

    <div id="main-menu" class="js__fixed-menu main-menu d-menu menu main justify expanded">
      <div class="hold pad-h">
        <!--block-menu-block / Меню каталога-->
        <?php if (!empty($page['menu_catalogshop'])): ?>
          <?php print render($page['menu_catalogshop']); ?>
        <?php endif; ?>
      </div>
    </div><!--main-menu-->

    <div class="block-system">
      <div class="hold pad-h">
        <div class="tabs-content">
          <div class="block-messages">
            <?php print $messages; ?>
          </div>
          <?php if (empty($is_tabs_hide)): ?>
            <?php print render($tabs); ?>
            <?php print render($action_links); ?>
            <?php print render($tabs2); ?>
          <?php endif; ?>
        </div>
      </div>
    </div>

    <?php if (!empty($breadcrumb_show) && !empty($breadcrumb)): ?>
      <div class="breadcrumb" id="breadcrumb">
        <div class="hold pad-h">
          <?php if (!empty($breadcrumb)): ?>
            <?php print $breadcrumb; ?>
          <?php endif; ?>
          <?php if (!empty($back_catalog)): ?>
            <a href="<?php print $back_catalog; ?>" class="btn small simple inlb"><?php print t('back'); ?></a>
          <?php endif; ?>
        </div>
      </div><!--breadcrumb-->
    <?php endif; ?>

      <!--Title-->
    <?php if ($is_title): ?>
      <div class="hold pad-h contextual-links-region">
        <?php print render($title_suffix); ?>
        <h1 class="title page-title" id="page-title"><?php print $title; ?><?php print $title_suffix_text; ?></h1>
        <?php print render($title_suffix); ?>
      </div>
    <?php else: ?>
      <div class="contextual-links-region">
        <?php print render($title_suffix); ?>
        <?php print render($title_suffix); ?>
      </div>
    <?php endif; ?>

    <?php if (!empty($page['fullpage_top'])): ?>
      <div class="page-top pad-h hold"><?php print render($page['fullpage_top']); ?></div>
    <?php endif; ?>

    <?php if ($is_front): ?>
      <?php if (!empty($page['content'])): ?>
        <div class="content-data"><?php print render($page['content']); ?></div>
      <?php endif; ?>

    <?php else: ?>
      <div class="content__wrap">
        <div class="hold pad-h">
          <?php if (!empty($page['leftside']) || !empty($page['rightside']) || !empty($page['filters']) || !empty($page['content_top'])): ?>
            <?php $class_element = !empty($is_category) ? ' class="catalog"': ''; ?>
            <div<?php print $class_element; ?>>
              <div class="row sp-10">
                <?php if (!empty($page['leftside']) || !empty($page['filters'])): ?>
                  <div class="col d3 t4 m12">
                    <div class="leftside">
                      <?php if (!empty($page['leftside'])): ?>
                        <?php print render($page['leftside']); ?>
                      <?php endif; ?>
                      <?php if (!empty($page['filters'])): ?>
                        <div class="filters-content__wrap">
                          <a href="#filters-content" class="btn small s_grey center mb10 jbox d-hide t-hide"><?php print t('Show filters'); ?></a>
                          <div id="filters-content" class="filters-content">
                            <?php print render($page['filters']); ?>
                            <div class="filters-content__nav d-hide t-hide">
                              <div class="js__jbox-close btn small s_orange"><?php print t('показать результаты'); ?></div>
                            </div>
                          </div>
                        </div>
                      <?php endif; ?>
                    </div>
                  </div>
                <?php endif; ?>
                <?php $class_element = !empty($page['leftside']) || !empty($page['rightside']) || !empty($page['filters']) ? ' class="col d9 t8 m12"': ''; ?>
                <div<?php print $class_element; ?>>
                  <?php if (!empty($page['content_top'])): ?>
                    <?php print render($page['content_top']); ?>
                  <?php endif; ?>
                  <?php if (!empty($page['content'])): ?>
                    <div class="content-data"><?php print render($page['content']); ?></div>
                  <?php endif; ?>
                </div>

                <?php if (!empty($page['rightside'])): ?>
                  <div class="col d3 t4 m12">
                    <div class="rightside">
                      <?php if (!empty($page['rightside'])): ?>
                        <?php print render($page['rightside']); ?>
                      <?php endif; ?>
                    </div>
                  </div>
                <?php endif; ?>

              </div>
            </div>
          <?php else: ?>
            <?php if (!empty($page['content'])): ?>
              <div class="content-data"><?php print render($page['content']); ?></div>
            <?php endif; ?>
          <?php endif; ?>
        </div>
      </div>

      <?php if (!empty($page['infoblocks'])): ?>
        <?php print render($page['infoblocks']); ?>
      <?php endif; ?>

    <?php endif; ?>
    <?php if (!empty($page['content_bottom'])): ?>
      <?php print render($page['content_bottom']); ?>
    <?php endif; ?>

  </div> <!--fulldata-->

  <?php if (!empty($page['footer'])): ?>
    <?php print render($page['footer']); ?>
  <?php endif; ?>

  <div id="developer-from" class="developer-from"><?php print $flex_copyright; ?></div>

  <?php if (!empty($page['bottom'])): ?>
    <?php print render($page['bottom']); ?>
  <?php endif; ?>
</div> <!--fullpage-->


<?php if (!empty($page['menu_adminflex'])): ?>
  <div class="menu_adminflex__wrap">
    <div class="additions">
      <a href="/" class="logo__wrap">
        <div id="logo-preloader" class="preloader">
          <div class="preloader__content">
            <div class="spinner box_1 spinner"></div>
            <div class="spinner box_2 delay_1"></div>
            <div class="spinner box_3 delay_2"></div>
            <div class="spinner box_4 delay_3"></div>
            <div class="box_5"></div>
          </div>
        </div>
      </a>
      <div class="menu_adminflex"><?php print render($page['menu_adminflex_add']); ?></div>
    </div>
    <div class="menu_adminflex operations"><?php print render($page['menu_adminflex']); ?></div>
  </div>
<?php endif; ?>


<div class="capture__wrap">
  <div id="capture" class="capture">
    <?php if (!empty($page['capture'])): ?>
      <?php print render($page['capture']); ?>
    <?php endif; ?>
  </div>
</div>

<?php if (!empty($page['cart'])): ?>
  <div class="btn_cart__wrap">
    <div class="buttons__box">
      <div class="btn_cart icon-shopping-cart js__et-cart-toggler">
        <span class="qty cart-qty-items"><?php print $cart_qty; ?></span>
      </div>
      <a href="/compare/me" class="btn_compare icon-uniE65B<?php print $node_compare_count_class; ?>">
        <span class="node-compare-expand-qty-ajax qty"><?php print $node_compare_count; ?></span>
      </a>
      <a href="/shop/favorites" class="btn_like icon-uniE657<?php print $flag_product_favorites_count_class; ?>">
        <span class="flag-expand-product-favorites-qty-ajax qty"><?php print $flag_product_favorites_count; ?></span>
      </a>
    </div>
    <div id="cart-content" class="cart__wrap cart-content">
      <div class="cart__box">
        <?php print render($page['cart']); ?>
      </div>
    </div>
  </div><!--btn_cart__wrap-->
<?php endif; ?>

<!--noindex-->

<div id="mm-menu" class="mm-menu t-menu m-menu shadow">
  <div class="tabs-nav blank small tab-name-wrap" data-selector=".m-panel">
    <div class="tab-name navigation first" data-tn-id="1"></div>
  </div>
  
  <div class="mm-menu__search-link js__search-et-toggler i-search" data-et-target=".mm-menu__search"></div>

  <div class="links__wrap">
    <a href="/compare/me" class="icon icon-uniE65B<?php print $node_compare_count_class; ?>">
      <span class="node-compare-expand-qty-ajax qty"><?php print $node_compare_count; ?></span>
    </a>
    <a href="/shop/favorites" class="icon icon-uniE657<?php print $flag_product_favorites_count_class; ?>">
      <span class="flag-expand-product-favorites-qty-ajax qty"><?php print $flag_product_favorites_count; ?></span>
    </a>
    <?php if (!empty($page['filters'])): ?>
      <a href="#filters-content" class="icon icon-uniE747 filters-link jbox"></a>
    <?php endif; ?>
    <?php if (user_is_logged_in()): ?>
      <a href="/user/<?php print $user->uid; ?>/edit" class="icon icon-uniE6D3"></a>
    <?php endif; ?>
    <?php if ($show_mobile_tab_cart): ?>
      <a href="#cart-content" class="icon icon-shopping-cart jbox"><span class="cart-qty-items"></span></a>
    <?php endif; ?>
  </div>
</div>

<div id="m-panel" class="m-panel">
  <div class="tab-page navigation" data-tp-id="1">
    <ul class="menu">
      <li><a class="home" href="/"><?php print t('Front'); ?></a></li>
    </ul>
    <?php if (!empty($page['menu_catalogshop'])): ?>
      <?php print render($page['menu_catalogshop']); ?>
    <?php endif; ?>
    <?php if (!empty($page['menu_corp'])): ?>
      <?php print render($page['menu_corp']); ?>
    <?php endif; ?>
    <?php if (!empty($page['menu_visitors'])): ?>
      <?php print render($page['menu_visitors']); ?>
    <?php endif; ?>
  </div>
</div>

<?php if (!empty($page['livechat'])): ?>
  <?php print render($page['livechat']); ?>
<?php endif; ?>

<!--/noindex-->

<?php if (!empty($page['counters'])): ?>
  <div id="counters" class="hidden">
  <?php print render($page['counters']); ?>
  </div>
<?php endif; ?>

<?php if (!empty($page['flex_theme']) && !user_is_anonymous()): ?>
  <?php print render($page['flex_theme']); ?>
<?php endif; ?>

<?php if (!empty($page['hidden'])): ?>
  <div id="hidden" class="hidden">
    <?php print render($page['hidden']); ?>
  </div>
<?php endif; ?>