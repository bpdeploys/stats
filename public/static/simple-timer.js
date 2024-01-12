function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
self.addEventListener(
  "message",
  function(e) {
    if (e.data.currentTotalSeconds) {
      var seconds = e.data.currentTotalSeconds;
      ++seconds;
      var secondsString = pad(seconds % 60);
      var minutesString = pad(parseInt(seconds / 60));
      postMessage(`${minutesString}:${secondsString}`);
      setInterval(function() {
        ++seconds;
        var secondsString = pad(seconds % 60);
        var minutesString = pad(parseInt(seconds / 60));
        postMessage(`${minutesString}:${secondsString}`);
      }, 1000);
    }
  },
  false
);
