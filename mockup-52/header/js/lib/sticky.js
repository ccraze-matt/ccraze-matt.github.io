jQuery(function($) {
  var $condoms, $stickies, checkStickies, initStickies, log, scrollY;
  log = $m.noop;
  scrollY = function() {
    return window.pageYOffset || document.documentElement.scrollTop || 0;
  };
  $stickies = $condoms = null;
  checkStickies = function() {
    log('checkStickies(). yOffset:', scrollY());
    return $stickies.each(function(i, sticky) {
      var $condom, $sticky, cRect, condom, sRect;
      condom = sticky.parentNode;
      $sticky = $(sticky);
      $condom = $(condom);
      sRect = sticky.getBoundingClientRect();
      cRect = condom.getBoundingClientRect();
      log('$sticky #', i, 'top:', sRect.top, 'height:', sRect.height, sticky);
      log('$condom #', i, 'top:', cRect.top, condom);
      if (cRect.top <= 0) {
        $sticky.addClass('stickied');
        return $condom.addClass('stickied').height(sRect.height);
      } else {
        $sticky.removeClass('stickied');
        return $condom.removeClass('stickied').height('');
      }
    });
  };
  $(window).on('scroll', function() {
    return requestAnimationFrame(checkStickies);
  });
  initStickies = (function() {
    $stickies = $('.sticky');
    $stickies.each(function(i, sticky) {
      var $s;
      $s = $(sticky);
      return $('<div>').addClass('sticky-condom').attr('rel', 'protection').insertBefore($s).append($s);
    });
    $condoms = $stickies.parent();
    log('$stickies', $stickies);
    return log('$condoms', $condoms);
  })();
  checkStickies();
  log('loaded sticky lib');
  window.$stickies = $stickies;
  return window.$condoms = $condoms;
});

console.log('read sticky lib');

//# sourceMappingURL=sticky.js.map
