$(function() {
  var $dialogBasicSearch, $headerBasicSearch, $searchDialog, $searchHide, $searchToggle, hideSearchDialog, showSearchDialog, toggleSearchDialog;
  $searchToggle = $('.search-toggle');
  $searchHide = $('.search-button-hide > a');
  $searchDialog = $('.category-header-search');
  $headerBasicSearch = $('.category-header-line1 .basic-search');
  $dialogBasicSearch = $('.category-search .basic-search');
  hideSearchDialog = function(event) {
    if (event != null) {
      event.preventDefault();
    }
    $searchDialog.hide('fast');
    $searchDialog.data('state', 'hide');
    $headerBasicSearch.css({
      'border-color': '#bef67e'
    });
    $searchToggle.css({
      'border-color': '#bef67e'
    });
  };
  showSearchDialog = function(event) {
    if (event != null) {
      event.preventDefault();
    }
    $searchDialog.show('fast');
    $searchDialog.data('state', 'show');
    $headerBasicSearch.css({
      'border-color': '#6a9a2a'
    });
    $searchToggle.css({
      'border-color': '#6a9a2a'
    });
    $dialogBasicSearch.find('input[type="text"]').focus();
  };
  toggleSearchDialog = function(event) {
    if (event != null) {
      event.preventDefault();
    }
    console.log('toggle search dialog. this: ', this);
    if ($searchDialog.data('state') === 'show') {
      hideSearchDialog(event);
      $(this).find('a').blur();
    } else {
      showSearchDialog(event);
    }
  };
  $searchToggle.click(toggleSearchDialog);
  $searchHide.click(hideSearchDialog);
  $headerBasicSearch.click(showSearchDialog);

  /*
   * Begin search filters' show/hide button actions
   */
  $('.search-age').click(function() {
    showFilterSelect(this, 'filter_class3', 'class3_filters');
  });
  $('.search-gender').click(function() {
    showFilterSelect(this, 'filter_class2', 'class2_filters');
  });
  $('.search-size').click(function() {
    showFilterSelect(this, 'filter_size', 'size_filters');
  });
  $('.search-price').click(function() {
    showFilterSelect(this, 'filter_price', 'price_filters');
  });
  $('.search-discount').click(function() {
    showFilterSelect(this, 'filter_discount', 'discount_filters');
  });
  $('.search-inventory').click(function() {
    showFilterSelect(this, 'filter_numstocked', 'numstocked_filters');
  });
  $('.search-prodtype').click(function() {
    showFilterSelect(this, 'filter_class4', 'class4_filters');
  });
  $('.search-manufacturer').click(function() {
    showFilterSelect(this, 'filter_manufacturer', 'manufacturer_filters');
  });
  $('.search-newfor').click(function() {
    showFilterSelect(this, 'filter_new_for', 'new_for_filters');
  });
});

//# sourceMappingURL=category-search.js.map
