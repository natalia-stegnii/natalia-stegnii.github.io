<!doctype html>
<html>
<head>
	<meta http-equiv="Content-type" content="text/html; charset=<?php bloginfo('charset'); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php wp_title('«', true, 'right'); ?> <?php bloginfo('name'); ?></title>
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<title>Appe</title>
    <link rel="stylesheet" href="../wp-content/themes/Appe/css/bootstrap-grid.min.css">
    <link rel="stylesheet" href="../wp-content/themes/Appe/css/bootstrap.min.css">
	<link rel="stylesheet" data-autoreload="true" href="../wp-content/themes/Appe/css/styles.css">
    <script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
    <?php wp_head(); ?>
</head>


<body <?php body_class(); ?>>

<div id="wrapper">
	<header>
	<nav class="navbar navbar-expand-lg">
	  <a class="navbar-brand" href="#">
	  	<img src="/wp-content/themes/Appe/img/appell-logo-black.png" alt="logo">
	  </a>
	  
	  <div class="collapse navbar-collapse" id="navbarText">
	  	<?php
			if ( has_nav_menu('menutop') ) wp_nav_menu( array('theme_location' => 'menutop', 'menu_class' => 'navbar-nav'));
		?>

	  </div>
		 <div class="button_link header-qoute">
		      <a href=""> GET A QUOTE
		       </a>
		 </div> 
		 <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation" onclick="myFunction(this)">
		 	<div class="flex">
			 	<div class="mobile-menu">MENU</div>
			 	<div>
				  <div class="bar1"></div>
				  <div class="bar2"></div>
				  <div class="bar3"></div>
				</div>
			</div>
	  </button>
	</nav>
	</header>
