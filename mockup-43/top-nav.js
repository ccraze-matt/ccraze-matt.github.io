(function() {

  /*
   * We should probably refactor this to use jquery. When I wrote this
   * I didn't realize, or I guess forgot, that we were already loading
   * jquery in our pages.
   */
  var enableTopNavAnimation;
  enableTopNavAnimation = function() {
    var hideImage, ni, nt, ntHeight, showImage, tl, tn;
    tn = document.querySelector('.top-nav');
    nt = document.querySelector('.nav-text');
    ni = document.querySelector('.nav-image');
    tl = document.querySelector('#topside_logo > a');
    showImage = function() {
      ni.style.height = '98px';
      return tl.style.top = '-88px';
    };
    hideImage = function() {
      ni.style.height = '0';
      return tl.style.top = '0';
    };

    /*
     * make sure the bottom of our rising tabs-image rests on top
     * of the tabs-text.
     * we probably have to recalculate this when the window resizes
     * or the zoom level changes (does zoom change trigger window resize?)
     */
    ntHeight = parseFloat(window.getComputedStyle(nt).getPropertyValue('height')) + parseFloat(window.getComputedStyle(nt).getPropertyValue('border-top-width')) + parseFloat(window.getComputedStyle(nt).getPropertyValue('padding-top')) + parseFloat(window.getComputedStyle(nt).getPropertyValue('padding-bottom')) + parseFloat(window.getComputedStyle(nt).getPropertyValue('border-bottom-width'));
    ni.style.bottom = ntHeight + 'px';
    tn.addEventListener('mouseover', showImage, false);
    return tn.addEventListener('mouseout', hideImage, false);
  };
  document.addEventListener('DOMContentLoaded', enableTopNavAnimation, false);
})();

//# sourceMappingURL=top-nav.js.map
