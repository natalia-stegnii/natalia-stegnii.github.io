<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">
  <head>
    <title><?php print $head_title; ?></title>
    <meta http-equiv="refresh" content="60" />
    <?php print $head; ?>
    <?php print $styles; ?>
    <?php print $scripts; ?>
  </head>
  <body class="<?php print $classes; ?>">
      <div class="loader"><div class="bar"></div></div>
      <div class="maintenance">
        <div class="logo l"></div>
        <div class="proccess l"></div>
        <div class="data l"><?php print $content; ?></div>
      </div>

  </body>
</html>