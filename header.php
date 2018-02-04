<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package rtPanel_React_JS
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">

	<?php wp_head(); ?>
	<script type="text/javascript">
		var baseURL = "<?php echo get_bloginfo('url'); ?>";
		var siteTITLE = "<?php echo get_bloginfo('name'); ?>";
	</script>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">


	<div id="content" class="site-content">