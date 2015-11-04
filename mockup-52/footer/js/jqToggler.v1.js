jQuery(function() {
  var $;
  $ = jQuery;

  /**
   * "toggler" plug-in to jQuery. Use this to setup on element to be
   * a trigger to cause another element to animate open and closed.
   *
   * @return {jQuery} for chaining
   */
  $.fn.toggler = function() {

    /**
     * private function to open or close target elements
     * @param {jQuery} $targets A jquery nodeList of elements to open
     *                          or close.
     */
    var $togglers, toggleTargets;
    toggleTargets = function($targets, className) {
      return $targets.each(function(index, elem) {
        var $target, firstChild, lastChild, toHeight;
        $target = $(elem);
        if ($target.hasClass(className)) {
          firstChild = $target.children().first()[0];
          lastChild = $target.children().last()[0];
          toHeight = lastChild.offsetHeight + lastChild.offsetTop - firstChild.offsetTop;
          return $target.css('height', toHeight + "px");
        } else {
          $target.css('height', '0');
          return $target.css('height', '');
        }
      });
    };

    /**
     * A jQuery nodeList of toggler elements
     * @type {jQuery}
     */
    $togglers = this;

    /*
     */
    $togglers.each(function(index, elem) {
      (function($toggler) {
        var $targets, toggle;
        $targets = $($toggler.data('menu') || $toggler.data('target'));
        toggle = toggleTargets.bind(null, $targets, 'open');
        $toggler.css('cursor', 'pointer').on('click', function(ev) {
          ev.preventDefault();
          $targets = $($toggler.data('menu') || $toggler.data('target'));
          $targets.toggleClass('open');
          $toggler.toggleClass('open');
          return toggle();
        }).blur();
        if ($toggler[0].tagName === 'A') {
          $toggler.attr('href', '#');
        }
        return $(window).on('resize', toggle);
      })($(elem));
      return $togglers;
    });
    return $togglers;
  };
  console.log('loaded jqToggler');
});

//# sourceMappingURL=jqToggler.v1.js.map
