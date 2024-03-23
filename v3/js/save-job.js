$(document).ready(function () {
  $(document).on("click", ".btn-save", function () {
    if (ajaxLock) return false;
    ajaxLock = true;
    var jobId = $(this).data("id");
    var jobTitle = $(this).data("title");
    let jrId = $(this).data("jr-id");
    $("#box-save-job-" + jobId + " #save-job-loading").show();
    $("#box-save-job-" + jobId + " .btn-save i").hide();
    $.ajax({
      url: saveJobUrl,
      type: "POST",
      data: { job_id: jobId, jr_i: jrId },
    })
      .done(function (response) {
        if (response.status == "success") {
          if ($("#box-count-save-job").length) {
            var countSavedJob = parseInt($("#count-saved-job").text());
            $("#count-saved-job").text(countSavedJob + 1);
            if (countSavedJob + 1 == 1) {
              $("#box-count-save-job").removeClass("box-not-save-job");
              $("#box-count-save-job").addClass("box-saved-job");
            }
          }
          $("#box-save-job-" + jobId).removeClass("job-notsave");
          $("#box-save-job-" + jobId).addClass("job-saved");
          $(".box-save-job-" + jobId).removeClass("job-notsave");
          $(".box-save-job-" + jobId).addClass("job-saved");
        } else if (response.status == "failed") {
          showModalError(response.message);
        }
      })
      .fail(function () {
        console.log("error");
      })
      .always(function () {
        ajaxLock = false;
        $("#box-save-job-" + jobId + " #save-job-loading").hide();
        $("#box-save-job-" + jobId + " .btn-save i").show();
      });
  });
  $(document).on("click", ".btn-unsave", function () {
    if (ajaxLock) return false;
    ajaxLock = true;
    var jobId = $(this).data("id");
    var jobTitle = $(this).data("title");
    let jrId = $(this).data("jr-id");
    $("#box-save-job-" + jobId + " #unsave-job-loading").show();
    $("#box-save-job-" + jobId + " .btn-unsave i").hide();
    $.ajax({
      url: unsaveJobUrl,
      type: "POST",
      data: { job_id: jobId, jr_i: jrId },
    })
      .done(function (response) {
        if (response.status == "success") {
          if ($("#box-count-save-job").length) {
            var countSavedJob = parseInt($("#count-saved-job").text());
            $("#count-saved-job").text(countSavedJob - 1);
            if (countSavedJob - 1 == 0) {
              $("#box-count-save-job").removeClass("box-saved-job");
              $("#box-count-save-job").addClass("box-not-save-job");
            }
          }
          $("#box-save-job-" + jobId).removeClass("job-saved");
          $("#box-save-job-" + jobId).addClass("job-notsave");
          $(".box-save-job-" + jobId).removeClass("job-saved");
          $(".box-save-job-" + jobId).addClass("job-notsave");
        } else if (response.status == "failed") {
          showModalError(response.message);
        }
      })
      .fail(function () {
        console.log("error");
      })
      .always(function () {
        ajaxLock = false;
        $("#box-save-job-" + jobId + " #unsave-job-loading").hide();
        $("#box-save-job-" + jobId + " .btn-unsave i").show();
      });
  });
});
