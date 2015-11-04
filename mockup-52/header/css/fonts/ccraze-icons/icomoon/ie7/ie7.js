/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-account': '&#x61;',
		'icon-cart-outline': '&#x62;',
		'icon-cart': '&#x63;',
		'icon-magnify': '&#x65;',
		'icon-phone': '&#x66;',
		'icon-email-outline': '&#x67;',
		'icon-email': '&#x68;',
		'icon-contact': '&#x69;',
		'icon-cart-open': '&#x64;',
		'icon-uni30': '&#x30;',
		'icon-uni31': '&#x31;',
		'icon-uni32': '&#x32;',
		'icon-uni33': '&#x33;',
		'icon-uni34': '&#x34;',
		'icon-uni35': '&#x35;',
		'icon-uni36': '&#x36;',
		'icon-uni37': '&#x37;',
		'icon-uni38': '&#x38;',
		'icon-uni39': '&#x39;',
		'icon-uni3A': '&#x3a;',
		'icon-uni3B': '&#x3b;',
		'icon-document-fill': '&#x6a;',
		'icon-minus-alt': '&#x6b;',
		'icon-bolt': '&#x6c;',
		'icon-error': '&#x6d;',
		'icon-warning': '&#x6e;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
