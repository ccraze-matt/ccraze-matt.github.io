(function() {
  var calculateDifference, cutoff, updateDisplay;
  cutoff = new Date('2015-07-21T15:31:13.316Z');
  calculateDifference = function() {
    var diff, hours, minutes, now;
    now = new Date();
    diff = cutoff - now;
    if (diff <= 0) {
      return;
    }

    /* convert diff to minutes */
    diff = diff / 1000 / 60;
    hours = diff / 60;
    minutes = parseInt((hours - parseInt(hours)) * 60);
    hours = parseInt(hours);
    return {
      hours: hours,
      minutes: minutes
    };
  };
  updateDisplay = function($element, value) {
    var digits;
    digits = value.toString().split('');
    if (digits.length > 2) {

      /* we don't expect this to happen */
      return false;
    }
    if (digits.length === 1) {

      /* if we have only one digit, then we need
          to hide one of our display digits.
          or maybe just leave it blank.
          we can leave it black by setting its digit to
          0 and its foreground color to black or dark gray.
       */
      $element.find('.clock-digit:nth-child(1)').text('0').css('color', '#777');
      $element.find('.clock-digit:nth-child(2)').text(digits[0]);
      if (digits[0] === '0') {
        $element.find('.clock-digit:nth-child(2)').css('color', '#777');
      } else {
        $element.find('.clock-digit:nth-child(2)').attr('style', '');
        $element.find('.clock-digit:nth-child(2)').removeAttr('style');
      }
      return;
    }

    /* otherwise, we have a 2 digit hours value to display. */
    $element.find('.clock-digit:nth-child(1)').text(digits[0]);
    return $element.find('.clock-digit:nth-child(2)').text(digits[1]);
  };
  $(function() {
    var $guarantee, $hours, $minutes, updateCountdown;
    $guarantee = $('.ship-fast .guarantee');
    $hours = $('.ship-fast .hours');
    $minutes = $('.ship-fast .minutes');
    return (updateCountdown = function() {
      var diff;
      diff = calculateDifference();

      /* if diff is invalid, hide the guarantee and don't
          request another setTimeout cycle.
       */
      if (diff == null) {
        $guarantee.hide();
        return;
      }
      updateDisplay($hours, diff.hours);
      updateDisplay($minutes, diff.minutes);
      return setTimeout(updateCountdown, 5000);
    })();
  });
})();

//# sourceMappingURL=shiptime-countdown.js.map
