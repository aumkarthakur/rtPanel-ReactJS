<?php
/**
 * rtPanel React JS functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package rtPanel_React_JS
 */

if ( ! function_exists( 'rtpanel_react_js_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function rtpanel_react_js_setup() {
		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'rtpanel-react-js' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form'
			) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( 'after_setup_theme', 'rtpanel_react_js_setup' );


/**
 * Enqueue scripts and styles.
 */
function rtpanel_react_js_scripts() {
	// wp_enqueue_style( 'rtpanel-react-js-style', get_stylesheet_uri());
	wp_enqueue_style( 'rtpanel-react-js-googlefont', 'https://fonts.googleapis.com/css?family=Poppins:300,400,500,700' );

	wp_enqueue_script( 'rtpanel-react-js-bundle', get_template_directory_uri() . '/lib/bundle.js', array(), '20151215', true );

	// wp_enqueue_script( 'rtpanel-react-js-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

}
add_action( 'wp_enqueue_scripts', 'rtpanel_react_js_scripts' );


/**
 * Removing Emojis Because I want to make ctrl + u cleaner :P 
 */
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

/**
 * Removing Useless wp-embed script. I'm not using older version of WordPress 
 */
function my_deregister_scripts(){
  wp_deregister_script( 'wp-embed' );
}
add_action( 'wp_footer', 'my_deregister_scripts' );

/**
 *  If you want thrid party service to change your blog post then comment following code
 */
remove_action ('wp_head', 'rsd_link');
/**
 *  If you are using Windows Live Writer to manage WordPress then comment following code
 */
remove_action( 'wp_head', 'wlwmanifest_link');
/*
 * Changing WordPress Excerpt Length
 */
function rtpanel_react_js_excerpt_length( $length ) {
	return 20;
}
add_filter( 'excerpt_length', 'rtpanel_react_js_excerpt_length', 999 );
/**
 * Extending Rest API to support Menus
 */
function  rtpanel_react_js_get_menu() {
    return wp_get_nav_menu_items('menu-1');
}

add_action( 'rest_api_init', function () {
        register_rest_route( 'extended', '/menu', array(
        'methods' => 'GET',
        'callback' => 'rtpanel_react_js_get_menu',
    ) );
} );
/**
 * Extending Rest API to support Featured Image
 */
add_action( 'rest_api_init', 'rtpanel_react_js_add_thumbnail_to_JSON' );
function rtpanel_react_js_add_thumbnail_to_JSON() {
register_rest_field( 'post',
    'featured_image_src',
    array(
        'get_callback'    => 'rtpanel_react_js_get_image_src',
        'update_callback' => null,
        'schema'          => null,
         )
    );
}

function rtpanel_react_js_get_image_src( $object, $field_name, $request ) {
    $size = 'medium';
    $feat_img_array = wp_get_attachment_url($object['featured_media']);
    if($feat_img_array){
    	return $feat_img_array;
    }
    else{
   		return get_template_directory_uri().'/images/placeholder.png';
   	}
}
/**
 * Disabling WordPress auto URL Guess
 */
remove_filter('template_redirect', 'redirect_canonical'); 