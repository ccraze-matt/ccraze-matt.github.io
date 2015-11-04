(function($) {
  $.fn.blockWrapMe = function(wrappingBlockSelector, belowAnchorClassName) {
    var $anchor, $blocks, base, checkPositions, log;
    if (belowAnchorClassName == null) {
      belowAnchorClassName = 'below-anchor';
    }

    /**
     *
     * Define an alias for console.log, or a no-op function if
     * console.log does not exist.
     *
     * @return {function} An alias for console.log or noop.
     *
     */
    log = (typeof $m !== "undefined" && $m !== null ? $m.log : void 0) || (typeof console !== "undefined" && console !== null ? typeof (base = console.log).bind === "function" ? base.bind(console) : void 0 : void 0) || function() {};

    /*
     *
     * The float anchor is the element on which this jquery method
     * was called.
     *
     * We're currently only supporting a single anchor element. But there's
     * probably not much more coding/testing to do before we can support
     * multiple floated anchors, if necessary.
     *
     */
    $anchor = this;

    /*
     *
     * our single argument defines the selector we'll use to identify
     * all of elements that are expected to block-wrap the anchor.
     *
     */
    $blocks = $(wrappingBlockSelector);

    /*
     *
     * function checkPositions()
     *
     *    Determine bottom edge of anchor element and top edge of
     *    each wrapping element. If the top edge of the wrapping element
     *    is at or below the bottom of the anchor element, then add the
     *    class name (default = 'below-anchor') to that wrapping element.
     *
     * Don't bother trying to block-wrap anything if the
     * getBoundingClientRect function does not exist.
     *
     */
    if (typeof Element.getBoundingClientRect === 'function') {
      checkPositions = function() {
        var anchorRect;
        anchorRect = $anchor[0].getBoundingClientRect();
        return $blocks.each(function(index, elem) {
          var bRect;
          bRect = elem.getBoundingClientRect();
          if (bRect.top >= anchorRect.bottom) {
            return $(elem).addClass(belowAnchorClassName);
          } else {
            return $(elem).removeClass(belowAnchorClassName);
          }
        });
      };
    } else {
      checkPositions = $m.noop;
    }

    /*
     *
     * We're using a 3-step process to effectively managing
     * the flow of elements around one or more floating elements.
     *
     *   1. when dom is ready, calculate float positions.
     *   2. when window content is fully loaded (when first content
     *      flow is complete), calculate float positions again.
     *   3. whenever the window is resized, calculate float positions
     *      again.
     *
     * What's missing? When the floated anchor content is replaced,
     * e.g. to display a different product image, we have no
     * notification to catalyze another recalculation of float
     * positions.
     *
     */

    /*
     * check flow positions right now, while this code is loading.
     */
    checkPositions();

    /*
     * check again as soon as the html content is finished loading.
     * and again whenever the window is resized.
     */
    $(window).on('load resize', $m.debounce(checkPositions));
    return this;
  };
})(jQuery);

//# sourceMappingURL=jquery.blockWrapMe.js.map
