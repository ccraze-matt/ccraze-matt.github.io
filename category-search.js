$(function() {
  var $searchContent, $searchHide, $searchToggle, hideSearchContent, showSearchContent, toggleSearch;
  $searchToggle = $('.search-toggle');
  $searchHide = $('.search-button-hide > a');
  $searchContent = $('.category-header-search');
  hideSearchContent = function() {
    $searchContent.hide('fast');
    $searchContent.data('state', 'hide');
    $searchToggle.parent().css('border-color', '#bef67e');
  };
  showSearchContent = function() {
    $searchContent.show('fast');
    $searchContent.data('state', 'show');
    $searchToggle.parent().css('border-color', '#9dcd5d');
  };
  toggleSearch = function(event) {
    event.preventDefault();
    if ($searchContent.data('state') === 'show') {
      hideSearchContent();
    } else {
      showSearchContent();
    }
  };
  $searchToggle.click(toggleSearch);
  $searchHide.click(toggleSearch);

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
