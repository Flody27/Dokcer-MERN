/* eslint-disable no-undef */
// Advanced Select2
$(function () {
  // Select2 selectbox
  $(".select2").select2({ placeholder: "Selecione una categoria" });
  $(".search-select").select2({
    allowClear: true,
  });
  $("#loading-select").select2({
    placeholder: "Select",
    minimumInputLength: 1,
    query: function (query) {
      var data = { results: [] },
        i,
        j,
        s;
      for (i = 1; i < 5; i++) {
        s = "";
        for (j = 0; j < i; j++) {
          s = s + query.term;
        }
        data.results.push({ id: query.term + i, text: s });
      }
      query.callback(data);
    },
  });
  var data = [
    { id: 0, tag: "enhancement" },
    { id: 1, tag: "bug" },
    { id: 2, tag: "duplicate" },
    { id: 3, tag: "invalid" },
    { id: 4, tag: "wontfix" },
  ];
  function format(item) {
    return item.tag;
  }
  $("#array-select").select2({
    placeholder: "Select",
    data: { results: data, text: "tag" },
    formatSelection: format,
    formatResult: format,
  });
});
