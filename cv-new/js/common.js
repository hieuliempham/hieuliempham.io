var autoSaver = null;
$.fn.modal = function (action) {
  if (action === undefined) {
    action = "show";
  }
  var $this = $(this);
  if (action == "show") {
    $this.show();
  } else {
    $this.hide();
  }
  $this.find(".modal-close").click(function (e) {
    e.preventDefault();
    $this.hide();
  });
};
function loadEncodedObject(data) {
  return JSON.parse(unescape(data));
}
function showTemplatesByLang(lang) {
  $(".template-lang-group").hide(0, function () {
    $(".template-lang-group.lang-" + lang).show();
  });
}
function showLanguageButton(langs) {
  $(".btn-lang-option").hide(0, function () {
    for (var i = 0; i < langs.length; i++) {
      $(".btn-lang-option." + langs[i]).show();
    }
  });
}
function setActiveLangButton(lang) {
  $("#cvo-toolbar span.flag").removeClass("active");
  $("#cvo-toolbar span.flag." + lang).addClass("active");
}
function getToken() {
  return $('meta[name="csrf-token"]').attr("content");
}
function showLoading() {
  $("#loader").show();
}
function hideLoading() {
  $("#loader").hide();
}
function loadColor() {
  var options = $("#toolbar-color .options");
  options.html("");
  $.each(builder.colors, function (index, value) {
    if (value == builder.color) {
      options.append(
        $(
          '<span class="color active" style="background-color:#' +
            value +
            '" data-color="' +
            value +
            '">' +
            '<i class="fa fa-check"></i>' +
            "</span>"
        )
      );
    } else {
      options.append(
        $(
          '<span class="color" style="background-color:#' +
            value +
            '" data-color="' +
            value +
            '">' +
            '<i class="fa fa-check"></i>' +
            "</span>"
        )
      );
    }
  });
}
function loadFont() {
  var options = $("#toolbar-font .options");
  options.html(
    '<select name="font" id="font-selector" style="width: 120px;"></select>'
  );
  $.each(builder.fonts, function (key, label) {
    if (key == builder.font) {
      options
        .find("select")
        .append(
          $('<option value="' + key + '" selected>' + label + "</option>")
        );
    } else {
      options
        .find("select")
        .append($('<option value="' + key + '">' + label + "</option>"));
    }
  });
  options.find("select").change(function () {
    var font = $(this).val();
    $("#cv-font").attr("href", builder.font_path + "/" + font + ".css");
    $("#cvFont").val(font);
  });
  options.find("select").select2({ minimumResultsForSearch: -1 });
}
function loadFontSize(builder) {
  $(".fontsize").removeClass("active");
  $(".fontsize[data-size=" + builder.fontsize + "]").addClass("active");
}
function loadSpacing(builder) {
  $(".line-height").removeClass("active");
  $(".line-height[data-spacing=" + builder.spacing + "]").addClass("active");
}
var lastAutoSaveData = null;
function autoSave() {
  var url = AUTOSAVE_URL;
  var data = CVOFormController.getTemporaryFormData();
  data._token = getToken();
  var check = JSON.stringify(data);
  if (lastAutoSaveData == check) {
    return false;
  }
  lastAutoSaveData = check;
  $.ajax({
    url: url,
    data: data,
    type: "post",
    dataType: "json",
    beforeSend: function () {
      console.log("Auto saving...");
    },
    success: function (response) {
      if (response.status == "success") {
        console.log("success!");
      } else {
        console.log("failed!");
      }
    },
    error: function (error) {
      console.log("failed!");
    },
  });
}
