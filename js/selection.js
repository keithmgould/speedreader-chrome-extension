chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSelection") {
    console.log("sending data to extension");
    sendResponse({data: window.getSelection().toString()});
  } else {
    sendResponse({}); // snub them.
  }
});
