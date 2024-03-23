var errorTracker = null;
function initErrorTracker() {
  if (errorTracker == null) {
    errorTracker = ga.getAll()[0].get("name");
  }
}
window.onerror = function (msg, file, line, col, error) {
  StackTrace.fromError(error).then(function (stackframes) {
    var stringifiedStack = stackframes
      .map(function (sf) {
        return sf.toString();
      })
      .join("\n");
    pushTrackingError(msg, stringifiedStack);
  });
};
function pushTrackingError(msg, traceString) {
  initErrorTracker();
  ga(errorTracker + ".send", "event", "Javascript Eror", msg, traceString);
  if (gtag) {
    gtag("event", "Javascript Eror");
  }
}
