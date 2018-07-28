<?php
add_filter( 'wpcf7_form_elements', 'delicious_wpcf7_form_elements' );
 
function delicious_wpcf7_form_elements( $form ) {
$form = do_shortcode( $form );
return $form;
}


register_nav_menus( array(
		'menutop' => __( 'Menu Top', 'identifikator-dlya-perekladu' )
	));
?>