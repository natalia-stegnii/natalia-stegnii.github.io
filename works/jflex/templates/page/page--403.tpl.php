<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language; ?>" version="XHTML+RDFa 1.0" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>>

<head profile="<?php print $grddl_profile; ?>">
  <?php print $head; ?>
  <meta name="robots" content="noarchive">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title><?php print $head_title; ?></title>
  <?php print $styles; ?>
  <?php print $scripts; ?>
</head>
<body id="major" <?php print $attributes; ?> class="page-404 <?php if ($is_front): ?>front <?php else: ?>sub <?php endif; ?> <?php print $classes; ?>">

<div class="hold pad-h">
  <div class="row">
    <div class="col d3 t2 m12"></div>

    <div class="col d6 t8 m12">
      <div class="page-404__content center">
        <div class="mistake__block">
          <div class="number bold t_red">403</div>
          <div class="text bold"><?php print t('Access denied'); ?></div>
          <a href="/" class="btn small bold s_red"><?php print t('Back to front'); ?></a>

        </div>

        <div class="description"><?php print t('Requested page display is not allowed. Login to access this page.'); ?></div>

        <div id="developer-from" class="developer-from centrify inlb"><?php print $flex_copyright; ?></div>

      </div>

    </div>

    <div class="col d3 t2 m12"></div>

  </div>
</div>

<?php print $page_bottom; ?>
</body>
</html>