(function($) {
  return $.fn.blockWrapMe = function(wrappingBlockSelector, belowAnchorClassName) {
    var $anchor, $blocks, checkPositions;
    if (belowAnchorClassName == null) {
      belowAnchorClassName = 'below-anchor';
    }
    $anchor = this;
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
     */
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
    checkPositions();
    $(window).on('load resize', checkPositions);
    return this;
  };
})(jQuery);

//# sourceMappingURL=jqBlockWrapMe.js.map
