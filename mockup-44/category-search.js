$(function() {
  var $basicSearch, $searchDialog, $searchHide, $searchToggle, hideSearchDialog, showSearchDialog, toggleSearchDialog;
  $searchToggle = $('.search-toggle');
  $searchHide = $('.search-button-hide > a');
  $searchDialog = $('.category-header-search');
  $basicSearch = $('.category-header-line1 .basic-search');
  hideSearchDialog = function(event) {
    if (event != null) {
      event.preventDefault();
    }
    $searchDialog.hide('fast');
    $searchDialog.data('state', 'hide');
    $basicSearch.css({
      'border-color': '#bef67e'
    });
  };
  showSearchDialog = function(event) {
    if (event != null) {
      event.preventDefault();
    }
    $searchDialog.show('fast');
    $searchDialog.data('state', 'show');
    $basicSearch.css({
      'border-color': '#6a9a2a'
    });
  };
  toggleSearchDialog = function(event) {
    if (event != null) {
      event.preventDefault();
    }
    if ($searchDialog.data('state') === 'show') {
      hideSearchDialog(event);
    } else {
      showSearchDialog(event);
    }
  };
  $searchHide.click(hideSearchDialog);
  $basicSearch.click(showSearchDialog);

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
