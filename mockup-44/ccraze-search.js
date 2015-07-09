var min_price = '-1';
var orig_min_price = min_price;
var max_price = '-1';
var orig_max_price = max_price;
var undoChecks = Array();
var undoing = false;
$('input:checkbox').bind('click', function() {
  if (!undoing) {
    undoChecks[undoChecks.length] = this.id;
  }
});
$('#discount_filters input:checkbox').bind('click', function() {
  undoChecks[undoChecks.length] = $('#discount_filters input:checkbox:checked').attr("id"); // there should only be 1 that is checked at a time.
  $('#discount_filters input:checkbox').removeAttr('checked');
  $(this).attr('checked', 'checked');
});
$('#morefilters_filters input:checkbox').bind('click', function() {
  undoChecks[undoChecks.length] = $('#morefilters_filters input:checkbox:checked').attr("id"); // there should only be 1 that is checked at a time.
  $('#morefilters_filters input:checkbox').removeAttr('checked');
  $(this).attr('checked', 'checked');
});
$('#price_filters input:checkbox').bind('click', function() {
  var idx = $('#price_filters input:checkbox').index(this);
  if (this.checked == true) {
    if (min_price == -1 && max_price == -1) {
      min_price = max_price = idx;
    } else if (idx <= (max_price - min_price) / 2 + min_price) {
      min_price = idx;
    } else {
      max_price = idx;
    }
  } else {
    if (min_price == idx && max_price == idx) {
      min_price = max_price = -1;
    } else if (min_price == idx) {
      min_price = max_price;
    } else if (max_price == idx) {
      max_price = min_price;
    }
  }
  $('#price_filters input:checkbox').removeAttr('checked');
  hiliteCheckboxes();
});

function showFilterSelect(that, id, id_controls) {
  $('.filterShells').hide();
  $('#' + id).show();

  if (id == 'filter_price') {
    $('#price_filters input:checkbox').removeAttr('checked');
    hiliteCheckboxes();
  }

  if (id == 'filter_theme') {
    $('#' + id_controls).html('<center><img src="http://img.costumecraze.com/images/ajax-loader3.gif" alt="loading..."></center>');
    $('#' + id_controls).load("/search_newold_filters.php", {
      'load_filter': id,
      'qstring': ''
    });
  }

  if (id == 'filter_manufacturer' || id == 'filter_size') {
    $('#' + id_controls).html('<center><img src="http://img.costumecraze.com/images/ajax-loader3.gif" alt="loading..."></center>');
    $('#' + id_controls).load("/search_newold_filters.php", {
      'load_filter': id,
      'qstring': ''
    });
  }

  return false;
}

function hideDetails() {
  $('.filterShells').fadeOut('fast');
}

function hiliteCheckboxes() {
  $('#price_filters .hint').text('');
  if (min_price != -1 && max_price != -1) {
    $('#price_filters input:checkbox:eq(' + min_price + ')').add('#price_filters input:checkbox:eq(' + max_price + ')').attr('checked', 'checked');
    $('#price_filters input:checkbox').parent().css('background-color', '#afeeee');
    $('#price_filters input:checkbox:gt(' + max_price + ')').add('#price_filters input:checkbox:lt(' + min_price + ')').parent().css('background-color', '');
    if (min_price != max_price) {
      $('#price_filters input:checkbox:eq(' + min_price + ') + span .hint').text(' = Minimum');
      $('#price_filters input:checkbox:eq(' + max_price + ') + span .hint').text(' = Maximum');
    }
  } else {
    $('#price_filters input:checkbox').parent().css('background-color', '');
  }
}

function undoChanges(whichFilter) {
  undoing = true;
  for (var i = (undoChecks.length - 1); i >= 0; i--) {
    document.getElementById(undoChecks[i]).checked = !document.getElementById(undoChecks[i]).checked;
  }
  min_price = orig_min_price;
  max_price = orig_max_price;
  $('#price_filters input:checkbox').removeAttr('checked');
  hiliteCheckboxes();
  undoing = false;
  undoChecks = Array();
}

function clearOptions(whichFilter) {
  $('#' + whichFilter + ' input:checked').click();
  $('#' + whichFilter + ' input:checked').removeAttr('checked');
  if (whichFilter == 'price_filters') {
    min_price = -1;
    max_price = -1;
    hiliteCheckboxes();
  }
}

function showAdvanced() {
  $('.advanced_search').show();
  $('#advanced_button').replaceWith('<a id="advanced_button" onclick="hideAdvanced(); clearFilters(); return false;">Hide and clear advanced search...</a>');
}

function hideAdvanced() {
  $('.advanced_search').hide();
  $('#advanced_button').replaceWith('<a id="advanced_button" onclick="showAdvanced(); return false;">Show advanced search...</a>');
}

function clearFilters(clear_search_text) {
  $('#search_filters td').not('td:has(input)').text('select...');
  $('.hidden_checked').remove();
  $('.filters input:checkbox').removeAttr('checked');
}

function doSubmit() {
  $('#frm_search_v3_refine').submit();
}
$('form').append('<input type="hidden" name="jsavl" value="1" />');
$(document).ready(function() {
  $('#search_filters td, #search_filters th').css('border-bottom', '1px solid #FDEEF4');
  $('.set_ipp').hide();
});
$('#subcategories').prepend('<a name="tab=subcats&" clear="all"></a>');
$('#subcategories').prepend('<a name="tab=subcats" clear="all"></a>');
$('#subcategories').append('<a name="tab=products&" clear="all"></a>');
$('#subcategories').append('<a name="tab=products" clear="all"></a>');
$('#subcategories').append('<a name="search_fields"></a>');
if (document.location.hash.match("search_text") || document.location.hash.match("searchtext")) {
  var x = document.location.hash.split(';');
  for (var i in x) {
    y = x[i].split('=');
    filter = y[0];
    opts = y[1];
    if (filter == '#search_text' || filter == 'search_text' || filter == '#searchtext' || filter == 'searchtext') {
      document.location = '/category/superhero-costumes?searchstring=' + opts.replace(",", " ");
    }
  }
}
