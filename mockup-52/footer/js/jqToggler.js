jQuery(function() {
  var $, config, log, togglersEnabledCurrently;
  $ = jQuery;

  /**
   * Shortcut to console.log
   * @type {function}
   */
  log = console.log.bind(console);

  /**
   * Configuration parameters
   * TODO: we should be able to override these settings with an
   *   object passed for initialization.
   * @type {Object}
   */
  config = {

    /**
     *
     * Wait at least this many milliseconds before doing any
     * reassessment while window is being resized.
     *
     * @type {int}
     */
    assessmentDelay: 100,

    /**
     *
     * This is the classname we either apply or remove from the
     * toggler and target elements.
     *
     * @type {string}
     */
    togglingClassName: 'open',

    /**
     *
     * when window size is this wide in pixels (or virtual pixels in
     * the case of a zoomed window or a retina display), toggle
     * functionality is removed, toggles are all left open, and targets'
     * `style.height` value is removed. See `assess` function for
     * more details.
     *
     * @type {integer}
     */
    widthBreakoint: 740
  };

  /**
   * Track the most recently known enabled/disabled status
   * of the togglers.
   * @type {Boolean}
   */
  togglersEnabledCurrently = false;

  /**
   *
   * @function jQuery.fn.toggler
   *
   * The main/initialization plugin functiosn which can be called
   * from any jQuery nodeList
   *
   * @return {jQuery nodeList} for chaining
   */
  return $.fn.toggler = function() {

    /**
     * @function init
     *
     * Just prep each toggler with references to its targets, as
     * specified in its `data-target` attribute.
     *
     * @return {jQuery nodeList} for chaining
     */
    var $togglers, assess, init, setAssessmentTimer, syncTogglerTargets, timer;
    init = function() {
      $togglers.each(function(index, toggler) {
        var $toggler;
        $toggler = $(toggler);
        toggler.$targets = $($toggler.data('target'));
      });
      window.$togglers = $togglers;
      return $togglers;
    };

    /**
     *
     * @function assess
     *
     * Scan the nodelist of toggler elements and their targets for
     * status -- assessing whether or not their toggle
     * functionality should be enabled.
     *
     * @return {jQuery nodeList} for chaining
     */
    assess = function() {
      var togglersShouldBeEnabled;
      togglersShouldBeEnabled = window.innerWidth < config.widthBreakoint;
      if (togglersShouldBeEnabled) {
        if (!togglersEnabledCurrently) {
          $togglers.on('click.toggler', function() {
            var $this;
            $this = $(this);
            $this.toggleClass(config.togglingClassName);
            return syncTogglerTargets($this);
          }).css('cursor', 'pointer');
        }
      } else {
        if (togglersEnabledCurrently) {
          $togglers.off('click.toggler').css('cursor', '');
        }
      }
      togglersEnabledCurrently = togglersShouldBeEnabled;
      $togglers.each(function(index, toggler) {
        var $toggler;
        $toggler = $(toggler);
        return syncTogglerTargets($toggler);
      });
      return $togglers;
    };

    /**
     *
     * @function syncTogglerTargets
     *
     * Sync the state of the target elements to the classname assigned
     * to the toggler -- showing or hiding the toggler's targets by
     * expanding their height properties to their natural heights.
     *
      * NO * Use margins as well as first-child top and
      * NO * last-child top and height to determine the full natural height
      * NO * of the toggle target.
     *
     * Use each target's scrollHeight to determine its natural height.
     *
     * @param  {string} className name of class used to determine which
     *                            state to force on any target elements.
     * @return {jQuery nodeList} for chaining
     */
    syncTogglerTargets = function($whichTogglers) {
      if ($whichTogglers == null) {
        $whichTogglers = $togglers;
      }
      $whichTogglers.each(function(index, toggler) {
        var $toggler, open;
        $toggler = $(toggler);
        open = $toggler.hasClass(config.togglingClassName);
        if (open) {
          toggler.$targets.addClass(config.togglingClassName);
        } else {
          toggler.$targets.removeClass(config.togglingClassName).css('height', '');
        }
        return toggler.$targets.each(function(index, target) {
          if (open) {
            return $(target).css('height', $(target).find('.box')[0].scrollHeight);
          }
        });
      });
      return $togglers;
    };

    /**
     *
     * @function setAssessmentTimer
     *
     * To avoid too many repeated assessments of toggle/target status,
     * we'll wait until there have been no new requests for at least
     * `assessmentDelay` milliseconds.
     *
     */
    setAssessmentTimer = function() {
      var timer;
      if (timer) {
        cancelTimeout(timer);
      }
      timer = setTimeout(assess, config.assessmentDelay);
      return timer;
    };

    /**
     * A jQuery nodeList of toggler elements
     * @type {jQuery nodeList}
     */
    $togglers = this;
    timer = null;
    init();
    assess();
    $(window).on('resize', setAssessmentTimer);
    return $togglers;
  };
});

//# sourceMappingURL=jqToggler.js.map
